import { API } from '../config';

export let AddressDetail = {};
AddressDetail.getcountry = async () => {
  return API({
    url: '/allcountries',
    method: 'get',
  });
};
AddressDetail.getstate = async country_id => {
  return API({
    url: `/allstates/${country_id}`,
    method: 'get',
  });
};
AddressDetail.getcity = async state_id => {
  return API({
    url: `/allcities/${state_id}`,
    method: 'get',
  });
};
AddressDetail.addaddress = async data => {
  return API({
    url: `/customer/address/add`,
    method: 'post',
    data,
  });
};
AddressDetail.getaddresslist = async user_id => {
  return API({
    url: `/customer/address/list/${user_id}`,
    method: 'get',
  });
};
AddressDetail.deleteaddress = async (address_id, user_id) => {
  const data = { address_id: `${address_id}`, user_id: user_id };
  return API({
    url: `/customer/address/delete/`,
    method: 'post',
    data,
  });
};
AddressDetail.editaddress = async data => {
  return API({
    url: `/customer/address/edit/`,
    method: 'post',
    data,
  });
};
