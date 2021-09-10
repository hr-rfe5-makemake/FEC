import React from 'react';
import ReactDOM from 'react-dom';
import Overview from './Overview/Overview.jsx';
import RelatedItems from './RelatedItems/RelatedItems.jsx';
import RatingsReviews from './RatingsReviews/RatingsReviews.jsx';
import QuestionsAnswers from './QuestionsAnswers/QuestionsAnswers.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state ={
      shoppingCart: [],
      currentItem_ID: 0
    }
    this.changeCurrentProduct = this.changeCurrentProduct.bind(this);
  }

  //Add Item to cart/outfit


  //Make A GET REQUEST and change state
  databaseFetcher(){
    axios.get('/API/[something]')
    .then(data => {
      this.setState({
        //FILL ME IN
      })
    })
  }

  changeCurrentProduct(newProduct){
    this.setState({
      currentItem_ID: newProduct
    })
  }

  ComponentDidMount() {
    databaseFetcher()
  }

  render() {
    return (
      <div>
        React is working!
        <Overview currentItem={this.state.currentItem_ID}/>
        <RelatedItems changeCurrentProduct={this.changeCurrentProduct}/>
        <QuestionsAnswers />
        <RatingsReviews />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
