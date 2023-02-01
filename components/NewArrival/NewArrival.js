import React from 'react';
import { Container } from 'react-bootstrap';
import styles from './index.module.css';
import { Product } from '../ProductCard';
import { useSelector } from 'react-redux';
import { SwiperSlide } from 'swiper/react';
import { Carousel } from '../UI';

export const NewArrival = () => {
  const newArrivalProducts = useSelector(state => state.products.allProducts);

  return (
    <>
      {newArrivalProducts.length > 0 ? (
        <section className={`py-3 ${styles.productCategorySection}`}>
          <Container>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4
                className={`mb-0 ${styles.productTitle}`}
                style={{ color: 'var(--color-mid-black)' }}
              >
                New Arrivals
              </h4>
            </div>
            <Carousel>
              {newArrivalProducts.map(product => (
                <SwiperSlide key={product.id}>
                  <Product data={product} />
                </SwiperSlide>
              ))}
            </Carousel>
          </Container>
        </section>
      ) : null}
    </>
  );
};
