import React from 'react';

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