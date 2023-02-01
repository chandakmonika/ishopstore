import React from 'react';
import styles from './addressCard.module.css';

export const AddressCard = ({ children, customClass }) => {
  return (
    <>
      <div className={`${styles.Card} ${customClass}`}>{children}</div>
    </>
  );
};
