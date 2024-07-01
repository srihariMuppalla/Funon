import React, { useState,useEffect } from 'react';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './components/Login/Login';
import Home from './components/Home/Home'; 

const FIFTEEN_DAYS_IN_MS = 15 * 24 * 60 * 60 * 1000; // 15 days in milliseconds

function ProtectedRoute({ isLoggedIn, children }) {
  return isLoggedIn ? children : <Navigate to="/login" />;
}

function App() {
  const [user, setUser] = useState(() => {
    // Initialize state from localStorage
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Initialize state from localStorage
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const loginTimestamp = localStorage.getItem('loginTimestamp');
    if (loggedIn && loginTimestamp) {
      const currentTime = new Date().getTime();
      const loginTime = new Date(parseInt(loginTimestamp, 10)).getTime();
      if (currentTime - loginTime > FIFTEEN_DAYS_IN_MS) {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('loginTimestamp');
        return false;
      }
      return true;
    }
    return false;
  });

  useEffect(() => {
    if (isLoggedIn && user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [isLoggedIn, user]);

  const handleLogin = (userData) => { // Add userData parameter here
    const currentTime = new Date().getTime();
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('loginTimestamp', currentTime.toString());
    setIsLoggedIn(true);
    setUser(userData); // Use userData here
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loginTimestamp');
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm handleLogin={handleLogin} />} />
        <Route 
          path="/"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Home handleLogout={handleLogout} user={user}/>
            </ProtectedRoute>
          }
        />
        <Route 
          path="*"
          element={<Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
