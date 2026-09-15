const mongoose = require('mongoose');

// Single-document collection for v1. Enforced via seed.js upsert.
const aboutSchema = new mongoose.Schema(
  {
    name: { type: String, default: '' },
    headline: { type: String, required: true },
    bio: { type: String, required: true },
    location: { type: String, default: '' },
    links: {
      github: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      resume: { type: String, default: '' }
    },
    skillsHighlight: { type: [String], default: [] },
    certifications: {
      type: [{ name: { type: String, required: true }, issuer: { type: String, default: '' } }],
      default: []
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('About', aboutSchema);
