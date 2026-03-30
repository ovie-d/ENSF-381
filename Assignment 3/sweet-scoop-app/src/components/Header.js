import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="header-wrapper">
      <header>
        <img src="/logo.webp" alt="Sweet Scoop logo" className="brand-logo" />
        <h1>Sweet Scoop Ice Cream Shop</h1>
      </header>
      <div className="navbar">
        <Link to="/">Home</Link>
        <Link to="/flavors">Flavors</Link>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

export default Header;
