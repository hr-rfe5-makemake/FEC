import React from 'react';

function SortOptions({changeSort, count}) {
  return (
    <div id="sort-options">{count} reviews, sorted by{' '}
      <select onChange={changeSort}>
        <option value="relevant">relevance</option>
        <option value="newest">newest</option>
        <option value="helpful">helpful</option>
      </select>
    </div>
  );
}

export default SortOptions;