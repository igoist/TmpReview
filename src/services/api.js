import request from '@Utils/request';
import { message } from 'antd';

const sendXMLHttpRequest = config => {
  const xhr = new XMLHttpRequest();
  xhr.open(config.method, config.url);
  xhr.setRequestHeader('content-type', 'application/json');
  xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 300) {
      config.onSuccess(xhr.response);
    } else {
      config.onError(xhr.response);
    }
  };
  xhr.send(JSON.stringify(config.body));
};

export const loginRequest = passwd => {
  return request('/api/login', {
    method: 'POST',
    body: {
      password: passwd,
    },
  });

  // return new Promise((resolve, reject) => {
  //   sendXMLHttpRequest({
  //     method: 'POST',
  //     url: '/api/login/',
  //     body: {
  //       password: passwd,
  //     },
  //     onSuccess: response => {
  //       console.log('loginRequest success: ', response);
  //       message.success('loginRequest');
  //     },
  //     onError: response => {
  //       try {
  //         console.log(response);
  //         // const res = JSON.parse(response);
  //         // console.log('loginRequest failed: ', res);
  //         // message.error(`loginRequest：${res.message || res.err}`);
  //       } catch (e) {
  //         console.log(e);
  //       }
  //     },
  //   });
  // });
};
