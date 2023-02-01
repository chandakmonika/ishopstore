import React from 'react';
import { Form } from 'react-bootstrap';
import styles from './checkbox.module.css';

export const Checkbox = ({ label }) => {
  return (
    <>
      <div className={`mb-3 custom-checkbox ${styles.checkBox}`}>
        <Form.Check type="checkbox" id={`default-checkbox`} label={label} />
      </div>
    </>
  );
};
