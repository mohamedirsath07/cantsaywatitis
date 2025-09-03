// Quiz calculation utilities
export const calculateQuizResults = (answers) => {
  const scores = {
    science: 0,
    commerce: 0,
    arts: 0
  };

  // Calculate scores based on answers
  answers.forEach(answer => {
    if (answer.response === 'yes') {
      scores[answer.category] += answer.weight;
    }
  });

  // Determine recommended stream
  const maxScore = Math.max(scores.science, scores.commerce, scores.arts);
  let recommendedStream = null;

  if (maxScore > 0) {
    if (scores.science === maxScore) {
      recommendedStream = 'science';
    } else if (scores.commerce === maxScore) {
      recommendedStream = 'commerce';
    } else {
      recommendedStream = 'arts';
    }
  }

  // Handle ties - show multiple recommendations
  const tiedStreams = Object.entries(scores)
    .filter(([stream, score]) => score === maxScore && score > 0)
    .map(([stream]) => stream);

  return {
    scores,
    recommendedStream,
    tiedStreams: tiedStreams.length > 1 ? tiedStreams : null,
    completed: true
  };
};

// Get stream recommendation message
export const getStreamRecommendation = (stream, scores) => {
  const messages = {
    science: {
      title: "Science Stream Recommended! 🔬",
      description: "You show strong aptitude for analytical thinking, problem-solving, and scientific inquiry. Science stream offers diverse career paths in technology, healthcare, research, and engineering.",
      color: "text-blue-600"
    },
    commerce: {
      title: "Commerce Stream Recommended! 💼", 
      description: "You demonstrate excellent skills in numerical analysis, business understanding, and financial management. Commerce stream leads to careers in business, finance, accounting, and entrepreneurship.",
      color: "text-green-600"
    },
    arts: {
      title: "Arts/Humanities Stream Recommended! 🎨",
      description: "You excel in creative expression, critical thinking, and communication. Arts stream opens doors to careers in media, law, design, psychology, and social services.",
      color: "text-purple-600"
    }
  };

  return messages[stream] || {
    title: "Take the quiz to get recommendations!",
    description: "Complete our aptitude assessment to discover your ideal academic path.",
    color: "text-gray-600"
  };
};

// Filter colleges based on stream
export const filterCollegesByStream = (colleges, stream) => {
  return colleges.filter(college => 
    college.streams.includes(stream) || college.streams.includes('all')
  );
};

// Get career paths for a stream
export const getCareerPaths = (careerData, stream) => {
  return careerData.streams[stream] || null;
};

// Format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

// Generate user progress percentage
export const getUserProgress = (user, quizResults) => {
  let progress = 0;
  
  // Profile completion
  if (user.name && user.class) progress += 30;
  
  // Quiz completion
  if (quizResults.completed) progress += 50;
  
  // Stream selection (automatic after quiz)
  if (quizResults.recommendedStream) progress += 20;
  
  return Math.min(progress, 100);
};

// Get badge based on progress
export const getUserBadge = (progress) => {
  if (progress >= 100) return { name: "Career Explorer", icon: "🎯", color: "bg-yellow-500" };
  if (progress >= 70) return { name: "Path Finder", icon: "🗺️", color: "bg-blue-500" };
  if (progress >= 40) return { name: "Quiz Master", icon: "📝", color: "bg-green-500" };
  if (progress >= 20) return { name: "Beginner", icon: "🌱", color: "bg-gray-500" };
  return { name: "New User", icon: "👋", color: "bg-gray-400" };
};
