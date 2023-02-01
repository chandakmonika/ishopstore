import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { AppLayout } from '../AppLayout';
import { ProductSideBar } from '../ProfileSideBar/ProfileSidebar';
import { Card } from '../UI';

export const ProfileLayout = ({ children, classes }) => {
  return (
    <>
      <AppLayout>
        <section
          className="py-5"
          style={{ background: 'var(--color-light-grey)' }}
        >
          <Container>
            <Row>
              <Col md={3}>
                <ProductSideBar />
              </Col>
              <Col md={9}>
                <Card customClass={`p-3 ${classes}`}>{children}</Card>
              </Col>
            </Row>
          </Container>
        </section>
      </AppLayout>
    </>
  );
};
