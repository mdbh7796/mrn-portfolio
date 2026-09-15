const express = require('express');
const About = require('../models/About');

const router = express.Router();

router.get('/', async (req, res) => {
  const about = await About.findOne().lean();
  if (!about) return res.status(404).json({ error: 'About not found' });
  res.set('Cache-Control', 'public, max-age=60');
  res.json(about);
});

module.exports = router;
