import express from "express";
import Job from "../models/Job.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


// =====================================================
// CREATE JOB
// POST /api/jobs
// =====================================================

router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      title,
      description,
      budget,
      skills,
    } = req.body;

    if (!title || !description || budget === undefined) {
      return res.status(400).json({
        message: "Title, description and budget are required",
      });
    }

    // Only client can create jobs
    if (req.user.role !== "client") {
      return res.status(403).json({
        message: "Only clients can create jobs",
      });
    }

    const job = await Job.create({
      title,
      description,
      budget,
      skills: skills || [],
      client: req.user._id,
    });

    res.status(201).json({
      message: "Job created successfully",
      job,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});


// =====================================================
// GET ALL JOBS
// GET /api/jobs
// =====================================================

router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate("client", "name email")
      .populate("hiredStudent", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(jobs);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});


// =====================================================
// STEP 45
// COMPLETE JOB
// PUT /api/jobs/:id/complete
// =====================================================

router.put(
  "/:id/complete",
  authMiddleware,
  async (req, res) => {
    try {
      // Only clients
      if (req.user.role !== "client") {
        return res.status(403).json({
          message: "Only clients can complete projects",
        });
      }

      // Find job
      const job =
        await Job.findById(req.params.id);

      if (!job) {
        return res.status(404).json({
          message: "Project not found",
        });
      }

      // Check ownership
      if (
        job.client.toString() !==
        req.user._id.toString()
      ) {
        return res.status(403).json({
          message: "Not authorized",
        });
      }

      // Check current status
      if (job.status !== "in-progress") {
        return res.status(400).json({
          message:
            "Only in-progress projects can be completed",
        });
      }

      // Complete project
      job.status = "completed";

      await job.save();

      res.status(200).json({
        message: "Project completed successfully",
        job,
      });

    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Server error",
        error: error.message,
      });
    }
  }
);


export default router;