import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Avatar, Button, CardContent , Card} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width: "100%",
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
    marginBottom: 12,
  },
});

export default function Post({name,date,text}) {
  const classes = useStyles();
  console.log(date);
  return (
      <>
    <Card className={classes.root} >
      <CardContent>
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {name}
        </Typography>
        
        <Typography className={classes.pos} color="textSecondary">
          {date}
        </Typography>
        <Typography variant="body2" component="p">
          {text}
        </Typography>
      </CardContent>
    </Card>
    </>
  );
}