import React from 'react';

import Search from './Search.jsx'

const Header = (props) => (
  <div id="header">
    <div id="logo">MakeMake</div>
    {/* <img id="logo" src=".././img/logo.png" /> */}
    <Search />
  </div>
)

export default Header;