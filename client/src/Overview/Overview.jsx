import React from 'react';
import axios from 'axios';

import Header from './Header.jsx';
import ImageGallery from './ImageGallery.jsx';
import StarRating from './StarRating.jsx';
import SocialMediaShare from './SocialMediaShare.jsx';
import Styles from './Styles.jsx';
import AddToCart from './AddToCart.jsx'
;import ProductOverview from './ProductOverview.jsx';

const url = '/API/fec2/hr-rfe';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      currentItem: {},
      styles: {},
      currentStyle: {},
      reviews: {},
      sku: null,
      quantity: null,
      price: 0
    }
  }

  componentDidMount() {
    let id = this.props.currentItem_ID || 37311;
    axios.get(`${url}/products/${id}`)
      .then(result => {
        this.setState({
          currentItem: result.data,
          price: result.data.default_price
        })
        axios.get(`${url}/products/${id}/styles`)
        .then(result => {
          this.setState({
            styles: result.data,
            currentStyle: result.data.results[0]
          })
        })
        axios.get(`${url}/reviews/meta/?product_id=${id}`)
        .then(result => {
          this.setState({
            reviews: result.data
          })
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  getStarRating() {
    if (this.state.reviews.ratings === undefined) {
      return 0;
    }
    let stars = 0;
    let count = 0;
    for (let rating in this.state.reviews.ratings) {
      stars += (Number(rating) * Number(this.state.reviews.ratings[rating]));
      count += Number(this.state.reviews.ratings[rating]);
    }
    return {avg: stars / count, count: count};
  }

  onSocialMediaClick() {

  }

  onClickStyle(style) {
    this.setState({
      currentStyle: style
    })
  }

  onChangeSize(event) {
    this.setState({
      sku: event.target.value
    })
  }

  onChangeQuantity(event) {
    this.setState({
      quantity: event.target.value
    })
  }

  onAddToCart() {
    for (let i = 0; i < this.state.quantity; i++) {
      axios.post(`${url}/cart`, {sku_id: this.state.sku})
        .then(() => {
          console.log('Added to Cart');
        })
        .catch(err => {
          console.log(err);
        })
    }
    axios.get(`${url}/cart`)
      .then(result => {
        this.setState({
          cart: result.data
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    return (
      <div>
        <Header />
        <div id="main-overview">
          <ImageGallery gallery={this.state.styles.results}/>
          <div id="product-details">
            <StarRating rating={this.getStarRating()}/>
            <h3 id="category">{this.state.currentItem.category}</h3>
            <h1 id="product-name">{this.state.currentItem.name}</h1>
            {this.state.currentStyle.sale_price ? (<h2 id="sale-price">${this.state.currentStyle.sale_price}</h2>) : (<h2 id="original-price">${this.state.currentStyle.original_price}</h2>)}
            <SocialMediaShare />
            <Styles
              styles={this.state.styles}
              currentStyle={this.state.currentStyle}
              onClick={this.onClickStyle.bind(this)}/>
            <AddToCart
              sku={this.state.sku}
              quantity={this.state.quantity}
              currentStyle={this.state.currentStyle}
              onChangeSize={this.onChangeSize.bind(this)}
              onChangeQuantity={this.onChangeQuantity.bind(this)}
              onClick={this.onAddToCart.bind(this)}/>
          </div>
        </div>
        <ProductOverview
          slogan={this.state.currentItem.slogan}
          description={this.state.currentItem.description}/>
      </div>
    );
  }
}

export default Overview;