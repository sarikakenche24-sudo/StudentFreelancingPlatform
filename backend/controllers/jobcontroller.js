const Job = require('../models/Job');

// Create a job (Client)
exports.createJob = async (req, res) => {
  try {
    const job = await Job.create({
      ...req.body,
      client: req.user._id
    });
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all open jobs or filter by search keyword
exports.getJobs = async (req, res) => {
  try {
    const { keyword } = req.query;
    let query = { status: 'open' };

    if (keyword) {
      query.title = { $regex: keyword, $options: 'i' };
    }

    const jobs = await Job.find(query).populate('client', 'name email');
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single job details
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('client', 'name email');
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// @desc Freelancer submits completed project
// @route PUT /api/jobs/:id/submit
exports.submitProjectWork = async (req, res) => {
  try {
    const { githubUrl, liveUrl, notes } = req.body;
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Ensure only the hired student can submit work
    if (String(job.hiredFreelancer) !== String(req.user._id)) {
      return res.status(403).json({ message: 'Only the assigned freelancer can submit work' });
    }

    job.submission = {
      githubUrl,
      liveUrl,
      notes,
      submittedAt: new Date()
    };
    job.status = 'submitted';

    await job.save();
    res.json({ message: 'Project work submitted successfully!', job });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Client approves submission & marks project completed
// @route PUT /api/jobs/:id/complete
exports.completeJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Ensure only the job creator can mark complete
    if (String(job.client) !== String(req.user._id)) {
      return res.status(403).json({ message: 'Only the client can complete this project' });
    }

    job.status = 'completed';
    await job.save();

    res.json({ message: 'Project approved and marked completed!', job });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get projects assigned to logged-in freelancer
// @route GET /api/jobs/my-projects
exports.getMyProjects = async (req, res) => {
  try {
    const jobs = await Job.find({ hiredFreelancer: req.user._id }).populate('client', 'name email');
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get projects created by logged-in client
// @route GET /api/jobs/client-projects
exports.getClientProjects = async (req, res) => {
  try {
    const jobs = await Job.find({ client: req.user._id }).populate('hiredFreelancer', 'name email college');
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};