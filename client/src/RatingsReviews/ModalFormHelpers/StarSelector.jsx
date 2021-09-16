import React from 'react';

function StarSelector({starRating, handleChange}) {
  var stars = [];
  for (var i = parseInt(starRating); i > 0; i--) {
    stars.push(
      <img src="images/star.png" key={stars.length} onClick={handleChange} alt={stars.length + 1} name="starRating"/>
    )
  }
  for (var i = (5 - parseInt(starRating)); i > 0; i--) {
    stars.push(
      <img src="images/star (1).png" key={stars.length} alt={stars.length + 1} onClick={handleChange} name="starRating"/>
    )
  }

  return <div name="starRating">{stars}</div>;
}

export default StarSelector;