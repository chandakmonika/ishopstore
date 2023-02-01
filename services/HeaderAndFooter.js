import { API } from '../config';

export let HeaderAndFooter = {};

HeaderAndFooter.commonData = async data => {
  return API({
    url: 'site/common/data/',
    method: 'get',
    data,
  });
};
