import React from 'react';

function MoreReviewsButton({displayMore, allDisplayed}) {
  if (allDisplayed) {
    return null;
  } else {
    return <button onClick={displayMore}>MORE REVIEWS +</button>

  }
}

export default MoreReviewsButton;