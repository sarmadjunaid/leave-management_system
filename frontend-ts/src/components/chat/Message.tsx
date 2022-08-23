import {Box} from '@mui/material';
import {Message} from 'services/message';


const Messages = (props: {message: Message}) => {
  const user = JSON.parse(localStorage.getItem('user') || '');
  const styleLeft = {
    borderRadius: '15px 50px 30px 0px',
    marginTop: '10px',
    marginLeft: '10px',
    marginRight: '10px',
    padding: 2,
    display: 'block',
    justifyContent: 'flex-end',
    maxWidth: '60%',
    background: '#607EAA',
    minHeight: '20px',
    wordWrap: 'break-word',
    position: 'relative',
    left: '5px',
  };
  const styleRight = {
    borderRadius: '50px 15px 0px 30px',
    marginTop: '10px',
    marginLeft: '10px',
    marginRight: '10px',
    padding: 2,
    display: 'block',
    justifyContent: 'flex-start',
    maxWidth: '60%',
    background: '#ABC9FF',
    minHeight: '20px',
    wordWrap: 'break-word',
    textAlign: 'right',
    position: 'relative',
    right: '-220px',
  };
  return (
    <>
      <Box
        component='div'
        whiteSpace="normal"
        sx={props.message.sender.username === user.username ? styleLeft : styleRight}
      >
        {props.message.message}
      </Box>
    </>
  );
};

export default Messages;

