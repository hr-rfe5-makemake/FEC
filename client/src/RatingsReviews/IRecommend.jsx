import React from 'react';

function IRecommend({recommend}) {
  if (recommend) {
    return <div>I recommend this product</div>
  } else {
    return null;
  }
}

export default IRecommend;