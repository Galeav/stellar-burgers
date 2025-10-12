import { FC } from 'react';
import { TextLabelProps } from './type';

export const TextLabel: FC<TextLabelProps> = ({ text = '' }) => (
  <>
    <h3 className='text text_type_main-medium mt-2 mb-4'>{text}</h3>
  </>
);
