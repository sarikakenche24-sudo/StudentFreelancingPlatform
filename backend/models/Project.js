const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    technologies: [{ type: String }],
    githubUrl: { type: String, default: '' },
    liveDemoUrl: { type: String, default: '' },
    filePath: { type: String, default: '' } // Stores uploaded ZIP, PDF, or image path
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);