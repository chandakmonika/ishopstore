import { API } from '../config';
export let Subscription = {};

Subscription.emailSend = async data => {
  return API({
    url: 'newsletter/subscription/add',
    method: 'post',
    data,
  });
};
