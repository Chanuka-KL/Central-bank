const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed');

  const filePath = path.resolve('./data/ledger.json');
  const ledger = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const amount = Number(req.body.amount);

  if (!amount || amount <= 0 || amount > ledger.reserve)
    return res.status(400).json({ error: 'Invalid amount or not enough reserve' });

  ledger.totalExported += amount;
  ledger.reserve -= amount;

  fs.writeFileSync(filePath, JSON.stringify(ledger, null, 2));
  res.status(200).json(ledger);
}