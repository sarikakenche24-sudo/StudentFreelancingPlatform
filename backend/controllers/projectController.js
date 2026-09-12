const Project = require('../models/Project');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure 'uploads' directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

exports.upload = multer({ storage });

// @desc Upload a new student project
// @route POST /api/projects/upload
exports.createProject = async (req, res) => {
  try {
    const { title, description, technologies, githubUrl, liveDemoUrl } = req.body;
    
    // File uploaded via multer
    const filePath = req.file ? `/uploads/${req.file.filename}` : '';

    const project = await Project.create({
      student: req.user._id,
      title,
      description,
      technologies: technologies ? technologies.split(',').map((t) => t.trim()) : [],
      githubUrl,
      liveDemoUrl,
      filePath
    });

    res.status(201).json({ message: 'Project uploaded successfully!', project });
  } catch (error) {
    console.error('Project upload error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc Get all uploaded projects (Public Portfolio Showcase)
// @route GET /api/projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate('student', 'name college email rating')
      .sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get projects uploaded by the logged-in student
// @route GET /api/projects/my
exports.getMyProjects = async (req, res) => {
  try {
    const projects = await Project.find({ student: req.user._id }).sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};