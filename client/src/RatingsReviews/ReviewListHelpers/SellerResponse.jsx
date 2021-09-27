import React from 'react';

// If seller responded to a review, display their response on the individual review tile with special styling
function SellerResponse({response}) {
  if (response) {
    return (
    <div className="seller-response">
      <b style={{display: 'block'}}>Response from seller: </b>
      <i>{response}</i>
    </div>);
  } else {
    return null;
  }
}

export default SellerResponse;