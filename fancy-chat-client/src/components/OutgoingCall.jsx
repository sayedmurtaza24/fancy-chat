import React from 'react';
import './OutgoingCall.css';

function OutgoingCall({ friendName }) {
  return (
    <div className="incoming-call">
      <div className="incoming-call-dialog">
        <h3>you're calling @{friendName}</h3>
      </div>
    </div>
  )
}

export default OutgoingCall