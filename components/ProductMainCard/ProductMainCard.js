import Link from 'next/link';
import { useState } from 'react';
import { useEffect } from 'react';
import { Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  addtoWishlist,
  removefromWishlist,
  wishlistProducts,
} from '../../redux/productSlice';
import { Products } from '../../services/Products';
import { Wishlist } from '../../services/wishlist';
import { AddressCard } from '../UI';
import styles from './productmainCard.module.css';
import RecordNotFound from '../RecordNotFound/RecordNotFound';

export const ProductMainCard = () => {
  const [productId, setProductId] = useState(null);
  const user = useSelector(state => state?.auth?.user?.user_id);
  const dispatch = useDispatch();
  const products = useSelector(state => state?.products?.getAllProductData);

  useEffect(() => {
    if (productId?.is_wishlisted == true) {
      removeWishlist();
    } else if (productId?.is_wishlisted == false) {
      addWishlist();
    } else {
      return;
    }
  }, [productId]);

  useEffect(() => {
    wishlistComponent();
  }, []);

  const wishlistComponent = async () => {
    try {
      const data = await Wishlist.getWishlistData(user);
      dispatch(wishlistProducts(data?.data?.data));
    } catch (error) {
      console.error('::::::::::::::::::::::::::=>', error);
    }
  };

  const addWishlist = async () => {
    try {
      await Products.addToWishlist({
        product_id: productId?.product_id,
        user_id: user,
      });
      dispatch(
        addtoWishlist({ product_id: productId.product_id, user_id: user }),
      );
    } catch (error) {
      console.error('error----------------------->', error);
    }
  };

  const removeWishlist = async () => {
    try {
      await Products.removeToWishlist({
        product_id: productId?.product_id,
        user_id: user,
      });
      dispatch(
        removefromWishlist({
          product_id: productId?.product_id,
          user_id: user,
        }),
      );
    } catch (error) {
      console.error('error----------------------->', error);
    }

  };
  const onErrorImage= (e) =>{
  e.target.src = "/images/default.jpg"
  }

  return (
    <>
      {products && products.length>0 ? products?.map(item => (
        <Col md={4} key={item.product_id}>
          <AddressCard>
            <button style={{ border: 'none', background: 'none' }}>
              <span className={styles.icon}>
                {console.log(3245, item)}
                {item?.is_wishlisted == true && (
                  <img
                    id={item.product_id}
                    onClick={() => setProductId(item)}
                    src="/images/heart-red.svg"
                    alt="red-heart"
                  />
                )}
                {item?.is_wishlisted == false && (
                  <>
                    <img
                      id={item.product_id}
                      style={{ height: '15px' }}
                      onClick={() => setProductId(item)}
                      src="/images/heart-grey.svg"
                      alt="red-heart"
                    />
                  </>
                )}
              </span>
            </button>
            <Link
              href={`/products/${item.product_name_slug}/?id=${item.product_id}`}
            >
              <div className={styles.wishListCard} key={item.product_id}>
                <div className={`mb-3 text-center ${styles.image}`}>
                  <img onError={(e)=> onErrorImage(e)} src={item.mediadata[0].http_url ? item.mediadata[0].http_url : "/images/default.jpg"} alt={"Product Image"} className={styles.wishlistImg}/>
                </div>
                <div className={styles.content}>
                  <h4>{item.product_name}</h4>
                  <p className="mb-1">{item.product_quanitity}</p>
                  <div className="d-flex gap-2 align-items-center">
                    <span className={styles.Price}>Rs. {item.price_sell}</span>
                    <span className={styles.orgPrice}>
                      Rs. {item.price_base}
                    </span>
                    <span className={styles.off}>35% off</span>
                  </div>
                </div>
              </div>
            </Link>
          </AddressCard>
        </Col>
      )):

   
      < RecordNotFound/>
     
      }
    </>
  );
};
