import request from '@Utils/request';
import { message } from 'antd';

// const sendXMLHttpRequest = config => {
//   const xhr = new XMLHttpRequest();
//   xhr.open(config.method, config.url);
//   xhr.setRequestHeader('content-type', 'application/json');
//   xhr.onload = function() {
//     if (xhr.status >= 200 && xhr.status < 300) {
//       config.onSuccess(xhr.response);
//     } else {
//       config.onError(xhr.response);
//     }
//   };
//   xhr.send(JSON.stringify(config.body));
// };

export const requestUrl = url => {
  return request(url);
};

export const postUrl = (url, body) => {
  return request(url, {
    method: 'POST',
    body,
  });
};

export const loginRequest = passwd => {
  return request('/api/login', {
    method: 'POST',
    body: {
      password: passwd,
    },
  });
};
