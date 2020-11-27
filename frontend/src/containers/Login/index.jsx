import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import {
  CssBaseline,
  Grid,
  Avatar,
  Button,
  Link,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import actions from '../../redux/actions';
import useStyles from './styles';
import { changeLanguage } from '../../i18n';
import { validateEmail } from '../../utils/string';

const Login = () => {
  const [email, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const dispatch = useDispatch();
  const { error, accessToken, isProcessing } = useSelector(
    (state) => state.auth,
  );

  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const { t } = useTranslation();

  useEffect(() => {
    if (error) enqueueSnackbar(error, { variant: 'error' });
    if (accessToken) {
      enqueueSnackbar('Login Successfully!', { variant: 'success' });
    }
  }, [isProcessing, accessToken]);

  const handleChangeInput = (e, field) => {
    switch (field) {
      case 'email':
        setUserEmail(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
      default:
        break;
    }
  };

  const validateLogin = () => {
    if (email.length === 0) {
      setEmailError('Email is required');
      return false;
    }
    if (!validateEmail(email)) {
      setEmailError('Email is wrong');
      return false;
    }
    setEmailError('');
    if (password.length === 0) {
      setPasswordError('Password is required');
      return false;
    }
    setPasswordError('');

    return true;
  };

  const handleLogin = () => {
    if (!validateLogin()) return;
    dispatch(actions.auth.login({ email, password }));
  };

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <Grid
      container
      component="main"
      className={classes.root}
      method="POST"
      autoComplete="off"
    >
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div>
          <Button onClick={() => changeLanguage('vi')}>vi</Button>
          <Button onClick={() => changeLanguage('en')}>en</Button>
        </div>

        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t('loginpage.login')}
          </Typography>
          <TextField
            value={email}
            error={emailError.length > 0}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="userEmail"
            label={t('loginpage.email')}
            name="userEmail"
            autoComplete="email"
            autoFocus
            helperText={emailError}
            onChange={(e) => handleChangeInput(e, 'email')}
          />
          <TextField
            value={password}
            variant="outlined"
            margin="normal"
            required
            error={passwordError.length > 0}
            helperText={passwordError}
            fullWidth
            name="password"
            label={t('loginpage.password')}
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => handleChangeInput(e, 'password')}
            onKeyPress={onKeyPress}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleLogin}
          >
            {t('loginpage.login')}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/" variant="body2">
                {t('loginpage.forgetPassword')}
              </Link>
            </Grid>
            <Grid item>
              {/* <Link href="sign-up" variant="body2">
                Đăng ký
              </Link> */}
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
};

export default Login;
