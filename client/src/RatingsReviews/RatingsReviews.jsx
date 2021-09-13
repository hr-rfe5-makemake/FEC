import React from 'react';
import BreakdownFilter from './BreakdownFilter.jsx';
import ReviewList from './ReviewList.jsx';

class RatingsReviews extends React.Component {
  constructor(props) {
    super(props);
  }



  render() {
    return (
      <div id='rr-container'>
        <h4>Ratings Reviews</h4>
        <div id='rr-left'>
          <BreakdownFilter />
        </div>
        <div id='rr-right'>
          <ReviewList />
        </div>
      </div>
    );
  }
}

export default RatingsReviews;