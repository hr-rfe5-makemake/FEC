import React from 'react';
import Stars from '../Stars.jsx';

function AverageRating({metaData}) {

  if (metaData.data && Object.keys(metaData.data.ratings).length > 0) {
    var allRatings = metaData.data.ratings;
    var ratingSum = 0;
    var ratingCount = 0;

    for (var key in allRatings) {
      ratingSum += key * parseInt(allRatings[key]);
      ratingCount += parseInt(allRatings[key]);
    }

    var avgRating = ratingSum / ratingCount;
    avgRating = (Math.round(avgRating * 100) / 100).toFixed(1);

    return (
      <div id="rating-summary">
        <span id="big-rating-summary">{avgRating}</span>
        <Stars rating={avgRating}/>
      </div>
    )
  } else {
    return (
      <div id="rating-summary">
        <span id="big-rating-summary">{'0.0'}</span>
        <Stars rating={0.0}/>
        <div className="break"></div>
        <i>This product has no reviews yet.</i>
      </div>
    )
  }
}

export default AverageRating;