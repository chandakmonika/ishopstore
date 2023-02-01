import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { Button } from '../UI';
import styles from './cta.module.css';

export const CTASection = () => {
  return (
    <section className={styles.ctaSection}>
      <Container>
        <Row
          className={`d-flex flex-wrap  align-items-center ${styles.ctaRow}`}
        >
          <Col md={8}>
            <div className={styles.image}>
              <img src="/images/cadbury.png" alt="placeholder" />
            </div>
          </Col>
          {/* <Col md={4}>
            <div className={styles.Content}>
              <h4 style={{ color: "#FFE713" }}>Festive offer</h4>
              <h2 style={{ fontSize: "50px" }}>Cadbury Celebration</h2>
              <p>Chocolate Pack 178.80 g</p>
            </div>
          </Col> */}
          <Col md={4}>
            <div className={styles.button}>
              <Button>Shop Now</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
