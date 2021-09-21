import React from 'react';

const ProductOverview = (props) => (
  <div id="product-overview">
    <div id="description">
      <p hidden={!props.slogan}>{props.slogan}</p>
      <p hidden={!props.description}>{props.description}</p>
    </div>
    {props.features && (
      <ul id="product-features">
        {props.features.map((feature, index) => (
          <li className="feature-name" key={`feature_${index}`}>{feature.feature}: {feature.value}</li>
        ))}
      </ul>
    )}
  </div>
)

export default ProductOverview;