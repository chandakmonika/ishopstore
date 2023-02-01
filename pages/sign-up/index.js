import { Formik, Form } from 'formik';
import { Form as BForm } from 'react-bootstrap';
import React from 'react';
import { Button, FormErrorMessage } from '../../components';
import { AuthLayout } from '../../components/AuthLayout/AuthLayout';
import { AuthService } from '../../services';
import { deviceType, regx } from '../../utils';
import styles from './index.module.css';
import * as Yup from 'yup';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';
// Form validations
// object key maps with input's name attribute
const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .required('Please Enter your password')
    .matches(
      regx.password,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
    ),
});

export default function SignUp() {
  // register user
  const handleSubmit = async (values, actions) => {
    try {
      actions.setSubmitting(true);
      toast.success('Successfully Signed in');
      const body = {
        ...values,
        login_device: deviceType(),
        device_details: window?.navigator?.userAgent || '', // TODO: may need to change this
      };
      const response = await AuthService.register(body);
      console.info('register response', { response });
    } catch (error) {
      toast.error('Error while Signing in');
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <>
      <AuthLayout>
        <ToastContainer />
        <h3 className="text-center mb-5">Sign Up</h3>
        <Formik
          initialValues={{
            username: '',
            password: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, isSubmitting }) => (
            <Form className={styles.Form}>
              <BForm.Group className="mb-3" controlId="formBasicEmail">
                <BForm.Label>Email</BForm.Label>
                <BForm.Control
                  name="username"
                  type="email"
                  placeholder="Enter your email id"
                  value={values.username}
                  onChange={handleChange}
                />
                <FormErrorMessage name="username" />
              </BForm.Group>
              <BForm.Group className="mb-3" controlId="formBasicPassword">
                <BForm.Label>Password</BForm.Label>
                <BForm.Control
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={values.password}
                  onChange={handleChange}
                />
                <FormErrorMessage name="password" />
              </BForm.Group>
              <Button
                type="submit"
                loading={isSubmitting}
                disable={isSubmitting}
              >
                Register
              </Button>
            </Form>
          )}
        </Formik>
        <span className={`text-center d-block py-3 ${styles.or}`}>or</span>
        <Link href="/otp-login">
          <button className={`btn ${styles.otherLogin}`}>
            Login with your Mobile Number{' '}
          </button>
        </Link>
        <span className={`text-center d-block py-3 ${styles.or}`}>or</span>
        <span className={`text-center d-block pb-3 ${styles.otherText}`}>
          Login with your Google Account
        </span>
        <button className={`btn ${styles.otherLogin}`}>
          <img src="/images/google.svg" alt="google" className="me-2" />
          Google
        </button>
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
    </>
  );
}
