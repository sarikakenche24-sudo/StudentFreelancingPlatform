import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Navbar from './components/navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BrowseJobs from './pages/BrowseJobs';
import PostJob from './pages/postjob';
import Dashboard from './pages/Dashboard';
import UploadProject from './pages/UploadProject';
import Portfolio from './pages/Portfolio';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/jobs" element={<BrowseJobs />} />
          <Route path="/portfolio" element={<Portfolio />} />

          <Route
            path="/post-job"
            element={
              <ProtectedRoute>
                <PostJob />
              </ProtectedRoute>
            }
          />

          <Route
            path="/upload-project"
            element={
              <ProtectedRoute>
                <UploadProject />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
