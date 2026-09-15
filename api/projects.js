const db = require('./_db');
const Project = require('../server/models/Project');

module.exports = async (req, res) => {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  try {
    await db();
    const projects = await Project.find().sort({ featured: -1, order: 1 }).lean();
    res.setHeader('Cache-Control', 'public, max-age=60');
    return res.status(200).json(projects);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};
