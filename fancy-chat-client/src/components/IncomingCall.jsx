import React from 'react';
import './IncomingCall.css';
import { acceptIncomingCall, rejectIncomingCall } from '../slices/callSlice';
import { useDispatch } from 'react-redux';

function IncomingCall({ friendName }) {
  const dispatch = useDispatch();
  const acceptCall = () => {
    dispatch(acceptIncomingCall(friendName));
  }

  const rejectCall = () => {
    dispatch(rejectIncomingCall(friendName));
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