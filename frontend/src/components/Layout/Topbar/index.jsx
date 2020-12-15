import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import {
  Drawer,
  CssBaseline,
  Menu,
  Badge,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
} from '@material-ui/core';
import {
  AccountCircle,
  Menu as MenuIcon,
  Language as LanguageIcon,
} from '@material-ui/icons';
import actions from '../../../redux/actions';
import { changeLanguage } from '../../../i18n';
import useStyles from './index.style';

export default function Topbar({ isAdmin, open, handleDrawerOpen }) {
  const [anchorProfile, setAnchorProfile] = useState(null);
  const [anchorLanguage, setAnchorLanguage] = useState(null);
  const { name } = useSelector((state) => state.auth);
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(actions.auth.logout());
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorProfile(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorProfile(null);
  };

  const handleLanguageMenuOpen = (event) => {
    setAnchorLanguage(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setAnchorLanguage(null);
  };

  const handleLanguageMenuClose_Vie = () => {
    setAnchorLanguage(null);
    setAnchorProfile(null);
    changeLanguage('vi');
  };

  const handleLanguageMenuClose_En = () => {
    setAnchorLanguage(null);
    setAnchorProfile(null);
    changeLanguage('en');
  };

  const renderProfileMenu = (
    <Menu
      anchorEl={anchorProfile}
      keepMounted
      open={Boolean(anchorProfile)}
      onClose={handleProfileMenuClose}
    >
      <MenuItem>{name}</MenuItem>
      <MenuItem onClick={handleLogout}>{t('topbar.logout')}</MenuItem>
    </Menu>
  );

  const renderLanguageMenu = (
    <Menu
      anchorEl={anchorLanguage}
      keepMounted
      open={Boolean(anchorLanguage)}
      onClose={handleLanguageMenuClose}
    >
      <MenuItem onClick={handleLanguageMenuClose_Vie}>
        {t('topbar.vi')}
      </MenuItem>
      <MenuItem onClick={handleLanguageMenuClose_En}>{t('topbar.en')}</MenuItem>
    </Menu>
  );

  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,// && !isAdmin,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.logo}>
            HUST Online Learning
          </Typography>
          <IconButton
            color="inherit"
            aria-haspopup="true"
            onClick={handleLanguageMenuOpen}
          >
            <Badge badgeContent={0} color="secondary">
              <LanguageIcon />
            </Badge>
          </IconButton>
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
      {renderProfileMenu}
      {renderLanguageMenu}
    </>
  );
}
