import React from 'react';

class IndividualTile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>==> INDIVIDUAL TILE COMPONENT</div>
        <div>Star Rating Container</div>
        <div>Date</div>
        <div>Review Summary</div>
        <div>Review Body</div>
        <div>I recommend this product (checkmark)</div>
        <div>Reviewer's Username + Verified Purchaser</div>
        <div>Response from Seller</div>
        <div>Was this review helpful? (yes link + count, no link + count)</div>
        <div>Etc.</div>
      </div>
    );
  }
}

export default IndividualTile;