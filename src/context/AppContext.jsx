import React, { createContext, useContext, useReducer } from 'react';

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
  RESET_STATE: 'RESET_STATE'
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
    
    default:
      return state;
  }
};

// Create context
const AppContext = createContext();

// Context provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

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
  };

  const resetState = () => {
    dispatch({
      type: actionTypes.RESET_STATE
    });
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
