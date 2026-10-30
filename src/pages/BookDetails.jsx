import { useContext } from 'react';
import { useParams } from 'react';
import { BOOKS } from '../data/books';
import { StoreContext } from '../context/StoreContext';

export default function BookDetail() {
  const { id } = useParams();
  const { addToCart, toggleWishlist, wishlist } = useContext(StoreContext);

  const book = BOOKS.find((b) => b.id === Number(id));

  if (!book) return <div style={{ padding: '2rem' }}>Book not found.</div>;

  const isWishlisted = wishlist.includes(book.id);

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto', display: 'flex', gap: '2rem' }}>
      <img src={book.cover} alt={book.title} style={{ width: '300px', height: '420px', objectFit: 'cover', borderRadius: '8px' }} />
      <div>
        <h1>{book.title}</h1>
        <h3 style={{ color: '#7A8B82', marginBottom: '1rem' }}>By {book.author}</h3>
        <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#4A6B5B' }}>${book.price.toFixed(2)}</p>
        <p style={{ margin: '1rem 0' }}>{book.description}</p>
        <div style={{ background: '#F9F6F0', padding: '1rem', borderRadius: '6px', marginBottom: '1.5rem' }}>
          <strong>Sample Preview:</strong>
          <p style={{ fontStyle: 'italic', marginTop: '0.5rem' }}>"{book.sampleText}"</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={() => addToCart(book)} style={{ background: '#4A6B5B', color: '#fff', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '6px', cursor: 'pointer' }}>
            Add to Cart
          </button>
          <button onClick={() => toggleWishlist(book.id)} style={{ background: isWishlisted ? '#D4A373' : '#E2ECE6', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '6px', cursor: 'pointer' }}>
            {isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}
          </button>
        </div>
      </div>
    </div>
  );
}