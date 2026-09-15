// GET /api/health — liveness + config presence. Never leaks secret values,
// only booleans, so it is safe to expose publicly and ping from uptime monitors.
module.exports = async (req, res) => {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  res.setHeader('Cache-Control', 'no-store');
  return res.status(200).json({
    ok: true,
    time: new Date().toISOString(),
    env: {
      mongo: !!process.env.MONGO_URI,
      resend: !!process.env.RESEND_API_KEY,
      contactTo: !!process.env.CONTACT_TO
    }
  });
};
