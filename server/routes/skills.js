const express = require('express');
const Skill = require('../models/Skill');

const router = express.Router();

router.get('/', async (req, res) => {
  const skills = await Skill.find().lean();
  res.set('Cache-Control', 'public, max-age=60');
  res.json(skills);
});

module.exports = router;
