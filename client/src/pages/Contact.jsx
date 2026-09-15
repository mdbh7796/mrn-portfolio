import ContactForm from '../components/ContactForm';

export default function Contact() {
  return (
    <section>
      <h1 className="display" style={{ fontSize: '2rem', lineHeight: '2.5rem' }}>Contact</h1>
      <p className="body">Messages go straight to MongoDB — no queue, no email service in v1.</p>
      <ContactForm />
    </section>
  );
}
