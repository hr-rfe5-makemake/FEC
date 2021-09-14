import React from 'react';
import IndividualTile from './IndividualTile.jsx';
import SortOptions from './ReviewListHelpers/SortOptions.jsx';
import MoreReviewsButton from './ReviewListHelpers/MoreReviewsButton.jsx';
import axios from 'axios';
import urlFragment from './urlFragment.jsx';

class ReviewList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allReviews: [],
      displayedReviews: [],
      allDisplayed: false,
      reviewsExist: true,
      sortOption: 'relevant'
    };
    this.rerender = this.rerender.bind(this);
    this.changeSort = this.changeSort.bind(this);
    this.displayMore = this.displayMore.bind(this);
  }

  getAllReviews(product_id, sort = this.state.sortOption, page = 1, count = 5) {
    axios.get(`${urlFragment}?product_id=${product_id}&sort=${sort}&page=${page}&count=${count}`)
      .then(allReviews => {
        this.setState({
          allReviews: allReviews.data.results,
          displayedReviews: allReviews.data.results.slice(0, 2),
          allDisplayed: (allReviews.data.results.length <= 2 ? true : false),
          reviewsExist: (allReviews.data.results.length !== 0 ? true : false)
        });
      })
      .catch(err => console.error(err))
  }

  changeSort(e) {
    this.setState({
      sortOption: e.target.value
    });
    this.rerender()
  }

  displayMore() {
    var numDisplayed = this.state.displayedReviews.length;
    var totalNum = this.state.allReviews.length;

    if (totalNum <= numDisplayed + 2) {
      this.setState({
        allDisplayed: true,
        displayedReviews: this.state.displayedReviews.concat(this.state.allReviews.slice(numDisplayed, numDisplayed + 2))
      });
    } else {
      this.setState({
        displayedReviews: this.state.displayedReviews.concat(this.state.allReviews.slice(numDisplayed, numDisplayed + 2))
      });
    }
  }

  rerender() {
    this.getAllReviews(this.props.product_id);
  }

  componentDidMount() {
    this.getAllReviews(this.props.product_id);
  }

  // when dynamically generating IndividualTiles, only include reviews that match the filterOptions prop
  render() {
    if (!this.state.reviewsExist) {
      return <div>No reviews yet</div>
    } else {
      return (
        <div>
          <SortOptions changeSort={this.changeSort} count={this.state.allReviews.length}/>
          <div id="review-tile-container">
            {this.state.displayedReviews.map(review => {
              return <IndividualTile
                review={review}
                key={review.review_id}
                rerender={this.rerender}
              />
            })}
          </div>
          <MoreReviewsButton displayMore={this.displayMore} allDisplayed={this.state.allDisplayed}/>
          <button>ADD A REVIEW +</button>
        </div>
      );
    }
  }
}

export default ReviewList;