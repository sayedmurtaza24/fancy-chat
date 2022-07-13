import React from 'react';
import './OutgoingCall.css';
import callLogManagement, { CALL_LOG_TYPE } from '../bloc/callLogManagment';
import { endOngoingCall } from '../slices/callSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

function OutgoingCall({ friendName }) {
  const dispatch = useDispatch();

  useEffect(() => {
    callLogManagement.signalCallStart(friendName, CALL_LOG_TYPE.OUTGOING_ACCEPTED);
  });

  const rejectCall = () => {
    callLogManagement.signalCallStart(friendName, CALL_LOG_TYPE.OUTGOING_REJECTED);
    dispatch(endOngoingCall(friendName));
  }

  return (
    <div className="incoming-call">
      <div className="incoming-call-dialog">
        <h3>you're calling @{friendName}</h3>
        <div className="incoming-call-dialog__control-btns">
          <button className="control-btn control-btn--reject" onClick={rejectCall}>End</button>
        </div>
      </div>
    </div>
  )
}

export default OutgoingCall