import React from 'react';

function Stars({rating}) {
  var stars = [];
  var fullStars = Math.floor(rating);

  for(var i = 0; i < fullStars; i++) {
    stars.push(<img src="images/star.png" key={stars.length}/>);
  }

  if (fullStars === 5) {
    return stars;
  } else {
    var partialStar = rating - fullStars;
    if (partialStar < .25) {
      stars.push(<img src="images/star (1).png" key={stars.length}/>);
    } else if (partialStar < .5) {
      stars.push(<img src="images/star-one-quarter.png" key={stars.length}/>);
    } else if (partialStar < .75) {
      stars.push(<img src="images/star-half.png" key={stars.length}/>);
    } else {
      stars.push(<img src="images/star-three-quarter.png" key={stars.length}/>);
    }
  }

  if (fullStars === 4) {
    return stars;
  } else {
    var emptyStars = 4 - fullStars;
    for (var i = 0; i < emptyStars; i++) {
      stars.push(<img src="images/star (1).png" key={stars.length}/>);
    }
    return <span className="star-container">{stars}</span>;
  }
}

export default Stars;