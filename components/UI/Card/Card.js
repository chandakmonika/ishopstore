import React from 'react';
import styles from './card.module.css';

export const Card = ({ children , customClass}) => {
  return (
    <>
      <div className={`${styles.Card} ${customClass}`}>{children}</div>
    </>
  );
};
