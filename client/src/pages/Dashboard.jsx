import { Link } from 'react-router-dom';
import Stats from '../components/Stats';

export default function Dashboard({ books, loading }) {
  const recent = [...books].slice(-3).reverse();

  return (
    <div>
      <section className="hero">
        <div>
          <p className="eyebrow">YOUR PERSONAL READING SPACE</p>

          <h1>
            Keep your stories
            <br />
            <em>close.</em>
          </h1>

          <p className="hero-copy">
            Organize the books you love, track your reading journey,
            and discover what to read next.
          </p>

          <Link to="/add" className="primary-btn inline-btn">
            Add a book <span>→</span>
          </Link>
        </div>

        <div className="hero-art">
          <div className="stack stack-one">BOOK</div>
          <div className="stack stack-two">READ</div>
          <div className="stack stack-three">MORE</div>
        </div>
      </section>

      <Stats books={books} />

      <section className="section-heading">
        <div>
          <p className="eyebrow">YOUR COLLECTION</p>
          <h2>Recently added</h2>
        </div>

        <Link to="/library">View library →</Link>
      </section>

      {loading ? (
        <p className="empty">Loading your library...</p>
      ) : recent.length ? (
        <div className="mini-grid">
          {recent.map(book => (
            <div className="mini-book" key={book.id}>
              <div className="mini-cover">
                {book.title.slice(0, 1)}
              </div>

              <div>
                <h3>{book.title}</h3>
                <p>{book.author}</p>
                <span>{book.status}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="empty">
          Your library is empty. Add your first book!
        </p>
      )}
    </div>
  );
}