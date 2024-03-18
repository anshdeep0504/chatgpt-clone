import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import MyChatComponent from './MyChatComponent';

const App = () => {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);


  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }

  const handleSendMessage = async () => {
    try {
      const newUserMessage = { text: message, isUser: true };
      const response = await axios.post('http://localhost:3080/API/completion', {
        prompt: message,
      });
      const aiResponse = { text: response.data.data, isUser: false };

      setChatMessages([...chatMessages, newUserMessage, aiResponse]);
      setMessage('');
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  };

  return (
    <>
      <MyChatComponent />
      <div className="App">

        <aside className="sideMenu">
          <div className="side-menu-button">
            <span>+</span>
            New chat
          </div>
        </aside>
        <section className="chatBox">
          <div className="chat-log">
            {chatMessages.map((msg, index) => (
              <div key={index} className={msg.isUser ? 'user-message' : 'ai-message'}>
                {msg.text}
              </div>
            ))}
          </div>


          <div className="chat-input-holder">
            <textarea
              className="chat-input-textarea"
              placeholder="Send a message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            ></textarea>
            <button className="chat-send-button" onClick={handleSendMessage}>
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default App;
