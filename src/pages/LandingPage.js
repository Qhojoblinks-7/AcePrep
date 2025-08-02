import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Target, TrendingUp, Users, ArrowRight, CheckCircle } from 'lucide-react';

const LandingPage = () => {
  const features = [
    {
      icon: Target,
      title: 'Adaptive Learning',
      description: 'Our AI adjusts question difficulty based on your performance, ensuring optimal learning pace.'
    },
    {
      icon: TrendingUp,
      title: 'Progress Tracking',
      description: 'Visualize your improvement with detailed charts and performance analytics.'
    },
    {
      icon: BookOpen,
      title: 'Personalized Study Plans',
      description: 'Get customized study recommendations based on your weak areas and goals.'
    },
    {
      icon: Users,
      title: 'Expert Content',
      description: 'Access high-quality questions created by subject matter experts.'
    }
  ];

  const benefits = [
    'Track your progress across all subjects',
    'Identify and focus on weak areas',
    'Practice with timed mock exams',
    'Get detailed explanations for every answer',
    'Study anywhere, anytime on any device'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900">AcePrep</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="btn-primary"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Master Your Exams with
            <span className="text-primary-600"> Adaptive Learning</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            AcePrep uses intelligent algorithms to personalize your study experience. 
            Get questions tailored to your skill level and track your progress with detailed analytics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="btn-primary text-lg px-8 py-3 inline-flex items-center"
            >
              Start Free Trial
              <ArrowRight size={20} className="ml-2" />
            </Link>
            <Link
              to="/login"
              className="btn-secondary text-lg px-8 py-3"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose AcePrep?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform combines cutting-edge technology with proven learning methodologies 
            to help you achieve your exam goals faster.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="card text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon size={24} className="text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Everything You Need to Succeed
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle size={20} className="text-success-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link
                  to="/register"
                  className="btn-primary inline-flex items-center"
                >
                  Start Your Journey
                  <ArrowRight size={18} className="ml-2" />
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="card">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                      <BookOpen size={24} className="text-primary-600" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-success-600">85%</div>
                      <div className="text-sm text-gray-500">Success Rate</div>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-success-500 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <div className="text-sm text-gray-600">
                    Students who use AcePrep regularly see an average improvement of 85% in their exam scores.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Study Experience?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already achieving their exam goals with AcePrep.
          </p>
          <Link
            to="/register"
            className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors duration-200 inline-flex items-center"
          >
            Get Started Today
            <ArrowRight size={20} className="ml-2" />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="ml-3 text-xl font-bold">AcePrep</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2024 AcePrep. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;