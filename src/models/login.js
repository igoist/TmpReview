import { requestUrl } from '@Services/api';
import { message } from 'antd';

export default {
  state: {
    ifLogin: false,
    // password: '2083dc35-79ec-430c-a96b-6054ec15c991',
    password: '',
    eventTitle: '',
    currentName: '',
    endTime: '',
  },
  subscriptions: {},
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
      console.log('enter trylogin');
      let password = '';
      let messageFlag = true;
      if (payload === undefined) {
        password = localStorage.getItem('HBER');
        if (!password) {
          return false;
        }
        messageFlag = false;
      } else {
        password = payload.password;
      }

      let res = yield requestUrl(`/invite/${password}/api/me`);

      if (res && res.invite) {
        localStorage.setItem('HBER', password);

        if (messageFlag) {
          message.success('登录成功');
        }
        yield put({
          type: 'save',
          payload: {
            ifLogin: true,
            password: password,
            eventTitle: res.event.title,
            currentName: res.invite.name,
            endTime: res.invite.expire,
          },
        });
      } else {
        message.warning('密码错误');
      }
    },
    *logout({ type, payload }, { put, call, select }) {
      localStorage.removeItem('HBER');
      yield put({
        type: 'save',
        payload: {
          ifLogin: false,
          password: '',
          eventTitle: '',
          currentName: '',
          endTime: '',
        },
      });
    },
  },
};
