import React, { useState, useEffect, useCallback } from 'react';
import { useParams, BrowserRouter, Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { useDebounce } from 'use-debounce';
import MaterialTable from 'material-table';
import Box from '@material-ui/core/Box';
import Room from './VideoRoom/Room';
import File from './File/File';
import FileList from './File/FileList';
import TweetForm from './Tweet/TweetForm';
import TweetList from './Tweet/TweetList';
import ChatScreen from './Chat/ChatScreen';
import { Avatar, Button, Grid, TextField, Input } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import API from '../../apis';
import { AccessTokenNotYetValidError } from 'twilio-video';
import Post from './Post';
import { PlayCircleFilledWhite } from '@material-ui/icons';
import axios from 'axios';

const useStyles = makeStyles({
  form: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    padding: '20px 0',
  },
  input: {
    width: '100%',
  },
  fixedPost: {
    position: 'fixed',
    bottom: 0,
    backgroundColor: 'white',
    padding: "10",
    width: '60%',
    backgroundColor: '#e6e4e6',
    borderRadius: '20px',
    padding: '20px',
  },
  marginBottom: {
    marginBottom: 50,
  },
});

const Classroom = () => {
  const { classroomId } = useParams();
  const [tweet,setTweet] = useState("");
  const classes = useStyles();
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { accessToken } = useSelector((state) => state.auth);
  const [inRoom, setInRoom] = useState(false);
  const [className, setClassName] = useState('');
  const [member, setMember] = useState([]);

  const [videoToken, setVideoToken] = useState('hello');
  const [inList, setInList] = useState(false);
  const [checkPost, setCheck] = useState(0);
  const [tweetList, setTweetList] = useState([]);
  const { name: username } = useSelector((state) => state.auth);
  const [errorMsg, setErrorMsg] = useState('');
  const hangleGetOut = () => {
    setVideoToken('');
    setInRoom(false);
  };

  const getClassInfo = async () => {
    const response = await API.classroom.getClassroom(
      { classroomId },
      accessToken,
    );
    setClassName(response.data.result.name);
    setMember(response.data.result.member);
    console.log({ className, member, username });
    return className;
  };

  const handleOnSubmit = async (event) => {
    console.log('hello');
    event.preventDefault();
    try {
      // const { tweet } = state;
      console.log(tweet);
      if (tweet.trim() !== '') {
        console.log('hello');
        console.log(tweet);
        setErrorMsg('');
        //   console.log(classId);
        const res = await axios
          .post(`${process.env.REACT_APP_API_DOMAIN}/api/v1/tweet`, {
            room: classroomId,
            user: username,
            tweet: tweet,
          })
          .then(
            (response) => {
              console.log(response);
              setCheck(checkPost + 1);
              getTweetList()
              setTweet('')
            },
            (error) => {
              console.log(error);
            },
          );
      } else {
        setErrorMsg('Please enter all the field values.');
      }
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
    }
  };

  const handleInputChange = (event) => {
    setTweet(event.target.value);
  };
  const getTweetList = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/api/v1/getAllTweets/${classroomId}`,
      );
      console.log(data.result);
      setErrorMsg('');

      // setTweetList(data.result.map((tweets) => ({
      //   ...tweets,
      //   key:tweets.id,
      // })),
      // );
      setTweetList(data.result);
      //console.log(filesList);
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
    }
  };

  useEffect(() => {
    getTweetList();
    getClassInfo();
    // const interval=setInterval(getTweetList,10000)
    // return()=>clearInterval(interval);
  }, []);

  const handleSubmit = async (bool) => {
    const response = await API.video.getVideoToken(className, username);
    if (response.status == 200) {
      let { token } = response.data;
      setVideoToken(token);
      if (bool == 0) {
        setInRoom(true);
      } else {
        setInList(true);
      }
      enqueueSnackbar('Success', { variant: 'success' });
    } else {
      console.log(response);
    }
  };
  let render;

  if (inRoom) {
    render = (
      <div style={{ display: 'flex' }}>
        <Room
          roomName={className}
          token={videoToken}
          handleLogout={hangleGetOut}
        />
        <ChatScreen email={username} room={className} />
      </div>
    );
  } else if (inList) {
    render = (
      <div>
        <Grid container spacing={3}>
          <Grid item sm={12} sx={12}>
            <FileList classId={classroomId} />
          </Grid>
        </Grid>
      </div>
    );
  } else {
    render = (
      <>
        <Grid container spacing={3}>
          <Grid item sm={4} sx={12}>
            <Button onClick={() => handleSubmit(0)}> {t('classroom.enter')} </Button>
            <Button onClick={() => handleSubmit(1)}>{t('classroom.file')}</Button>
          </Grid>
          <Grid item sm={4} sx={12}>
            {/* <File 
          classId={classroomId}/> */}
          </Grid>
        </Grid>

        <Grid container className={classes.marginBottom}>
          {tweetList.map((item, index) => (
            <Post
              name={item.user}
              date={item.created_at}
              text={item.text}
              key={index}
            />
          ))}
        </Grid>
        <Grid item className={classes.fixedPost}>
          {/* <form className={classes.form} noValidate autoComplete="off">    */}
          <div className={classes.form}>
            <Input
              className={classes.input}
              defaultValue=""
              value={tweet}
              placeholder={t('classroom.new')}
              inputProps={{ 'aria-label': 'description' }}
              name="tweet"
              onChange={handleInputChange}
            />
            <Button onClick={handleOnSubmit}>{t('classroom.post')}</Button>
          </div>
        </Grid>
      </>
    );
  }

  return render;
};

const styles = {
  chat: {
    border: '2px solid rgb(5 21 52)',
    borderRadius: '20px',
    position: 'fixed',
    bottom: '18px',
    right: '0',
    // width: '28%',
    padding: '7px',
  },
};

export default Classroom;
