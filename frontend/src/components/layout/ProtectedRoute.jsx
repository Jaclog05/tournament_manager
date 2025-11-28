import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className='vh-100 w-100 d-flex justify-content-center align-items-center'>
    <img src="/loading.gif" alt="Loading..." width="100px" />
  </div>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;