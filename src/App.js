import { useEffect, useState } from 'react'
import { Routes, Route, Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Heart, X } from 'lucide-react'
import { fetchBooks } from './services/bookApi'
import Header from './components/Header'
import Home from './pages/Home'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import Browse from './pages/Browse'
import BookDetail from './pages/BookDetail'
import { About, Services, Contact } from './pages/About'
import './App.css'

// Open Library ids look like "/works/OL123W"; the URL only keeps "OL123W"
const bookSlug = (id) => id.replace('/works/', '')

function BookRoute({ books, onAdd, toast }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const book = books.find((b) => b.id === `/works/${id}`)

  if (!book) {
    return (
      <div className="loading-message">
        <p>Book not found.</p>
        <p><Link to="/catalog">Back to catalog</Link></p>
      </div>
    )
  }

  return (
    <BookDetail
      key={book.id}
      book={book}
      back={() => navigate('/catalog')}
      onAdd={onAdd}
      toast={toast}
    />
  )
}

function NotFound() {
  return (
    <div className="loading-message">
      <h1>Page not found</h1>
      <p><Link to="/">Back to home</Link></p>
    </div>
  )
}

export default function App() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const [books, setBooks] = useState([])
  const [status, setStatus] = useState('loading')
  const [genre, setGenre] = useState('All')
  const [cart, setCart] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [discountRate, setDiscountRate] = useState(0)
  const [cartOpen, setCartOpen] = useState(false)
  const [wishOpen, setWishOpen] = useState(false)
  const [toastMsg, setToastMsg] = useState('')

  useEffect(() => {
    fetchBooks()
      .then((b) => {
        setBooks(b)
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])

  useEffect(() => {
    if (!toastMsg) return
    const t = setTimeout(() => setToastMsg(''), 3000)
    return () => clearTimeout(t)
  }, [toastMsg])

  const toast = setToastMsg

  const openBook = (book) => navigate(`/book/${bookSlug(book.id)}`)

  const addBooks = (newBooks) =>
    setBooks((prev) => {
      const seen = new Set(prev.map((b) => b.id))
      return [...prev, ...newBooks.filter((b) => !seen.has(b.id))]
    })

  const addToCart = (book, qty = 1) => {
    setCart((c) =>
      c.some((i) => i.id === book.id)
        ? c.map((i) =>
            i.id === book.id ? { ...i, qty: i.qty + qty } : i
          )
        : [...c, { ...book, qty }]
    )
    toast(`Added "${book.title}" to cart`)
  }

  const changeQty = (id, d) =>
    setCart((c) =>
      c.map((i) => i.id === id ? { ...i, qty: i.qty + d } : i)
        .filter((i) => i.qty > 0)
    )

  const toggleWish = (id) => {
    setWishlist((w) =>
      w.includes(id) ? w.filter((x) => x !== id) : [...w, id]
    )
  }

  const applyPromo = (code) => {
    if (code.trim().toUpperCase() === 'READMORE') {
      setDiscountRate(0.15)
      toast('Promo code applied! 15% discount')
    } else {
      toast('Invalid promo code. Try READMORE')
    }
  }

  const checkout = () => {
    if (!cart.length) return toast('Your cart is empty!')
    toast('Redirecting to secure checkout...')
    setCart([])
    setDiscountRate(0)
    setCartOpen(false)
  }

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0)

  const cardProps = {
    wishlist,
    onOpen: openBook,
    onAdd: addToCart,
    onWish: toggleWish
  }

  const ready = status === 'ready'
  const loadingPage = (
    <p className="loading-message">
      {status === 'loading'
        ? 'Loading books from Open Library...'
        : 'Could not load books. Please refresh.'}
    </p>
  )

  return (
    <>
      <Header
        cartCount={cart.reduce((s, i) => s + i.qty, 0)}
        total={subtotal * (1 - discountRate)}
        wishCount={wishlist.length}
        openCart={() => setCartOpen(true)}
        openWishlist={() => setWishOpen(true)}
      />

      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={ready
              ? <Home books={books} setGenre={setGenre} cardProps={cardProps} />
              : loadingPage}
          />
          <Route
            path="/catalog"
            element={ready
              ? <Browse books={books} genre={genre} setGenre={setGenre} cardProps={cardProps} addBooks={addBooks} />
              : loadingPage}
          />
          <Route
            path="/book/:id"
            element={ready
              ? <BookRoute books={books} onAdd={addToCart} toast={toast} />
              : loadingPage}
          />
          <Route path="/services" element={<Services toast={toast} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact toast={toast} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />

      <CartDrawer
        open={cartOpen}
        close={() => setCartOpen(false)}
        cart={cart}
        changeQty={changeQty}
        discountRate={discountRate}
        applyPromo={applyPromo}
        checkout={checkout}
      />

      {wishOpen && (
        <div className="wishlist-overlay">
          <div className="wishlist-modal">
            <div className="wishlist-header">
              <h3>
                <Heart className="wishlist-icon" />
                Your Wishlist
              </h3>

              <button onClick={() => setWishOpen(false)}>
                <X className="close-icon" />
              </button>
            </div>

            {wishlist.length === 0 && (
              <p className="wishlist-empty">
                Your wishlist is currently empty.
              </p>
            )}

            {books
              .filter((b) => wishlist.includes(b.id))
              .map((b) => (
                <div key={b.id} className="wishlist-book">
                  <span className="wishlist-book-title">{b.title}</span>
                  <button
                    onClick={() => addToCart(b)}
                    className="wishlist-add-button"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}

      {toastMsg && (
        <div className="toast-message">{toastMsg}</div>
      )}
    </>
  )
}