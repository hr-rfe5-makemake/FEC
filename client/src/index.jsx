import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Overview from './Overview/Overview.jsx';
import RelatedItems from './RelatedItems/RelatedItems.jsx';
import RatingsReviews from './RatingsReviews/RatingsReviews.jsx';
import QuestionsAnswers from './QuestionsAnswers/QuestionsAnswers.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state ={
      shoppingCart: [],
      currentItem_ID: 37311,
      details: {}
    }
    this.changeCurrentProduct = this.changeCurrentProduct.bind(this);
    this.databaseFetcher = this.databaseFetcher.bind(this);
    this.updateDetails = this.updateDetails.bind(this);
  }

  //Add Item to cart/outfit
  componentDidMount() {
    this.databaseFetcher();
  }


  //Make A GET REQUEST and change state
  databaseFetcher() {
    axios.get('/api/fec2/hr-rfe/products/' + this.state.currentItem_ID)
    .then(data => {
      this.setState({
        details: data.data
      })
    })
    .catch(err => {
      console.log('error fetching item details');
    })
  }

  changeCurrentProduct(newProduct){
    this.updateDetails(newProduct);
  }

  updateDetails(newId) {
    axios.get('/api/fec2/hr-rfe/products/' + newId)
    .then(data => {
      this.setState({
        currentItem_ID: newId,
        details: data.data
      })
    })
    .catch(err => {
      console.log('error fetching new item details');
    })
  }

  render() {
    return (
      <div>
        <Overview currentItem_ID={this.state.currentItem_ID}/>
        <RelatedItems changeCurrentProduct={this.changeCurrentProduct} currentItemId={this.state.currentItem_ID} currentItem={this.state.details}/>
        <QuestionsAnswers product={this.state.details}/>
        <RatingsReviews product_id={this.state.currentItem_ID}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
