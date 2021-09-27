import React from 'react';
import IndividualTile from './IndividualTile.jsx';
import SortOptions from './ReviewListHelpers/SortOptions.jsx';
import MoreReviewsButton from './ReviewListHelpers/MoreReviewsButton.jsx';
import WriteReviewModal from './WriteReviewModal.jsx';

import axios from 'axios';
import urlFragment from './urlFragment.jsx';

class ReviewList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: null,
      allReviews: [],
      displayedReviews: [],
      allDisplayed: false,
      reviewsExist: true,
      sortOption: 'relevant',
      showModal: false,
      notSubmitted: true,
      searchTerm: '',
      displayedReviewsWithSearch: []
    };
    this.rerender = this.rerender.bind(this);
    this.changeSort = this.changeSort.bind(this);
    this.displayMore = this.displayMore.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.getAllReviews = this.getAllReviews.bind(this);
    this.addComplete = this.addComplete.bind(this);
    this.handleKeywordSearch = this.handleKeywordSearch.bind(this);
  }

  // Get all reviews from the API and store them in an array in state. Also store the first two reviews in the displayedReviews array.
  getAllReviews(product_id, callback, page = 1, count = 20) {
    axios.get(`${urlFragment}reviews/?product_id=${product_id}&sort=${this.state.sortOption}&page=${page}&count=${count}`)
      .then(allReviews => {
        var filteredReviews = [];
        for (var i = 0; i < allReviews.data.results.length; i++) {
          if (this.props.filterOptions.length === 0) {
            filteredReviews = allReviews.data.results.slice();
            break;
          } else {
            if (this.props.filterOptions.indexOf(allReviews.data.results[i].rating) !== -1) {
              filteredReviews.push(allReviews.data.results[i]);
            }
          }
        }

        this.setState({
          allReviews: filteredReviews,
          displayedReviews: filteredReviews.slice(0, 2),
          allDisplayed: (filteredReviews.length <= 2 ? true : false),
          reviewsExist: (filteredReviews.length !== 0 ? true : false)
        });

        if (callback) {
          callback();
        }
      })
      .catch(err => console.error(err))
  }

  // Get the product's name (it will appear at top of the "Add a Review" modal form)
  getProductName(product_id) {
    axios.get(`${urlFragment}products/${product_id}`)
      .then(productInfo => {
        this.setState({
          productName: productInfo.data.name
        });
      })
      .catch(err => console.error(err))
  }

  // Change sort order of reviews when the sort dropdown list is used
  changeSort(e) {
    this.setState({
      sortOption: e.target.value
    }, () => {
      this.rerender()
    });
  }

  // Display two more reviews when the "more reviews" button is clicked
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

  // Make modal appear when "Add a Review" button is clicked, or disappear when "Submit" button is clicked
  toggleModal() {
    this.setState(prevState => ({
      showModal: !prevState.showModal
    }));
  }

  // Get a new batch of reviews
  rerender() {
    this.getAllReviews(this.props.product_id);
  }

  // Rerender the page when the filters or current product change
  componentDidUpdate(prevProps) {
    if(this.props.filterOptions !== prevProps.filterOptions) {
      this.rerender();
    } else if(this.props.product_id !== prevProps.product_id) {
      this.rerender();
    }
  }

  // Make API calls for reviews and product name when page loads
  componentDidMount() {
    this.getAllReviews(this.props.product_id);
    this.getProductName(this.props.product_id);
  }

  // Once the "Add a Review" form has been submitted, toggle a state variable so that "Add a Review" button disappears
  addComplete() {
    this.setState({
      notSubmitted: false
    });
  }

  // Store search term in state and display reviews that contain that term in the Username, Summary, or Body
  handleKeywordSearch(e) {
    var prevLength = this.state.searchTerm.length;
    var newLength = e.target.value.length;
    this.setState({
      searchTerm: e.target.value
    }, () => {
      this.getAllReviews(this.props.product_id, () => {
        if (this.state.searchTerm.length >= 3) {
          var filteredReviews = [];
          for (var i = 0; i < this.state.allReviews.length; i++) {
            var review = this.state.allReviews[i];
            var indexTermInUsername = review.reviewer_name.toLowerCase().indexOf(this.state.searchTerm.toLowerCase());
            var indexTermInSummary = review.summary.toLowerCase().indexOf(this.state.searchTerm.toLowerCase());
            var indexTermInBody = review.body.toLowerCase().indexOf(this.state.searchTerm.toLowerCase());
            var exists = element => element !== -1;
            var options = [indexTermInUsername, indexTermInSummary, indexTermInBody];
            if (options.some(exists)) {
              filteredReviews.push(review);
            }
          }
          this.setState({
            allReviews: filteredReviews,
            displayedReviews: filteredReviews,
            allDisplayed: true
          });
        }
      })
    });
  }

  render() {
    {var addReviewElements = (
      <div id="addReviewElements">
        <WriteReviewModal
          show={this.state.showModal}
          productName={this.state.productName}
          toggleModal={this.toggleModal}
          product_id={this.props.product_id}
          getAllReviews={this.getAllReviews}
          timeToReRender={this.props.timeToReRender}
          addComplete={this.addComplete}
        />
      </div>
    )}

    // If the product has no reviews yet, only render the "Add Review" button
    if (!this.state.reviewsExist) {
      return (
        <div>
          {this.state.notSubmitted ? <button className={"rr-button"} onClick={this.toggleModal}>Write a customer review</button> : null}
          {addReviewElements}
        </div>
      )
    // If the product does have reviews, render the following:
    } else {
      return (
        <div id={"review-list"}>

          <span>Keyword Search: </span>
          <input id="keyword-search" type="text" placeholder="Type 3+ characters to start filtering reviews" size="40" value={this.state.searchTerm} onChange={this.handleKeywordSearch}/>

          <SortOptions changeSort={this.changeSort} count={this.state.allReviews.length}/>

          <div id="review-tile-container">
            {this.state.displayedReviews.map(review => {
              return <IndividualTile
                review={review}
                key={review.review_id}
                rerender={this.rerender}
                searchTerm={this.state.searchTerm}
              />
            })}
          </div>

          <div id={"rr-button-container"}>
            <MoreReviewsButton displayMore={this.displayMore} allDisplayed={this.state.allDisplayed}/>
            {this.state.notSubmitted ? <button className={"rr-button"} onClick={this.toggleModal}>Write a customer review</button> : null}
          </div>

          {addReviewElements}

        </div>
      );
    }
  }
}

export default ReviewList;