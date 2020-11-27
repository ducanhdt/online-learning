import React, { useState } from 'react';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import Profile from '../Profile';
import api from '../../../apis';

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    justifyContent: 'center',
    display: 'flex',
  },
}));

const ProfileDetails = ({ className, ...rest }) => {
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();
  // const dispatch = useDispatch();
  const { name, email, accessToken } = useSelector((state) => state.auth);

  const [values, setValues] = useState({
    name,
    email,
    error: null,
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    if (values.name === name) {
      enqueueSnackbar('Name is not change!', { variant: 'error' });
      return;
    }
    const updateDatas = {
      name: values.name,
    } 
    const { data } = await api.account.changeAccountInfo(
      updateDatas,
      accessToken,
    );
    if (data.status === 1) {
      enqueueSnackbar('Successfully!', { variant: 'success' });
    } else {
      enqueueSnackbar(data.message, { variant: 'error' });
    }
  };

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={3} xs={12} className={classes.avatar}>
              <Profile />
            </Grid>
            <Grid item md={9} xs={12}>
              <Grid container spacing={3}>
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    disabled
                    onChange={handleChange}
                    value={values.email}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    onChange={handleChange}
                    required
                    value={values.name}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button color="primary" variant="contained" onClick={handleSubmit}>
            Change Infomation
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default ProfileDetails;
