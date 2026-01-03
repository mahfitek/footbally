export default async function handler(req: any, res: any) {
  return res.status(200).json({
    ok: true,
    method: req.method,
    bodyType: typeof req.body,
    body: req.body,
    env: {
      hasResendKey: !!process.env['RESEND_API_KEY'],
    },
  });
}
