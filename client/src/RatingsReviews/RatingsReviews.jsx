import React from 'react';
import BreakdownFilter from './BreakdownFilter.jsx';
import ReviewList from './ReviewList.jsx';
import WriteReviewModal from './WriteReviewModal.jsx';

class RatingsReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterOptions: [1, 2, 3, 4, 5]
    };
    this.handleFilterClick = this.handleFilterClick.bind(this);
    this.handleRemoveFiltersClick = this.handleRemoveFiltersClick.bind(this);
  }

  handleFilterClick() {
    console.log('add/remove one filter')
    // toggle on/off
    // additive
    // render a "filters have been applied" message and "remove all filters" link
  }

  handleRemoveFiltersClick() {
    console.log('remove all filters')
  }

  render() {
    return (
      <div id='rr-container'>
        <h4>Ratings Reviews</h4>
        <div id='rr-left'>
          <BreakdownFilter
            handleFilterClick={this.handleFilterClick}
            handleRemoveFiltersClick={this.handleRemoveFiltersClick}
          />
        </div>
        <div id='rr-right'>
          <div>Keyword Search Component (Low Priority)</div>
          <br></br>
          <ReviewList
            product_id={this.props.product_id}
            filterOptions={this.state.filterOption}
          />
          <WriteReviewModal />
        </div>
      </div>
    );
  }
}

export default RatingsReviews;