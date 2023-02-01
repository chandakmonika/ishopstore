import React, { useState, useEffect } from 'react';
import { AppLayout } from '../../components';
import styles from './index.module.css';
import { Container, Col } from 'react-bootstrap';
import { ReturnPolicy } from '../../services/Returnpolicy';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import Head from 'next/head';

const Returnpolicy = () => {
  const [data, setData] = useState([]);
  const [seo, setSeo] = useState([]);
  // const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      // setLoading(true);
      const data = await ReturnPolicy.getdata();
      setSeo(data.data.seo);
      setData(data.data.data);
    } catch (error) {
      // setLoading(false);
      console.error(error);
    }
  };

  return (
    <>
      <AppLayout>
        <Head>
          <title>{seo.page_title}</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <meta name="description" content={data.page_description} />
          <meta name="keywords" content={data.page_keywords} />
        </Head>
        <div className={styles.main_div}>
          <Container>
            <Col md={6} className={styles.about_page}>
              <h1 className={styles.about_head}>
                {data?.page_title || <Skeleton count={1} />}
              </h1>
            </Col>
          </Container>
        </div>{' '}
        <Col>
          <Container>
            <div className={styles.about_pageContent}>
              <SkeletonTheme baseColor="#202020" highlightColor="#444">
                <p>{data.page_description || <Skeleton count={10} />}</p>
              </SkeletonTheme>
            </div>
          </Container>
        </Col>
      </AppLayout>
    </>
  );
};
export default Returnpolicy;
