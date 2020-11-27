import React from 'react';
import useStyles from './index.style';

export default function Content({ children }) {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      {children}
    </main>
  );
}
