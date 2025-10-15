import { FC, memo, ReactNode } from 'react';

import styles from './modal.module.css';

import { CloseIcon } from '@zlden/react-developer-burger-ui-components';
import { TModalUIProps } from './type';
import { ModalOverlayUI } from '@ui';

export const ModalUI: FC<TModalUIProps> = memo(
  ({ title, onClose, children }) => {
    const headerElement: ReactNode =
      typeof title === 'string' ? (
        <h3 className={`${styles.title} text text_type_main-large`}>{title}</h3>
      ) : (
        title
      );

    return (
      <>
        <div className={styles.modal}>
          <div className={styles.header}>
            {headerElement}
            <button className={styles.button} type='button'>
              <CloseIcon type='primary' onClick={onClose} />
            </button>
          </div>
          <div className={styles.content}>{children}</div>
        </div>
        <ModalOverlayUI onClick={onClose} />
      </>
    );
  }
);
