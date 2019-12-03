import * as React from 'react';
import { HB } from '@Utils';

const HBScard = `${HB}-scard`;

const SCard = (props: any) => {
  const { handleEdit } = props;
  // const p = {
  //   title: '作品标题作品标题',
  //   cover: '//hbfile.huabanimg.com/1b8e4986034aec8113b862e99a26ff8854b8979f',
  //   avatarUrl: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  //   username: '用户名',
  //   evaluate: '这里是一评委评语，这里是一段评委语，这里是一段评语，这里一段评委评语。超级长的评价超级长超级长的评价超级长的长超级长的评价超级长的',
  // };
  const p = props;

  const { title, banner, pins, user, comment } = p;

  const { avatar, username } = user;

  return (
    <div className={`${HBScard} clearfix`}>
      <div className={`${HBScard}-cover`} onClick={() => handleEdit(p)}>
        <img alt='example' src={banner.url + '_sq490'} />
        <div className={`${HBScard}-n`}>{pins.length}</div>
      </div>
      <div className={`${HBScard}-body`}>
        <div className={`${HBScard}-extra-wrap`}>
          <div className={`${HBScard}-title`}>{title}</div>
          {/* <div className={`${HBScard}-avatar`} style={{ backgroundImage: `url(//${avatar.bucket}.huabanimg.com/${avatar.key}_sq140sf)` }} /> */}
          <div className={`${HBScard}-avatar`} style={{ backgroundImage: `url(${avatar.url + '_sq75sf'})` }} />
          <div className={`${HBScard}-username`}>{username}</div>
        </div>
        {comment === undefined || comment === null || comment === '' ? (
          <div className={`${HBScard}-evaluate-null`}>请填写评语</div>
        ) : (
          <div className={`${HBScard}-evaluate`}>{comment && comment.slice(0, 52) + (comment.length > 52 ? '...' : '')}</div>
        )}
      </div>
    </div>
  );
};

export default SCard;
