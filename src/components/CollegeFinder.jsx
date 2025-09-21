import React, { useState, useEffect } from 'react';
import collegeDataService from '../services/collegeDataService';

const CollegeFinder = () => {
  const [colleges, setColleges] = useState([]);
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    state: '',
    stream: '',
    maxFee: '',
    managementType: '',
    sortBy: 'ranking'
  });

  // Available filter options
  const [states, setStates] = useState([]);
  const [streams, setStreams] = useState([]);
  const [feeStats, setFeeStats] = useState({});

  useEffect(() => {
    initializeData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, colleges]);

  const initializeData = async () => {
    try {
      await collegeDataService.initialize();
      const allColleges = collegeDataService.getAllColleges();
      const availableStates = collegeDataService.getStates();
      const availableStreams = collegeDataService.getStreams();
      const statistics = collegeDataService.getFeeStatistics();

      setColleges(allColleges);
      setFilteredColleges(allColleges);
      setStates(availableStates);
      setStreams(availableStreams);
      setFeeStats(statistics);
      setLoading(false);
    } catch (error) {
      console.error('Error initializing college data:', error);
      setLoading(false);
    }
  };

  const applyFilters = () => {
    const filtered = collegeDataService.searchColleges({
      state: filters.state,
      stream: filters.stream,
      maxFee: filters.maxFee ? parseInt(filters.maxFee) : undefined,
      managementType: filters.managementType,
      sortBy: filters.sortBy
    });
    setFilteredColleges(filtered);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      state: '',
      stream: '',
      maxFee: '',
      managementType: '',
      sortBy: 'ranking'
    });
  };

  const formatFee = (fee) => {
    if (typeof fee === 'string') return fee;
    if (fee >= 100000) return `₹${(fee / 100000).toFixed(1)} Lakhs`;
    return `₹${fee.toLocaleString()}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading college data...</p>
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
            🏛️ College Finder
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the perfect college for your career journey. Browse through comprehensive information 
            about government colleges across India.
          </p>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Search & Filter</h2>
            <button
              onClick={resetFilters}
              className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Reset Filters
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {/* State Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
              <select
                value={filters.state}
                onChange={(e) => handleFilterChange('state', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All States</option>
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>

            {/* Stream Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Stream</label>
              <select
                value={filters.stream}
                onChange={(e) => handleFilterChange('stream', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Streams</option>
                {streams.map(stream => (
                  <option key={stream} value={stream}>{stream}</option>
                ))}
              </select>
            </div>

            {/* Fee Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Fee (₹)</label>
              <select
                value={filters.maxFee}
                onChange={(e) => handleFilterChange('maxFee', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Any Budget</option>
                <option value="50000">Under ₹50,000</option>
                <option value="100000">Under ₹1 Lakh</option>
                <option value="500000">Under ₹5 Lakhs</option>
                <option value="1000000">Under ₹10 Lakhs</option>
              </select>
            </div>

            {/* Management Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Management</label>
              <select
                value={filters.managementType}
                onChange={(e) => handleFilterChange('managementType', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Types</option>
                <option value="Government">Government</option>
                <option value="Central Government">Central Government</option>
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="ranking">Ranking</option>
                <option value="fee">Fee (Low to High)</option>
                <option value="seats">Seats Available</option>
                <option value="established">Year Established</option>
              </select>
            </div>
          </div>

          {/* Results Summary */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-800">
              <span className="font-semibold">{filteredColleges.length}</span> colleges found
              {filters.state && <span> in {filters.state}</span>}
              {filters.stream && <span> for {filters.stream}</span>}
            </p>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredColleges.map(college => (
            <div key={college.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              {/* College Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
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

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Established:</span>
                    <span className="text-sm font-medium">{college.established}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Management:</span>
                    <span className="text-sm font-medium">{college.managementType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Affiliation:</span>
                    <span className="text-sm font-medium">{college.affiliation}</span>
                  </div>
                </div>

                {/* Specializations */}
                {college.specializations && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-2">Specializations:</p>
                    <div className="flex flex-wrap gap-1">
                      {college.specializations.slice(0, 3).map((spec, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {spec}
                        </span>
                      ))}
                      {college.specializations.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{college.specializations.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors font-medium">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredColleges.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">No colleges found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your filters to find more options</p>
            <button
              onClick={resetFilters}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollegeFinder;