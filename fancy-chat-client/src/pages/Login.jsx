import React from 'react';
import { useRef } from 'react';
import './Login.css';

function Login({ switchToSignup, onLogin }) {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const login = () => onLogin(usernameRef.current.value, passwordRef.current.value);

  return (
    <div className="login-page">
      <form className="login-page__form" autoComplete="off" onSubmit={() => { }}>
        <h2 className="login-page__form-title">Login to your account</h2>
        <div className="login-page__form-label">
          <label htmlFor="username">Username:</label>
          <input
            ref={usernameRef}
            className="login-page__input"
            type="text"
            name="username"
            id="username"
            placeholder="Enter your username" />
        </div>
        <div className="login-page__form-label">
          <label htmlFor="password">Password:</label>
          <input
            ref={passwordRef}
            className="login-page__input"
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password" />
        </div>
        <input className="login-page__btn" type="button" value="Login 😎" onClick={login} />
        <input className="login-page__btn" type="button" value="⬅️ Go to Signup" onClick={switchToSignup} />
      </form>
    </div>
  )
}

export default Login