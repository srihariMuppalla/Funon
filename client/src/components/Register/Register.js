import React, { useState } from 'react';
import axios from 'axios';
import '../Login/Login.css';

const RegisterForm = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/register', {
        firstname,
        lastname,
        email,
        phone,
        dob,
        password,
      });

      // Clear form fields
      setFirstname('');
      setLastname('');
      setEmail('');
      setPhone('');
      setDob('');
      setPassword('');
      setError('');

      alert('Registration successful!');
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <input
              type="text"
              id="firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
              placeholder=""
            />
            <label htmlFor="firstname">First Name</label>
          </div>
          <div className="form-group">
            <input
              type="text"
              id="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
              placeholder=""
            />
            <label htmlFor="lastname">Last Name</label>
          </div>
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
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder=""
            />
            <label htmlFor="phone">Phone</label>
          </div>
          <div className="form-group">
            <input
              type="date"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
              placeholder="Date of Birth"
            />
            <label htmlFor="dob">Date of Birth</label>
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
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
