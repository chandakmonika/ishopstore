import Link from 'next/link';
import React from 'react';
import { Form } from 'react-bootstrap';
import { Button } from '../../components';
import { AuthLayout } from '../../components/AuthLayout/AuthLayout';
import styles from './index.module.css';

export default function OtpLogin() {
  return (
    <AuthLayout>
      <h3 className="text-center mb-5">Login</h3>
      <Form className={` ${styles.Form}`}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Enter your Mobile Number</Form.Label>
          <Form.Control type="tel" placeholder="9923076582" />
        </Form.Group>
        <Button>Get OTP</Button>
      </Form>

      <p className="mt-4 mb-0">
        Dont’ have an account?{' '}
        <Link href="/sign-up">
          <span href="" style={{ color: '#FBA900', cursor: 'pointer' }}>
            Signup
          </span>
        </Link>
      </p>
      <p className="mb-0 pt-3 pb-5">
        By continuing, you agree that you have read and accept
        <a href="" className="ps-1 pb-5">
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
