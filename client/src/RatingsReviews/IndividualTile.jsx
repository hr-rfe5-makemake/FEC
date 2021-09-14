import React from 'react';
import IRecommend from './ReviewListHelpers/IRecommend.jsx';
import MyUsername from './ReviewListHelpers/MyUsername.jsx';
import SellerResponse from './ReviewListHelpers/SellerResponse.jsx';
import ReviewSummary from './ReviewListHelpers/ReviewSummary.jsx';
import axios from 'axios';
import urlFragment from './urlFragment.jsx';
// import star from './images/star-half.png'

class IndividualTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVerified: false,
      helpful: false,
      verified: Math.round(Math.random()) // either 1 or 0, since no API data
    };
    this.handleHelpfulClick = this.handleHelpfulClick.bind(this);
  }

  checkVerification() {
    // call API to see if this user actually made a purchase, then pass this info to MyUsername
  }

  reformatDate(date) {
    var split = date.split('-');
    var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    var day = split[2].slice(0, 2);
    if (day[0] === '0') {
      day = day[1];
    }
    var month = months[split[1] - 1];
    var year = split[0];
    return `${month} ${day}, ${year}`;
  }

  handleHelpfulClick() {
    if (!this.state.helpful) {
      this.state.helpful = true;
      axios.put(`${urlFragment}${this.props.review.review_id}/helpful`)
        .then((reply) => {
          console.log(reply)
          this.props.rerender();
        })
        .catch(err => console.error(err))
    }
  }

  componentDidMount() {
    console.log(this.state.verified)
    this.checkVerification();
  }

  render() {
    return (
      <div>
        {console.log(this.props.review)}
        <br></br>
        <br></br>
        <MyUsername username={this.props.review.reviewer_name} verified={this.state.verified}/>
        <div>Star Rating Container. Rating: {this.props.review.rating}</div>
        <img src={'/Users/charlesewing3/Documents/HackReactor/Immersive/FEC/FEC/client/src/RatingsReviews/images/star full.png'}/>
        <div className="tile-date">Reviewed on {this.reformatDate(this.props.review.date)}</div>
        <ReviewSummary summary={this.props.review.summary}/>
        <p>Review Body(HANDLE PHOTOS): {this.props.review.body}</p>
        <IRecommend recommend={this.props.review.recommend}/>
        <SellerResponse response={this.props.review.response}/>
        <div>Helpful?{' '}
          <u onClick={this.handleHelpfulClick} style={{cursor: 'pointer'}}>Yes</u> ({this.props.review.helpfulness})
        </div>
      </div>
    );
  }
}

export default IndividualTile;