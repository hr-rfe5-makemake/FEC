import React from 'react';
import IRecommend from './ReviewListHelpers/IRecommend.jsx';
import MyUsername from './ReviewListHelpers/MyUsername.jsx';
import SellerResponse from './ReviewListHelpers/SellerResponse.jsx';
import ReviewSummary from './ReviewListHelpers/ReviewSummary.jsx';
import Stars from './Stars.jsx';
import axios from 'axios';
import urlFragment from './urlFragment.jsx';

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
          this.props.rerender();
        })
        .catch(err => console.error(err))
    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="individual-tile">
        <MyUsername username={this.props.review.reviewer_name} verified={this.state.verified}/>
        <Stars rating={this.props.review.rating}/>
        <span className="tile-date">Reviewed on {this.reformatDate(this.props.review.date)}</span>
        <ReviewSummary summary={this.props.review.summary}/>
        <div className="tile-body">{this.props.review.body}</div>
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