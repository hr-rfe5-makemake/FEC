import React from 'react';
import BreakdownFilter from './BreakdownFilter.jsx';
import ReviewList from './ReviewList.jsx';

class RatingsReviews extends React.Component {
  constructor(props) {
    super(props);
  }



  render() {
    return (
      <div id='RR-container'>
        <h4>Ratings Reviews</h4>
        <div id='RR-left'>
          <BreakdownFilter />
        </div>
        <div id='RR-right'>
          <ReviewList />
        </div>
      </div>
    );
  }
}

export default RatingsReviews;