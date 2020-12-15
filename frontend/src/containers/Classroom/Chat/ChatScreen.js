import React, { useState, useRef, useEffect } from 'react';
import {
  AppBar,
  Backdrop,
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  List,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { Send } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import ChatItem from './ChatItem';
import ClassRoom from '../index';
import { useSelector } from 'react-redux';
import API from '../../../apis';
import { useParams } from 'react-router-dom';
const Chat = require('twilio-chat');

const useStyles = makeStyles({
  chatScreen: {
    display: 'flex',
    flexDirection: 'column',
    height: '75vh',
    width: '350px',
    marginLeft: '16px',
    borderRadius: '10px',
    marginTop: '56px',
  },
  listMessages: {
    borderRadius: '10px',
    flexGrow: 1,
    overflowX: 'hidden',
    overflowY: 'auto',
    backgroundColor: 'darkgray',
  },
  chatInput: {
    display: 'flex',
  },
});

const ChatScreen = ({ email, room }) => {
  console.log({ email, room });
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [channel, setChannel] = useState(null);

  const scrollDiv = useRef(null);
  const classes = useStyles();

  const getToken = async (email) => {
    const response = await axios.get(
      `${process.env.REACT_APP_CHAT_SERVER_DOMAIN}/token/${email}`,
    );
    const { data } = response;
    return data.token;
  };

  const scrollToBottom = () => {
    const scrollHeight = scrollDiv.current.scrollHeight;
    const height = scrollDiv.current.clientHeight;
    const maxScrollTop = scrollHeight - height;
    scrollDiv.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  };

  const handleMessageAdded = (message) => {
    // const mess= messages
    console.log('handleMessageAdded', messages.length);
    setMessages((oldMess) => [...oldMess, message]);
    scrollToBottom();
  };

  const joinChannel = async (channel) => {
    if (channel.channelState.status !== 'joined') {
      await channel.join();
    }
    channel.on('messageAdded', handleMessageAdded);
  };

  const fetchData = async () => {
    let token = '';

    setLoading(true);

    try {
      token = await getToken(email);
    } catch {
      console.log('unable to get token, please reload this page');
    }

    const client = await Chat.Client.create(token);

    client.on('tokenAboutToExpire', async () => {
      const token = await getToken(email);
      client.updateToken(token);
    });

    client.on('tokenExpired', async () => {
      const token = await getToken(email);
      client.updateToken(token);
    });
    client.on('channelJoined', async (channel) => {
      // getting list of all messages since this is an existing channel

      const oldMess = await channel.getMessages();
      // debugger;
      if (oldMess.items.length) {
        console.log('oldMess', oldMess);
        setMessages((oldMessages) => [...oldMessages, ...oldMess.items]);
        scrollToBottom();
      }
    });

    try {
      const channel = await client.getChannelByUniqueName(room);
      await joinChannel(channel);
      setChannel(channel);
      setLoading(false);
    } catch {
      try {
        const channel = await client.createChannel({
          uniqueName: room,
          friendlyName: room,
        });
        await joinChannel(channel);
        setChannel(channel);
        setLoading(false);
      } catch {
        console.log('unable to create channel, please reload this page');
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sendMessage = () => {
    if (text && String(text).trim()) {
      setLoading(true);
      channel && channel.sendMessage(text);
      setText('');
      setLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      sendMessage();
    }
  }

  return (
    <div className={classes.chatScreen}>
      <div className={classes.listMessages} ref={scrollDiv}>
        {messages &&
          messages.map((message, index) => (
            <ChatItem key={index} message={message} email={email} />
          ))}
      </div>
      <div className={classes.chatInput}>
        <TextField
          required
          fullWidth
          style={styles.textField}
          placeholder="Enter message"
          variant="outlined"
          multiline
          rows={1}
          value={text}
          disabled={!channel}
          onChange={(event) => setText(event.target.value)}
          onKeyPress={(event)=>handleKeyPress(event)}
        />
        <IconButton
          style={styles.sendButton}
          onClick={sendMessage}
          disabled={!channel || !text}
        >
          <Send style={styles.sendIcon} />
        </IconButton>
      </div>
    </div>
  );
};

const styles = {
  chatScreen: {
    display: 'flex',
  },
};

export default ChatScreen;
