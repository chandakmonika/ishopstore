import { API } from '../config';
export let Wishlist = {};
Wishlist.getWishlistData = async userId => {
  return API({
    url: '/customer/wishlist/list/' + userId,
    method: 'get',
  });
};
