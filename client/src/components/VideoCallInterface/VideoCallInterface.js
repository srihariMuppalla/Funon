import React, { useRef, useEffect, useState } from 'react';
import './VideoCallInterface.css';

const VideoCall = () => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [peerConnection, setPeerConnection] = useState(null);
  const [isCallStarted, setIsCallStarted] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    // Initialize WebRTC and set up video streams
    const initializeWebRTC = async () => {
      if (hasPermission) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localVideoRef.current.srcObject = stream;

        const pc = new RTCPeerConnection();
        setPeerConnection(pc);

        stream.getTracks().forEach((track) => {
          pc.addTrack(track, stream);
        });

        pc.ontrack = (event) => {
          event.streams[0].getTracks().forEach((track) => {
            remoteVideoRef.current.srcObject.addTrack(track);
          });
        };
      }
    };

    initializeWebRTC();
  }, [hasPermission]);

  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setHasPermission(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const startCall = async () => {
    if (!isCallStarted) {
      await requestCameraPermission();
      if (hasPermission) {
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        // Send the offer to the remote peer
        setIsCallStarted(true);
      }
    }
  };

  const endCall = () => {
    peerConnection.close();
    setIsCallStarted(false);
  };

  return (
    <div className="video-call">
      <div className="video-container">
        <video ref={localVideoRef} autoPlay muted />
        <video ref={remoteVideoRef} autoPlay />
      </div>
      <div className="controls">
        <button onClick={startCall} disabled={isCallStarted}>
          Start Call
        </button>
        <button onClick={endCall} disabled={!isCallStarted}>
          End Call
        </button>
      </div>
    </div>
  );
};

export default VideoCall;
