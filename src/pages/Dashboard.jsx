import React from 'react';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Card from '../components/Card';
import { useApp } from '../context/AppContext';
import { careerData, collegesData, scholarshipsData } from '../data/careerData';
import { getStreamRecommendation, filterCollegesByStream, getUserProgress } from '../utils/quizUtils';

const Dashboard = () => {
  const { state, actions } = useApp();
  const { user, quizResults } = state;

  if (!user.isLoggedIn || !quizResults.completed) {
    return (
      <Layout title="Dashboard">
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
      </Layout>
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
    <Layout title="Dashboard" showProgress={true}>
      <div className="space-y-8">
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

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="text-center">
            <div className="text-3xl mb-2">🎯</div>
            <div className="text-2xl font-bold text-blue-600">{recommendedStream}</div>
            <div className="text-sm text-gray-600">Recommended Stream</div>
          </Card>
          <Card className="text-center">
            <div className="text-3xl mb-2">🏫</div>
            <div className="text-2xl font-bold text-green-600">{relevantColleges.length}</div>
            <div className="text-sm text-gray-600">Relevant Colleges</div>
          </Card>
          <Card className="text-center">
            <div className="text-3xl mb-2">💰</div>
            <div className="text-2xl font-bold text-purple-600">{relevantScholarships.length}</div>
            <div className="text-sm text-gray-600">Scholarships Available</div>
          </Card>
          <Card className="text-center">
            <div className="text-3xl mb-2">📊</div>
            <div className="text-2xl font-bold text-orange-600">{progress}%</div>
            <div className="text-sm text-gray-600">Profile Complete</div>
          </Card>
        </div>

        {/* Your Recommendation */}
        <Card>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Your Career Path: {careerPath?.name} {careerPath?.icon}
          </h2>
          <p className="text-gray-700 mb-6">
            {recommendation.description}
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {careerPath?.degrees.slice(0, 4).map((degree, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-1">
                  {degree.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {degree.duration}
                </p>
                <p className="text-xs text-blue-600">
                  {degree.careers.slice(0, 2).join(', ')}...
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Button 
              onClick={() => actions.setCurrentPage('results')}
              variant="outline"
              size="sm"
            >
              View Full Details
            </Button>
          </div>
        </Card>

        {/* Colleges Near You */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Colleges for {careerPath?.name} Stream 🏫
            </h2>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relevantColleges.slice(0, 6).map((college) => (
              <div key={college.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">
                    {college.name}
                  </h3>
                  {college.admissionOpen && (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                      Open
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-2">📍 {college.location}</p>
                <p className="text-sm text-gray-600 mb-2">💰 {college.fees}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-yellow-500">⭐</span>
                    <span className="text-sm text-gray-600 ml-1">{college.rating}</span>
                  </div>
                  <Button size="sm" variant="outline">
                    Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Scholarships */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Scholarships for You 💰
            </h2>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {relevantScholarships.slice(0, 3).map((scholarship) => (
              <div key={scholarship.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {scholarship.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-1">
                      {scholarship.eligibility}
                    </p>
                    <p className="text-sm text-red-600">
                      Deadline: {new Date(scholarship.deadline).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600 mb-2">
                      {scholarship.amount}
                    </div>
                    <Button size="sm">
                      Apply
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card hover={true} onClick={() => actions.setCurrentPage('quiz')} className="cursor-pointer">
            <div className="text-center">
              <div className="text-4xl mb-4">🔄</div>
              <h3 className="font-semibold text-gray-900 mb-2">Retake Quiz</h3>
              <p className="text-sm text-gray-600">Update your preferences and get new recommendations</p>
            </div>
          </Card>
          
          <Card hover={true} className="cursor-pointer">
            <div className="text-center">
              <div className="text-4xl mb-4">📞</div>
              <h3 className="font-semibold text-gray-900 mb-2">Career Counseling</h3>
              <p className="text-sm text-gray-600">Get personalized guidance from our experts</p>
            </div>
          </Card>
          
          <Card hover={true} className="cursor-pointer">
            <div className="text-center">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="font-semibold text-gray-900 mb-2">Download App</h3>
              <p className="text-sm text-gray-600">Get notifications and updates on the go</p>
            </div>
          </Card>
        </div>

        {/* Progress Encouragement */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 text-center">
          <div className="text-4xl mb-4">🎉</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            You're on the right track!
          </h3>
          <p className="text-gray-700">
            Your profile is {progress}% complete. Keep exploring to discover more opportunities!
          </p>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;
