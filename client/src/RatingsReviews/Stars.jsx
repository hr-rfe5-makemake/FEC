import React from 'react';

function Stars({rating}) {
  var stars = [];
  var fullStars = Math.floor(rating);

  // Push however many full star images you need into the output array
  for(var i = 0; i < fullStars; i++) {
    stars.push(<img src="img/star-fill.png" key={stars.length}/>);
  }

  // If all 5 stars are full, you are done so return
  if (fullStars === 5) {
    return stars;
  // Otherwise, push in a partial star image according to the remainder
  } else {
    var partialStar = rating - fullStars;
    if (partialStar < .25) {
      stars.push(<img src="./img/star-fill.png" key={stars.length}/>); // empty star image
    } else if (partialStar < .5) {
      stars.push(<img src="./img/star-one-quarter.png" key={stars.length}/>);
    } else if (partialStar < .75) {
      stars.push(<img src="./img/star-half.png" key={stars.length}/>);
    } else {
      stars.push(<img src="./img/star-three-quarter.png" key={stars.length}/>);
    }
  }

  // If there were 4 full stars and you just added a partial star, the output array now has 5 images so you can return
  if (fullStars === 4) {
    return stars;
  // Otherwise, fill any remaining slots with empty star images and return the array of stars
  } else {
    var emptyStars = 4 - fullStars;
    for (var i = 0; i < emptyStars; i++) {
      stars.push(<img src="./img/star.png" key={stars.length}/>);
    }
    return <span className="star-container">{stars}</span>;
  }
}

export default Stars;