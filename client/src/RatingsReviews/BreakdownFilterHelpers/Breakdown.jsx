import React from 'react';

function Breakdown({metaData, handleRemoveFiltersClick, handleFilterClick}) {
  if (metaData.data && Object.keys(metaData.data.ratings).length > 0) {
    var allRatings = metaData.data.ratings;
    var bars = [];
    var totalRatings = 0;

    for (var key in allRatings) {
      totalRatings += parseInt(allRatings[key]);
    }
    for (var i = 5; i > 0; i--) {
      var average = allRatings[i] ? allRatings[i]/totalRatings : 0;
      average *= 100;

      bars.push(
        <div className="bar-container">
          <u onClick={handleFilterClick} style={{cursor: 'pointer'}}>{i} stars</u>
          <div className="bar-grey">
            <div className="bar-green" style={{height: "10px", width: `${average}%`}}></div>
          </div>
          {allRatings[i] || 0}
        </div>
      )
    }
    return (
      <div className='filterOption' onClick={handleFilterClick}>
        {bars}
        <div>"filters have been applied"</div>
        <div onClick={handleRemoveFiltersClick}>Link: remove filters</div>
      </div>
    );
  } else {
    var bars = [];
      for (var i = 5; i > 0; i--) {
        bars.push(
          <div className="bar-container">
            <u onClick={handleFilterClick} style={{cursor: 'pointer'}}>{i} stars</u>
            <div className="bar-grey">
              <div className="bar-green" style={{height: "10px", width: `0%`}}></div>
            </div> 0
          </div>
        )
      }
      return (
        <div className='filterOption' onClick={handleFilterClick}>
          {bars}
          <div>"filters have been applied"</div>
          <div onClick={handleRemoveFiltersClick}>Link: remove filters</div>
        </div>
      );
  }
}

export default Breakdown;