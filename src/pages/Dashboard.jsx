import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import ProgressTracker from '../components/Dashboard/ProgressTracker';
import Timeline from '../components/Dashboard/Timeline';
import NotificationCenter from '../components/Dashboard/NotificationCenter';
import { useAuth } from '../hooks/useAuth';
import { useNotifications } from '../hooks/useNotifications';
import { useApp } from '../context/AppContext';
import { careerData, collegesData, scholarshipsData } from '../data/careerData';
import { getStreamRecommendation, filterCollegesByStream, getUserProgress } from '../utils/quizUtils';

const DashboardPage = () => {
  const { user } = useAuth();
  const { notifications, markAsRead } = useNotifications();
  const { state, actions } = useApp();
  const { quizResults } = state;

  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    // Load user progress, upcoming deadlines, recommendations
    try {
      const data = await dashboardService.getDashboardData(user.id);
      setDashboardData(data);
    } catch (error) {
      console.error('Error loading dashboard:', error);
    }
  };

  if (!user.isLoggedIn || !quizResults.completed) {
    return (
      <div className="min-h-screen py-8" style={{ background: 'linear-gradient(135deg, #eff6ff 0%, #ffffff 50%, #f3e8ff 100%)' }}>
        <div className="text-center">
          <Card className="max-w-md mx-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Complete your profile and quiz first
            </h2>
            <div className="space-y-2">
              {!user.isLoggedIn && (
                <Button onClick={() => actions.setCurrentPage('profile')} className="w-full">
                  Setup Profile
                </Button>
              )}
              {user.isLoggedIn && !quizResults.completed && (
                <Button onClick={() => actions.setCurrentPage('quiz')} className="w-full">
                  Take Quiz
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  const { recommendedStream } = quizResults;
  const recommendation = getStreamRecommendation(recommendedStream);
  const careerPath = careerData.streams[recommendedStream];
  const relevantColleges = filterCollegesByStream(collegesData, recommendedStream);
  const relevantScholarships = scholarshipsData.filter(s => 
    s.streams.includes(recommendedStream) || s.streams.includes('all')
  );
  const progress = getUserProgress(user, quizResults);

  return (
    <div className="min-h-screen py-8" style={{ background: 'linear-gradient(135deg, #eff6ff 0%, #ffffff 50%, #f3e8ff 100%)' }}>
      <div className="space-y-8 max-w-7xl mx-auto px-4">
        {/* Enhanced User Profile Section */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card>
            <div className="text-center">
              {user.profilePicture ? (
                <img 
                  src={user.profilePicture} 
                  alt={user.name}
                  className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-blue-200 mb-4"
                />
              ) : (
                <div className="w-24 h-24 rounded-full mx-auto bg-blue-100 flex items-center justify-center mb-4">
                  <span className="text-3xl">👤</span>
                </div>
              )}
              <h2 className="text-xl font-bold text-gray-900 mb-2">{user.name}</h2>
              <p className="text-gray-600 text-sm mb-4">{user.education}</p>
              <Button 
                onClick={() => actions.setCurrentPage('profileEdit')}
                className="btn-outline text-sm"
              >
                <span className="emoji">✏️</span>
                Edit Profile
              </Button>
            </div>
          </Card>

          {/* Contact Info */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📧 Contact Information</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center">
                <span className="emoji">✉️</span>
                <span className="ml-2 text-gray-700">{user.email}</span>
              </div>
              <div className="flex items-center">
                <span className="emoji">📱</span>
                <span className="ml-2 text-gray-700">{user.mobile}</span>
              </div>
              <div className="flex items-center">
                <span className="emoji">📍</span>
                <span className="ml-2 text-gray-700">{user.location}</span>
              </div>
              <div className="flex items-center">
                <span className="emoji">🎂</span>
                <span className="ml-2 text-gray-700">
                  {user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : 'Not provided'}
                </span>
              </div>
            </div>
          </Card>

          {/* Quiz Progress */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🎯 Your Progress</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Profile Completion</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
              <div className="pt-2">
                <p className="text-sm text-gray-600">
                  <strong>Interests:</strong> {user.interests.length} selected
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Quiz Status:</strong> {quizResults.completed ? '✅ Completed' : '⏳ Pending'}
                </p>
              </div>
            </div>
          </Card>
        </div>
        {/* Welcome Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name}! 👋
          </h1>
          <p className="text-gray-600">
            Here's your personalized career guidance dashboard
          </p>
        </div>

        <div className="dashboard-grid">
          {/* Progress Overview */}
          <section className="dashboard-card progress-section">
            <h2>Your Progress</h2>
            <ProgressTracker 
              completedSteps={dashboardData?.completedSteps || []}
              totalSteps={dashboardData?.totalSteps || 5}
            />
          </section>

          {/* Quick Actions */}
          <section className="dashboard-card quick-actions">
            <h2>Quick Actions</h2>
            <div className="action-buttons">
              <Button onClick={() => actions.setCurrentPage('quiz')} className="action-btn">
                📝 Retake Quiz
              </Button>
              <Button onClick={() => actions.setCurrentPage('colleges')} className="action-btn">
                🏛️ Find Colleges
              </Button>
              <Button onClick={() => actions.setCurrentPage('mentor')} className="action-btn">
                👨‍🏫 Book Mentor
              </Button>
              <Button onClick={() => actions.setCurrentPage('scholarships')} className="action-btn">
                💰 Scholarships
              </Button>
            </div>
          </section>

          {/* Important Timeline */}
          <section className="dashboard-card timeline-section">
            <h2>Important Dates</h2>
            <Timeline events={dashboardData?.upcomingEvents || []} />
          </section>

          {/* Notifications */}
          <section className="dashboard-card notifications-section">
            <h2>Recent Updates</h2>
            <NotificationCenter 
              notifications={notifications}
              onMarkAsRead={markAsRead}
            />
          </section>

          {/* Recommended Colleges */}
          <section className="dashboard-card recommendations">
            <h2>Recommended for You</h2>
            <div className="recommendation-cards">
              {dashboardData?.recommendedColleges?.map(college => (
                <div key={college.id} className="mini-college-card">
                  <h4>{college.name}</h4>
                  <p>{college.location}</p>
                  <span className="match-score">{college.matchScore}% match</span>
                </div>
              ))}
            </div>
          </section>

          {/* Career Insights */}
          <section className="dashboard-card insights">
            <h2>Career Insights</h2>
            <div className="insights-content">
              <div className="insight">
                <h4>Recommended Stream</h4>
                <p>{dashboardData?.recommendedStream || 'Take quiz to discover'}</p>
              </div>
              <div className="insight">
                <h4>Confidence Level</h4>
                <div className="confidence-bar">
                  <div 
                    className="confidence-fill"
                    style={{ width: `${dashboardData?.confidenceLevel || 0}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
