import React from 'react';
import { SCard, SCardBlank } from '@Components';
import { HB } from '@Utils';

const { useState } = React;

type RateGroupProps = {
  list: Array<any>;
  max: number;
  typeTag: string;
  openEditBox: any;
};

const RateGroup = (props: RateGroupProps) => {
  const { list, max, typeTag, openEditBox } = props;
  const [offset, setOffset] = useState(0);

  const handleOffsetL = () => {
    if (offset > 0) {
      setOffset(offset - 1);
    }
  };

  const handleOffsetR = () => {
    if (5 + offset < list.length) {
      setOffset(offset + 1);
    }
  };

  const arr = list.slice(offset, 5 + offset);
  const count = max > 5 ? 5 : max;
  const blank = Object.keys(Array.from({ length: count - list.length }));

  return (
    <div className={`${HB}-rate-group`}>
      <div className={`${HB}-rate ${HB}-rate-${typeTag}`} />
      <div className={`${HB}-rate-title`}>
        {typeTag}星作品
        <span>
          (已选{list.length}件总共{max}件)
        </span>
      </div>
      <div className={`${HB}-scards-wrap clearfix`}>
        {/* <div className='row clearfix' style={{ width: `${rate5Arr.length > 0 ? rate5Arr.length * 236 + (rate5Arr.length - 1) * 16 : 0}px` }}> */}
        <div className='row clearfix' style={{ width: `${count * 236 + (count - 1) * 16}px` }}>
          {arr.map((v: any, i: number) => {
            return <SCard key={i.toString()} handleEdit={openEditBox} {...v} />;
          })}
          {blank.length > 0 &&
            blank.map((_: any, index: number) => {
              return <SCardBlank key={index.toString()} />;
            })}
        </div>
        {max > 5 && (
          <>
            <div className={`${HB}-rate-group-l${offset > 0 ? '' : ' disabled'}`} onClick={handleOffsetL} />
            <div className={`${HB}-rate-group-r${5 + offset < list.length ? '' : ' disabled'}`} onClick={handleOffsetR} />
          </>
        )}
      </div>
    </div>
  );
};

export default RateGroup;
