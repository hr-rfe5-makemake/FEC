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
  for (let i = 1; i <= skus[currentSku].quantity && i <= 15; i++) {
    result.push(<option key={`${currentSku}_${i}`} value={i}>{i}</option>)
  }
  return result;
}

const Cart = (props) => {
  return (
    <div id="add-to-cart">
      <select id="select-size" onChange={event => { props.onChangeSize(event); }}>
        <option value="default">Select Size</option>
        <GetSizes skus={props.currentStyle.skus}/>
      </select>
      <select id="select-quantity" onChange={event => { props.onChangeQuantity(event); }} disabled={props.sku === null ? true : null}>
        <option value="default">-</ option>
        <GetQuantity skus={props.currentStyle.skus} currentSku={props.sku}/>
      </select><br></br>
      <button onClick={() => { props.onClick(); }} disabled={props.quantity === null ? true: null}>Add to Cart</button>
    </div>
  )
}

export default Cart;