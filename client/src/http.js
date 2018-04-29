/* global NProgress */
import axios from 'axios';

const instance = axios.create({
  baseURL: '/'
});

instance.interceptors.request.use(config => {
  NProgress.start();
  return config;
});

instance.interceptors.response.use(response => {
  NProgress.done();
  return response;
});

export default instance;
