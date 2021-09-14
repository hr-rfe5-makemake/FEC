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
    this.state = {
      currentItem: {}
    }
    this.changeCurrentProduct = this.changeCurrentProduct.bind(this);
  }

  //Add Item to cart/outfit

  databaseFetcher() {
    axios.get('/API/fec2/hr-rfe/products/')
    .then(data => {
      this.setState({
        currentItem: data.data[0]
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  changeCurrentProduct(newProduct) {
    this.setState({
      currentItem_ID: newProduct
    })
  }

  componentDidMount() {
    this.databaseFetcher();
  }

  render() {
    return (
      <div>
        <Overview currentItem_ID={this.state.currentItem.id}/>
        <RelatedItems changeCurrentProduct={this.changeCurrentProduct}/>
        <QuestionsAnswers />
        <RatingsReviews />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
