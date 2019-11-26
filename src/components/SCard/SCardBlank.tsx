import * as React from 'react';
import { HB } from '@Utils';

const TMP = `${HB}-scard-blank`;

const SCardBlank = (props: any) => {
  return (
    <div className={`${TMP}`}>
      <div className={`${TMP}-b2`}>
        <div className={`${TMP}-b3`} />
        <div className={`${TMP}-b4`} />
      </div>
    </div>
  );
};

export default SCardBlank;
