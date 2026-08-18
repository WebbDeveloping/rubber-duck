import { Link } from 'react-router-dom';
import { DuckVisual } from '../../components/shared/DuckVisual';
import { useDucks } from '../../hooks/useDucks';
import { formatPrice, sizeLabel } from '../../lib/format';

const LOW_STOCK = 15;

export function DashboardPage() {
  const { ducks, status, error, reload } = useDucks();

  const skuCount = ducks.length;
  const unitsOnHand = ducks.reduce((sum, d) => sum + d.quantity, 0);
  const inventoryValue = ducks.reduce(
    (sum, d) => sum + Number(d.price) * d.quantity,
    0,
  );
  const lowStock = ducks
    .filter((d) => d.quantity <= LOW_STOCK)
    .sort((a, b) => a.quantity - b.quantity);
  const byColor = ducks.reduce<Record<string, number>>((acc, d) => {
    acc[d.color] = (acc[d.color] ?? 0) + d.quantity;
    return acc;
  }, {});

  return (
    <section className="ops-page">
      <header className="ops-header">
        <div>
          <p className="ops-kicker">Warehouse</p>
          <h1 className="ops-title">Dashboard</h1>
          <p className="ops-lede">Stock snapshot for the ducks currently on hand.</p>
        </div>
        <Link to="/admin/inventory/new" className="ops-btn">
          <span className="text-slide">
            <span data-label="Add duck">Add duck</span>
          </span>
        </Link>
      </header>

      {status === 'loading' && <p className="ops-status">Loading dashboard…</p>}

      {status === 'error' && (
        <p className="ops-banner is-error">
          {error}{' '}
          <button type="button" className="ops-text-btn" onClick={() => void reload()}>
            Retry
          </button>
        </p>
      )}

      {status === 'ready' && (
        <>
          <div className="ops-stats">
            <article className="ops-stat">
              <p className="ops-kicker">SKUs</p>
              <p className="ops-stat-value">{skuCount}</p>
            </article>
            <article className="ops-stat">
              <p className="ops-kicker">Units on hand</p>
              <p className="ops-stat-value">{unitsOnHand}</p>
            </article>
            <article className="ops-stat">
              <p className="ops-kicker">Inventory value</p>
              <p className="ops-stat-value">{formatPrice(inventoryValue)}</p>
            </article>
            <article className="ops-stat">
              <p className="ops-kicker">Low stock</p>
              <p className="ops-stat-value">{lowStock.length}</p>
              <p className="ops-stat-hint">≤ {LOW_STOCK} units</p>
            </article>
          </div>

          <div className="ops-panels">
            <section className="ops-panel">
              <header className="ops-panel-head">
                <div>
                  <p className="ops-kicker">Attention</p>
                  <h2>Low stock</h2>
                </div>
                <Link to="/admin/inventory" className="home-story-link">
                  <span>Open inventory</span>
                  <ArrowIcon />
                </Link>
              </header>
              {lowStock.length === 0 ? (
                <p className="ops-status">All SKUs are above the low-stock threshold.</p>
              ) : (
                <ul className="ops-list">
                  {lowStock.slice(0, 6).map((duck) => (
                    <li key={duck.id}>
                      <Link to={`/admin/inventory/${duck.id}/edit`} className="ops-list-item">
                        <span className="ops-thumb">
                          <DuckVisual color={duck.color} size={duck.size} />
                        </span>
                        <span className="ops-list-copy">
                          <strong>
                            {duck.color} · {sizeLabel(duck.size)}
                          </strong>
                          <span>#{duck.id}</span>
                        </span>
                        <strong className="ops-qty is-low">{duck.quantity}</strong>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section className="ops-panel">
              <header className="ops-panel-head">
                <div>
                  <p className="ops-kicker">Breakdown</p>
                  <h2>Units by color</h2>
                </div>
              </header>
              {skuCount === 0 ? (
                <p className="ops-status">
                  No stock yet.{' '}
                  <Link to="/admin/inventory/new" className="ops-text-btn">
                    Add a duck
                  </Link>
                  .
                </p>
              ) : (
                <ul className="ops-list">
                  {Object.entries(byColor).map(([color, qty]) => (
                    <li key={color}>
                      <div className="ops-list-item">
                        <span className="ops-swatch" data-color={color} aria-hidden="true" />
                        <span className="ops-list-copy">
                          <strong>{color}</strong>
                        </span>
                        <strong className="ops-qty">{qty}</strong>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>

          <section className="ops-quick-grid">
            <Link to="/admin/inventory" className="ops-quick">
              <p className="ops-kicker">Warehouse</p>
              <h3>Manage inventory</h3>
              <p>Add, edit, and retire ducks.</p>
            </Link>
            <Link to="/admin/orders" className="ops-quick">
              <p className="ops-kicker">Store</p>
              <h3>Orders</h3>
              <p>Quote tools once the order API is in.</p>
            </Link>
            <Link to="/shop" className="ops-quick">
              <p className="ops-kicker">Storefront</p>
              <h3>View shop</h3>
              <p>See how inventory appears to buyers.</p>
            </Link>
          </section>
        </>
      )}
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5 12h12M13 6l6 6-6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
