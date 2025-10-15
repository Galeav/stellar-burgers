import { ReactNode } from 'react';

export type ProtectedRouteProps = {
  unauthOnly?: boolean;
  children: ReactNode;
};
