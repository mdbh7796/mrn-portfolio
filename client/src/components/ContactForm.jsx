import { useState } from 'react';
import { api } from '../api';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ loading: false, error: '', success: false });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: '', success: false });
    try {
      await api.sendContact(form);
      setStatus({ loading: false, error: '', success: true });
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus({ loading: false, error: err.message, success: false });
    }
  };

  return (
    <form onSubmit={onSubmit} className="form">
      <div className="field">
        <label htmlFor="cf-name">Name</label>
        <input id="cf-name" name="name" value={form.name} onChange={onChange} required maxLength={100} autoComplete="name" />
      </div>
      <div className="field">
        <label htmlFor="cf-email">Email</label>
        <input id="cf-email" name="email" type="email" value={form.email} onChange={onChange} required autoComplete="email" />
      </div>
      <div className="field">
        <label htmlFor="cf-message">Message</label>
        <textarea id="cf-message" name="message" value={form.message} onChange={onChange} required maxLength={2000} rows={5} />
        <p className="muted" style={{ fontSize: '0.8rem', margin: '0.25rem 0 0', textAlign: 'right' }}>
          {form.message.length} / 2000
        </p>
      </div>
      <div>
        <button type="submit" className="btn btn-filled" disabled={status.loading}>
          <span className="msr" aria-hidden="true">
            send
          </span>
          {status.loading ? 'Sending…' : 'Send message'}
        </button>
      </div>
      {status.error && <p className="error">{status.error}</p>}
      {status.success && <p className="success">Thanks — message saved!</p>}
    </form>
  );
}
