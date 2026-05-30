const express = require('express');
const messages = require('../lib/messages');

const router = express.Router();

function requirePassword(req, res, next) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    return res.status(503).json({ error: 'admin_disabled', message: 'Set ADMIN_PASSWORD env var to enable the messages viewer.' });
  }
  const auth = req.headers.authorization || '';
  const match = auth.match(/^Basic\s+(.+)$/i);
  if (!match) {
    res.set('WWW-Authenticate', 'Basic realm="admin"');
    return res.status(401).end();
  }
  const decoded = Buffer.from(match[1], 'base64').toString('utf8');
  const [, password] = decoded.split(':');
  if (password !== expected) {
    res.set('WWW-Authenticate', 'Basic realm="admin"');
    return res.status(401).end();
  }
  next();
}

router.get('/messages', requirePassword, (req, res) => {
  res.json({ messages: messages.list() });
});

module.exports = router;
