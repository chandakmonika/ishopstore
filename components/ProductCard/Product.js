import Link from 'next/link';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Products } from '../../services/Products';
import { AddToCart } from '../AddToCart';
import styles from './product.module.css';
import { addtoWishlist, removefromWishlist } from '../../redux/productSlice';

export const Product = ({ data }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state?.auth?.user?.user_id);

  const handleWishlistItem = isWishlisted => {
    return isWishlisted ? removeWishlist() : addWishlist();
  };

  const addWishlist = async () => {
    try {
      await Products.addToWishlist({
        product_id: data?.product_id,
        user_id: data.user_id,
      });
      dispatch(addtoWishlist({ product_id: data.product_id, user_id: user }));
    } catch (error) {
      console.error('error----------------------->', error);
    }
  };

  const removeWishlist = async () => {
    try {
      await Products.removeToWishlist({
        product_id: data?.product_id,
        user_id: user,
      });
      dispatch(
        removefromWishlist({
          product_id: data?.product_id,
          user_id: user,
        }),
      );
    } catch (error) {
      console.error('error----------------------->', error);
    }
  };

  if (!data) return null;
  console.log(40, data);
  const { name, id, image, isWishListed, discount, mrp, discount_price } = data;
  return (
    <div className={styles.productCard}>
      <div
        className={styles.wishlist}
        onClick={() => handleWishlistItem(data.is_wishlisted)}
      >
        {data.is_wishlisted ? (
          <img src="/images/heart-red.svg" alt="heart--red" />
        ) : (
          <img src="/images/heart-grey.svg" alt="heart--grey" />
        )}
      </div>
      <Link href={`/products/${data.product_name_slug}?id=${data.product_id}`}>
        <div>
          <div className={styles.starImg}>
            <span>{discount}</span>
          </div>
          <div className={styles.image}>
            <img src={data.mediadata[0].http_url} alt={name} />
          </div>
          <div className={`d-flex flex-column ${styles.spaceBetween}`}>
            <h3>{data.product_name}</h3>
            <div className="d-flex justify-content-between mb-3">
              <div className={styles.orgPrice}>
                <span>Rs. {data.price_sell}</span>
              </div>
              <div className={styles.disPrice}>
                <span>Rs. {discount_price}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
      <AddToCart productItem={data} />
    </div>
  );
};
