const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DATA_DIR = path.join(__dirname, 'data');
const FILE = path.join(DATA_DIR, 'messages.json');

function ensure() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(FILE)) fs.writeFileSync(FILE, '[]', 'utf8');
}

function readAll() {
  ensure();
  try { return JSON.parse(fs.readFileSync(FILE, 'utf8')); } catch (_) { return []; }
}

function writeAll(rows) {
  ensure();
  fs.writeFileSync(FILE, JSON.stringify(rows, null, 2), 'utf8');
}

function add({ name, email, message }) {
  const rows = readAll();
  const row = {
    id: crypto.randomUUID(),
    name,
    email,
    message,
    submittedAt: new Date().toISOString(),
  };
  rows.unshift(row);
  writeAll(rows);
  return row;
}

function list() {
  return readAll();
}

module.exports = { add, list };
