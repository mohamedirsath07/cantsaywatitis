import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Welcome from './pages/Welcome';
import Profile from './pages/Profile';
import Quiz from './pages/Quiz';
import Results from './pages/ResultsPage';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';
import ProfileEdit from './pages/ProfileEdit';

// Main app component that handles routing
const AppContent = () => {
  const { state } = useApp();
  
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
      default:
        return <Welcome />;
    }
  };

  return (
    <div className="App">
      {renderCurrentPage()}
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
