import React from 'react'
import Login from './Login';
import Signup from './Signup';
import { useDispatch, useSelector } from 'react-redux';
import { showSignupScreen, loginThunk, signupThunk } from '../slices/authSlice';

function AuthSelection() {
  const showSignup = useSelector(state => state.auth.showSignup);
  const dispatch = useDispatch();

  const switchToLogin = () => dispatch(showSignupScreen(false));
  const switchToSignup = () => dispatch(showSignupScreen(true));

  const login = (username, password) => dispatch(loginThunk({ username, password }));
  const signup = (email, username, password) => dispatch(signupThunk({ email, username, password }));

  return showSignup ?
    <Signup switchToLogin={switchToLogin} onSignup={signup} /> :
    <Login switchToSignup={switchToSignup} onLogin={login} />;
}

export default AuthSelection