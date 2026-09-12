import React, { useState, useEffect } from 'react';
import API from '../api/axios';

const StudentDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [deliveryDays, setDeliveryDays] = useState('');
  const [coverLetter, setCoverLetter] = useState('');

  const fetchProjects = async () => {
    const { data } = await API.get(`/projects?keyword=${keyword}`);
    setProjects(data);
  };

  useEffect(() => {
    fetchProjects();
  }, [keyword]);

  const handleApply = async (e) => {
    e.preventDefault();
    try {
      await API.post('/proposals', {
        projectId: selectedProject._id,
        bidAmount,
        deliveryDays,
        coverLetter
      });
      alert('Proposal submitted successfully!');
      setSelectedProject(null);
    } catch (err) {
      alert(err.response?.data?.message || 'Error sending proposal');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1100px', margin: 'auto' }}>
      <h2>Available Freelance Projects</h2>
      
      <input
        type="text"
        placeholder="Search by React, Python, UI/UX..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        style={{ width: '100%', padding: '0.8rem', margin: '1rem 0' }}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
        {projects.map((p) => (
          <div key={p._id} style={{ border: '1px solid #ccc', padding: '1.2rem', borderRadius: '8px' }}>
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <p><strong>Budget:</strong> ₹{p.budget} | <strong>Category:</strong> {p.category}</p>
            <p><strong>Skills:</strong> {p.requiredSkills.join(', ')}</p>
            <button 
              onClick={() => setSelectedProject(p)}
              style={{ background: '#4f46e5', color: '#fff', padding: '0.6rem 1rem', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Submit Bid
            </button>
          </div>
        ))}
      </div>

      {selectedProject && (
        <div style={{ position: 'fixed', top: '20%', left: '30%', background: '#fff', border: '1px solid #333', padding: '2rem', width: '400px' }}>
          <h3>Bid for: {selectedProject.title}</h3>
          <form onSubmit={handleApply}>
            <input type="number" placeholder="Your Bid (₹)" value={bidAmount} onChange={e => setBidAmount(e.target.value)} required style={{ display: 'block', margin: '0.5rem 0', width: '100%' }} />
            <input type="number" placeholder="Days to deliver" value={deliveryDays} onChange={e => setDeliveryDays(e.target.value)} required style={{ display: 'block', margin: '0.5rem 0', width: '100%' }} />
            <textarea placeholder="Cover Letter/Pitch" value={coverLetter} onChange={e => setCoverLetter(e.target.value)} required style={{ display: 'block', margin: '0.5rem 0', width: '100%' }} />
            <button type="submit" style={{ background: '#10b981', color: '#fff', padding: '0.5rem 1rem', border: 'none' }}>Send</button>
            <button type="button" onClick={() => setSelectedProject(null)} style={{ marginLeft: '1rem' }}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;