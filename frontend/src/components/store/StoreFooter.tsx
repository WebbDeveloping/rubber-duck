import { Link } from 'react-router-dom';
import { DUCK_COLORS } from '../../types/duck';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
  { to: '/shop', label: 'Shop' },
] as const;

export function StoreFooter() {
  return (
    <footer className="store-footer">
      <div className="store-footer-inner">
        <div className="store-footer-grid">
          <div className="store-footer-nav">
            <div className="store-footer-list">
              <p className="store-footer-label">Navigation</p>
              <div className="store-footer-items">
                {NAV_LINKS.map((link) => (
                  <FooterLink key={link.to} to={link.to} label={link.label} />
                ))}
              </div>
            </div>

            <div className="store-footer-list">
              <p className="store-footer-label">Products</p>
              <div className="store-footer-items">
                {DUCK_COLORS.map((color) => (
                  <FooterLink
                    key={color}
                    to={`/shop?color=${encodeURIComponent(color)}`}
                    label={color}
                  />
                ))}
                <FooterLink to="/shop" label="Shop all" />
              </div>
            </div>
          </div>
        </div>

        <div className="store-footer-bottom">
          <p className="store-footer-legal">© 2026 Rubber Duck</p>
          <div className="store-footer-legal store-footer-legal--end">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms &amp; Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ to, label }: { to: string; label: string }) {
  return (
    <Link to={to} className="store-footer-link">
      <span className="text-slide">
        <span data-label={label}>{label}</span>
      </span>
      <span className="store-footer-arrow" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path
            d="M5 12h12M13 6l6 6-6 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  );
}
