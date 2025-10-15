import { TRegisterData } from '@api';

export type ProfileForm = { name: string; email: string; password: string };
export type TUpdateUserPayload = Partial<TRegisterData>;
