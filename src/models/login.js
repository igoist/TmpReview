// import { loginRequest } from '@Services/api';
import { requestUrl } from '@Services/api';
import { message } from 'antd';

export default {
  state: {
    ifLogin: false,
    // password: '2083dc35-79ec-430c-a96b-6054ec15c991',
    password: '',
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
      // const res = yield loginRequest(payload.password);
      // console.log(res);

      let res = yield requestUrl(`/invite/${payload.password}/api/vote/works?rating=${'all'}&limit=${20}&page=${1}`);

      if (res && res.works) {
        message.success('登录成功');
        yield put({
          type: 'save',
          payload: {
            ifLogin: true,
            password: payload.password,
          },
        });
      } else {
        message.warning('密码错误');
      }
    },
  },
};
