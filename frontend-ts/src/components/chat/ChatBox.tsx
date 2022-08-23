import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import SendIcon from '@mui/icons-material/Send';
import {Button} from '@mui/material';
import {useGetMessageQuery} from 'services/message';
import {useNavigate, useLocation} from 'react-router-dom';
import Message from 'components/chat/Message';
import {useAppDispatch, useAppSelector} from 'hooks';
import {addMessage} from 'features/messagesSlice';
import * as Yup from 'yup';

import _ from 'lodash';
import {Form, Formik} from 'formik';
import TextInputField from 'components/Fields/TextField';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


interface ChatData {
  channel: string,
  message: string,
  sender: number,
  receiver: number
}

const ChatBox = () => {
  const user = JSON.parse(localStorage.getItem('user') || '');
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as {
    id: number
    username: string
  };

  const {message} = useAppSelector((state) => state.message);


  let chatData: ChatData = {
    channel: '',
    message: '',
    sender: 0,
    receiver: 0,
  };
  if (user.isManager) {
    chatData = {
      channel: `${state.username}_${state.id}`,
      message: message,
      sender: user.id,
      receiver: state.id,
    };
  } else {
    chatData = {
      channel: `${user.username}_${user.id}`,
      message: message,
      sender: user.id,
      receiver: user.managerId,
    };
  }

  const {data, isSuccess} = useGetMessageQuery(chatData);

  const dispatch = useAppDispatch();

  const handleClose = () => navigate(-1);


  return (
    <>
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Chat
          </Typography>
          <Box
            sx={{
              border: '1px solid black',
              height: 500,
              maxHeight: 500,
              width: 'auto',
              overflow: 'auto',
            }}
          >
            {
              isSuccess ?
                _.map(data, (val, index) => {
                  return (<Message message={val} key={index}/>);
                }) :
              null
            }
          </Box>
          <Box sx={{mt: 2}}>
            <Formik
              initialValues={{chatMessage: ''}}
              validationSchema={Yup.object({
                chatMessage: Yup.string(),
              })}
              onSubmit={async (values: {chatMessage: string}, {setSubmitting, resetForm}) => {
                dispatch(addMessage(values.chatMessage));
                resetForm({values: {chatMessage: ''}});
                setSubmitting(false);
              }}
            >
              <Form>
                <TextInputField
                  label='Sned Message'
                  name="chatMessage"
                  type="chatMessage"
                  placeholder="Enter your text"
                  required
                />
                <Button type='submit'>
                  <SendIcon color='primary' fontSize='medium'/>
                </Button>
              </Form>
            </Formik>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ChatBox;

