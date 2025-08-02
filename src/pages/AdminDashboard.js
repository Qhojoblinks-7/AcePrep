import React, { useState, useEffect } from 'react';
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  Plus,
  Edit,
  Trash2,
  Eye,
  BarChart3,
  Calendar,
  Award,
  AlertCircle
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  const [adminStats, setAdminStats] = useState({
    totalUsers: 0,
    totalQuestions: 0,
    activeSessions: 0,
    averageAccuracy: 0
  });

  const [questions, setQuestions] = useState([]);
  const [users, setUsers] = useState([]);
  const [analytics, setAnalytics] = useState({
    userGrowth: [],
    questionUsage: [],
    topicPerformance: []
  });

  useEffect(() => {
    // Simulate loading admin data
    setTimeout(() => {
      setAdminStats({
        totalUsers: 1247,
        totalQuestions: 856,
        activeSessions: 23,
        averageAccuracy: 78.5
      });

      setQuestions([
        {
          id: 1,
          question: "What is the solution to the equation 2x + 5 = 13?",
          topic: "Algebra",
          difficulty: "Medium",
          usage: 45,
          accuracy: 82,
          createdAt: "2024-01-10"
        },
        {
          id: 2,
          question: "In a right triangle, if one angle is 30°, what is the measure of the other acute angle?",
          topic: "Geometry",
          difficulty: "Easy",
          usage: 38,
          accuracy: 91,
          createdAt: "2024-01-08"
        },
        {
          id: 3,
          question: "What is the value of sin(90°)?",
          topic: "Trigonometry",
          difficulty: "Medium",
          usage: 29,
          accuracy: 76,
          createdAt: "2024-01-05"
        }
      ]);

      setUsers([
        {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          role: "student",
          joinedDate: "2024-01-15",
          lastActive: "2024-01-20",
          questionsAnswered: 156,
          accuracy: 79
        },
        {
          id: 2,
          name: "Jane Smith",
          email: "jane@example.com",
          role: "student",
          joinedDate: "2024-01-10",
          lastActive: "2024-01-19",
          questionsAnswered: 89,
          accuracy: 85
        },
        {
          id: 3,
          name: "Mike Johnson",
          email: "mike@example.com",
          role: "student",
          joinedDate: "2024-01-08",
          lastActive: "2024-01-18",
          questionsAnswered: 234,
          accuracy: 72
        }
      ]);

      setAnalytics({
        userGrowth: [
          { month: 'Jan', users: 120 },
          { month: 'Feb', users: 180 },
          { month: 'Mar', users: 250 },
          { month: 'Apr', users: 320 },
          { month: 'May', users: 400 },
          { month: 'Jun', users: 480 }
        ],
        questionUsage: [
          { topic: 'Algebra', usage: 45 },
          { topic: 'Geometry', usage: 38 },
          { topic: 'Trigonometry', usage: 29 },
          { topic: 'Calculus', usage: 22 },
          { topic: 'Statistics', usage: 18 }
        ],
        topicPerformance: [
          { topic: 'Algebra', accuracy: 78 },
          { topic: 'Geometry', accuracy: 85 },
          { topic: 'Trigonometry', accuracy: 72 },
          { topic: 'Calculus', accuracy: 68 },
          { topic: 'Statistics', accuracy: 81 }
        ]
      });

      setLoading(false);
    }, 1000);
  }, []);

  const handleDeleteQuestion = (questionId) => {
    setQuestions(prev => prev.filter(q => q.id !== questionId));
  };

  const handleDeleteUser = (userId) => {
    setUsers(prev => prev.filter(u => u.id !== userId));
  };

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
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Manage content, users, and monitor platform performance
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <Users size={24} className="text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{adminStats.totalUsers}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
              <BookOpen size={24} className="text-success-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Questions</p>
              <p className="text-2xl font-bold text-gray-900">{adminStats.totalQuestions}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center">
              <TrendingUp size={24} className="text-warning-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Sessions</p>
              <p className="text-2xl font-bold text-gray-900">{adminStats.activeSessions}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
              <Award size={24} className="text-secondary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Accuracy</p>
              <p className="text-2xl font-bold text-gray-900">{adminStats.averageAccuracy}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', name: 'Overview', icon: BarChart3 },
            { id: 'questions', name: 'Questions', icon: BookOpen },
            { id: 'users', name: 'Users', icon: Users },
            { id: 'analytics', name: 'Analytics', icon: TrendingUp }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon size={16} className="mr-2" />
                {tab.name}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Charts */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">User Growth</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={analytics.userGrowth}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="users" stroke="#2563eb" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Question Usage by Topic</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analytics.questionUsage}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="topic" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="usage" fill="#2563eb" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-primary-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                    <Users size={16} className="text-white" />
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-900">New user registered</p>
                    <p className="text-sm text-gray-600">2 minutes ago</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-success-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-success-600 rounded-full flex items-center justify-center">
                    <BookOpen size={16} className="text-white" />
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-900">New question added</p>
                    <p className="text-sm text-gray-600">15 minutes ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'questions' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Question Management</h2>
            <button className="btn-primary inline-flex items-center">
              <Plus size={18} className="mr-2" />
              Add Question
            </button>
          </div>

          <div className="card">
            <div className="space-y-4">
              {questions.map((question) => (
                <div key={question.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-2">{question.question}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="badge badge-primary">{question.topic}</span>
                      <span className="badge badge-secondary">{question.difficulty}</span>
                      <span>Used {question.usage} times</span>
                      <span>{question.accuracy}% accuracy</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Eye size={16} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-primary-600">
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => handleDeleteQuestion(question.id)}
                      className="p-2 text-gray-400 hover:text-error-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">User Management</h2>
            <button className="btn-primary inline-flex items-center">
              <Plus size={18} className="mr-2" />
              Add User
            </button>
          </div>

          <div className="card">
            <div className="space-y-4">
              {users.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <Users size={20} className="text-primary-600" />
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium text-gray-900">{user.name}</h4>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <p className="text-xs text-gray-500">
                        Joined {user.joinedDate} • Last active {user.lastActive}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">
                      {user.questionsAnswered} questions • {user.accuracy}% accuracy
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Eye size={16} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-primary-600">
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(user.id)}
                        className="p-2 text-gray-400 hover:text-error-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Topic Performance</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analytics.topicPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="topic" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="accuracy" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Metrics</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-primary-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Daily Active Users</span>
                  <span className="text-lg font-bold text-primary-600">234</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-success-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Questions Answered Today</span>
                  <span className="text-lg font-bold text-success-600">1,247</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-warning-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Average Session Time</span>
                  <span className="text-lg font-bold text-warning-600">23 min</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">New Users This Week</span>
                  <span className="text-lg font-bold text-secondary-600">45</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">System Alerts</h3>
            <div className="space-y-3">
              <div className="flex items-start p-3 bg-warning-50 rounded-lg">
                <AlertCircle size={16} className="text-warning-500 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-warning-800">High server load detected</p>
                  <p className="text-xs text-warning-700">Consider scaling up resources</p>
                </div>
              </div>
              <div className="flex items-start p-3 bg-success-50 rounded-lg">
                <div className="w-2 h-2 bg-success-500 rounded-full mt-1.5 mr-2"></div>
                <div>
                  <p className="text-sm font-medium text-success-800">All systems operational</p>
                  <p className="text-xs text-success-700">No issues detected</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;