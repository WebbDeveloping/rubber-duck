import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';

const NAV = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/inventory', label: 'Inventory', end: false },
  { to: '/admin/orders', label: 'Orders', end: false },
] as const;

export function AdminLayout() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="admin-shell">
      <aside className={`admin-sidebar ${navOpen ? 'is-open' : ''}`}>
        <div className="admin-sidebar-top">
          <Link to="/admin" className="admin-logo" onClick={() => setNavOpen(false)}>
            Rubba
            <br />
            Duckin
            <span>Admin</span>
          </Link>
          <button
            type="button"
            className="admin-nav-close"
            aria-label="Close navigation"
            onClick={() => setNavOpen(false)}
          >
            ×
          </button>
        </div>

        <nav className="admin-side-nav" aria-label="Admin">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className="admin-nav-link"
              onClick={() => setNavOpen(false)}
            >
              <span className="text-slide">
                <span data-label={item.label}>{item.label}</span>
              </span>
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar-foot">
          <p className="ops-kicker">Storefront</p>
          <Link to="/" className="admin-nav-link" onClick={() => setNavOpen(false)}>
            <span className="text-slide">
              <span data-label="View shop">View shop</span>
            </span>
          </Link>
        </div>
      </aside>

      {navOpen && (
        <button
          type="button"
          className="admin-backdrop"
          aria-label="Close navigation"
          onClick={() => setNavOpen(false)}
        />
      )}

      <div className="admin-frame">
        <header className="admin-topbar">
          <button
            type="button"
            className="admin-menu-btn"
            aria-label="Open navigation"
            onClick={() => setNavOpen(true)}
          >
            <MenuIcon />
          </button>
          <p className="admin-topbar-note">Warehouse operations</p>
          <Link to="/admin/inventory/new" className="ops-btn">
            <span className="text-slide">
              <span data-label="Add duck">Add duck</span>
            </span>
          </Link>
        </header>
        <main className="admin-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
