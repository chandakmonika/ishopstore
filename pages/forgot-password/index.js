import React from 'react';
import { Form } from 'react-bootstrap';
import { Button } from '../../components';
import { AuthLayout } from '../../components/AuthLayout/AuthLayout';
import styles from './index.module.css';

export default function ForgotPassword() {
  
  return (
    <AuthLayout>
        <h3 className='text-center mb-5'>Forgot Password</h3>
       <Form className={styles.Form}>
      <Form.Group className="mb-4" controlId="formBasicEmail">
        <Form.Label>Email / Mobile Number</Form.Label>
        <Form.Control type="text" placeholder="Enter your email id or mobile number" />
      </Form.Group>
      <Button>
        Reset
      </Button>
    </Form>
    
    </AuthLayout>
  );
}
