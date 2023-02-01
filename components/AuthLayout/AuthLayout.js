import Router from 'next/router';
import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { shallowEqual, useSelector } from 'react-redux';
import { AppLayout } from '../AppLayout';
import styles from './index.module.css';

export const AuthLayout = ({ children }) => {
  const { isAuthenticated, isAuthenticating } = useSelector(
    state => ({
      isAuthenticated: state.auth.isAuthenticated,
      isAuthenticating: state.auth.isAuthenticating,
    }),
    shallowEqual,
  );

  useEffect(() => {
    if (isAuthenticating) return;

    if (isAuthenticated) {
      Router.push('/');
    }
  }, [isAuthenticated, isAuthenticating]);

  if (isAuthenticated) return null;
  return (
    <div>
      <AppLayout>
        <main className={styles.main}>
          <Container>
            <Row>
              <Col md={5} className="mx-auto">
                <div className={styles.authForm}>{children}</div>
              </Col>
            </Row>
          </Container>
        </main>
      </AppLayout>
    </div>
  );
};
