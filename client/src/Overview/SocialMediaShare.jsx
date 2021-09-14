import React from 'react';

const SocialMediaShare = (props) => (
  <div>
    <img key={`facebook`} className="social-icon" src=".././img/facebook.png"/>
    <img key={`twitter`} className="social-icon" src=".././img/twitter.png"/>
    <img key={`pinterest`} className="social-icon" src=".././img/pintrest.png"/>
  </div>
)

export default SocialMediaShare;