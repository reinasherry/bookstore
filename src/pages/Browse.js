import { useEffect, useMemo, useState } from 'react'
import { Search } from 'lucide-react'

import BookCard from "../components/BookCard"
import { GENRES, searchBooks } from "../services/bookApi"
import "../styles/Browse.css"

export default function Catalog({ books, genre, setGenre, cardProps, addBooks }) {
  const [query, setQuery] = useState('')
  const [maxPrice, setMaxPrice] = useState(30)
  const [inStock, setInStock] = useState(false)
  const [sort, setSort] = useState('featured')
  const [results, setResults] = useState(null)
  const [searching, setSearching] = useState(false)

  // Live search on Open Library (starts at 3 characters, waits 400 ms after typing stops)
  useEffect(() => {
    const q = query.trim()
    if (q.length < 3) {
      setResults(null)
      setSearching(false)
      return
    }

    let cancelled = false
    setSearching(true)

    const timer = setTimeout(() => {
      searchBooks(q)
        .then((found) => {
          if (cancelled) return
          setResults(found)
          if (addBooks) addBooks(found)
        })
        .catch(() => {
          if (!cancelled) setResults([])
        })
        .finally(() => {
          if (!cancelled) setSearching(false)
        })
    }, 400)

    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [query])

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    const source = results ?? books

    const list = source.filter((b) =>
      (results ||
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q)) &&
      (results || genre === 'All' || b.genre === genre) &&
      b.price <= maxPrice &&
      (!inStock || b.stock > 0)
    )

    if (sort === 'price-low')
      list.sort((a, b) => a.price - b.price)

    if (sort === 'price-high')
      list.sort((a, b) => b.price - a.price)

    if (sort === 'rating')
      list.sort((a, b) => b.rating - a.rating)

    return list
  }, [books, results, query, genre, maxPrice, inStock, sort])

  const reset = () => {
    setQuery('')
    setGenre('All')
    setMaxPrice(30)
    setInStock(false)
    setSort('featured')
  }

  return (
    <div className="catalog">

      <div className="catalog-header">
        <h1>Explore Our Collection</h1>

        <div className="search-box">
          <Search className="search-icon" />

          <input
            id="catalog-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search any title or author..."
          />
        </div>
      </div>

      <div className="catalog-layout">

        <aside className="filters">

          <div className="filter-header">
            <h3>Filters</h3>
            <button onClick={reset}>Reset All</button>
          </div>

          <div className="genre-filter">
            <label className="filter-label">Genre</label>

            {['All', ...Object.keys(GENRES)].map((g) => (
              <label key={g} className="genre-option">
                <input
                  type="radio"
                  checked={genre === g}
                  onChange={() => setGenre(g)}
                />
                {g}
              </label>
            ))}
          </div>

          <div className="price-filter">

            <div className="price-header">
              <span>Max Price</span>
              <span className="price-value">${maxPrice}</span>
            </div>

            <input
              type="range"
              min="10"
              max="30"
              value={maxPrice}
              onChange={(e) => setMaxPrice(+e.target.value)}
            />

          </div>

          <label className="stock-option">
            <input
              type="checkbox"
              checked={inStock}
              onChange={(e) => setInStock(e.target.checked)}
            />
            In Stock Only
          </label>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="sort-select"
          >
            <option value="featured">Featured Picks</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>

        </aside>

        <div className="catalog-results">

          <p className="results-count">
            {searching
              ? 'Searching Open Library...'
              : results
                ? `Showing ${filtered.length} results for "${query.trim()}"`
                : `Showing ${filtered.length} of ${books.length} books`}
          </p>

          {filtered.length === 0 ? (
            <p className="no-results">
              {searching ? '' : 'No books found matching your criteria.'}
            </p>
          ) : (
            <div className="book-grid">
              {filtered.map((b) => (
                <BookCard
                  key={b.id}
                  book={b}
                  {...cardProps}
                  wished={cardProps.wishlist.includes(b.id)}
                />
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  )
}