import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Function to load state from localStorage
const loadStateFromStorage = () => {
  try {
    const serializedState = localStorage.getItem('careerCompassState');
    if (serializedState === null) {
      return undefined;
    }
    const parsed = JSON.parse(serializedState);
    
    // Validate that the parsed state has the expected structure
    if (parsed && typeof parsed === 'object' && parsed.user && parsed.quizResults && parsed.currentPage) {
      return parsed;
    } else {
      // If structure is invalid, clear localStorage and return undefined
      localStorage.removeItem('careerCompassState');
      return undefined;
    }
  } catch (err) {
    // If there's any error (corrupt JSON, etc.), clear localStorage
    localStorage.removeItem('careerCompassState');
    return undefined;
  }
};

// Function to save state to localStorage
const saveStateToStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('careerCompassState', serializedState);
  } catch (err) {
    // Ignore write errors
  }
};

// Initial state
const initialState = {
  user: {
    name: '',
    class: '',
    interests: [],
    email: '',
    dateOfBirth: '',
    education: '',
    location: '',
    mobile: '',
    profilePicture: '',
    loginMethod: 'email', // 'email', 'Google', 'Facebook'
    isLoggedIn: false
  },
  quizResults: {
    scores: {
      science: 0,
      commerce: 0,
      arts: 0
    },
    recommendedStream: null,
    completed: false
  },
  currentPage: 'welcome'
};

// Action types
const actionTypes = {
  SET_USER_INFO: 'SET_USER_INFO',
  SET_QUIZ_RESULTS: 'SET_QUIZ_RESULTS',
  SET_CURRENT_PAGE: 'SET_CURRENT_PAGE',
  RESET_STATE: 'RESET_STATE',
  INITIALIZE_APP: 'INITIALIZE_APP'
};

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER_INFO:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
          isLoggedIn: true
        }
      };
    
    case actionTypes.SET_QUIZ_RESULTS:
      return {
        ...state,
        quizResults: {
          ...state.quizResults,
          ...action.payload
        }
      };
    
    case actionTypes.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload
      };
    
    case actionTypes.RESET_STATE:
      return initialState;
    
    case actionTypes.INITIALIZE_APP:
      return {
        ...state,
        ...action.payload
      };
    
    default:
      return state;
  }
};

// Create context
const AppContext = createContext();

// Context provider component
export const AppProvider = ({ children }) => {
  // Load initial state from localStorage or use default
  const persistedState = loadStateFromStorage();
  const [state, dispatch] = useReducer(appReducer, persistedState || initialState);

  // Initialize app with URL-based routing on first load
  useEffect(() => {
    const initializeApp = () => {
      const currentPath = window.location.pathname;
      let currentPage = 'welcome';
      
      // Map URL paths to page names
      const pathToPageMap = {
        '/': 'welcome',
        '/welcome': 'welcome',
        '/profile': 'profile',
        '/quiz': 'quiz',
        '/auth': 'auth',
        '/results': 'results',
        '/dashboard': 'dashboard',
        '/profileEdit': 'profileEdit'
      };
      
      if (pathToPageMap[currentPath]) {
        currentPage = pathToPageMap[currentPath];
      }
      
      // Only update the page if it's different from the persisted state
      if (!persistedState || persistedState.currentPage !== currentPage) {
        dispatch({
          type: actionTypes.SET_CURRENT_PAGE,
          payload: currentPage
        });
      }
      
      // Set initial browser history state
      window.history.replaceState({ page: currentPage }, '', currentPath);
    };

    initializeApp();
  }, []); // Run only once on mount

  // Save state to localStorage whenever it changes
  useEffect(() => {
    saveStateToStorage(state);
  }, [state]);

  // Handle browser navigation (back/forward buttons)
  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state && event.state.page) {
        dispatch({
          type: actionTypes.SET_CURRENT_PAGE,
          payload: event.state.page
        });
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Action creators
  const setUserInfo = (userInfo) => {
    dispatch({
      type: actionTypes.SET_USER_INFO,
      payload: userInfo
    });
  };

  const setQuizResults = (results) => {
    dispatch({
      type: actionTypes.SET_QUIZ_RESULTS,
      payload: results
    });
  };

  const setCurrentPage = (page) => {
    dispatch({
      type: actionTypes.SET_CURRENT_PAGE,
      payload: page
    });
    
    // Update browser history so that back/forward buttons work
    const currentUrl = window.location.pathname;
    const newUrl = page === 'welcome' ? '/' : `/${page}`;
    
    if (currentUrl !== newUrl) {
      window.history.pushState({ page }, '', newUrl);
    }
  };

  const resetState = () => {
    dispatch({
      type: actionTypes.RESET_STATE
    });
    // Also clear localStorage when resetting
    localStorage.removeItem('careerCompassState');
    // Reset URL to home
    window.history.pushState({ page: 'welcome' }, '', '/');
  };

  // Context value
  const value = {
    state,
    actions: {
      setUserInfo,
      setQuizResults,
      setCurrentPage,
      resetState
    }
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
