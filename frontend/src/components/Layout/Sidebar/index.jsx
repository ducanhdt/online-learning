import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import {
  Drawer,
  List,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Home as HomeIcon,
} from '@material-ui/icons';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import SettingsIcon from '@material-ui/icons/Settings';
import useStyles from './index.style';

const menu = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: <HomeIcon />,
  },
  {
    title: 'Account',
    url: '/account',
    icon: <PermIdentityIcon />,
  },
  {
    title: 'Setting',
    url: '/',
    icon: <SettingsIcon />,
  },
];

export default function Sidebar({ open, handleDrawerClose }) {
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'rtl' ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      <List>
        {menu.map((item, index) => (
          <Link className={classes.link} to={item.url} key={index}>
            <ListItem button key={item.title}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={t(item.title)} />
            </ListItem>
          </Link>
        ))}
      </List>
    </Drawer>
  );
}
