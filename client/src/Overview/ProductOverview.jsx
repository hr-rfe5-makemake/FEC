import React from 'react';

const ProductOverview = (props) => (
  <div id="product-overview">
    <p>{props.slogan}</p>
    <p>{props.description}</p>
  </div>
)

export default ProductOverview;