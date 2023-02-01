import { API } from '../config';

export let Howitworks = {};
Howitworks.getdata = async () => {
  return API({
    url: '/pages/how-it-works',
    method: 'get',
  });
};
