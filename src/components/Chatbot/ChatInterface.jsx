import React, { useState, useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import QuickActions from './QuickActions';

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your CareerCompass assistant. How can I help you today? 🎓",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simple chatbot responses (inline implementation)
  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('college') || message.includes('admission')) {
      return {
        text: "I can help you find colleges! 🏛️ You can use our College Finder to search for government colleges in your area. What stream are you interested in?",
        actions: [
          { text: "Find Engineering Colleges", action: "colleges_engineering" },
          { text: "Find Medical Colleges", action: "colleges_medical" },
          { text: "Find Science Colleges", action: "colleges_science" }
        ]
      };
    } else if (message.includes('quiz') || message.includes('test') || message.includes('assessment')) {
      return {
        text: "Great! Our career quiz can help you discover your ideal stream. 📝 It takes just 5 minutes and provides personalized recommendations.",
        actions: [
          { text: "Take Career Quiz", action: "take_quiz" },
          { text: "View Quiz Results", action: "view_results" }
        ]
      };
    } else if (message.includes('stream') || message.includes('science') || message.includes('commerce') || message.includes('arts')) {
      return {
        text: "Choosing the right stream is crucial! 🎯 Based on your interests and aptitude, I can help you explore different career paths.",
        actions: [
          { text: "Science Stream Info", action: "stream_science" },
          { text: "Commerce Stream Info", action: "stream_commerce" },
          { text: "Arts Stream Info", action: "stream_arts" }
        ]
      };
    } else if (message.includes('scholarship') || message.includes('financial')) {
      return {
        text: "I can help you find scholarships! 💰 There are many government and private scholarships available for students.",
        actions: [
          { text: "Merit Scholarships", action: "scholarships_merit" },
          { text: "Need-based Aid", action: "scholarships_need" },
          { text: "State Scholarships", action: "scholarships_state" }
        ]
      };
    } else if (message.includes('help') || message.includes('support')) {
      return {
        text: "I'm here to help with all your career and education questions! 🤝 Here are some things I can assist you with:",
        actions: [
          { text: "College Information", action: "help_colleges" },
          { text: "Career Guidance", action: "help_career" },
          { text: "Quiz Support", action: "help_quiz" },
          { text: "Technical Issues", action: "help_technical" }
        ]
      };
    } else {
      return {
        text: "Thanks for your question! 😊 I'm here to help with career guidance, college information, and educational planning. What would you like to know more about?",
        actions: [
          { text: "Find Colleges", action: "find_colleges" },
          { text: "Take Career Quiz", action: "take_quiz" },
          { text: "Get Career Advice", action: "career_advice" }
        ]
      };
    }
  };

  const handleSendMessage = async (text = inputText) => {
    if (!text.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      // Simulate typing delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const response = getBotResponse(text);
      
      const botMessage = {
        id: messages.length + 2,
        text: response.text,
        sender: 'bot',
        timestamp: new Date(),
        actions: response.actions
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        id: messages.length + 2,
        text: "I'm having trouble right now. Please try again later. 😅",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickAction = (action) => {
    handleSendMessage(action.text);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button 
        className="chat-toggle"
        onClick={() => setIsOpen(!isOpen)}
        title="Chat with CareerCompass Assistant"
      >
        💬
      </button>

      {/* Chat Interface */}
      {isOpen && (
        <div className="chat-interface">
          <div className="chat-header">
            <div className="chat-header-info">
              <h3>CareerCompass Assistant</h3>
              <span className="chat-status">🟢 Online</span>
            </div>
            <button className="chat-close" onClick={() => setIsOpen(false)}>✕</button>
          </div>

          <div className="chat-messages">
            {messages.map(message => (
              <MessageBubble 
                key={message.id} 
                message={message}
                onActionClick={handleQuickAction}
              />
            ))}
            {isTyping && (
              <div className="typing-indicator">
                <div className="typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span className="typing-text">Assistant is typing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <QuickActions onActionClick={handleQuickAction} />

          <div className="chat-input">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me anything about careers..."
              disabled={isTyping}
            />
            <button 
              onClick={() => handleSendMessage()}
              disabled={isTyping || !inputText.trim()}
              className="chat-send-btn"
            >
              📤
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatInterface;