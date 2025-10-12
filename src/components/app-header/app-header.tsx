import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '@store';
import { selectUser } from '@selectors';
import { TUser } from '@utils-types';

export const AppHeader: FC = () => {
  const user: TUser | null = useSelector(selectUser);
  return <AppHeaderUI userName={user?.name || ''} />;
};
