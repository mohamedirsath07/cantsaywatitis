import React, { useState } from 'react';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Card from '../components/Card';
import { useApp } from '../context/AppContext';

const Profile = () => {
  const { actions } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    class: '',
    interests: []
  });

  const [errors, setErrors] = useState({});

  const classOptions = [
    { value: '10th', label: 'Class 10th' },
    { value: '11th', label: 'Class 11th' },
    { value: '12th', label: 'Class 12th' },
    { value: 'graduate', label: 'Graduate' }
  ];

  const interestOptions = [
    { value: 'mathematics', label: 'Mathematics', icon: '🔢' },
    { value: 'science', label: 'Science', icon: '🔬' },
    { value: 'technology', label: 'Technology', icon: '💻' },
    { value: 'business', label: 'Business', icon: '💼' },
    { value: 'arts', label: 'Arts', icon: '🎨' },
    { value: 'literature', label: 'Literature', icon: '📚' },
    { value: 'sports', label: 'Sports', icon: '⚽' },
    { value: 'music', label: 'Music', icon: '🎵' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleInterestToggle = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.class) {
      newErrors.class = 'Please select your class';
    }
    
    if (formData.interests.length === 0) {
      newErrors.interests = 'Please select at least one interest';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      actions.setUserInfo(formData);
      actions.setCurrentPage('quiz');
    }
  };

  const handleBack = () => {
    actions.setCurrentPage('welcome');
  };

  return (
    <Layout title="Setup Profile" showProgress={true}>
      <div className="max-w-2xl mx-auto">
        <Card>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Let's Get to Know You! 👋
            </h1>
            <p className="text-gray-600">
              Tell us a bit about yourself so we can provide personalized recommendations
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What's your name? *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.name ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Class Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What class are you in? *
              </label>
              <select
                name="class"
                value={formData.class}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.class ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">Select your class</option>
                {classOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.class && (
                <p className="text-red-500 text-sm mt-1">{errors.class}</p>
              )}
            </div>

            {/* Interests Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What are your interests? * (Select multiple)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {interestOptions.map(option => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleInterestToggle(option.value)}
                    className={`interest-btn ${
                      formData.interests.includes(option.value) ? 'selected' : ''
                    }`}
                  >
                    <span className="emoji">{option.icon}</span>
                    <span className="interest-label">{option.label}</span>
                  </button>
                ))}
              </div>
              {errors.interests && (
                <p className="text-red-500 text-sm mt-1">{errors.interests}</p>
              )}
            </div>

            {/* Submit Buttons */}
            <div className="flex space-x-4 pt-6">
              <Button 
                type="button"
                variant="outline"
                onClick={handleBack}
                className="flex-1"
              >
                Back
              </Button>
              <Button 
                type="submit"
                className="flex-1"
                icon="➡️"
              >
                Continue to Quiz
              </Button>
            </div>
          </form>
        </Card>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Don't worry, you can always update your profile later!
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
