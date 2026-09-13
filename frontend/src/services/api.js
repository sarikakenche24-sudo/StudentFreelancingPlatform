import axios from 'axios';

const API = axios.create({
  // 👇 PASTE YOUR RENDER URL HERE (keep /api at the end)
  baseURL: ' https://studentfreelancingplatform.onrender.com',
});

// Automatically attaches login token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;