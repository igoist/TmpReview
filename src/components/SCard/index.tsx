import * as React from 'react';
import { Card } from 'antd';
import { HB } from '@Utils';

const SCard = (props: any) => {
  // const { index } = props;
  const p = {
    title: '作品标题作品标题',
    cover: '//hbfile.huabanimg.com/1b8e4986034aec8113b862e99a26ff8854b8979f',
    avatarUrl: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    username: '用户名',
    evaluate: '这里是一评委评语，这里是一段评委语，这里是一段评语，这里一段评委评语。超级长的评价超级长超级长的评价超级长的长超级长的评价超级长的',
  };

  const { title, cover, avatarUrl, username, evaluate } = p;

  return (
    <Card className={`${HB}-scard`} hoverable={true} style={{ float: 'left', width: 200 }} cover={<img alt='example' height={200} src={cover} />}>
      <p className={`${HB}-scard-title`}>{title}</p>
      <div className={`${HB}-scard-extra-wrap`}>
        <div className={`${HB}-scard-avatar`} style={{ backgroundImage: `url(${avatarUrl})` }} />
        <div className={`${HB}-scard-username`}>{username}</div>
        <p className={`${HB}-scard-evaluate`}>{evaluate}</p>
      </div>
    </Card>
  );
};

export default SCard;
