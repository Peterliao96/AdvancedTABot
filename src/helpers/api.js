import { AsyncStorage } from 'react-native';
import config from '../config/server_config';

const host = config.server.host;
const port = config.server.port;
const apiURL = `http://${host}:${port}`;

async function callApi(url:string, options:object){
  const token = await AsyncStorage.getItem('jwtToken');
  const optionsWithHeaders = token ? {
    ...options,
    headers:{
      ...options.headers,
      Authorization: `Bearer ${token}`
    },
  }
  :options;
  return fetch(apiURL + url, optionsWithHeaders);
}

module.exports = callApi;
