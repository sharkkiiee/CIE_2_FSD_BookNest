import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="navbar">
      <NavLink to="/" className="brand"><span className="brand-mark">B</span><span>BookNest</span></NavLink>
      <nav>
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/library">My Library</NavLink>
        <NavLink to="/add" className="nav-cta">+ Add Book</NavLink>
      </nav>
    </header>
  );
}
