import React, { useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { Subscription } from '../../services/Subscription';
import { Button } from '../UI';
import styles from './newsletter.module.css';
import { toast } from 'react-toastify';
export const NewsLetter = () => {
  const [email, setEmail] = useState(' ');

  const handleChange = e => {
    setEmail(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!email) {
      toast.warning('Please enter email');
      return;
    }

    try {
      const response = await Subscription.emailSend({ email });
      if (response)
        toast.success('You have successfully subscribed to newsletter.');
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <section className={styles.NewsLetterSection}>
      <Container>
        <Row>
          <Col md={8} className="mx-auto text-center">
            <div className={styles.Content}>
              <h3>Newsletter</h3>
              <p>
                Subscribe now and receive exclusive coupons and special offers
                in your inbox !{' '}
              </p>
              <div className={`d-flex gap-3 justify-content-center`}>
                <Form className={`d-flex ${styles.searchForm}`}>
                  <Form.Control
                    type="email"
                    onChange={handleChange}
                    placeholder="Email Address"
                    className="me-2"
                    aria-label="Search"
                    style={{ height: '58px' }}
                  />
                </Form>
                <Button onClick={handleSubmit}>Shop Now</Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
