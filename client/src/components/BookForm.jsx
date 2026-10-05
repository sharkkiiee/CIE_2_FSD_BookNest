import { useState } from 'react';

const initialState = { title: '', author: '', genre: 'Fiction', status: 'Want to Read', progress: 0, rating: 0, description: '' };

export default function BookForm({ initialBook = initialState, onSubmit, submitLabel = 'Add to Library' }) {
  const [form, setForm] = useState(initialBook);
  const [error, setError] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;
    setForm(prev => ({ ...prev, [name]: name === 'progress' || name === 'rating' ? Number(value) : value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!form.title.trim() || !form.author.trim()) {
      setError('Please enter both the book title and author.');
      return;
    }
    setError('');
    try { await onSubmit(form); } catch { setError('Something went wrong. Please try again.'); }
  }

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      {error && <div className="form-error">{error}</div>}
      <label>Book title<input name="title" value={form.title} onChange={handleChange} placeholder="e.g. The Midnight Library" /></label>
      <label>Author<input name="author" value={form.author} onChange={handleChange} placeholder="e.g. Matt Haig" /></label>
      <div className="form-row">
        <label>Genre<select name="genre" value={form.genre} onChange={handleChange}><option>Fiction</option><option>Non-fiction</option><option>Self-help</option><option>Fantasy</option><option>Romance</option><option>Mystery</option><option>Science</option><option>Other</option></select></label>
        <label>Status<select name="status" value={form.status} onChange={handleChange}><option>Want to Read</option><option>Reading</option><option>Completed</option></select></label>
      </div>
      <label>Progress <span className="range-value">{form.progress}%</span><input type="range" min="0" max="100" name="progress" value={form.progress} onChange={handleChange} /></label>
      <label>Notes<textarea name="description" value={form.description} onChange={handleChange} rows="4" placeholder="What is this book about?" /></label>
      <button className="primary-btn" type="submit">{submitLabel}</button>
    </form>
  );
}
