import React from 'react';
import { ListGroup } from 'react-bootstrap';
import {
  LogoutIcon,
  ProfileHeartIcon,
  ShoppingCartIcon,
  StarIcon,
} from '../../public/svg';
import { useRouter } from 'next/router'
import { Card } from '../UI';
import styles from './index.module.css';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/authSlice';
export const ProductSideBar = () => {
  const isAuthenticated = useSelector(state => state?.auth?.isAuthenticated);
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const router = useRouter()
  const sideData = [
    {
      name:'Edit Profile',
      img: <img  src="/images/Profile.svg" alt="profile" />,
      path:"/user/profile/edit-profile",
    },
    {
      name:'Addresses',
      img: <img  src="/images/address-icon.svg" alt="address" />,
      path:"/user/address/list-address",
    },
    {
      name:'My Orders',
      img: <ShoppingCartIcon />,
      path: "/user/my-orders/order-list",
    },
    {
      name:'My Wishlist',
      img: <ProfileHeartIcon />,
      path:"/user/wishlist",
    },
    {
      name:'My Ratings & Reviews',
      img: <StarIcon /> ,
      path:"/user/review-and-rating",
    },
]

  const handleLogout = () => {
    // TODO: Connect logout api

    dispatch(logout());
    // router.push("/login")
  };
  
  return (
    <>
      <div className={`wrapper`}>
        <Card>
          <ListGroup>
            <ListGroup.Item
              style={{ padding: '10px' }}
              className="py-3 border-0"
            >
              <Link
                href={isAuthenticated ? '/user/profile/edit-profile' : '/login'}
              >
                <img
                  src="/images/profile-icon.svg"
                  alt="profile"
                  style={{ cursor: 'pointer' }}
                />
              </Link>
              <span className={styles.title}>
                {user?.username?.toUpperCase().slice(0, 5)}
              </span>
            </ListGroup.Item>
          </ListGroup>
        </Card>
        <Card customClass="profile-list-card">
          <ListGroup>
            {/* <ListGroup.Item>
              <EditIcon />{' '}
              <span className={styles.title}>
                <Link href="/user/profile/edit-profile">Edit Profile</Link>
              </span>
            </ListGroup.Item>
            <ListGroup.Item>
              <img style={{color:"blue"}} src="/images/address-icon.svg" alt="address" />
              <span className={styles.title}>
                {' '}
                <Link href="/user/address/list-address">My Addresses</Link>
              </span>
            </ListGroup.Item>
            <ListGroup.Item>
              <ShoppingCartIcon />{' '}
              <Link href="/user/my-orders/order-list">My Orders</Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <ProfileHeartIcon />
              <span className={styles.title}>
                {' '}
                <Link href="/user/wishlist">My Wishlist</Link>
              </span>
            </ListGroup.Item>
            <ListGroup.Item>
              <StarIcon />{' '}
              <span className={styles.title}>
                {' '}
                <Link href="/user/review-and-rating">My Ratings & Reviews</Link>
              </span>
            </ListGroup.Item> */}
            {sideData.map((data) =>
              <ListGroup.Item key={data.name}>
             <span style={{filter: data.path === router.pathname ? "invert(0.5) sepia(1) saturate(52) hue-rotate(202deg)" : ''}}>{data.img}</span>
              <span style={{color: data.path === router.pathname ?  "#0a58ca": ''}} className={styles.title}>
                <Link href={data.path}>{data.name}</Link>
              </span>
            </ListGroup.Item>
            )}

            <ListGroup.Item onClick={handleLogout}>
              <LogoutIcon />
              <Link href='/login'  className={styles.titleB}> Logout</Link>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </div>
    </>
  );
};
