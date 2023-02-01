import { API } from '../config';
export let Categories = {};
Categories.getAllData = async params => {
  return API({
    url: '/home/categories',
    method: 'get',
    params,
  });
};

Categories.categoriesWithBrands = async ()  => {
  return API({
    url: '/products/categorieswithbrands',
    method: 'get',
  });
};
