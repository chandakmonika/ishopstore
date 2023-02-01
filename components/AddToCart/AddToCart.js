import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
} from '../../redux/cartSlice';
import styles from './addCart.module.css';

export const AddToCart = ({ productId }) => {
  const cartItems = useSelector(state => state?.cart?.items);
  const products = useSelector(state => state?.products?.allProducts);
  const dispatch = useDispatch();

  // find product in cart using product id
  const currentItem = useMemo(
    () => cartItems?.find(item => item.productId === productId),
    [cartItems, productId],
  );

  const product = useMemo(() => products?.find(item => item.id === productId), [
    products,
    productId,
  ]);

  return (
    <div className={styles.addCartBtn}>
      {currentItem ? (
        <div className="d-flex gap-2">
          <button
            className={styles.dec}
            onClick={() => dispatch(decreaseQuantity({ productId }))}
          >
            -
          </button>
          <span className={styles.count}>{currentItem?.quantity}</span>
          <button
            className={styles.inc}
            onClick={() => dispatch(increaseQuantity({ productId }))}
          >
            +
          </button>
        </div>
      ) : (
        <button
          className="btn"
          onClick={() => dispatch(addToCart({ productId, product }))}
        >
          Add to Cart <span>+</span>
        </button>
      )}
    </div>
  );
};
