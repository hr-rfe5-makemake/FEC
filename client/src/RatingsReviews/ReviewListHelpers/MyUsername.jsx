import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faUserCheck } from '@fortawesome/free-solid-svg-icons'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

function MyUsername({username, verified}) {
  if (verified) {
    return (
      <div>
       <FontAwesomeIcon icon={faUserCheck}/> {username}
       <i> Verified Purchaser</i>
      </div>)
  } else {
    return <div><FontAwesomeIcon icon={faUser}/> {username}</div>
  }
}

export default MyUsername;