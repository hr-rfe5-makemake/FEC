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

  getProductName(product_id) {
    axios.get(`${urlFragment}products/${product_id}`)
      .then(productInfo => {
        this.setState({
          productName: productInfo.data.name
        });
      })
      .catch(err => console.error(err))
  }

  changeSort(e) {
    this.setState({
      sortOption: e.target.value
    }, () => {
      this.rerender()
    });
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

  toggleModal() {
    this.setState(prevState => ({
      showModal: !prevState.showModal
    }));
  }

  rerender() {
    this.getAllReviews(this.props.product_id);
  }

  componentDidMount() {
    this.getAllReviews(this.props.product_id);
    this.getProductName(this.props.product_id);
  }

  componentDidUpdate(prevProps) {
    if(this.props.filterOptions !== prevProps.filterOptions) {
      this.rerender();
    } else if(this.props.product_id !== prevProps.product_id) {
      this.rerender();
    }
  }

  addComplete() {
    this.setState({
      notSubmitted: false
    });
  }

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

    if (!this.state.reviewsExist) {
      return addReviewElements;
    } else {
      return (
        <div id={"review-list"}>
          <span>Keyword Search: </span>
          <input type="text" placeholder="Type 3+ characters to start filtering reviews" size="40" value={this.state.searchTerm} onChange={this.handleKeywordSearch}/>
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