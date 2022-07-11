import React from 'react';
import { useDispatch } from 'react-redux';
import { showAddFriendDialog } from '../slices/friendsSlice';
import FriendListItem from './FriendListItem';
import './FriendsList.css';

function FriendsList({ friends }) {
  const dispatch = useDispatch();

  const showAddFriend = () => dispatch(showAddFriendDialog(true));

  return (
    <div className="friends-list">
      {friends?.map(fr =>
        <FriendListItem key={fr} name={fr} />
      )}
      <div className="friends-list__controls">
        <button className="friends-list__add-friend" onClick={showAddFriend}>
          <svg className="svg-icon-zoomed" width="20" height="20" fill="none" viewBox="-4 0 24 24">
            <circle cx="12" cy="8" r="3.25" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></circle>
            <path stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12.25 19.25H6.94953C5.77004 19.25 4.88989 18.2103 5.49085 17.1954C6.36247 15.7234 8.23935 14 12.25 14"></path>
            <path stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 14.75V19.25"></path>
            <path stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.25 17L14.75 17"></path>
          </svg>
        </button>
      </div>
    </div>
  )
}

export default FriendsList