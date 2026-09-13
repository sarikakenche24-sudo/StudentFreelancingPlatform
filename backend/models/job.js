const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    skills: [{ type: String, required: true }],
    budget: { type: Number, required: true },
    client: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    status: { 
      type: String, 
      enum: ['open', 'in_progress', 'submitted', 'completed'], 
      default: 'open' 
    },
    hiredFreelancer: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      default: null 
    },
    submission: {
      githubUrl: { type: String, default: '' },
      liveUrl: { type: String, default: '' },
      notes: { type: String, default: '' },
      submittedAt: { type: Date, default: null }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Job', jobSchema);
