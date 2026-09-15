const express = require('express');
const rateLimit = require('express-rate-limit');
const ContactSubmission = require('../models/ContactSubmission');
const { notifyContact } = require('../lib/notify');

const router = express.Router();

// v1 anti-spam: lean rate limit, no captcha service
const contactLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false
});

function validateContact({ name, email, message }) {
  if (!name || !name.trim()) return 'Name is required';
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) return 'Valid email is required';
  if (!message || !message.trim()) return 'Message is required';
  if (message.length > 2000) return 'Message too long (max 2000 chars)';
  return null;
}

router.post('/', contactLimiter, async (req, res, next) => {
  try {
    const error = validateContact(req.body || {});
    if (error) return res.status(400).json({ error });

    const { name, email, message } = req.body;
    const doc = await ContactSubmission.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim()
    });
    // Best-effort email — never blocks the 201, never throws (see lib/notify).
    const emailed = await notifyContact({ name: doc.name, email: doc.email, message: doc.message });
    res.status(201).json({ ok: true, id: doc._id, emailed });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
