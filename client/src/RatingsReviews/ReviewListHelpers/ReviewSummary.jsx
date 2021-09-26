import React from 'react';

// Return review summary element for individual review tile
// If summary contains keyword search term, slice summary text into 3 spans: before keyword, keyword (highlighted yellow), after keyword
// If summary is > 60 characters, include ... and break onto a second line
function ReviewSummary({summary, searchTerm}) {

  for (var i = 0; i < summary.length; i++) {
    var index = summary.toLowerCase().indexOf(searchTerm.toLowerCase());
    if (searchTerm.length >= 3 && index !== -1) {
      var newSummary = <span><span>{summary.slice(0, index)}</span><span style={{backgroundColor: 'yellow'}}>{summary.slice(index, index + searchTerm.length)}</span><span>{summary.slice(index + searchTerm.length)}</span></span>
    }
  }

  if (summary.length > 60) {
    return (
      <span className="tile-summary">
        <b>{summary.slice(0, 60)}...</b>
        <div>...{summary.slice(60)}</div>
      </span>)
  } else {
    return <span className="tile-summary"><b>{newSummary || summary}</b></span>
  }
}

export default ReviewSummary;