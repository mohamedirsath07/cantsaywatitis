import React, { useState, useEffect } from 'react';
import { useQuiz } from '../../hooks/useQuiz';
import QuestionCard from './QuestionCard';
import ProgressIndicator from './ProgressIndicator';
import ResultsVisualization from './ResultsVisualization';

const QuizInterface = () => {
  const {
    currentQuestion,
    questionIndex,
    totalQuestions,
    answers,
    isComplete,
    results,
    generateNextQuestion,
    submitAnswer,
    calculateResults
  } = useQuiz();

  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAnswerSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      await submitAnswer(selectedAnswer);
      setSelectedAnswer('');
      
      if (questionIndex < totalQuestions - 1) {
        await generateNextQuestion();
      } else {
        await calculateResults();
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isComplete && results) {
    return <ResultsVisualization results={results} />;
  }

  return (
    <div className="quiz-container">
      <ProgressIndicator 
        current={questionIndex + 1} 
        total={totalQuestions} 
      />
      
      <QuestionCard
        question={currentQuestion}
        selectedAnswer={selectedAnswer}
        onAnswerSelect={setSelectedAnswer}
        onSubmit={handleAnswerSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default QuizInterface;
