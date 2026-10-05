import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BookCard({ book, onUpdate, onDelete }) {
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const initials = book.title
    .split(' ')
    .slice(0, 2)
    .map(word => word[0])
    .join('')
    .toUpperCase();

  async function toggleStatus() {
    setBusy(true);

    const nextStatus =
      book.status === 'Completed'
        ? 'Reading'
        : book.status === 'Reading'
        ? 'Completed'
        : 'Reading';

    try {
      await onUpdate(book.id, {
        ...book,
        status: nextStatus,
        progress:
          nextStatus === 'Completed'
            ? 100
            : book.progress
      });
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (
      !window.confirm(
        `Remove “${book.title}” from your library?`
      )
    ) {
      return;
    }

    setBusy(true);

    try {
      await onDelete(book.id);
    } finally {
      setBusy(false);
    }
  }

  function editBook() {
    navigate(`/edit/${book.id}`);
  }

  return (
    <article className="book-card">

      <div className="cover">
        <span>{initials}</span>
      </div>

      <div className="book-info">

        <div className="book-topline">
          <span className="genre">
            {book.genre}
          </span>

          <span
            className={`status ${book.status
              .toLowerCase()
              .replaceAll(' ', '-')}`}
          >
            {book.status}
          </span>
        </div>

        <h3>{book.title}</h3>

        <p className="author">
          by {book.author}
        </p>

        <p className="description">
          {book.description || 'No description added yet.'}
        </p>

        <div className="progress-label">
          <span>Reading progress</span>
          <strong>{book.progress}%</strong>
        </div>

        <div className="progress">
          <span
            style={{
              width: `${book.progress}%`
            }}
          />
        </div>

        <div className="card-actions">

          {/* Edit Book */}
          <button
            onClick={editBook}
            disabled={busy}
          >
            Edit
          </button>

          {/* Update Reading Status */}
          <button
            onClick={toggleStatus}
            disabled={busy}
          >
            {book.status === 'Completed'
              ? 'Mark reading'
              : 'Update status'}
          </button>

          {/* Delete Book */}
          <button
            className="danger"
            onClick={remove}
            disabled={busy}
          >
            Delete
          </button>

        </div>

      </div>
    </article>
  );
}