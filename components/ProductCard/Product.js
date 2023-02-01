import React from 'react';
import { AddToCart } from '../AddToCart';
import styles from './product.module.css';

export const Product = ({ data }) => {
  if (!data) return null;

  const { name, id, image, isWishListed, discount, mrp, discount_price } = data;
  return (
    <div className={styles.productCard}>
      <div className={styles.wishlist}>
        {isWishListed ? (
          <img src="/images/heart-red.svg" alt="heart--red" />
        ) : (
          <img src="/images/heart-grey.svg" alt="heart--grey" />
        )}
      </div>
      <div className={styles.starImg}>
        <span>{discount}</span>
      </div>
      <div className={styles.image}>
        <img src={image} alt={name} />
      </div>
      <div className={`d-flex flex-column ${styles.spaceBetween}`}>
        <h3>{name}</h3>
        <div className="d-flex justify-content-between mb-3">
          <div className={styles.orgPrice}>
            <span>Rs. {mrp}</span>
          </div>
          <div className={styles.disPrice}>
            <span>Rs. {discount_price}</span>
          </div>
        </div>
      </div>
      <AddToCart productId={id} />
    </div>
  );
};
