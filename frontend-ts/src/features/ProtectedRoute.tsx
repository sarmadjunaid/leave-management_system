import {Outlet} from 'react-router-dom';
import {hasJWT} from 'features/utils';
import UnauthorizedError from 'components/Errors/UnauthorizedError';

const ProtectedRoute = ({component: Component, ...rest}: any) => {
  return hasJWT() ? <Outlet /> : <UnauthorizedError />;
};

export default ProtectedRoute;

