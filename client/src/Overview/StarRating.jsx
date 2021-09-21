import React from 'react';

const Rating = ({rating}) => {
  let stars = 1;
  rating = rating || 0;
  let result = [];
  while (stars <= 5) {
    if (rating > 1) {
      result.push(<img key={`stars_${stars}`} className="star-icon" src=".././img/star-fill.png"/>);
    } else if (rating < 1 && rating >= .75) {
      result.push(<img key={`stars_${stars}`} className="star-icon" src=".././img/star-three-quarter.png"/>);
    } else if (rating < .75 && rating >= 0.5) {
      result.push(<img key={`stars_${stars}`} className="star-icon" src=".././img/star-half.png"/>);
    } else if (rating < 0.5 && rating >= .25) {
      result.push(<img key={`stars_${stars}`} className="star-icon" src=".././img/star-one-quarter.png"/>);
    } else {
      result.push(<img key={`stars_${stars}`} className="star-icon" src=".././img/star.png"/>);
    }
    rating--;
    stars++;
  }
  return result;
}

const StarRating = (props) => (
  <div id='overview-rating'>
    <Rating rating={props.rating.avg}/>
    <a href={'#rr-container'} id="to-reviews">Read all {props.rating.count} Reviews</a>
  </div>
)

export default StarRating;