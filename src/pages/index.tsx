/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import { connect } from 'dva';
import { SCard, SCard2, SCardBlank } from '@Components';
import { HB } from '@Utils';
import { Button, Input, Radio, Rate, Pagination } from 'antd';

const { useState, useEffect } = React;

const HBEditBox = HB + '-edit-box';

type AppPropsType = {
  login: any;
  page: any;
  dispatch: any;
};

const tabArr = ['全部', '5星', '3星', '1星', '未评', '淘汰'];

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

  const { totalCount, rate5list, rate5Count, rate3list, rate3Count, rate1list, rate1Count, unCount, outCount, list, rate5Max, rate3Max, rate1Max } = page;
  const [category, setCategory] = useState(0);
  const [currentTotal, setCurrentTotal] = useState(totalCount);
  const [currentPage, setCurrentPage] = useState(1);

  const [rate3Offset, setRate3Offset] = useState(0);
  const [rate1Offset, setRate1Offset] = useState(0);

  const [passwd, setPasswd] = useState('');
  const [editing, setEditing] = useState(false);

  const [tmpObj, setTmpObj] = useState(initObj);
  const [radioValue, setRadioValue] = useState(99);
  const [textAreaValue, setTextAreaValue] = useState('');

  const handleRate3OffsetL = () => {
    if (rate3Offset > 0) {
      setRate3Offset(rate3Offset - 1);
    }
  };
  const handleRate3OffsetR = () => {
    if (5 + rate3Offset < rate3list.length) {
      setRate3Offset(rate3Offset + 1);
    }
  };

  const handleRate1OffsetL = () => {
    if (rate1Offset > 0) {
      setRate1Offset(rate1Offset - 1);
    }
  };
  const handleRate1OffsetR = () => {
    if (5 + rate1Offset < rate1list.length) {
      setRate1Offset(rate1Offset + 1);
    }
  };

  const onRadioChange = (e: any) => {
    setRadioValue(e.target.value);
  };

  const onTextAreaChange = (e: any) => {
    setTextAreaValue(e.target.value);
  };

  const handleTab = (n: number) => {
    setCategory(n);
    dispatch({
      type: 'page/fetch',
      payload: {
        category: n,
        page: 1,
        limit: 10,
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
        limit: 10,
      },
    });
  };

  const handledCallback = () => {
    dispatch({
      type: 'page/fetch',
      payload: {
        category: category,
        page: currentPage,
        limit: 10,
      },
    });
  };

  const handlePostOut = (id: number) => {
    dispatch({
      type: 'page/postOut',
      payload: {
        id,
      },
      callback: handledCallback,
    });
  };

  const openEditBox = (obj: any) => {
    setTmpObj(obj);
    setEditing(true);
    setTextAreaValue(obj.evaluate);
    let tmpRadioValue = 99;
    if (obj.un) {
      tmpRadioValue = 0;
    } else if (obj.out) {
      tmpRadioValue = 1;
    } else {
      if (obj.rate === 5) {
        tmpRadioValue = 2;
      }
      if (obj.rate === 3) {
        tmpRadioValue = 3;
      }
      if (obj.rate === 1) {
        tmpRadioValue = 4;
      }
    }
    setRadioValue(tmpRadioValue);
  };

  const handleUpdate = () => {
    if (radioValue === 0) {
      dispatch({
        type: 'page/postUn',
        payload: {
          id: tmpObj.id,
        },
        callback: handledCallback,
      });
    } else if (radioValue === 1) {
      handlePostOut(tmpObj.id);
    } else {
      let tmpRate;
      if (radioValue === 2) {
        tmpRate = 5;
      }
      if (radioValue === 3) {
        tmpRate = 3;
      }
      if (radioValue === 4) {
        tmpRate = 1;
      }
      dispatch({
        type: 'page/postEdit',
        payload: {
          id: tmpObj.id,
          rate: tmpRate,
          evaluate: textAreaValue,
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
      if (tmpObj.un) {
        tmp = <div className={`${HBEditBox}-top-un`}>未评</div>;
      } else if (tmpObj.out) {
        tmp = <div className={`${HBEditBox}-top-out`}>淘汰</div>;
      } else {
        tmp = (
          <div className={`${HBEditBox}-top-rate`}>
            <Rate value={tmpObj.rate} disabled={true} />
          </div>
        );
      }
    }

    if (editing) {
      return (
        <div className={`${HBEditBox}-wrap`} onClick={closeEditBox}>
          <div className={`${HBEditBox}`} onClick={stopPropagation}>
            <div className={`${HBEditBox}-top`}>
              <div className={`${HBEditBox}-top-title`}>{tmpObj && tmpObj.title}</div>
              <div className={`${HBEditBox}-top-des`}>{tmpObj && tmpObj.works[0].des}</div>
              <div className={`${HBEditBox}-top-avatar`}>
                <img src={tmpObj && tmpObj.avatarUrl} alt='avatar' />
              </div>
              <div className={`${HBEditBox}-top-username`}>{tmpObj && tmpObj.username}</div>
              <div className={`${HBEditBox}-top-e`}>作品评级</div>
              {tmp}
            </div>
            <div className={`${HBEditBox}-left clearfix`}>
              {tmpObj &&
                tmpObj.works &&
                tmpObj.works.map((work: any, index: number) => {
                  return (
                    <div key={index.toString()} className={`${HBEditBox}-left-item clearfix`}>
                      <div className={`${HBEditBox}-work`}>
                        <img src={work.cover} alt={'work'} />
                      </div>
                      <p className={`${HBEditBox}-left-item-des`}>
                        {work.des}
                        {index === 1 && '描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述'}
                      </p>
                    </div>
                  );
                })}
            </div>
            <div className={`${HBEditBox}-sidebar`}>
              <div className={`${HBEditBox}-sidebar-title`}>作品评级</div>
              <Radio.Group onChange={onRadioChange} value={radioValue}>
                <Radio className={`${HBEditBox}-radio ${HBEditBox}-radio0`} value={0}>
                  未评
                </Radio>
                <Radio className={`${HBEditBox}-radio ${HBEditBox}-radio1`} value={1}>
                  淘汰
                </Radio>
                <Radio className={`${HBEditBox}-radio ${HBEditBox}-radio2`} value={2} disabled={rate5Count === rate5Max}>
                  5星(已选{rate5Count}/总{rate5Max})
                </Radio>
                <Radio className={`${HBEditBox}-radio ${HBEditBox}-radio3`} value={3} disabled={rate3Count === rate3Max}>
                  3星(已选{rate3Count}/总{rate3Max})
                </Radio>
                <Radio className={`${HBEditBox}-radio ${HBEditBox}-radio4`} value={4} disabled={rate1Count === rate1Max}>
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
    if (category === 0) {
      setCurrentTotal(totalCount);
    }
    if (category === 1) {
      setCurrentTotal(rate5Count);
    }
    if (category === 2) {
      setCurrentTotal(rate3Count);
    }
    if (category === 3) {
      setCurrentTotal(rate1Count);
    }
    if (category === 4) {
      setCurrentTotal(unCount);
    }
    if (category === 5) {
      setCurrentTotal(outCount);
    }
  }, [category, outCount, rate1Count, rate3Count, rate5Count, totalCount, unCount]);

  useEffect(() => {
    if (currentPage > Math.ceil(currentTotal / 10)) {
      setCurrentPage(1);
      dispatch({
        type: 'page/fetch',
        payload: {
          category: category,
          page: 1,
          limit: 10,
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

  const rate5Arr = rate5list.slice(0, 5);
  const count5Set = 5;
  let blankArr5 = Object.keys(Array.from({ length: count5Set - rate5Arr.length }));
  const rate3Arr = rate3list.slice(rate3Offset, 5 + rate3Offset);
  const count3Set = 5;
  let blankArr3 = Object.keys(Array.from({ length: count3Set - rate3Arr.length }));
  const rate1Arr = rate1list.slice(rate1Offset, 5 + rate1Offset);
  const count1Set = 5;
  let blankArr1 = Object.keys(Array.from({ length: count1Set - rate1Arr.length }));

  const renderRateGroups = () => (
    <>
      <div className={`${HB}-rate-group`}>
        {/* <Rate disabled={true} defaultValue={5} /> */}
        <div className={`${HB}-rate ${HB}-rate-5`} />
        <div className={`${HB}-rate-title`}>
          5星作品
          <span>
            (已选{rate5list.length}件总共{rate5Max}件)
          </span>
        </div>
        <div className={`${HB}-scards-wrap clearfix`}>
          {/* <div className='row clearfix' style={{ width: `${rate5Arr.length > 0 ? rate5Arr.length * 236 + (rate5Arr.length - 1) * 16 : 0}px` }}> */}
          <div className='row clearfix' style={{ width: `${count5Set * 236 + (count5Set - 1) * 16}px` }}>
            {rate5Arr.map((v: any, i: number) => {
              return <SCard key={i.toString()} {...v} />;
            })}
            {blankArr5.length > 0 &&
              blankArr5.map((_: any, index: number) => {
                return <SCardBlank key={index.toString()} />;
              })}
          </div>
        </div>
      </div>

      <div className={`${HB}-rate-group`}>
        <div className={`${HB}-rate ${HB}-rate-3`} />
        <div className={`${HB}-rate-title`}>
          3星作品
          <span>
            (已选{rate3list.length}件总共{rate3Max}件)
          </span>
        </div>
        <div className={`${HB}-scards-wrap clearfix`}>
          {/* <div className='row clearfix' style={{ width: `${rate3Arr.length > 0 ? rate3Arr.length * 236 + (rate3Arr.length - 1) * 16 : 0}px` }}> */}
          <div className='row clearfix' style={{ width: `${count3Set * 236 + (count3Set - 1) * 16}px` }}>
            {rate3Arr.map((v: any, i: number) => {
              return <SCard key={i.toString()} {...v} />;
            })}
            {blankArr3.length > 0 &&
              blankArr3.map((_: any, index: number) => {
                return <SCardBlank key={index.toString()} />;
              })}
          </div>
          <div className={`${HB}-rate-group-l${rate3Offset > 0 ? '' : ' disabled'}`} onClick={handleRate3OffsetL} />
          <div className={`${HB}-rate-group-r${5 + rate3Offset < rate3list.length ? '' : ' disabled'}`} onClick={handleRate3OffsetR} />
        </div>
      </div>

      <div className={`${HB}-rate-group`}>
        <div className={`${HB}-rate ${HB}-rate-1`} />
        <div className={`${HB}-rate-title`}>
          1星作品
          <span>
            (已选{rate1list.length}件总共{rate1Max}件)
          </span>
        </div>
        <div className={`${HB}-scards-wrap clearfix`}>
          {/* <div className='row clearfix' style={{ width: `${rate3Arr.length > 0 ? rate3Arr.length * 236 + (rate3Arr.length - 1) * 16 : 0}px` }}> */}
          <div className='row clearfix' style={{ width: `${count1Set * 236 + (count1Set - 1) * 16}px` }}>
            {rate1Arr.map((v: any, i: number) => {
              return <SCard key={i.toString()} {...v} />;
            })}
            {blankArr1.length > 0 &&
              blankArr1.map((_: any, index: number) => {
                return <SCardBlank key={index.toString()} />;
              })}
          </div>
          <div className={`${HB}-rate-group-l${rate1Offset > 0 ? '' : ' disabled'}`} onClick={handleRate1OffsetL} />
          <div className={`${HB}-rate-group-r${5 + rate1Offset < rate1list.length ? '' : ' disabled'}`} onClick={handleRate1OffsetR} />
        </div>
      </div>
    </>
  );

  if (!ifLogin) {
    return (
      <div className={'styles.normal'}>
        <div className={'styles.welcome'} />
        <Input onChange={onPasswordChange} placeholder={'请输入访问密码'} />
        <Button onClick={handleClick} disabled={passwd === '' ? true : false}>
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
            <div className={`${HB}-works-tab-title`}>212个入围作品</div>
            <ul>
              {tabArr &&
                tabArr.map((item, index) => {
                  return (
                    <li key={index.toString()} className={index === category ? 'active' : ''} onClick={() => handleTab(index)}>
                      {item}({index === 0 && totalCount}
                      {index === 1 && rate5Count}
                      {index === 2 && rate3Count}
                      {index === 3 && rate1Count}
                      {index === 4 && unCount}
                      {index === 5 && outCount})
                    </li>
                  );
                })}
            </ul>
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
            </div>

            {currentTotal > 10 && <Pagination current={currentPage} total={currentTotal} onChange={handlePageChange} />}
          </div>
        </div>
        {renderEditBox()}
      </>
    );
  }
};

export default connect(({ login, page }: any) => ({ login, page }))(App);
