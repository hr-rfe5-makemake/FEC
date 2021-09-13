import React from 'react';

function SellerResponse({response}) {
  if (response) {
    return <div className="seller-response">Response from seller: {response}</div>
  } else {
    return <div className="seller-response">The seller has not responded yet.</div>;
  }
}

export default SellerResponse;