require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('./models/Project');
const Skill = require('./models/Skill');
const About = require('./models/About');
// Content lives in seed-data.js (shared with local.js) — edit copy there.
const { projects, skills, about } = require('./seed-data');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mrn_portfolio';

async function main() {
  await mongoose.connect(MONGO_URI);
  await Project.deleteMany({});
  await Skill.deleteMany({});
  await About.deleteMany({});
  await Project.insertMany(projects);
  await Skill.insertMany(skills);
  await About.create(about);
  console.log('Seeded: projects=%d skills=%d about=1', projects.length, skills.length);
  await mongoose.disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
