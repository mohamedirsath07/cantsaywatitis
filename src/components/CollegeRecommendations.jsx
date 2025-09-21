import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import collegeDataService from '../services/collegeDataService';

const CollegeRecommendations = () => {
  const { state } = useApp();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userPreferences, setUserPreferences] = useState({
    preferredStates: [],
    preferredStreams: [],
    maxBudget: 1000000,
    marks: 0,
    managementPreference: ''
  });

  useEffect(() => {
    loadRecommendations();
  }, [userPreferences]);

  const loadRecommendations = async () => {
    try {
      await collegeDataService.initialize();
      
      // Get user profile from context or create default
      const userProfile = {
        ...userPreferences,
        // Use quiz results if available
        marks: state.user?.quizResults?.totalScore || userPreferences.marks,
        // Use profile preferences if available
        preferredStreams: state.user?.preferences?.interestedFields || userPreferences.preferredStreams
      };

      const recs = collegeDataService.getRecommendations(userProfile);
      setRecommendations(recs);
      setLoading(false);
    } catch (error) {
      console.error('Error loading recommendations:', error);
      setLoading(false);
    }
  };

  const updatePreferences = (key, value) => {
    setUserPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleStateToggle = (stateName) => {
    setUserPreferences(prev => ({
      ...prev,
      preferredStates: prev.preferredStates.includes(stateName)
        ? prev.preferredStates.filter(s => s !== stateName)
        : [...prev.preferredStates, stateName]
    }));
  };

  const handleStreamToggle = (stream) => {
    setUserPreferences(prev => ({
      ...prev,
      preferredStreams: prev.preferredStreams.includes(stream)
        ? prev.preferredStreams.filter(s => s !== stream)
        : [...prev.preferredStreams, stream]
    }));
  };

  const formatFee = (fee) => {
    if (typeof fee === 'string') return fee;
    if (fee >= 100000) return `₹${(fee / 100000).toFixed(1)} Lakhs`;
    return `₹${fee.toLocaleString()}`;
  };

  const getMatchPercentage = (college) => {
    let matchScore = 0;
    let totalCriteria = 0;

    // Check state preference
    if (userPreferences.preferredStates.length > 0) {
      totalCriteria++;
      if (userPreferences.preferredStates.includes(college.state)) {
        matchScore++;
      }
    }

    // Check stream preference
    if (userPreferences.preferredStreams.length > 0) {
      totalCriteria++;
      if (userPreferences.preferredStreams.includes(college.category)) {
        matchScore++;
      }
    }

    // Check budget
    totalCriteria++;
    if (college.feeAmount <= userPreferences.maxBudget) {
      matchScore++;
    }

    // Check management type
    if (userPreferences.managementPreference) {
      totalCriteria++;
      if (college.managementType.toLowerCase().includes(userPreferences.managementPreference.toLowerCase())) {
        matchScore++;
      }
    }

    return totalCriteria > 0 ? Math.round((matchScore / totalCriteria) * 100) : 85;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading personalized recommendations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🎯 Personalized College Recommendations
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Based on your preferences and profile, here are the best college matches for you.
          </p>
        </div>

        {/* Preferences Panel */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Preferences</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Preferred States */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Preferred States</label>
                <div className="flex flex-wrap gap-2">
                  {['Tamil Nadu', 'Karnataka', 'Maharashtra', 'West Bengal', 'Rajasthan', 'Gujarat', 'Kerala', 'Uttar Pradesh'].map(state => (
                    <button
                      key={state}
                      onClick={() => handleStateToggle(state)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        userPreferences.preferredStates.includes(state)
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {state}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preferred Streams */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Preferred Streams</label>
                <div className="flex flex-wrap gap-2">
                  {['Engineering', 'Medical', 'Science', 'Commerce', 'Architecture'].map(stream => (
                    <button
                      key={stream}
                      onClick={() => handleStreamToggle(stream)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        userPreferences.preferredStreams.includes(stream)
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {stream}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Budget */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Budget (₹)</label>
                <select
                  value={userPreferences.maxBudget}
                  onChange={(e) => updatePreferences('maxBudget', parseInt(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={50000}>Under ₹50,000</option>
                  <option value={100000}>Under ₹1 Lakh</option>
                  <option value={500000}>Under ₹5 Lakhs</option>
                  <option value={1000000}>Under ₹10 Lakhs</option>
                  <option value={5000000}>No Budget Limit</option>
                </select>
              </div>

              {/* Marks */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Marks/Score</label>
                <input
                  type="number"
                  value={userPreferences.marks}
                  onChange={(e) => updatePreferences('marks', parseInt(e.target.value) || 0)}
                  placeholder="Enter your marks (optional)"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Management Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Management Preference</label>
                <select
                  value={userPreferences.managementPreference}
                  onChange={(e) => updatePreferences('managementPreference', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">No Preference</option>
                  <option value="Government">Government</option>
                  <option value="Central Government">Central Government</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Recommended Colleges ({recommendations.length})
          </h2>
          <p className="text-gray-600">
            Colleges ranked by how well they match your preferences and profile.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {recommendations.map((college, index) => {
            const matchPercentage = getMatchPercentage(college);
            return (
              <div key={college.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                {/* College Header with Match Percentage */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white relative">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold">{college.name}</h3>
                        {college.rating && (
                          <div className="flex items-center bg-yellow-400 text-yellow-900 px-2 py-1 rounded-lg">
                            <span className="mr-1">⭐</span>
                            <span className="text-sm font-semibold">{college.rating}</span>
                          </div>
                        )}
                      </div>
                      <p className="text-blue-100 flex items-center">
                        📍 {college.location}, {college.state}
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center">
                        <span className="text-lg font-bold">{matchPercentage}%</span>
                      </div>
                      <p className="text-xs mt-1">Match</p>
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold">
                      #{index + 1} Recommended
                    </span>
                  </div>
                </div>

                {/* College Details */}
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Stream</p>
                      <p className="font-semibold text-gray-800">{college.stream}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Category</p>
                      <p className="font-semibold text-gray-800">{college.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Fee</p>
                      <p className="font-semibold text-green-600">{college.fee}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Seats</p>
                      <p className="font-semibold text-gray-800">{college.seats}</p>
                    </div>
                  </div>

                  {/* Why This College */}
                  <div className="bg-green-50 p-4 rounded-lg mb-4">
                    <h4 className="text-sm font-semibold text-green-800 mb-2">Why this college matches you:</h4>
                    <ul className="text-xs text-green-700 space-y-1">
                      {userPreferences.preferredStates.includes(college.state) && (
                        <li>✓ Located in your preferred state: {college.state}</li>
                      )}
                      {userPreferences.preferredStreams.includes(college.category) && (
                        <li>✓ Offers your preferred stream: {college.category}</li>
                      )}
                      {college.feeAmount <= userPreferences.maxBudget && (
                        <li>✓ Within your budget range</li>
                      )}
                      {college.managementType === "Government" && (
                        <li>✓ Government college with quality education</li>
                      )}
                      {college.seats > 500 && (
                        <li>✓ Good number of seats available</li>
                      )}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors font-medium">
                      View Details
                    </button>
                    <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      ⭐
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* No Recommendations */}
        {recommendations.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">No recommendations found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your preferences to get personalized recommendations</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollegeRecommendations;