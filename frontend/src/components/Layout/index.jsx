import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import useStyles from './index.style';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import Content from './Content';

export default function Layout({ children }) {
  const [open, setOpen] = useState(true);

  const classes = useStyles();

  const { isAdmin } = useSelector((state) => state.auth);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Topbar
        isAdmin={isAdmin}
        open={open}
        handleDrawerOpen={handleDrawerOpen}
      />
      <Sidebar open={open} handleDrawerClose={handleDrawerClose} isAdmin={isAdmin} />
      {/* {!isAdmin && (
        <Sidebar open={open} handleDrawerClose={handleDrawerClose} isAdmin={isAdmin} />
      )} */}
      <Content>{children}</Content>
    </div>
  );
}
