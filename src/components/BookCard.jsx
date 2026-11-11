import { Heart, Plus, Star } from 'lucide-react'

export default function BookCard({ book, wished, onOpen, onAdd, onWish }) {
  return (
    <div className="bg-white rounded-2xl border border-warm-200 p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group relative">
      <button onClick={() => onWish(book.id)} className="absolute top-6 right-6 p-2 rounded-full bg-white/80 border border-warm-200 text-slate-400 hover:text-rose-500 z-10">
        <Heart className={`w-4 h-4 ${wished ? 'fill-rose-500 text-rose-500' : ''}`} />
      </button>
      <div className="cursor-pointer" onClick={() => onOpen(book)}>
        <div className="aspect-[3/4] bg-warm-100 rounded-xl overflow-hidden mb-4 relative">
          <img src={book.cover} alt={book.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          {book.stock === 0 && <span className="absolute bottom-2 left-2 bg-slate-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded">Out of Stock</span>}
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">{book.genre}</span>
        <h3 className="font-serif font-bold text-warm-900 text-base line-clamp-1">{book.title}</h3>
        <p className="text-xs text-slate-500 mb-2 line-clamp-1">by {book.author}</p>
        <div className="flex items-center gap-1 text-xs mb-3">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="font-bold">{book.rating}</span>
          <span className="text-slate-400">({book.reviewsCount})</span>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-warm-100 pt-3">
        <span className="font-bold text-warm-900 text-lg">${book.price.toFixed(2)}</span>
        <button onClick={() => onAdd(book)} disabled={book.stock === 0}
          className="px-3 py-1.5 bg-warm-900 text-white rounded-lg text-xs font-semibold hover:bg-amber-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1">
          <Plus className="w-3.5 h-3.5" /> Add
        </button>
      </div>
    </div>
  )
}