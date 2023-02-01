import Link from 'next/link';
import React, { useState } from 'react';
import { Form as BForm } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Button, FormErrorMessage } from '../../components';
import { AuthLayout } from '../../components/AuthLayout/AuthLayout';
import { EyeHideIcon, EyeShowIcon } from '../../public/svg';
import styles from './index.module.css';
import { AuthService } from '../../services/Auth';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { authenticating, loginFail, loginSuccess } from '../../redux/authSlice';
import { toast, ToastContainer } from 'react-toastify';
const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .email('Invalid email')
    .required('Required'),
  //TODO: uncomment when we have proper passwords registered
  // password: Yup.string()
  //   .required('Please Enter your password')
  //   .matches(
  //     regx.password,
  //     'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
  //   ),
});

export default function Login() {
  const dispatch = useDispatch();
  const [passwordShown, setPasswordShown] = useState(false);
  const [error, setError] = useState(' ');

  const handleSubmit = async (values, actions) => {
    try {
      actions.setSubmitting(true);
      dispatch(authenticating());

      const { data } = await AuthService.login(values);
      toast.success('Successfully logged in');
      dispatch(loginSuccess(data));
    } catch (error) {
      setError(error?.response?.data?.message);
      toast.error(' Error while logging in');
      dispatch(loginFail());
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <AuthLayout>
        <h3 className="text-center mb-5">Login</h3>
        <Formik
          initialValues={{
            username: 'simon@mailinator.com',
            password: '123456',
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
                  value={values.username}
                  placeholder="Sapnadhotre@gmail.com"
                  onChange={handleChange}
                />
                <FormErrorMessage name="username" />
              </BForm.Group>

              <BForm.Group
                className="mb-3 position-relative"
                controlId="formBasicPassword"
              >
                <BForm.Label>Password</BForm.Label>
                <BForm.Control
                  name="password"
                  value={values.password}
                  type={passwordShown ? 'text' : 'password'}
                  placeholder="************"
                  onChange={handleChange}
                />
                <span
                  className={styles.Icon}
                  onClick={() => setPasswordShown(prev => !prev)}
                >
                  {passwordShown ? <EyeHideIcon /> : <EyeShowIcon />}
                </span>
                <FormErrorMessage name="password" />
              </BForm.Group>
              <BForm.Group className="mb-3">
                <a href="">Forgot your Password ?</a>
              </BForm.Group>
              <BForm.Group style={{ color: 'red' }}>{error}</BForm.Group>
              <Button type="submit" loading={isSubmitting}>
                Login
              </Button>
            </Form>
          )}
        </Formik>
        <button className={`btn  mt-4 mb-5 ${styles.otherLogin}`}>
          <img src="/images/google.svg" alt="google" className="me-2" />
          Google
        </button>
        <p className="mb-0">
          Dont’ have an account?{' '}
          <Link href="/sign-up">
            <span style={{ color: '#FBA900', cursor: 'pointer' }}>Signup</span>
          </Link>
        </p>
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
