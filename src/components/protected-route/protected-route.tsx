import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';
import { useSelector } from '@store';
import { FC, ReactNode } from 'react';
import { selectIsUserAuthChecked, selectIsUserAuthenticated } from '@slices';

interface TProtectedRouteProps {
  onlyUnAuth?: boolean;
  children: ReactNode;
}

export const ProtectedRoute: FC<TProtectedRouteProps> = ({
  onlyUnAuth = false,
  children
}) => {
  const isAuthChecked = useSelector(selectIsUserAuthChecked);
  const isAuthenticated = useSelector(selectIsUserAuthenticated);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (onlyUnAuth && isAuthenticated) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};
