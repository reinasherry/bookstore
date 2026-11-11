
import { ExternalLink } from 'lucide-react'
import './GoodreadsButton.css'

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
      className="goodreads-button"
    >
      View on Goodreads
      <ExternalLink className="goodreads-icon" />
    </a>
  )
}
