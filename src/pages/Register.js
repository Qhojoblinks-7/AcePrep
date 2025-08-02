import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [preferences, setPreferences] = useState({
    examType: '',
    subjects: [],
    studyGoals: []
  });

  const examTypes = [
    'SAT',
    'ACT',
    'GRE',
    'GMAT',
    'LSAT',
    'MCAT',
    'Professional Certification',
    'Academic Exam',
    'Other'
  ];

  const subjects = [
    'Mathematics',
    'English',
    'Science',
    'History',
    'Literature',
    'Computer Science',
    'Economics',
    'Psychology',
    'Physics',
    'Chemistry',
    'Biology'
  ];

  const studyGoals = [
    'Improve overall score',
    'Focus on weak areas',
    'Prepare for specific exam',
    'Build confidence',
    'Learn new topics'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePreferenceChange = (type, value) => {
    setPreferences(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const handleSubjectToggle = (subject) => {
    setPreferences(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter(s => s !== subject)
        : [...prev.subjects, subject]
    }));
  };

  const handleGoalToggle = (goal) => {
    setPreferences(prev => ({
      ...prev,
      studyGoals: prev.studyGoals.includes(goal)
        ? prev.studyGoals.filter(g => g !== goal)
        : [...prev.studyGoals, goal]
    }));
  };

  const validateForm = () => {
    if (!formData.displayName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return false;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setError('');
      setLoading(true);
      await signup(formData.email, formData.password, formData.displayName);
      setStep(2);
    } catch (error) {
      console.error('Registration error:', error);
      if (error.code === 'auth/email-already-in-use') {
        setError('An account with this email already exists');
      } else if (error.code === 'auth/invalid-email') {
        setError('Please enter a valid email address');
      } else if (error.code === 'auth/weak-password') {
        setError('Password is too weak. Please choose a stronger password');
      } else {
        setError('Failed to create account. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePreferencesSubmit = () => {
    // Here you would typically save the preferences to the user's profile
    // For now, we'll just navigate to the dashboard
    navigate('/dashboard');
  };

  const passwordStrength = () => {
    const { password } = formData;
    if (password.length === 0) return { score: 0, text: '', color: '' };
    if (password.length < 6) return { score: 1, text: 'Weak', color: 'text-error-600' };
    if (password.length < 8) return { score: 2, text: 'Fair', color: 'text-warning-600' };
    if (password.length < 10) return { score: 3, text: 'Good', color: 'text-primary-600' };
    return { score: 4, text: 'Strong', color: 'text-success-600' };
  };

  const strength = passwordStrength();

  if (step === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full space-y-8">
          <div className="text-center">
            <div className="flex justify-center">
              <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
            </div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Personalize Your Experience
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Help us tailor your study experience (optional)
            </p>
          </div>

          <div className="card">
            <div className="space-y-6">
              {/* Exam Type */}
              <div>
                <label className="form-label">What type of exam are you preparing for?</label>
                <select
                  value={preferences.examType}
                  onChange={(e) => handlePreferenceChange('examType', e.target.value)}
                  className="input-field"
                >
                  <option value="">Select an exam type</option>
                  {examTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Subjects */}
              <div>
                <label className="form-label">Which subjects do you want to study?</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {subjects.map(subject => (
                    <label key={subject} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={preferences.subjects.includes(subject)}
                        onChange={() => handleSubjectToggle(subject)}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{subject}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Study Goals */}
              <div>
                <label className="form-label">What are your study goals?</label>
                <div className="space-y-2">
                  {studyGoals.map(goal => (
                    <label key={goal} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={preferences.studyGoals.includes(goal)}
                        onChange={() => handleGoalToggle(goal)}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{goal}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="btn-secondary flex-1"
                >
                  Skip for now
                </button>
                <button
                  onClick={handlePreferencesSubmit}
                  className="btn-primary flex-1"
                >
                  Complete Setup
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center">
            <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Start your journey to exam success
          </p>
        </div>

        {/* Form */}
        <div className="card">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-error-50 border border-error-200 rounded-lg p-4">
                <div className="flex">
                  <AlertCircle size={20} className="text-error-500 mt-0.5 mr-3 flex-shrink-0" />
                  <div className="text-sm text-error-700">
                    {error}
                  </div>
                </div>
              </div>
            )}

            <div>
              <label htmlFor="displayName" className="form-label">
                Full name
              </label>
              <input
                id="displayName"
                name="displayName"
                type="text"
                autoComplete="name"
                required
                value={formData.displayName}
                onChange={handleInputChange}
                className="input-field"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="input-field"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="input-field pr-10"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={20} className="text-gray-400" />
                  ) : (
                    <Eye size={20} className="text-gray-400" />
                  )}
                </button>
              </div>
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          strength.score === 1 ? 'bg-error-500 w-1/4' :
                          strength.score === 2 ? 'bg-warning-500 w-1/2' :
                          strength.score === 3 ? 'bg-primary-500 w-3/4' :
                          strength.score === 4 ? 'bg-success-500 w-full' : ''
                        }`}
                      />
                    </div>
                    <span className={`text-xs font-medium ${strength.color}`}>
                      {strength.text}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="form-label">
                Confirm password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="input-field pr-10"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} className="text-gray-400" />
                  ) : (
                    <Eye size={20} className="text-gray-400" />
                  )}
                </button>
              </div>
              {formData.confirmPassword && (
                <div className="mt-2 flex items-center">
                  {formData.password === formData.confirmPassword ? (
                    <CheckCircle size={16} className="text-success-500 mr-2" />
                  ) : (
                    <AlertCircle size={16} className="text-error-500 mr-2" />
                  )}
                  <span className={`text-xs ${
                    formData.password === formData.confirmPassword ? 'text-success-600' : 'text-error-600'
                  }`}>
                    {formData.password === formData.confirmPassword ? 'Passwords match' : 'Passwords do not match'}
                  </span>
                </div>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-3 text-base font-medium"
              >
                {loading ? 'Creating account...' : 'Create account'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Already have an account?</span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/login"
                className="btn-secondary w-full py-3 text-base font-medium"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            By creating an account, you agree to our{' '}
            <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;