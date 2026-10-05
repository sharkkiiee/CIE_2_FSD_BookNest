import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';

import Dashboard from './pages/Dashboard';
import Library from './pages/Library';
import AddBook from './pages/AddBook';
import EditBook from './pages/EditBook';

const API = 'http://localhost:5000/api';

export default function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all books from the Express backend
  async function fetchBooks() {
    setLoading(true);

    try {
      const response = await fetch(`${API}/books`);

      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }

      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  }

  // Load books when the application starts
  useEffect(() => {
    fetchBooks();
  }, []);

  // Add a new book
  async function addBook(book) {
    const response = await fetch(`${API}/books`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    });

    if (!response.ok) {
      throw new Error('Unable to add book');
    }

    await fetchBooks();
  }

  // Update an existing book
  async function updateBook(id, book) {
    const response = await fetch(`${API}/books/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    });

    if (!response.ok) {
      throw new Error('Unable to update book');
    }

    await fetchBooks();
  }

  // Delete a book
  async function deleteBook(id) {
    const response = await fetch(`${API}/books/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Unable to delete book');
    }

    await fetchBooks();
  }

  return (
    <div className="app-shell">
      <Navbar />

      <main className="page-wrap">
        <Routes>

          {/* Dashboard */}
          <Route
            path="/"
            element={
              <Dashboard
                books={books}
                loading={loading}
              />
            }
          />

          {/* Library */}
          <Route
            path="/library"
            element={
              <Library
                books={books}
                loading={loading}
                onUpdate={updateBook}
                onDelete={deleteBook}
              />
            }
          />

          {/* Add Book */}
          <Route
            path="/add"
            element={
              <AddBook
                onAdd={addBook}
              />
            }
          />

          {/* Edit Book */}
          <Route
            path="/edit/:id"
            element={
              <EditBook
                books={books}
                onUpdate={updateBook}
              />
            }
          />

          {/* Redirect unknown routes */}
          <Route
            path="*"
            element={
              <Navigate
                to="/"
                replace
              />
            }
          />

        </Routes>
      </main>
    </div>
  );
}