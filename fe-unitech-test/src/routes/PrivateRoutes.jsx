import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

function privateRoutes({ children }) {
  const access_token = Cookies.get('access_token');

  if (!access_token) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default privateRoutes;
