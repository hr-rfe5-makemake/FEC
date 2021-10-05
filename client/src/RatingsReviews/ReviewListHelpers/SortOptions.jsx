import React from 'react';

// create the drop down list that sorts reviews by relevance, newest, or helpful
function SortOptions({changeSort, count}) {
  return (
    <div id="sort-options">{count} reviews, sorted by{' '}
      <select id="rr-select" onChange={changeSort}>
        <option value="relevant">relevance</option>
        <option value="newest">newest</option>
        <option value="helpful">helpful</option>
      </select>
    </div>
  );
}

export default SortOptions;