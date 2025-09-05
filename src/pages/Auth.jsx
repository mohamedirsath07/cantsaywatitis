import React, { useState } from 'react';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Card from '../components/Card';
import { useApp } from '../context/AppContext';

const Auth = () => {
  const { state, actions } = useApp();
  const [isSignUp, setIsSignUp] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: state.user.name || '',
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    education: '',
    location: '',
    mobile: '',
    profilePicture: ''
  });
  const [errors, setErrors] = useState({});

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

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          profilePicture: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (isSignUp) {
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }

      if (!formData.dateOfBirth) {
        newErrors.dateOfBirth = 'Date of birth is required';
      }

      if (!formData.education.trim()) {
        newErrors.education = 'Education level is required';
      }

      if (!formData.location.trim()) {
        newErrors.location = 'Location is required';
      }

      if (!formData.mobile.trim()) {
        newErrors.mobile = 'Mobile number is required';
      } else if (!/^\d{10}$/.test(formData.mobile.replace(/\D/g, ''))) {
        newErrors.mobile = 'Please enter a valid 10-digit mobile number';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (isSignUp) {
      // Update user info with extended data for sign up
      const userData = {
        ...state.user,
        name: formData.name,
        email: formData.email,
        dateOfBirth: formData.dateOfBirth,
        education: formData.education,
        location: formData.location,
        mobile: formData.mobile,
        profilePicture: formData.profilePicture,
        loginMethod: 'email',
        isLoggedIn: true
      };

      actions.setUserInfo(userData);
      // After sign up with full details, go to profile setup for interests
      actions.setCurrentPage('profile');
    } else {
      // For sign in, just authenticate with email
      const userData = {
        ...state.user,
        email: formData.email,
        loginMethod: 'email',
        isLoggedIn: true
      };

      actions.setUserInfo(userData);
      // After sign in, go to dashboard if profile exists, otherwise profile setup
      actions.setCurrentPage(state.user.name ? 'dashboard' : 'profile');
    }
  };

  const handleSocialLogin = (provider) => {
    setIsLoading(true);
    
    // Simulate loading for social login
    setTimeout(() => {
      // Simulate social login - in real app, integrate with actual OAuth
      const userData = {
        ...state.user,
        name: `${provider} User`, // In real app, get from OAuth response
        email: `user@${provider.toLowerCase()}.example.com`, // In real app, get from OAuth response
        isLoggedIn: true,
        loginMethod: provider
      };

      actions.setUserInfo(userData);
      setIsLoading(false);
      // After social login, redirect to profile setup to complete the information
      actions.setCurrentPage('profile');
    }, 1500); // Simulate network delay
  };

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
    setErrors({});
  };

  return (
    <Layout title={isSignUp ? "Create Account" : "Sign In"}>
      <div className="max-w-md mx-auto">
        <Card>
          <div className="text-center mb-6">
            <div className="text-3xl mb-2">
              {isSignUp ? '🎓' : '👋'}
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {isSignUp ? 'Create Your Account' : 'Welcome Back!'}
            </h2>
            <p className="text-gray-600">
              {isSignUp 
                ? 'Complete your profile to save your quiz results and track your progress'
                : 'Sign in to access your personalized career recommendations'
              }
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <>
                {/* Profile Picture Upload */}
                <div className="text-center">
                  <div className="mb-4">
                    {formData.profilePicture ? (
                      <img 
                        src={formData.profilePicture} 
                        alt="Profile" 
                        className="w-20 h-20 rounded-full mx-auto object-cover border-4 border-blue-200"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full mx-auto bg-gray-200 flex items-center justify-center">
                        <span className="text-2xl">📷</span>
                      </div>
                    )}
                  </div>
                  <label className="cursor-pointer inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    <span>Upload Photo</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleFileUpload}
                      className="sr-only"
                    />
                  </label>
                </div>

                {/* Name */}
                <div>
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter your full name"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="form-label">Date of Birth *</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                  {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
                </div>

                {/* Education */}
                <div>
                  <label className="form-label">Education Level *</label>
                  <select
                    name="education"
                    value={formData.education}
                    onChange={handleInputChange}
                    className="form-input"
                  >
                    <option value="">Select education level</option>
                    <option value="10th Grade">10th Grade</option>
                    <option value="12th Grade">12th Grade</option>
                    <option value="Undergraduate">Undergraduate</option>
                    <option value="Graduate">Graduate</option>
                    <option value="Postgraduate">Postgraduate</option>
                  </select>
                  {errors.education && <p className="text-red-500 text-sm mt-1">{errors.education}</p>}
                </div>

                {/* Location */}
                <div>
                  <label className="form-label">Location *</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="City, State"
                  />
                  {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                </div>

                {/* Mobile */}
                <div>
                  <label className="form-label">Mobile Number *</label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter 10-digit mobile number"
                  />
                  {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
                </div>
              </>
            )}

            {/* Email */}
            <div>
              <label className="form-label">Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="form-label">Password *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter your password"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password (Sign Up only) */}
            {isSignUp && (
              <div>
                <label className="form-label">Confirm Password *</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>
            )}

            {/* Submit Button */}
            <Button type="submit" className="btn-primary btn-lg w-full mt-6">
              <span className="emoji">🚀</span>
              {isSignUp ? 'Create Account' : 'Sign In'}
            </Button>
          </form>

          {/* OR Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <div className="px-4 text-gray-500 text-sm">or</div>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => handleSocialLogin('Google')}
              className="social-login-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="loading-spinner w-5 h-5 mr-3 border-2 border-gray-300 border-t-blue-600 rounded-full"></div>
                  Connecting...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </>
              )}
            </button>
            
            <button
              onClick={() => handleSocialLogin('Facebook')}
              className="social-login-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="loading-spinner w-5 h-5 mr-3 border-2 border-gray-300 border-t-blue-600 rounded-full"></div>
                  Connecting...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-3" fill="#1877F2" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Continue with Facebook
                </>
              )}
            </button>
          </div>

          {/* Toggle Auth Mode */}
          <div className="text-center mt-6 pt-6 border-t border-gray-200">
            <p className="text-gray-600">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
              <button
                onClick={toggleAuthMode}
                className="ml-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Auth;
