import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Welcome from './pages/Welcome';
import Profile from './pages/Profile';
import Quiz from './pages/Quiz';
import Results from './pages/ResultsPage';
import Dashboard from './pages/Dashboard';

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
      case 'results':
        return <Results />;
      case 'dashboard':
        return <Dashboard />;
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
