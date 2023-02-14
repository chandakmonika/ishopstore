import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { ProductCategorySection } from '../../components'
import { AppLayout } from '../../components';
import { Category } from '../../components';
import { Products } from '../../services/Products';
import styles from '../../components/ProductCategorySection/index.module.css';

export default function CategoryList() {
  const [categoryData, setCategoryData] = useState([]);

  const fetchCategoryDetails = async () => {
    try {
      const data = await Products.parentcategories()
      console.log(220,data)
      setCategoryData(data.data.data);
    } catch (error) {
      console.log(21,error)
    }
  };

  useEffect(() => {
    fetchCategoryDetails()
  }, [])

//   const data = [
//     {
//       category_slug: 'abc',
//       category_name: 'Samsung.',
//       mediadata: [],
//       category_id: '34',
//     },
//     {
//       category_slug: 'abc',
//       category_name: 'Apple',
//       mediadata: [],
//       category_id: '34',
//     },
//     {
//       category_slug: 'abc',
//       category_name: 'Huawei',
//       mediadata: [],
//       category_id: '34',
//     },
//     {
//       category_slug: 'abc',
//       category_name: 'Nokia',
//       mediadata: [],
//       category_id: '34',
//     },
//     {
//       category_slug: 'abc',
//       category_name: 'Sony',
//       mediadata: [],
//       category_id: '34',
//     },
//     {
//       category_slug: 'abc',
//       category_name: 'LG',
//       mediadata: [],
//       category_id: '34',
//     },
//     {
//       category_slug: 'abc',
//       category_name: 'HTC',
//       mediadata: [],
//       category_id: '34',
//     },
//     {
//       category_slug: 'abc',
//       category_name: 'Nokia',
//       mediadata: [],
//       category_id: '34',
//     },
//     {
//       category_slug: 'abc',
//       category_name: 'ONEPLUS',
//       mediadata: [],
//       category_id: '34',
//     },
//     {
//       category_slug: 'abc',
//       category_name: 'VIVO',
//       mediadata: [],
//       category_id: '34',
//     },
//     {
//       category_slug: 'abc',
//       category_name: 'MOTOROLA',
//       mediadata: [],
//       category_id: '34',
//     },
//     {
//       category_slug: 'abc',
//       category_name: 'TCL',
//       mediadata: [],
//       category_id: '34',
//     },
//   ];
  return (
    <AppLayout>
      <div className="container">
        <h4 style={{ textAlign: 'center' }}> Categories</h4>
        <div className={styles.products}>
          {categoryData && categoryData.length > 0 && categoryData.map((index, i) => {
return(
    <Category
                  key={i}
                  data={data}
                  slug={index.category_slug}
                  title={index.category_name}
                  src={
                    index?.mediadata[0]?.http_url
                      ? index?.mediadata[0]?.http_url
                      : '/images/default.jpg'
                  }
                  id={index.category_id}
                />
                );
          })}
            
            
         
        </div>
      </div>
    </AppLayout>
  );
}
