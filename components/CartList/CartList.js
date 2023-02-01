import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  decreaseQuantity,
  increaseQuantity,
  removeToCart,
} from '../../redux/cartSlice';
import { Products } from '../../services/Products';
import styles from './cartlist.module.css';

export const CartList = () => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const increaseCartQuantity = async item => {
    try {
       await Products.updateCart({
        product_id: item.product_id,
        user_id: item.user_id,
        quantity: item.product_qty + 1,
      });
      dispatch(increaseQuantity(item.product_id));
    } catch (err) {
      console.error(err);
    }
  };
  const decreaseCartQuantity = async item => {
    try {
      await Products.updateCart({
        product_id: item.product_id,
        user_id: item.user_id,
        quantity: item.product_qty - 1,
      });
      dispatch(decreaseQuantity(item.product_id));
    } catch (err) {
      console.error(err);
    }
  };

  const ProductRemoveToCart = async item => {
    try {
      await Products.updateCart({
        product_id: item.product_id,
        user_id: item.user_id,
        quantity: 0,
      });
      dispatch(removeToCart(item.product_id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {cartItems.map(item => (
        <div key={item.id} className={`p-3 mb-3 ${styles.list}`}>
          <div className={`d-flex gap-3 pb-3 ${styles.topCard}`}>
            <img src="/images/red-label.png" alt="red-label" />
            <div className={styles.content}>
              <p>{item.product_name}</p>
              <span className={styles.quant}> 500gm</span>
              <div className="d-flex gap-2">
                <span className={styles.orgRate}>Rs. 500</span>
                <span className={styles.rate}>Rs. {item.product_price}</span>
              </div>
            </div>
          </div>
          <div className="d-flex gap-3 align-items-center ">
            <span className={styles.quantity}>Quantity:</span>
            <div className={`d-flex gap-2 ${styles.addCartBtn}`}>
              <button
                onClick={() => decreaseCartQuantity(item)}
                className={styles.dec}
              >
                -
              </button>
              <span className={styles.count}>{item.product_qty}</span>
              <button
                onClick={() => increaseCartQuantity(item)}
                className={styles.inc}
              >
                +
              </button>
              <span className={styles.count}>
                <img
                  onClick={() => ProductRemoveToCart(item)}
                  src="/images/delte.svg"
                  alt="delete"
                />
              </span>
            </div>
            <h6>{item.product_price}</h6>
          </div>
        </div>
      ))}
    </>
  );
};
