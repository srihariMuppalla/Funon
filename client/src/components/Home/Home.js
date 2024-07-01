import React from 'react';
import VideoCall from '../VideoCallInterface/VideoCallInterface';

function Home({ handleLogout, user }) {
  console.log("User Data in Home:", user);
  return (
    <div>
      <div>Home</div>
      {user && (
        <div>
          <h2>Welcome, {user.firstname}!</h2>
          <p>Email: {user.email}</p>
        </div>
      )}
      <button onClick={handleLogout}>Logout</button>
      <VideoCall />
    </div>
  );
}

export default Home;
