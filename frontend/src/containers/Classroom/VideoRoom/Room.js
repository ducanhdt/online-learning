import React, { useState, useEffect } from 'react';
import Video from 'twilio-video';
// import { LocalVideoTrack } from 'twilio-video';
import Participant from './Participant';
import ChatScreen from '../Chat/ChatScreen';
import { Button, ButtonGroup } from '@material-ui/core';

const Room = ({ roomName, token, handleLogout }) => {
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [isVideoOn, setVideoOn] = useState(false);
  const [isMute, setMute] = useState(false);
  const [isShareScreen, setShareScreen] = useState(false);

  const myFunction = async () => {
    setParticipants([]);
    const participantConnected = (participant) => {
      setParticipants((prevParticipants) => [...prevParticipants, participant]);
    };

    const participantDisconnected = (participant) => {
      setParticipants((prevParticipants) =>
        prevParticipants.filter((p) => p !== participant),
      );
    };
    let roomConfig = {};
    if (!isVideoOn) {
      roomConfig = {
        name: roomName,
        video: false,
        dominantSpeaker: true,
      };
    } else {
      if (isShareScreen) {
        const stream = await navigator.mediaDevices.getDisplayMedia();
        const screenTrack = new Video.LocalVideoTrack(stream.getTracks()[0]);
        roomConfig = {
          name: roomName,
          tracks: [screenTrack],
          dominantSpeaker: true,
        };
      } else {
        roomConfig = {
          name: roomName,
          video: { height: 500 },
          audio: true,
          dominantSpeaker: true,
        };
      }
    }
    Video.connect(token, roomConfig).then((room) => {
      setRoom(room);
      room.on('participantConnected', participantConnected);
      room.on('participantDisconnected', participantDisconnected);
      room.on('dominantSpeakerChanged', (participant) => {
        console.log('The new dominant speaker in the Room is:', participant);
      });
      room.participants.forEach(participantConnected);
    });
    console.log({ room });
    return () => {
      setRoom((currentRoom) => {
        if (currentRoom && currentRoom.localParticipant.state === 'connected') {
          currentRoom.localParticipant.tracks.forEach(function (
            trackPublication,
          ) {
            trackPublication.track.stop();
          });
          currentRoom.disconnect();
          return null;
        } else {
          return currentRoom;
        }
      });
    };
  };

  useEffect(() => {
    myFunction();
  }, [roomName, token, isVideoOn, isMute, isShareScreen]);

  const remoteParticipants = participants.map((participant) => (
    // <Participant style={styles.remoteParti} key={participant.sid} participant={participant} />
    <div>
      <h3>{participant.identity}</h3>
      <img src="/images/defaultAvatar.jpg" alt="Trulli" width="20%"></img>
    </div>
  ));

  const mainShare = () => {
    try {
      // console.log({room});
      if (room && room.localParticipant.identity === 'ducanh')
        return (
          <Participant
            key={room.localParticipant.sid}
            participant={room.localParticipant}
          />
        );

      for (let index = 0; index < participants.length; index++) {
        const element = participants[index];
        if (element.identity === 'ducanh')
          return <Participant key={element.sid} participant={element} />;
      }
    } catch (error) {
      console.log({ room, error });
      // return <Participant key={room.localParticipant.sid} participant={room.localParticipant} />
    }
  };

  const handleLog = () => {
    console.log({ room, participants });
  };
  const handleTurnVideo = () => {
    setVideoOn(!isVideoOn);
  };

  const handleTurnMute = () => {
    setMute(!isMute);
  };
  const handleShareScreen = () => {
    setShareScreen(!isShareScreen);
  };

  return (
    <div className="room" style={styles.room}>
      {/* <h2>Room: {roomName}</h2> */}
      <div style={{ height: 600 }} className="local-participant">
        {mainShare()}
      </div>
      <ButtonGroup
        // style={styles.buttonGroup}
        variant="contained"
        color="primary"
        aria-label="contained primary button group"
      >
        <Button onClick={handleTurnVideo}>
          {isVideoOn ? 'Turn off video' : 'Turn on Video'}
        </Button>
        <Button onClick={handleTurnMute}>{isMute ? 'Unmute' : 'Mute'}</Button>
        <Button onClick={handleShareScreen}>
          {isShareScreen ? 'Stop Share Screen' : 'Share Screen'}
        </Button>
        <Button onClick={handleLogout}>Log out</Button>
        <Button onClick={handleLog}>Log Info</Button>
      </ButtonGroup>

      <h3>Remote Participants</h3>
      <div className="remote-participants" style={styles.remoteParti}>
        {remoteParticipants}
      </div>
    </div>
  );
};
const styles = {
  room: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1,
  },
  remoteParti: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gridGap: '8px',
  },
};

export default Room;
