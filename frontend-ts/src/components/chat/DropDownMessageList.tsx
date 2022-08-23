import {Avatar, IconButton, Menu, MenuItem} from '@mui/material';
import {blue} from '@mui/material/colors';
import {useAppSelector} from 'hooks';
import _ from 'lodash';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import {Box} from '@mui/system';
import {addRoomName} from 'features/videoSlice';

interface Props {
    open: boolean
    handleClose: () => void
    anchorEl: null | HTMLElement
}

interface Data {
  id: number | undefined,
  username: string | undefined
}


const DropDownMessageList = (props: Props) => {
  const {employees} = useAppSelector((state) => state.employee);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const openChat = ({id, username}: Data) => navigate('/message/', {state: {
    id,
    username,
  }});

  const openVideo = ({id, username}: Data) => {
    dispatch(addRoomName(`${username}_${id}`));
    navigate('/video/');
  };

  return (
    <Menu
      open={props.open}
      anchorEl={props.anchorEl}
      onClose={props.handleClose}
      onClick={props.handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          'overflow': 'visible',
          'filter': 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          'mt': 1.5,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{horizontal: 'right', vertical: 'top'}}
      anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
    >
      {
        _.map(employees, (employee) => {
          const user: Data = {
            id: employee.user?.id,
            username: employee.user?.username,
          };
          return (
            <Box>
              <MenuItem
                key={employee.id}
                onClick={() => openChat(user)}
                sx={{
                  width: '200px',
                }}
              >
                <Avatar
                  src='/'
                  alt={employee.user?.username}
                  sx={{
                    mr: 2,
                    bgcolor: blue[500],
                  }} /> {employee.user?.username}
              </MenuItem>
              <IconButton
                onClick={() => openVideo(user)}
              >
                <VideoCallIcon
                  sx={{color: 'green'}} />
              </IconButton>
            </Box>
          );
        })
      }
    </Menu>
  );
};

export default DropDownMessageList;
