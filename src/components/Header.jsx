import { BookMarked, Search, Heart, ShoppingBag, Menu } from 'lucide-react'
import { useState } from 'react'

const LINKS = [
  ['home', 'Home'], ['catalog', 'Browse Catalog'], ['services', 'Services & Perks'],
  ['about', 'Our Story'], ['contact', 'Contact & Stores'],
]

export default function Header({ view, setView, cartCount, total, wishCount, openCart, openWishlist }) {
  const [open, setOpen] = useState(false)
  const go = (v) => { setView(v); setOpen(false) }
  return (
    <>
      <div className="bg-amber-900 text-amber-100 text-xs py-2 px-4 text-center font-medium">
        Free delivery on orders over $45 with code <strong className="text-white">READMORE</strong>
      </div>
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-warm-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-20">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => go('home')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-700 to-amber-900 text-white flex items-center justify-center">
              <BookMarked className="w-6 h-6" />
            </div>
            <div>
              <span className="font-serif text-2xl font-bold text-warm-900 block leading-none">PageTurner</span>
              <span className="text-[10px] tracking-widest text-amber-700 uppercase font-semibold">Curated Bookstore</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-1">
            {LINKS.map(([id, label]) => (
              <button key={id} onClick={() => go(id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium hover:bg-warm-100 ${view === id ? 'text-amber-800 bg-amber-50' : 'text-slate-600'}`}>
                {label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={() => go('catalog')} className="p-2 text-slate-600 hover:bg-warm-100 rounded-lg"><Search className="w-5 h-5" /></button>
            <button onClick={openWishlist} className="p-2 text-slate-600 hover:bg-warm-100 rounded-lg relative">
              <Heart className="w-5 h-5" />
              {wishCount > 0 && <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{wishCount}</span>}
            </button>
            <button onClick={openCart} className="flex items-center gap-2 bg-warm-900 text-white px-4 py-2 rounded-xl hover:bg-amber-900">
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute -top-2 -right-2 bg-amber-500 text-warm-900 text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">{cartCount}</span>
              </div>
              <span className="text-sm font-semibold hidden sm:inline">${total.toFixed(2)}</span>
            </button>
            <button onClick={() => setOpen(!open)} className="p-2 md:hidden"><Menu className="w-6 h-6" /></button>
          </div>
        </div>
        {open && (
          <div className="md:hidden border-t border-warm-200 bg-white px-4 py-2">
            {LINKS.map(([id, label]) => (
              <button key={id} onClick={() => go(id)} className="block w-full text-left px-3 py-2 rounded-md font-medium hover:bg-warm-100">{label}</button>
            ))}
          </div>
        )}
      </header>
    </>
  )
}