import React, { useEffect, useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navigation from './components/Navigation';
import Welcome from './pages/Welcome';
import Profile from './pages/Profile';
import Quiz from './pages/Quiz';
import Results from './pages/ResultsPage';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';
import ProfileEdit from './pages/ProfileEdit';
import CollegeFinder from './components/CollegeFinder';
import CollegeRecommendations from './components/CollegeRecommendations';
import StreamColleges from './pages/StreamColleges';
import ChatInterface from './components/Chatbot/ChatInterface';

// Main app component that handles routing
const AppContent = () => {
  const { state } = useApp();
  const [showChatbot, setShowChatbot] = useState(false);
  
  // Update page title based on current page
  useEffect(() => {
    const pageTitles = {
      'welcome': 'CareerCompass - Find Your Career Path',
      'profile': 'CareerCompass - Setup Profile',
      'quiz': 'CareerCompass - Career Quiz',
      'auth': 'CareerCompass - Login',
      'results': 'CareerCompass - Quiz Results',
      'dashboard': 'CareerCompass - Dashboard',
      'profileEdit': 'CareerCompass - Edit Profile',
      'collegeFinder': 'CareerCompass - College Finder',
      'collegeRecommendations': 'CareerCompass - College Recommendations',
      'streamColleges': 'CareerCompass - Stream Colleges'
    };
    
    document.title = pageTitles[state.currentPage] || 'CareerCompass';
  }, [state.currentPage]);
  
  const renderCurrentPage = () => {
    switch (state.currentPage) {
      case 'welcome':
        return <Welcome />;
      case 'profile':
        return <Profile />;
      case 'quiz':
        return <Quiz />;
      case 'auth':
        return <Auth />;
      case 'results':
        return <Results />;
      case 'dashboard':
        return <Dashboard />;
      case 'profileEdit':
        return <ProfileEdit />;
      case 'collegeFinder':
        return <CollegeFinder />;
      case 'collegeRecommendations':
        return <CollegeRecommendations />;
      case 'streamColleges':
        return <StreamColleges />;
      default:
        return <Welcome />;
    }
  };

  return (
    <div className="App min-h-screen bg-gray-50">
      <Navigation />
      <main>
        {renderCurrentPage()}
      </main>
      
      {/* Chatbot Toggle Button */}
      <button
        className="chatbot-toggle-btn"
        onClick={() => setShowChatbot(!showChatbot)}
        title="Career Assistant"
      >
        {showChatbot ? '✕' : '💬'}
      </button>
      
      {/* Chatbot Interface */}
      {showChatbot && (
        <div className="chatbot-container">
          <ChatInterface 
            userProfile={state.userProfile}
            onClose={() => setShowChatbot(false)}
          />
        </div>
      )}
    </div>
  );
};

// Wrapper component with context provider
const App = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
