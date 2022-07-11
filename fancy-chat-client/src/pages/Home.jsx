import React from 'react';
import './Home.css';
import FriendsList from '../components/FriendsList';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { fetchFriendsThunk } from '../slices/friendsSlice';
import AddFriend from '../components/AddFriend';
import { CURRENT_MODE } from '../slices/callSlice';
import IncomingCall from '../components/IncomingCall';
import userManagement from '../bloc/userManagement';
import { logoutUser } from '../slices/authSlice';
import OutgoingCall from '../components/OutgoingCall';

function Home() {
  const username = useSelector(state => state.auth.username);
  const friends = useSelector(state => state.friends.friends);
  const showAddFriend = useSelector(state => state.friends.showAddFriend);
  const currentMode = useSelector(state => state.call.currentMode);
  const ringerName = useSelector(state => state.call.caller);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFriendsThunk());
  }, [dispatch]);

  const logout = e => {
    e.preventDefault();
    userManagement.logout();
    dispatch(logoutUser());
  }

  return (
    <div className="home-page">
      <p className="header__username">🆔 @{username}
        <span className="home-page__logout-btn" onClick={logout}>⏏️</span>
      </p>
      <div className="home-page__contents">
        <nav className="home-page__nav">
          <button className="nav__btn">
            <svg className="svg-icon" width="20" height="20" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.89286 4.75H6.06818C5.34017 4.75 4.75 5.34017 4.75 6.06818C4.75 13.3483 10.6517 19.25 17.9318 19.25C18.6598 19.25 19.25 18.6598 19.25 17.9318V15.1071L16.1429 13.0357L14.5317 14.6468C14.2519 14.9267 13.8337 15.0137 13.4821 14.8321C12.8858 14.524 11.9181 13.9452 10.9643 13.0357C9.98768 12.1045 9.41548 11.1011 9.12829 10.494C8.96734 10.1537 9.06052 9.76091 9.32669 9.49474L10.9643 7.85714L8.89286 4.75Z"></path>
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.25 4.75L14.75 9.25"></path>
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.75 5.75V9.25H18.25"></path>
            </svg>
            Call Log
          </button>
          <button className="nav__btn nav__btn--active">
            <svg className="svg-icon" width="20" height="20" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5.78168 19.25H13.2183C13.7828 19.25 14.227 18.7817 14.1145 18.2285C13.804 16.7012 12.7897 14 9.5 14C6.21031 14 5.19605 16.7012 4.88549 18.2285C4.773 18.7817 5.21718 19.25 5.78168 19.25Z"></path>
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.75 14C17.8288 14 18.6802 16.1479 19.0239 17.696C19.2095 18.532 18.5333 19.25 17.6769 19.25H16.75"></path>
              <circle cx="9.5" cy="7.5" r="2.75" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></circle>
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.75 10.25C16.2688 10.25 17.25 9.01878 17.25 7.5C17.25 5.98122 16.2688 4.75 14.75 4.75"></path>
            </svg>
            Friends
          </button>
        </nav>
        <main className="home-page__main">
          <FriendsList friends={friends?.map(fr => `@${fr}`)} />
          {/* <CallLog log={[{ name: '@martin', duration: '4min', time: 'yesterday' }]} /> */}
        </main>
      </div>
      <footer className="home-page__footer">
        Made by Murtaza 😎 <a href="https://github.com/sayedmurtaza24/fancy-chat">Link to Github 🔗</a>
      </footer>
      {showAddFriend && <AddFriend />}
      {currentMode === CURRENT_MODE.INCOMING_CALL_RINGING && <IncomingCall friendName={ringerName} />}
      {currentMode === CURRENT_MODE.OUTGOING_CALL_RINGING && <OutgoingCall friendName={ringerName} />}
    </div>
  )
}

export default Home