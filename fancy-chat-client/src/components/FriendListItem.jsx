import React from 'react';
import { useDispatch } from 'react-redux';
import { sendCallInvitation } from '../slices/callSlice';
import './FriendListItem.css';

function FriendListItem({ name }) {
  const dispatch = useDispatch();

  const callFriend = () => {
    dispatch(sendCallInvitation(name.replace('@', '')));
  };

  return (
    <div className="friend-list-item">
      <div className="friend-list-item__avatar">
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="8" r="3.25" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></circle>
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6.8475 19.25H17.1525C18.2944 19.25 19.174 18.2681 18.6408 17.2584C17.8563 15.7731 16.068 14 12 14C7.93201 14 6.14367 15.7731 5.35924 17.2584C4.82597 18.2681 5.70558 19.25 6.8475 19.25Z"></path>
        </svg>
      </div>
      <h4 className="friend-list-item__name">{name}</h4>
      <button className="friend-list-item__call-btn" onClick={callFriend}>
        <svg width="24" height="24" fill="none" viewBox="0 -1 23 23">
          <path stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.89286 4.75H6.06818C5.34017 4.75 4.75 5.34017 4.75 6.06818C4.75 13.3483 10.6517 19.25 17.9318 19.25C18.6598 19.25 19.25 18.6598 19.25 17.9318V15.1071L16.1429 13.0357L14.5317 14.6468C14.2519 14.9267 13.8337 15.0137 13.4821 14.8321C12.8858 14.524 11.9181 13.9452 10.9643 13.0357C9.98768 12.1045 9.41548 11.1011 9.12829 10.494C8.96734 10.1537 9.06052 9.76091 9.32669 9.49474L10.9643 7.85714L8.89286 4.75Z"></path>
        </svg>
      </button>
    </div>
  )
}

export default FriendListItem