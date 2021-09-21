import React from 'react';

function Breakdown({metaData, handleRemoveFiltersClick, handleFilterClick, filterOptions}) {
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
        <div className="bar-container" onClick={handleFilterClick} identifier={i} key={i}>
          <u>{i} stars</u>
          <div className="bar-grey">
            <div className="bar-green" style={{height: "20px", width: `${average}%`}}></div>
          </div>
          <span className={"filter-count"}>{allRatings[i] || 0}</span>
        </div>
      )
    }
    return (
      <div>
        <div className='filterOption'>{bars}</div>
        {filterOptions.length > 0 ?
          <div id="filters">
            <span><b>Current filters: </b>{filterOptions.join(', ')}</span>
            <span onClick={handleRemoveFiltersClick} style={{float: 'right', cursor: 'pointer'}}><u>Clear all filters</u></span>
          </div>
          : null}
      </div>
    );
  } else {
    var bars = [];
    for (var i = 5; i > 0; i--) {
      bars.push(
        <div className="bar-container" onClick={handleFilterClick} identifier={i} key={i}>
          <u>{i} stars</u>
          <div className="bar-grey">
            <div className="bar-green" style={{height: "20px", width: `0%`}}></div>
          </div> 0
        </div>
      )
    }
    return (
      <div id="filters">
        <div className='filterOption'>{bars}</div>
        {filterOptions.length > 0 ?
          <div id="filters">
            <span><b>Current filters: </b>{filterOptions.join(', ')}</span>
            <span onClick={handleRemoveFiltersClick} style={{float: 'right', cursor: 'pointer'}}><u>Clear all filters</u></span>
          </div>
          : null}
      </div>
    );
  }
}

export default Breakdown;