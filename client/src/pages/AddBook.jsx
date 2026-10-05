import { useNavigate } from 'react-router-dom';
import BookForm from '../components/BookForm';

export default function AddBook({ onAdd }) {
  const navigate = useNavigate();
  async function handleAdd(book) {
    await onAdd(book);
    navigate('/library');
  }
  return <div className="form-page"><div className="page-heading"><p className="eyebrow">BUILD YOUR COLLECTION</p><h1>Add a Book</h1><p>Save a new title to your personal library.</p></div><BookForm onSubmit={handleAdd} /></div>;
}
