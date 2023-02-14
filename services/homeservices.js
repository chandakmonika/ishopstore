import { API } from '../config';
export let Categories = {};
Categories.getAllData = async params => {
  return API({
    url: '/home/categories',
    method: 'get',
    params,
  });
};

// Categories.categoriesWithBrands = async ()  => {
//   return API({
//     url: '/products/categorieswithbrands',
//     method: 'get',
//   });
// };

Categories.featureProduct = async user_id  => {
  return API({
    url: `/products/featured/${user_id}`,
    method: 'get',

  })
}
 
Categories.newArrivalProduct = async user_id =>{
  return API({
    url: `/products/newarrivals/${user_id}`,
    method: 'get',
  })
}
