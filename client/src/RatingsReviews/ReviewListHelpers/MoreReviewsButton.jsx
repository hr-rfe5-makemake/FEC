import React from 'react';

// If not all reviews are displayed, show a button to "Load more reviews"
function MoreReviewsButton({displayMore, allDisplayed}) {
  if (allDisplayed) {
    return null;
  } else {
    return <button className={"rr-button"} onClick={displayMore}>Load more reviews</button>

  }
}

export default MoreReviewsButton;