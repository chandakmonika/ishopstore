import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import styles from './index.module.css';
import { Button } from '../UI';
import { SwiperSlide, Swiper } from 'swiper/react';
import { Autoplay } from 'swiper';
import { Products } from '../../services/Products';

export const HeroBanner = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await Products.sliderData();
      setData(data.data.media);
    } catch (error) {
      console.error('error------------------>', error);
    }
  };

  const newData = data && data.sort(function(a, b) {
    return a.order_number - b.order_number;
  });

  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={1}
      loop={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      modules={[Autoplay]}
    >
      {newData && newData.length>0 && newData.map(item => (
        <SwiperSlide key={item.id}>
          <div
            className={styles.HeroBanner}
            style={{ backgroundImage: `url(${item.image_url})` }}
          >
            <Container>
              <Row>
                <Col md={3}></Col>
                <Col md={9}>
                  <div className={styles.Content}>
                    <h1 style={{ color: '#76460D' }}>{item.media_name}</h1>
                    <h3 style={{ color: '#FF5E00' }}>{item.title}</h3>
                    <Button href={item.media_link}>Shop Now </Button>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
    // <Swiper
    //   spaceBetween={10}
    //   slidesPerView={1}
    //   loop={true}
    //   autoplay={{
    //     delay: 2500,
    //     disableOnInteraction: false,
    //   }}
    //   modules={[Autoplay]}
    // >
    //   <SwiperSlide>
    //     {" "}
    //     <div className={styles.HeroBanner}>
    //       <Container>
    //         <Row>
    //           <Col md={3}></Col>
    //           <Col md={9}>
    //             <div className={styles.Content}>
    //               <h1 style={{ color: "#76460D" }}>Monthly grocerY</h1>
    //               <h3 style={{ color: "#FF5E00" }}>Starts from 999</h3>
    //               <Button>Shop Now</Button>
    //             </div>
    //           </Col>
    //         </Row>
    //       </Container>
    //     </div>
    //   </SwiperSlide>
    //   <SwiperSlide>
    //     {" "}
    //     <div className={styles.HeroBanner}>
    //       <Container>
    //         <Row>
    //           <Col md={3}></Col>
    //           <Col md={9}>
    //             <div className={styles.Content}>
    //               <h1 style={{ color: "#76460D" }}>Monthly grocerY</h1>
    //               <h3 style={{ color: "#FF5E00" }}>Starts from 999</h3>
    //               <Button>Shop Now</Button>
    //             </div>
    //           </Col>
    //         </Row>
    //       </Container>
    //     </div>
    //   </SwiperSlide>
    //   <SwiperSlide>
    //     {" "}
    //     <div className={styles.HeroBanner}>
    //       <Container>
    //         <Row>
    //           <Col md={3}></Col>
    //           <Col md={9}>
    //             <div className={styles.Content}>
    //               <h1 style={{ color: "#76460D" }}>Monthly grocerY</h1>
    //               <h3 style={{ color: "#FF5E00" }}>Starts from 999</h3>
    //               <Button>Shop Now</Button>
    //             </div>
    //           </Col>
    //         </Row>
    //       </Container>
    //     </div>
    //   </SwiperSlide>
    // </Swiper>
  );
};
