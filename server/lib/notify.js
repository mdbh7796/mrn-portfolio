// Email notification for contact submissions via Resend (HTTP API, no new deps).
// Env-gated: if RESEND_API_KEY / CONTACT_TO are missing, this is a no-op that
// resolves false — the message is still saved to MongoDB by the caller.
// Never throws: notification must not break the 201 response.
async function notifyContact({ name, email, message }) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  if (!apiKey || !to) return false;

  const from = process.env.CONTACT_FROM || 'Portfolio <onboarding@resend.com>';
  const subject = `Portfolio contact: ${name}`;
  const text = `New message from your portfolio contact form.\n\nName: ${name}\nEmail: ${email}\n\n${message}\n`;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to, subject, text, reply_to: email })
    });
    if (!res.ok) {
      console.error('notifyContact: resend rejected', res.status, await res.text().catch(() => ''));
      return false;
    }
    return true;
  } catch (err) {
    console.error('notifyContact:', err.message);
    return false;
  }
}

module.exports = { notifyContact };
