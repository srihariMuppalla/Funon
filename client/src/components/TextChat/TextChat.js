import React, { useState } from 'react';

const TextChat = ({ messages, onSendMessage }) => {
  const [messageText, setMessageText] = useState('');

  const handleMessageSend = () => {
    if (messageText.trim() !== '') {
      onSendMessage(messageText);
      setMessageText('');
    }
  };

  return (
    <div>
      <h2>Text Chat</h2>
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type your message"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
      />
      <button onClick={handleMessageSend}>Send</button>
    </div>
  );
};

export default TextChat;
