import { useRouter } from 'next/router';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Col, Container, FormSelect, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AppLayout, FilterSideBar, ProductMainCard } from '../../../components';
import { getAllProductData } from '../../../redux/productSlice';
import { Products } from '../../../services/Products';
import { toast, ToastContainer } from 'react-toastify';
export default function Category() {
  const [productData, setProductData] = useState([]);
  const [filterSortBy, setFilterSortBy] = useState(null);
  const [filterOrderBy, setFilterOrderBy] = useState(null);
  const user = useSelector(state => state?.auth?.user?.user_id);
  const router = useRouter();
  const catagoryId = router?.query?.id;
  const brandId = router?.query?.brandId;
  const [drive, setDrive] = useState([null, null]);
  const wishlist = useSelector(state => state.products.wishlistProducts);
  const [sortByLabel, setSortByLabel] = useState('');

  useEffect(() => {
    productDataTransfer();
  }, [wishlist]);

  const productDataTransfer = index => {
    setDrive(index);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    fetchProductData();
  }, [drive, filterSortBy, filterOrderBy,brandId]);

  function handleChange(event) {
    if (event.target.value == '0') {
      setFilterSortBy(null);
      setFilterOrderBy(null);
      setSortByLabel('');
    } else if (event.target.value == '1') {
      setFilterSortBy('product_price');
      setFilterOrderBy('ASC');
      setSortByLabel('Price - Low to High');
    } else if (event.target.value == '2') {
      setFilterSortBy('product_price');
      setFilterOrderBy('DESC');
      setSortByLabel('Price - High to Low');
    } else if (event.target.value == '3') {
      setFilterSortBy('product_name');
      setFilterOrderBy('ASC');
      setSortByLabel('Product name - A to Z');
    } else if (event.target.value == 4) {
      setFilterSortBy('product_name');
      setFilterOrderBy('DESC');
      setSortByLabel('Product name - Z to A');
    }
  }

  const fetchProductData = async () => {
    try {
      const data = await Products.getAllData({
        user_id: user,
        category_id: catagoryId,
        brand_id: brandId,
        min_price: drive[0],
        max_price: drive[1],
        sort_by: filterSortBy,
        order_by: filterOrderBy,
      });
      setProductData(data?.data?.data);

      dispatch(getAllProductData(data?.data?.data));
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <ToastContainer />
      <AppLayout>
        <section className=" py-5">
          <Container fluid>
            <Row>
              <Col md={3}>
                <FilterSideBar productDataTransfer={productDataTransfer} />
              </Col>

              <Col md={9}>
                <div className={`mb-4`}>
                  {/* TODO: Show this label when user have searched for the product */}
                  {/* <p>Showing results for “Cereles”</p> */}
                  <div className="d-flex justify-content-between">
                    <p className="d-flex gap-3">
                      <span>{sortByLabel}</span>
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
              </Col>
            </Row>
          </Container>
        </section>
      </AppLayout>
    </>
  );
}
