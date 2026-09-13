import React, { useState, useEffect } from 'react';
import API from '../api/axios';

const ClientDashboard = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [category, setCategory] = useState('Web Development');
  const [skills, setSkills] = useState('');
  const [myProjects, setMyProjects] = useState([]);
  const [activeBids, setActiveBids] = useState([]);
  const [selectedProjectTitle, setSelectedProjectTitle] = useState('');

  const loadProjects = async () => {
    const { data } = await API.get('/projects');
    setMyProjects(data);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleCreateGig = async (e) => {
    e.preventDefault();
    try {
      await API.post('/projects', {
        title,
        description,
        budget: Number(budget),
        category,
        requiredSkills: skills.split(',').map((s) => s.trim())
      });
      alert('Project posted successfully!');
      setTitle('');
      setDescription('');
      setBudget('');
      setSkills('');
      loadProjects();
    } catch (err) {
      alert(err.response?.data?.message || 'Error posting project');
    }
  };

  const viewProposals = async (project) => {
    setSelectedProjectTitle(project.title);
    const { data } = await API.get(`/proposals/project/${project._id}`);
    setActiveBids(data);
  };

  const handleHire = async (proposalId) => {
    try {
      await API.put(`/proposals/${proposalId}/hire`);
      alert('Student hired! Project is now in progress.');
      setActiveBids([]);
      loadProjects();
    } catch (err) {
      alert(err.response?.data?.message || 'Error hiring student');
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '2rem auto', padding: '1rem' }}>
      <h2>Client Hirer Dashboard</h2>

      {/* Post Project Form */}
      <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
        <h3>Post a New Gig</h3>
        <form onSubmit={handleCreateGig}>
          <input type="text" placeholder="Project Title" required value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: '100%', padding: '0.6rem', margin: '0.4rem 0' }} />
          <textarea placeholder="Deliverables & requirements..." required value={description} onChange={(e) => setDescription(e.target.value)} style={{ width: '100%', padding: '0.6rem', margin: '0.4rem 0' }} />
          <div style={{ display: 'flex', gap: '1rem', margin: '0.4rem 0' }}>
            <input type="number" placeholder="Budget (₹)" required value={budget} onChange={(e) => setBudget(e.target.value)} style={{ flex: 1, padding: '0.6rem' }} />
            <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ flex: 1, padding: '0.6rem' }}>
              <option value="Web Development">Web Development</option>
              <option value="App Development">App Development</option>
              <option value="AI / Machine Learning">AI / Machine Learning</option>
              <option value="UI/UX Design">UI/UX Design</option>
            </select>
          </div>
          <input type="text" placeholder="Required Skills (e.g. React, Node.js)" required value={skills} onChange={(e) => setSkills(e.target.value)} style={{ width: '100%', padding: '0.6rem', margin: '0.4rem 0' }} />
          <button type="submit" style={{ padding: '0.7rem 1.5rem', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', marginTop: '0.5rem' }}>
            Publish Gig
          </button>
        </form>
      </div>

      {/* Projects List */}
      <h3>Platform Project Listings</h3>
      {myProjects.map((p) => (
        <div key={p._id} style={{ border: '1px solid #cbd5e1', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h4>{p.title}</h4>
            <p style={{ color: '#64748b' }}>Status: <strong>{p.status}</strong> | Budget: ₹{p.budget}</p>
          </div>
          <button onClick={() => viewProposals(p)} style={{ padding: '0.5rem 1rem', background: '#0284c7', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Check Applications
          </button>
        </div>
      ))}

      {/* Proposals Drawer / List */}
      {activeBids.length > 0 && (
        <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#fff', border: '2px solid #4f46e5', borderRadius: '8px' }}>
          <h3>Applications for: {selectedProjectTitle}</h3>
          {activeBids.map((bid) => (
            <div key={bid._id} style={{ borderBottom: '1px solid #e2e8f0', padding: '1rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p><strong>Freelancer:</strong> {bid.student?.name} ({bid.student?.college || 'Student'})</p>
                <p><strong>Bid Amount:</strong> ₹{bid.bidAmount} in {bid.deliveryDays} days</p>
                <p><strong>Pitch:</strong> "{bid.coverLetter}"</p>
              </div>
              {bid.status === 'PENDING' ? (
                <button onClick={() => handleHire(bid._id)} style={{ padding: '0.5rem 1rem', background: '#10b981', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                  Hire Freelancer
                </button>
              ) : (
                <span style={{ color: '#10b981', fontWeight: 'bold' }}>{bid.status}</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientDashboard;