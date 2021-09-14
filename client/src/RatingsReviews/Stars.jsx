import React from 'react';

function Stars({rating}) {
  var stars = [];
  var fullStars = Math.floor(rating);

  for(var i = 0; i < fullStars; i++) {
    stars.push(<img src="images/star.png"/>);
  }

  if (fullStars === 5) {
    return stars;
  } else {
    var partialStar = rating - fullStars;
    if (partialStar < .25) {
      stars.push(<img src="images/star (1).png"/>);
    } else if (partialStar < .5) {
      stars.push(<img src="images/star-one-quarter.png"/>);
    } else if (partialStar < .75) {
      stars.push(<img src="images/star-half.png"/>);
    } else {
      stars.push(<img src="images/star-three-quarter.png"/>);
    }
  }

  if (fullStars === 4) {
    return stars;
  } else {
    var emptyStars = 4 - fullStars;
    for (var i = 0; i < emptyStars; i++) {
      stars.push(<img src="images/star (1).png"/>);
    }
    return <span className="star-container">{stars}</span>;
  }
}

export default Stars;