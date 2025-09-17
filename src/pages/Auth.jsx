import React, { useState } from 'react';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Card from '../components/Card';
import { useApp } from '../context/AppContext';

const Auth = () => {
  const { state, actions } = useApp();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
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
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
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

    // Simulate authentication
    const userData = {
      ...state.user,
      email: formData.email,
      loginMethod: 'email',
      isLoggedIn: true
    };

    actions.setUserInfo(userData);
    // Redirect to profile setup
    actions.setCurrentPage('profile');
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    
    if (!formData.email.trim()) {
      setErrors({ email: 'Please enter your email address' });
      return;
    }

    alert(`Password reset link sent to ${formData.email}`);
    setShowForgotPassword(false);
  };

  const handleSocialLogin = (provider) => {
    setIsLoading(true);
    
    // Simulate loading for social login
    setTimeout(() => {
      const userData = {
        ...state.user,
        name: `${provider} User`,
        email: `user@${provider.toLowerCase()}.example.com`,
        isLoggedIn: true,
        loginMethod: provider
      };

      actions.setUserInfo(userData);
      setIsLoading(false);
      // Redirect to profile setup
      actions.setCurrentPage('profile');
    }, 1500);
  };

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
    setErrors({});
    setShowForgotPassword(false);
  };

  return (
    <Layout title={showForgotPassword ? "Reset Password" : (isSignUp ? "Create Account" : "Sign In")}>
      <div className="max-w-md mx-auto">
        <Card>
          <div className="text-center mb-6">
            <div className="text-3xl mb-2">
              {showForgotPassword ? '🔐' : (isSignUp ? '🎓' : '👋')}
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {showForgotPassword ? 'Reset Your Password' : (isSignUp ? 'Create Your Account' : 'Welcome Back!')}
            </h2>
            <p className="text-gray-600">
              {showForgotPassword 
                ? 'Enter your email to receive a password reset link'
                : (isSignUp 
                  ? 'Sign up to save your quiz results and track your progress'
                  : 'Sign in to access your personalized career recommendations'
                )
              }
            </p>
          </div>

          {showForgotPassword ? (
            // Forgot Password Form
            <form onSubmit={handleForgotPassword} className="space-y-4">
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

              <div className="text-center">
                <Button type="submit" className="btn-primary btn-lg w-full">
                  <span className="emoji">📧</span>
                  Send Reset Link
                </Button>
              </div>

              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(false)}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Back to Sign In
                </button>
              </div>
            </form>
          ) : (
            // Main Auth Form
            <>
              <form onSubmit={handleSubmit} className="space-y-4">
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

                {/* Forgot Password Link (Sign In only) */}
                {!isSignUp && (
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setShowForgotPassword(true)}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      Forgot Password?
                    </button>
                  </div>
                )}

                {/* Submit Button */}
                <div className="flex justify-center mt-6">
                  <Button type="submit" className="btn-primary btn-lg w-full">
                    <span className="emoji">🚀</span>
                    {isSignUp ? 'Create Account' : 'Sign In'}
                  </Button>
                </div>
              </form>

              {/* OR Divider */}
              <div className="flex items-center justify-center my-6">
                <div className="flex-1 border-t border-gray-300"></div>
                <div className="px-4 text-gray-500 text-sm text-center">or</div>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>

              {/* Google Login Button */}
              <div className="flex justify-center">
                <button
                  onClick={() => handleSocialLogin('Google')}
                  className="social-login-btn w-full"
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
            </>
          )}
        </Card>
      </div>
    </Layout>
  );
};

export default Auth;
