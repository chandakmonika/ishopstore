import { API } from '../config';

export let PrivacyPolicy = {};
PrivacyPolicy.getdata = async () => {
  return API({
    url: '/pages/privacy-policy',
    method: 'get',
  });
};
