import React from 'react';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Card from '../components/Card';
import { useApp } from '../context/AppContext';
import { careerData } from '../data/careerData';
import { getStreamRecommendation, getCareerPaths } from '../utils/quizUtils';

const Results = () => {
  const { state, actions } = useApp();
  const { user, quizResults } = state;

  if (!quizResults.completed) {
    return (
      <Layout title="Quiz Results">
        <div className="text-center">
          <Card className="max-w-md mx-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Please complete the quiz first
            </h2>
            <Button onClick={() => actions.setCurrentPage('quiz')}>
              Take Quiz
            </Button>
          </Card>
        </div>
      </Layout>
    );
  }

  const { recommendedStream, scores, tiedStreams } = quizResults;
  const recommendation = getStreamRecommendation(recommendedStream, scores);
  const careerPath = getCareerPaths(careerData, recommendedStream);

  const handleViewDashboard = () => {
    actions.setCurrentPage('dashboard');
  };

  const handleRetakeQuiz = () => {
    actions.setQuizResults({
      scores: { science: 0, commerce: 0, arts: 0 },
      recommendedStream: null,
      completed: false
    });
    actions.setCurrentPage('quiz');
  };

  return (
    <Layout title="Your Results" showProgress={true}>
      <div className="max-w-4xl mx-auto">
        {/* Congratulations Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Congratulations, {user.name}!
          </h1>
          <p className="text-xl text-gray-600">
            Your personalized career guidance is ready
          </p>
        </div>

        {/* Main Recommendation */}
        <Card className="mb-8 text-center">
          <div className={`text-6xl mb-4`}>{careerPath?.icon}</div>
          <h2 className={`text-3xl font-bold mb-4 ${recommendation.color}`}>
            {recommendation.title}
          </h2>
          <p className="text-lg text-gray-700 mb-6 max-w-3xl mx-auto">
            {recommendation.description}
          </p>

          {/* Score Breakdown */}
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Your Aptitude Scores</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {Object.entries(scores).map(([stream, score]) => (
                <div key={stream} className="text-center">
                  <div className={`text-2xl mb-2 ${
                    stream === 'science' ? 'text-blue-600' :
                    stream === 'commerce' ? 'text-green-600' :
                    'text-purple-600'
                  }`}>
                    {stream === 'science' && '🔬'}
                    {stream === 'commerce' && '💼'}
                    {stream === 'arts' && '🎨'}
                  </div>
                  <div className="font-semibold capitalize">{stream}</div>
                  <div className="text-2xl font-bold">{score}</div>
                </div>
              ))}
            </div>
          </div>

          {tiedStreams && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-yellow-800">
                <strong>Note:</strong> You have similar scores in multiple streams. Consider exploring all of them!
              </p>
            </div>
          )}
        </Card>

        {/* Career Path Details */}
        {careerPath && (
          <Card className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Your Career Path: {careerPath.name}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {careerPath.degrees.map((degree, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    {degree.name}
                  </h3>
                  <p className="text-gray-600 mb-3">Duration: {degree.duration}</p>
                  <div>
                    <p className="font-medium text-gray-700 mb-2">Career Options:</p>
                    <p className="text-gray-600">
                      {degree.careers.join(', ')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Next Steps */}
        <Card className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            What's Next? 🚀
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl mb-4 mx-auto">
                🏫
              </div>
              <h3 className="font-semibold mb-2">Find Colleges</h3>
              <p className="text-gray-600 text-sm">Discover top colleges offering your recommended courses</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-2xl mb-4 mx-auto">
                💰
              </div>
              <h3 className="font-semibold mb-2">Scholarship Alerts</h3>
              <p className="text-gray-600 text-sm">Get notified about relevant scholarships and financial aid</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-2xl mb-4 mx-auto">
                📚
              </div>
              <h3 className="font-semibold mb-2">Study Plans</h3>
              <p className="text-gray-600 text-sm">Get personalized study plans and preparation tips</p>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          {!user.isLoggedIn ? (
            <>
              <Button 
                onClick={() => actions.setCurrentPage('auth')}
                className="flex-1 btn-primary"
                size="lg"
              >
                <span className="emoji">🔐</span>
                Create Account to Save Results
              </Button>
              <Button 
                onClick={handleRetakeQuiz}
                variant="outline"
                className="flex-1"
                size="lg"
              >
                <span className="emoji">🔄</span>
                Retake Quiz
              </Button>
            </>
          ) : (
            <>
              <Button 
                onClick={handleViewDashboard}
                className="flex-1"
                size="lg"
                icon="📊"
              >
                View Dashboard
              </Button>
              <Button 
                onClick={handleRetakeQuiz}
                variant="outline"
                className="flex-1"
                size="lg"
              >
                Retake Quiz
              </Button>
            </>
          )}
        </div>

        {/* Save Results Prompt for Non-Logged Users */}
        {!user.isLoggedIn && (
          <Card className="bg-blue-50 border-blue-200 mt-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                💡 Don't Lose Your Results!
              </h3>
              <p className="text-blue-800 mb-4">
                Create a free account to save your quiz results, track your progress, 
                and get personalized recommendations for colleges and scholarships.
              </p>
              <Button 
                onClick={() => actions.setCurrentPage('auth')}
                className="btn-primary"
              >
                <span className="emoji">🚀</span>
                Create Free Account
              </Button>
            </div>
          </Card>
        )}

        {/* Encouragement Message */}
        <div className="text-center mt-8">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
            <p className="text-lg text-gray-700">
              🌟 <strong>Remember:</strong> This is just the beginning of your journey. 
              Your interests and goals may evolve, and that's perfectly normal! 
              Use this as a guide, but always follow your passion.
            </p>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Results;
