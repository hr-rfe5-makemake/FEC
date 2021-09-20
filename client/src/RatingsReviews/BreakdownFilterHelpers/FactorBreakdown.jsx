import React from 'react';

function FactorBreakdown({metaData}) {
  if (!Array.isArray(metaData)) {
    var characteristics = metaData.data.characteristics;
    var bars = [];

    var words = {
      Size: ['Too small', 'Too large'],
      Width: ['Too small', 'Too large'],
      Comfort: ['Poor', 'Great'],
      Quality: ['Poor', 'Great'],
      Length: ['Too short', 'Too long'],
      Fit: ['Poor', 'Great']
    };

    for (var characteristic in characteristics) {
      var rating = parseInt(characteristics[characteristic].value);
      if (rating === 5) {
        rating -= 0.1;
      }
      if (!isNaN(rating)) {
        bars.push(
          <div className="char-bar" key={characteristic}>
            <div><b>{characteristic}</b></div>
            <div className="bar-grey">
              <div className="bar-mid" style={{height: "10px", width: '32%'}}></div>
              <div className="bar-white" style={{height: "10px", width: '2%'}}></div>
              <div className="bar-mid" style={{height: "10px", width: '32%'}}></div>
              <div className="bar-white" style={{height: "10px", width: '2%'}}></div>
              <div className="bar-mid" style={{height: "10px", width: '32%'}}></div>
              <div className="bar-green-char" style={{height: "10px", width: `2%`, position: 'absolute', left:`${100 * (rating / 5)}%`}}></div>
            </div>
            <div className="range">
              <span>{words[characteristic][0]}</span>
              <span>{words[characteristic][1]}</span>
            </div>
          </div>
        );
      }
    }

    return <div id="factor-bars">{bars}</div>;
  } else {
    return null;
  }
}

export default FactorBreakdown;