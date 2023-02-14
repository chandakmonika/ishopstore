import React, { useState,useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { Button, ProfileLayout } from '../../../../components';
import styles from './index.module.css';
import ReactStars from 'react-rating-stars-component';
import SingleFileUpload from './Fileupload';
import { Ratings } from '../../../../services/Rating';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Products } from '../../../../services/Products';

export default function ListAddress() {
  const router = useRouter();
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState('');
  const [product, setProduct] = useState('');
  const productSlug = router.query['Id'];
  const user = useSelector(state => state?.auth?.user?.user_id);
  const imageArray = useSelector(
    state => state.products.productRatingImageArray,
  );
  // const product = useSelector(state => state.products.selectProductReview);

  const handleInput = e => {
    setDescription(e.target.value);
  };
  //TODO product Id sent after order list print
  const ratingPostApi = async () => {
    try {
      await Ratings.postRating({
        user_id: user,
        product_id: product.product_id,
        comment_msg: description,
        rating_value: rating,
        rating_media: imageArray,
      });
      router.push('/user/review-and-rating');
    } catch (err) {
      console.error(err);
      router.push('/user/review-and-rating');
    }
  };
  const handleSubmit = e => {
    e.preventDefault();
    ratingPostApi();
  };
  const handleRatingInput = e => {
    setRating(e);
  };

  const fetchData = async () => {
    try {
      const data = await Products.singleData(productSlug);

      setProduct(data.data.data);
      console.log(77, data);
    } catch (error) {
      console.error('error------------------>', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [productSlug])

  console.log(90,productSlug)

  return (
    <>
      <ProfileLayout classes="px-0">
        <Form onSubmit={handleSubmit}>
          <div className={styles.profileWrapper}>
            <h3 className={`px-3 ${styles.title}`}>Add Ratings & Review</h3>
            <div className={`px-3 ${styles.detailCard}`}>
              <div className="d-flex justify-content-between align-items-start">
                <div className="d-flex gap-3">
                  <div className={styles.image}>
                    <img src={product && product?.mediadata[0]?.http_url} alt="img" />
                    {console.log(72, product)}
                  </div>
                  <div className={styles.addressDetail}>
                    <h4>{product.product_name}</h4>
                    <p>900 gms</p>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <ReactStars
                        count={5}
                        isHalf={true}
                        emptyIcon={<i className="far fa-star"></i>}
                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                        fullIcon={<i className="fa fa-star"></i>}
                        size={24}
                        activeColor="#ffd700"
                        // value={data.rating}
                        onChange={handleRatingInput}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`p-3 ${styles.reviewWrapper}`}>
            <h3 className={` ${styles.title}`}>Write Review </h3>

            <Form.Control
              as="textarea"
              name="description"
              placeholder="Planned to switch to some healthy morning food to maintain health and stay active, Got the product within the expected date."
              style={{ height: '150px' }}
              value={description}
              onChange={handleInput}
            />

            <div className={`mt-3 position-relative }`}>
              <Form.Label>Add Img</Form.Label>

              <SingleFileUpload />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button type="submit">Save</Button>
            </div>
          </div>
        </Form>
      </ProfileLayout>
    </>
  );
}
