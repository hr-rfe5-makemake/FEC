import React from 'react';

const ProductOverview = (props) => (
  <div id="product-overview">
    <p hidden={!props.slogan}>{props.slogan}</p>
    <p hidden={!props.description}>{props.description}</p>
  </div>
)

export default ProductOverview;