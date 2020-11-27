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
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import api from '../../../apis';

const useStyles = makeStyles(() => ({
  root: {},
}));

const ChangePass = ({ className }) => {
  const classes = useStyles();

  const [values, setValues] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    error: '',
  });

  const { accessToken } = useSelector((state) => state.auth);
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    if (values.confirmNewPassword.length === 0) {
      setValues({
        ...values,
        error: 'Confirm password not requied',
      });
      return;
    }
    if (values.newPassword !== values.confirmNewPassword) {
      setValues({
        ...values,
        error: 'New password not match',
      });
      return;
    }
    setValues({
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
      error: '',
    });

    const { data } = await api.account.changePassword(
      {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      },
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
    >
      <Card>
        <CardHeader
          subheader="Change new password here"
          title="Change Password"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="Current Password"
                name="currentPassword"
                onChange={handleChange}
                required
                type="password"
                value={values.currentPassword}
                variant="outlined"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="New Password"
                name="newPassword"
                onChange={handleChange}
                required
                type="password"
                value={values.newPassword}
                variant="outlined"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Confirm New Password"
                type="password"
                name="confirmNewPassword"
                error={values.error.length !== 0}
                helperText={values.error}
                onChange={handleChange}
                required
                SelectProps={{ native: true }}
                value={values.confirmNewPassword}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button color="primary" variant="contained" onClick={handleSubmit}>
            Change Password
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default ChangePass;
