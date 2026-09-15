// Email notification for contact submissions via Gmail SMTP (nodemailer).
// Needs a Google App Password: Google Account > Security > 2-Step Verification
// > App passwords > generate one for "Mail".
//
// Env-gated: if GMAIL_USER / GMAIL_APP_PASSWORD / CONTACT_TO are missing,
// this is a no-op that resolves false — the message is still saved to
// MongoDB by the caller. Never throws: notification must not break the 201.
const nodemailer = require('nodemailer');

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) return null;
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass }
  });
  return transporter;
}

async function notifyContact({ name, email, message }) {
  const to = process.env.CONTACT_TO;
  const transport = getTransporter();
  if (!transport || !to) return false;

  const from = process.env.GMAIL_USER;
  try {
    await transport.sendMail({
      from: `Portfolio <${from}>`,
      to,
      replyTo: email,
      subject: `Portfolio contact: ${name}`,
      text: `New message from your portfolio contact form.\n\nName: ${name}\nEmail: ${email}\n\n${message}\n`
    });
    return true;
  } catch (err) {
    // Log the cause without secrets (nodemailer errors never include the password).
    console.error('notifyContact:', err.message);
    // Drop the cached transporter so the next call re-authenticates
    // (covers rotated/revoked app passwords without a redeploy).
    transporter = null;
    return false;
  }
}

module.exports = { notifyContact };
