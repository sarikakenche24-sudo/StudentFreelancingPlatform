let Job;
try {
  Job = require('../models/Job');
} catch (e) {
  Job = require('../models/job');
}

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

exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('client', 'name email');
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.submitProjectWork = async (req, res) => {
  try {
    const { githubUrl, liveUrl, notes } = req.body;
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Project not found' });

    job.submission = { githubUrl, liveUrl, notes, submittedAt: new Date() };
    job.status = 'submitted';
    await job.save();
    res.json({ message: 'Work submitted successfully', job });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.completeJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Project not found' });

    job.status = 'completed';
    await job.save();
    res.json({ message: 'Project marked completed', job });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMyProjects = async (req, res) => {
  try {
    const jobs = await Job.find({ hiredFreelancer: req.user._id }).populate('client', 'name email');
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getClientProjects = async (req, res) => {
  try {
    const jobs = await Job.find({ client: req.user._id }).populate('hiredFreelancer', 'name email college');
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
