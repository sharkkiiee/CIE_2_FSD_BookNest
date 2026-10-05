import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, 'data', 'books.json');

app.use(cors());
app.use(express.json());

async function readBooks() {
  const data = await fs.readFile(DATA_FILE, 'utf-8');
  return JSON.parse(data);
}

async function writeBooks(books) {
  await fs.writeFile(DATA_FILE, JSON.stringify(books, null, 2));
}

app.get('/api/books', async (_req, res) => {
  try {
    res.json(await readBooks());
  } catch {
    res.status(500).json({ message: 'Unable to load books.' });
  }
});

app.get('/api/books/:id', async (req, res) => {
  const books = await readBooks();
  const book = books.find((item) => item.id === Number(req.params.id));
  if (!book) return res.status(404).json({ message: 'Book not found.' });
  res.json(book);
});

app.post('/api/books', async (req, res) => {
  const { title, author, genre, status, progress = 0, rating = 0, description = '' } = req.body;
  if (!title?.trim() || !author?.trim()) {
    return res.status(400).json({ message: 'Title and author are required.' });
  }

  const books = await readBooks();
  const book = {
    id: Date.now(),
    title: title.trim(),
    author: author.trim(),
    genre: genre || 'Other',
    status: status || 'Want to Read',
    progress: Math.min(100, Math.max(0, Number(progress))),
    rating: Math.min(5, Math.max(0, Number(rating))),
    description: description.trim()
  };
  books.push(book);
  await writeBooks(books);
  res.status(201).json(book);
});

app.put('/api/books/:id', async (req, res) => {
  const books = await readBooks();
  const index = books.findIndex((item) => item.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Book not found.' });

  books[index] = {
    ...books[index],
    ...req.body,
    id: books[index].id,
    progress: Math.min(100, Math.max(0, Number(req.body.progress ?? books[index].progress))),
    rating: Math.min(5, Math.max(0, Number(req.body.rating ?? books[index].rating)))
  };
  await writeBooks(books);
  res.json(books[index]);
});

app.delete('/api/books/:id', async (req, res) => {
  const books = await readBooks();
  const updated = books.filter((item) => item.id !== Number(req.params.id));
  if (updated.length === books.length) return res.status(404).json({ message: 'Book not found.' });
  await writeBooks(updated);
  res.json({ message: 'Book deleted successfully.' });
});

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => console.log(`BookNest API running at http://localhost:${PORT}`));
