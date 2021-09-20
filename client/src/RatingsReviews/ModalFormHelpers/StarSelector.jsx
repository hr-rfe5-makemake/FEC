import React from 'react';

function StarSelector({starRating, handleChange}) {
  var stars = [];
  var starText = {
    1: 'Poor',
    2: 'Fair',
    3: 'Average',
    4: 'Good',
    5: 'Great'
  };


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

  var renderText = null;

  if (starRating) {
    var renderText = <div id="star-selector-text">{starText[starRating]}</div>
  }

  return (
    <div id="starRating">
      <div id="starOverallRating">Overall rating<span style={{color: "red"}}>*</span></div>
      <span id="star-selector-container"><div>  </div>{stars}</span>
      {renderText}
    </div>);
}

export default StarSelector;