import { useState } from 'react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Contact Us</h1>
      {submitted ? (
        <div style={{ background: '#E2ECE6', padding: '1rem', borderRadius: '6px', marginTop: '1rem' }}>
          Thank you! We received your message and will reply shortly.
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
          <input required placeholder="Your Name" style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc' }} />
          <input required type="email" placeholder="Your Email" style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc' }} />
          <textarea required rows="4" placeholder="Your Message" style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc' }} />
          <button style={{ background: '#4A6B5B', color: '#fff', border: 'none', padding: '0.8rem', borderRadius: '4px', cursor: 'pointer' }}>Send Message</button>
        </form>
      )}
    </div>
  );
}