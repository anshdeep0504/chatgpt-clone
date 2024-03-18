import React, { useState } from 'react';

const MyChatComponent = () => {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSendMessage = async () => {
    setIsLoading(true);
    setError(null);
  };

  return (
    <div className="chat-container">
      <div className="chat-input-holder">
        <textarea
          className="chat-input-textarea"
          placeholder="Send a message"
          value={inputText}
          onChange={handleChange}
        ></textarea>
        <button onClick={handleSendMessage} disabled={isLoading}>
          Send
        </button>
        {isLoading && <div>Loading...</div>}
        {error && <div className="error-message">{error}</div>}
      </div>
    </div >
  );
};

export default MyChatComponent;
