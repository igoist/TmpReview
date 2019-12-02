/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import { connect } from 'dva';
import { SCard2, RateGroup } from '@Components';
import { HB } from '@Utils';
import { Button, Icon, Input, Radio, Rate, Pagination } from 'antd';

const { useState, useEffect } = React;

const HBEditBox = HB + '-edit-box';

type AppPropsType = {
  login: any;
  page: any;
  dispatch: any;
};

const tabArr = [
  {
    title: '全部',
    category: 'all',
  },
  {
    title: '5星',
    category: '5',
  },
  {
    title: '3星',
    category: '3',
  },
  {
    title: '1星',
    category: '1',
  },
  {
    title: '未评',
    category: 'unrate',
  },
  {
    title: '淘汰',
    category: '0',
  },
];

const initObj: any = {};

const App = (props: AppPropsType) => {
  const { login, page, dispatch } = props;
  const { ifLogin } = login;

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

  const {
    totalCount,
    rate5List,
    rate5Count,
    rate4List,
    rate4Count,
    rate3List,
    rate3Count,
    rate2List,
    rate2Count,
    rate1List,
    rate1Count,
    unCount,
    outCount,
    list,
    rate5Max,
    rate4Max,
    rate3Max,
    rate2Max,
    rate1Max,
    perPageLimit,
  } = page;
  const [category, setCategory] = useState('all');
  const [currentTotal, setCurrentTotal] = useState(totalCount);
  const [currentPage, setCurrentPage] = useState(1);

  const [passwd, setPasswd] = useState('');
  const [editing, setEditing] = useState(false);

  const [tmpObj, setTmpObj] = useState(initObj);
  const initRadioValue: number | undefined = undefined;
  const [radioValue, setRadioValue] = useState(initRadioValue);
  const [textAreaValue, setTextAreaValue] = useState('');

  const onRadioChange = (e: any) => {
    setRadioValue(e.target.value);
  };

  const onTextAreaChange = (e: any) => {
    setTextAreaValue(e.target.value);
  };

  const handleTab = (n: string) => {
    setCategory(n);
    dispatch({
      type: 'page/fetch',
      payload: {
        category: n,
        page: 1,
        limit: perPageLimit,
      },
    });
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    dispatch({
      type: 'page/fetch',
      payload: {
        category,
        page: newPage,
        limit: perPageLimit,
      },
    });
  };

  const handledCallback = () => {
    dispatch({
      type: 'page/fetch',
      payload: {
        category: category,
        page: currentPage,
        limit: perPageLimit,
      },
    });
  };

  const handlePostOut = (id: number) => {
    dispatch({
      type: 'page/postEdit',
      payload: {
        id,
        rating: 0,
      },
      callback: handledCallback,
    });
  };

  const handlePostOutBatch = () => {
    dispatch({
      type: 'page/postOutBatch',
      callback: handledCallback,
    });
  };

  const openEditBox = (obj: any) => {
    setTmpObj(obj);
    setEditing(true);
    setTextAreaValue(obj.comment);
    setRadioValue(obj.rating);
  };

  const handleUpdate = () => {
    if (radioValue === undefined) {
      dispatch({
        type: 'page/postUn',
        payload: {
          id: tmpObj.id,
        },
        callback: handledCallback,
      });
    } else if (radioValue === 0) {
      handlePostOut(tmpObj.id);
    } else {
      dispatch({
        type: 'page/postEdit',
        payload: {
          id: tmpObj.id,
          rating: radioValue,
          comment: textAreaValue,
        },
        callback: handledCallback,
      });
    }
    setEditing(false);
  };

  const closeEditBox = () => {
    setEditing(false);
  };

  const stopPropagation = (e: any) => {
    e.stopPropagation();
  };

  const renderEditBox = () => {
    let tmp: any;
    if (tmpObj) {
      if (tmpObj.rating === undefined) {
        tmp = <div className={`${HBEditBox}-top-un`}>未评</div>;
      } else if (tmpObj.rating === 0) {
        tmp = <div className={`${HBEditBox}-top-out`}>淘汰</div>;
      } else {
        tmp = (
          <div className={`${HBEditBox}-top-rate`}>
            <Rate value={tmpObj.rating} disabled={true} />
          </div>
        );
      }
    }

    if (editing) {
      const { user } = tmpObj;
      const { avatar, username } = user;

      return (
        <div className={`${HBEditBox}-wrap`} onClick={closeEditBox}>
          <Icon className={`${HBEditBox}-close`} type='close' />
          <div className={`${HBEditBox}`} onClick={stopPropagation}>
            <div className={`${HBEditBox}-top`}>
              <div className={`${HBEditBox}-top-title`}>{tmpObj && tmpObj.title}</div>
              <div className={`${HBEditBox}-top-des`}>{tmpObj && tmpObj.desc}</div>
              <div className={`${HBEditBox}-top-avatar`}>
                <img src={avatar && `//${avatar.bucket}.huabanimg.com/${avatar.key}_sq140sf`} alt='avatar' />
              </div>
              <div className={`${HBEditBox}-top-username`}>{username}</div>
              <div className={`${HBEditBox}-top-e`}>作品评级</div>
              {tmp}
            </div>
            <div className={`${HBEditBox}-left clearfix`}>
              {tmpObj &&
                tmpObj.pins &&
                tmpObj.pins.map((pin: any, index: number) => {
                  return (
                    <div key={index.toString()} className={`${HBEditBox}-left-item clearfix`}>
                      <div className={`${HBEditBox}-work`}>
                        <img src={pin && pin.file && pin.file.url} alt={'work'} />
                      </div>
                      <p className={`${HBEditBox}-left-item-des`}>
                        {pin && pin.raw_text}
                        {index === 1 && '描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述'}
                      </p>
                    </div>
                  );
                })}
            </div>
            <div className={`${HBEditBox}-sidebar`}>
              <div className={`${HBEditBox}-sidebar-title`}>作品评级</div>
              <Radio.Group onChange={onRadioChange} value={radioValue}>
                <Radio className={`${HBEditBox}-radio ${HBEditBox}-radio0`} value={undefined}>
                  未评
                </Radio>
                <Radio className={`${HBEditBox}-radio ${HBEditBox}-radio1`} value={0}>
                  淘汰
                </Radio>
                <Radio className={`${HBEditBox}-radio ${HBEditBox}-radio2`} value={5} disabled={rate5Count === rate5Max}>
                  5星(已选{rate5Count}/总{rate5Max})
                </Radio>
                <Radio className={`${HBEditBox}-radio ${HBEditBox}-radio3`} value={4} disabled={rate4Count === rate4Max}>
                  4星(已选{rate4Count}/总{rate4Max})
                </Radio>
                <Radio className={`${HBEditBox}-radio ${HBEditBox}-radio4`} value={3} disabled={rate3Count === rate3Max}>
                  3星(已选{rate3Count}/总{rate3Max})
                </Radio>
                <Radio className={`${HBEditBox}-radio ${HBEditBox}-radio5`} value={2} disabled={rate2Count === rate2Max}>
                  2星(已选{rate2Count}/总{rate2Max})
                </Radio>
                <Radio className={`${HBEditBox}-radio ${HBEditBox}-radio6`} value={1} disabled={rate1Count === rate1Max}>
                  1星(已选{rate1Count}/总{rate1Max})
                </Radio>
              </Radio.Group>
              <div className={`${HBEditBox}-sidebar-title`}>作品评语</div>
              <Input.TextArea placeholder={'请添加评语'} rows={8} autoSize={false} maxLength={255} onChange={onTextAreaChange} value={textAreaValue} />
              <Button className={`${HBEditBox}-sidebar-btn `} onClick={handleUpdate}>
                保存
              </Button>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  };

  useEffect(() => {
    if (category === 'all') {
      setCurrentTotal(totalCount);
    }
    if (category === '5') {
      setCurrentTotal(rate5Count);
    }
    if (category === '3') {
      setCurrentTotal(rate3Count);
    }
    if (category === '1') {
      setCurrentTotal(rate1Count);
    }
    if (category === 'unrate') {
      setCurrentTotal(unCount);
    }
    if (category === '0') {
      setCurrentTotal(outCount);
    }
  }, [category, outCount, rate1Count, rate3Count, rate5Count, totalCount, unCount]);

  useEffect(() => {
    console.log('e1');
    if (currentPage > Math.ceil(currentTotal / perPageLimit)) {
      console.log('e2');
      setCurrentPage(1);
      dispatch({
        type: 'page/fetch',
        payload: {
          category: category,
          page: 1,
          limit: perPageLimit,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTotal]);

  useEffect(() => {
    if (editing) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [editing]);

  const renderRateGroups = () => {
    let RateGroupArr = [];

    if (rate5Max > 0) {
      RateGroupArr.push(<RateGroup key={'rate-group-5'} list={rate5List} max={rate5Max} typeTag={'5'} openEditBox={openEditBox} />);
    }
    if (rate4Max > 0) {
      RateGroupArr.push(<RateGroup list={rate4List} max={rate4Max} typeTag={'5'} openEditBox={openEditBox} />);
    }
    if (rate3Max > 0) {
      RateGroupArr.push(<RateGroup key={'rate-group-3'} list={rate3List} max={rate3Max} typeTag={'3'} openEditBox={openEditBox} />);
    }
    if (rate2Max > 0) {
      RateGroupArr.push(<RateGroup list={rate2List} max={rate2Max} typeTag={'5'} openEditBox={openEditBox} />);
    }
    if (rate1Max > 0) {
      RateGroupArr.push(<RateGroup key={'rate-group-1'} list={rate1List} max={rate1Max} typeTag={'1'} openEditBox={openEditBox} />);
    }

    return <>{RateGroupArr.map(i => i)}</>;
  };

  if (!ifLogin) {
    return (
      <div className={''}>
        <Input
          className={`${HB}-login-input`}
          prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
          type='password'
          onChange={onPasswordChange}
          placeholder={'请输入访问密码'}
        />
        <Button className={`${HB}-login-btn`} onClick={handleClick} disabled={passwd === '' ? true : false}>
          登录
        </Button>
      </div>
    );
  } else {
    return (
      <>
        <div className={`${HB}-wrap clearfix`}>
          {renderRateGroups()}

          <div className={`${HB}-works-tab`}>
            <div className={`${HB}-works-tab-title`}>{totalCount}个入围作品</div>
            <ul>
              {tabArr &&
                tabArr.map((item, index) => {
                  return (
                    <li key={index.toString()} className={item.category === category ? 'active' : ''} onClick={() => handleTab(item.category)}>
                      {item.title}({item.category === 'all' && totalCount}
                      {item.category === '5' && rate5Count}
                      {item.category === '4' && rate4Count}
                      {item.category === '3' && rate3Count}
                      {item.category === '2' && rate2Count}
                      {item.category === '1' && rate1Count}
                      {item.category === 'unrate' && unCount}
                      {item.category === '0' && outCount})
                    </li>
                  );
                })}
            </ul>

            <div className={`${HB}-tab-batch-btn`} onClick={handlePostOutBatch} />
          </div>

          <div className={`${HB}-scards-wrap-outer clearfix`}>
            <div className={`${HB}-scards-wrap type2`}>
              <div className='row clearfix'>
                {list.slice(0, 5).map((v: any, i: number) => {
                  return <SCard2 key={i.toString()} handleEdit={openEditBox} handlePostOut={handlePostOut} {...v} />;
                })}
              </div>
              <div className='row clearfix'>
                {list.slice(5, 10).map((v: any, i: number) => {
                  return <SCard2 key={i.toString()} handleEdit={openEditBox} handlePostOut={handlePostOut} {...v} />;
                })}
              </div>
              <div className='row clearfix'>
                {list.slice(10, 15).map((v: any, i: number) => {
                  return <SCard2 key={i.toString()} handleEdit={openEditBox} handlePostOut={handlePostOut} {...v} />;
                })}
              </div>
              <div className='row clearfix'>
                {list.slice(15, 20).map((v: any, i: number) => {
                  return <SCard2 key={i.toString()} handleEdit={openEditBox} handlePostOut={handlePostOut} {...v} />;
                })}
              </div>
            </div>

            {currentTotal > perPageLimit && <Pagination pageSize={perPageLimit} current={currentPage} total={currentTotal} onChange={handlePageChange} />}
          </div>
        </div>
        {renderEditBox()}
      </>
    );
  }
};

export default connect(({ login, page }: any) => ({ login, page }))(App);
