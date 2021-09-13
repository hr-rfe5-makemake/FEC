import React from 'react';
import IRecommend from './IRecommend.jsx'

class IndividualTile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {console.log(this.props.review.recommend)}
        <div>==> INDIVIDUAL TILE COMPONENT</div>
        <div>Star Rating Container. Rating: {this.props.review.rating}</div>
        <div>Date: {this.props.review.date}</div>
        <b>Review Summary: {this.props.review.summary}</b>
        <p>Review Body(HANDLE PHOTOS): {this.props.review.body}</p>
        <IRecommend recommend={this.props.review.recommend}/>
        <div>Reviewer's Username + Verified Purchaser</div>
        <div>Response from Seller</div>
        <div>Was this review helpful? (yes link + count, no link + count)</div>
        <div>Etc.</div>
      </div>
    );
  }
}

export default IndividualTile;