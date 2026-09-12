import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="container">
      <h2>Welcome, {user?.name || 'User'}!</h2>
      <p style={{ color: '#64748b', marginBottom: '2rem' }}>
        Account Role: <strong style={{ textTransform: 'capitalize' }}>{user?.role || 'freelancer'}</strong>
      </p>

      <div className="grid-2">
        {/* Card 1: Upload Portfolio Project */}
        <div className="card" style={{ borderTop: '4px solid #4f46e5' }}>
          <h3>🚀 Showcase Your Work</h3>
          <p style={{ color: '#64748b', margin: '0.5rem 0 1rem' }}>
            Upload your college or personal projects with GitHub links, live demos, and attachments.
          </p>
          <Link to="/upload-project" className="btn btn-primary">
            Upload Project to Portfolio
          </Link>
        </div>

        {/* Card 2: Post Freelance Opportunity */}
        <div className="card" style={{ borderTop: '4px solid #059669' }}>
          <h3>💼 Post a Freelance Project</h3>
          <p style={{ color: '#64748b', margin: '0.5rem 0 1rem' }}>
            Looking to hire a student? Post a new project specifying skills and budget.
          </p>
          <Link to="/post-job" className="btn btn-primary" style={{ background: '#059669' }}>
            + Post a New Job
          </Link>
        </div>
      </div>

      <div className="card" style={{ marginTop: '2rem' }}>
        <h3>Explore Platform</h3>
        <p style={{ color: '#64748b', marginBottom: '1rem' }}>Check out what other students have built or apply for open jobs.</p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/jobs" className="btn btn-outline">Browse Freelance Jobs</Link>
          <Link to="/portfolio" className="btn btn-outline">View Student Showcase</Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;