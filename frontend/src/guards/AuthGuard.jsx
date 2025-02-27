import { Navigate, Outlet} from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const AuthGuard = ({ allowedRoles }) => {
  const { user } = useAuth();
  const userRol = window.sessionStorage.getItem('userRol');

  if (!user || !userRol) {
    return <Navigate to="/" />;
  }

  if (!allowedRoles.includes(userRol)) {
    return <Navigate to="/no-autorizado" />;
  }

  // if (allowedRoles.includes(userRol)) {
  //   return <Outlet />;
  // }

  return < Outlet/>;
};

export default AuthGuard;