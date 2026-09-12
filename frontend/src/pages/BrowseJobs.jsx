import React, { useState, useEffect } from 'react';
import API from '../services/api';

const BrowseJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [bidAmount, setBidAmount] = useState('');
  const [deliveryDays, setDeliveryDays] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  // 👇 MUST BE API.get, NOT API.post
  const fetchJobs = async (query = '') => {
    try {
      const { data } = await API.get(`/jobs?keyword=${query}`);
      setJobs(data);
    } catch (err) {
      console.error('Error fetching jobs:', err);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs(search);
  };

  const handleApply = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in as a student to apply for projects.');
      return;
    }

    try {
      await API.post('/proposals', {
        jobId: selectedJob._id,
        coverLetter,
        bidAmount: Number(bidAmount),
        deliveryDays: Number(deliveryDays)
      });
      setMessage('🎉 Proposal submitted successfully!');
      setSelectedJob(null);
      setCoverLetter('');
      setBidAmount('');
      setDeliveryDays('');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error submitting proposal');
    }
  };

  return (
    <div className="container">
      <h2>Explore Student Freelance Projects</h2>
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem', margin: '1.5rem 0' }}>
        <input 
          className="input-field" 
          placeholder="Search by keywords (e.g. React, Python)..." 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          style={{ marginBottom: 0 }}
        />
        <button type="submit" className="btn btn-primary">Search</button>
      </form>

      {message && (
        <div style={{ padding: '0.8rem', background: '#dcfce7', color: '#15803d', borderRadius: '8px', marginBottom: '1rem' }}>
          {message}
        </div>
      )}

      <div className="grid-2">
        <div>
          {jobs.length === 0 ? (
            <div className="card">
              <p style={{ color: '#64748b' }}>No open projects found yet. You can post one by logging in as a Client!</p>
            </div>
          ) : (
            jobs.map((job) => (
              <div key={job._id} className="card">
                <h3>{job.title}</h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem', margin: '0.5rem 0' }}>{job.description}</p>
                <div style={{ margin: '0.5rem 0' }}>
                  {job.skills?.map((skill, index) => (
                    <span key={index} className="badge">{skill}</span>
                  ))}
                </div>
                <p style={{ fontWeight: 'bold', margin: '0.5rem 0' }}>Budget: ₹{job.budget}</p>
                <button onClick={() => setSelectedJob(job)} className="btn btn-outline" style={{ marginTop: '0.5rem' }}>
                  Apply Now
                </button>
              </div>
            ))
          )}
        </div>

        {/* Application Panel */}
        <div>
          {selectedJob ? (
            <div className="card" style={{ border: '2px solid #4f46e5' }}>
              <h3>Apply for: {selectedJob.title}</h3>
              <p style={{ color: '#64748b', marginBottom: '1rem' }}>Client Budget: ₹{selectedJob.budget}</p>
              <form onSubmit={handleApply}>
                <label>Your Bid Amount (₹)</label>
                <input className="input-field" type="number" required value={bidAmount} onChange={(e) => setBidAmount(e.target.value)} />

                <label>Estimated Delivery (in Days)</label>
                <input className="input-field" type="number" required value={deliveryDays} onChange={(e) => setDeliveryDays(e.target.value)} />

                <label>Cover Letter</label>
                <textarea rows="4" required value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)} placeholder="Why are you the right student for this project?"></textarea>

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Submit Proposal</button>
                <button type="button" onClick={() => setSelectedJob(null)} className="btn btn-outline" style={{ width: '100%', marginTop: '0.5rem' }}>Cancel</button>
              </form>
            </div>
          ) : (
            <div className="card" style={{ textAlign: 'center', color: '#64748b' }}>
              Select a project on the left to review details and apply.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowseJobs;