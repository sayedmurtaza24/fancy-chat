import React from 'react';
import './OutgoingCall.css';
import callLogManagement, { CALL_LOG_TYPE } from '../bloc/callLogManagment';
import { useEffect } from 'react';

function OutgoingCall({ friendName }) {
  useEffect(() => {
    callLogManagement.signalCallStart(friendName, CALL_LOG_TYPE.OUTGOING_ACCEPTED);
  });

  return (
    <div className="incoming-call">
      <div className="incoming-call-dialog">
        <h3>you're calling @{friendName}</h3>
      </div>
    </div>
  )
}

export default OutgoingCall