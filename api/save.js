export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { row } = req.body;
  const SHEET_ID = '1kQ1O6domq8OwWnZ6jzOK76mKMcnm6v-WAQNbxF6Hzzk';
  const API_KEY = process.env.GOOGLE_API_KEY;

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS&key=${API_KEY}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ values: [row] })
  });

  const data = await response.json();
  if (data.error) return res.status(400).json({ error: data.error.message });
  return res.status(200).json({ success: true });
}
