import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Practice from './pages/Practice';
import Exams from './pages/Exams';
import Reports from './pages/Reports';
import AdminDashboard from './pages/AdminDashboard';
import Layout from './components/Layout';

// Protected Route Component
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { currentUser, userRole } = useAuth();
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  if (adminOnly && userRole !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

// Main App Component
function AppContent() {
  const { currentUser } = useAuth();

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={currentUser ? <Navigate to="/dashboard" replace /> : <LandingPage />} />
          <Route path="/login" element={currentUser ? <Navigate to="/dashboard" replace /> : <Login />} />
          <Route path="/register" element={currentUser ? <Navigate to="/dashboard" replace /> : <Register />} />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/practice" element={
            <ProtectedRoute>
              <Layout>
                <Practice />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/exams" element={
            <ProtectedRoute>
              <Layout>
                <Exams />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/reports" element={
            <ProtectedRoute>
              <Layout>
                <Reports />
              </Layout>
            </ProtectedRoute>
          } />
          
          {/* Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute adminOnly={true}>
              <Layout>
                <AdminDashboard />
              </Layout>
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

// Root App Component with Auth Provider
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;