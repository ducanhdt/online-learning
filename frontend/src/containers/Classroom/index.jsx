import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDebounce } from 'use-debounce';

import Room from './VideoRoom/Room';
import { Button, Grid, TextField } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import API from '../../apis';

const Classroom = () => {
  const { classroomId } = useParams();

  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { accessToken } = useSelector((state) => state.auth);
  const [ inRoom, setInRoom ] = useState(false);
  const [videoToken, setVideoToken] = useState('hello');
  let className, member;

  const { name: username } = useSelector((state) => state.auth);


  const hangleGetOut = () => {
    setVideoToken("")
    setInRoom(false);
  };
  const getClassInfo= async ()=>{
    const response = await API.classroom.getClassroom({classroomId},accessToken)
    className = response.data.result.name
    member = response.data.result.member
    console.log({className,member,username});
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
      <Room
        roomName={className}
        token={videoToken}
        handleLogout={hangleGetOut}
      />
    );
  } else {
    render =(
    <Grid container spacing={3}>
      <Grid item sm={4} sx={12}>
        <Button onClick={handleSubmit}>Get in to Chat Room</Button>
      </Grid>
      <Grid item sm={8} sx={12}>
        <div>Token</div>
        <div>{videoToken.substr(1, 20)}</div>
      </Grid>
    </Grid>
    )
  }

  return render;
};

export default Classroom;