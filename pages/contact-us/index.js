import React, { useState } from 'react';
import { AppLayout } from '../../components';
import { Row, Col} from 'react-bootstrap';
import { Form as BForm } from 'react-bootstrap';
import { Button } from '../../components';
import styles from './index.module.css';
const ContactUs = () => {
  const [data, setData] = useState({
    firstname: '',
    email: '',
    message: '',
    number: '',
  });
  const inputhandler = e => {
    setData(preState => ({ ...preState, [e.target.name]: e.target.value }));
  };
  // const handleSubmit = () => {
  //   console.log({ data });
  // };

  return (
    <>
      <AppLayout>
        <Row>
          <Col md={6}>
            <div className={styles.contact}>
              <div className={styles.contact_head}>
                <h1>CONTACT US</h1>
              </div>
              <div>
                <BForm>
                  <BForm.Group>
                    <BForm.Label>Name</BForm.Label>
                    <BForm.Control
                      placeholder="Enter your Name"
                      className={styles.control}
                      name="firstname"
                      value={data.firstname}
                      onChange={inputhandler}
                    />
                    <BForm.Label className={styles.label}>Email</BForm.Label>
                    <BForm.Control
                      placeholder="Enter your Email"
                      className={styles.control}
                      name="email"
                      type="email"
                      onChange={inputhandler}
                    />
                    <BForm.Label className={styles.label}>
                      Mobile Number
                    </BForm.Label>
                    <BForm.Control
                      placeholder="Enter your Mobile Number"
                      className={styles.control}
                      name="phone"
                      type="Tel"
                      maxLength="10"
                      onChange={inputhandler}
                    />
                    <BForm.Label className={styles.label}>Message</BForm.Label>
                    <BForm.Control
                      placeholder="Enter your Messages"
                      className={styles.control}
                      as="textarea"
                      name="message"
                      style={{ resize: 'none' }}
                      onChange={inputhandler}
                    />
                  </BForm.Group>
                  <div style={{ marginTop: '20px' }}>
                    {' '}
                    <Button type="submit"
                    //  onClick={handleSubmit}
                     >
                      Submit
                    </Button>
                  </div>
                </BForm>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className={styles.contact_image}>
              <img src="../images/contactUs.png" className={styles.image} />
            </div>
          </Col>
          <Row>
            <Col>
              <div className={styles.map_head}>STORE MAP</div>

              <div>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.59442949712!2d73.81568371489323!3d18.54722098739344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf9b2688985f%3A0xa3d867a912121313!2sSunhim%20Ecommerce%20-%20Ecommerce%20Solutions%20%7C%20Digital%20Marketing%20Agency!5e0!3m2!1sen!2sin!4v1667297792970!5m2!1sen!2sin"
                  loading="lazy"
                  className={styles.map}
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </Col>
          </Row>
        </Row>
      </AppLayout>
    </>
  );
};
export default ContactUs;
