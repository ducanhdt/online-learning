import axios from 'axios';
import camelCase from 'camelcase-keys';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_DOMAIN}/api/v1`,
  responseType: 'json',
  timeout: 30 * 1000,
  transformResponse: [(data) => camelCase(data, { deep: true })],
});

const upload = axios.create({
  baseURL: `${process.env.REACT_APP_UPLOAD_DOMAIN}/api/v1`,
  responseType: 'json',
  timeout: 30 * 1000,
  transformResponse: [(data) => camelCase(data, { deep: true })],
});

export { api, upload };
