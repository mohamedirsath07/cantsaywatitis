import React from 'react';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Card from '../components/Card';
import { useApp } from '../context/AppContext';

const Welcome = () => {
  const { actions } = useApp();

  const handleGetStarted = () => {
    actions.setCurrentPage('auth');
  };

  const features = [
    {
      icon: "🧭",
      title: "Personalized Guidance",
      description: "Get stream recommendations based on your interests and aptitude"
    },
    {
      icon: "🎯",
      title: "Career Mapping",
      description: "Discover career paths from your chosen stream to dream job"
    },
    {
      icon: "🏫",
      title: "College Finder",
      description: "Find the best colleges and courses near you"
    },
    {
      icon: "💰",
      title: "Scholarship Alerts",
      description: "Stay updated with relevant scholarships and financial aid"
    }
  ];

  return (
    <Layout>
      <div className="text-center">
        {/* Hero Section */}
        <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
          <div className="mb-8">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Your Journey to the 
              <span className="text-blue-600"> Perfect Career</span>
              <br />
              Starts Here! 🚀
            </h1>
            <p className="text-xl text-gray-600" style={{ maxWidth: '32rem', margin: '0 auto' }}>
              CareerCompass is your one-stop personalized career and educational advisor. 
              Discover your ideal stream, explore career paths, and find the perfect colleges - all in one place.
            </p>
          </div>

          <div className="mb-8" style={{ marginBottom: '3rem' }}>
            <Button 
              onClick={handleGetStarted}
              size="lg"
              className="text-xl"
              style={{ padding: '1rem 2rem' }}
              icon="✨"
            >
              Start Your Journey
            </Button>
            <p style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.5rem' }}>
              Takes only 5 minutes • Completely Free
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 mb-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', marginBottom: '4rem' }}>
          {features.map((feature, index) => (
            <Card key={index} hover={true} className="text-center">
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600" style={{ fontSize: '0.875rem' }}>
                {feature.description}
              </p>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div 
          className="rounded-xl p-8 text-white mb-8" 
          style={{ 
            background: 'linear-gradient(135deg, #3b82f6 0%, #7c3aed 100%)',
            borderRadius: '1rem',
            padding: '2rem',
            marginBottom: '4rem'
          }}
        >
          <h2 className="text-2xl font-bold mb-6">Why Choose CareerCompass?</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-3xl font-bold">10,000+</div>
              <div style={{ color: '#ddd6fe' }}>Students Guided</div>
            </div>
            <div>
              <div className="text-3xl font-bold">500+</div>
              <div style={{ color: '#ddd6fe' }}>Colleges Listed</div>
            </div>
            <div>
              <div className="text-3xl font-bold">95%</div>
              <div style={{ color: '#ddd6fe' }}>Satisfaction Rate</div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-8" style={{ marginTop: '4rem' }}>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">How It Works</h2>
          <div className="grid grid-cols-3 gap-6">
            <div className="flex flex-col items-center">
              <div 
                className="rounded" 
                style={{ 
                  width: '4rem', 
                  height: '4rem', 
                  backgroundColor: '#dbeafe', 
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#2563eb',
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  marginBottom: '1rem'
                }}
              >
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Complete Your Profile</h3>
              <p className="text-gray-600 text-center">Tell us about yourself - your name, class, and basic interests</p>
            </div>
            <div className="flex flex-col items-center">
              <div 
                className="rounded" 
                style={{ 
                  width: '4rem', 
                  height: '4rem', 
                  backgroundColor: '#dcfce7', 
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#16a34a',
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  marginBottom: '1rem'
                }}
              >
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Take Aptitude Quiz</h3>
              <p className="text-gray-600 text-center">Answer simple questions to discover your natural strengths and interests</p>
            </div>
            <div className="flex flex-col items-center">
              <div 
                className="rounded" 
                style={{ 
                  width: '4rem', 
                  height: '4rem', 
                  backgroundColor: '#f3e8ff', 
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#7c3aed',
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  marginBottom: '1rem'
                }}
              >
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Personalized Guidance</h3>
              <p className="text-gray-600 text-center">Receive stream recommendations, career paths, and college suggestions</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Welcome;
