import React, { useState } from 'react';
import { Accordion, Form } from 'react-bootstrap';
import { Checkbox } from '../UI';
import styles from './filtersidebar.module.css';
import { Range, getTrackBackground } from 'react-range';
import { useEffect } from 'react';
import { Categories } from '../../services/homeservices';

export const FilterSideBar = ({ productDataTransfer }) => {



  const STEP = 1;
  let MIN = 0;
  let MAX = 500;
  //price filter by slider
  const [priceFilter, setPriceFilter] = useState([0, 500]);
  const [filterList,setFilterList] = useState([])
  productDataTransfer(priceFilter);

  useEffect(()=>{
    brandFilterListData()
  },[])

  const brandFilterListData = async () => {
    try {
      const data = await Categories.categoriesWithBrands();
      setFilterList(data.data.data)
    } catch (err) {
      console.error(err)
    }
  }

  filterList.map((item)=>{
    console.error(item.brands)
  })
  return (
    <>
      <div className={styles.sideSlideBar}>
        <div className={`mb-3 ${styles.filterDiv}`}>
          <h3>Filters</h3>
          <div className="d-flex flex-wrap gap-3">
            {(priceFilter[1] !== MAX || priceFilter[0] !== MIN) && (
              <div className={styles.filters}>
                <span>
                  Min Rs {priceFilter[0]} - Rs {priceFilter[1]}
                </span>
                <span
                  className={styles.close}
                  onClick={() => setPriceFilter([0, 500])}
                >
                  <img src="/images/close.svg" alt="close" />
                </span>
              </div>
            )}
           
          </div>
        </div>
        <div className={styles.categoryDiv}>
          <h3>Categories</h3>
          <Accordion defaultActiveKey={['0']} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Grocery</Accordion.Header>
              <Accordion.Body>
                <ul>
                  <li>Fruits </li>
                  <li>Vegetables </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Cereal </Accordion.Header>
              <Accordion.Body>
                <ul>
                  <li>Baking </li>
                  <li>Vegetables </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
        <div className={styles.priceRange}>
          <div className={styles.itemPrice}>
            <h6>PRICE</h6>
            <h6 className={styles.close}  onClick={() => setPriceFilter([0, 500])}>Clear</h6>
          </div>
          <div className={styles.rangeLine}>
            <Range
              values={priceFilter}
              step={STEP}
              min={MIN}
              max={MAX}
              onChange={values => {
                setPriceFilter(values);
              }}
              renderTrack={({ props, children }) => (
                // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                <div
                  onMouseDown={props.onMouseDown}
                  onTouchStart={props.onTouchStart}
                  style={{
                    ...props.style,
                    height: '36px',
                    display: 'flex',
                    width: '100%',
                  }}
                >
                  <div
                    ref={props.ref}
                    style={{
                      height: '5px',
                      width: '100%',
                      borderRadius: '4px',
                      background: getTrackBackground({
                        values: priceFilter,
                        colors: ['#D4DCE2', '#016FD0', '#D4DCE2'],
                        min: MIN,
                        max: MAX,
                      }),
                      alignSelf: 'center',
                    }}
                  >
                    {children}
                  </div>
                </div>
              )}
              renderThumb={({ props }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: '20px',
                    width: '20px',
                    borderRadius: '50%',
                    backgroundColor: '#FFF',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    // boxShadow: '0px 2px 6px #AAA',
                    border: '1px solid #D4DCE2',
                  }}
                >
                  {/* <div
                    style={{
                      height: '16px',
                      width: '5px',
                      backgroundColor: isDragged ? '#548BF4' : '#CCC',
                    }}
                  /> */}
                </div>
              )}
            />
          </div>
        </div>
        <div className={styles.maxPrices}>
          <Form.Group>
            <Form.Control
              disabled
              value={priceFilter[0]}
              type="text"
              placeholder="Min"
            />
          </Form.Group>

          <h6>to</h6>
          <Form.Group>
            <Form.Control
              disabled
              value={priceFilter[1]}
              type="text"
              placeholder="Max"
            />
          </Form.Group>
        </div>
        <div className={styles.brandDiv}>
          <Accordion
            defaultActiveKey={['0']}
            alwaysOpen
            className={styles.searchItem}
          >
            <Accordion.Item eventKey="0">
              <Accordion.Header>BRAND</Accordion.Header>
              <Accordion.Body>
                <Form.Group>
                  <Form.Control
                    type="search"
                    placeholder="Search Brand"
                  ></Form.Control>
                </Form.Group>
                <div className={`mt-3 ${styles.Checkbox}`}>
                  <div className={styles.checkBoxText}>
                    <Checkbox label="Kellogg's" />
                    <Checkbox label="Nestle" />
                    <Checkbox label="Saffola" />
                    <Checkbox label="Quaker Oats" />
                    <Checkbox label="Solimo" />
                    <Checkbox label="The Whole Truth" />
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>CUSTOMER RATINGS</Accordion.Header>
              <Accordion.Body>
                <div className={styles.checkBoxText}>
                  <Checkbox label="4" />
                  <Checkbox label="5" />
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    </>
  );
};
