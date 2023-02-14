import Link from 'next/link';
import React from 'react';
import { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AddressCard, ProfileLayout } from '../../../components';
import {
  removefromWishlist,
  wishlistProducts,
} from '../../../redux/productSlice';
import { Products } from '../../../services/Products';
import { Wishlist } from '../../../services/wishlist';
import styles from '../index.module.css';
import { AuthLayoutPages } from '../../../components/AuthLayout/AuthLayoutPages';
import { AuthLayout } from '../../../components/AuthLayout/AuthLayout';

export default function WishList() {

  const user = useSelector(state => state.auth.user?.user_id);
  const dispatch = useDispatch();
  const wishlist = useSelector(state => state.products.wishlistProducts);
  // const renderTooltipforremove = props => (
  //   <Tooltip {...props}>Click to remove from wishlist</Tooltip>
  // );
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


  const removeWishlist = async product_id => {
    try {
      const data = await Products.removeToWishlist({
        product_id: product_id,
        user_id: user,
      });
      console.info(data)
      dispatch(
        removefromWishlist({
          product_id: product_id,
          user_id: user,
        }),
      );
    } catch (error) {
      console.error('error----------------------->', error);
    }
  };
  return (
    <AuthLayoutPages>
      <ProfileLayout>
        <div className={styles.profileWrapper}>
          <h3 className={styles.title}>My Wishlist</h3>
          <Row>
            {wishlist.map((item, i) => (
              <Col md={4} key={i.id}>
                <AddressCard>
                  <button style={{ border: 'none', background: 'none' }}>
                    <span className={styles.icon}>
                      <img
                        id={item.product_id}
                        onClick={()=>removeWishlist(item.product_id)}
                        src="/images/red-heart.svg"
                        alt="red-heart"
                      />
                    </span>
                  </button>
                  <Link
                    href={`/products/${item.product_name_slug}/?id=${item.product_id}`}
                  >
                    <div className={styles.wishListCard} key={item.product_id}>
                      <div className={`mb-3 text-center ${styles.image}`}>
                        <img src={item?.mediadata[0]?.http_url ? item?.mediadata[0]?.http_url : "/images/default.jpg"} alt="wishlist" />
                      </div>
                      <div className={styles.content}>
                        <h4>{item.product_name}</h4>
                        <p className="mb-1">{item.product_quanitity}</p>
                        <div className="d-flex gap-2 align-items-center">
                          <span className={styles.Price}>
                            Rs. {item.product_price}
                          </span>
                          <span className={styles.orgPrice}>
                            {item.price_base}
                          </span>
                          <span className={styles.off}>35% off</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </AddressCard>
              </Col>
            ))}
          </Row>
        </div>
      </ProfileLayout>
    </AuthLayoutPages>
  );
}
