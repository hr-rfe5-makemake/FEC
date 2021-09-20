import React from 'react';

const GetSizes = ({skus}) => {
  if (skus === undefined) {
    return [];
  }
  let result = [];
  for (let key in skus) {
    if (skus[key].quantity > 0) {
      result.push(<option key={key} value={key}>{skus[key].size}</option>)
    }
  }
  return result;
}
const GetQuantity = ({skus, currentSku}) => {
  if (skus === undefined) {
    return [];
  } else if (skus[currentSku] === undefined) {
    return [];
  }
  let result = [];
  for (let i = 2; i <= skus[currentSku].quantity && i <= 15; i++) {
    result.push(<option key={`${currentSku}_${i}`} value={i}>{i}</option>)
  }
  return result;
}

const CheckStock = (skus) => {
  if (skus === undefined) {
    return false;
  }
  for (let key in skus) {
    if (skus[key].quantity > 0) {
      return true;
    }
  }
  return false;
}

const AddToCart = (props) => {
  let stock = CheckStock(props.currentStyle.skus);
  return (
    <div id="add-to-cart">
      <select id="select-size" onChange={event => { props.onChangeSize(event); }} disabled={!stock}>
        <option value="default">
          {stock ? ('Select Size') : ('OUT OF STOCK')}
        </option>
        <GetSizes skus={props.currentStyle.skus}/>
      </select>
      <select id="select-quantity" onChange={event => { props.onChangeQuantity(event); }} disabled={props.sku === null}>
        {props.sku ? <option value="1">1</option> : <option value="default">-</option>}
        <GetQuantity skus={props.currentStyle.skus} currentSku={props.sku}/>
      </select>
      <button id="add-to-cart-btn"
        onClick={() => { props.sku ? () => {props.onClick()} : null; }}
        hidden={!stock}>
        Add To Cart
      </button>
    </div>
  )
}

export default AddToCart;