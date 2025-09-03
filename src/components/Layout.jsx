import React from 'react';
import { useApp } from '../context/AppContext';
import { getUserProgress, getUserBadge } from '../utils/quizUtils';

const Layout = ({ children, title, showProgress = false }) => {
  const { state } = useApp();
  const { user, quizResults } = state;
  
  const progress = getUserProgress(user, quizResults);
  const badge = getUserBadge(progress);

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #eff6ff 0%, #ffffff 50%, #f3e8ff 100%)' }}>
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="flex items-center" style={{ gap: '0.75rem' }}>
            <div className="logo">
              🎓 CareerCompass
            </div>
            {title && (
              <div style={{ fontSize: '1.125rem', fontWeight: '500', color: '#374151' }}>
                / {title}
              </div>
            )}
          </div>
          
          {user.isLoggedIn && (
            <div className="flex items-center" style={{ gap: '1rem' }}>
              {showProgress && (
                <div className="flex items-center" style={{ gap: '0.5rem' }}>
                  <div style={{ width: '6rem', height: '0.5rem', backgroundColor: '#e5e7eb', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div 
                      style={{ 
                        height: '100%', 
                        backgroundColor: '#3b82f6', 
                        borderRadius: '9999px',
                        width: `${progress}%`,
                        transition: 'all 0.3s'
                      }}
                    ></div>
                  </div>
                  <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>{progress}%</span>
                </div>
              )}
              
              <div className="flex items-center" style={{ gap: '0.5rem' }}>
                <div style={{ 
                  width: '2rem', 
                  height: '2rem', 
                  backgroundColor: badge.color === 'bg-yellow-500' ? '#eab308' : 
                                   badge.color === 'bg-blue-500' ? '#3b82f6' :
                                   badge.color === 'bg-green-500' ? '#22c55e' : '#6b7280',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '0.875rem'
                }}>
                  {badge.icon}
                </div>
                <div style={{ fontSize: '0.875rem' }}>
                  <div className="font-medium text-gray-900">{user.name}</div>
                  <div className="text-gray-600" style={{ fontSize: '0.75rem' }}>{badge.name}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        {children}
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: '#f9fafb', borderTop: '1px solid #e5e7eb', marginTop: '4rem' }}>
        <div className="container py-8">
          <div className="text-center text-gray-600">
            <p style={{ fontSize: '0.875rem' }}>
              © 2025 CareerCompass - Your Personalized Career & Educational Advisor
            </p>
            <p style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>
              Built for SIH 2025 - Empowering students to make informed career choices
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
