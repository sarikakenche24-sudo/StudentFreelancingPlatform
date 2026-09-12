import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';

const Portfolio = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data } = await API.get('/projects');
      setProjects(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2>Student Project Showcase 🌟</h2>
          <p style={{ color: '#64748b' }}>Explore innovative projects built by student freelancers.</p>
        </div>
        <Link to="/upload-project" className="btn btn-primary">
          + Upload Your Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ color: '#64748b', fontSize: '1.1rem' }}>No projects uploaded yet.</p>
          <Link to="/upload-project" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            Be the first to upload!
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {projects.map((p) => (
            <div key={p._id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3>{p.title}</h3>
                <p style={{ color: '#64748b', fontSize: '0.85rem', margin: '0.3rem 0 0.8rem' }}>
                  By <strong>{p.student?.name}</strong> {p.student?.college ? `(${p.student.college})` : ''}
                </p>
                <p style={{ fontSize: '0.95rem', color: '#334155', marginBottom: '1rem' }}>{p.description}</p>
                
                <div style={{ marginBottom: '1rem' }}>
                  {p.technologies?.map((tech, idx) => (
                    <span key={idx} className="badge">{tech}</span>
                  ))}
                </div>
              </div>

              <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {p.githubUrl && (
                  <a href={p.githubUrl} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}>
                    💻 GitHub
                  </a>
                )}
                {p.liveDemoUrl && (
                  <a href={p.liveDemoUrl} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}>
                    🌐 Live Demo
                  </a>
                )}
                {p.filePath && (
                  <a href={`http://localhost:5000${p.filePath}`} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}>
                    📁 View File
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Portfolio;