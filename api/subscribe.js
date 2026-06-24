export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const { email, listId } = req.body || {};
    if (!email) {
      return res.status(400).json({ error: 'Email required' });
    }
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY || '',
      },
      body: JSON.stringify({
        email,
        listIds: [listId || 2],
        updateEnabled: true,
      }),
    });
    const data = await response.json();
    if (response.ok || response.status === 409) {
      return res.status(200).json({ success: true });
    }
    return res.status(response.status).json({ error: data.message || 'Failed' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
