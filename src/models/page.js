import { requestUrl, postUrl } from '@Services/api';
import { message } from 'antd';

export default {
  namespace: 'page',
  state: {
    totalCount: 0,
    rate5list: [],
    rate5Count: 0,
    rate3list: [],
    rate3Count: 0,
    rate1list: [],
    rate1Count: 0,
    unCount: 0,
    outCount: 0,
    list: [],
    rate5Max: 5,
    rate3Max: 10,
    rate1Max: 50,
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        dispatch({
          type: 'fetch',
        });
      });
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
      // const t = yield select(state => state.page);
      // console.log('t: ', t);
      // const { category, page, limit } = payload;
      const category = payload ? payload.category : 0;
      const page = payload ? payload.page : 1;
      const limit = payload ? payload.limit : 10;
      const res = yield requestUrl(`/api/works?category=${category}&limit=${limit}&page=${page}`);
      console.log('here fetch: ', res);
      if (res.works) {
        yield put({
          type: 'save',
          payload: {
            list: [...res.works],
            ...res,
          },
        });
      }

      // if (res.status === 200) {
      //   message.success('登录成功');
      //   yield put({
      //     type: 'save',
      //     payload: {
      //       ifLogin: true,
      //     },
      //   });
      // } else {
      //   message.warning('密码错误');
      // }
    },
    *postUn({ type, payload, callback }, { put, call, select }) {
      const { id } = payload;
      const res = yield postUrl(`/api/works/un`, { id });
      console.log('here /api/works/un: ', res);
      if (res && res.status === 200) {
        message.success('更改成功');

        if (callback) {
          callback();
        }
      }
    },
    *postOut({ type, payload, callback }, { put, call, select }) {
      const { id } = payload;
      const res = yield postUrl(`/api/works/out`, { id });
      console.log('here postOut: ', res);
      if (res && res.status === 200) {
        message.success('淘汰成功');

        if (callback) {
          callback();
        }
      }
    },
    *postEdit({ type, payload, callback }, { put, call, select }) {
      const { id, rate, evaluate } = payload;
      const res = yield postUrl(`/api/works/edit`, { id, rate, evaluate });
      console.log('here postEdit: ', res);
      if (res && res.status === 200) {
        message.success('更改成功');

        if (callback) {
          callback();
        }
      }
    },
  },
};
