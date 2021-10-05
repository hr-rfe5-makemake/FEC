import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

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
       <i> Verified Purchaser</i>
      </div>)
  } else {
    return <div><FontAwesomeIcon icon={faUser}/> {newUsername || username}</div>
  }
}

export default MyUsername;