import React from 'react';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addFriendThunk } from '../slices/friendsSlice';
import './AddFriend.css';

function AddFriend() {
  const dispatch = useDispatch();
  const inputRef = useRef();

  const addFriend = () => dispatch(addFriendThunk(inputRef.current.value));

  return (
    <div className="add-friend">
      <div className="add-friend__inner">
        <h2>Add friend</h2>
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