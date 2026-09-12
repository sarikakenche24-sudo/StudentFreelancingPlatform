import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{ 
      background: '#ffffff', 
      borderBottom: '1px solid #e2e8f0', 
      padding: '1rem 2rem', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
    }}>
      {/* Logo */}
      <Link to="/" style={{ textDecoration: 'none', fontSize: '1.4rem', fontWeight: 'bold', color: '#4f46e5' }}>
        SkillBridge 🎓
      </Link>

      {/* Navigation Links */}
      <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center' }}>
        <Link to="/jobs" style={{ textDecoration: 'none', color: '#64748b', fontWeight: '500' }}>
          Browse Projects
        </Link>
        <Link to="/portfolio" style={{ textDecoration: 'none', color: '#64748b', fontWeight: '500' }}>
          Showcase
        </Link>

        {user ? (
          <>
            {/* Buttons based on role, with easy access */}
            <Link 
              to="/upload-project" 
              className="btn btn-primary" 
              style={{ padding: '0.4rem 0.9rem', fontSize: '0.9rem', background: '#4f46e5' }}
            >
              🚀 Upload Project
            </Link>

            <Link 
              to="/post-job" 
              className="btn btn-outline" 
              style={{ padding: '0.4rem 0.9rem', fontSize: '0.9rem' }}
            >
              + Post Job (Client)
            </Link>

            <Link to="/dashboard" style={{ textDecoration: 'none', fontWeight: '600', color: '#1e293b' }}>
              Dashboard
            </Link>

            <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '0.4rem 0.8rem' }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline" style={{ padding: '0.4rem 0.8rem' }}>
              Login
            </Link>
            <Link to="/register" className="btn btn-primary" style={{ padding: '0.4rem 0.8rem' }}>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;