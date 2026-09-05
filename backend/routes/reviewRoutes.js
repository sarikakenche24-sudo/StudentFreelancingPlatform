import express from "express";
import Review from "../models/Review.js";
import Job from "../models/Job.js";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorizeRoles("client"),
  async (req, res) => {

    try {

      const {
        job,
        student,
        rating,
        comment
      } = req.body;

      if (
        !job ||
        !student ||
        !rating
      ) {
        return res.status(400).json({
          message: "Please provide all required fields"
        });
      }

      const existingJob =
        await Job.findById(job);

      if (!existingJob) {
        return res.status(404).json({
          message: "Project not found"
        });
      }

      if (
        existingJob.client.toString() !==
        req.user.id
      ) {
        return res.status(403).json({
          message: "Not authorized"
        });
      }

      if (
        existingJob.status !== "completed"
      ) {
        return res.status(400).json({
          message:
            "Project must be completed before review"
        });
      }

      const review = await Review.create({
        job,
        student,
        client: req.user.id,
        rating,
        comment
      });

      res.status(201).json({
        message: "Review submitted successfully",
        review
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        message: "Server error"
      });

    }
  }
);

export default router;