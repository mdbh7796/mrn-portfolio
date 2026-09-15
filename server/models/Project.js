const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, index: true, trim: true },
    title: { type: String, required: true, trim: true },
    summary: { type: String, required: true, trim: true },
    problem: { type: String, required: true },
    solution: { type: String, required: true },
    outcome: { type: String, required: true },
    techStack: { type: [String], default: [] },
    liveUrl: { type: String, default: '' },
    repoUrl: { type: String, default: '' },
    imageUrl: { type: String, default: '' },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
