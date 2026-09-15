const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, default: 'Tools', trim: true },
    level: { type: String, default: 'Proficient', trim: true }
  },
  { timestamps: false }
);

module.exports = mongoose.model('Skill', skillSchema);
