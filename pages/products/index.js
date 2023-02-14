import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Col, Container, FormSelect, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AppLayout, Category, FilterSideBar, ProductMainCard } from '../../components';
import { getAllProductData } from '../../redux/productSlice';
import { Products } from '../../services/Products';
import styles from './index.module.css';
import Paginations from '../../components/pagination/pagination';
// import { Categories } from '../../services/homeservices';

export default function Product() {
  const [productData, setProductData] = useState([]);
  const user = useSelector(state => state.auth.user?.user_id);
  const [filterSortBy, setFilterSortBy] = useState(null);
  const [filterOrderBy, setFilterOrderBy] = useState(null);
  const [drive, setDrive] = useState(' ');
  const [totalPage, setTotalPage] = useState(1);
  // const [filterList,setFilterList] = useState([])

  const pageNumber = useSelector(state => state.pagination.active);

  const dispatch = useDispatch();

  const wishlist = useSelector(state => state.products.wishlistProducts);

  useEffect(() => {
    productDataTransfer();
  }, [wishlist]);

  const productDataTransfer = index => {
    setDrive(index);
  };
  useEffect(() => {
    fetchProductData();
  }, [drive, filterSortBy, filterOrderBy, pageNumber]);

  function handleChange(event) {
    if (event.target.value == '0') {
      setFilterSortBy(null);
      setFilterOrderBy(null);
    } else if (event.target.value == '1') {
      setFilterSortBy('product_price');
      setFilterOrderBy('ASC');
    } else if (event.target.value == '2') {
      setFilterSortBy('product_price');
      setFilterOrderBy('DESC');
    } else if (event.target.value == '3') {
      setFilterSortBy('product_name');
      setFilterOrderBy('ASC');
    } else if (event.target.value == 4) {
      setFilterSortBy('product_name');
      setFilterOrderBy('DESC');
    }
  }

  const fetchProductData = async () => {
    try {
      const data = await Products.getAllData({
        // category_id: "1302",
        user_id: user,
        min_price: drive[0],
        max_price: drive[1],
        sort_by: filterSortBy,
        order_by: filterOrderBy,
        page: Number(pageNumber),
        
      });
      setTotalPage(data.data.pages);
      setProductData(data.data.data);
      dispatch(getAllProductData(data.data.data));
    } catch (error) {
      console.error('error------------------>', error);
    }
  };

  // useEffect(()=>{
  //   brandFilterListData()
  // },[])

  // const brandFilterListData = async () => {
  //   try {
  //     const data = await Categories.categoriesWithBrands();
  //     setFilterList(data.data.data)
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }
  return (
    <>
      <AppLayout>
        <section className={`${styles.products} py-5`}>
          <Container fluid>
            <Row>
              <Col md={3}>
                <FilterSideBar productDataTransfer={productDataTransfer} />
              </Col>

              <Col md={9}>
                <div className={`mb-4`}>
                  <p>Showing results for “Cereles”</p>
                  <div className="d-flex justify-content-between">
                    <p className="d-flex gap-3">
                      <span> Price - Low to High </span>
                      <span> Price - High to Low </span>
                    </p>
                    <div className="d-flex gap-2 align-items-center">
                      <span className="text-nowrap">Sort By</span>
                      <FormSelect onChange={handleChange}>
                        <option defaultChecked value="0">
                          Select
                        </option>
                        <option value="1">Price Low to High</option>
                        <option value="2">Price High to Low</option>
                        <option value="3">A-Z</option>
                        <option value="4">Z-A</option>
                      </FormSelect>
                    </div>
                  </div>
                </div>
                <Row>
                  <ProductMainCard productData={productData} />
                </Row>

                <div style={{ display: 'flex', justifyContent: 'end' }}>
                  <Paginations totalPage={totalPage} />
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </AppLayout>
    </>
  );
}
