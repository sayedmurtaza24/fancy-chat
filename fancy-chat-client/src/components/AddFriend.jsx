import React from 'react';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addFriendThunk, showAddFriendDialog } from '../slices/friendsSlice';
import './AddFriend.css';

function AddFriend() {
  const dispatch = useDispatch();
  const inputRef = useRef();

  const addFriend = () => dispatch(addFriendThunk(inputRef.current.value));
  const hideDialog = () => dispatch(showAddFriendDialog(false));

  return (
    <div className="add-friend">
      <div className="add-friend__inner">
        <div className="add-friend__dialog-header">
          <h2 className="add-friend__title">Add friend</h2>
          <h2 className="add-friend__close-btn" onClick={hideDialog}>❌</h2>
        </div>
        <input
          ref={inputRef}
          className="friend-username-input"
          type="text"
          placeholder="Friends username" />
        <button className="add-friend-btn" onClick={addFriend}>Add friend</button>
      </div>
    </div>
  )
}

export default AddFriend