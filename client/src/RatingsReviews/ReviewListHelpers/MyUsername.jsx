import React from 'react';

function MyUsername({username, verified}) {
  if (verified) {
    return <div>Username: {username} VERIFIED PURCHASER</div>
  } else {
    return <div>Username: {username}</div>
  }
}

export default MyUsername;