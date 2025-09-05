import React, { useState } from 'react';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Card from '../components/Card';
import { useApp } from '../context/AppContext';
import { quizQuestions } from '../data/careerData';
import { calculateQuizResults } from '../utils/quizUtils';

const Quiz = () => {
  const { state, actions } = useApp();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState('');

  const question = quizQuestions[currentQuestion];
  const isLastQuestion = currentQuestion === quizQuestions.length - 1;
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    // Save current answer
    const newAnswer = {
      questionId: question.id,
      response: selectedAnswer,
      category: question.category,
      weight: question.weight
    };

    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);

    if (isLastQuestion) {
      // Calculate results and check if user is logged in
      const results = calculateQuizResults(updatedAnswers);
      actions.setQuizResults(results);
      
      // If user is not logged in, redirect to auth page to save results
      if (!state.user.isLoggedIn) {
        actions.setCurrentPage('auth');
      } else {
        actions.setCurrentPage('results');
      }
    } else {
      // Move to next question
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer('');
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      // Remove the last answer from the array
      setAnswers(answers.slice(0, -1));
      setSelectedAnswer('');
    }
  };

  const handleBack = () => {
    actions.setCurrentPage('profile');
  };

  if (!state.user.isLoggedIn) {
    return (
      <Layout title="Aptitude Quiz">
        <div className="text-center">
          <Card className="max-w-md mx-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Please complete your profile first
            </h2>
            <Button onClick={() => actions.setCurrentPage('profile')}>
              Go to Profile
            </Button>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Aptitude Quiz" showProgress={true}>
      <div className="max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <Card className="mb-8">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">
              {question.category === 'science' && '🔬'}
              {question.category === 'commerce' && '💼'}
              {question.category === 'arts' && '🎨'}
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {question.question}
            </h2>
            <p className="text-gray-600">
              Choose the option that best describes you
            </p>
          </div>

          {/* Answer Options */}
          <div className="space-y-4 mb-8">
            <button
              onClick={() => handleAnswerSelect('yes')}
              className={`quiz-answer-btn yes ${
                selectedAnswer === 'yes' ? 'selected' : ''
              }`}
            >
              <div className="flex items-center">
                <div className={`quiz-radio ${
                  selectedAnswer === 'yes' ? 'selected' : ''
                }`}>
                </div>
                <div>
                  <div className="quiz-answer-title">Yes, that's me! ✅</div>
                  <div className="quiz-answer-subtitle">This describes me well</div>
                </div>
              </div>
            </button>

            <button
              onClick={() => handleAnswerSelect('no')}
              className={`quiz-answer-btn no ${
                selectedAnswer === 'no' ? 'selected' : ''
              }`}
            >
              <div className="flex items-center">
                <div className={`quiz-radio ${
                  selectedAnswer === 'no' ? 'selected' : ''
                }`}>
                </div>
                <div>
                  <div className="quiz-answer-title">No, not really ❌</div>
                  <div className="quiz-answer-subtitle">This doesn't describe me</div>
                </div>
              </div>
            </button>
          </div>

          {/* Navigation Buttons */}
          <div className="flex space-x-4">
            {currentQuestion > 0 ? (
              <Button 
                variant="outline"
                onClick={handlePrevious}
                className="flex-1"
              >
                Previous
              </Button>
            ) : (
              <Button 
                variant="outline"
                onClick={handleBack}
                className="flex-1"
              >
                Back to Profile
              </Button>
            )}
            
            <Button 
              onClick={handleNext}
              disabled={!selectedAnswer}
              className="flex-1"
              icon={isLastQuestion ? "🎯" : "➡️"}
            >
              {isLastQuestion ? 'Get Results' : 'Next Question'}
            </Button>
          </div>
        </Card>

        {/* Quiz Tips */}
        <div className="text-center">
          <p className="text-sm text-gray-500">
            💡 <strong>Tip:</strong> Answer honestly for the most accurate recommendations!
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Quiz;
