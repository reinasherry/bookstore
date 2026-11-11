// All books come from the Open Library API (no key needed).
const FIELDS = 'key,title,author_name,cover_i,ratings_average,ratings_count,isbn'
export const GENRES = {
  'Fiction': 'fiction',
  'Sci-Fi & Fantasy': 'science_fiction',
  'Non-Fiction': 'nonfiction',
  'Biography': 'biography',
}

const hash = (s) => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7)

// Open Library has no prices/stock, so these are derived from the book id (stable between loads).
function toBook(b, genre) {
  const h = hash(b.key)
  return {
    id: b.key,
    title: b.title,
    author: (b.author_name && b.author_name[0]) || 'Unknown author',
    genre,
    price: 10 + (h % 20) + 0.99,
    rating: b.ratings_average ? Number(b.ratings_average.toFixed(1)) : 4.0,
    hasRating: Boolean(b.ratings_average),
    reviewsCount: b.ratings_count || 0,
    stock: h % 7 === 0 ? 0 : (h % 25) + 1,
    cover: `https://covers.openlibrary.org/b/id/${b.cover_i}-L.jpg`,
    isbn: b.isbn?.[0],
  }
}

export async function fetchBooks() {
  const groups = await Promise.all(
    Object.entries(GENRES).map(async ([genre, subject]) => {
      const res = await fetch(
        `https://openlibrary.org/search.json?subject=${subject}&sort=rating&limit=15&fields=${FIELDS}`
      )
      if (!res.ok) throw new Error('Open Library request failed')
      const data = await res.json()
      return data.docs.filter((d) => d.cover_i).map((d) => toBook(d, genre))
    })
  )
  const seen = new Set()
  return groups.flat().filter((b) => !seen.has(b.id) && seen.add(b.id))
}

export async function fetchDescription(id) {
  const res = await fetch(`https://openlibrary.org${id}.json`)
  if (!res.ok) return ''
  const d = await res.json()
  const desc = typeof d.description === 'string' ? d.description : d.description?.value
  return desc || 'No description available for this title.'
}