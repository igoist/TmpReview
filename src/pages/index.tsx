/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import { connect } from 'dva';
import { SCard } from '@Components';
import { HB } from '@Utils';
import { Button, Input, Rate } from 'antd';
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
        <Button onClick={handleClick} disabled={passwd === '' ? true : false}>
          登录
        </Button>
      </div>
    );
  } else {
    return (
      <div className={`${HB}-wrap clearfix`}>
        <h1>Login Success</h1>
        <Rate disabled defaultValue={5} />
        <p>5星作品(已选3件总共5件)</p>
        <div className={`${HB}-scards-wrap grid`}>
          <div className='row'>
            {[1, 1, 1, 1, 1].map((v, i) => {
              return <SCard key={i.toString()} />;
            })}
          </div>
        </div>
      </div>
    );
  }
};

export default connect(({ login }: any) => ({ login }))(App);
