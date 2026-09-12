import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'freelancer',
    college: '',
    skills: ''
  });
  const [error, setError] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        skills: formData.skills ? formData.skills.split(',').map(s => s.trim()) : []
      };
      await register(payload);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="container" style={{ maxWidth: '480px', marginTop: '2rem' }}>
      <div className="card">
        <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Create an Account</h2>
        {error && <p style={{ color: 'red', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input className="input-field" type="text" required onChange={(e) => setFormData({...formData, name: e.target.value})} />

          <label>Email</label>
          <input className="input-field" type="email" required onChange={(e) => setFormData({...formData, email: e.target.value})} />

          <label>Password</label>
          <input className="input-field" type="password" required onChange={(e) => setFormData({...formData, password: e.target.value})} />

          <label>I want to:</label>
          <select value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}>
            <option value="freelancer">Work as a Student Freelancer</option>
            <option value="client">Hire Student Freelancers (Client)</option>
          </select>

          {formData.role === 'freelancer' && (
            <>
              <label>College / University</label>
              <input className="input-field" type="text" onChange={(e) => setFormData({...formData, college: e.target.value})} />

              <label>Skills (comma separated, e.g. React, Python, UI/UX)</label>
              <input className="input-field" type="text" onChange={(e) => setFormData({...formData, skills: e.target.value})} />
            </>
          )}

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Register</button>
        </form>
        <p style={{ marginTop: '1rem', fontSize: '0.9rem', textAlign: 'center' }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;