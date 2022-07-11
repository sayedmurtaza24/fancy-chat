import React from 'react';
import { useRef } from 'react';
import './Signup.css';

function SignUp({ switchToLogin, onSignup }) {
  const emailRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const onFormSubmit = (e) => {
    e.preventDefault();
    onSignup(emailRef.current.value, usernameRef.current.value, passwordRef.current.value);
  };

  return (
    <div className="signup-page">
      <form className="signup-page__form" autoComplete="off">
        <h2 className="signup-page__form-title">Make a new account</h2>
        <div className="signup-page__form-label">
          <label htmlFor="username">Email:</label>
          <input
            ref={emailRef}
            className="signup-page__input"
            type="text"
            name="email"
            id="email"
            placeholder="Enter your email" />
        </div>
        <div className="signup-page__form-label">
          <label htmlFor="username">Username:</label>
          <input
            ref={usernameRef}
            className="signup-page__input"
            type="text"
            name="username"
            id="username"
            placeholder="Choose a username" />
        </div>
        <div className="signup-page__form-label">
          <label htmlFor="password">Password:</label>
          <input
            ref={passwordRef}
            className="signup-page__input"
            type="password"
            name="password"
            id="password"
            placeholder="Choose a password" />
        </div>
        <input className="signup-page__btn" type="button" value="Signup 😃" onClick={onFormSubmit} />
        <input className="signup-page__btn" type="button" value="Go to Login ➡️" onClick={switchToLogin} />
      </form>
    </div>
  )
}

export default SignUp;