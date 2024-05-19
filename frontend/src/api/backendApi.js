import axios from 'axios';
import static_URLs from '../config/staticUrls';

const backendApi = axios.create({
  baseURL: static_URLs.backend_api,
});

//TODO configurar interceptorres
backendApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    Authorization: `${localStorage.getItem('token')}`,
  };
  return config;
});

export default backendApi;
