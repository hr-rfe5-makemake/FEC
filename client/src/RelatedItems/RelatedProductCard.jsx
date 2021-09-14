import React from "react";
import axios from "axios";
import RelatedProductRating from './RelatedProductRating.jsx';
import RelatedItemComparison from "./RelatedItemComparison.jsx";

class RelatedProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showComparison: false
    }
    this.compare = this.compare.bind(this);
  }

  compare(event) {
    this.setState({
      showComparison: !this.state.showComparison
    })
  }

  render() {
    return (
      Object.keys(this.props.item).length !== 0 ? (
      <div className='productCard'>
        <div className='productImage'>
          <img className='productPhoto' src ={this.props.item.img} alt='Photo Unavailable' />
        </div>
        <div className="popup" onClick={this.compare}>
          {
            this.state.showComparison ?
          <RelatedItemComparison currentItem={this.props.currentItem} comparedItem={this.props.item}/> :
          <div>No PopUp</div>
          }
        </div>
        <div className='productDetails'>
        <div className='productCategory'>Category: {this.props.item.category}</div>
        <div className='productName'>Name: {this.props.item.name}</div>
        <div className='productPrice'>Price: {this.props.item.default_price}</div>
        {this.props.item.rating ? (
          <div className='productRating'><RelatedProductRating rating={this.props.item.rating} /></div>
        ) : (
          <div className='productRating hide'></div>
        )}
      </div>
        </div>
    ) : (
      <div></div>
    )
    );
  }
}

export default RelatedProductCard;
