
import { useEffect, useState } from 'react';
import { ArrowLeft, Star, ExternalLink } from 'lucide-react';
import { fetchDescription } from '../services/bookApi';
import '../styles/BookDetail.css';

export default function BookDetail({ book, back, onAdd, toast }) {
  const [qty, setQty] = useState(1);
  const [desc, setDesc] = useState('Loading description...');
  const [reviews, setReviews] = useState([
    {
      name: 'Emily R.',
      text: 'An absolutely breathtaking read. I could not put it down!'
    }
  ]);
  const [name, setName] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    fetchDescription(book.id)
      .then(setDesc)
      .catch(() => setDesc('Description unavailable.'));
  }, [book.id]);

  const submit = () => {
    if (!name.trim() || !text.trim()) return;

    setReviews([{ name, text }, ...reviews]);
    setName('');
    setText('');
    toast('Thank you! Your review has been posted.');
  };

  return (
    <div className="book-detail-page">

      {/* BACK BUTTON */}
      <button className="back-button" onClick={back}>
        <ArrowLeft size={16} />
        Back to Catalog
      </button>

      {/* BOOK INFORMATION */}
      <div className="book-detail-card">

        <div className="book-information">

          <img
            src={book.cover}
            alt={book.title}
            className="detail-cover"
          />

          <div className="detail-content">

            <div>
              <span className="detail-genre">{book.genre}</span>

              <h1>{book.title}</h1>

              <p className="detail-author">
                by <strong>{book.author}</strong>
              </p>
            </div>

            {/* RATING AND STOCK */}
            <div className="detail-rating-stock">

              <span className="detail-rating">
                <Star size={16} className="star-icon" />

                {book.hasRating ? (
                  <>
                    <b>{book.rating}</b>
                    <span className="review-count">
                      ({book.reviewsCount} reviews)
                    </span>
                  </>
                ) : (
                  <span className="review-count">No ratings yet</span>
                )}
              </span>

              <span className={
                book.stock > 0
                  ? 'stock-badge in-stock'
                  : 'stock-badge out-stock'
              }>
                {book.stock > 0
                  ? `In Stock (${book.stock} left)`
                  : 'Out of Stock'}
              </span>

            </div>

            {/* PRICE */}
            <div className="detail-price">
              ${book.price.toFixed(2)}
            </div>

            {/* DESCRIPTION */}
            <p className="detail-description">
              {desc}
            </p>

            {/* QUANTITY AND CART */}
            <div className="detail-purchase">

              <div className="quantity-control">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                >
                  -
                </button>

                <span>{qty}</span>

                <button
                  onClick={() => setQty(Math.min(book.stock, qty + 1))}
                  disabled={qty >= book.stock}
                >
                  +
                </button>
              </div>

              <button
                className="add-cart-button"
                onClick={() => {
                  onAdd(book, qty);
                  setQty(1);
                }}
                disabled={book.stock === 0}
              >
                Add to Shopping Cart
              </button>

            </div>

            {/* GOODREADS */}
            <a
              href={`https://www.goodreads.com/search?q=${encodeURIComponent(
                `${book.title} ${book.author}`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="goodreads-link"
            >
              View on Goodreads
              <ExternalLink size={16} />
            </a>

          </div>
        </div>

        {/* REVIEWS */}
        <div className="reader-reviews">

          <h3>Reader Reviews</h3>

          <div className="review-form">

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
            />

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Share your thoughts..."
              rows="3"
            />

            <button onClick={submit}>
              Submit Review
            </button>

          </div>

          {reviews.map((review, i) => (
            <div className="review-card" key={i}>

              <div className="review-header">
                <span>{review.name}</span>
                <span className="review-stars">★ 5.0</span>
              </div>

              <p>{review.text}</p>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}
