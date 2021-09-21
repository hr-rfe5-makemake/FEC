import React from 'react';

function MoreReviewsButton({displayMore, allDisplayed}) {
  if (allDisplayed) {
    return null;
  } else {
    return <button className={"rr-button"} onClick={displayMore}>Load more reviews</button>

  }
}

export default MoreReviewsButton;