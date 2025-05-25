import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function AdminRoute({ children }: { children: JSX.Element }) {
  const { user, isAdmin, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (!isAdmin) return <Navigate to="/" />;

  return children;
}
