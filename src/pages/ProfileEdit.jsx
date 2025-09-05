import React, { useState } from 'react';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Card from '../components/Card';
import { useApp } from '../context/AppContext';

const ProfileEdit = () => {
  const { state, actions } = useApp();
  const { user } = state;
  const [formData, setFormData] = useState({
    name: user.name || '',
    dateOfBirth: user.dateOfBirth || '',
    location: user.location || '',
    email: user.email || '',
    mobile: user.mobile || ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobile.replace(/\D/g, ''))) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Update user info
      const updatedUserData = {
        ...user,
        ...formData
      };

      actions.setUserInfo(updatedUserData);
      setIsLoading(false);
      
      // Redirect back to dashboard
      actions.setCurrentPage('dashboard');
    }, 1000);
  };

  const handleCancel = () => {
    actions.setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      actions.resetState();
      actions.setCurrentPage('welcome');
    }
  };

  return (
    <Layout title="Edit Profile">
      <div className="max-w-2xl mx-auto">
        <Card>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Edit Profile</h2>
              <p className="text-gray-600 mt-1">Update your personal information</p>
            </div>
            <div className="text-4xl">✏️</div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="form-label">
                <span className="emoji">👤</span>
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter your full name"
                disabled={isLoading}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Date of Birth */}
            <div>
              <label className="form-label">
                <span className="emoji">🎂</span>
                Date of Birth *
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="form-input"
                disabled={isLoading}
              />
              {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
            </div>

            {/* Location */}
            <div>
              <label className="form-label">
                <span className="emoji">📍</span>
                Location *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="form-input"
                placeholder="City, State, Country"
                disabled={isLoading}
              />
              {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="form-label">
                <span className="emoji">✉️</span>
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter your email"
                disabled={isLoading}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Phone Number */}
            <div>
              <label className="form-label">
                <span className="emoji">📱</span>
                Phone Number *
              </label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter 10-digit mobile number"
                disabled={isLoading}
              />
              {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              <Button 
                type="submit" 
                className="flex-1 btn-primary"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="emoji">⏳</span>
                ) : (
                  <span className="emoji">💾</span>
                )}
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
              
              <Button 
                type="button" 
                onClick={handleCancel}
                className="flex-1 btn-outline"
                disabled={isLoading}
              >
                <span className="emoji">❌</span>
                Cancel
              </Button>
            </div>
          </form>

          {/* Logout Section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Account Settings</h3>
                <p className="text-sm text-gray-600 mt-1">Manage your account preferences</p>
              </div>
              <Button 
                onClick={handleLogout}
                className="btn-outline text-red-600 border-red-300 hover:bg-red-50 hover:border-red-400"
              >
                <span className="emoji">🚪</span>
                Logout
              </Button>
            </div>
          </div>
        </Card>

        {/* Account Information Card */}
        <Card className="mt-6 bg-blue-50 border-blue-200">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              🔒 Your Privacy Matters
            </h3>
            <p className="text-blue-800 text-sm">
              Your personal information is securely stored and will only be used to provide 
              personalized career recommendations. We never share your data with third parties.
            </p>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default ProfileEdit;
