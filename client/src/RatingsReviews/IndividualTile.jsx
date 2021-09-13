import React from 'react';
import IRecommend from './ReviewListHelpers/IRecommend.jsx'
import MyUsername from './ReviewListHelpers/MyUsername.jsx'
import SellerResponse from './ReviewListHelpers/SellerResponse.jsx'

class IndividualTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVerified: false
    };
  }

  checkVerification() {
    // call API to see if this user actually made a purchase, then pass this info to MyUsername
  }

  componentDidMount() {
    this.checkVerification();
  }

  render() {
    return (
      <div>
        {console.log(this.props.review)}
        <div>==> INDIVIDUAL TILE COMPONENT</div>
        <div>Star Rating Container. Rating: {this.props.review.rating}</div>
        <div>Date: {this.props.review.date}</div>
        <b>Review Summary: {this.props.review.summary}</b>
        <p>Review Body(HANDLE PHOTOS): {this.props.review.body}</p>
        <IRecommend recommend={this.props.review.recommend}/>
        <MyUsername username={this.props.review.reviewer_name} verified={true}/>
        <SellerResponse response={this.props.review.response}/>
        <div>Was this review helpful? (yes link + count, no link + count)</div>
        <div>Etc.</div>
      </div>
    );
  }
}

export default IndividualTile;