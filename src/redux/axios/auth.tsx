/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const baseUrl = 'https://pokeapi.co/api/v2/';

interface ApiProps {
  endpoint?: string;
  method?: string ;
  _data?: any;
  tokenUse?: boolean;
  params?: any;
  urlParams?: number | string;
  baseUrlNew?: string;
}

export const AxiosGet = (props: ApiProps) => {
  const {endpoint, method, _data, tokenUse, params, urlParams, baseUrlNew} = {
    method: 'GET',
    _data: {},
    tokenUse: false,
    params: {},
    urlParams: '',
    baseUrlNew: '',
    ...props,
  };
  const instance = axios.create({
    baseURL: baseUrlNew !== '' ? baseUrlNew :baseUrl,
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'cache-control': 'no-cache',
    },
  });

  // Add a request interceptor
  instance.interceptors.request.use(
    async config => {
      const token = await AsyncStorage.getItem('@accessToken');
      if (tokenUse && token) {
        config.headers = {
          ...config.headers,
          authorization: token,
        };
      }
        return config;
    },
    function (error) {
      // Do something with request error
         return Promise.reject(error);
    },
  );
  return instance.request({
    data: Object.keys(_data).length !== 0 ? _data : undefined,
    params: Object.keys(params).length !== 0 ? params : undefined,
    url: endpoint,
  });
};
