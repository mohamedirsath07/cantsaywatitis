import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import csvCollegeService from '../services/csvCollegeService';

const StreamColleges = () => {
  const { userProfile, quizResults } = useAppContext();
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStream, setSelectedStream] = useState('');
  const [availableStreams, setAvailableStreams] = useState([]);
  const [feeStats, setFeeStats] = useState(null);

  useEffect(() => {
    loadColleges();
    loadAvailableStreams();
  }, []);

  const loadAvailableStreams = async () => {
    try {
      const streams = await csvCollegeService.getAvailableStreams();
      setAvailableStreams(streams);
    } catch (error) {
      console.error('Error loading streams:', error);
    }
  };

  const loadColleges = async () => {
    setLoading(true);
    try {
      // Determine stream based on quiz results or user profile
      let stream = '';
      
      if (quizResults && quizResults.recommendations && quizResults.recommendations.length > 0) {
        // Use the first recommendation from quiz results
        stream = quizResults.recommendations[0].field || '';
      } else if (userProfile && userProfile.interests) {
        // Use user interests
        stream = userProfile.interests[0] || '';
      }

      // Default stream if none found
      if (!stream) {
        stream = 'engineering'; // Default to engineering
      }

      setSelectedStream(stream);
      
      const streamColleges = await csvCollegeService.getCollegesByStream(stream);
      setColleges(streamColleges);

      // Get fee statistics
      const stats = await csvCollegeService.getFeeStatistics(stream);
      setFeeStats(stats);

    } catch (error) {
      console.error('Error loading colleges:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStreamChange = async (newStream) => {
    setSelectedStream(newStream);
    setLoading(true);
    
    try {
      const streamColleges = await csvCollegeService.getCollegesByStream(newStream);
      setColleges(streamColleges);

      const stats = await csvCollegeService.getFeeStatistics(newStream);
      setFeeStats(stats);
    } catch (error) {
      console.error('Error loading colleges for stream:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading colleges...</p>
          </div>
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
            🎓 Colleges for Your Stream
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive list of government colleges based on your recommended career path
          </p>
        </div>

        {/* Stream Selector */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">Select Stream</h2>
            {feeStats && (
              <div className="text-sm text-gray-600">
                Fee Range: ₹{feeStats.min.toLocaleString()} - ₹{feeStats.max.toLocaleString()}
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {availableStreams.map(stream => (
              <button
                key={stream}
                onClick={() => handleStreamChange(stream)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedStream.toLowerCase().includes(stream.toLowerCase()) ||
                  stream.toLowerCase().includes(selectedStream.toLowerCase())
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {stream}
              </button>
            ))}
          </div>
        </div>

        {/* Statistics */}
        {feeStats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl p-4 shadow-lg">
              <h3 className="text-sm font-medium text-gray-500">Total Colleges</h3>
              <p className="text-2xl font-bold text-blue-600">{colleges.length}</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-lg">
              <h3 className="text-sm font-medium text-gray-500">Average Fee</h3>
              <p className="text-2xl font-bold text-green-600">₹{feeStats.average.toLocaleString()}</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-lg">
              <h3 className="text-sm font-medium text-gray-500">Lowest Fee</h3>
              <p className="text-2xl font-bold text-purple-600">₹{feeStats.min.toLocaleString()}</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-lg">
              <h3 className="text-sm font-medium text-gray-500">Highest Fee</h3>
              <p className="text-2xl font-bold text-red-600">₹{feeStats.max.toLocaleString()}</p>
            </div>
          </div>
        )}

        {/* Colleges List */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Colleges for {selectedStream} ({colleges.length} found)
          </h2>

          {colleges.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No colleges found for the selected stream.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {colleges.map(college => (
                <div key={college.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                    {/* College Info */}
                    <div className="md:col-span-2">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {college['College Name']}
                      </h3>
                      <p className="text-gray-600 flex items-center mb-2">
                        📍 {college.Location}, {college.State}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>📅 Est. {college.Established}</span>
                        <span>🏛️ {college.Affiliation}</span>
                        {college.rating && (
                          <span className="flex items-center bg-yellow-100 px-2 py-1 rounded">
                            ⭐ {college.rating}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Stream & Seats */}
                    <div>
                      <p className="text-sm text-gray-500">Stream</p>
                      <p className="font-semibold text-blue-600 mb-2">{college.Stream}</p>
                      <p className="text-sm text-gray-500">Seats Available</p>
                      <p className="font-semibold text-gray-800">{college.Seats}</p>
                    </div>

                    {/* Fee Structure */}
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Annual Fee</p>
                      <p className="text-2xl font-bold text-green-600">{college.Fee}</p>
                      <p className="text-xs text-gray-500 mt-1">{college['Management Type']}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Back to Results */}
        <div className="text-center mt-8">
          <button
            onClick={() => window.history.back()}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors font-medium"
          >
            ← Back to Results
          </button>
        </div>
      </div>
    </div>
  );
};

export default StreamColleges;