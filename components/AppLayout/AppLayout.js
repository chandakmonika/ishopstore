import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Footer } from '../Footer';
import { NavbarHeader } from '../Navbar';
import { PageLoader } from '../UI/PageLoader';
import { Addresses } from '../../redux/addressSlice';
import { AddressDetail } from '../../services/Address';
import { Products } from '../../services/Products';
import { cartItemList } from '../../redux/cartSlice';
export const AppLayout = ({ children }) => {
  // eslint-disable-next-line no-unused-vars
  const { isAuthenticated, isAuthenticating } = useSelector(
    state => ({
      isAuthenticated: state.auth.isAuthenticated,
      isAuthenticating: state.auth.isAuthenticating,
    }),
    shallowEqual,
  );
  const user_id = useSelector(state => state?.auth?.user?.user_id);
  const addressList = useSelector(state => state?.address?.add);
  useEffect(() => {
    fetchAddressList();
  }, [addressList]);
  const dispatch = useDispatch();
  const fetchAddressList = async () => {
    try {
      const data = await AddressDetail.getaddresslist(user_id);
      dispatch(Addresses(data.data.data));
    } catch (error) {
      console.error(error);
    }
  };
  const fetchCartList = async () => {
    try {
      const data = await Products.cartList(user_id);
      dispatch(cartItemList(data.data.data));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchCartList();
  }, []);
  // useEffect(() => {
  //   if (isAuthenticating) return;

  //   if (!isAuthenticated) {
  //     Router.push('/login');
  //   }
  // }, [isAuthenticated, isAuthenticating]);

  if (isAuthenticating) return <PageLoader />;

  return (
    <>
      <NavbarHeader />
      <div className="app-layout">{children}</div>
      <Footer />
    </>
  );
};
