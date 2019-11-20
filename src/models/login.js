import { loginRequest } from '@Services/api';
import { message } from 'antd';

export default {
  state: {
    ifLogin: false,
  },
  subscriptions: {
    // setup({ dispatch, history }) {
    //   return history.listen(({ pathname, query }) => {
    //     dispatch({
    //       type: 'fetch',
    //     });
    //   });
    // },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  effects: {
    *tryLogin({ type, payload }, { put, call, select }) {
      const res = yield loginRequest(payload.password);
      console.log(res);

      if (res.status === 200) {
        message.success('登录成功');
        yield put({
          type: 'save',
          payload: {
            ifLogin: true,
          },
        });
      } else {
        message.warning('密码错误');
      }
    },
  },
};
