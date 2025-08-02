import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  TrendingUp, 
  BookOpen, 
  Clock, 
  Target, 
  Award,
  ArrowRight,
  Calendar,
  Lightbulb,
  BarChart3,
  Play
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);

  // Mock data - in a real app, this would come from Firestore
  const [userStats, setUserStats] = useState({
    totalQuestions: 0,
    correctAnswers: 0,
    accuracy: 0,
    studyStreak: 0,
    weakTopics: [],
    recentScores: []
  });

  const [studyPlan, setStudyPlan] = useState({
    todayGoals: [],
    weakAreas: [],
    recommendedTopics: []
  });

  useEffect(() => {
    // Simulate loading user data
    setTimeout(() => {
      setUserStats({
        totalQuestions: 156,
        correctAnswers: 124,
        accuracy: 79.5,
        studyStreak: 7,
        weakTopics: ['Algebra', 'Geometry', 'Trigonometry'],
        recentScores: [
          { date: 'Mon', score: 75 },
          { date: 'Tue', score: 82 },
          { date: 'Wed', score: 78 },
          { date: 'Thu', score: 85 },
          { date: 'Fri', score: 88 },
          { date: 'Sat', score: 92 },
          { date: 'Sun', score: 89 }
        ]
      });

      setStudyPlan({
        todayGoals: [
          'Complete 20 practice questions',
          'Review Algebra fundamentals',
          'Take a timed practice test'
        ],
        weakAreas: [
          { topic: 'Algebra', accuracy: 65, questions: 45 },
          { topic: 'Geometry', accuracy: 72, questions: 38 },
          { topic: 'Trigonometry', accuracy: 58, questions: 23 }
        ],
        recommendedTopics: [
          'Linear Equations',
          'Quadratic Functions',
          'Pythagorean Theorem'
        ]
      });

      setLoading(false);
    }, 1000);
  }, []);

  const topicMasteryData = studyPlan.weakAreas.map(topic => ({
    name: topic.topic,
    accuracy: topic.accuracy,
    questions: topic.questions
  }));

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {currentUser?.displayName?.split(' ')[0] || 'Student'}!
          </h1>
          <p className="text-gray-600 mt-1">
            Ready to continue your learning journey?
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link
            to="/practice"
            className="btn-primary inline-flex items-center"
          >
            <Play size={18} className="mr-2" />
            Start Practice
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <BookOpen size={24} className="text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Questions</p>
              <p className="text-2xl font-bold text-gray-900">{userStats.totalQuestions}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
              <Award size={24} className="text-success-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Accuracy</p>
              <p className="text-2xl font-bold text-gray-900">{userStats.accuracy}%</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center">
              <Clock size={24} className="text-warning-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Study Streak</p>
              <p className="text-2xl font-bold text-gray-900">{userStats.studyStreak} days</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
              <Target size={24} className="text-secondary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Correct Answers</p>
              <p className="text-2xl font-bold text-gray-900">{userStats.correctAnswers}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Chart and Study Plan */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Progress Chart */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Progress Over Time</h3>
            <Link to="/reports" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              View Details
            </Link>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userStats.recentScores}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#2563eb" 
                  strokeWidth={2}
                  dot={{ fill: '#2563eb', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Today's Study Plan */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Today's Study Plan</h3>
            <Calendar size={20} className="text-gray-400" />
          </div>
          <div className="space-y-4">
            {studyPlan.todayGoals.map((goal, index) => (
              <div key={index} className="flex items-start">
                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3"></div>
                <span className="text-gray-700">{goal}</span>
              </div>
            ))}
            <div className="pt-4 border-t border-gray-200">
              <Link
                to="/practice"
                className="btn-primary inline-flex items-center"
              >
                Start Studying
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Topic Mastery and Quick Actions */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Topic Mastery */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Topic Mastery</h3>
            <BarChart3 size={20} className="text-gray-400" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topicMasteryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="accuracy" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link
              to="/practice"
              className="flex items-center justify-between p-4 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors duration-200"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                  <BookOpen size={20} className="text-white" />
                </div>
                <div className="ml-3">
                  <p className="font-medium text-gray-900">Practice Questions</p>
                  <p className="text-sm text-gray-600">Continue your adaptive practice</p>
                </div>
              </div>
              <ArrowRight size={20} className="text-gray-400" />
            </Link>

            <Link
              to="/exams"
              className="flex items-center justify-between p-4 bg-secondary-50 hover:bg-secondary-100 rounded-lg transition-colors duration-200"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-secondary-600 rounded-lg flex items-center justify-center">
                  <Clock size={20} className="text-white" />
                </div>
                <div className="ml-3">
                  <p className="font-medium text-gray-900">Take Practice Exam</p>
                  <p className="text-sm text-gray-600">Simulate real exam conditions</p>
                </div>
              </div>
              <ArrowRight size={20} className="text-gray-400" />
            </Link>

            <Link
              to="/reports"
              className="flex items-center justify-between p-4 bg-success-50 hover:bg-success-100 rounded-lg transition-colors duration-200"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-success-600 rounded-lg flex items-center justify-center">
                  <TrendingUp size={20} className="text-white" />
                </div>
                <div className="ml-3">
                  <p className="font-medium text-gray-900">View Reports</p>
                  <p className="text-sm text-gray-600">Analyze your performance</p>
                </div>
              </div>
              <ArrowRight size={20} className="text-gray-400" />
            </Link>
          </div>
        </div>
      </div>

      {/* Study Tips */}
      <div className="card">
        <div className="flex items-center mb-4">
          <Lightbulb size={20} className="text-warning-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Study Tips</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-warning-50 p-4 rounded-lg">
            <h4 className="font-medium text-warning-800 mb-2">Focus on Weak Areas</h4>
            <p className="text-sm text-warning-700">
              Your accuracy in Algebra is 65%. Consider spending more time on linear equations and quadratic functions.
            </p>
          </div>
          <div className="bg-primary-50 p-4 rounded-lg">
            <h4 className="font-medium text-primary-800 mb-2">Maintain Your Streak</h4>
            <p className="text-sm text-primary-700">
              You're on a 7-day study streak! Keep it up by practicing for at least 15 minutes today.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;