import { useState } from 'react';
import { BOOKS } from '../data/books';
import { Link } from 'react-router-dom';

export default function Catalog() {
  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');

  const filtered = BOOKS.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(search.toLowerCase()) || book.author.toLowerCase().includes(search.toLowerCase());
    const matchesGenre = selectedGenre === 'All' || book.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Book Catalog</h1>
      <div style={{ display: 'flex', gap: '1rem', margin: '1.5rem 0' }}>
        <input
          type="text"
          placeholder="Search by title or author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1, padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)} style={{ padding: '0.8rem', borderRadius: '4px' }}>
          <option value="All">All Genres</option>
          <option value="Mystery">Mystery</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Fiction">Fiction</option>
          <option value="Non-Fiction">Non-Fiction</option>
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}>
        {filtered.map((book) => (
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