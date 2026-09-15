const express = require('express');
const rateLimit = require('express-rate-limit');
const ContactSubmission = require('../models/ContactSubmission');

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

router.post('/', contactLimiter, async (req, res) => {
  const error = validateContact(req.body || {});
  if (error) return res.status(400).json({ error });

  const { name, email, message } = req.body;
  const doc = await ContactSubmission.create({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    message: message.trim()
  });
  res.status(201).json({ ok: true, id: doc._id });
});

module.exports = router;
