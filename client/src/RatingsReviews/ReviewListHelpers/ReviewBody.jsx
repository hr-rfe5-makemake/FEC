import React from 'react';

// Return review body element for individual review tile
// If body contains keyword search term, slice body text into 3 spans: before keyword, keyword (highlighted yellow), after keyword
function ReviewBody({body, searchTerm}) {
  for (var i = 0; i < body.length; i++) {
    var index = body.toLowerCase().indexOf(searchTerm.toLowerCase());
    if (searchTerm.length >= 3 && index !== -1) {
      var newBody = <span><span>{body.slice(0, index)}</span><span style={{backgroundColor: 'yellow'}}>{body.slice(index, index + searchTerm.length)}</span><span>{body.slice(index + searchTerm.length)}</span></span>
    }
  }

  return <div className="tile-body">{newBody || body}</div>
}

export default ReviewBody;