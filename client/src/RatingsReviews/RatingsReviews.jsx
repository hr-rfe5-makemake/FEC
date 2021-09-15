import React from 'react';
import BreakdownFilter from './BreakdownFilter.jsx';
import ReviewList from './ReviewList.jsx';
import WriteReviewModal from './WriteReviewModal.jsx';

class RatingsReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterOptions: []
    };
    this.handleFilterClick = this.handleFilterClick.bind(this);
    this.handleRemoveFiltersClick = this.handleRemoveFiltersClick.bind(this);
  }

  handleFilterClick(e) {
    var rating = parseInt(e.currentTarget.getAttribute('identifier'));
    if (this.state.filterOptions.indexOf(rating) === -1) {
      var newFilters = this.state.filterOptions.slice();
      newFilters.push(rating);
      newFilters.sort((a, b) => b - a);
      this.setState({
        filterOptions: newFilters
      });
    } else {
      var index = this.state.filterOptions.indexOf(rating);
      var newFilters = this.state.filterOptions.slice();
      newFilters.splice(index, 1);
      this.setState({
        filterOptions: newFilters
      });
    }
  }

  handleRemoveFiltersClick() {
    this.setState({
      filterOptions: []
    });
  }

  render() {
    return (
      <div id='rr-container'>
        <h4>RATINGS & REVIEWS</h4>
        <div id='rr-left'>
          <BreakdownFilter
            product_id={this.props.product_id}
            filterOptions={this.state.filterOptions}
            handleFilterClick={this.handleFilterClick}
            handleRemoveFiltersClick={this.handleRemoveFiltersClick}
          />
        </div>
        <div id='rr-right'>
          <div>Keyword Search Component (Low Priority)</div>
          <br></br>
          <ReviewList
            product_id={this.props.product_id}
            filterOptions={this.state.filterOptions}
          />
          <WriteReviewModal />
        </div>
      </div>
    );
  }
}

export default RatingsReviews;