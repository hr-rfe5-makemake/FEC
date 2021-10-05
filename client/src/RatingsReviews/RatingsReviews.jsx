import React from 'react';
import BreakdownFilter from './BreakdownFilter.jsx';
import ReviewList from './ReviewList.jsx';

class RatingsReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterOptions: [],
      timeToReRender: false
    };
    this.handleFilterClick = this.handleFilterClick.bind(this);
    this.handleRemoveFiltersClick = this.handleRemoveFiltersClick.bind(this);
    this.handleTimeToReRender = this.handleTimeToReRender.bind(this);
  }

  // Toggle a filter when one of the "star bars" is clicked on the left side of the page
  handleFilterClick(e) {
    var rating = parseInt(e.currentTarget.getAttribute('identifier'));
    // if the rating is not already included in current filters, add it
    if (this.state.filterOptions.indexOf(rating) === -1) {
      var newFilters = this.state.filterOptions.slice();
      newFilters.push(rating);
      newFilters.sort((a, b) => b - a);
      this.setState({
        filterOptions: newFilters
      });
      // if the rating is already included in the filters, remove it
    } else {
      var index = this.state.filterOptions.indexOf(rating);
      var newFilters = this.state.filterOptions.slice();
      newFilters.splice(index, 1);
      this.setState({
        filterOptions: newFilters
      });
    }
  }

  // Removes all filters
  handleRemoveFiltersClick() {
    this.setState({
      filterOptions: []
    });
  }

  // ReviewList calls this fn to instruct BreakdownFilter to rerender
  handleTimeToReRender() {
    this.setState(prevState => ({
      timeToReRender: !prevState.timeToReRender
    }));
  }

  render() {
    return (
      <div id='rr-container'>
        <h1>Ratings and Reviews</h1>
        <div id='rr-left'>
          <BreakdownFilter
            product_id={this.props.product_id}
            filterOptions={this.state.filterOptions}
            handleFilterClick={this.handleFilterClick}
            handleRemoveFiltersClick={this.handleRemoveFiltersClick}
            timeToReRender={this.state.timeToReRender}
          />
        </div>
        <div id='rr-right'>
          <ReviewList
            product_id={this.props.product_id}
            filterOptions={this.state.filterOptions}
            timeToReRender={this.handleTimeToReRender}
          />
        </div>
      </div>
    );
  }
}

export default RatingsReviews;