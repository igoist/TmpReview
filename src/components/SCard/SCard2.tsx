import * as React from 'react';
import { Button, Rate } from 'antd';
import { HB } from '@Utils';

const HBScard = `${HB}-scard`;

const SCard2 = (props: any) => {
  const { id, handleEdit, handlePostOut } = props;

  // const p = {
  //   title: '作品标题作品标题',
  //   cover: '//hbfile.huabanimg.com/1b8e4986034aec8113b862e99a26ff8854b8979f',
  //   avatarUrl: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  //   username: '用户名',
  //   des: '这里是一评委描述，这里是一段评委语，这里是一段描述，这里一段评委描述。超级长的评价超级长超级长的评价超级长的长超级长的评价超级长的',
  //   evaluate: '这里是一评委评语，这里是一段评委语，这里是一段评语，这里一段评委评语。超级长的评价超级长超级长的评价超级长的长超级长的评价超级长的',
  //   rate: 3,
  //   un: false,
  //   out: false,
  // };
  const p = props;

  const { title, desc, banner, pins, user, rating, comment } = p;

  const { avatar, username } = user;

  const renderSpecial = () => {
    if (rating === undefined) {
      return (
        <>
          <Button className={`${HBScard}-btn ${HBScard}-btn-out`} onClick={() => handlePostOut(id)}>
            淘汰
          </Button>
          <Button className={`${HBScard}-btn ${HBScard}-btn-rate`} onClick={() => handleEdit(p)}>
            评星
          </Button>
        </>
      );
    } else if (rating === 0) {
      return (
        <>
          <span className={`${HBScard}-span ${HBScard}-span-out`}>淘汰</span>
          <span className={`${HBScard}-span ${HBScard}-span-rate`} onClick={() => handleEdit(p)}>
            更改
          </span>
        </>
      );
    } else {
      return (
        <>
          <Rate disabled={true} value={rating} />
          {comment === '' ? (
            <span className={`${HBScard}-span ${HBScard}-span-evaluate-null`}>请添加评语</span>
          ) : (
            <span className={`${HBScard}-span ${HBScard}-span-evaluate`}>{comment}</span>
          )}
          <span className={`${HBScard}-span ${HBScard}-span-rate`} onClick={() => handleEdit(p)}>
            更改
          </span>
        </>
      );
    }
  };

  return (
    <div className={`${HBScard} clearfix`}>
      <div className={`${HBScard}-cover`} onClick={() => handleEdit(p)}>
        <img alt='example' src={banner.url} />
        <div className={`${HBScard}-n`}>{pins.length}</div>
      </div>
      <div className={`${HBScard}-body`}>
        <div className={`${HBScard}-title`}>{title}</div>
        <div className={`${HBScard}-extra-wrap`}>
          <div className={`${HBScard}-des`}>{desc}</div>
          <div className={`${HBScard}-avatar`} style={{ backgroundImage: `url(${avatar.url})` }} />
          <div className={`${HBScard}-username`}>{username}</div>
          <div className={`${HBScard}-special`}>{renderSpecial()}</div>
        </div>
      </div>
    </div>
  );
};

export default SCard2;
