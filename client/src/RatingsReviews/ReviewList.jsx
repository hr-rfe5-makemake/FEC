import React from 'react';
import IndividualTile from './IndividualTile.jsx';
import SortOptions from './ReviewListHelpers/SortOptions.jsx';
import axios from 'axios';
import urlFragment from './urlFragment.jsx';

class ReviewList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allReviews: [],
      numDisplayed: null,
      showButton: false,
      sortOption: 'relevant'
    };
    this.rerender = this.rerender.bind(this);
    this.changeSort = this.changeSort.bind(this);
  }

  // GET all reviews, based on sortOption
  getAllReviews(product_id, sort = this.state.sortOption, page = 1, count = 5) {
    axios.get(`${urlFragment}?product_id=${product_id}&sort=${sort}&page=${page}&count=${count}`)
      .then(allReviews => {
        this.setState({
          allReviews: allReviews.data.results
        });
      })
      .catch(err => console.error(err))
  }

  changeSort(e) {
    // handles changes to sort order
    console.log(e.target.value)
    this.setState({
      sortOption: e.target.value
    });
    this.rerender()
  }

  rerender() {
    this.getAllReviews(this.props.product_id);
  }

  componentDidMount() {
    this.getAllReviews(this.props.product_id);
  }

  // when dynamically generating IndividualTiles, only include reviews that match the filterOptions prop
  render() {
    return (
      <div>
        <div>REVIEW LIST COMPONENT</div>
        <SortOptions changeSort={this.changeSort} count={this.state.allReviews.length}/>
        {this.state.allReviews.map(review => {
          return <IndividualTile
            review={review}
            key={review.review_id}
            rerender={this.rerender}
          />
        })}
        <button>More Reviews Button</button>
      </div>
    );
  }
}

export default ReviewList;