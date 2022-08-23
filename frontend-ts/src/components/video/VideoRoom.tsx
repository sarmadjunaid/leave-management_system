import {useJoinRoomQuery} from 'services/video';
import {useAppSelector} from 'hooks';
import Twilio from 'twilio-video';
import Grid from '@mui/material/Grid';
import {useEffect} from 'react';

const VideoRoom = () => {
  const {roomName} = useAppSelector((state: { video: any; }) => state.video);

  const container = document.getElementById('video-container');

  const joinVideoRoom = async (roomName: string, token: string) => {
    const room = await Twilio.connect(token, {
      name: roomName,
      audio: true,
      video: {
        frameRate: 60,
        width: 930,
        height: 700},
    });
    return room;
  };

  const handleDisconnectedParticipant = (participant: Twilio.LocalParticipant | Twilio.Participant) => {
    participant.removeAllListeners();
    const participantDiv = document.getElementById(participant.identity);
    participantDiv?.remove();
  };


  const handleTrackPublication = (trackPublication: any, participant: Twilio.LocalParticipant | Twilio.Participant) => {
    console.log(trackPublication.track);
    // eslint-disable-next-line require-jsdoc
    function displayTrack(track: Twilio.LocalVideoTrack | Twilio.LocalAudioTrack) {
      const participantDiv = document.getElementById(participant.identity);

      participantDiv?.append(track.attach());
    }


    if (trackPublication.track) {
      displayTrack(trackPublication.track);
    }


    trackPublication.on('subscribed', displayTrack);
  };

  const handleConnectedParticipant = (participant: Twilio.LocalParticipant | Twilio.Participant) => {
    const participantDiv = document.createElement('div');
    participantDiv.setAttribute('id', participant.identity);
    container?.appendChild(participantDiv);


    participant.tracks.forEach((trackPublication) => {
      handleTrackPublication(trackPublication, participant);
    });

    participant.on('trackPublished', handleTrackPublication);
  };

  const startRoom = async (roomName: string) => {
    const {data, isSuccess} = useJoinRoomQuery(roomName);
    if (isSuccess) {
      const room = await joinVideoRoom(roomName, data.token);
      console.log(room);

      handleConnectedParticipant(room.localParticipant);
      room.participants.forEach(handleConnectedParticipant);
      room.on('participantConnected', handleConnectedParticipant);

      room.on('participantDisconnected', handleDisconnectedParticipant);
      window.addEventListener('pagehide', () => room.disconnect());
      window.addEventListener('beforeunload', () => room.disconnect());
    }
  };

  roomName ? startRoom(roomName) : null;

  useEffect(() => {
    const x = document.querySelectorAll<HTMLElement>('BODY')[0];
    x.style.backgroundColor = 'black';

    return () => {
      x.style.backgroundColor = '';
    };
  });

  return (
    <Grid style={{
      margin: '50px 25px 0px 25px',
    }}>
      <div id='video-container' style={{
        display: 'flex',
      }}>
      </div>
    </Grid>
  );
};

export default VideoRoom;
