const db = require('../_db');
const Project = require('../../server/models/Project');

module.exports = async (req, res) => {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  try {
    await db();
    const project = await Project.findOne({ slug: req.query.slug }).lean();
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.setHeader('Cache-Control', 'public, max-age=60');
    return res.status(200).json(project);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};
