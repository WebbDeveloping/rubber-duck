import { useEffect, useState, type SubmitEvent } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/shop', label: 'Shop', end: false },
  { to: '/about', label: 'About', end: false },
  { to: '/contact', label: 'Contact', end: false },
  { to: '/admin/inventory', label: 'Admin', end: false },
] as const;

export function StoreNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
    setCartOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key !== 'Escape') return;
      setSearchOpen(false);
      setCartOpen(false);
      setMenuOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  function onSearch(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = query.trim();
    navigate(next ? `/shop?q=${encodeURIComponent(next)}` : '/shop');
    setSearchOpen(false);
  }

  return (
    <>
      <header className="store-navbar">
        <div className="store-navbar-inner">
          <Link to="/" className="store-logo" aria-label="Rubba Duckin home">
            Rubba Duckin
          </Link>

          <nav className={`store-menu${menuOpen ? ' is-open' : ''}`} aria-label="Primary">
            <div className="store-menu-links">
              {LINKS.map((link) => (
                <NavLink key={link.to} to={link.to} end={link.end} className="store-nav-link">
                  <span className="text-slide">
                    <span data-label={link.label}>{link.label}</span>
                  </span>
                </NavLink>
              ))}
            </div>

            <form
              className={`store-search${searchOpen ? ' is-open' : ''}`}
              onSubmit={onSearch}
              role="search"
            >
              <input
                className="store-search-input"
                type="search"
                name="q"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-hidden={!searchOpen}
                tabIndex={searchOpen ? 0 : -1}
              />
              <button
                type={searchOpen ? 'submit' : 'button'}
                className="store-search-toggle"
                aria-label={searchOpen ? 'Search' : 'Open search'}
                aria-expanded={searchOpen}
                onClick={() => {
                  if (!searchOpen) setSearchOpen(true);
                }}
              >
                <SearchIcon />
              </button>
            </form>
          </nav>

          <div className="store-navbar-right">
            <button
              type="button"
              className="store-bag"
              aria-label="Open empty cart"
              onClick={() => setCartOpen(true)}
            >
              Bag <span>(0)</span>
            </button>
            <button
              type="button"
              className="store-menu-toggle"
              aria-label="Menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <button
          type="button"
          className="store-menu-backdrop"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {cartOpen && (
        <div className="store-cart" role="dialog" aria-label="Bag">
          <button
            type="button"
            className="store-cart-backdrop"
            aria-label="Close cart"
            onClick={() => setCartOpen(false)}
          />
          <div className="store-cart-panel">
            <div className="store-cart-top">
              <button type="button" className="store-cart-back" onClick={() => setCartOpen(false)}>
                ← Back
              </button>
              <p>Bag (0)</p>
            </div>
            <div className="store-cart-empty">
              <p className="store-cart-empty-kicker">Still shopping?</p>
              <p>Your cart is currently empty.</p>
              <Link to="/shop" className="hero-shop-btn hero-shop-btn--dark" onClick={() => setCartOpen(false)}>
                <span className="text-slide">
                  <span data-label="Shop All">Shop All</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="6.25" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M15.2 15.2 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
