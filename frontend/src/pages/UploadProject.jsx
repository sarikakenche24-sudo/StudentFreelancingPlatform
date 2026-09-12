import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

const UploadProject = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [liveDemoUrl, setLiveDemoUrl] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    // Use FormData for file uploads
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('technologies', technologies);
    formData.append('githubUrl', githubUrl);
    formData.append('liveDemoUrl', liveDemoUrl);
    if (file) {
      formData.append('projectFile', file);
    }

    try {
      await API.post('/projects/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage('🎉 Project uploaded successfully!');
      setTimeout(() => navigate('/portfolio'), 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error uploading project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '650px' }}>
      <div className="card">
        <h2>🚀 Upload & Showcase Your Project</h2>
        <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
          Display your best college or personal projects so clients can discover and hire you.
        </p>

        {message && (
          <div style={{ padding: '0.8rem', background: '#dcfce7', color: '#15803d', borderRadius: '8px', marginBottom: '1rem' }}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label>Project Title *</label>
          <input
            className="input-field"
            type="text"
            required
            placeholder="e.g. AI-Powered Resume Screener"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label>Project Description *</label>
          <textarea
            rows="4"
            required
            placeholder="Describe what your project does, problems it solves, features, etc."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label>Tech Stack / Technologies (comma separated) *</label>
          <input
            className="input-field"
            type="text"
            required
            placeholder="e.g. React, Node.js, MongoDB, Tailwind CSS"
            value={technologies}
            onChange={(e) => setTechnologies(e.target.value)}
          />

          <label>GitHub Repository Link</label>
          <input
            className="input-field"
            type="url"
            placeholder="https://github.com/yourname/project"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
          />

          <label>Live Demo URL (Optional)</label>
          <input
            className="input-field"
            type="url"
            placeholder="https://my-app.vercel.app"
            value={liveDemoUrl}
            onChange={(e) => setLiveDemoUrl(e.target.value)}
          />

          <label>Attach Project File / Screenshot / ZIP (Optional)</label>
          <input
            type="file"
            className="input-field"
            onChange={(e) => setFile(e.target.files[0])}
            style={{ padding: '0.5rem' }}
          />

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
            {loading ? 'Uploading...' : 'Publish Project'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadProject;