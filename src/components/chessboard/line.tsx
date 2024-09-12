import React from 'react';
import { useSize } from 'ahooks';
import { useMemo } from 'react';

export default function Line() {
  const windowSize = useSize(window.document.documentElement);
  const size = useMemo(
    () => ((windowSize?.height || 0) / 100) * 16,
    [windowSize?.height],
  );
  return (
    <div>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon points={`${size},0 0,${size}`} fill="none" stroke="#000000" />
      </svg>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon points={`0,0 ${size},${size}`} fill="none" stroke="#000000" />
      </svg>
    </div>
  );
}
