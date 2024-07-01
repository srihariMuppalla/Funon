// VideoCallButton.js
import React from 'react';

const VideoCallButton = ({ onVideoCall }) => {
  const handleVideoCallClick = () => {
    // Initiate video call with random person
    onVideoCall();
  };

  return (
    <div>
      <button onClick={handleVideoCallClick}>Start Video Call</button>
    </div>
  );
};

export default VideoCallButton;
