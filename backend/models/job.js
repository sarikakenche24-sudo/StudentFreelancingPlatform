import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    category: {
      type: String,
      required: true
    },

    skills: {
      type: [String],
      default: []
    },

    budget: {
      type: Number,
      required: true
    },

    deadline: {
      type: Date
    },

    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    hiredStudent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    status: {
      type: String,
      enum: ["open", "in-progress", "completed"],
      default: "open"
    }
  },
  {
    timestamps: true
  }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;