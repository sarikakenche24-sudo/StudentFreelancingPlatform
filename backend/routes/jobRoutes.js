const express = require('express');
const router = express.Router();
const { 
  createJob, 
  getJobs, 
  getJobById, 
  submitProjectWork, 
  completeJob,
  getMyProjects,
  getClientProjects
} = require('../controllers/jobController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(getJobs)
  .post(protect, createJob);

// Dedicated user project listings
router.get('/my-projects', protect, getMyProjects);
router.get('/client-projects', protect, getClientProjects);

// Submit and Complete routes
router.put('/:id/submit', protect, submitProjectWork);
router.put('/:id/complete', protect, completeJob);

router.route('/:id').get(getJobById);

module.exports = router;