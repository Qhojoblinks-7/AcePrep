import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  BarChart3, 
  Target, 
  Calendar,
  Clock,
  Award,
  BookOpen,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const Reports = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [loading, setLoading] = useState(true);

  const [performanceData, setPerformanceData] = useState({
    overallStats: {
      totalQuestions: 0,
      correctAnswers: 0,
      accuracy: 0,
      averageTime: 0,
      studyStreak: 0
    },
    topicPerformance: [],
    weeklyProgress: [],
    recentSessions: []
  });

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setPerformanceData({
        overallStats: {
          totalQuestions: 156,
          correctAnswers: 124,
          accuracy: 79.5,
          averageTime: 45,
          studyStreak: 7
        },
        topicPerformance: [
          { topic: 'Algebra', accuracy: 65, questions: 45, improvement: -5 },
          { topic: 'Geometry', accuracy: 72, questions: 38, improvement: 8 },
          { topic: 'Trigonometry', accuracy: 58, questions: 23, improvement: 12 },
          { topic: 'Calculus', accuracy: 85, questions: 30, improvement: 3 },
          { topic: 'Statistics', accuracy: 78, questions: 20, improvement: 15 }
        ],
        weeklyProgress: [
          { day: 'Mon', score: 75, questions: 15 },
          { day: 'Tue', score: 82, questions: 18 },
          { day: 'Wed', score: 78, questions: 12 },
          { day: 'Thu', score: 85, questions: 20 },
          { day: 'Fri', score: 88, questions: 16 },
          { day: 'Sat', score: 92, questions: 22 },
          { day: 'Sun', score: 89, questions: 19 }
        ],
        recentSessions: [
          {
            id: 1,
            date: '2024-01-15',
            duration: 45,
            questions: 20,
            correct: 16,
            accuracy: 80,
            topics: ['Algebra', 'Geometry']
          },
          {
            id: 2,
            date: '2024-01-14',
            duration: 30,
            questions: 15,
            correct: 12,
            accuracy: 80,
            topics: ['Trigonometry']
          },
          {
            id: 3,
            date: '2024-01-13',
            duration: 60,
            questions: 25,
            correct: 22,
            accuracy: 88,
            topics: ['Algebra', 'Calculus']
          }
        ]
      });
      setLoading(false);
    }, 1000);
  }, []);

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  const topicChartData = performanceData.topicPerformance.map(topic => ({
    name: topic.topic,
    value: topic.accuracy,
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Performance Reports</h1>
          <p className="text-gray-600 mt-1">
            Track your progress and identify areas for improvement
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="input-field w-auto"
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="quarter">Last Quarter</option>
            <option value="year">Last Year</option>
          </select>
        </div>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="card text-center">
          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <BookOpen size={24} className="text-primary-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {performanceData.overallStats.totalQuestions}
          </div>
          <div className="text-sm text-gray-600">Total Questions</div>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Award size={24} className="text-success-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {performanceData.overallStats.accuracy}%
          </div>
          <div className="text-sm text-gray-600">Accuracy</div>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Clock size={24} className="text-warning-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {performanceData.overallStats.averageTime}s
          </div>
          <div className="text-sm text-gray-600">Avg Time</div>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Target size={24} className="text-secondary-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {performanceData.overallStats.studyStreak}
          </div>
          <div className="text-sm text-gray-600">Day Streak</div>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <TrendingUp size={24} className="text-primary-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            +12%
          </div>
          <div className="text-sm text-gray-600">Improvement</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Weekly Progress */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Weekly Progress</h3>
            <Calendar size={20} className="text-gray-400" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData.weeklyProgress}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
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

        {/* Topic Performance */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Topic Performance</h3>
            <BarChart3 size={20} className="text-gray-400" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData.topicPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="topic" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="accuracy" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Topic Breakdown */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Topic Breakdown</h3>
        <div className="space-y-4">
          {performanceData.topicPerformance.map((topic, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <BookOpen size={20} className="text-primary-600" />
                </div>
                <div className="ml-4">
                  <h4 className="font-medium text-gray-900">{topic.topic}</h4>
                  <p className="text-sm text-gray-600">
                    {topic.questions} questions answered
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-gray-900">
                  {topic.accuracy}%
                </div>
                <div className={`text-sm ${
                  topic.improvement > 0 ? 'text-success-600' : 'text-error-600'
                }`}>
                  {topic.improvement > 0 ? '+' : ''}{topic.improvement}% from last week
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Sessions */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Practice Sessions</h3>
        <div className="space-y-4">
          {performanceData.recentSessions.map((session) => (
            <div key={session.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center">
                  <Award size={20} className="text-success-600" />
                </div>
                <div className="ml-4">
                  <h4 className="font-medium text-gray-900">
                    {session.date}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {session.duration} min • {session.topics.join(', ')}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-success-600">
                  {session.accuracy}%
                </div>
                <div className="text-sm text-gray-600">
                  {session.correct}/{session.questions} correct
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Study Recommendations</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Focus Areas</h4>
            <div className="space-y-3">
              <div className="flex items-start">
                <AlertCircle size={16} className="text-warning-500 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Trigonometry</p>
                  <p className="text-xs text-gray-600">
                    Your accuracy is 58%. Focus on sine and cosine functions.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <AlertCircle size={16} className="text-warning-500 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Algebra</p>
                  <p className="text-xs text-gray-600">
                    Your accuracy is 65%. Review quadratic equations.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Strengths</h4>
            <div className="space-y-3">
              <div className="flex items-start">
                <CheckCircle size={16} className="text-success-500 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Calculus</p>
                  <p className="text-xs text-gray-600">
                    Excellent performance at 85% accuracy.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle size={16} className="text-success-500 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Statistics</p>
                  <p className="text-xs text-gray-600">
                    Strong improvement with 78% accuracy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;