import React from 'react';
import { Container } from 'react-bootstrap';
import styles from './recent.module.css';
import { Carousel } from '../UI';
import { SwiperSlide } from 'swiper/react';
import { useSelector } from 'react-redux';
import { RecentCard } from '../RecentCard';

export const RecentProducts = ({ title }) => {
  const products = useSelector(state => state.products.allProducts);
  return (
    <div className={`py-3 ${styles.productCategorySection}`}>
      <div
        className="d-flex justify-content-between align-items-center mb-3 pb-3"
        style={{ borderBottom: '1px solid #DADADA' }}
      >
        <Container>
          <h4
            className={`mb-0 ${styles.productTitle}`}
            style={{ color: 'var(--color-mid-black)' }}
          >
            {title}
          </h4>
        </Container>
      </div>
      <Container className="py-3" style={{ position: 'relative' }}>
        <Carousel>
          {products?.map(product => (
            <SwiperSlide key={product.id}>
              <RecentCard />
            </SwiperSlide>
          ))}
        </Carousel>
      </Container>
    </div>
  );
};
