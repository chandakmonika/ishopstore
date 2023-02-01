import Link from 'next/link';
import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { AddressCard, AppLayout, Button } from '../../components';
import styles from './index.module.css';

export default function Payment() {
  const [paymentMode, setPaymentMode] = useState('cod');

  return (
    <>
      <AppLayout>
        <section className={styles.paymentSection}>
          <Container>
            <AddressCard customClass="p-5">
              <h3 className={styles.title}>Select Payment Method</h3>
              <AddressCard>
                <Row>
                  <Col md={4}>
                    <div className={styles.list}>
                      <ul>
                        <li
                          id="online"
                          onClick={e => setPaymentMode(e.target.id)}
                        >
                          <img src="/images/credit-card.svg" alt="credit" />
                          <span>Pay Online</span>
                        </li>
                        <li id="cod" onClick={e => setPaymentMode(e.target.id)}>
                          <img src="/images/credit-card.svg" alt="credit" />
                          <span>Cash on Delivery</span>
                        </li>
                      </ul>

                      <h3 className={styles.title}>Cards accepted</h3>
                      <img src="/images/payment.svg" alt="payment" />
                    </div>
                  </Col>
                  <Col md={8}>
                    <div className={styles.rightData}>
                      <img
                        src="/images/card.png"
                        alt="card"
                        className={styles.paycards}
                      />
                      <div className={styles.content}>
                        <div className="d-flex gap-4">
                          <h3 className={styles.title}>Total Amount Payble</h3>
                          <p className={styles.title}>Rs 995</p>
                        </div>
                        {(paymentMode != 'online' && (
                          <Link href="/order" passHref>
                            <Button>Order Placed</Button>
                          </Link>
                        )) || (
                          <Link href="/pay-securely" passHref>
                            <Button>Pay Securely</Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </Col>
                </Row>
              </AddressCard>
            </AddressCard>
          </Container>
        </section>
      </AppLayout>
    </>
  );
}
