import Link from 'next/link';
import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { AddressCard, AppLayout, CartList } from '../../components';
import styles from './index.module.css';

export default function Checkout() {
  const currency = useSelector(state => state.ui.currancy);

  const Itemprice = 500;
  const deliverycharges = 50;
  const totalprice = Itemprice + deliverycharges;

  return (
    <>
      <AppLayout>
        <Container className={`py-3 ${styles.headTitle}`}>
          <h3>
            View Cart <span> 9 items</span>
          </h3>
        </Container>
        <section>
          <Container>
            <Row>
              <Col md={8}>
                <div className={styles.addressList}>
                  <h4 className={styles.title}> Delivery Address</h4>
                  <AddressCard>
                    <div className="d-flex gap-3 align-items-start">
                      <div className={styles.content}>
                        <h5 className={styles.title}>Address 1</h5>
                        <p className={styles.addNew}>
                          State Bank Nagar, B Wing Flat Number 2, Panchwati ,
                          Pune - 411008
                        </p>
                      </div>
                    </div>
                  </AddressCard>
                </div>
                <div className={styles.viewCart}>
                  <h4 className={styles.title}>Total Items in Cart</h4>
                  <AddressCard customClass="p-0">
                    <CartList />
                    <CartList />
                    <CartList />
                  </AddressCard>
                </div>
              </Col>
              <Col md={4}>
                <div className={`mb-4 ${styles.priceDetailCard}`}>
                  <AddressCard>
                    <div className={`pb-2 ${styles.header}`}>Price Details</div>
                    <ul className={`list-unstyled mt-3 ${styles.ulList}`}>
                      <li>
                        <span className={styles.list}>Price ( 3 item )</span>
                        <span className={styles.price}>
                          {currency + Itemprice}
                        </span>
                      </li>

                      <li>
                        <span className={styles.list}>Delivery Charges</span>
                        <span className={styles.free}>
                          {currency + deliverycharges}
                        </span>
                      </li>
                    </ul>
                    <div className="d-flex justify-content-between">
                      <span className={styles.total}>Total Amount</span>
                      <span className={styles.totalRate}>
                        {currency + totalprice}
                      </span>
                    </div>
                  </AddressCard>
                  <div className="d-flex gap-3 flex-column">
                    {totalprice < 200 ? (
                      <Button className={styles.minOdrBtn}>
                        Minimum order above Rs.200
                      </Button>
                    ) : null}
                    <Link href="/payment">
                      <Button className={styles.checkoutBtn}>Checkout</Button>
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </AppLayout>
    </>
  );
}
