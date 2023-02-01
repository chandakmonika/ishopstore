import { API } from '../config';
export let Ratings = {};
Ratings.getAllData = async user_id => {
  return API({
    url: `/customer/reviews/list/${user_id}`,
    method: 'get',
  });
};

Ratings.postRating = async data => {
  return API({
    url: 'products/reviews/add',
    method: 'post',
    data,
  });
};
