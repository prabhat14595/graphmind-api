import React, { useState } from 'react';

const ChatInput = () => {
  const [message, setMessage] = useState('');

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <input
      type="text"
      value={message}
      onChange={handleInputChange}
      placeholder="Type your message..."
    />
  );
};

export default ChatInput;