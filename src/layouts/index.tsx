import React from 'react';
import { HB, handleTime } from '@Utils';
import { connect } from 'dva';
import { Button } from 'antd';

const HBBanner = `${HB}-banner`;

const BasicLayout: React.FC = (props: any) => {
  const { login, dispatch } = props;
  const { ifLogin, eventTitle, currentName, endTime } = login;

  const handleLogout = () => {
    dispatch({
      type: 'login/logout',
    });
  };

  return (
    <>
      <div className={`${HB}-header`}>
        {ifLogin && (
          <Button type='danger' className={`${HB}-header-logout`} onClick={handleLogout}>
            退出登录
          </Button>
        )}
      </div>
      <div className={`${HBBanner}`}>
        <div className={`${HBBanner}-title`}>{ifLogin ? eventTitle : '花瓣活动评审后台'}</div>
        {ifLogin && (
          <>
            <div className={`${HBBanner}-e`}>
              <div className={`${HBBanner}-e-0`}>{currentName}</div>
              <div className={`${HBBanner}-e-1`}>评委</div>
            </div>
            <div className={`${HBBanner}-time`}>评审截止：{handleTime(endTime)}</div>
          </>
        )}
      </div>
      {props.children}
    </>
  );
};

export default connect(({ login }: any) => ({ login }))(BasicLayout);
