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

// var cardMock = {
//   id: 0,
//   title: '作品标题作品标题',
//   works: [
//     {
//       cover: '//hbfile.huabanimg.com/1b8e4986034aec8113b862e99a26ff8854b8979f',
//       des: '描述描述描述描述描述描述描述描述描述描述描述描述',
//     },
//     {
//       cover: '//hbfile.huabanimg.com/1b8e4986034aec8113b862e99a26ff8854b8979f',
//       des: '描述描述描述描述描述描述描述描述描述描述描述描述',
//     },
//   ],
//   avatarUrl: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
//   username: '用户名',
//   evaluate: '评语评语评语评语评语评语评语评语评语评语评语评语',
//   rate: null,
//   un: true,
//   out: false,
// };

// let worksMock = [];
// for (let i = 0; i < 212; i++) {
//   // let tmpWorks = [];
//   // let randomNumber = Math.ceil(Math.random() * 3);
//   // for (let j = 0; j < randomNumber; j++) {
//   //   tmpWorks.push(...cardMock.works[0]);
//   // }
//   worksMock.push({ ...cardMock, id: i + 1 });
// }

// function getParameterByName(name, url) {
//   if (!url) url = window.location.href;
//   name = name.replace(/[\[\]]/g, '\\$&');
//   var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
//     results = regex.exec(url);
//   if (!results) return null;
//   if (!results[2]) return '';
//   return decodeURIComponent(results[2].replace(/\+/g, ' '));
// }

// export const requestUrl = url => {
//   return new Promise(resolve => {
//     // let t = new URLSearchParams(url);
//     // let category = parseInt(t.get('category'));
//     // let limit = parseInt(t.get('limit'));
//     // let page = parseInt(t.get('page'));
//     let category = parseInt(getParameterByName('category', url));
//     let limit = parseInt(getParameterByName('limit', url));
//     let page = parseInt(getParameterByName('page', url));

//     console.log('here::: ', category, limit, page);

//     let result = {
//       total: worksMock.length,
//       count: 0,
//       works: [],
//       rate5Max: 5,
//       rate3Max: 10,
//       rate1Max: 50,
//     };
//     let worksAll = worksMock;
//     let worksRate5 = worksMock.filter(work => work.rate === 5);
//     let worksRate3 = worksMock.filter(work => work.rate === 3);
//     let worksRate1 = worksMock.filter(work => work.rate === 1);
//     let worksUn = worksMock.filter(work => work.un === true);
//     let worksOut = worksMock.filter(work => work.out === true);
//     result.totalCount = worksAll.length;
//     result.rate5Count = worksRate5.length;
//     result.rate3Count = worksRate3.length;
//     result.rate1Count = worksRate1.length;
//     result.unCount = worksUn.length;
//     result.outCount = worksOut.length;
//     result.rate5list = worksRate5;
//     result.rate3list = worksRate3;
//     result.rate1list = worksRate1;
//     switch (category) {
//       case 0:
//         result.works = worksAll.slice((page - 1) * limit, page * limit);
//         break;
//       case 1:
//         result.works = worksRate5.slice((page - 1) * limit, page * limit);
//         break;
//       case 2:
//         result.works = worksRate3.slice((page - 1) * limit, page * limit);
//         break;
//       case 3:
//         result.works = worksRate1.slice((page - 1) * limit, page * limit);
//         break;
//       case 4:
//         result.works = worksUn.slice((page - 1) * limit, page * limit);
//         break;
//       case 5:
//         result.works = worksOut.slice((page - 1) * limit, page * limit);
//         break;
//       default:
//         break;
//     }

//     resolve(result);
//   });
// };

// export const postUrl = (url, body) => {
//   // return request(url, {
//   //   method: 'POST',
//   //   body,
//   // });
//   return new Promise(resolve => {
//     if (url.startsWith('/api/works/un')) {
//       const { id } = body;

//       let flag = 300;

//       for (let i = 0; i < worksMock.length; i++) {
//         if (worksMock[i].id === id) {
//           worksMock[i].out = false;
//           worksMock[i].un = true;
//           // ?数据是否清空?
//           worksMock[i].rate = null;
//           worksMock[i].evaluate = '';
//           flag = 200;
//           break;
//         }
//       }

//       console.log('Mock POST /api/works/un flag: ', flag);

//       resolve({
//         status: flag,
//       });
//     }
//     if (url.startsWith('/api/works/out')) {
//       console.log('Mock POST /api/works/out: ', body);

//       const { id } = body;

//       let flag = 300;

//       for (let i = 0; i < worksMock.length; i++) {
//         if (worksMock[i].id === id) {
//           worksMock[i].out = true;
//           worksMock[i].un = false;
//           flag = 200;
//           break;
//         }
//       }

//       console.log('Mock POST /api/works/out flag: ', flag);

//       resolve({
//         status: flag,
//       });
//     }
//     if (url.startsWith('/api/works/edit')) {
//       console.log('Mock POST /api/works/edit: ', body);

//       const { id, rate, evaluate } = body;

//       let flag = 300;

//       for (let i = 0; i < worksMock.length; i++) {
//         if (worksMock[i].id === id) {
//           worksMock[i].rate = rate;
//           worksMock[i].evaluate = evaluate;
//           worksMock[i].un = false;
//           worksMock[i].out = false;
//           flag = 200;
//           break;
//         }
//       }

//       console.log('Mock POST /api/works/edit flag: ', flag);

//       resolve({
//         status: flag,
//       });
//     }
//   });
// };

// export const loginRequest = passwd => {
//   return new Promise(resolve => {
//     console.log('Mock POST /api/login: ', passwd);
//     let result;
//     if (passwd === '123456') {
//       result = 200;
//     } else {
//       result = 400;
//     }

//     resolve({
//       status: result,
//     });
//   });
// };

export const postBatch = (url, body) => {
  return request(url, {
    method: 'POST',
    body,
  });
  // return new Promise(resolve => {
  //   console.log('Mock POST /api/works/out/batch: ', body);
  //   const { ids } = body;
  //   let flag = 300;
  //   // 有什么好的算法优化一下吗
  //   for (let j = 0; j < ids.length; j++) {
  //     for (let i = 0; i < worksMock.length; i++) {
  //       if (worksMock[i].id === ids[j]) {
  //         worksMock[i].out = true;
  //         worksMock[i].un = false;
  //         break; // break 即可，找到跳出当前 i for，而不是连 j for 都跳出
  //       }
  //     }
  //     if (j === ids.length - 1) {
  //       flag = 200;
  //     }
  //   }
  //   resolve({
  //     status: flag,
  //   });
  // });
};
