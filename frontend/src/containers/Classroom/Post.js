import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Avatar, Button, CardContent, Card } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width: '100%',
    marginBottom: 30,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 4,
  },
  content: {
    backgroundColor:'aliceblue',
    display: 'flex',
    justifyContent: 'space-between',
  },
});

export default function Post({ name, date, text }) {
  const classes = useStyles();
  const day = date.split('T')[0];
  const time = date.split('T')[1].substring(0, 8);
  console.log({ day, time });
  return (
    <>
      <Card className={classes.root}>
        <CardContent className={classes.content}>
          <div style={{display:'flex'}}>
            <div style={{width: '100px',maxWidth: '100px'}}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                {name}
              </Typography>
            </div>
            <Typography style={{marginLeft:"20px"}} variant="body2" component="p">
              {text}
            </Typography>
          </div>

          <Typography className={classes.pos} color="textSecondary">
            {day}
            <br />
            {time}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}
