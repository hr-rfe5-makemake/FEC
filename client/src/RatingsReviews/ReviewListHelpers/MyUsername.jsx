import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

// Return the Username element for the individual review tile
// If user is "verified", show a special icon and message
// If Username text includes the keyword search term, return the username in 3 spans: before keyword, keyword (highlighted yellow), after keyword
function MyUsername({username, verified, searchTerm}) {
  for (var i = 0; i < username.length; i++) {
    var index = username.toLowerCase().indexOf(searchTerm.toLowerCase());
    if (searchTerm.length >= 3 && index !== -1) {
      var newUsername = <span><span>{username.slice(0, index)}</span><span style={{backgroundColor: 'yellow'}}>{username.slice(index, index + searchTerm.length)}</span><span>{username.slice(index + searchTerm.length)}</span></span>
    }
  }
  if (verified) {
    return (
      <div>
       <FontAwesomeIcon icon={faUserCheck}/> {newUsername || username}
       <i className="verified"> Verified Purchase</i>
      </div>)
  } else {
    return <div><FontAwesomeIcon icon={faUser}/> {newUsername || username}</div>
  }
}

export default MyUsername;