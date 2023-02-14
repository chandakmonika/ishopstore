import React, { useMemo} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
} from '../../redux/cartSlice';
import { toggleCartModal } from '../../redux/cartSlice';
import { toast } from 'react-toastify';
import { Products } from '../../services/Products';
import styles from './addCart.module.css';

export const AddToCart = ({productItem }) => {
  console.log(455,productItem)
  const cartItems = useSelector(state => state?.cart?.items);
  const products = useSelector(state => state?.products?.allProducts);
  // const {  isCartOpen } = useSelector(state => state?.cart);
  const user_id = useSelector(state => state?.auth?.user?.user_id);
  const cartItem = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  console.log(989, cartItems);

  // find product in cart using product id
  const currentItem = useMemo(
    () => cartItems?.find(item => item.product_id === productItem.product_id),
    [cartItems, productItem.product_id],
  );

  const product = useMemo(() => products?.find(item => item.id === productItem.product_id), [
    products,
    productItem.product_id,
  ]);

  console.log(234, product, currentItem)

  // const fetchData = async () => {
  //   try {
  //     const data = await Products.singleData(productId);
  //     // setData(data.data.data);
  //     // setFaqData(data.data.faq);
  //     // setAttrData(data.data.attributes);
  //     console.log(797, data);
  //   } catch (error) {
  //     console.error('error------------------>', error);
  //   }
  // }; 

  // useEffect(() => {
  //   fetchData();
  // }, [productId])
  

  const productAddToCart = async (id, productData) => {
    console.log(6789, id, productData, cartItem)
    try {
      const item = cartItem.find(i => i.product_id === parseInt(id));
      console.log(3241, item)
      if (item) {
        toast.success('item already exist');
      } else {
        await Products.addToCart({
          product_id: parseInt(productItem.product_id),
          user_id: user_id,
        });
        // toast.success('added to cart successfully');
        dispatch(
          addToCart({
            product_id: parseInt(productItem.product_id),
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

  return (
    <div className={styles.addCartBtn}>
      {console.log(5412, currentItem)}
      {currentItem ? (
        <div className="d-flex gap-2">
          <button
            className={styles.dec}
            onClick={() => dispatch(decreaseQuantity(currentItem.product_id))}
          >
            -
          </button>
          <span className={styles.count}>{currentItem?.product_qty}</span>
          <button
            className={styles.inc}
            onClick={() => dispatch(increaseQuantity(currentItem.product_id))}
          >
            +
          </button>
        </div>
      ) : (
        <button
          className="btn"
          onClick={() => {
            productAddToCart(productItem.product_id, productItem)
            // dispatch(addToCart({ productId, product }))
            dispatch(toggleCartModal(true))
          }}
        >
          Add to Cart <span>+</span>
        </button>
      )}
    </div>
  );
};
