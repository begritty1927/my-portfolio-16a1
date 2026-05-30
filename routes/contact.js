const express = require('express');
const messages = require('../lib/messages');

const router = express.Router();

router.post('/contact', (req, res) => {
  const { name, email, message } = req.body || {};
  const errors = {};
  const cleanName = String(name || '').trim();
  const cleanEmail = String(email || '').trim();
  const cleanMessage = String(message || '').trim();
  if (!cleanName || cleanName.length > 120) errors.name = 'Name is required (max 120 chars)';
  if (!cleanEmail || !/^\S+@\S+\.\S+$/.test(cleanEmail)) errors.email = 'Valid email required';
  if (!cleanMessage || cleanMessage.length > 4000) errors.message = 'Message is required (max 4000 chars)';
  if (Object.keys(errors).length) {
    return res.status(400).json({ error: 'validation_failed', fields: errors });
  }
  const row = messages.add({ name: cleanName, email: cleanEmail, message: cleanMessage });
  res.json({ ok: true, id: row.id });
});

module.exports = router;
