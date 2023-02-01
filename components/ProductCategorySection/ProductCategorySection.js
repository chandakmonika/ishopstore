import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Category } from '../Category';
import styles from './index.module.css';
import { Button } from '../UI';
import { Categories } from '../../services/homeservices';
export const ProductCategorySection = () => {
  const [data, setData] = useState([]);
  const [view,setViewList] = useState(12)
  const [buttonText,setButtonText] = useState("View More")

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const data = await Categories.categoriesWithBrands();
      setData(data.data.data);
    } catch (error) {
      console.error('error------------------>', error);
    }
  };

  const handleChange = () => {
    if(view===12){
      setViewList(data.length)
      setButtonText("Hide")
    } else {
      setViewList(12)
      setButtonText("View More")
    }
  }

  return (
    <section className={`py-3 ${styles.productCategorySection}`}>
      <>
        <Container>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4
              className={`mb-0 ${styles.productTitle}`}
              style={{ color: 'var(--color-mid-black)' }}
            ></h4>
            <Button onClick={()=>handleChange(data)}>{buttonText}</Button>
          </div>
          <div className={styles.products}>
            {data.slice(0,view).map((t, i) => (
              <Category
                key={i}
                data={data}
                slug={t.category_slug}
                title={t.category_name}
                src={t.image_url}
                id={t.category_id}
              />
            ))}
          </div>
        </Container>
      </>
    </section>
  );
};
