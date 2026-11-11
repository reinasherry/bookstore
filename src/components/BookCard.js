
import { Heart, Plus, Star } from 'lucide-react'
import '../styles/BookCard.css'

export default function BookCard({ book, wished, onOpen, onAdd, onWish }) {
  return (
    <div className="book-card">

      
      <button
        onClick={() => onWish(book.id)}
        className="wishlist-button"
      >
        <Heart className={wished ? 'heart-active' : ''} />
      </button>

      
      <div className="book-info" onClick={() => onOpen(book)}>

        <div className="book-cover">
          <img
            src={book.cover}
            alt={book.title}
            loading="lazy"
          />

          {book.stock === 0 && (
            <span className="out-of-stock">
              Out of Stock
            </span>
          )}
        </div>

        <span className="book-genre">
          {book.genre}
        </span>

        <h3 className="book-title">
          {book.title}
        </h3>

        <p className="book-author">
          by {book.author}
        </p>

        {/* Rating */}
        <div className="book-rating">
          <Star className="star-icon" />
          <span className="rating-number">
            {book.rating}
          </span>
          <span className="review-count">
            ({book.reviewsCount})
          </span>
        </div>

      </div>

      <div className="book-card-footer">

        <span className="book-price">
          ${book.price.toFixed(2)}
        </span>

        <button
          onClick={() => onAdd(book)}
          disabled={book.stock === 0}
          className="add-button"
        >
          <Plus />
          Add
        </button>

      </div>

    </div>
  )
}
