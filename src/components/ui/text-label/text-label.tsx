import { FC } from 'react';
import { TextLabelUIProps } from './type';

export const TextLabelUI: FC<TextLabelUIProps> = ({ text = '' }) => (
  <>
    <h3 className='text text_type_main-medium mt-2 mb-4'>{text}</h3>
  </>
);
