import express from "express";
import Proposal from "../models/Proposal.js";
import Job from "../models/Job.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


// =====================================================
// 1. STUDENT / FREELANCER SUBMITS PROPOSAL
// POST /api/proposals
// =====================================================

router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      job,
      coverLetter,
      bidAmount,
      estimatedDays,
    } = req.body;

    if (
      !job ||
      !coverLetter ||
      bidAmount === undefined ||
      !estimatedDays
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Check job exists
    const existingJob = await Job.findById(job);

    if (!existingJob) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    // Check duplicate proposal
    const existingProposal = await Proposal.findOne({
      job: job,
      freelancer: req.user._id,
    });

    if (existingProposal) {
      return res.status(400).json({
        message: "You have already submitted a proposal for this job",
      });
    }

    // Create proposal
    const proposal = await Proposal.create({
      job: job,
      freelancer: req.user._id,
      coverLetter: coverLetter,
      bidAmount: bidAmount,
      estimatedDays: estimatedDays,
    });

    res.status(201).json({
      message: "Proposal submitted successfully",
      proposal,
    });

  } catch (error) {
    console.error("Create proposal error:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});


// =====================================================
// 2. CLIENT VIEWS PROPOSALS FOR A JOB
// GET /api/proposals/job/:jobId
// =====================================================

router.get(
  "/job/:jobId",
  authMiddleware,
  async (req, res) => {
    try {

      // Check client role
      if (req.user.role !== "client") {
        return res.status(403).json({
          message: "Only clients can view proposals",
        });
      }

      // Find job
      const job = await Job.findById(req.params.jobId);

      if (!job) {
        return res.status(404).json({
          message: "Job not found",
        });
      }

      // Check job ownership
      if (
        job.client.toString() !==
        req.user._id.toString()
      ) {
        return res.status(403).json({
          message: "Not authorized",
        });
      }

      // Find proposals
      const proposals = await Proposal.find({
        job: req.params.jobId,
      })
        .populate(
          "freelancer",
          "name college course year skills github portfolio rating"
        )
        .populate(
          "job",
          "title budget"
        );

      res.status(200).json({
        count: proposals.length,
        proposals,
      });

    } catch (error) {
      console.error("Get proposals error:", error);

      res.status(500).json({
        message: "Server error",
        error: error.message,
      });
    }
  }
);


// =====================================================
// 3. CLIENT ACCEPTS PROPOSAL
// PUT /api/proposals/:proposalId/accept
// =====================================================

router.put(
  "/:proposalId/accept",
  authMiddleware,
  async (req, res) => {
    try {

      // Only client can accept
      if (req.user.role !== "client") {
        return res.status(403).json({
          message: "Only clients can hire freelancers",
        });
      }

      // Find proposal
      const proposal = await Proposal.findById(
        req.params.proposalId
      );

      if (!proposal) {
        return res.status(404).json({
          message: "Proposal not found",
        });
      }

      // Find job
      const job = await Job.findById(proposal.job);

      if (!job) {
        return res.status(404).json({
          message: "Project not found",
        });
      }

      // Check job owner
      if (
        job.client.toString() !==
        req.user._id.toString()
      ) {
        return res.status(403).json({
          message: "Not authorized",
        });
      }

      // Check job status
      if (job.status !== "open") {
        return res.status(400).json({
          message: "This job is no longer open",
        });
      }

      // Accept proposal
      proposal.status = "accepted";

      await proposal.save();

      // Reject other proposals
      await Proposal.updateMany(
        {
          job: job._id,
          _id: {
            $ne: proposal._id,
          },
        },
        {
          status: "rejected",
        }
      );

      // Assign freelancer
      job.hiredStudent = proposal.freelancer;

      // Change job status
      job.status = "in-progress";

      await job.save();

      res.status(200).json({
        message: "Student hired successfully",
        job,
        proposal,
      });

    } catch (error) {
      console.error("Accept proposal error:", error);

      res.status(500).json({
        message: "Server error",
        error: error.message,
      });
    }
  }
);


// =====================================================
// 4. FREELANCER VIEWS OWN PROPOSALS
// GET /api/proposals
// =====================================================

router.get("/", authMiddleware, async (req, res) => {
  try {

    const proposals = await Proposal.find({
      freelancer: req.user._id,
    })
      .populate(
        "job",
        "title description budget status"
      )
      .populate(
        "freelancer",
        "name email college course year skills github portfolio rating"
      )
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      count: proposals.length,
      proposals,
    });

  } catch (error) {
    console.error("Get my proposals error:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});


// =====================================================
// 5. GET SINGLE PROPOSAL
// GET /api/proposals/:id
// =====================================================

router.get(
  "/:id",
  authMiddleware,
  async (req, res) => {
    try {

      const proposal =
        await Proposal.findById(req.params.id)
          .populate(
            "freelancer",
            "name email college course year skills github portfolio rating"
          )
          .populate(
            "job",
            "title description budget status"
          );

      if (!proposal) {
        return res.status(404).json({
          message: "Proposal not found",
        });
      }

      res.status(200).json(proposal);

    } catch (error) {
      console.error("Get proposal error:", error);

      res.status(500).json({
        message: "Server error",
        error: error.message,
      });
    }
  }
);


// =====================================================
// 6. DELETE PROPOSAL
// DELETE /api/proposals/:id
// =====================================================

router.delete(
  "/:id",
  authMiddleware,
  async (req, res) => {
    try {

      const proposal =
        await Proposal.findById(req.params.id);

      if (!proposal) {
        return res.status(404).json({
          message: "Proposal not found",
        });
      }

      // Only owner can delete
      if (
        proposal.freelancer.toString() !==
        req.user._id.toString()
      ) {
        return res.status(403).json({
          message: "Not authorized",
        });
      }

      // Don't delete accepted proposal
      if (proposal.status === "accepted") {
        return res.status(400).json({
          message: "Accepted proposal cannot be deleted",
        });
      }

      await Proposal.findByIdAndDelete(req.params.id);

      res.status(200).json({
        message: "Proposal deleted successfully",
      });

    } catch (error) {
      console.error("Delete proposal error:", error);

      res.status(500).json({
        message: "Server error",
        error: error.message,
      });
    }
  }
);


export default router;