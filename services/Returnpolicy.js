import { API } from '../config';

export let ReturnPolicy = {};
ReturnPolicy.getdata = async () => {
  return API({
    url: '/pages/return-policy',
    method: 'get',
  });
};
