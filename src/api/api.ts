import axios from 'axios';

import {API_URL} from './';

export const api = axios.create({
  baseURL: API_URL,
  responseType: 'json',
});
