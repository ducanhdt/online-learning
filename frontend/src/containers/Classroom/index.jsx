import React, { useState, useEffect, useCallback } from 'react';
import { useParams, BrowserRouter, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDebounce } from 'use-debounce';

import Room from './VideoRoom/Room';
import File from './File/File';
import FileList from './File/FileList';
import Header from './File/Header';
import ChatScreen from './Chat/ChatScreen';
import { Button, Grid, TextField } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import API from '../../apis';
import { AccessTokenNotYetValidError } from 'twilio-video';

const Classroom = () => {
  const { classroomId } = useParams();

  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { accessToken } = useSelector((state) => state.auth);
  const [inRoom, setInRoom] = useState(false);
  const [inList, setInList] = useState(false);
  const [videoToken, setVideoToken] = useState('hello');
  const [className, setClassName] = useState('');
  const [member, setMember] = useState([]);

  const { name: username } = useSelector((state) => state.auth);

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

  useEffect(() => {
    getClassInfo();
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
          <Grid item sm={8} sx={12}>
            <FileList classId={classroomId} />
          </Grid>
        </Grid>
      </div>
    );
  } else {
    render = (
      <Grid container spacing={3}>
        <Grid item sm={4} sx={12}>
          <Button onClick={() => handleSubmit(0)}>Get in to Chat Room</Button>
          <Button onClick={() => handleSubmit(1)}>FileList</Button>
        </Grid>
        <Grid item sm={4} sx={12}>
          <File classId={classroomId} />
        </Grid>
        {/* <Grid item sm={8} sx={12}>
        <div>Token</div>
        <div>{videoToken.substr(1, 20)}</div>
      </Grid> */}
      </Grid>
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
