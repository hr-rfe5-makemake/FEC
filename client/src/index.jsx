import React from 'react';
import ReactDOM from 'react-dom';
import Overview from './Overview/Overview.jsx';
import RelatedItems from './RelatedItems/RelatedItems.jsx';
import RatingsReviews from './RatingsReviews/RatingsReviews.jsx';
import QuestionsAnswers from './QuestionsAnswers/QuestionsAnswers.jsx';
import axios from 'axios';

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
  }

  //Add Item to cart/outfit
  componentDidMount() {
    this.databaseFetcher();
  }


  //Make A GET REQUEST and change state
  databaseFetcher() {
    axios.get('/api/fec2/hr-rfe/products/' + this.state.currentItem_ID)
    .then(data => {
      console.log(data.data);
      this.setState({
        //FILL ME IN
        details: data.data
      })
    })
    .catch(err => {
      console.log('error fetching item details');
    })
  }

  changeCurrentProduct(newProduct){
    this.setState({
      currentItem_ID: newProduct
    })
  }


  render() {
    return (
      <div>
        React is working!
        <Overview currentItem={this.state.currentItem_ID}/>
        <RelatedItems changeCurrentProduct={this.changeCurrentProduct} currentItemId={this.state.currentItem_ID} currentItem={this.state.details}/>
        <QuestionsAnswers />
        <RatingsReviews />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
