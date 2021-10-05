import React from 'react';
import axios from 'axios';
import urlFragment from './urlFragment.jsx';
import AverageRating from './BreakdownFilterHelpers/AverageRating.jsx';
import Breakdown from './BreakdownFilterHelpers/Breakdown.jsx';
import FactorBreakdown from './BreakdownFilterHelpers/FactorBreakdown.jsx';

class BreakdownFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      metaData: [],
      percentRecommend: null
    };
    this.calcPercentRecommend = this.calcPercentRecommend.bind(this);
  }

  // Get review metaData from API, store it in state, calculate the % of reviews that recommend the product
  getMetaData(product_id) {
    axios.get(`${urlFragment}reviews/meta?product_id=${product_id}`)
    .then(metaData => {
      this.setState({
        metaData: metaData
      });
      this.calcPercentRecommend(metaData.data.recommended);
    })
    .catch(err => console.error(err))
  }

  // Calculate percent of reviews that recommend the product
  calcPercentRecommend(recommended) {
    var trueCount = parseInt(recommended[true]) || 0;
    var falseCount = parseInt(recommended[false]) || 0;
    var percentRecommend = Math.round(100 * trueCount / (falseCount + trueCount));
    this.setState({
      percentRecommend: percentRecommend
    });
  }

  // Rerender this component when instructed by ReviewList
  componentDidUpdate(prevProps) {
    if (this.props.timeToReRender !== prevProps.timeToReRender) {
      this.getMetaData(this.props.product_id);
    } else if(this.props.product_id !== prevProps.product_id) {
      this.getMetaData(this.props.product_id);
    }
  }

  // Get metaData when app loads
  componentDidMount() {
    this.getMetaData(this.props.product_id);
  }

  render() {
    return (
      <div id="breakdown">
        <AverageRating
          metaData={this.state.metaData}
        />

        {(!Array.isArray(this.state.metaData) && (this.state.metaData.data.recommended.false || this.state.metaData.data.recommended.true)) ?
          <div id="percent-recommend">{this.state.percentRecommend}% of reviewers recommend this product</div>
          : null
        }

        <Breakdown
          filterOptions={this.props.filterOptions}
          metaData={this.state.metaData}
          handleRemoveFiltersClick={this.props.handleRemoveFiltersClick}
          handleFilterClick={this.props.handleFilterClick}
          product_id={this.props.product_id}
        />

        <br></br>
        <FactorBreakdown metaData={this.state.metaData}/>

      </div>
    );
  }
}

export default BreakdownFilter;