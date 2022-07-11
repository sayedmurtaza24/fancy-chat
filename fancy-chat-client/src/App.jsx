import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import AuthSelection from './pages/AuthSelection';
import Home from './pages/Home';
import { CURRENT_MODE, initPeerConnection } from './slices/callSlice';
import InCall from './pages/InCall';
import { useEffect } from 'react';

function App() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const username = useSelector(state => state.auth.username);
  const currentMode = useSelector(state => state.call.currentMode);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initPeerConnection(username));
  }, [dispatch, username]);

  return (
    <div className="app">
      <header className="header">
        <h1 className="header__title">FancyChat</h1>
      </header>{
        isLoggedIn ?
          ((currentMode === CURRENT_MODE.INCOMING_CALL_ACCEPTED ||
            currentMode === CURRENT_MODE.OUTGOING_CALL_ACCEPTED)
            ? <InCall /> : <Home />)
          : <AuthSelection />
      }
    </div>
  );
}

export default App;
