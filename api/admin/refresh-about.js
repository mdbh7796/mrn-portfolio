// TEMPORARY one-shot endpoint: refreshes the About document from seed-data.js
// without wiping projects/skills/messages. Guarded by ADMIN_TOKEN.
// DELETE THIS FILE (and the env var) immediately after use.
const crypto = require('crypto');
const db = require('../_db');
const About = require('../../server/models/About');
const { about } = require('../../server/seed-data');

function authorized(req) {
  const expected = process.env.ADMIN_TOKEN || '';
  const got = req.headers['x-admin-token'] || '';
  if (!expected || !got || got.length !== expected.length) return false;
  return crypto.timingSafeEqual(Buffer.from(got), Buffer.from(expected));
}

module.exports = async (req, res) => {
  if (!authorized(req)) return res.status(401).json({ error: 'Unauthorized' });
  try {
    await db();
    const doc = await About.findOneAndUpdate({}, about, { upsert: true, new: true, runValidators: true });
    return res.status(200).json({ ok: true, headline: doc.headline, resume: doc.links && doc.links.resume });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};
