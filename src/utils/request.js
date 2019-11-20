import { fetch } from 'dva';
import { message } from 'antd';

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
};

const request = (url, options) => {
  if (options && options.method === 'POST') {
    options.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      ...options.headers,
    };
    options.body = JSON.stringify(options.body);
  }
  return fetch(url, options)
    .then(checkStatus)
    .then(response => {
      return response.text().then(text => {
        return text ? JSON.parse(text) : null;
      });
    })
    .catch(e => {
      message.error(e.toString());
      console.log(e);
    });
};

export default request;
