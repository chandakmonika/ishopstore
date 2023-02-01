import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap';
import { AddressCard, AppLayout, Button, CartList } from '../../components';
import styles from './index.module.css';

export default function Checkout() {
  const currency = useSelector(state => state.ui.currancy);
  const cartItems = useSelector(state => state.cart.items);

  const Itemprice = 500;
  const deliverycharges = 50;
  const totalprice = Itemprice + deliverycharges;

  const totalAmountArray = cartItems.map((item)=>{
    return (item.product_price*item.product_qty)
  })
  const totalSum = totalAmountArray.reduce((prevValue, value) => {
    return prevValue + value;
  }, 0);

  const totalItemArray = cartItems.map((item)=>{
    return item.product_qty
  })
  const totalCartItem = totalItemArray.reduce((prevValue, value) => {
    return prevValue + value;
  }, 0);
  return (
    <>
      <AppLayout>
        <Container className={`py-3 ${styles.headTitle}`}>
          {cartItems.length > 0 ? (
            <h3>
              View Cart <span>{cartItems.length}Product</span>
            </h3>
          ) : (
            <h3>
              View Cart <span>Empty Cart</span>
            </h3>
          )}
        </Container>
        <section>
          <Container>
            <Row>
              <Col md={8}>
                <div className={styles.viewCart}>
                  <AddressCard customClass="p-0">
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
                        <span className={styles.list}>
                          {`Price (${totalCartItem} Products) `}
                        </span>
                        <span className={styles.price}>
                          {currency + totalSum}
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
                        {currency + (totalSum + deliverycharges)}
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
