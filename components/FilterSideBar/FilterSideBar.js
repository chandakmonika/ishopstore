import { Accordion, Form } from 'react-bootstrap';
import { Range, getTrackBackground } from 'react-range';
import React, { useState } from 'react';
import { Categories } from '../../services/homeservices';
import { Checkbox } from '../UI';
import { Products } from '../../services/Products';
import styles from './filtersidebar.module.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export const FilterSideBar = ({ productDataTransfer }) => {
  const router = useRouter();
  const catId = router.query['id'];
  const brandId = router.query['brandId'];
  const subCatId = router.query['sunCatId'];
  const isFeatured = router.query['isFeatured'];
  const isNewArrival = router.query['isNewArrival'];
  console.log(1234, router.query['id']);

  const STEP = 1;
  let MIN = 0;
  let MAX = 500;
  //price filter by slider
  const [priceFilter, setPriceFilter] = useState([0, 500]);
  const [catFilter, setCatFilter] = useState('');
  const [subCatFilter, setSubCatFilter] = useState('');
  const [brandFilter, setBrandFilter] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [productData, setProductData] = useState([]);
  const [brandData, setBrandData] = useState([]);
  const [filters, setFilters] = useState([
    {
      filter: '',
      value: '',
    },
  ]);

  productDataTransfer(priceFilter);

  useEffect(() => {
    fetchProductData();
    brandFilterListData();
  }, []);

  const brandFilterListData = async () => {
    try {
      const data = await Products.categoriesWithBrands();
      const prodData = data?.data?.data;
      setFilterList(prodData);
      const catIds = await catId;
      const prodDataFilter = prodData.map(pd => {
        if (pd.category_id === Number(catIds)) {
          return {
            ...pd,
            checked: true,
          };
        } else {
          return pd;
        }
      });
      setProductData(prodDataFilter);
      // setPriceFilter([0, 500]);

      console.log(42, data);
      console.log(43, data);
    } catch (err) {
      console.error(err);
    }
  };

  // useEffect(() => {
  //   const prodDataFilter = productData &&
  //   productData.length > 0 && productData.map(pd => {
  //     if (pd.category_id === Number(catId)) {
  //       return {
  //         ...pd,
  //         checked: true,
  //       };
  //     } else {
  //       return pd;
  //     }
  //   });
  //   setProductData(prodDataFilter);
  // }, [catId]);

  useEffect(() => {
    console.log(6777, productData);
    if (productData) {
      const brand =
        productData &&
        productData.length > 0 &&
        productData.find(items => items.category_id === Number(catId))?.brands;
      setBrandData(brand);
      console.log(6778, brand);
    }
  }, [productData, catId]);

  filterList.map(item => {
    console.error(item.brands);
  });

  const fetchProductData = async () => {
    try {
      const data = await Products.getAllData();
      // setTotalPage(data.data.pages);
      // setProductData(data.data.data);
      console.log(78, data.data.pages.max_product_price);
      setPriceFilter([
        Number(data.data.pages.min_product_price),
        Number(data.data.pages.max_product_price),
      ]);
      console.log(79, data);
      // dispatch(getAllProductData(data.data.data));
    } catch (error) {
      console.error('error------------------>', error);
    }
  };

  // const queryFilter = (catId, brandId, subCatId) => {
  //   router.push(
  //     `/category/accessories?id=${catId ? catId : ""}&brandId=${brandId ? brandId : ""}&subCatId=${subCatId ? subCatId : ""}`,
  //   );
  // }

  const queryFilter = (catId, brandId, subCatId, featured, newArrive) => {
    const brand = brandId ? '&brandId=' + brandId : '';
    const subCat = subCatId ? '&subCatId=' + subCatId : '';
    const feature = featured
      ? '&isFeatured=' + featured
      : isFeatured
      ? '&isFeatured' + isFeatured
      : '';
    const arrival = newArrive
      ? '&isNewArrival=' + newArrive
      : isNewArrival
      ? '&isNewArrival' + isNewArrival
      : '';

    router.push(
      `/category/accessories?id=${
        subCatId ? subCatId : catId
      }${brand}${feature}${arrival}`,
    );
  };

  const FilterData = ({ title, clicked }) => {
    return (
      <div className={styles.filters}>
        <span>{title}</span>
        <span className={styles.close} onClick={clicked}>
          <img src="/images/close.svg" alt="close" />
        </span>
      </div>
    );
  };

  return (
    <>
      <div className={styles.sideSlideBar}>
        <div className={`mb-3 ${styles.filterDiv}`}>
          <div className="d-flex justify-content-between">
            <h3>Filters</h3>
            <button
              onClick={() => {
                queryFilter(catId);
                setFilters([]);
              }}
            >
              Clear
            </button>
          </div>

          <div className="d-flex flex-wrap gap-3">
            {console.log(8123, filters)}
            {(priceFilter[1] !== MAX || priceFilter[0] !== MIN) && (
              <FilterData
                title={`Min Rs ${priceFilter[0]} - Rs ${priceFilter[1]}`}
                clicked={() => setPriceFilter([0, 500])}
              />
            )}
            {catFilter && (
              <FilterData title={catFilter} clicked={() => setCatFilter('')} />
            )}
            {subCatFilter && (
              <FilterData
                title={subCatFilter}
                clicked={() => setSubCatFilter('')}
              />
            )}
            {brandFilter &&
              brandFilter.length > 0 &&
              brandFilter.map((br, i) => (
                <FilterData
                  key={`br-filt-${i}`}
                  title={br}
                  clicked={() => setBrandFilter([])}
                />
              ))}
          </div>
        </div>
        <div className={styles.categoryDiv}>
          <h3>Categories</h3>
          {catId && (
            <div>
              {productData &&
                productData.length > 0 &&
                productData.map((items, index) => {
                  return (
                    <div
                      key={`category-${items?.category_id}`}
                      eventKey={items?.category_id?.toString()}
                    >
                      <div className="d-flex justify-content-between">
                        <div>
                          <label htmlFor={`cat-${items.category_id}`}>
                            <div
                              className={
                                items.category_id === catId && 'text-bold'
                              }
                            >
                              {items?.category_name} |{' '}
                              {items?.category_id?.toString()}
                            </div>
                            <input
                              className="d-none"
                              type="checkbox"
                              id={`cat-${items.category_id}`}
                              checked={items.checked}
                              onChange={() => {
                                const prodData = productData.map(pd => {
                                  if (pd.category_id === items.category_id) {
                                    return {
                                      ...pd,
                                      checked: true,
                                    };
                                  } else {
                                    return {
                                      ...pd,
                                      checked: false,
                                    };
                                  }
                                });
                                queryFilter(
                                  items.category_id,
                                  brandId,
                                  subCatId,
                                );

                                setCatFilter(items.category_name);

                                // setFilters([
                                //   ...filters,
                                //   {
                                //     filter: 'cat',
                                //     value: items.category_name,
                                //   },
                                // ]);
                                setProductData(prodData);
                              }}
                            />
                          </label>
                        </div>
                        <div>{items.checked ? '-' : '+'}</div>
                      </div>
                      {console.log(43512, items)}
                      <div className="p-1">
                        {items.checked && (
                          <ul className="mb-0">
                            {items?.subcategories.map(subitem => {
                              return (
                                <li
                                  className="mb-0"
                                  key={subitem.category_id.toString()}
                                  // onClick={() => {
                                  //   console.log(678, brandId);
                                  //   queryFilter(
                                  //     catId,
                                  //     brandId,
                                  //     subitem.category_id,
                                  //   );
                                  // router.push(
                                  //   `/category/accessories?id=${catId}&brandId=${brandId}&subCatId=${subitem.category_id}`,
                                  // );
                                  // }}
                                >
                                  <div>
                                    {console.log(5123, subCatId)}
                                    {/* <label htmlFor={`cat-${subitem.category_id}`}> */}
                                    <div
                                      className={
                                        'text-normal' + subitem.category_id ===
                                          subCatId && 'text-bold'
                                      }
                                      onClick={() => {
                                        queryFilter(
                                          catId,
                                          brandId,
                                          subitem.category_id,
                                        );

                                        setSubCatFilter(subitem.category_name);

                                        // setFilters([
                                        //   ...filters,
                                        //   {
                                        //     filter: 'subCat',
                                        //     value: subitem.category_name,
                                        //   },
                                        // ]);
                                      }}
                                    >
                                      {subitem?.category_name} |{' '}
                                      {subitem?.category_id?.toString()}
                                    </div>
                                    {/* <input
                                        className="d-none"
                                        type="radio"
                                        id={`cat-${subitem.category_id}`}
                                        checked={subitem.checked}
                                        onChange={() => {
                                          // const prodData = items?.subcategories.map(
                                          //   pd => {
                                          //     if (
                                          //       pd.category_id ===
                                          //       subitem.category_id
                                          //     ) {
                                          //       return {
                                          //         ...pd,
                                          //         checked: true,
                                          //       };
                                          //     } else {
                                          //       return {
                                          //         ...pd,
                                          //         checked: false,
                                          //       };
                                          //     }
                                          //   },
                                          // );
                                          // const prodDataNew = productData[index]
                                          // console.log(5467, prodData, {
                                          //   ...productData[index],
                                          //   subcategories: prodData
                                          // }, productData[index] )
                                          // setProductData({
                                            //   ...productData[index],
                                            //   subcategories: prodData
                                            // });
                                            // queryFilter(
                                            //   catId,
                                            //   brandId,
                                            //   subitem.category_id,
                                            // );
                                        }}
                                      /> */}
                                    {/* </label> */}
                                  </div>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
        <div className={styles.priceRange}>
          <div className={styles.itemPrice}>
            <h6>PRICE</h6>
            <h6 className={styles.close} onClick={() => setPriceFilter([])}>
              Clear
            </h6>
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
                    {console.log(689, brandData)}
                    {brandData &&
                      brandData.length > 0 &&
                      brandData.map(item => (
                        <div
                          key={`brand-${item.brand_id}`}
                          // onClick={() => {
                          //   console.log(678, item.brand_id);
                          //   // router.push(
                          //   //   `/category/accessories?id=${catId}&brandId=${item.brand_id}&subCatId=${subCatId}`,
                          //   console.log(69, subCatId);
                          //   // );
                          //   queryFilter(catId, item.brand_id, subCatId);
                          //   setFilters([
                          //     ...filters,
                          //    filter : "brands"
                          //   ]);
                          // }}
                        >
                          <label
                            htmlFor={item.brand_id}
                            className="d-flex align-items-center"
                          >
                            <input
                              type="checkbox"
                              checked={item.checked}
                              title={item.brand_name}
                              name="brand"
                              id={item.brand_id}
                              onChange={e => {
                                const brandList =
                                  brandData &&
                                  brandData.length > 0 &&
                                  brandData.map(br => {
                                    if (item.brand_id === br.brand_id) {
                                      return {
                                        ...br,
                                        checked: e.target.checked,
                                      };
                                    } else {
                                      return br;
                                    }
                                  });
                                setBrandData(brandList);
                                console.log(4337, brandList);
                                const filterBrand = brandList.filter(
                                  br => br.checked,
                                );
                                const setBrands = filterBrand
                                  .map(br => br.brand_id)
                                  .join(',');
                                const setBrandsName = filterBrand.map(
                                  br => br.brand_name,
                                );
                                console.log(4335, setBrands);
                                queryFilter(catId, setBrands, subCatId);

                                setBrandFilter(setBrandsName);
                                // setFilters({
                                //   ...filters,
                                //   ...setBrandsName,
                                // });
                              }}
                            />
                            <span className="ms-2">{item.brand_name}</span>
                          </label>
                          {/* <Checkbox label={item.brand_name} /> */}
                        </div>
                      ))}
                    {/* <Checkbox label="Nestle" />
                    <Checkbox label="Saffola" />
                    <Checkbox label="Quaker Oats" />
                    <Checkbox label="Solimo" />
                    <Checkbox label="The Whole Truth" /> */}
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>CUSTOMER RATINGS</Accordion.Header>
              <Accordion.Body>
                <div className={styles.checkBoxText}>
                  <Checkbox label="1" />
                  <Checkbox label="2" />
                  <Checkbox label="3" />
                  <Checkbox label="4" />
                  <Checkbox label="5" />
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>OTHERS</Accordion.Header>
              <Accordion.Body>
                <div className={styles.checkBoxText}>
                  <Checkbox label="Feature Products" />
                  <Checkbox label="New Arrivals" />
                </div>
              </Accordion.Body>
            </Accordion.Item>
            {/* <Accordion.Item eventKey="3">
              <Accordion.Header>NEW ARRIVAL</Accordion.Header>
              <Accordion.Body>
                <div className={styles.checkBoxText}>
                  <Checkbox label="4" />
                  <Checkbox label="5" />
                </div>
              </Accordion.Body>
            </Accordion.Item> */}
          </Accordion>
        </div>
      </div>
    </>
  );
};
