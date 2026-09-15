const db = require('./_db');
const Skill = require('../server/models/Skill');

module.exports = async (req, res) => {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  try {
    await db();
    const skills = await Skill.find().lean();
    res.setHeader('Cache-Control', 'public, max-age=60');
    return res.status(200).json(skills);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};
