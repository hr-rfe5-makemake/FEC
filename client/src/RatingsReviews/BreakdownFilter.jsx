import React from 'react';
import axios from 'axios';
import urlFragment from './urlFragment.jsx';
import AverageRating from './BreakdownFilterHelpers/AverageRating.jsx';
import Breakdown from './BreakdownFilterHelpers/Breakdown.jsx';

class BreakdownFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      metaData: []
    };
  }

  getMetaData(product_id) {
    axios.get(`${urlFragment}meta?product_id=${product_id}`)
    .then(metaData => {
      this.setState({
        metaData: metaData
      });
    })
    .catch(err => console.error(err))
  }

  componentDidMount() {
    this.getMetaData(this.props.product_id);
  }

  render() {
    return (
      <div>
        <AverageRating
          metaData={this.state.metaData}
        />
        <Breakdown
          filterOptions={this.props.filterOptions}
          metaData={this.state.metaData}
          handleRemoveFiltersClick={this.props.handleRemoveFiltersClick}
          handleFilterClick={this.props.handleFilterClick}
        />

        <br></br>
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