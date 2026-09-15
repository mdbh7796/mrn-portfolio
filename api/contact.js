const db = require('./_db');
const ContactSubmission = require('../server/models/ContactSubmission');
const { notifyContact } = require('../server/lib/notify');

// Best-effort per-instance throttle (serverless instances don't share memory,
// but this still blunts naive spam without any paid service).
const hits = new Map();
const WINDOW_MS = 60 * 1000;
const MAX_PER_WINDOW = 10;

function throttled(ip) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > MAX_PER_WINDOW;
}

function validateContact({ name, email, message }) {
  if (!name || !name.trim()) return 'Name is required';
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) return 'Valid email is required';
  if (!message || !message.trim()) return 'Message is required';
  if (message.length > 2000) return 'Message too long (max 2000 chars)';
  return null;
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
    if (throttled(ip)) return res.status(429).json({ error: 'Too many requests, try again later' });

    const error = validateContact(req.body || {});
    if (error) return res.status(400).json({ error });

    await db();
    const { name, email, message } = req.body;
    const doc = await ContactSubmission.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim()
    });
    // Best-effort email — never blocks the 201, never throws (see lib/notify).
    const emailed = await notifyContact({ name: doc.name, email: doc.email, message: doc.message });
    return res.status(201).json({ ok: true, id: doc._id, emailed });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};
