import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container" style={{ textAlign: 'center', marginTop: '4rem' }}>
      <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem' }}>
        Where Students Gain Experience & Clients Get Work Done.
      </h1>
      <p style={{ color: '#64748b', fontSize: '1.2rem', maxWidth: '650px', margin: '0 auto 2rem' }}>
        SkillBridge connects college talent with real-world freelance projects. Build your portfolio while earning.
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        <Link to="/jobs" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '0.8rem 1.6rem' }}>
          Explore Projects
        </Link>
        <Link to="/register" className="btn btn-outline" style={{ fontSize: '1.1rem', padding: '0.8rem 1.6rem' }}>
          Join as Student
        </Link>
      </div>
    </div>
  );
};

export default Home;