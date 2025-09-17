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
    class: user.class || '',
    board: user.board || '',
    stream: user.stream || '',
    email: user.email || '',
    phoneNumber: user.phoneNumber || user.mobile || '',
    location: user.location || '',
    interests: user.interests || []
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const classOptions = [
    { value: '10th', label: 'Class 10th' },
    { value: '11th', label: 'Class 11th' },
    { value: '12th', label: 'Class 12th' },
    { value: 'graduate', label: 'Graduate' }
  ];

  // Indian Education Boards (Alphabetically Sorted)
  const boardOptions = [
    { value: 'state-andhra', label: 'Andhra Pradesh State Board' },
    { value: 'state-assam', label: 'Assam Higher Secondary Education Council' },
    { value: 'state-bihar', label: 'Bihar School Examination Board' },
    { value: 'state-haryana', label: 'Board of School Education Haryana' },
    { value: 'state-odisha', label: 'Board of Secondary Education Odisha' },
    { value: 'state-rajasthan', label: 'Board of Secondary Education Rajasthan' },
    { value: 'cbse', label: 'CBSE (Central Board of Secondary Education)' },
    { value: 'state-chhattisgarh', label: 'Chhattisgarh Board of Secondary Education' },
    { value: 'state-manipur', label: 'Council of Higher Secondary Education Manipur' },
    { value: 'state-delhi', label: 'Delhi Board of School Education' },
    { value: 'state-goa', label: 'Goa Board of Secondary & Higher Secondary Education' },
    { value: 'state-gujarat', label: 'Gujarat Secondary & Higher Secondary Education Board' },
    { value: 'state-himachal', label: 'Himachal Pradesh Board of School Education' },
    { value: 'icse', label: 'ICSE (Indian Certificate of Secondary Education)' },
    { value: 'state-jharkhand', label: 'Jharkhand Academic Council' },
    { value: 'state-karnataka', label: 'Karnataka Secondary Education Examination Board' },
    { value: 'state-kerala', label: 'Kerala Board of Higher Secondary Education' },
    { value: 'state-madhya', label: 'Madhya Pradesh Board of Secondary Education' },
    { value: 'state-maharashtra', label: 'Maharashtra State Board of Secondary Education' },
    { value: 'state-meghalaya', label: 'Meghalaya Board of School Education' },
    { value: 'state-mizoram', label: 'Mizoram Board of School Education' },
    { value: 'state-nagaland', label: 'Nagaland Board of School Education' },
    { value: 'state-punjab', label: 'Punjab School Education Board' },
    { value: 'state-sikkim', label: 'Sikkim Board of Secondary Education' },
    { value: 'state-tamil', label: 'Tamil Nadu State Board' },
    { value: 'state-telangana', label: 'Telangana State Board of Intermediate Education' },
    { value: 'state-tripura', label: 'Tripura Board of Secondary Education' },
    { value: 'state-up', label: 'Uttar Pradesh Madhyamik Shiksha Parishad' },
    { value: 'state-uttarakhand', label: 'Uttarakhand Board of School Education' },
    { value: 'state-west', label: 'West Bengal Board of Secondary Education' }
  ];

  // Stream options based on board
  const streamOptions = {
    'cbse': [
      { value: 'science-pcm', label: 'Science (Physics, Chemistry, Mathematics)' },
      { value: 'science-pcb', label: 'Science (Physics, Chemistry, Biology)' },
      { value: 'science-pcmb', label: 'Science (Physics, Chemistry, Mathematics, Biology)' },
      { value: 'commerce', label: 'Commerce' },
      { value: 'humanities', label: 'Humanities/Arts' }
    ],
    'icse': [
      { value: 'science', label: 'Science Stream' },
      { value: 'commerce', label: 'Commerce Stream' },
      { value: 'arts', label: 'Arts Stream' }
    ],
    // State boards have similar streams with slight variations
    'default': [
      { value: 'science', label: 'Science Stream' },
      { value: 'commerce', label: 'Commerce Stream' },
      { value: 'arts', label: 'Arts/Humanities Stream' }
    ]
  };

  // Stream-based interest options
  const interestOptionsByStream = {
    'science-pcm': [
      { value: 'mathematics', label: 'Advanced Mathematics', icon: '🔢' },
      { value: 'physics', label: 'Physics & Research', icon: '⚛️' },
      { value: 'engineering', label: 'Engineering Design', icon: '⚙️' },
      { value: 'technology', label: 'Technology Innovation', icon: '💻' },
      { value: 'robotics', label: 'Robotics & AI', icon: '🤖' },
      { value: 'space', label: 'Space Science', icon: '🚀' }
    ],
    'science-pcb': [
      { value: 'biology', label: 'Life Sciences', icon: '🧬' },
      { value: 'medicine', label: 'Medical Sciences', icon: '⚕️' },
      { value: 'research', label: 'Scientific Research', icon: '🔬' },
      { value: 'environment', label: 'Environmental Science', icon: '🌱' },
      { value: 'genetics', label: 'Genetics & Biotechnology', icon: '🧪' },
      { value: 'nutrition', label: 'Health & Nutrition', icon: '🍎' }
    ],
    'science-pcmb': [
      { value: 'mathematics', label: 'Mathematics', icon: '🔢' },
      { value: 'physics', label: 'Physics', icon: '⚛️' },
      { value: 'biology', label: 'Biology', icon: '🧬' },
      { value: 'medicine', label: 'Medical Science', icon: '⚕️' },
      { value: 'engineering', label: 'Engineering', icon: '⚙️' },
      { value: 'research', label: 'Scientific Research', icon: '🔬' }
    ],
    'science': [
      { value: 'physics', label: 'Physics', icon: '⚛️' },
      { value: 'chemistry', label: 'Chemistry', icon: '🧪' },
      { value: 'mathematics', label: 'Mathematics', icon: '🔢' },
      { value: 'biology', label: 'Biology', icon: '🧬' },
      { value: 'technology', label: 'Technology', icon: '💻' },
      { value: 'research', label: 'Research', icon: '🔬' }
    ],
    'commerce': [
      { value: 'business', label: 'Business Management', icon: '💼' },
      { value: 'finance', label: 'Finance & Banking', icon: '💰' },
      { value: 'accounting', label: 'Accounting', icon: '📊' },
      { value: 'economics', label: 'Economics', icon: '📈' },
      { value: 'entrepreneurship', label: 'Entrepreneurship', icon: '🚀' },
      { value: 'marketing', label: 'Marketing & Sales', icon: '📢' }
    ],
    'humanities': [
      { value: 'literature', label: 'Literature', icon: '📚' },
      { value: 'history', label: 'History', icon: '🏛️' },
      { value: 'psychology', label: 'Psychology', icon: '🧠' },
      { value: 'sociology', label: 'Sociology', icon: '👥' },
      { value: 'politics', label: 'Political Science', icon: '🏛️' },
      { value: 'arts', label: 'Creative Arts', icon: '🎨' }
    ],
    'arts': [
      { value: 'literature', label: 'Literature', icon: '📚' },
      { value: 'history', label: 'History', icon: '🏛️' },
      { value: 'arts', label: 'Creative Arts', icon: '🎨' },
      { value: 'music', label: 'Music', icon: '🎵' },
      { value: 'psychology', label: 'Psychology', icon: '🧠' },
      { value: 'social-work', label: 'Social Work', icon: '🤝' }
    ]
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Reset dependent fields when class changes
    if (name === 'class') {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        board: '',
        stream: ''
      }));
    }

    // Reset stream when board changes
    if (name === 'board') {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        stream: '',
        interests: []
      }));
    }

    // Reset interests when stream changes
    if (name === 'stream') {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        interests: []
      }));
    }
    
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

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }
    
    if (!formData.class) {
      newErrors.class = 'Please select your class';
    }

    // Board and stream validation for 11th/12th
    if ((formData.class === '11th' || formData.class === '12th') && !formData.board) {
      newErrors.board = 'Please select your board';
    }

    if ((formData.class === '11th' || formData.class === '12th') && !formData.stream) {
      newErrors.stream = 'Please select your stream';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phoneNumber.replace(/\D/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    // Interest validation for 11th/12th students who have selected a stream
    if ((formData.class === '11th' || formData.class === '12th') && formData.stream && formData.interests.length === 0) {
      newErrors.interests = 'Please select at least one area of interest';
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

  // Get available streams based on selected board
  const getAvailableStreams = () => {
    if (!formData.board) return [];
    return streamOptions[formData.board] || streamOptions['default'];
  };

  // Get available interests based on selected stream
  const getAvailableInterests = () => {
    if (!formData.stream) return [];
    return interestOptionsByStream[formData.stream] || [];
  };

  return (
    <Layout title="Edit Profile">
      <div className="max-w-6xl mx-auto px-4">
        <Card>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Edit Your Profile ✏️
            </h1>
            <p className="text-gray-600">
              Update your information to get better personalized recommendations
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information Section */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Personal Information</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Name Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.name ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter your full name"
                    disabled={isLoading}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.dateOfBirth ? 'border-red-300' : 'border-gray-300'
                    }`}
                    disabled={isLoading}
                  />
                  {errors.dateOfBirth && (
                    <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Academic Information Section */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Academic Information</h3>
              
              {/* Class Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What class are you in? *
                </label>
                <select
                  name="class"
                  value={formData.class}
                  onChange={handleInputChange}
                  className={`w-full lg:w-1/2 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.class ? 'border-red-300' : 'border-gray-300'
                  }`}
                  disabled={isLoading}
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

              {/* Board and Stream Selection for 11th/12th */}
              {(formData.class === '11th' || formData.class === '12th') && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Board Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Your Board *
                      </label>
                      <select
                        name="board"
                        value={formData.board}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                          errors.board ? 'border-red-300' : 'border-gray-300'
                        }`}
                        disabled={isLoading}
                      >
                        <option value="">Select your board</option>
                        {boardOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      {errors.board && (
                        <p className="text-red-500 text-sm mt-1">{errors.board}</p>
                      )}
                    </div>

                    {/* Stream Selection */}
                    {formData.board && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Select Your Stream *
                        </label>
                        <select
                          name="stream"
                          value={formData.stream}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                            errors.stream ? 'border-red-300' : 'border-gray-300'
                          }`}
                          disabled={isLoading}
                        >
                          <option value="">Select your stream</option>
                          {getAvailableStreams().map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        {errors.stream && (
                          <p className="text-red-500 text-sm mt-1">{errors.stream}</p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Interest Selection for 11th/12th with stream */}
                  {formData.stream && getAvailableInterests().length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Areas of Interest * (Select multiple that match your passion)
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {getAvailableInterests().map(option => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => handleInterestToggle(option.value)}
                            className={`p-3 border-2 rounded-lg text-center transition-all duration-200 ${
                              formData.interests.includes(option.value)
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                            }`}
                            disabled={isLoading}
                          >
                            <div className="text-2xl mb-1">{option.icon}</div>
                            <div className="text-sm font-medium">{option.label}</div>
                          </button>
                        ))}
                      </div>
                      {errors.interests && (
                        <p className="text-red-500 text-sm mt-2">{errors.interests}</p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Contact Information Section */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Email Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                        errors.email ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Enter your email address"
                      disabled={isLoading}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone Number Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                        errors.phoneNumber ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Enter your 10-digit phone number"
                      disabled={isLoading}
                    />
                    {errors.phoneNumber && (
                      <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
                    )}
                  </div>
                </div>

                {/* Location Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className={`w-full lg:w-1/2 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.location ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter your city, state"
                    disabled={isLoading}
                  />
                  {errors.location && (
                    <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button 
                type="submit"
                className="flex-1"
                disabled={isLoading}
                icon={isLoading ? "⏳" : "💾"}
              >
                {isLoading ? 'Saving Changes...' : 'Save Changes'}
              </Button>
              <Button 
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="flex-1"
                disabled={isLoading}
              >
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
                disabled={isLoading}
              >
                🚪 Logout
              </Button>
            </div>
          </div>
        </Card>

        {/* Privacy Information Card */}
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
