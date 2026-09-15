const express = require('express');
const Project = require('../models/Project');

const router = express.Router();

// GET /api/projects — list, featured first
router.get('/', async (req, res) => {
  const projects = await Project.find().sort({ featured: -1, order: 1 }).lean();
  res.set('Cache-Control', 'public, max-age=60');
  res.json(projects);
});

// GET /api/projects/:slug — detail by stable slug
router.get('/:slug', async (req, res) => {
  const project = await Project.findOne({ slug: req.params.slug }).lean();
  if (!project) return res.status(404).json({ error: 'Project not found' });
  res.set('Cache-Control', 'public, max-age=60');
  res.json(project);
});

module.exports = router;
