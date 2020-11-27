import React from 'react';
import { Grid } from '@material-ui/core';

import ProfileDetails from './ProfileDetails';
import ChangePass from './ChangePass';
import useStyles from './index.style';

const Account = () => {
  const classes = useStyles();

  return (
    <>
      <ProfileDetails className={classes.profile} />
      <ChangePass />
    </>
  );
};

export default Account;
