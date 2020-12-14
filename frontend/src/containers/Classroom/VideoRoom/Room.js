import React, { useState, useEffect } from 'react';
import Video from 'twilio-video';
// import { LocalVideoTrack } from 'twilio-video';
import Participant from './Participant';
import ChatScreen from '../Chat/ChatScreen';

const Room = ({ roomName, token, handleLogout }) => {
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [isVideoOn, setVideoOn] = useState(false);
  const [isMute, setMute] = useState(false);
  const [isShareScreen, setShareScreen] = useState(false);
  // const [roomConfig, setRoomConfig] = useState({
  //   name: roomName,
  //   // video: isVideoOn?{width:640}:false,
  //   // audio:isMute,
  //   dominantSpeaker: true,
  //   tracks: [screenTrack],
  // });

  const myFunction = async () => {
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
      };
    } else {
      if (isShareScreen) {
        const stream = await navigator.mediaDevices.getDisplayMedia();
        const screenTrack = new Video.LocalVideoTrack(stream.getTracks()[0]);
        roomConfig = {
          name: roomName,
          tracks: [screenTrack],
        };
      } else {
        roomConfig = {
          name: roomName,
          video:{height:500}
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
    <Participant key={participant.sid} participant={participant} />
  ));
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
    <div className="room">
      {/* <h2>Room: {roomName}</h2> */}
      <div style={{ height: 600 }} className="local-participant">
        {room &&
         (
          <Participant
            key={room.localParticipant.sid}
            participant={room.localParticipant}
            inden={true}
          />
        )}
      </div>
      <button onClick={handleLogout}>Log out</button>
      <button onClick={handleLog}>Log info</button>
      <button onClick={handleTurnVideo}>
        {isVideoOn ? 'Turn off video' : 'Turn on Video'}
      </button>
      <button onClick={handleTurnMute}>{isVideoOn ? 'Unmute' : 'Mute'}</button>
      <button onClick={handleShareScreen}>
        {isShareScreen ? 'Stop Share Screen' : 'Share Screen'}
      </button>
      <h3>Remote Participants</h3>
      <div className="remote-participants">{remoteParticipants}</div>
    </div>
  );
};

export default Room;
