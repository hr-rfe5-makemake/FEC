import React from 'react';

import Search from './Search.jsx'

const Header = (props) => (
  <div id="header">
    {/* <div id="logo">MakeMake</div> */}
    <img id="logo" src="./img/MakeMakeLogo(White).png" />
    <span id='header-items'>
      <a href='#overview'>Overview</a>
      <a href='#relatedItems'>Related Items</a>
      <a href='#questions_answers'>Questions & Answers</a>
      <a href='#rr-container'>Reviews</a>
      <Search onClick={props.onClick}/>
    </span>
  </div>
)

export default Header;