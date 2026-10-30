import { BOOKS } from '../data/books';
import { Link } from 'react-router-dom';

export default function Home() {
  const featured = BOOKS.filter((b) => b.featured);

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <section style={{ background: '#E2ECE6', padding: '3rem', borderRadius: '12px', textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#2C3E35' }}>Discover Your Next Great Read</h1>
        <p style={{ margin: '1rem 0', color: '#7A8B82' }}>Explore thousands of titles, curated collections, and community programs.</p>
        <Link to="/catalog" style={{ background: '#4A6B5B', color: '#fff', padding: '0.8rem 1.5rem', borderRadius: '6px', textDecoration: 'none', display: 'inline-block' }}>
          Browse Catalog
        </Link>
      </section>

      <h2>Featured Titles</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
        {featured.map((book) => (
          <div key={book.id} style={{ border: '1px solid #E2ECE6', borderRadius: '8px', padding: '1rem', background: '#fff' }}>
            <img src={book.cover} alt={book.title} style={{ width: '100%', height: '240px', objectFit: 'cover', borderRadius: '4px' }} />
            <h3 style={{ marginTop: '0.5rem' }}>{book.title}</h3>
            <p style={{ color: '#7A8B82' }}>{book.author}</p>
            <p style={{ fontWeight: 'bold', color: '#4A6B5B' }}>${book.price.toFixed(2)}</p>
            <Link to={`/catalog/${book.id}`} style={{ color: '#4A6B5B', textDecoration: 'none', marginTop: '0.5rem', display: 'block' }}>View Details &rarr;</Link>
          </div>
        ))}
      </div>
    </div>
  );
}