import React from 'react';
import { Container } from 'react-bootstrap';
import styles from './index.module.css';
import { Button, Carousel } from '../UI';
import { Product } from '../ProductCard';
import { SwiperSlide } from 'swiper/react';
import { useSelector } from 'react-redux';

export const FeaturedProducts = () => {
  const products = useSelector(state => state.products.allProducts);
  
  return (
    <>
      {products.length > 0 ? (
        <div className={`py-3 ${styles.productCategorySection}`}>
          <Container style={{ position: 'relative' }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4
                className={`mb-0 ${styles.productTitle}`}
                style={{ color: 'var(--color-mid-black)' }}
              >
                Featured Products
              </h4>
              <Button>View More</Button>
            </div>
            <Carousel>
              {products?.map(product => (
                <SwiperSlide key={product.id}>
                  <Product data={product} />
                </SwiperSlide>
              ))}
            </Carousel>
          </Container>
        </div>
      ) : null}
    </>
  );
};
