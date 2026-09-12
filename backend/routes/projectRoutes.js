const express = require('express');
const router = express.Router();
const { 
  createProject, 
  getAllProjects, 
  getMyProjects, 
  upload 
} = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getAllProjects);
router.get('/my', protect, getMyProjects);
router.post('/upload', protect, upload.single('projectFile'), createProject);

module.exports = router;