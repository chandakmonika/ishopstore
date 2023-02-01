import React, { useState, useEffect } from 'react';
import { AddressCard, AppLayout } from '../../components';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { ThumbsUpIcon } from '../../public/svg';
import styles from './index.module.css';
import { toast } from 'react-toastify';
import { Subscription } from '../../services/Subscription';
import { Blogdata } from '../../services/Blogs';
import { useRouter } from 'next/router';
const Singleblog = () => {
  const [email, setEmail] = useState(' ');
  const [data, setData] = useState({});
  const router = useRouter();

  const handleChange = e => {
    setEmail(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!email) {
      toast.warning('Please enter email');
      return;
    }

    try {
      const response = await Subscription.emailSend({ email });
      if (response)
        toast.success('You have successfully subscribed to newsletter.');
    } catch (error) {
      toast.error(error.message);
    }
  };
  const blog_id = router.query.id;
  useEffect(() => {
    fetchSingleBlog();
  }, []);
  const fetchSingleBlog = async () => {
    const blog = await Blogdata.getsingleblog(blog_id);
    console.error(blog_id);
    setData(blog.data.data);
  };
  return (
    <>
      <AppLayout>
        <Container>
          <h4 className="mb-4 d-flex justify-content-center mt-5">Blog</h4>
        </Container>
        <Container>
          {' '}
          <Row>
            <Col md={8}>
              {' '}
              <AddressCard customClass={styles.cards}>
                <Container>
                  <div>
                    <h5>{data?.title}</h5>
                  </div>
                  <div className="mb-4">
                    <img src={data?.image_url} />
                  </div>
                  <div>
                    <p>{data?.description}</p>
                  </div>
                  <div>
                    <div className={styles.likes}>
                      <div>Likes</div>
                      <div>150</div>
                      <ThumbsUpIcon />
                    </div>
                    <div>
                      <p>Comments</p>
                    </div>
                    <div className="d-flex mt-2">
                      <span>
                        <img
                          src="/images/cake.png"
                          className={styles.userimage}
                        />
                      </span>
                      <span className="ms-3">
                        <div className={styles.username}>Vidya Shinde</div>
                        <div>Nice receipe,Thanks</div>
                      </span>
                    </div>  
                    <div className="d-flex mt-4">
                      <span>
                        <img
                          src="/images/cake.png"
                          className={styles.userimage}
                        />
                      </span>
                      <span className="ms-3">
                        <div className={styles.username}>Vidya Shinde</div>
                        <div>Nice receipe,Thanks</div>
                      </span>
                    </div>
                    <div className="d-flex mt-4">
                      <span>
                        <img
                          src="/images/cake.png"
                          className={styles.userimage}
                        />
                      </span>
                      <span className="ms-3 w-100">
                        <div className={styles.username}>Vidya Shinde</div>
                        <div>Nice receipe,Thanks</div>
                        <div
                          className={`d-flex justify-content-center flex-column`}
                        >
                          <Form.Label>Leave a comment</Form.Label>
                          <Form className={`d-flex justify-content-center`}>
                            <Form.Control style={{ height: '58px' }} />
                          </Form>
                          <button className={styles.btn}>Post Comment</button>
                        </div>
                      </span>
                    </div>
                  </div>
                </Container>
              </AddressCard>
            </Col>
            <Col md={4}>
              <AddressCard customClass={styles.cards}>
                <Container>
                  <div className={styles.tagcloud}>
                    <h5>Tag Cloud</h5>
                    <div className="mb-4 d-flex flex-wrap">
                      <span className={styles.tags}>Lorem</span>
                      <span className={styles.tags}>Lorem</span>
                      <span className={styles.tags}>placeholder</span>
                      <span className={styles.tags}>Lorem</span>
                      <span className={styles.tags}>ipsum</span>
                    </div>
                  </div>
                  <div>
                    {' '}
                    <div className="mt-3">
                      <h5>Newsletter</h5>
                      <div
                        className={`d-flex  justify-content-center flex-column`}
                      >
                        <Form className={`d-flex ${styles.searchForm}`}>
                          <Form.Control
                            type="email"
                            onChange={handleChange}
                            placeholder="Email Address"
                          />
                        </Form>
                        <Button
                          className={styles.emailbtn}
                          onClick={handleSubmit}
                        >
                          Subscribe
                        </Button>
                      </div>
                    </div>
                  </div>
                </Container>
              </AddressCard>
            </Col>
          </Row>
        </Container>
      </AppLayout>
    </>
  );
};
export default Singleblog;
