import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '@store';
import { selectAuthError, selectAuthRequest } from '@selectors';
import { login } from '@slices';
import { Preloader } from '@ui';

export const Login: FC = () => {
  const dispatch = useDispatch();

  const error = useSelector(selectAuthError);
  const authRequest = useSelector(selectAuthRequest);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (authRequest) return;
    dispatch(login({ email, password }));
  };

  if (authRequest) return <Preloader />;

  return (
    <LoginUI
      errorText={error || ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
