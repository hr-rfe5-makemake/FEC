import React from 'react';

const SocialMediaShare = (props) => {
  let postURL = encodeURI(document.location.href);
  let postTitle = encodeURI('Look what I found');
  let postImg = encodeURI(props.styles[0]);
  return (
    <div id="share">
      <a href={`https://www.facebook.com/sharer.php?u=${postURL}`}
        target="_blank">
        <img key={`facebook`} className="social-icon" src=".././img/facebook.png"/>
      </a>
      <a href={`https://twitter.com/share?url=${postURL}&text=${postTitle}&via=[via]& hashtags=[hashtags]`} target="_blank">
        <img key={`twitter`} className="social-icon" src=".././img/twitter.png"/>
      </a>
      <a href={`https://pinterest.com/pin/create/bookmarklet/?media=${postImg}&url=${postURL}&description=${postTitle}`} target="_blank">
        <img key={`pinterest`} className="social-icon" src=".././img/pintrest.png"/>
      </a>
    </div>
  )
}

export default SocialMediaShare;