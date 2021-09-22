import React from 'react';

import Search from './Search.jsx'

const Header = (props) => (
  <div id="header">
    {/* <div id="logo">MakeMake</div> */}
    <img id="logo" src="./img/MakeMakeLogo(White).png" />
    <Search onClick={props.onClick}/>
  </div>
)

export default Header;