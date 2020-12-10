import React, { useState, useEffect, useCallback } from 'react';
import { useParams, BrowserRouter, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDebounce } from 'use-debounce';

import Room from './VideoRoom/Room';
import File from './File/File'
import Header from './File/Header'
import ChatScreen from './Chat/ChatScreen'
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
  const [videoToken, setVideoToken] = useState('hello');
  let className, member;

  const { name: username } = useSelector((state) => state.auth);


  const hangleGetOut = () => {
    setVideoToken("")
    setInRoom(false);
  };

  const getClassInfo = async () => {
    const response = await API.classroom.getClassroom({ classroomId }, accessToken)
    className = response.data.result.name
    member = response.data.result.member
    console.log({ className, member, username });
    return className;
  }

  useEffect(() => {
    getClassInfo();
  }, []);

  const handleSubmit = async () => {

    const response = await API.video.getVideoToken(className, username);
    if (response.status == 200) {
      let { token } = response.data;
      setVideoToken(token);
      setInRoom(true);
      console.log(token);
      enqueueSnackbar('Success', { variant: 'success' });
    } else {
      console.log(response);
    }
  };
  let render;

  if (inRoom) {
    render = (
      <div>
        <Grid container spacing={3}>
          <Grid item sm={8} sx={12} >
            <Room
              roomName={className}
              token={videoToken}
              handleLogout={hangleGetOut}
            />
          </Grid>
          <Grid item sm={4} sx={12}>
            < ChatScreen
              email={username}
              room={classroomId}
            />

          </Grid>

        </Grid>
      </div>

    );
  } else {
    render = (
      <Grid container spacing={3}>
        <Grid item sm={4} sx={12}>
          <Button onClick={handleSubmit}>Get in to Chat Room</Button>
        </Grid>
        <Grid item sm={4} sx={12}>
        <File/>
        </Grid>
        {/* <Grid item sm={8} sx={12}>
        <div>Token</div>
        <div>{videoToken.substr(1, 20)}</div>
      </Grid> */}
      </Grid>
    )
  }

  return render;
};

export default Classroom;
