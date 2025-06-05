const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
  const filePath = path.resolve('./data/ledger.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  res.status(200).json(data);
}