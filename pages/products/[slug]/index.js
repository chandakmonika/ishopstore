import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import {
  AddressCard,
  AppLayout,
  Product,
  Question,
  RatingProgress,
  RecentProducts,
  SingleReview,
} from '../../../components';
import styles from './index.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import ReactImageMagnify from 'react-image-magnify';
import { Products } from '../../../services/Products';
import { useRouter } from 'next/router';
import { addToCart } from '../../../redux/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactPlayer from 'react-player';
// import { toggleCartModal } from '../../../redux/cartSlice';
import { AddToCart } from '../../../components';
import Link from 'next/link';
import { selectProductReview } from '../../../redux/productSlice';
// const list = [
//   {
//     img: '/images/thumb.png',
//     type: 'image/png',
//   },
//   {
//     img: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
//     type: 'video/mp4',
//   },
//   {
//     img: '/images/thumb.png',
//     type: 'image/png',
//   },
//   {
//     img: '/images/thumb.png',
//     type: 'image/png',
//   },
//   {
//     img: '/images/thumb.png',
//     type: 'image/png',
//   },
// ];

export default function ProductSingle() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [faqData, setFaqData] = useState([]);
  const [attrData, setAttrData] = useState([]);
  const [ratingData, setRatingData] = useState([]);
  const [reviewData, setReviewData] = useState([]);
  const router = useRouter();
  const [video, setVideo] = useState('');
  const product_id = router.query.id;
  const product_slug = router.query.slug;
  const user_id = useSelector(state => state?.auth?.user?.user_id);
  const cartItem = useSelector(state => state.cart.items);

  useEffect(() => {
    fetchData();
  }, [product_id]);

  const fetchData = async () => {
    try {
      const data = await Products.singleData(product_slug);
      setData(data.data.data);
      setFaqData(data.data.faq);
      setAttrData(data.data.attributes);
      setRatingData(data.data.rating);
      setReviewData(data.data.reviews);
      console.log(77, data);
    } catch (error) {
      console.error('error------------------>', error);
    }
  };
  const handleClick = e => {
    setVideo(e);
  };

  const productAddToCart = async (id, productData) => {
    try {
      const item = cartItem.find(i => i.product_id === parseInt(id));
      if (item) {
        toast.success('item already exist');
      } else {
        await Products.addToCart({
          product_id: parseInt(product_id),
          user_id: user_id,
        });
        toast.success('added to cart successfully');
        dispatch(
          addToCart({
            product_id: parseInt(product_id),
            user_id: user_id,
            product_name: productData.product_name,
            product_image: productData.product_name,
            product_price: productData.price_sell,
          }),
        );
      }
    } catch (error) {
      toast.error(error);
    }
  };
  //TODO : Currently GET/ Cart api is not working
  //  Uncomment this code once api start working
  // const productRemoveToCart = async () => {
  //   try {
  //     const data = await Products.updateCart({
  //       product_id: product_id,
  //       user_id: user,
  //     });
  //     // dispatch(addToCart({ product_id: product_id, user_id: user }));pending remove cart api
  //   } catch (error) {
  //     console.log('error----------------------->', error);
  //   }
  // };

  console.log(56, data);
  return (
    <>
      <AppLayout>
        <section className="py-5">
          <Container>
            <Row>
              <Col md={4}>
                <div className={styles.productImages}>
                  <div className={styles.image}>
                    <div
                      className="p-2 mb-4"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid #ccc',
                      }}
                    >
                      <div className={` text-center`}>
                        {video === 'video' ? (
                          <ReactPlayer
                            url="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                            controls
                            width="400px"
                          />
                        ) : (
                          <ReactImageMagnify
                            smallImage={{
                              alt: 'Wristwatch by Ted Baker London',
                              isFluidWidth: true,
                              src:
                                data && data.mediadata
                                  ? data?.mediadata[0].http_url
                                  : '/images/default.jpg',
                            }}
                            largeImage={{
                              src:
                                data && data.mediadata
                                  ? data?.mediadata[0].http_url
                                  : '/images/default.jpg',
                              width: 1200,
                              height: 1800,
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className={styles.sliderImages}>
                    <Swiper spaceBetween={10} slidesPerView={4}>
                      {data &&
                        data.mediadata &&
                        data.mediadata.length > 0 &&
                        data.mediadata.map((data, index) => (
                          <SwiperSlide key={index}>
                            <AddressCard>
                              {/* <div className={styles.thhumbnailImg}> */}
                              {data?.type !== 'video/mp4' ? (
                                <img
                                  src={data.http_url}
                                  alt="product"
                                  width="100%"
                                  onClick={() => handleClick('img')}
                                />
                              ) : (
                                <video
                                  src={data.http_url}
                                  width="100%"
                                  onClick={() => handleClick('video')}
                                  poster="/images/play.jpg"
                                />
                              )}

                              {/* </div> */}
                            </AddressCard>
                          </SwiperSlide>
                        ))}
                    </Swiper>
                  </div>
                  <div className="d-flex gap-3 justify-content-center">
                    {/* <Button
                      onClick={() => {
                        dispatch(toggleCartModal(true))
                        productAddToCart(product_id, data)
                      }}
                      
                    
                      className={styles.addToCart}
                    >
                      Add to Cart
                    </Button> */}
                    <AddToCart productItem={data} />
                    <Link href="/checkout">
                    <Button className={styles.buyNow}>Buy Now</Button>
                    </Link>
                    
                  </div>
                </div>
              </Col>
              <Col md={8}>
                <div className={styles.productDetail}>
                  <AddressCard>
                    <div className={styles.content}>
                      <h3 className={styles.productName}>
                        {data.product_name}
                      </h3>
                      <p className={`mb-0 ${styles.ratingReview}`}>
                        100 Ratings & 50 Reviews
                      </p>
                      <span className={styles.special}>Special Price</span>
                      <div className="d-flex align-items-center py-2 gap-2">
                        <span className={styles.price}>
                          Rs. {data.price_sell}
                        </span>
                        <span className={styles.orgPrice}>
                          Rs. {data.price_base}
                        </span>
                        <span className={styles.special}>35% off</span>
                      </div>
                      <div
                        className={`d-flex gap-2 align-items-center mb-2 ${styles.variantDiv}`}
                      >
                        <span className={styles.variant}>Weight</span>
                        <div className="p-1 text-muted small">500g</div>
                        <div className="p-1 text-muted small">1Kg</div>
                        <div className="p-1 text-muted small">5Kg</div>
                      </div>
                      <div
                        className={`d-flex gap-2 align-items-center mb-2 ${styles.variantDiv}`}
                      >
                        <span className={styles.variant}>Flavour</span>
                        <div className="p-1 text-muted small">Strawberry</div>
                        <div className="p-1 text-muted small">Corn</div>
                      </div>
                      <div className={styles.desc}>
                        <h6>Description</h6>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: data.product_long_desc,
                          }}
                        />
                      </div>
                    </div>
                  </AddressCard>
                  <AddressCard customClass="p-0">
                    <div className={styles.header}>Attributes</div>
                    {// attrData && attrData.length >0 && attrData.map((attr,i)=>(
                    //   <Question key={`attr-data-${i}`} attributekey={attr.attribute_key} attributevalue={attr.attribute_value}/>                        }                     />
                    // ))
                    attrData &&
                      attrData.length > 0 &&
                      attrData.map((attr, i) => (
                        <div key={`attr_data=${i}`}>
                          <h6>{attr.group_title}</h6>
                          <ul className={styles.listUl}>
                            {attr.attributes.map((attrItem, i) => {
                              return (
                                <li key={`attr_item=${i}`}>
                                  <span className={styles.name}>
                                    {attrItem.attribute_key}
                                  </span>
                                  <span className={styles.content}>
                                    {attrItem.attribute_value}
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ))}
                  </AddressCard>
                  <AddressCard>
                    <div className={styles.ratingReview}>
                      <div className="d-flex justify-content-between align-items-start">
                        <div className={styles.ratingHead}>
                          <h5 className={styles.ratingTag}>
                            Ratings & Reviews
                          </h5>

                          <div className="d-flex gap-3 align-items-center">
                            <h2 className="mb-0">{ratingData.final_rating} </h2>
                            <div className="d-flex align-items-center gap-2">
                              <img src="/images/yellow-star.svg" alt="star" />
                              <img src="/images/yellow-star.svg" alt="star" />
                              <img src="/images/yellow-star.svg" alt="star" />
                              <img src="/images/yellow-star.svg" alt="star" />
                              <img src="/images/yellow-star.svg" alt="star" />
                            </div>
                          </div>
                          <p className="mb-0">100 Ratings & 50 Reviews</p>
                        </div>
                        {/* <Link href={`/user/review-and-rating/add-rating?Id=${product_id}`}> */}
                          <Button className={styles.rateBtn} onClick={()=>{
                            // dispatch(selectProductReview(data))
                            router.push(`/user/review-and-rating/add-rating?Id=${data.product_name_slug}`)
                          }} variant="light">
                            Rate your Product
                          </Button>
                        {/* </Link> */}
                      </div>
                      <div className={`py-3 ${styles.progressBar}`}>
                        <RatingProgress
                          rate="5"
                          variant="success"
                          progress="60"
                          percent="60"
                        />
                        <RatingProgress
                          rate="4"
                          variant="success"
                          progress="30"
                          percent="30"
                        />
                        <RatingProgress
                          rate="3"
                          variant="success"
                          progress="5"
                          percent="5"
                        />
                        <RatingProgress
                          rate="2"
                          variant="success"
                          progress="3"
                          percent="3"
                        />
                        <RatingProgress
                          rate="1"
                          variant="danger"
                          progress="2"
                          percent="2"
                        />
                      </div>
                      <div className={`mb-2 ${styles.ratingHead}`}>
                        <h5 className={styles.ratingTag}>
                          Reviews from Customer
                        </h5>
                      </div>
                      {reviewData &&
                        reviewData.length > 0 &&
                        reviewData.map((review, i) => {
                          return (
                            <div className={styles.reviews}  key={`review-data-${i}`}>
                              <SingleReview
                               review = {review}
                                // firstname={review.first_name}
                                // commentmsg={review.comment_msg}
                              />
                              {/* <SingleReview key={`review-data-${i}`}
                      firstname={review.first_name}
                      commentmsg={review.comment_msg} /> */}
                            </div>
                          );
                        })}
                      {console.log(4222, reviewData)}
                    </div>
                  </AddressCard>
                  <AddressCard customClass="p-0">
                    <div className={styles.questionHeadDiv}>
                      Product Questions & Answer
                    </div>
                    {faqData &&
                      faqData.length > 0 &&
                      faqData.map((faq, i) => (
                        <Question
                          key={`faq-data-${i}`}
                          ques={faq.question}
                          ans={faq.answer}
                        />
                      ))}
                    {console.log(67, data)}
                  </AddressCard>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section className={styles.recentProducts}>
          <RecentProducts title="Recent Products" />
        </section>
        <section className={styles.recentProducts}>
          <RecentProducts title="Similar  Products" />
        </section>
      </AppLayout>
    </>
  );
}
