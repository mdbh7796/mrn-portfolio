import ContactForm from '../components/ContactForm';

export default function Contact() {
  return (
    <section>
      <h1 className="display" style={{ fontSize: '2rem', lineHeight: '2.5rem' }}>Contact</h1>
      <p className="body">
        Based in Tinghir, Morocco — available for junior roles, internships, and project-based work. I typically reply within 1–2 days.
      </p>

      <div className="contact-actions" style={{ margin: '1rem 0 1.5rem' }}>
        <a href="mailto:mdbhking@gmail.com?subject=Portfolio%20Inquiry" className="btn btn-filled">
          <span className="msr" aria-hidden="true">mail</span>
          Email me
        </a>
        <a href="https://www.linkedin.com/in/mdbh7/" target="_blank" rel="noreferrer" className="btn btn-tonal">
          <span className="msr" aria-hidden="true">business_center</span>
          LinkedIn
        </a>
      </div>

      <ContactForm />
    </section>
  );
}
