import Job from "../models/Job.js";

// ==========================================
// CREATE JOB
// POST /api/jobs
// ==========================================
const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      skills,
      budget,
      deadline,
    } = req.body;

    // Check required fields
    if (
      !title ||
      !description ||
      !category ||
      !skills ||
      !Array.isArray(skills) ||
      skills.length === 0 ||
      budget === undefined ||
      budget === null ||
      !deadline
    ) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    // Check authentication
    if (!req.user) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    // Create job
    const job = await Job.create({
      title,
      description,
      category,
      skills,
      budget,
      deadline,
      client: req.user._id,
    });

    return res.status(201).json({
      message: "Project created successfully",
      job,
    });
  } catch (error) {
    console.error("Create Job Error:", error);

    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


// ==========================================
// GET ALL JOBS
// GET /api/jobs
// ==========================================
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate("client", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    console.error("Get Jobs Error:", error);

    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


// ==========================================
// GET SINGLE JOB
// GET /api/jobs/:id
// ==========================================
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate("client", "name email");

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    return res.status(200).json(job);
  } catch (error) {
    console.error("Get Job Error:", error);

    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


// ==========================================
// DELETE JOB
// DELETE /api/jobs/:id
// ==========================================
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    // Check job owner
    if (job.client.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not authorized to delete this job",
      });
    }

    await job.deleteOne();

    return res.status(200).json({
      message: "Job deleted successfully",
    });
  } catch (error) {
    console.error("Delete Job Error:", error);

    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


// ==========================================
// EXPORT CONTROLLERS
// ==========================================
export {
  createJob,
  getJobs,
  getJobById,
  deleteJob,
};