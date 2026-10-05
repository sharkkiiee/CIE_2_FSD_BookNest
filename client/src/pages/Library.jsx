import { useMemo, useState } from 'react';
import BookCard from '../components/BookCard';

export default function Library({ books, loading, onUpdate, onDelete }) {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [genre, setGenre] = useState('All');

  const genres = ['All', ...new Set(books.map(book => book.genre))];
  const filtered = useMemo(() => books.filter(book => {
    const matchesSearch = `${book.title} ${book.author}`.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = status === 'All' || book.status === status;
    const matchesGenre = genre === 'All' || book.genre === genre;
    return matchesSearch && matchesStatus && matchesGenre;
  }), [books, search, status, genre]);

  return (
    <div>
      <section className="page-heading"><div><p className="eyebrow">THE COLLECTION</p><h1>My Library</h1><p>Search, filter and manage your reading list.</p></div></section>
      <section className="filters"><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search title or author..." /><select value={status} onChange={e => setStatus(e.target.value)}><option>All</option><option>Want to Read</option><option>Reading</option><option>Completed</option></select><select value={genre} onChange={e => setGenre(e.target.value)}>{genres.map(item => <option key={item}>{item}</option>)}</select></section>
      {loading ? <p className="empty">Loading...</p> : filtered.length ? <div className="book-grid">{filtered.map(book => <BookCard key={book.id} book={book} onUpdate={onUpdate} onDelete={onDelete} />)}</div> : <p className="empty">No books match your search or filters.</p>}
    </div>
  );
}
