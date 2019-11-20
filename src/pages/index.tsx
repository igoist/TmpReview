/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import { connect } from 'dva';
import { Button, Input } from 'antd';
import styles from './index.css';

const { useState } = React;

type AppPropsType = {
  login: any;
  dispatch: any;
};

const App = (props: AppPropsType) => {
  const { login, dispatch } = props;
  const { ifLogin } = login;

  const [passwd, setPasswd] = useState('');

  const onPasswordChange = (e: any) => {
    setPasswd(e.target.value);
  };

  const handleClick = () => {
    dispatch({
      type: 'login/tryLogin',
      payload: {
        password: passwd,
      },
    });
  };

  if (!ifLogin) {
    return (
      <div className={styles.normal}>
        <div className={styles.welcome} />
        <Input onChange={onPasswordChange} placeholder={'请输入访问密码'} />
        <Button onClick={handleClick}>登录</Button>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Login Success</h1>
      </div>
    );
  }
};

export default connect(({ login }: any) => ({ login }))(App);
