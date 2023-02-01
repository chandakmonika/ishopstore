import React, { useEffect, useState } from 'react';
import { AppLayout } from '../../components';
import styles from './index.module.css';
import {
  Col,
  Row,
  Accordion,
  Container,
  Breadcrumb,
  Nav,
  Tab,
} from 'react-bootstrap';
import { FaqCatagory } from '../../services/Faq';
import { toast, ToastContainer } from 'react-toastify';

const Faq = () => {
  // const data = [
  //   {
  //     data: ' Lorem ipsum dolor sit amet, consectetur adipiscing',
  //   },
  //   {
  //     data: ' Lorem ipsum dolor sit amet, consectetur adipiscing',
  //   },
  //   {
  //     data: ' Lorem ipsum dolor sit amet, consectetur adipiscing',
  //   },
  //   {
  //     data: ' Lorem ipsum dolor sit amet, consectetur adipiscing',
  //   },
  //   {
  //     data: ' Lorem ipsum dolor sit amet, consectetur adipiscing',
  //   },
  // ];
  // const menu = [
  //   {
  //     data: 'Order',
  //   },
  //   {
  //     data: 'Cancellations and Returns',
  //   },
  //   {
  //     data: 'Payment',
  //   },
  //   {
  //     data: 'Shopping',
  //   },
  //   {
  //     data: 'Coupons',
  //   },
  //   {
  //     data: 'Others',
  //   },
  //   {
  //     data: 'Privacy',
  //   },
  //   {
  //     data: 'Policy',
  //   },
  //   {
  //     data: 'Refund',
  //   },
  // ];
  const [faqData, setFaqData] = useState([]);
  const [highlightedFaqData, setHighlightedFaqData] = useState([]);
  const [activeFaqData, setActiveFaqData] = useState('');

  useEffect(() => {
    fetchFaqData();
  }, []);

  useEffect(() => {
    fetchActiveFaqData();
  }, []);

  const fetchFaqData = async () => {
    try {
      const data = await FaqCatagory.getAllData();
      setFaqData(data.data.data);
      toast.success("Successfully loaded faq's");
    } catch (error) {
      toast.error(error);
    }
  };
  const fetchActiveFaqData = async () => {
    try {
      const data = await FaqCatagory.singleData();
      setHighlightedFaqData(data.data.data);
    } catch (error) {
      toast.error(error);
    }
  };

  function activeFaq(item) {
    setActiveFaqData(item);
  }

  return (
    <>
      <ToastContainer />
      <AppLayout>
        <section className="py-5">
          <Container className={styles.faq}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <h3>FAQ`S</h3>
            </div>
            <Tab.Container id="left-tabs-example" defaultActiveKey={1}>
              <Row>
                <Col md={3}>
                  <div className={`mb-3 ${styles.sidenav}`}>
                    <Nav className="flex-column">
                      {faqData.map(item => (
                        <Nav.Item key={item.faq_category_id}>
                          <>
                            <Nav.Link
                              eventKey={item.faq_category_id}
                              onClick={() => activeFaq(item)}
                              className={styles.nav_link + ' custom-nav-link'}
                            >
                              {item.category_name}
                            </Nav.Link>
                          </>
                        </Nav.Item>
                      ))}
                    </Nav>
                  </div>
                </Col>

                <Col md={9}>
                  <div className={` mb-3 ${styles.accordian}`}>
                    <div>
                      <Breadcrumb>
                        <Breadcrumb.Item className={styles.breadcrum}>
                          FAQ
                        </Breadcrumb.Item>
                        <Breadcrumb.Item href="#" className={styles.breadcrum}>
                          {activeFaqData.category_name}
                        </Breadcrumb.Item>
                      </Breadcrumb>
                    </div>
                    <Tab.Content>
                      {faqData.map((t, index) => (
                        <>
                          <Tab.Pane eventKey={index}>
                            <div className={`mb-2 ${styles.accordian_head}`}>
                              {t.data}
                            </div>{' '}
                            <Accordion>
                              {highlightedFaqData.map((t, i) => (
                                <Accordion.Item
                                  key={i}
                                  eventKey={i}
                                  className={`mb-3 ${styles.accordian_item}`}
                                >
                                  <Accordion.Header
                                    className={styles.accordian_header}
                                  >
                                    {t.data}
                                  </Accordion.Header>
                                  <Accordion.Body
                                    className={styles.accordian_body}
                                  ></Accordion.Body>
                                </Accordion.Item>
                              ))}
                            </Accordion>
                          </Tab.Pane>
                        </>
                      ))}
                    </Tab.Content>
                  </div>
                </Col>
              </Row>
            </Tab.Container>
          </Container>
        </section>
      </AppLayout>
    </>
  );
};
export default Faq;
