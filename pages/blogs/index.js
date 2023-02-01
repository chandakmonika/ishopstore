import React, { useState, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { AppLayout } from '../../components';
import styles from './index.module.css';
import { Blogdata } from '../../services/Blogs';
import { AddressCard } from '../../components';
import Link from 'next/link';
import moment from 'moment';
const Blogs = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchblog();
  }, []);
  const fetchblog = async () => {
    const blog = await Blogdata.getblogdata();
    console.error(blog.data.data);
    setData(blog.data.data);
  };
  return (
    <>
      <AppLayout>
        <div className={styles.blog_head}>
          <h2>Blog</h2>
        </div>

        <div>
          <Container>
            <h3 className={styles.blogs_head}> Baking Receipes</h3>
          </Container>
        </div>
        <section className="mb-5">
          <Container>
            <Row>
              {data.map(blogs => (
                <>
                  {' '}
                  <Link href={`/blogs/${blogs?.blog_slug}`}>
                    <Col md={4}>
                      <AddressCard customClass={styles.cards}>
                        <div>
                          <div>
                            <div className={styles.blog_image}>
                              <img src={blogs.image_url} />
                            </div>
                            <p className={styles.date}>
                              {moment(blogs?.inserted_image).subtract(1, 'days').format(
                                'YYYY-MM-DD',
                              )}
                            </p>
                            <h5 className={styles.blog_title}>
                              {blogs.title}
                              <img
                                src="/images/share.svg"
                                width={'20px'}
                                className={`ms-3   ${styles.share_icons}`}
                              />
                            </h5>
                          </div>
                          <div>
                            <p className={styles.about}>{blogs.description}</p>
                            <div className={styles.read_more}>
                              <Link href="">Read More</Link>
                            </div>
                          </div>
                        </div>
                      </AddressCard>
                    </Col>
                  </Link>
                </>
              ))}
            </Row>
          </Container>
        </section>
      </AppLayout>
    </>
  );
};
export default Blogs;
