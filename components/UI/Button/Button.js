import React from 'react';
import { Button as RButton } from 'react-bootstrap';
import styles from './button.module.css';

export const Button = ({ children, loading, ...rest }) => {
  // method to handle button content
  const renderButtonContent = () => {
    // loading state of button
    if (loading) return 'Please wait ...';

    return children;
  };
  return (
    <RButton
      className={styles.button}
      {...rest}
      style={{ color: '#171616', background: '#FBA900' }}
    >
      {renderButtonContent()}
    </RButton>
  );
};
