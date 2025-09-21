import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';

const Navigation = () => {
  const { state, navigateToPage } = useApp();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNavigation = (page) => {
    navigateToPage(page);
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    // Add logout logic here if needed
    navigateToPage('auth');
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const navigationItems = [
    { page: 'welcome', label: 'Home', icon: '🏠'},
    { page: 'dashboard', label: 'Dashboard', icon: '📊'},
    { page: 'collegeFinder', label: 'College Finder', icon: '🏛️'},
    { page: 'collegeRecommendations', label: 'College Recommendations', icon: '🎯'},
    { page: 'profile', label: 'Profile', icon: '👤'},
  ];

  return (
    <nav className="bg-white shadow-lg border-b-2 border-blue-100 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="nav-container relative flex items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl nav-brand">CareerCompass</h1>
          </div>

          {/* Navigation Dropdown - Absolute Right Positioning */}
          <div className="nav-menu-right">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="nav-button flex items-center space-x-2 px-6 py-2 rounded-lg text-sm font-medium text-white transition-all duration-300 shadow-lg"
              >
                <span className="text-lg">☰</span>
                <span className="hidden sm:inline">Menu</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Content - Top Right Positioned */}
              {isDropdownOpen && (
                <div className="nav-dropdown absolute right-0 top-full mt-2 w-60 rounded-xl shadow-2xl border-0 py-3 z-50">
                  {/* Navigation Items */}
                  {navigationItems.map((item) => (
                    <button
                      key={item.page}
                      onClick={() => handleNavigation(item.page)}
                      className={`nav-dropdown-item w-full text-left px-5 py-3 text-sm transition-all duration-200 flex items-center space-x-3 ${
                        state.currentPage === item.page ? 'active' : ''
                      }`}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span className="font-medium">{item.label}</span>
                      {state.currentPage === item.page && (
                        <span className="ml-auto text-blue-500 font-bold">✓</span>
                      )}
                    </button>
                  ))}
                  
                  {/* Divider */}
                  <div className="border-t border-gray-200 mx-3 my-2"></div>
                  
                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="nav-dropdown-item logout w-full text-left px-5 py-3 text-sm transition-all duration-200 flex items-center space-x-3 text-red-600 hover:text-red-700"
                  >
                    <span className="text-xl logout-icon">🚪</span>
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;