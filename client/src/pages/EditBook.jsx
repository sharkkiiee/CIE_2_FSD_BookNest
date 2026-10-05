import { useNavigate, useParams } from 'react-router-dom';
import BookForm from '../components/BookForm';

export default function EditBook({ books, onUpdate }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the book that matches the ID in the URL
  const book = books.find(
    (item) => String(item.id) === String(id)
  );

  // If the book doesn't exist
  if (!book) {
    return (
      <div className="form-page">
        <div className="page-heading">
          <p className="eyebrow">BOOK NOT FOUND</p>

          <h1>We couldn't find that book.</h1>

          <p>
            The book may have been deleted from your library.
          </p>
        </div>

        <button
          className="primary-btn"
          onClick={() => navigate('/library')}
        >
          Back to Library
        </button>
      </div>
    );
  }

  // Save the edited book
  async function handleUpdate(updatedBook) {
    try {
      await onUpdate(book.id, updatedBook);

      // Return to the library after saving
      navigate('/library');
    } catch (error) {
      console.error('Failed to update book:', error);
      alert('Unable to update the book. Please try again.');
    }
  }

  return (
    <div className="form-page">

      <div className="page-heading">
        <p className="eyebrow">
          UPDATE YOUR COLLECTION
        </p>

        <h1>Edit Book</h1>

        <p>
          Update the details and reading progress
          for this title.
        </p>
      </div>

      <BookForm
        initialBook={book}
        onSubmit={handleUpdate}
        submitLabel="Save Changes"
      />

    </div>
  );
}