import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import RegisterForm from '../Register/Register';

const LoginForm = ({ handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(true);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password,
      });

      console.log("Full API Response:", response.data);

      const userData = response.data.user;
      console.log("User Data from API:", userData);

      // Clear form fields
      setEmail('');
      setPassword('');
      setError('');

      // Notify parent component of successful login
      handleLogin(userData); // Pass userData here
      // Redirect to home page
      navigate('/');
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  const handleSignUpClick = () => {
    setShowSignUp(true);
    setShowSignIn(false);
  };

  const handleSignInClick = () => {
    setShowSignUp(false);
    setShowSignIn(true);
  };

  return (
    <div className={showSignUp ? "login-main-cont-reverse" : "login-main-cont"}>
      <div className='sign-up-in-cont'>
        {showSignIn && (
          <div className="form-container">
            <h2>Login</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit} className="form">
              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder=""
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="form-group">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder=""
                />
                <label htmlFor="password">Password</label>
              </div>
              <button type="submit" className="submit-btn">
                Sign In
              </button>
            </form>
            <p>Forgot Your Password?</p>
          </div>
        )}

        {showSignUp && <RegisterForm />}
      </div>
      <div className={showSignUp ? "sign-page-container-reverse" : "sign-page-container"}>
        {showSignIn && (
          <div className='sign-up-cont'>
            <h1>Join the Fun! <br />Create Your Account Today</h1>
            <p>Meet new people, <br />make friends, <br />and have fun conversations!</p>
            <button onClick={handleSignUpClick}>Sign Up</button>
          </div>
        )}
        {showSignUp && (
          <div className='sign-up-cont'>
            <h1>Welcome Back! <br />Log In to Continue.</h1>
            <p>Connect with your friends <br />and explore new conversations.</p>
            <button onClick={handleSignInClick}>Sign In</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
