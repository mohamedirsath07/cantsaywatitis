import React from 'react';

const MessageBubble = ({ message, onActionClick }) => {
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className={`message-bubble ${message.sender}`}>
      <div className="message-content">
        <div className="message-text">
          {message.text}
        </div>
        
        {message.actions && message.actions.length > 0 && (
          <div className="message-actions">
            {message.actions.map((action, index) => (
              <button
                key={index}
                className="action-button"
                onClick={() => onActionClick(action)}
              >
                {action.text}
              </button>
            ))}
          </div>
        )}
        
        <div className="message-time">
          {formatTime(message.timestamp)}
        </div>
      </div>
      
      {message.sender === 'bot' && (
        <div className="message-avatar">
          🤖
        </div>
      )}
      
      {message.sender === 'user' && (
        <div className="message-avatar">
          👤
        </div>
      )}
    </div>
  );
};

export default MessageBubble;