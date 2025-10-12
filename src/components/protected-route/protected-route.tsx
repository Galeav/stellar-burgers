import React, { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { selectIsAuth, selectIsAuthChecked } from '@selectors';
import { useSelector } from '@store';
import { Preloader } from '@ui';
import { Paths } from '@paths';

import { ProtectedRouteProps } from './type';

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  unauthOnly = false,
  children
}) => {
  const location = useLocation();

  const isAuth = useSelector(selectIsAuth);
  const isAuthChecked = useSelector(selectIsAuthChecked);

  if (!isAuthChecked) return <Preloader />;

  if (!isAuth && !unauthOnly) {
    return <Navigate to={Paths.login} replace state={{ from: location }} />;
  }
  if (isAuth && unauthOnly) {
    const back = location.state?.from?.pathname ?? Paths.root;
    return <Navigate to={back} replace />;
  }

  return children;
};
