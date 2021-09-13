import React from 'react';
import axios from 'axios';

class BreakdownFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      metaData: []
    };
  }

  // GET meta data (ratings, recommended, characteristics) from /reviews/meta
  getMetaData() {

  }

  ComponentDidMount() {
    getMetaData();
  }

  render() {
    return (
      <div>
        <div>BREAKDOWN FILTER COMPONENT</div>

        <div>-->Average Rating</div>
        <div>Rating Summary (3.5)</div>
        <div>Rating Summary: Stars</div>

        <div>-->Rating Breakdown</div>
        <div className='filterOption' onClick={this.props.handleFilterClick}>5 Stars [BAR] [COUNT]</div>
        <div>4 Stars [BAR] [COUNT]</div>
        <div>3 Stars [BAR] [COUNT]</div>
        <div>2 Stars [BAR] [COUNT]</div>
        <div>1 Stars [BAR] [COUNT]</div>
        <div>"filters have been applied"</div>
        <div onClick={this.props.handleRemoveFiltersClick}>Link: remove filters</div>
        <div>50% of reviewers recommend this product</div>

        <div>-->Product Breakdown (Factors)</div>
        <div>Size [SCALE]</div>
        <div>Width [SCALE]</div>
        <div>Comfort [SCALE]</div>
        <div>Quality [SCALE]</div>
        <div>Length [SCALE]</div>
        <div>Fit [SCALE]</div>
        <div>(^Iterate through characteristics and show scale for each relevant one)</div>
      </div>
    );
  }
}

export default BreakdownFilter;