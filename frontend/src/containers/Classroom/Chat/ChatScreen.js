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
import axios from 'axios';
import ChatItem from './ChatItem';
import ClassRoom from '../index';
import { useSelector } from 'react-redux';
import API from '../../../apis';
import { useParams } from 'react-router-dom';
const Chat = require('twilio-chat');

const ChatScreen = ({ email, room }) => {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [channel, setChannel] = useState(null);

  const scrollDiv = useRef(null);

  const getToken = async (email) => {
    const response = await axios.get(`http://localhost:5000/token/${email}`);
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
    setMessages([...messages, message]);
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
      throw new Error('unable to get token, please reload this page');
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
    let oldMessages = [];
    client.on('channelJoined', async (channel) => {
      // getting list of all messages since this is an existing channel

      const oldMess = await channel.getMessages();
      // debugger;

      if (oldMess.items.length) {
        oldMessages = [...oldMessages, ...oldMess.items];
        // setMessages([...oldMessages, ...oldMess.items]);
        console.log('channelJoined',  oldMessages);
        setMessages(oldMessages);
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
        throw new Error('unable to create channel, please reload this page');
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

  return (
    <Container component="main" maxWidth="md" style={styles.main}>
      <Backdrop open={loading} style={{ zIndex: 99999 }}>
        <CircularProgress style={{ color: 'white' }} />
      </Backdrop>
      <AppBar elevation={10}>
        <Toolbar>
          <Typography variant="h6">
            {`Room: ${room}, User: ${email}`}
          </Typography>
        </Toolbar>
      </AppBar>
      <CssBaseline />
      <Grid container direction="column" style={styles.mainGrid}>
        <Grid item style={styles.gridItemChatList} ref={scrollDiv}>
          <List dense={true}>
            {messages &&
              messages.map((message,index) => (
                <ChatItem key={index} message={message} email={email} />
              ))}
          </List>
        </Grid>
        <Grid item style={styles.gridItemMessage}>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item style={styles.textFieldContainer}>
              <TextField
                required
                style={styles.textField}
                placeholder="Enter message"
                variant="outlined"
                multiline
                rows={2}
                value={text}
                disabled={!channel}
                onChange={(event) => setText(event.target.value)}
              />
            </Grid>
            <Grid item>
              <IconButton
                style={styles.sendButton}
                onClick={sendMessage}
                disabled={!channel || !text}
              >
                <Send style={styles.sendIcon} />
              </IconButton>
              <IconButton onClick={()=>console.log(messages)}>Get Chat Info</IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

const styles = {
  main:{paddingLeft:0,paddingRight:0},
  textField: { width: '100%', borderWidth: 0, borderColor: 'transparent' },
  textFieldContainer: { flex: 1, marginRight: 12 },
  gridItem: { paddingTop: 12, paddingBottom: 12 },
  gridItemChatList: { overflow: 'auto', height: '70vh' },
  gridItemMessage: { marginTop: 12, marginBottom: 12 },
  sendButton: { backgroundColor: '#3f51b5' },
  sendIcon: { color: 'white' },
  mainGrid: { borderWidth: 1 },
};

export default ChatScreen;
