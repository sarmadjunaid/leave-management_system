import {FunctionComponent} from 'react';
import {Route, Routes} from 'react-router-dom';
import ProtectedRoute from 'features/ProtectedRoute';
// import Profile from 'components/employee/Profile';
import SubmitLeaves from 'components/employee/SubmitLeaves';
import LoginForm from 'components/LoginForm';
import Profile from 'components/Profile';

import Manager from 'components/manager/Manager';
import RegisterForm from 'components/RegisterForm';
import PageNotFound from './Errors/PageNotFound';
import ChatBox from 'components/chat/ChatBox';
import VideoRoom from './video/VideoRoom';
import Home from 'components/Home';
import {isManager} from 'features/utils';
import Protected from './Protected';

const apiRoutes = {
  home: '',
  login: '/login/',
  register: '/register/',
  employee: '/employee/',
  saveLeave: '/submit_leaves/',
  manager: '/manager/',
  message: '/message/',
  video: '/video/',
};

const AppRouter: FunctionComponent = () => {
  return (
    <Routes>
      <Route path='/protected/' element={<Protected />} />
      <Route path={apiRoutes.home} element={<Home />} />
      <Route path='/profile/' element={<Profile />} />
      <Route path={apiRoutes.login} element={<LoginForm />} />
      <Route path={apiRoutes.register} element={<RegisterForm />} />
      <Route path={apiRoutes.message} element={<ProtectedRoute />}>
        <Route path={apiRoutes.message} element={<ChatBox />} />
      </Route>
      <Route path={apiRoutes.video} element={<ProtectedRoute />}>
        <Route path={apiRoutes.video} element={<VideoRoom />} />
      </Route>
      <>
        {!isManager() ? (
          <>
            <Route path={apiRoutes.employee} element={<ProtectedRoute />}>
              {/* <Route path={apiRoutes.employee} element={<Profile />} /> */}
            </Route>
            <Route path={apiRoutes.saveLeave} element={<ProtectedRoute />}>
              <Route path={apiRoutes.saveLeave} element={<SubmitLeaves />} />
            </Route>
          </>
        ) :
          <Route path={apiRoutes.manager} element={<ProtectedRoute />}>
            <Route path={apiRoutes.manager} element={<Manager />} />
          </Route>
        }
      </>
      <Route path='*' element={<PageNotFound />} />
    </Routes>

  );
};

export default AppRouter;
