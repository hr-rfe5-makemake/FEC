import React from 'react';

import Search from './Search.jsx'

const Footer = (props) => (
  <div id="page-footer">
    {/* <div id="logo">MakeMake</div> */}
    <span id='footer-items'>
      <a href='https://github.com/charlesewing3' target="_blank">Charles Ewing</a>
      <a href='https://github.com/christopherchsu' target="_blank">Christopher Hsu</a>
      <a href='https://github.com/ShavkatShavkiev' target="_blank">Shavkat Shavkiev<i className="fab fa-github"></i><i className="fab fa-linkedin"></i></a>
      <a href='https://github.com/yespacefeng' target="_blank">Ye Feng Chen</a>
    </span>
  </div>
)

export default Footer;