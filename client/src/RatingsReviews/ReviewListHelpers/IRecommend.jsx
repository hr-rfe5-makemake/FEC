import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

// If review recommends a product, render a check icon and message
function IRecommend({recommend}) {
  if (recommend) {
    return (
      <div>
        <FontAwesomeIcon icon={faCheck}/> I recommend this product
      </div>
    )
  } else {
    return null;
  }
}

export default IRecommend;