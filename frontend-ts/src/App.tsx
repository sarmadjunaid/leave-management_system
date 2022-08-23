import {FunctionComponent, useState} from 'react';
import {Nav} from 'react-bootstrap';
import {NavLink, useNavigate} from 'react-router-dom';
import AppRouter from './components/AppRouter';
import {useAppDispatch} from 'hooks';
import {hasJWT, isManager} from 'features/utils';
import {logout} from 'features/authenticationSlice';
import {useLogoutMutation} from 'services/authentication';
import AppBar from '@mui/material/AppBar';
import ToolBar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import DropDownMessageList from 'components/chat/DropDownMessageList';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import IconButton from '@mui/material/IconButton';
import React from 'react';
import {Typography} from '@mui/material';
import {addRoomName} from 'features/videoSlice';


const Main: FunctionComponent = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();


  const [logoutToken] = useLogoutMutation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const openChat = () => navigate('/message/');

  const openVideo = () => {
    dispatch(addRoomName(`${user.username}_${user.id}`));
    navigate('/video/');
  };

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();

    await logoutToken(user);
    dispatch(logout());
    navigate('/');
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position='static'>
        <ToolBar>
          <Typography variant='h6' component='div' sx={{flexGrow: 1}}>
              Leave Management System
          </Typography>
          {hasJWT() ? (
            isManager() ? (
              <Nav className="me-auto">
                <Nav.Link as={NavLink} to="/manager" style={{color: 'white'}}>
                  Profile
                </Nav.Link>
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ml: 2}}
                >
                  <MailOutlineOutlinedIcon sx={{color: 'white'}}/>
                </IconButton>
                <DropDownMessageList
                  handleClose={handleClose}
                  anchorEl={anchorEl}
                  open={open}
                />
                <Button variant="text" onClick={handleLogout} style={{color: 'white'}}>
                  Logout
                </Button>
              </Nav>
            ) : (
              <Nav className="me-auto">
                <Nav.Link as={NavLink} to="/employee" style={{color: 'white'}}>
                  Profile
                </Nav.Link>
                <Nav.Link as={NavLink} to="/submit_leaves" style={{color: 'white'}}>
                  Submit Leaves
                </Nav.Link>
                <IconButton onClick={openChat}>
                  <MailOutlineOutlinedIcon sx={{color: 'white'}}/>
                </IconButton>
                <IconButton onClick={openVideo}>
                  <VideoCallIcon sx={{color: 'white'}}/>
                </IconButton>
                <Button variant="text" onClick={handleLogout} style={{color: 'white'}}>
                  Logout
                </Button>
              </Nav>
            )
          ) : (
            <>
              <Nav.Link as={NavLink} to="/login" style={{color: 'white'}}>
                Login
              </Nav.Link>
              <Nav.Link as={NavLink} to="/register" style={{color: 'white'}}>
                Register
              </Nav.Link>
            </>
          )}
        </ToolBar>
      </AppBar>
      <AppRouter />
    </>
  );
};

export default Main;
