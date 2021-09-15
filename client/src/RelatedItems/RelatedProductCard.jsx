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
    this.handleClick = this.handleClick.bind(this);
    this.closeCompare = this.closeCompare.bind(this);
  }

  compare(event) {
    event.stopPropagation();
    this.setState({
      showComparison: !this.state.showComparison
    })
  }

  closeCompare(event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      showComparison: !this.state.showComparison
    })
  }

  handleClick(event) {
    console.log('click');
    console.log(this.props.item.id);
    this.props.changeCurrentProduct(this.props.item.id);
    this.props.updateRelated(this.props.item.id);

  }

  render() {
    console.log(this.props.item);
    return (
      Object.keys(this.props.item).length !== 0 ? (
      <div className='productCard' onClick={this.handleClick}>
        <div className='productImage'>
          <img className='productPhoto' src ={this.props.item.img} alt='Photo Unavailable' />
        </div>
        <button className="popup" onClick={this.compare}>Action
        </button>
          {
            this.state.showComparison ?
          <RelatedItemComparison currentItem={this.props.currentItem} comparedItem={this.props.item} closeCompare={this.closeCompare}/> :
          <div>No PopUp</div>
          }
        <div className='productDetails'>
        <div className='productCategory'>{this.props.item.category}</div>
        <div className='productName'>{this.props.item.name}</div>
        {
          this.props.item.sale_price === null ?
        <div className='productPrice'>${this.props.item.original_price}</div>
        :
        <div className='productPrice'>
          <span className='sale-price'> ${this.props.item.sale_price} </span>
          <span className='original-price'>${this.props.item.original_price}</span>
          </div>
        }
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
