import * as React from 'react';
import { HB } from '@Utils';

const HBScard = `${HB}-scard`;

const SCard = (props: any) => {
  // const { index } = props;
  // const p = {
  //   title: '作品标题作品标题',
  //   cover: '//hbfile.huabanimg.com/1b8e4986034aec8113b862e99a26ff8854b8979f',
  //   avatarUrl: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  //   username: '用户名',
  //   evaluate: '这里是一评委评语，这里是一段评委语，这里是一段评语，这里一段评委评语。超级长的评价超级长超级长的评价超级长的长超级长的评价超级长的',
  // };
  const p = props;

  const { title, works, avatarUrl, username, evaluate } = p;

  return (
    <div className={`${HBScard} clearfix`}>
      <div className={`${HBScard}-cover`}>
        <img alt='example' src={works[0].cover} />
        <div className={`${HBScard}-n`}>{works.length}</div>
      </div>
      <div className={`${HBScard}-body`}>
        <div className={`${HBScard}-extra-wrap`}>
          <div className={`${HBScard}-title`}>{title}</div>
          <div className={`${HBScard}-avatar`} style={{ backgroundImage: `url(${avatarUrl})` }} />
          <div className={`${HBScard}-username`}>{username}</div>
        </div>
        <div className={`${HBScard}-evaluate`}>{evaluate.slice(0, 44) + (evaluate.length > 44 ? '...' : '')}</div>
      </div>
    </div>
  );
};

export default SCard;
