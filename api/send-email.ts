import { Resend } from 'resend';

const resend = new Resend(process.env['RESEND_API_KEY']);

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let body = req.body;

  // 🔴 KRİTİK: body string gelirse JSON parse et
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ error: 'Invalid JSON body' });
    }
  }

  const { to, subject, html } = body || {};

  if (!to || !subject || !html) {
    return res.status(400).json({
      error: 'to, subject ve html zorunlu',
    });
  }

  try {
    const data = await resend.emails.send({
      from: 'Footbally <no-reply@getfootbally.com>',
      to,
      subject,
      html,
    });

    return res.status(200).json({ success: true, data });
  } catch (err: any) {
    console.error('Resend error:', err);
    return res.status(500).json({
      success: false,
      message: err?.message || 'Mail gönderilemedi',
    });
  }
}
