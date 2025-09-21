import React, { useState } from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import { useApp } from '../context/AppContext';

const Profile = () => {
  const { actions } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    class: '',
    board: '',
    stream: '',
    email: '',
    phoneNumber: '',
    location: '',
    interests: []
  });

  const [errors, setErrors] = useState({});

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

  // 10th Class Roadmap - All streams available in India
  const tenthClassRoadmap = [
    {
      stream: 'Science (PCM)',
      subjects: ['Physics', 'Chemistry', 'Mathematics', 'English'],
      careers: ['Engineering', 'Architecture', 'Computer Science', 'Data Science', 'Robotics'],
      description: 'Perfect for students interested in technology, engineering, and mathematical problem-solving'
    },
    {
      stream: 'Science (PCB)',
      subjects: ['Physics', 'Chemistry', 'Biology', 'English'],
      careers: ['Medicine', 'Pharmacy', 'Biotechnology', 'Nursing', 'Veterinary Science'],
      description: 'Ideal for students passionate about life sciences and healthcare'
    },
    {
      stream: 'Science (PCMB)',
      subjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'English'],
      careers: ['Medicine', 'Engineering', 'Biotechnology', 'Bioinformatics', 'Research'],
      description: 'Maximum flexibility - keeps both engineering and medical options open'
    },
    {
      stream: 'Commerce',
      subjects: ['Accountancy', 'Business Studies', 'Economics', 'Mathematics/Computer Science'],
      careers: ['CA', 'CS', 'Banking', 'Finance', 'Business Management', 'Entrepreneurship'],
      description: 'Perfect for future business leaders and finance professionals'
    },
    {
      stream: 'Humanities/Arts',
      subjects: ['History', 'Geography', 'Political Science', 'Economics', 'Literature'],
      careers: ['Civil Services', 'Law', 'Journalism', 'Psychology', 'Teaching', 'Social Work'],
      description: 'For students interested in society, culture, and human behavior'
    }
  ];

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
    <div className="min-h-screen py-8" style={{ background: 'linear-gradient(135deg, #eff6ff 0%, #ffffff 50%, #f3e8ff 100%)' }}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="profile-form">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Let's Get to Know You! 👋
            </h1>
            <p className="text-gray-600 text-lg">
              Tell us a bit about yourself so we can provide personalized recommendations
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information Section */}
            <div className="form-section">
              <h3 className="form-section-title">Personal Information</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Name Input */}
                <div className="form-group">
                  <label className="form-label">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`form-input ${
                      errors.name ? 'border-red-500' : ''
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-2">{errors.name}</p>
                  )}
                </div>

                {/* Date of Birth */}
                <div className="form-group">
                  <label className="form-label">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className={`form-input ${
                      errors.dateOfBirth ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.dateOfBirth && (
                    <p className="text-red-500 text-sm mt-2">{errors.dateOfBirth}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Academic Information Section */}
            <div className="form-section">
              <h3 className="form-section-title">Academic Information</h3>
              
              {/* Class Selection */}
              <div className="form-group">
                <label className="form-label">
                  What class are you in? *
                </label>
                <select
                  name="class"
                  value={formData.class}
                  onChange={handleInputChange}
                  className={`form-select lg:w-1/2 ${
                    errors.class ? 'border-red-500' : ''
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
                  <p className="text-red-500 text-sm mt-2">{errors.class}</p>
                )}
              </div>

              {/* Board and Stream Selection for 11th/12th */}
              {(formData.class === '11th' || formData.class === '12th') && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Board Selection */}
                    <div className="form-group">
                      <label className="form-label">
                        Select Your Board *
                      </label>
                      <select
                        name="board"
                        value={formData.board}
                        onChange={handleInputChange}
                        className={`form-select ${
                          errors.board ? 'border-red-500' : ''
                        }`}
                      >
                        <option value="">Select your board</option>
                        {boardOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      {errors.board && (
                        <p className="text-red-500 text-sm mt-2">{errors.board}</p>
                      )}
                    </div>

                    {/* Stream Selection */}
                    {formData.board && (
                      <div className="form-group">
                        <label className="form-label">
                          Select Your Stream *
                        </label>
                        <select
                          name="stream"
                          value={formData.stream}
                          onChange={handleInputChange}
                          className={`form-select ${
                            errors.stream ? 'border-red-500' : ''
                          }`}
                        >
                          <option value="">Select your stream</option>
                          {getAvailableStreams().map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        {errors.stream && (
                          <p className="text-red-500 text-sm mt-2">{errors.stream}</p>
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

              {/* 10th Class Roadmap */}
              {formData.class === '10th' && (
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <h4 className="text-xl font-semibold text-blue-900 mb-4">
                    🗺️ Your Stream Selection Roadmap for Class 11th
                  </h4>
                  <p className="text-blue-700 mb-6">
                    Based on your interests and career goals, here are the available streams in India:
                  </p>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {tenthClassRoadmap.map((roadmap, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg border border-blue-200 shadow-sm">
                        <h5 className="font-semibold text-blue-800 mb-2">{roadmap.stream}</h5>
                        <p className="text-sm text-gray-600 mb-3">{roadmap.description}</p>
                        
                        <div className="mb-3">
                          <span className="text-xs font-medium text-gray-700">Core Subjects:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {roadmap.subjects.map((subject, idx) => (
                              <span key={idx} className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
                                {subject}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <span className="text-xs font-medium text-gray-700">Career Options:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {roadmap.careers.map((career, idx) => (
                              <span key={idx} className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                                {career}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-yellow-100 rounded-lg border border-yellow-200">
                    <p className="text-sm text-yellow-800">
                      💡 <strong>Tip:</strong> Take our aptitude quiz after completing this profile to get personalized stream recommendations based on your interests and abilities!
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Contact Information Section */}
            <div className="form-section">
              <h3 className="form-section-title">Contact Information</h3>
              
              <div className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Email Input */}
                  <div className="form-group">
                    <label className="form-label">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`form-input ${
                        errors.email ? 'border-red-500' : ''
                      }`}
                      placeholder="Enter your email address"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-2">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone Number Input */}
                  <div className="form-group">
                    <label className="form-label">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className={`form-input ${
                        errors.phoneNumber ? 'border-red-500' : ''
                      }`}
                      placeholder="Enter your 10-digit phone number"
                    />
                    {errors.phoneNumber && (
                      <p className="text-red-500 text-sm mt-2">{errors.phoneNumber}</p>
                    )}
                  </div>
                </div>

                {/* Location Input */}
                <div className="form-group">
                  <label className="form-label">
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className={`form-input lg:w-1/2 ${
                      errors.location ? 'border-red-500' : ''
                    }`}
                    placeholder="Enter your city, state"
                  />
                  {errors.location && (
                    <p className="text-red-500 text-sm mt-2">{errors.location}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 pt-8">
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
                {formData.class === '10th' ? 'Take Aptitude Quiz' : 'Continue to Quiz'}
              </Button>
            </div>
          </form>
        </div>

        {/* Help Text */}
        <div className="mt-8 text-center">
          <p className="text-gray-500">
            {formData.class === '10th' 
              ? "Complete the quiz to get personalized stream recommendations for Class 11th!" 
              : "Don't worry, you can always update your profile later!"
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
