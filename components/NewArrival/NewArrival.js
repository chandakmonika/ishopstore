import React,{useEffect,useState} from 'react';
import { Container } from 'react-bootstrap';
import styles from './index.module.css';
import { Product } from '../ProductCard';
import { useSelector } from 'react-redux';
import { SwiperSlide } from 'swiper/react';
import { Carousel } from '../UI';
import { Categories } from '../../services/homeservices';

export const NewArrival = () => {
  const [newArrivalProductss,setNewArrivalProductss] = useState([]);
  const newArrivalProducts = useSelector(state => state.products.allProducts);
  
  const newArrivalProductDetails = async () =>{
    try {
      const data = await Categories.newArrivalProduct(1)
      console.log(89,data)
      setNewArrivalProductss(data.data.data)
    } catch (error) {
      console.log(6,error)
    }
  }
  
  useEffect(() => {
    newArrivalProductDetails()
  }, [])

  return (
    <>
      {newArrivalProductss && newArrivalProductss.length > 0 ? (
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
              {newArrivalProductss.map(product => (
                <SwiperSlide key={product.id}>
                  {
                    console.log(81,product)
                  }
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
