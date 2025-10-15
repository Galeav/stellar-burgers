import { FC, ReactNode } from 'react';
import { useParams } from 'react-router-dom';

import { Modal } from '@components';
import { OrderInfo } from '@components';
import { OrderModalProps } from './type';
import { NumberLabel } from '@ui';

export const OrderModal: FC<OrderModalProps> = ({ onClose }) => {
  const { number = '' } = useParams<{ number: string }>();

  const num = Number(number);
  const title: ReactNode = num ? <NumberLabel num={num} /> : 'Детали заказа';

  return (
    <Modal title={title} onClose={onClose}>
      <OrderInfo />
    </Modal>
  );
};
