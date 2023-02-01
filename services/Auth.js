import { API } from '../config';

export let AuthService = {};

AuthService.register = async data => {
  return API({
    url: '/customer/registration',
    method: 'post',
    data,
  });
};

AuthService.login = async data => {
  return API({
    url: '/customer/login',
    method: 'post',
    data,
  });
};

AuthService.forgotpassword = async data => {
  return API({
    url: '/customer/forgotpassword',
    method: 'post',
    data,
  });
};

AuthService.logout = async data => {
  return API({
    url: '/customer/logout',
    method: 'post',
    data,
  });
};

AuthService.update = async data => {
  return API({
    url: '/customer/edit',
    method: 'post',
    data,
  });
};

AuthService.addresses = async userId => {
  return API({
    url: '/customer/address/list/' + userId,
    method: 'get',
  });
};

AuthService.editAddress = async data => {
  return API({
    url: '/customer/address/edit',
    method: 'post',
    data,
  });
};

AuthService.deleteAddress = async data => {
  return API({
    url: '/customer/address/delete',
    method: 'post',
    data,
  });
};
AuthService.addAddress = async data => {
  return API({
    url: '/customer/address/add',
    method: 'post',
    data,
  });
};
