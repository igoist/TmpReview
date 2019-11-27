import React from 'react';
import { HB } from '@Utils';

const HBBanner = `${HB}-banner`;

const BasicLayout: React.FC = props => {
  return (
    <>
      <div className={`${HB}-header`} />
      <div className={`${HBBanner}`}>
        <div className={`${HBBanner}-title`}>木屋烧烤卡通吉祥物形象征集大赛——萌物征集</div>
        <div className={`${HBBanner}-e`}>
          <div className={`${HBBanner}-e-0`}>某某某</div>
          <div className={`${HBBanner}-e-1`}>评委</div>
        </div>
        <div className={`${HBBanner}-time`}>评审截止：2019-12-12</div>
      </div>
      {props.children}
    </>
  );
};

export default BasicLayout;
