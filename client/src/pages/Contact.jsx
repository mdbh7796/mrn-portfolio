import ContactForm from '../components/ContactForm';

export default function Contact() {
  return (
    <section>
      <h1 className="display" style={{ fontSize: '2rem', lineHeight: '2.5rem' }}>Contact</h1>
      <p className="body">Based in Tinghir, Morocco — open to junior developer roles. I typically reply within 1–2 days.</p>
      <ContactForm />
    </section>
  );
}
