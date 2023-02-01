import { ErrorMessage } from 'formik';
import React from 'react';

export const FormErrorMessage = ({ name }) => {
  return (
    <ErrorMessage name={name}>
      {msg => <div className="text-danger mt-1 small">{msg}</div>}
    </ErrorMessage>
  );
};
