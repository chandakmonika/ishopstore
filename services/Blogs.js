import { API } from '../config';

export let Blogdata = {};
Blogdata.getblogdata = async () => {
  return API({
    url: '/blog',
    method: 'get',
  });
};
Blogdata.getsingleblog = async blog_id => {
  return API({
    url: `/blog/details/${blog_id}`,
    method: 'get',
  });
};
