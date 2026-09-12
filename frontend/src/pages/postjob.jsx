import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

const PostJob = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Web Development');
  const [skills, setSkills] = useState('');
  const [budget, setBudget] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/jobs', {
        title,
        description,
        category,
        budget: Number(budget),
        skills: skills.split(',').map((s) => s.trim()),
      });
      navigate('/jobs');
    } catch (err) {
      alert(err.response?.data?.message || 'Error posting job');
    }
  };

  return (
    <div className="container" style={{ maxWidth: '600px' }}>
      <div className="card">
        <h2>Post a New Project</h2>
        <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem' }}>
          <label>Project Title</label>
          <input
            className="input-field"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Build an E-commerce Landing Page"
          />

          <label>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Web Development">Web Development</option>
            <option value="Mobile App">Mobile App</option>
            <option value="UI/UX Design">UI/UX Design</option>
            <option value="Data Science">Data Science</option>
            <option value="Content Writing">Content Writing</option>
          </select>

          <label>Description & Requirements</label>
          <textarea
            rows="5"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Explain the project scope in detail..."
          />

          <label>Required Skills (comma-separated)</label>
          <input
            className="input-field"
            required
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="e.g. React, Node.js, CSS"
          />

          <label>Budget (₹)</label>
          <input
            className="input-field"
            type="number"
            required
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
            Publish Project
          </button>
        </form>
      </div>
    </div>
  );
};

// This line is essential:
export default PostJob;