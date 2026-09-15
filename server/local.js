// Local-only runner: in-memory MongoDB + seed + API. Not for production.
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const createApp = require('./app');

const PORT = process.env.PORT || 5000;

async function ensureSeed() {
  const Project = require('./models/Project');
  const Skill = require('./models/Skill');
  const About = require('./models/About');
  if ((await Project.countDocuments()) > 0) return;
  // Reuse seed data by running seed logic inline (seed.js targets real URI)
  await Project.insertMany([
    {
      slug: 'expense-tracker',
      title: 'Expense Tracker',
      summary: 'Track spending with budgets and charts.',
      problem: 'Manual spreadsheets made monthly budgeting slow and error-prone.',
      solution: 'Built MERN app with JWT auth, CSV import, and Chart.js dashboards.',
      outcome: 'Cut budget review time from 2h to 20min in user testing.',
      techStack: ['React', 'Express', 'MongoDB'],
      liveUrl: 'https://example.com/expense-tracker',
      repoUrl: 'https://github.com/you/expense-tracker',
      imageUrl: 'https://via.placeholder.com/800x450?text=Expense+Tracker',
      featured: true,
      order: 1
    },
    {
      slug: 'task-board',
      title: 'Kanban Task Board',
      summary: 'Drag-and-drop tasks with team roles.',
      problem: 'Small teams lost track of ownership across chat threads.',
      solution: 'Built board with lanes, assignments, and activity log.',
      outcome: 'Piloted with 5 users; zero dropped tasks over 2 weeks.',
      techStack: ['React', 'Express', 'MongoDB'],
      liveUrl: 'https://example.com/task-board',
      repoUrl: 'https://github.com/you/task-board',
      imageUrl: 'https://via.placeholder.com/800x450?text=Task+Board',
      featured: true,
      order: 2
    },
    {
      slug: 'portfolio-api',
      title: 'Portfolio API',
      summary: 'Lean REST API powering this portfolio.',
      problem: 'Hard-coded content required redeploys for every copy change.',
      solution: 'Extracted content to MongoDB with 5 lean REST endpoints.',
      outcome: 'Content updates without frontend redeploy.',
      techStack: ['Express', 'MongoDB', 'Mongoose'],
      liveUrl: '',
      repoUrl: 'https://github.com/you/portfolio-api',
      imageUrl: 'https://via.placeholder.com/800x450?text=Portfolio+API',
      featured: false,
      order: 3
    }
  ]);
  await Skill.insertMany([
    { name: 'React', category: 'Frontend', level: 'Proficient' },
    { name: 'JavaScript', category: 'Frontend', level: 'Proficient' },
    { name: 'CSS', category: 'Frontend', level: 'Proficient' },
    { name: 'Node.js', category: 'Backend', level: 'Proficient' },
    { name: 'Express', category: 'Backend', level: 'Proficient' },
    { name: 'MongoDB', category: 'Backend', level: 'Familiar' }
  ]);
  await About.create({
    headline: 'Full-stack developer (MERN) building lean, hireable products',
    bio: 'I build simple, fast web apps with React, Express, and MongoDB. Currently seeking junior full-stack roles.',
    location: 'Remote',
    links: { github: 'https://github.com/you', linkedin: 'https://linkedin.com/in/you', resume: '' },
    skillsHighlight: ['React', 'Express', 'MongoDB']
  });
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
