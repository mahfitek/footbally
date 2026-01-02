import { Resend } from 'resend';

const resend = new Resend(process.env['RESEND_API_KEY']);


export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { to, subject, html } = req.body;

  if (!to || !subject || !html) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    const data = await resend.emails.send({
      from: 'Footbally <onboarding@resend.dev>', // test için
      to,
      subject,
      html,
    });

    return res.status(200).json({ success: true, data });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: 'Mail failed' });
  }
}
