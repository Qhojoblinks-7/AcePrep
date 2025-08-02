import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Clock, 
  BookOpen, 
  Target, 
  Award,
  Play,
  Calendar,
  TrendingUp,
  CheckCircle
} from 'lucide-react';

const Exams = () => {
  const [selectedExam, setSelectedExam] = useState(null);

  const examTypes = [
    {
      id: 1,
      title: "Mathematics Practice Exam",
      description: "Comprehensive test covering Algebra, Geometry, and Trigonometry",
      duration: 60,
      questions: 50,
      difficulty: "Mixed",
      topics: ["Algebra", "Geometry", "Trigonometry"],
      estimatedScore: "75-85%",
      lastTaken: "2 days ago"
    },
    {
      id: 2,
      title: "Algebra Focus Test",
      description: "Deep dive into algebraic concepts and problem solving",
      duration: 45,
      questions: 30,
      difficulty: "Medium",
      topics: ["Linear Equations", "Quadratic Functions", "Systems of Equations"],
      estimatedScore: "80-90%",
      lastTaken: "1 week ago"
    },
    {
      id: 3,
      title: "Geometry Mastery Test",
      description: "Test your knowledge of geometric principles and theorems",
      duration: 40,
      questions: 25,
      difficulty: "Hard",
      topics: ["Triangles", "Circles", "Polygons", "Coordinate Geometry"],
      estimatedScore: "70-80%",
      lastTaken: "3 days ago"
    },
    {
      id: 4,
      title: "Trigonometry Challenge",
      description: "Advanced trigonometric functions and identities",
      duration: 35,
      questions: 20,
      difficulty: "Hard",
      topics: ["Sine and Cosine", "Tangent", "Identities", "Applications"],
      estimatedScore: "65-75%",
      lastTaken: "Never taken"
    }
  ];

  const recentExams = [
    {
      id: 1,
      title: "Mathematics Practice Exam",
      date: "2024-01-15",
      score: 82,
      timeSpent: 58,
      totalQuestions: 50,
      correctAnswers: 41
    },
    {
      id: 2,
      title: "Algebra Focus Test",
      date: "2024-01-10",
      score: 87,
      timeSpent: 42,
      totalQuestions: 30,
      correctAnswers: 26
    },
    {
      id: 3,
      title: "Geometry Mastery Test",
      date: "2024-01-08",
      score: 76,
      timeSpent: 38,
      totalQuestions: 25,
      correctAnswers: 19
    }
  ];

  const handleStartExam = (exam) => {
    setSelectedExam(exam);
    // In a real app, this would navigate to the exam interface
    console.log('Starting exam:', exam.title);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Practice Exams</h1>
        <p className="text-gray-600 mt-1">
          Take timed practice exams to simulate real test conditions
        </p>
      </div>

      {/* Available Exams */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Available Exams</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {examTypes.map((exam) => (
            <div key={exam.id} className="card">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {exam.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {exam.description}
                  </p>
                </div>
                <div className="badge badge-primary">
                  {exam.difficulty}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Clock size={16} className="mr-2" />
                  {exam.duration} min
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <BookOpen size={16} className="mr-2" />
                  {exam.questions} questions
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Target size={16} className="mr-2" />
                  {exam.estimatedScore}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar size={16} className="mr-2" />
                  {exam.lastTaken}
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Topics Covered:</h4>
                <div className="flex flex-wrap gap-2">
                  {exam.topics.map((topic, index) => (
                    <span key={index} className="badge badge-secondary">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleStartExam(exam)}
                className="btn-primary w-full inline-flex items-center justify-center"
              >
                <Play size={18} className="mr-2" />
                Start Exam
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Exam Results */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Results</h2>
        <div className="card">
          <div className="space-y-4">
            {recentExams.map((exam) => (
              <div key={exam.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Award size={24} className="text-primary-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-gray-900">{exam.title}</h3>
                    <p className="text-sm text-gray-600">
                      {exam.date} • {exam.timeSpent} minutes
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-success-600">
                    {exam.score}%
                  </div>
                  <div className="text-sm text-gray-600">
                    {exam.correctAnswers}/{exam.totalQuestions} correct
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Exam Tips */}
      <div className="card">
        <div className="flex items-center mb-4">
          <TrendingUp size={20} className="text-primary-600 mr-2" />
          <h3 className="font-medium text-gray-900">Exam Tips</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-start">
              <CheckCircle size={16} className="text-success-500 mt-0.5 mr-2 flex-shrink-0" />
              <span className="text-sm text-gray-700">
                Read each question carefully before answering
              </span>
            </div>
            <div className="flex items-start">
              <CheckCircle size={16} className="text-success-500 mt-0.5 mr-2 flex-shrink-0" />
              <span className="text-sm text-gray-700">
                Use the timer to pace yourself throughout the exam
              </span>
            </div>
            <div className="flex items-start">
              <CheckCircle size={16} className="text-success-500 mt-0.5 mr-2 flex-shrink-0" />
              <span className="text-sm text-gray-700">
                Review your answers if time permits
              </span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start">
              <CheckCircle size={16} className="text-success-500 mt-0.5 mr-2 flex-shrink-0" />
              <span className="text-sm text-gray-700">
                Focus on accuracy rather than speed initially
              </span>
            </div>
            <div className="flex items-start">
              <CheckCircle size={16} className="text-success-500 mt-0.5 mr-2 flex-shrink-0" />
              <span className="text-sm text-gray-700">
                Skip difficult questions and return to them later
              </span>
            </div>
            <div className="flex items-start">
              <CheckCircle size={16} className="text-success-500 mt-0.5 mr-2 flex-shrink-0" />
              <span className="text-sm text-gray-700">
                Use the scratch paper for calculations
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h3 className="font-medium text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Link
            to="/practice"
            className="flex items-center p-4 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors duration-200"
          >
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <BookOpen size={20} className="text-white" />
            </div>
            <div className="ml-3">
              <p className="font-medium text-gray-900">Practice Questions</p>
              <p className="text-sm text-gray-600">Continue adaptive practice</p>
            </div>
          </Link>
          <Link
            to="/reports"
            className="flex items-center p-4 bg-secondary-50 hover:bg-secondary-100 rounded-lg transition-colors duration-200"
          >
            <div className="w-10 h-10 bg-secondary-600 rounded-lg flex items-center justify-center">
              <TrendingUp size={20} className="text-white" />
            </div>
            <div className="ml-3">
              <p className="font-medium text-gray-900">View Reports</p>
              <p className="text-sm text-gray-600">Analyze your performance</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Exams;