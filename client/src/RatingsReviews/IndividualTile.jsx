import React from 'react';
import IRecommend from './ReviewListHelpers/IRecommend.jsx';
import MyUsername from './ReviewListHelpers/MyUsername.jsx';
import SellerResponse from './ReviewListHelpers/SellerResponse.jsx';
import axios from 'axios';
import urlFragment from './urlFragment.jsx';

class IndividualTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVerified: false,
      helpful: false
    };
    this.handleHelpfulClick = this.handleHelpfulClick.bind(this);
  }

  checkVerification() {
    // call API to see if this user actually made a purchase, then pass this info to MyUsername
  }

  handleHelpfulClick() {
    if (!this.state.helpful) {
      this.state.helpful = true;
      axios.put(`${urlFragment}${this.props.review.review_id}/helpful`)
        .then((reply) => {
          console.log(reply)
          // rerender
          this.props.rerender();
        })
        .catch(err => console.error(err))
    }
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
        <div>Helpful?{' '}
          <u onClick={this.handleHelpfulClick} style={{cursor: 'pointer'}}>Yes</u> ({this.props.review.helpfulness})
        </div>
        <div>Etc.</div>
      </div>
    );
  }
}

export default IndividualTile;