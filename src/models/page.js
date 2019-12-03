import { requestUrl, postUrl, postBatch } from '@Services/api';
import { message } from 'antd';

const handleData = config => {
  const { resRated, resFacet, resList } = config;

  if (!resList || !resList.works) {
    throw new Error('SS');
  }

  const { hits } = resRated.works;
  const { facet } = resFacet.works;
  const list = resList.works.hits;

  let rate5List = hits.filter(work => work.rating === 5);
  let rate4List = hits.filter(work => work.rating === 4);
  let rate3List = hits.filter(work => work.rating === 3);
  let rate2List = hits.filter(work => work.rating === 2);
  let rate1List = hits.filter(work => work.rating === 1);

  return {
    totalCount: facet.all,
    rate5Count: facet[5],
    rate4Count: facet[4],
    rate3Count: facet[3],
    rate2Count: facet[2],
    rate1Count: facet[1],
    outCount: facet[0],
    unCount: facet.unrate,
    rate5List,
    rate4List,
    rate3List,
    rate2List,
    rate1List,
    list,
  };
};

// const handleDataAll = config => {
//   const { res, rating, page, limit } = config;
//   const { hits, facet } = res.works;

//   let rate5List = hits.filter(work => work.rating === 5);
//   let rate4List = hits.filter(work => work.rating === 4);
//   let rate3List = hits.filter(work => work.rating === 3);
//   let rate2List = hits.filter(work => work.rating === 2);
//   let rate1List = hits.filter(work => work.rating === 1);
//   let worksOut = hits.filter(work => work.rating === 0);
//   let worksUn = hits.filter(work => work.rating === undefined);

//   let list;
//   // const ratingMap = {
//   //   all: {name: "quanbu", listName: 'hits', filterFunc: x => true}
//   // }
//   const nameMap = {
//     all: hits,
//     '5': rate5List,
//     '4': rate4List,
//     '3': rate3List,
//     '2': rate2List,
//     '1': rate1List,
//     '0': worksOut,
//     unrate: worksUn,
//   };

//   list = nameMap[rating] && nameMap[rating].slice((page - 1) * limit, page * limit);

//   return {
//     // totalCount: facet.all,
//     // rate5Count: facet[5],
//     // rate4Count: facet[4],
//     // rate3Count: facet[3],
//     // rate2Count: facet[2],
//     // rate1Count: facet[1],
//     // outCount: facet[0],
//     // unCount: facet.unrate,
//     totalCount: hits.length,
//     rate5Count: rate5List.length,
//     rate4Count: rate4List.length,
//     rate3Count: rate3List.length,
//     rate2Count: rate2List.length,
//     rate1Count: rate1List.length,
//     outCount: worksOut.length,
//     unCount: worksUn.length,
//     rate5List,
//     rate4List,
//     rate3List,
//     rate2List,
//     rate1List,
//     list,
//   };
// };

export default {
  namespace: 'page',
  state: {
    totalCount: 0,
    rate5List: [],
    rate5Count: 0,
    rate4List: [],
    rate4Count: 0,
    rate3List: [],
    rate3Count: 0,
    rate2List: [],
    rate2Count: 0,
    rate1List: [],
    rate1Count: 0,
    unCount: 0,
    outCount: 0,
    list: [],
    rate5Max: 0,
    rate4Max: 3,
    rate3Max: 4,
    rate2Max: 5,
    rate1Max: 7,
    perPageLimit: 20,
  },
  subscriptions: {
    setup({ dispatch, history }) {
      // return history.listen(({ pathname, query }) => {
      //   dispatch({
      //     type: 'fetch',
      //     payload: {
      //       category: 'all',
      //       page: 1,
      //       limit: 999,
      //     },
      //   });
      // });
    },
  },
  reducers: {
    save(state, action) {
      console.log('here action, ', action.payload);
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  effects: {
    *fetch({ type, payload }, { put, call, select }) {
      const ss = yield select(state => state);
      const t = ss.page;
      const { login } = ss;

      // const { category, page, limit } = payload;
      const category = payload ? payload.category : 0;
      const page = payload ? payload.page : 1;
      const limit = payload ? payload.limit : t.perPageLimit;
      // let res = yield requestUrl(`/invite/${login.password}/api/vote/works?rating=${'all'}&limit=${999}&page=${1}`);
      let resRated = yield requestUrl(`/invite/${login.password}/api/vote/works?rating=${'rated'}&limit=${999}&page=${1}`);
      let resFacet = yield requestUrl(`/invite/${login.password}/api/vote/works?rating=${'all'}&limit=${0}&page=${1}`);
      let resList = yield requestUrl(`/invite/${login.password}/api/vote/works?rating=${category}&limit=${limit}&page=${page}`);

      const res = handleData({
        resRated,
        resFacet,
        resList,
      });

      yield put({
        type: 'save',
        payload: {
          ...res,
        },
      });

      // if (res && res.works) {
      //   res = handleDataAll({
      //     res,
      //     rating: category,
      //     page,
      //     limit,
      //   });

      //   yield put({
      //     type: 'save',
      //     payload: {
      //       ...res,
      //     },
      //   });
      // }
    },
    *postUn({ type, payload, callback }, { put, call, select }) {
      const ss = yield select(state => state);
      const { login } = ss;
      const { id } = payload;
      // const res = yield postUrl(`/api/works/un`, { id });
      const res = yield postUrl(`/invite/${login.password}/api/unvote/work/${id}`, {});
      console.log('here unvote: ', res);
      message.success('更改成功');

      if (callback) {
        callback();
      }
      // if (res && res.status === 200) {
      // }
    },
    *postOutBatch({ type, payload, callback }, { put, call, select }) {
      const ss = yield select(state => state);
      const { login, page } = ss;

      const { list } = page;
      let tmpArr = [];
      for (let i = 0; i < list.length; i++) {
        let work = list[i];
        if (work.rating === undefined) {
          tmpArr.push(work.id);
        }
      }

      console.log('postOutBatch: ', tmpArr);

      // const res = yield postBatch(`/api/works/out/batch`, { ids: tmpArr });
      const res = yield postBatch(`/invite/${login.password}/api/vote/works/`, { ids: tmpArr, rating: '0' });
      console.log('here postOut: ', res);
      message.success('批量淘汰成功');

      if (callback) {
        callback();
      }
      // if (res && res.status === 200) {
      // }
    },
    *postEdit({ type, payload, callback }, { put, call, select }) {
      const ss = yield select(state => state);
      const { login } = ss;
      const { id, rating, comment } = payload;
      // const res = yield postUrl(`/api/works/edit`, { id, rating, comment });
      const res = yield postUrl(`/invite/${login.password}/api/vote/work/${id}`, { rating, comment });
      console.log('here postEdit: ', res);
      if (rating === 0) {
        message.success('淘汰成功');
      } else {
        message.success('更改成功');
      }

      if (callback) {
        callback();
      }
      // if (res && res.status === 200) {
      // }
    },
  },
};
