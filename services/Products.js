import { API } from '../config';
export let Products = {};
Products.getAllData = async params => {
  return API({
    url: '/products/list/',
    method: 'get',
    params,
  });
};

Products.updateCart = async data => {
  return API({
    url: 'products/updatecart',
    method: 'post',
    data,
  });
};

Products.addToCart = async data => {
  return API({
    url: 'products/addtocart',
    method: 'post',
    data,
  });
};
//pending coupon id required
Products.orderConfirmation = async data => {
  return API({
    url: 'customer/orders/add',
    method: 'post',
    data,
  });
};
//if user send to api, api throw an error
Products.couponApply = async data => {
  return API({
    url: 'products/coupon/apply',
    method: 'post',
    data,
  });
};
Products.cartList = async user_id => {
  return API({
    url: `products/cart/list/${user_id}`,
    method: 'get',
  });
};
//TODO
Products.orderDetail = async order_id => {
  return API({
    url: `ustomer/orders/details/${order_id}`,
    method: 'get',
  });
};

Products.singleData = async productSlug => {
  return API({
    url: '/products/details/' + productSlug,
  });
};

Products.sliderData = async data => {
  return API({
    url: '/slider/home',
    method: 'get',
    data,
  });
};

Products.addToWishlist = async data => {
  return API({
    url: '/products/addtowishlist/',
    method: 'post',
    data,
  });
};

Products.removeToWishlist = async data => {
  return API({
    url: '/products/removefromwishlist',
    method: 'post',
    data,
  });
};
//TODO
Products.orderList = async user_id => {
  return API({
    url: `/customer/orders/list/${user_id}`,
    method: 'get',
  });
};
Products.orderDetail = async order_id => {
  return API({
    url: `/customer/orders/detail/${order_id}`,
    method: 'get',
  });
};
