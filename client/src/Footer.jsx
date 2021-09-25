import React from 'react';

import Search from './Search.jsx'

const Footer = (props) => (
  <div id="page-footer">
    {/* <div id="logo">MakeMake</div> */}
    <span id='footer-items'>
      <div>Charles Ewing<a href='https://github.com/charlesewing3' target='_blank'><i className="fab fa-github"></i></a><a href='https://www.linkedin.com/in/shavkat-shavkiev-0b8172201/' target='_blank'><i className="fab fa-linkedin"></i></a></div>
      <div>Christopher Hsu <a href='https://github.com/christopherchsu' target='_blank'><i className="fab fa-github"></i></a><a href='https://www.linkedin.com/in/christopher-hsu-6ab454161/' target='_blank'><i className="fab fa-linkedin"></i></a></div>
      <div>Shavkat Shavkiev<a href='https://github.com/ShavkatShavkiev' target='_blank'><i className="fab fa-github"></i></a><a href='https://www.linkedin.com/in/shavkat-shavkiev-0b8172201/' target='_blank'><i className="fab fa-linkedin"></i></a></div>
      <div>Ye Feng Chen<a href='https://github.com/yespacefeng' target='_blank'><i className="fab fa-github"></i></a><a href='https://www.linkedin.com/in/shavkat-shavkiev-0b8172201/' target='_blank'><i className="fab fa-linkedin"></i></a></div>
    </span>
  </div>
)

export default Footer;