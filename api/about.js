const db = require('./_db');
const About = require('../server/models/About');

module.exports = async (req, res) => {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  try {
    await db();
    const about = await About.findOne().lean();
    if (!about) return res.status(404).json({ error: 'About not found' });
    res.setHeader('Cache-Control', 'public, max-age=60');
    return res.status(200).json(about);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};
