export default function About() {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>About PageTurner</h1>
      <p style={{ marginTop: '1rem', lineHeight: '1.8' }}>
        Founded with a mission to bring readers together, PageTurner is dedicated to curating thoughtful literature and supporting community literacy initiatives.
      </p>
      <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
        <div style={{ background: '#E2ECE6', padding: '1.5rem', borderRadius: '8px', flex: 1, textAlign: 'center' }}>
          <h3>10,000+</h3>
          <p>Books Donated</p>
        </div>
        <div style={{ background: '#E2ECE6', padding: '1.5rem', borderRadius: '8px', flex: 1, textAlign: 'center' }}>
          <h3>50+</h3>
          <p>Reading Clubs</p>
        </div>
      </div>
    </div>
  );
}