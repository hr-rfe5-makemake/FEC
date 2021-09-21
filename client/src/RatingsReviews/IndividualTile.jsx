import React from 'react';
import IRecommend from './ReviewListHelpers/IRecommend.jsx';
import MyUsername from './ReviewListHelpers/MyUsername.jsx';
import ReviewBody from './ReviewListHelpers/ReviewBody.jsx';
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
      verified: Math.round(Math.random()), // either 1 or 0, since no API data
      imageModal: false,
      modalURL: null
    };
    this.handleHelpfulClick = this.handleHelpfulClick.bind(this);
    this.handleReport = this.handleReport.bind(this);
    this.generateThumbnails = this.generateThumbnails.bind(this);
    this.handleThumbnailClick = this.handleThumbnailClick.bind(this);
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
      axios.put(`${urlFragment}reviews/${this.props.review.review_id}/helpful`)
        .then((reply) => {
          this.props.rerender();
        })
        .catch(err => console.error(err))
    }
  }

  handleReport() {
    axios.put(`${urlFragment}reviews/${this.props.review.review_id}/report`)
      .then(data => {
        console.log('successfully reported', data);
      })
      .catch(err => console.error(err))
  }

  handleThumbnailClick(e) {
    this.setState(prevState => ({
      imageModal: !prevState.imageModal,
      modalURL: e.target.src
    }));
  }

  generateThumbnails() {
    var photos = this.props.review.photos;
    if (!photos.length) {
      return null;
    } else {
      var thumbnails = [];
      for (var i = 0; i < photos.length; i++) {
        thumbnails.push(<img src={photos[i].url} height="100px" width="auto" onClick={this.handleThumbnailClick} key={i}></img>);
      }
      return (<div className="thumbnail-container" style={{display: "flex", gap: "10px"}}>{thumbnails}</div>);
    }
  }

  render() {
    return (
      <div className="individual-tile">
        {this.state.imageModal ?  <div className="modal" onClick={this.handleThumbnailClick}><img src={this.state.modalURL}></img></div> : null}
        <MyUsername username={this.props.review.reviewer_name} verified={this.state.verified} searchTerm={this.props.searchTerm}/>
        <Stars rating={this.props.review.rating}/>
        <ReviewSummary summary={this.props.review.summary} searchTerm={this.props.searchTerm}/>
        <span className="tile-date">Reviewed on {this.reformatDate(this.props.review.date)}</span>
        <ReviewBody body={this.props.review.body} searchTerm={this.props.searchTerm}/>
        {this.generateThumbnails()}
        <IRecommend recommend={this.props.review.recommend}/>
        <SellerResponse response={this.props.review.response}/>
        <div>Helpful?{' '}
          <u onClick={this.handleHelpfulClick} style={{cursor: 'pointer'}}>Yes</u> ({this.props.review.helpfulness})&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<u onClick={this.handleReport} style={{cursor: 'pointer'}}>Report</u>
        </div>
      </div>
    );
  }
}

export default IndividualTile;