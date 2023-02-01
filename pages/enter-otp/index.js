import React from 'react';
import { Form } from 'react-bootstrap';
import { Button } from '../../components';
import { AuthLayout } from '../../components/AuthLayout/AuthLayout';
import styles from './index.module.css';

export default function EnterOtp() {
  return (
    <AuthLayout>
      <h3 className="text-center mb-5">Login</h3>
      <Form className={styles.Form}>
        <Form.Group className="mb-3" controlId="formBasicPhone">
          <Form.Label>Mobile Number </Form.Label>
          <Form.Control name="phone" type="tel" placeholder="+ 91 9923076582" />
        </Form.Group>

        <Form.Group
          className="mb-3 position-relative"
          controlId="formBasicPassword"
        >
          <Form.Label>Enter OTP</Form.Label>
          <Form.Control name="otp" type="password" placeholder="************" />
        </Form.Group>

        <Button>Login</Button>
      </Form>

      <p className="mb-0 pt-3 pb-5">
        By continuing, you agree that you have read and accept
        <a href="" className="ps-1">
          Terms of Use
        </a>{' '}
        and{' '}
        <a href="" className="ps-1">
          Privacy Policy.
        </a>
      </p>
    </AuthLayout>
  );
}
