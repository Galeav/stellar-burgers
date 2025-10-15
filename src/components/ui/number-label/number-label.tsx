import React, { FC } from 'react';
import clsx from 'clsx';

import { NumberLabelProps } from './type';
import styles from './number-label.module.css';

export const NumberLabel: FC<NumberLabelProps> = ({
  num = 0,
  fullPage = false
}) => (
  <>
    <span
      className={clsx(
        'text text_type_digits-default',
        fullPage && styles.number_full
      )}
    >
      #{String(num).padStart(6, '0')}
    </span>
  </>
);
