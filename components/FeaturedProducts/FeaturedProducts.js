import React,{useEffect} from 'react';
import { Container } from 'react-bootstrap';
import styles from './index.module.css';
import { Button, Carousel } from '../UI';
import { Product } from '../ProductCard';
import { SwiperSlide } from 'swiper/react';
import {  useSelector } from 'react-redux';
import { Categories } from '../../services/homeservices';
import { useState } from 'react';
import Link from 'next/link';

// import { allProducts } from '../../redux/productSlice';

export const FeaturedProducts = () => {
  // const dispatch = useDispatch()
  const [productData,setProductData] = useState([]);
  const products = useSelector(state => state.products.allProducts);
  // console.log(66,products)

const fetchProductDetails  = async () => {
  try {
    const data = await Categories.featureProduct(1)
    console.log(90,data)
    setProductData(data.data.data)
    // dispatch(allProducts(data.data.data))
  } catch (error) {
    console.log(5,error)
  }
}


  useEffect(() => {
    fetchProductDetails()
  }, [])


  return (
    <>
      {productData && productData.length > 0 ? (
        <div className={`py-3 ${styles.productCategorySection}`}>
          <Container style={{ position: 'relative' }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4
                className={`mb-0 ${styles.productTitle}`}
                style={{ color: 'var(--color-mid-black)' }}
              >
                Featured Products
              </h4>
              <Link href='/products'>
              <Button>View More</Button>
              </Link>
            </div>
            <Carousel>
              {productData?.map(product => (
                <SwiperSlide key={product.id}>
                  {
                    console.log(80,product)
                  }
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
