import axios, { AxiosInstance } from 'axios';

export const request: AxiosInstance = axios.create({
  baseURL: 'https://otruyenapi.com/v1/api',
  headers: {},
});
