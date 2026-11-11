import { useEffect, useState } from 'react'
import { ArrowLeft, Star, ExternalLink } from 'lucide-react'
import { fetchDescription } from '../services/bookApi'

export default function BookDetail({ book, back, onAdd, toast }) {
  const [qty, setQty] = useState(1)
  const [desc, setDesc] = useState('Loading description...')
  const [reviews, setReviews] = useState([{ name: 'Emily R.', text: 'An absolutely breathtaking read. I could not put it down!' }])
  const [name, setName] = useState('')
  const [text, setText] = useState('')

  useEffect(() => {
    fetchDescription(book.id).then(setDesc).catch(() => setDesc('Description unavailable.'))
  }, [book.id])

  const submit = () => {
    if (!name || !text) return
    setReviews([{ name, text }, ...reviews])
    setName('')
    setText('')
    toast('Thank you! Your review has been posted.')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button onClick={back} className="mb-6 flex items-center gap-2 text-xs font-bold text-amber-800 hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back to Catalog
      </button>

      <div className="bg-white rounded-2xl border border-warm-200 shadow-md p-6 sm:p-10">
        <div className="grid md:grid-cols-12 gap-8">
          <img src={book.cover} alt={book.title} className="md:col-span-5 w-full max-w-sm rounded-xl shadow-xl mx-auto" />

          <div className="md:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700">{book.genre}</span>
              <h1 className="font-serif text-3xl font-bold text-warm-900 mt-1">{book.title}</h1>
              <p className="text-sm text-slate-600">by <strong className="text-warm-900">{book.author}</strong></p>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                {book.hasRating ? (
                  <>
                    <b>{book.rating}</b>
                    <span className="text-slate-400">({book.reviewsCount} reviews)</span>
                  </>
                ) : (
                  <span className="text-slate-400">No ratings yet</span>
                )}
              </span>
              <span className={`px-2.5 py-1 rounded text-xs font-bold ${book.stock > 0 ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'}`}>
                {book.stock > 0 ? `In Stock (${book.stock} left)` : 'Out of Stock'}
              </span>
            </div>

            <div className="text-3xl font-bold text-warm-900">${book.price.toFixed(2)}</div>

            <p className="text-sm text-slate-600 leading-relaxed border-y border-warm-100 py-4 max-h-48 overflow-y-auto">{desc}</p>

            <div className="flex items-center gap-4">
              <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 bg-warm-100 font-bold">-</button>
                <span className="px-4 text-sm font-bold">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="px-3 py-2 bg-warm-100 font-bold">+</button>
              </div>
              <button
                onClick={() => { onAdd(book, qty); setQty(1) }}
                disabled={book.stock === 0}
                className="flex-grow py-3 bg-amber-700 text-white font-semibold rounded-xl hover:bg-amber-800 disabled:opacity-50"
              >
                Add to Shopping Cart
              </button>
            </div>
                <a
  href={`https://www.goodreads.com/search?q=${encodeURIComponent(`${book.title} ${book.author}`)}`}
  target="_blank"
  rel="noreferrer"
  className="inline-flex items-center gap-2 rounded-xl border border-amber-700 px-4 py-2 text-sm font-semibold text-amber-800 hover:bg-amber-50"
>
  View on Goodreads
  <ExternalLink className="w-4 h-4" />
</a>
          </div>
        </div>

        <div className="mt-12 border-t border-warm-200 pt-8 space-y-4">
          <h3 className="font-serif text-2xl font-bold text-warm-900">Reader Reviews</h3>
          <div className="bg-warm-50 p-4 rounded-xl border border-warm-200 space-y-3">
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs" />
            <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Share your thoughts..." rows="3" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs" />
            <button onClick={submit} className="px-4 py-2 bg-warm-900 text-white text-xs font-bold rounded-lg hover:bg-amber-800">Submit Review</button>
          </div>
          {reviews.map((r, i) => (
            <div key={i} className="bg-white p-4 rounded-lg border border-warm-200 text-xs">
              <div className="font-bold text-warm-900 flex justify-between">
                <span>{r.name}</span>
                <span className="text-amber-600">★ 5.0</span>
              </div>
              <p className="text-slate-600">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}