import React from 'react';
import './IncomingCall.css';
import { acceptIncomingCall, rejectIncomingCall } from '../slices/callSlice';
import { useDispatch } from 'react-redux';
import callLogManagement, { CALL_LOG_TYPE } from '../bloc/callLogManagment';
import { saveCallLog } from '../slices/logSlice';

function IncomingCall({ friendName }) {
  const dispatch = useDispatch();

  const acceptCall = () => {
    dispatch(acceptIncomingCall(friendName));
    callLogManagement.signalCallStart(friendName, CALL_LOG_TYPE.INCOMING_ACCEPTED);
  }
  const rejectCall = () => {
    dispatch(rejectIncomingCall(friendName));
    callLogManagement.signalCallStart(friendName, CALL_LOG_TYPE.INCOMING_REJECTED);
    dispatch(saveCallLog());
  }
  return (
    <div className="incoming-call">
      <div className="incoming-call-dialog">
        <h3>@{friendName} is calling you</h3>
        <div className="incoming-call-dialog__control-btns">
          <button className="control-btn control-btn--accept" onClick={acceptCall}>Accept</button>
          <button className="control-btn control-btn--reject" onClick={rejectCall}>Reject</button>
        </div>
      </div>
    </div>
  )
}

export default IncomingCall