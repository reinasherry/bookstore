import { ArrowRight, Book, Rocket, Compass, UserCheck } from 'lucide-react'
import BookCard from "../components/BookCard";

const CATS = [
  ['Fiction', Book], ['Sci-Fi & Fantasy', Rocket], ['Non-Fiction', Compass], ['Biography', UserCheck],
]

export default function Home({ books, setView, setGenre, cardProps }) {
  const hero = books[0]
  return (
    <>
      <div className="bg-gradient-to-r from-warm-900 via-amber-900 to-warm-900 text-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Stories That Stay With You <span className="italic font-normal text-amber-300">Forever</span>
            </h1>
            <p className="text-warm-200 max-w-2xl">Discover expertly curated fiction and compelling non-fiction, delivered to your reading nook.</p>
            <div className="flex gap-4 justify-center lg:justify-start">
              <button onClick={() => setView('catalog')} className="px-8 py-4 bg-amber-700 hover:bg-amber-700/80 font-semibold rounded-xl flex items-center gap-2">
                Explore Best Sellers <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => setView('services')} className="px-6 py-4 bg-white/10 hover:bg-white/20 font-semibold rounded-xl border border-white/20">Join Reader Club</button>
            </div>
          </div>
          {hero && (
            <div className="lg:col-span-5 flex justify-center">
              <div className="bg-warm-800 p-6 rounded-2xl text-center cursor-pointer" onClick={() => cardProps.onOpen(hero)}>
                <img src={hero.cover} alt={hero.title} className="w-48 h-72 object-cover rounded-lg shadow-2xl mx-auto" />
                <h3 className="font-serif font-bold text-xl mt-4">{hero.title}</h3>
                <p className="text-xs text-amber-300">{hero.author}</p>
                <p className="text-xl font-bold text-amber-400 mt-2">${hero.price.toFixed(2)}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
        {CATS.map(([name, Icon]) => (
          <div key={name} onClick={() => { setGenre(name); setView('catalog') }}
            className="bg-white p-5 rounded-xl border border-warm-200 shadow-md hover:shadow-lg cursor-pointer flex items-center gap-4">
            <div className="p-3 bg-amber-100 text-amber-800 rounded-lg"><Icon className="w-6 h-6" /></div>
            <h4 className="font-bold text-warm-900 text-sm">{name}</h4>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="font-serif text-3xl font-bold text-warm-900 mb-8">Curated Best-Sellers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {books.slice(0, 4).map((b) => <BookCard key={b.id} book={b} {...cardProps} wished={cardProps.wishlist.includes(b.id)} />)}
        </div>
      </div>
    </>
  )
}