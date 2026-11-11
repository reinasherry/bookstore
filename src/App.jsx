import { useEffect, useState } from 'react'
import { Heart, X } from 'lucide-react'
import { fetchBooks } from "./services/bookApi";
import Header from './components/Header'
import Home from './pages/Home'
import CartDrawer from "./components/CartDrawer";
import Browse from './pages/Browse'
import BookDetail from './pages/BookDetail'
import Cart from './pages/Cart'
import { About, Services, Contact } from './pages/About'

export default function App() {
  const [view, setView] = useState('home')
  const [books, setBooks] = useState([])
  const [status, setStatus] = useState('loading')
  const [genre, setGenre] = useState('All')
  const [selected, setSelected] = useState(null)
  const [cart, setCart] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [discountRate, setDiscountRate] = useState(0)
  const [cartOpen, setCartOpen] = useState(false)
  const [wishOpen, setWishOpen] = useState(false)
  const [toastMsg, setToastMsg] = useState('')

  useEffect(() => {
    fetchBooks().then((b) => { setBooks(b); setStatus('ready') }).catch(() => setStatus('error'))
  }, [])
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, [view])
  useEffect(() => {
    if (!toastMsg) return
    const t = setTimeout(() => setToastMsg(''), 3000)
    return () => clearTimeout(t)
  }, [toastMsg])

  const toast = setToastMsg
  const openBook = (book) => { setSelected(book); setView('detail') }
  const addToCart = (book, qty = 1) => {
    setCart((c) => c.some((i) => i.id === book.id)
      ? c.map((i) => (i.id === book.id ? { ...i, qty: i.qty + qty } : i))
      : [...c, { ...book, qty }])
    toast(`Added "${book.title}" to cart`)
  }
  const changeQty = (id, d) =>
    setCart((c) => c.map((i) => (i.id === id ? { ...i, qty: i.qty + d } : i)).filter((i) => i.qty > 0))
  const toggleWish = (id) => {
    setWishlist((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id]))
  }
  const applyPromo = (code) => {
    if (code.trim().toUpperCase() === 'READMORE') { setDiscountRate(0.15); toast('Promo code applied! 15% discount') }
    else toast('Invalid promo code. Try READMORE')
  }
  const checkout = () => {
    if (!cart.length) return toast('Your cart is empty!')
    toast('Redirecting to secure checkout...'); setCart([]); setDiscountRate(0); setCartOpen(false)
  }

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const cardProps = { wishlist, onOpen: openBook, onAdd: addToCart, onWish: toggleWish }

  let page
  if (['home', 'catalog', 'detail'].includes(view) && status !== 'ready') {
    page = <p className="text-center py-32 text-slate-500">{status === 'loading' ? 'Loading books from Open Library...' : 'Could not load books. Please refresh.'}</p>
  } else if (view === 'home') page = <Home books={books} setView={setView} setGenre={setGenre} cardProps={cardProps} />
  else if (view === 'catalog') page = <Catalog books={books} genre={genre} setGenre={setGenre} cardProps={cardProps} />
  else if (view === 'detail' && selected) page = <BookDetail key={selected.id} book={selected} back={() => setView('catalog')} onAdd={addToCart} toast={toast} />
  else if (view === 'services') page = <Services toast={toast} />
  else if (view === 'about') page = <About />
  else if (view === 'contact') page = <Contact toast={toast} />

  return (
    <>
      <Header view={view} setView={setView} cartCount={cart.reduce((s, i) => s + i.qty, 0)}
        total={subtotal * (1 - discountRate)} wishCount={wishlist.length}
        openCart={() => setCartOpen(true)} openWishlist={() => setWishOpen(true)} />
      <main className="flex-grow">{page}</main>
      <footer className="bg-warm-900 text-warm-200 text-xs mt-16 py-6 text-center">&copy; 2026 PageTurner Bookstore Inc. All rights reserved.</footer>

      <CartDrawer open={cartOpen} close={() => setCartOpen(false)} cart={cart} changeQty={changeQty}
        discountRate={discountRate} applyPromo={applyPromo} checkout={checkout} />

      {wishOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-warm-100 pb-3">
              <h3 className="font-bold text-lg flex items-center gap-2"><Heart className="w-5 h-5 text-rose-500" /> Your Wishlist</h3>
              <button onClick={() => setWishOpen(false)}><X className="w-5 h-5" /></button>
            </div>
            {wishlist.length === 0 && <p className="text-xs text-slate-500 text-center py-6">Your wishlist is currently empty.</p>}
            {books.filter((b) => wishlist.includes(b.id)).map((b) => (
              <div key={b.id} className="flex items-center justify-between bg-warm-50 p-2 rounded-lg text-xs">
                <span className="font-bold truncate mr-2">{b.title}</span>
                <button onClick={() => addToCart(b)} className="px-2 py-1 bg-amber-700 text-white rounded">Add to Cart</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {toastMsg && <div className="fixed bottom-5 right-5 bg-warm-900 text-white px-4 py-3 rounded-xl shadow-2xl z-50 text-xs font-semibold">{toastMsg}</div>}
    </>
  )
}