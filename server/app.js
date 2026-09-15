const express = require('express');
const cors = require('cors');
const projectsRouter = require('./routes/projects');
const skillsRouter = require('./routes/skills');
const aboutRouter = require('./routes/about');
const contactRouter = require('./routes/contact');

function createApp() {
  const app = express();
  app.use(cors({ origin: (process.env.CLIENT_URL || 'http://localhost:5173').split(',') }));
  app.use(express.json({ limit: '32kb' }));

  app.get('/api/health', (req, res) => res.json({ ok: true }));
  app.use('/api/projects', projectsRouter);
  app.use('/api/skills', skillsRouter);
  app.use('/api/about', aboutRouter);
  app.use('/api/contact', contactRouter);

  // v2 hook: mount auth + admin routes here behind JWT
  // app.use('/api/auth', require('./routes/auth')); // v2
  // app.use('/api/admin', require('./middleware/auth'), require('./routes/admin')); // v2

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  });

  return app;
}

module.exports = createApp;
