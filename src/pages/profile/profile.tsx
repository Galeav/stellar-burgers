import React, { FC, SyntheticEvent, useEffect, useState } from 'react';

import { ProfileUI } from '@ui-pages';
import { useDispatch, useSelector } from '@store';
import { selectAuthError, selectAuthRequest, selectUser } from '@selectors';
import { updateUser, clearAuthError } from '@slices';
import { Preloader } from '@ui';

import { ProfileForm, TUpdateUserPayload } from './type';

export const Profile: FC = () => {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const authRequest = useSelector(selectAuthRequest);
  const error = useSelector(selectAuthError);

  const [formValue, setFormValue] = useState<ProfileForm>({
    name: user?.name ?? '',
    email: user?.email ?? '',
    password: ''
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [user]);

  useEffect(
    () => () => {
      dispatch(clearAuthError());
    },
    [dispatch]
  );

  const isFormChanged =
    formValue.name !== (user?.name ?? '') ||
    formValue.email !== (user?.email ?? '') ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const payload: TUpdateUserPayload = {};
    if (formValue.name !== (user?.name ?? '')) payload.name = formValue.name;
    if (formValue.email !== (user?.email ?? ''))
      payload.email = formValue.email;
    if (formValue.password) payload.password = formValue.password;

    if (Object.keys(payload).length)
      dispatch(updateUser(payload))
        .unwrap()
        .then(() => {
          setFormValue((prev) => ({ ...prev, password: '' }));
        })
        .catch(() => {});
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user?.name ?? '',
      email: user?.email ?? '',
      password: ''
    });
    dispatch(clearAuthError());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
    dispatch(clearAuthError());
  };

  if (authRequest) return <Preloader />;

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
      updateUserError={error || ''}
    />
  );
};
