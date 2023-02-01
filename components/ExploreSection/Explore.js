import React from 'react';
import { Container } from 'react-bootstrap';
import { Card } from './Card';
import styles from './explore.module.css';

export const Explore = () => {
  return (
    <section className="pt-3 pb-3" style={{ background: '#EEEEEE' }}>
      <Container>
        <div className="d-flex justify-content-center align-items-center ">
          <h4
            className={`mb-0 ${styles.productTitle}`}
            style={{ color: 'var(--color-mid-black)' }}
          >
            Instagram
          </h4>
        </div>
        <Card />
      </Container>
    </section>
  );
};
