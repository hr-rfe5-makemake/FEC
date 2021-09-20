import React from 'react';

function ReviewSummary({summary, searchTerm}) {

  for (var i = 0; i < summary.length; i++) {
    var index = summary.toLowerCase().indexOf(searchTerm.toLowerCase());
    if (searchTerm.length >= 3 && index !== -1) {
      var newSummary = <span><span>{summary.slice(0, index)}</span><span style={{backgroundColor: 'yellow'}}>{summary.slice(index, index + searchTerm.length)}</span><span>{summary.slice(index + searchTerm.length)}</span></span>
    }
  }

  if (summary.length > 60) {
    return (
      <div className="tile-summary">
        <b>{summary.slice(0, 60)}...</b>
        <div>...{summary.slice(60)}</div>
      </div>)
  } else {
    return <div className="tile-summary"><b>{newSummary || summary}</b></div>
  }
}

export default ReviewSummary;