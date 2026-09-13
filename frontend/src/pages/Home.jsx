import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {/* Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
        color: '#ffffff',
        textAlign: 'center',
        padding: '3.5rem 1rem',
        borderRadius: '0 0 24px 24px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
      }}>
        <h1 style={{ fontSize: '2.8rem', fontWeight: '800', marginBottom: '0.5rem' }}>
          🎓 SkillBridge
        </h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>Student Freelancing Platform</p>
      </div>

      {/* Main Intro */}
      <div className="container" style={{ textAlign: 'center', marginTop: '2.5rem' }}>
        <h2 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#1e293b' }}>
          Connect Your Skills with Real Opportunities
        </h2>
        <p style={{ color: '#64748b', fontSize: '1.1rem', maxWidth: '650px', margin: '0.8rem auto 1.8rem' }}>
          A digital marketplace for college students to showcase their talents, build portfolios, and earn through freelance work.
        </p>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem' }}>
          <Link to="/jobs" className="btn btn-primary" style={{ padding: '0.8rem 1.8rem', fontSize: '1.05rem' }}>
            Browse Projects 💼
          </Link>
          <Link to="/register" className="btn btn-outline" style={{ padding: '0.8rem 1.8rem', fontSize: '1.05rem' }}>
            Get Started / Join 🚀
          </Link>
        </div>

        {/* Feature Cards */}
        <h3 style={{ fontSize: '1.6rem', marginBottom: '1.5rem', color: '#334155' }}>Features</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          <div className="card" style={{ textAlign: 'center', padding: '2rem 1.5rem' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.8rem' }}>📊</div>
            <h4>For Freelancers</h4>
            <p style={{ color: '#64748b', marginTop: '0.5rem', fontSize: '0.95rem' }}>
              Showcase your skills, upload projects, and find paid freelance gigs matching your expertise.
            </p>
            <Link to="/jobs" className="btn btn-outline" style={{ marginTop: '1rem', fontSize: '0.85rem' }}>
              Find Work
            </Link>
          </div>

          <div className="card" style={{ textAlign: 'center', padding: '2rem 1.5rem' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.8rem' }}>💼</div>
            <h4>For Clients</h4>
            <p style={{ color: '#64748b', marginTop: '0.5rem', fontSize: '0.95rem' }}>
              Post projects, review student proposals, and hire talented college professionals at student-friendly rates.
            </p>
            <Link to="/post-job" className="btn btn-outline" style={{ marginTop: '1rem', fontSize: '0.85rem' }}>
              Post a Project
            </Link>
          </div>

          <div className="card" style={{ textAlign: 'center', padding: '2rem 1.5rem' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.8rem' }}>🔒</div>
            <h4>Secure & Verified</h4>
            <p style={{ color: '#64748b', marginTop: '0.5rem', fontSize: '0.95rem' }}>
              College-verified student profiles, transparent reviews, and safe direct submissions.
            </p>
            <Link to="/portfolio" className="btn btn-outline" style={{ marginTop: '1rem', fontSize: '0.85rem' }}>
              View Showcase
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;