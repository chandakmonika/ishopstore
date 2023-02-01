import React from 'react';
import { Swiper } from 'swiper/react';
import { Navigation } from 'swiper';
import styles from './carousel.module.css';
import cx from 'classnames';

export const Carousel = ({ children }) => {
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);
  return (
    <div style={{ position: 'relative' }}>
      <div
        ref={navigationPrevRef}
        className={cx(styles['carousel-nav-buttons'], styles['carousel-prev'])}
      />
      <div
        ref={navigationNextRef}
        className={cx(styles['carousel-nav-buttons'], styles['carousel-next'])}
      />
      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        onBeforeInit={swiper => {
          swiper.params.navigation.prevEl = navigationPrevRef.current;
          swiper.params.navigation.nextEl = navigationNextRef.current;
        }}
        spaceBetween={10}
        slidesPerView={2}
        breakpoints={{
          // when window width is >= 0px
          0: {
            slidesPerView: 2,
          },
          // when window width is >= 640px
          640: {
            slidesPerView: 3,
          },
          // when window width is >= 768px
          768: {
            slidesPerView: 4,
          },
          // when window width is >= 991px
          991: {
            slidesPerView: 5,
          },
          // when window width is >= 1200px
          1200: {
            slidesPerView: 5,
          },
        }}
        loop
      >
        {children}
      </Swiper>
    </div>
  );
};
