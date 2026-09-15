// Local-only runner: in-memory MongoDB + seed + API. Not for production.
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const createApp = require('./app');
// Content shared with seed.js — edit copy in seed-data.js only.
const { projects, skills, about } = require('./seed-data');

const PORT = process.env.PORT || 5000;

async function ensureSeed() {
  const Project = require('./models/Project');
  const Skill = require('./models/Skill');
  const About = require('./models/About');
  if ((await Project.countDocuments()) > 0) return;
  await Project.insertMany(projects);
  await Skill.insertMany(skills);
  await About.create(about);
  console.log('Seeded in-memory DB');
}

async function main() {
  const mongod = await MongoMemoryServer.create();
  await mongoose.connect(mongod.getUri());
  console.log('In-memory MongoDB ready');
  await ensureSeed();
  const app = createApp();
  app.listen(PORT, () => console.log(`API listening on :${PORT}`));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
