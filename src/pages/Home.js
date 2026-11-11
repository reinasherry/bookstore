import { useNavigate } from 'react-router-dom';
import { ArrowRight, Book, Rocket, Compass, UserCheck } from 'lucide-react';
import BookCard from "../components/BookCard";
import '../styles/Home.css';

const CATS = [
  ['Fiction', Book],
  ['Sci-Fi & Fantasy', Rocket],
  ['Non-Fiction', Compass],
  ['Biography', UserCheck],
];

export default function Home({ books, setGenre, cardProps }) {
  const navigate = useNavigate();
  const hero = books[0];

  return (
    <div className="home">

      {/* HERO SECTION */}
      <section className="home-hero">
        <div className="home-hero-container">

          <div className="home-hero-content">
            <h1>
              Stories That Stay With You
              <span> Forever</span>
            </h1>

            <p>
              Discover expertly curated fiction and compelling
              non-fiction, delivered to your reading nook.
            </p>

            <div className="home-buttons">
              <button onClick={() => navigate('/catalog')} className="explore-btn">
                Explore Best Sellers
                <ArrowRight size={16} />
              </button>

              <button onClick={() => navigate('/services')} className="club-btn">
                Join Reader Club
              </button>
            </div>
          </div>

          {hero && (
            <div className="home-hero-book">
              <div
                className="featured-book"
                onClick={() => cardProps.onOpen(hero)}
              >
                <img src={hero.cover} alt={hero.title} />

                <h3>{hero.title}</h3>
                <p className="book-author">{hero.author}</p>

                <p className="book-price">
                  ${hero.price.toFixed(2)}
                </p>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* CATEGORIES */}
      <section className="home-categories">
        {CATS.map(([name, Icon]) => (
          <div
            key={name}
            className="category-card"
            onClick={() => {
  setGenre(name);
  navigate('/catalog');
}}
          >
            <div className="category-icon">
              <Icon size={24} />
            </div>

            <h4>{name}</h4>
          </div>
        ))}
      </section>

      {/* BEST SELLERS */}
      <section className="home-bestsellers">
        <h2>Best Sellers</h2>

        <div className="bestsellers-grid">
          {books.slice(0, 4).map((b) => (
            <BookCard
              key={b.id}
              book={b}
              {...cardProps}
              wished={cardProps.wishlist.includes(b.id)}
            />
          ))}
        </div>
      </section>

    </div>
  );
}
