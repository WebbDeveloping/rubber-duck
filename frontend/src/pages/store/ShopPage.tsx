import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ShopHeroScene } from '../../components/store/hero/HomeScenes';
import { ProductCard } from '../../components/store/ProductCard';
import { SocialFollowSection } from '../../components/store/SocialFollowSection';
import { TestimonialsSection } from '../../components/store/TestimonialsSection';
import { useDucks } from '../../hooks/useDucks';
import { sizeLabel } from '../../lib/format';
import { DUCK_COLORS, type DuckColor } from '../../types/duck';

function isDuckColor(value: string | null): value is DuckColor {
  return DUCK_COLORS.includes(value as DuckColor);
}

export function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = (searchParams.get('q') ?? '').trim().toLowerCase();
  const colorParam = searchParams.get('color');
  const colorFilter = isDuckColor(colorParam) ? colorParam : null;
  const { ducks, status, error } = useDucks();

  const visible = useMemo(() => {
    return ducks.filter((duck) => {
      if (colorFilter && duck.color !== colorFilter) return false;
      if (!query) return true;
      return `${duck.color} ${duck.size} ${sizeLabel(duck.size)}`.toLowerCase().includes(query);
    });
  }, [ducks, query, colorFilter]);

  function setColor(color: DuckColor | null) {
    const next = new URLSearchParams(searchParams);
    if (color) next.set('color', color);
    else next.delete('color');
    setSearchParams(next, { replace: true });
  }

  return (
    <main className="shop-page">
      <section className="shop-hero">
        <div className="shop-hero-copy">
          <p className="shop-hero-kicker">Shop all</p>
          <h1>Find the perfect fit</h1>
        </div>
        <div className="shop-hero-media" aria-hidden="true">
          <div className="shop-hero-bg">
            <ShopHeroScene />
          </div>
          <div className="shop-hero-overlay" />
        </div>
      </section>

      <section className="shop-collection">
        <div className="shop-inner">
          <div className="shop-filter">
            <p className="shop-filter-label">Category:</p>
            <div className="shop-categories" role="group" aria-label="Color">
              <button
                type="button"
                className={`shop-category${!colorFilter ? ' is-active' : ''}`}
                onClick={() => setColor(null)}
              >
                All
              </button>
              {DUCK_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`shop-category${colorFilter === color ? ' is-active' : ''}`}
                  onClick={() => setColor(color)}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {query && (
            <p className="shop-results">
              Results for “{searchParams.get('q')}”
              {colorFilter ? ` in ${colorFilter}` : ''}.
            </p>
          )}

          {status === 'loading' && <p className="shop-status">Loading ducks…</p>}

          {status === 'error' && (
            <p className="shop-status is-error">
              Shop needs the warehouse API. {error}
            </p>
          )}

          {status === 'ready' && visible.length === 0 && (
            <p className="shop-status">
              {query || colorFilter ? (
                <>No ducks matched those filters.</>
              ) : (
                <>
                  No ducks in stock yet.{' '}
                  <Link to="/admin/inventory/new">Add some in the warehouse</Link>.
                </>
              )}
            </p>
          )}

          {status === 'ready' && visible.length > 0 && (
            <div className="shop-grid">
              {visible.map((duck) => (
                <ProductCard key={duck.id} duck={duck} imageClassName="shop-card-image" />
              ))}
            </div>
          )}
        </div>
      </section>

      <TestimonialsSection />
      <SocialFollowSection />
    </main>
  );
}
