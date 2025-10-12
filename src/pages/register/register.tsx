import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '@store';
import { selectAuthError, selectAuthRequest } from '@selectors';
import { register } from '@slices';
import { Preloader } from '@ui';

export const Register: FC = () => {
  const dispatch = useDispatch();

  const error = useSelector(selectAuthError);
  const authRequest = useSelector(selectAuthRequest);

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (authRequest) return;
    dispatch(register({ name: userName, email, password }));
  };

  if (authRequest) return <Preloader />;

  return (
    <RegisterUI
      errorText={error || ''}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
