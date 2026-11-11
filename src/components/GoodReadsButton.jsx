import { ExternalLink } from 'lucide-react'

export default function GoodreadsButton({ title, author }) {
  const query = [title, author !== 'Unknown author' ? author : '']
    .filter(Boolean)
    .join(' ')
  if (!query) return null

  return (
    <a
      href={`https://www.goodreads.com/search?q=${encodeURIComponent(query)}`}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-xl border border-amber-700 px-4 py-2 text-sm font-semibold text-amber-800 hover:bg-amber-50"
    >
      View on Goodreads
      <ExternalLink className="w-4 h-4" />
    </a>
  )
}