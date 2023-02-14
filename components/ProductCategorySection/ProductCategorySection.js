import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Category } from '../Category';
import styles from './index.module.css';
import { Button } from '../UI';
import { Categories } from '../../services/homeservices';
import Link from 'next/link';
export const ProductCategorySection = () => {
  const [data, setData] = useState([]);
  const [view,setViewList] = useState(12)
  const [buttonText,setButtonText] = useState("View More")

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const data = await Categories.getAllData();
      console.log(22,data);
      setData(data.data.data);
    } catch (error) {
      console.error('error------------------>', error);
    }
  };

  const handleChange = () => {
    // if(view===12){
    //   setViewList(data.length)
    //   setButtonText("Hide")
    // } else {
    //   setViewList(12)
    //   setButtonText("View More")
    // }
  }

  return (
    <section className={`py-3 ${styles.productCategorySection}`}>
      <>
        <Container style={{textAlign:'right'}}>
          
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4
              className={`mb-0 ${styles.productTitle}`}
              style={{ color: 'var(--color-mid-black)' }}></h4>
            {/* <div className='row'> */}
            <div className='col-md-6' >
            <h4 style={{textAlign:'left'}}>Product Category</h4>
            </div>
            <div className='col-md-6'>
              <Link href='/categorylist'>
              <Button onClick={()=>handleChange(data)}>{buttonText}</Button>
              </Link>
           
            </div>
            {/* </div> */}
            
            
          </div>
          <div className={styles.products}>
            {data.slice(0,view).map((t, i) => (
              <Category
                key={i}
                data={data}
                slug={t.category_slug}
                title={t.category_name}
                src={t?.mediadata[0]?.http_url ? t?.mediadata[0]?.http_url : "/images/default.jpg"}
                id={t.category_id}
              />
            ))}
          </div>
        </Container>
      </>
    </section>
  );
};
