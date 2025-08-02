import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  ArrowRight, 
  ArrowLeft,
  BookOpen,
  Target,
  TrendingUp,
  X
} from 'lucide-react';

const Practice = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [sessionStats, setSessionStats] = useState({
    questionsAnswered: 0,
    correctAnswers: 0,
    currentStreak: 0,
    timeSpent: 0
  });
  const [loading, setLoading] = useState(true);
  const [sessionStartTime, setSessionStartTime] = useState(null);

  // Mock questions - in a real app, these would come from Firestore
  const mockQuestions = [
    {
      id: 1,
      question: "What is the solution to the equation 2x + 5 = 13?",
      options: ["x = 3", "x = 4", "x = 5", "x = 6"],
      correctAnswer: 1,
      explanation: "Subtract 5 from both sides: 2x = 8. Then divide by 2: x = 4.",
      topic: "Algebra",
      difficulty: "Medium"
    },
    {
      id: 2,
      question: "In a right triangle, if one angle is 30°, what is the measure of the other acute angle?",
      options: ["30°", "45°", "60°", "90°"],
      correctAnswer: 2,
      explanation: "In a right triangle, the sum of the two acute angles is 90°. If one is 30°, the other must be 60°.",
      topic: "Geometry",
      difficulty: "Easy"
    },
    {
      id: 3,
      question: "What is the value of sin(90°)?",
      options: ["0", "0.5", "1", "Undefined"],
      correctAnswer: 2,
      explanation: "sin(90°) = 1, as the sine of 90 degrees is 1.",
      topic: "Trigonometry",
      difficulty: "Medium"
    },
    {
      id: 4,
      question: "Solve for x: x² - 4x + 4 = 0",
      options: ["x = 2", "x = -2", "x = 2 or x = -2", "x = 0"],
      correctAnswer: 0,
      explanation: "This is a perfect square: (x - 2)² = 0, so x = 2.",
      topic: "Algebra",
      difficulty: "Hard"
    },
    {
      id: 5,
      question: "What is the area of a circle with radius 5 units?",
      options: ["25π", "50π", "75π", "100π"],
      correctAnswer: 0,
      explanation: "Area = πr² = π(5)² = 25π square units.",
      topic: "Geometry",
      difficulty: "Medium"
    }
  ];

  useEffect(() => {
    setSessionStartTime(Date.now());
    loadNextQuestion();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (sessionStartTime) {
        setSessionStats(prev => ({
          ...prev,
          timeSpent: Math.floor((Date.now() - sessionStartTime) / 1000)
        }));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [sessionStartTime]);

  const loadNextQuestion = () => {
    setLoading(true);
    setSelectedAnswer(null);
    setShowFeedback(false);
    
    // Simulate API call delay
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * mockQuestions.length);
      setCurrentQuestion(mockQuestions[randomIndex]);
      setLoading(false);
    }, 500);
  };

  const handleAnswerSelect = (answerIndex) => {
    if (selectedAnswer !== null) return; // Prevent multiple selections
    
    setSelectedAnswer(answerIndex);
    const correct = answerIndex === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);

    // Update session stats
    setSessionStats(prev => ({
      ...prev,
      questionsAnswered: prev.questionsAnswered + 1,
      correctAnswers: prev.correctAnswers + (correct ? 1 : 0),
      currentStreak: correct ? prev.currentStreak + 1 : 0
    }));
  };

  const handleNextQuestion = () => {
    loadNextQuestion();
  };

  const handleEndSession = () => {
    // Here you would save session data to Firestore
    navigate('/dashboard');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Session Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Practice Session</h1>
          <p className="text-gray-600 mt-1">
            Adaptive questions tailored to your skill level
          </p>
        </div>
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <div className="flex items-center text-sm text-gray-600">
            <Clock size={16} className="mr-1" />
            {formatTime(sessionStats.timeSpent)}
          </div>
          <button
            onClick={handleEndSession}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Session Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card text-center">
          <div className="text-2xl font-bold text-primary-600">
            {sessionStats.questionsAnswered}
          </div>
          <div className="text-sm text-gray-600">Questions</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-success-600">
            {sessionStats.correctAnswers}
          </div>
          <div className="text-sm text-gray-600">Correct</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-warning-600">
            {sessionStats.currentStreak}
          </div>
          <div className="text-sm text-gray-600">Streak</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-secondary-600">
            {sessionStats.questionsAnswered > 0 
              ? Math.round((sessionStats.correctAnswers / sessionStats.questionsAnswered) * 100)
              : 0}%
          </div>
          <div className="text-sm text-gray-600">Accuracy</div>
        </div>
      </div>

      {/* Question Card */}
      <div className="card">
        {currentQuestion && (
          <div className="space-y-6">
            {/* Question Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="badge badge-primary">
                  {currentQuestion.topic}
                </div>
                <div className="badge badge-secondary">
                  {currentQuestion.difficulty}
                </div>
              </div>
              <div className="text-sm text-gray-500">
                Question {sessionStats.questionsAnswered + 1}
              </div>
            </div>

            {/* Question Text */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {currentQuestion.question}
              </h3>
            </div>

            {/* Answer Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={selectedAnswer !== null}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                    selectedAnswer === null
                      ? 'border-gray-200 hover:border-primary-300 hover:bg-primary-50'
                      : selectedAnswer === index
                      ? isCorrect
                        ? 'border-success-300 bg-success-50'
                        : 'border-error-300 bg-error-50'
                      : index === currentQuestion.correctAnswer && showFeedback
                      ? 'border-success-300 bg-success-50'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 ${
                      selectedAnswer === null
                        ? 'border-gray-300'
                        : selectedAnswer === index
                        ? isCorrect
                          ? 'border-success-500 bg-success-500'
                          : 'border-error-500 bg-error-500'
                        : index === currentQuestion.correctAnswer && showFeedback
                        ? 'border-success-500 bg-success-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedAnswer === index && (
                        isCorrect ? (
                          <CheckCircle size={16} className="text-white" />
                        ) : (
                          <XCircle size={16} className="text-white" />
                        )
                      )}
                      {index === currentQuestion.correctAnswer && showFeedback && selectedAnswer !== index && (
                        <CheckCircle size={16} className="text-white" />
                      )}
                    </div>
                    <span className="text-gray-900">{option}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Feedback */}
            {showFeedback && (
              <div className={`p-4 rounded-lg ${
                isCorrect ? 'bg-success-50 border border-success-200' : 'bg-error-50 border border-error-200'
              }`}>
                <div className="flex items-start">
                  {isCorrect ? (
                    <CheckCircle size={20} className="text-success-500 mt-0.5 mr-3 flex-shrink-0" />
                  ) : (
                    <XCircle size={20} className="text-error-500 mt-0.5 mr-3 flex-shrink-0" />
                  )}
                  <div>
                    <h4 className={`font-medium ${
                      isCorrect ? 'text-success-800' : 'text-error-800'
                    }`}>
                      {isCorrect ? 'Correct!' : 'Incorrect'}
                    </h4>
                    <p className="text-sm text-gray-700 mt-1">
                      {currentQuestion.explanation}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Next Question Button */}
            {showFeedback && (
              <div className="flex justify-end">
                <button
                  onClick={handleNextQuestion}
                  className="btn-primary inline-flex items-center"
                >
                  Next Question
                  <ArrowRight size={18} className="ml-2" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Study Tips */}
      {!showFeedback && (
        <div className="card">
          <div className="flex items-center mb-3">
            <Target size={20} className="text-primary-600 mr-2" />
            <h3 className="font-medium text-gray-900">Study Tip</h3>
          </div>
          <p className="text-sm text-gray-600">
            Take your time to read each question carefully. The adaptive algorithm will adjust 
            the difficulty based on your performance, so focus on accuracy rather than speed.
          </p>
        </div>
      )}

      {/* Session Progress */}
      <div className="card">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-gray-900">Session Progress</h3>
          <div className="text-sm text-gray-500">
            {sessionStats.questionsAnswered} questions completed
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min((sessionStats.questionsAnswered / 10) * 100, 100)}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-xs text-gray-500">0</span>
          <span className="text-xs text-gray-500">10 questions</span>
        </div>
      </div>
    </div>
  );
};

export default Practice;