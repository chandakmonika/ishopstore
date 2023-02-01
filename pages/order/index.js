import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Success } from '../../public/svg';
import { AppLayout, AddressCard } from '../../components';
import styles from './index.module.css';
import Link from 'next/link';

const OrderPage = () => {
  return (
    <>
      <AppLayout>
        <section className={styles.section}>
          <Container>
            <AddressCard customClass={styles.bgColor}>
              <Row>
                <Col md={6}>
                  <AddressCard customClass="h-100">
                    <div className="d-flex justify-content-center align-items-center flex-column gap-3 h-100">
                      <Success />
                      <h4 className={styles.title}>
                        Order 45678123456 is created successfully{' '}
                      </h4>
                      <p className={styles.desc}>
                        <Link href="/user/my-orders/order-list">
                          <span
                            style={{
                              color: 'var(--color-green)',
                              paddingRight: '5px',
                              cursor: 'pointer',
                            }}
                          >
                            View Order
                          </span>
                        </Link>
                        or <Link href="/"> Continue Shopping</Link>
                      </p>
                    </div>
                  </AddressCard>
                </Col>

                <Col md={6}>
                  <AddressCard customClass="h-100">
                    <div style={{ height: '100%' }}>
                      <div className={`pb-2 ${styles.header}`}>
                        <b>Price Details</b>
                      </div>
                      <ul className={`list-unstyled mt-3 ${styles.ulList}`}>
                        <li className="d-flex justify-content-between">
                          <span className={styles.list}>Price ( 3 item )</span>
                          <span className={styles.price}>Rs. 950</span>
                        </li>
                        <li className="d-flex justify-content-between">
                          <span className={styles.list}>Discount</span>
                          <span className={styles.price}>Rs. 160</span>
                        </li>
                        <li className="d-flex justify-content-between">
                          <span className={styles.list}>Delivary Charges</span>
                          <span className={styles.free}>Free</span>
                        </li>
                        <li className="d-flex justify-content-between">
                          <span className={styles.list}>Your Savings</span>
                          <span className={styles.price}>Rs. 900</span>
                        </li>
                      </ul>
                      <div className="d-flex justify-content-between">
                        <span className={styles.total}>
                          <b>Total Amount</b>
                        </span>
                        <span className={styles.totalRate}>Rs. 900</span>
                      </div>
                    </div>
                  </AddressCard>
                </Col>
              </Row>
            </AddressCard>
            {/* <Row>
              <Col md={6} className="mx-auto">
                <AddressCard customClass={`bg-white ${styles.heightBox}`}>
                  <div className="d-flex justify-content-center align-items-center flex-column gap-3 h-100">
                    <CloseIcon />
                    <h4 className={styles.title}>
                      Your Payment faild for Order Id 114654654
                    </h4>
                    <p className={styles.desc}>
                      <a
                        style={{
                          color: 'var(--color-green)',
                          paddingRight: '5px',
                        }}
                      >
                        Retry payment
                      </a>
                    </p>
                  </div>
                </AddressCard>
              </Col>
            </Row> */}
          </Container>
        </section>
      </AppLayout>
    </>
  );
};
export default OrderPage;
