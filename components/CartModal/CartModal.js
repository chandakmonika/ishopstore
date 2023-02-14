import React,{useEffect} from 'react';
import { CloseButton } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AddressCard, Button } from '../UI';
import styles from './cartmodal.module.css';
import {
  decreaseQuantity,
  increaseQuantity,
  removeToCart,
  toggleCartModal,
} from '../../redux/cartSlice';
import className from 'classnames';
import Link from 'next/link';
import { Products } from '../../services/Products';
import { AuthLayoutPages } from '../AuthLayout/AuthLayoutPages';

export const CartModal = () => {
  const cartItems = useSelector(state => state.cart.items);
  const handleClose = () => dispatch(toggleCartModal(false));
  const dispatch = useDispatch();
  const { isCartOpen } = useSelector(state => state.cart);
  const Rs = useSelector(state => state.ui.currancy);
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
  const totalAmountArray =cartItems && cartItems.map((item)=>{
    return (item.product_price*item.product_qty)
  })
  const totalSum =totalAmountArray && totalAmountArray.reduce((prevValue, value) => {
    return prevValue + value;
  }, 0);

  const totalItemArray =cartItems && cartItems.map((item)=>{
    return item.product_qty
  })
  const totalCartItem =totalAmountArray && totalItemArray.reduce((prevValue, value) => {
    return prevValue + value;
  }, 0);
  
const  fetchCartItems = async() =>{
// try {
//   const data = "abc"
// } catch (error) {
  
// }
console.log(575)
}

useEffect(() => {
  fetchCartItems()
}, [cartItems])
  
console.log(6905,cartItems, isCartOpen)
  return (
      <div
        className={className(styles.cartDropdown, {
          [styles.isCartOpen]: isCartOpen,
        })}
      >
        <div className={styles.dropdownWraper}>
          <div className={`d-flex justify-content-between ${styles.borderB}`}>
            <div className="d-flex gap-4 align-items-center">
              <h6 className="mb-0">Cart</h6>
              <p className="mb-0">{cartItems?.length ?? 0} Items</p>
            </div>
            <CloseButton onClick={handleClose} />
          </div>
          <div className={styles.paddingBox}>
            {cartItems.length > 0 ? (
              <>
                {' '}
                <div className={styles.cartItemsBox}>
                  {cartItems?.map(p => (
                    <AddressCard key={p.id}>
                      <div
                        className={`d-flex gap-3 pb-3 mb-3  ${styles.topCard}`}
                        style={{ borderBottom: '1px solid #e5d8d8' }}
                      >
                        <img src={p?.mediadata && p?.mediadata[0]?.http_url ? p?.mediadata[0]?.http_url : "/images/default.jpg"} alt="red-label" />
                        <p>{p?.product_name}</p>
                      </div>
                      <div className="d-flex gap-3 align-items-center justify-content-between">
                        <span>Quantity:</span>
                        <div className={`d-flex gap-2 ${styles.addCartBtn}`}>
                          <button
                            className={styles.dec}
                            onClick={() => decreaseCartQuantity(p)}
                          >
                            -
                          </button>
                          <span className={styles.count}>{p?.product_qty}</span>
                          <button
                            className={styles.inc}
                            onClick={() => increaseCartQuantity(p)}
                          >
                            +
                          </button>
                          <span className={styles.count}>
                            <img
                              onClick={() => ProductRemoveToCart(p)}
                              src="/images/delte.svg"
                              alt="delete"
                            />
                          </span>
                        </div>
                        <h6>
                          {/* {Number(p?.product?.discount_price) * p?.quantity}{' '} */}
                          {`${Rs} ${(p.product_price)*(p.product_qty)}`}
                        </h6>
                      </div>
                    </AddressCard>
                  ))}
                </div>
              </>
            ) : null}

            {cartItems.length > 0 ? (
              <AddressCard>
                <div className={`pb-2 ${styles.header}`}>Price Details</div>
                <ul className={`list-unstyled mt-3 ${styles.ulList}`}>
                  <li>
                    <span className={styles.list}>Price ( {totalCartItem} item )</span>
                    <span className={styles.price}>{Rs} {totalSum}</span>
                  </li>
                  <li>
                    <span className={styles.list}>Discount</span>
                    <span className={styles.price}>{Rs} 00</span>
                  </li>
                  {/* <li>
                    <span className={styles.list}>Price ( {totalCartItem} item )</span>
                    <span className={styles.free}>Free</span>
                  </li> */}
                </ul>
                <div className="d-flex">
                  <span className={styles.total}>Total Amount</span>
                  <span className={styles.totalRate}>{Rs} {totalSum}</span>
                </div>
              </AddressCard>
            ) : (
              <div>
                <div style={{ height: ' 474px' }}>
                  <img
                    src={'/images/cart1.png'}
                    style={{
                      objectFit: 'contain',
                      height: '100%',
                      width: '100%',
                    }}
                  />
                </div>
                <h3 className="mt-3 mb-3" style={{ textAlign: 'center' }}>
                  No Items yet
                </h3>
                <p> Added items in your cart to view here</p>
              </div>
            )}
            {cartItems.length > 0 ? (
              <div className="d-flex gap-3 flex-column ">
                <Link href="/cart">
                  <Button className={styles.viewCartBtn}>View Cart</Button>
                </Link>
                <Link href="/checkout">
                  <Button className={styles.checkoutBtn}>Checkout</Button>
                </Link>
              </div>
            ) : (
              <div className="d-flex gap-3 flex-column">
                <Link href="/">
                  <Button className={styles.checkoutBtn}>
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
  );
};
