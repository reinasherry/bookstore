import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'


import BookCard from "../components/BookCard";
import { GENRES } from "../services/bookApi";
export default function Catalog({ books, genre, setGenre, cardProps }) {
  const [query, setQuery] = useState('')
  const [maxPrice, setMaxPrice] = useState(30)
  const [inStock, setInStock] = useState(false)
  const [sort, setSort] = useState('featured')

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    const list = books.filter((b) =>
      (b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)) &&
      (genre === 'All' || b.genre === genre) && b.price <= maxPrice && (!inStock || b.stock > 0))
    if (sort === 'price-low') list.sort((a, b) => a.price - b.price)
    if (sort === 'price-high') list.sort((a, b) => b.price - a.price)
    if (sort === 'rating') list.sort((a, b) => b.rating - a.rating)
    return list
  }, [books, query, genre, maxPrice, inStock, sort])

  const reset = () => { setQuery(''); setGenre('All'); setMaxPrice(30); setInStock(false); setSort('featured') }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h1 className="font-serif text-3xl font-bold text-warm-900">Explore Our Collection</h1>
        <div className="relative w-full md:w-80">
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search title or author..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-amber-700 outline-none" />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
        </div>
      </div>
      <div className="grid lg:grid-cols-12 gap-8">
        <aside className="lg:col-span-3 bg-white p-5 rounded-xl border border-warm-200 shadow-sm space-y-5 self-start">
          <div className="flex justify-between items-center border-b border-warm-100 pb-3">
            <h3 className="font-bold text-sm text-warm-900">Filters</h3>
            <button onClick={reset} className="text-xs text-amber-700 hover:underline">Reset All</button>
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase text-slate-500">Genre</label>
            {['All', ...Object.keys(GENRES)].map((g) => (
              <label key={g} className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                <input type="radio" checked={genre === g} onChange={() => setGenre(g)} className="accent-amber-700" /> {g}
              </label>
            ))}
          </div>
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-500 mb-1"><span>Max Price</span><span className="text-amber-800">${maxPrice}</span></div>
            <input type="range" min="10" max="30" value={maxPrice} onChange={(e) => setMaxPrice(+e.target.value)} className="w-full accent-amber-700" />
          </div>
          <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
            <input type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)} className="accent-amber-700" /> In Stock Only
          </label>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs">
            <option value="featured">Featured Picks</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </aside>
        <div className="lg:col-span-9">
          <p className="text-xs text-slate-500 mb-4">Showing {filtered.length} of {books.length} books</p>
          {filtered.length === 0
            ? <p className="text-center py-12 text-slate-500">No books found matching your criteria.</p>
            : <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filtered.map((b) => <BookCard key={b.id} book={b} {...cardProps} wished={cardProps.wishlist.includes(b.id)} />)}
              </div>}
        </div>
      </div>
    </div>
  )
}