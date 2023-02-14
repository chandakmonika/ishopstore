import Router from 'next/router';
import { useEffect } from 'react';
// import { Col, Container, Row } from 'react-bootstrap';
import { shallowEqual, useSelector } from 'react-redux';
// import { AppLayout } from '../AppLayout';
// import styles from './index.module.css';

export const AuthLayoutPages = ({ children }) => {
    const excludeAuthentication = ["/", "/about-us", "/contact-us"]
    console.log(768,children)
  const { isAuthenticated, isAuthenticating } = useSelector(
    state => ({
      isAuthenticated: state.auth.isAuthenticated,
      isAuthenticating: state.auth.isAuthenticating,
    }),
    shallowEqual,
  );

  useEffect(() => {
    if (isAuthenticating) return;
    console.log(879, !isAuthenticated && !excludeAuthentication.includes(Router.pathname), excludeAuthentication.includes(Router.pathname), excludeAuthentication, (Router.pathname))
    if (!isAuthenticated && !excludeAuthentication.includes(Router.pathname)) {
      Router.push('/login');
    }
  }, [isAuthenticated, isAuthenticating]);

  if (!isAuthenticated) return null;
  console.log(4356, children)
  return (<>{children}</>);
};
