import React, { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { AddressCard } from '..';
import styles from './index.module.css';

export default function AddAddress({ setIsNewAddressVisible }) {
  const [data, setData] = useState({
    firstname: '',
    phone: '',
    city: '',
    pincode: '',
    area: '',
    address1: '',
    address2: '',
    setLandmark: '',
  });
  const inputsHandler = e => {
    setData(preState => ({ ...preState, [e.target.name]: e.target.value }));
  };

  const submitHandler = () => {
    setIsNewAddressVisible(false);
    console.info(data)
  };
  return (
    <>
      <section className="pb-5">
        <div className={styles.formSection}>
          <AddressCard>
            <Form
            // onSubmit={e => {
            //   e.inputsHandler();
            // }}
            >
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-4">
                    <Form.Label>Full Name*</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstname"
                      onChange={inputsHandler}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-4">
                    <Form.Label>Mobile No*</Form.Label>
                    <Form.Control
                      type="tel"
                      name="phone"
                      onChange={inputsHandler}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-4">
                    <Form.Label>City*</Form.Label>
                    <Form.Control
                      type="text"
                      name="city"
                      onChange={inputsHandler}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-4">
                    <Form.Label>Pincode*</Form.Label>
                    <Form.Control
                      type="text"
                      name="pincode"
                      onChange={inputsHandler}
                    />
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group className="mb-4">
                    <Form.Label>Area*</Form.Label>
                    <Form.Control
                      type="text"
                      name="area"
                      onChange={inputsHandler}
                    />
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group className="mb-4">
                    <Form.Label>Address Line 1</Form.Label>
                    <Form.Control
                      type="text"
                      name="address1"
                      onChange={inputsHandler}
                    />
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group className="mb-4">
                    <Form.Label>Address Line 2</Form.Label>
                    <Form.Control
                      type="text"
                      name="address2"
                      onChange={inputsHandler}
                    />
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group className="mb-4">
                    <Form.Label>Landmark</Form.Label>
                    <Form.Control
                      type="text"
                      name="landmark"
                      onChange={inputsHandler}
                    />
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <button
                    onClick={submitHandler}
                    type="submit"
                    className={`btn ms-auto d-block ${styles.checkoutBtn}`}
                  >
                    Save Address
                  </button>
                </Col>
              </Row>
            </Form>
          </AddressCard>
        </div>
      </section>
    </>
  );
}
