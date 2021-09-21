import React from "react";
import axios from "axios";
import RelatedProductRating from './RelatedProductRating.jsx';

class OutfitProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.handleClick = this.handleClick.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  // handles click event of action button to remove selected item from outfit list
  removeItem(event) {
    event.stopPropagation();
    this.props.removeOutfit(this.props.item.id);
  }

  // handle click event to change current product
  handleClick(event) {
    this.props.changeCurrentProduct(this.props.item.id);
    this.props.updateRelated(this.props.item.id);
  }

  render() {
    // console.log(this.props.item);
    return (
      this.props.item !== undefined ? (
      <div className='productCard' onClick={this.handleClick}>
        <div className='productImage'>
          <img className='productPhoto' src ={this.props.item.img} alt='Photo Unavailable' />
        </div>
        <button className='action' onClick={this.removeItem}>X
        </button>
        <div className='productDetails'>
        <div className='productCategory'>{this.props.item.category}</div>
        <div className='productName'>{this.props.item.name}</div>
        {
          this.props.item.sale_price === null || this.props.sale_price === undefined ?
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
      <div className='productCard borderless'></div>
    )
    );
  }
}

export default OutfitProductCard;
