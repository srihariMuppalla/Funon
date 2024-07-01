// UserAuthentication.js
import React, { useState } from 'react';

const UserAuthentication = ({ onUserLogin }) => {
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Simulate user authentication
    if (username.trim() !== '') {
      setIsLoggedIn(true);
      localStorage.setItem('username', username);
      onUserLogin(username);
    } else {
      alert('Please enter a valid username.');
    }
  };

  const handleLogout = () => {
    // Simulate user logout
    setIsLoggedIn(false);
    localStorage.removeItem('username');
  };

  // Check if user is already logged in
  if (isLoggedIn) {
    return (
      <div>
        <p>Welcome, {username}!</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  } else {
    return (
      <div>
        <h2>User Authentication</h2>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    );
  }
};

export default UserAuthentication;
