import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { DuckVisual } from '../../components/shared/DuckVisual';
import { ProductCard } from '../../components/store/ProductCard';
import { SocialFollowSection } from '../../components/store/SocialFollowSection';
import { TestimonialsSection } from '../../components/store/TestimonialsSection';
import { useDucks } from '../../hooks/useDucks';
import { formatPrice, SIZE_PILL, sizeLabel } from '../../lib/format';
import { LIFESTYLE } from '../../lib/storeContent';
import { DUCK_SIZES } from '../../types/duck';

const GALLERY_SLOTS = 7;
const RELATED_COUNT = 4;

type TabId = 'description' | 'delivery';

export function ProductPage() {
  const { id } = useParams();
  const duckId = Number(id);
  const { ducks, status, error } = useDucks();
  const [openTab, setOpenTab] = useState<TabId | null>(null);
  const [added, setAdded] = useState(false);

  const duck = useMemo(
    () => ducks.find((item) => item.id === duckId) ?? null,
    [ducks, duckId],
  );

  const sizeOptions = useMemo(() => {
    if (!duck) return [];
    return DUCK_SIZES.map((size) => ({
      size,
      match: ducks.find((item) => item.color === duck.color && item.size === size) ?? null,
    }));
  }, [duck, ducks]);

  const related = useMemo(
    () => ducks.filter((item) => item.id !== duckId).slice(0, RELATED_COUNT),
    [ducks, duckId],
  );

  useEffect(() => {
    setOpenTab(null);
    setAdded(false);
    window.scrollTo(0, 0);
  }, [duckId]);

  const invalid = !Number.isFinite(duckId);
  const missing = status === 'ready' && !duck;

  if (invalid || status === 'error' || missing) {
    return (
      <main className="product-page">
        <div className="pp-status">
          <p>{invalid ? 'Invalid product' : error ?? 'Duck not found'}</p>
          <Link to="/shop" className="home-story-link">
            <span>Back to shop</span>
            <ArrowIcon />
          </Link>
        </div>
      </main>
    );
  }

  if (status === 'loading' || !duck) {
    return (
      <main className="product-page">
        <p className="pp-status">Loading product…</p>
      </main>
    );
  }

  const blurb = `The ${duck.color.toLowerCase()} rubber duck is a classic squeaky companion for the tub, the desk, or the shelf.`;
  const longCopy = `${blurb} Made with a durable outer shell and a buoyant core, it is built to float and squeak.`;
  const inStock = duck.quantity > 0;

  function toggleTab(tab: TabId) {
    setOpenTab((current) => (current === tab ? null : tab));
  }

  function addToBag() {
    if (!inStock) return;
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  }

  return (
    <main className="product-page">
      <section className="pp-hero">
        <div className="pp-hero-inner">
          <div className="pp-layout">
            <div className="pp-gallery-col">
              <div className="pp-gallery">
                {Array.from({ length: GALLERY_SLOTS }, (_, index) => (
                  <div key={index} className="pp-gallery-item">
                    <DuckVisual color={duck.color} size={duck.size} />
                  </div>
                ))}
              </div>
            </div>

            <aside className="pp-sidebar" id="buy">
              <div className="pp-top">
                <h1 className="pp-title">{duck.color} rubber duck</h1>
                <p className="pp-price">{formatPrice(Number(duck.price))}</p>
              </div>

              <div className="pp-details">
                <p className="pp-blurb">{blurb}</p>

                <div className="pp-cart">
                  <div className="pp-block">
                    <div className="pp-block-head">
                      <p className="pp-block-title">Size</p>
                      <p className="pp-block-note">{sizeLabel(duck.size)}</p>
                    </div>
                    <div className="pp-options" role="radiogroup" aria-label="Size">
                      {sizeOptions.map(({ size, match }) => {
                        const selected = size === duck.size;
                        const available = Boolean(match);
                        if (selected || !match) {
                          return (
                            <button
                              key={size}
                              type="button"
                              className={`pp-option${selected ? ' is-selected' : ''}`}
                              role="radio"
                              aria-checked={selected}
                              disabled={!available}
                              aria-disabled={!available}
                            >
                              {SIZE_PILL[size]}
                            </button>
                          );
                        }
                        return (
                          <Link
                            key={size}
                            to={`/shop/${match.id}`}
                            className="pp-option"
                            role="radio"
                            aria-checked={false}
                          >
                            {SIZE_PILL[size]}
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  {inStock ? (
                    <button type="button" className="pp-add" onClick={addToBag}>
                      {added ? 'Added to bag' : 'Add to bag'}
                    </button>
                  ) : (
                    <p className="pp-oos">This product is out of stock.</p>
                  )}
                </div>

                <ul className="pp-features">
                  <li>
                    <TruckIcon />
                    <span>Free expedited shipping</span>
                  </li>
                  <li>
                    <ShieldIcon />
                    <span>2 year squeak warranty</span>
                  </li>
                  <li>
                    <BoxIcon />
                    <span>60 day returns</span>
                  </li>
                </ul>
              </div>

              <div className="pp-tabs">
                <div className={`pp-tab${openTab === 'description' ? ' is-open' : ''}`}>
                  <button type="button" className="pp-tab-top" onClick={() => toggleTab('description')}>
                    <span>Description</span>
                    <span className="pp-tab-icon" aria-hidden="true" />
                  </button>
                  <div className="pp-tab-panel">
                    <div className="pp-tab-panel-inner">
                      <p>{longCopy}</p>
                    </div>
                  </div>
                </div>
                <div className={`pp-tab${openTab === 'delivery' ? ' is-open' : ''}`}>
                  <button type="button" className="pp-tab-top" onClick={() => toggleTab('delivery')}>
                    <span>Delivery &amp; Returns</span>
                    <span className="pp-tab-icon" aria-hidden="true" />
                  </button>
                  <div className="pp-tab-panel">
                    <div className="pp-tab-panel-inner">
                      <p>
                        Free expedited shipping on every duck. Send it back within 60 days if your
                        duck isn&apos;t quite right.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="pp-why">
        <div className="pp-inner">
          <div className="pp-why-grid">
            <div className="pp-why-copy">
              <div className="pp-why-copy-inner">
                <p className="home-best-kicker">Details</p>
                <h2 className="pp-heading">Why we made this duck</h2>
                <p className="pp-body">
                  Classic vinyl, a proper squeak, and a silhouette that reads from across the tub.
                  Made for bath time, desks, and shelves.
                </p>
                <a href="#buy" className="pp-btn">
                  <span className="text-slide">
                    <span data-label="Buy now">Buy now</span>
                  </span>
                </a>
              </div>
            </div>
            <div className="pp-why-gallery">
              {[0, 1, 2].map((slot) => (
                <div key={slot} className="pp-why-shot">
                  <DuckVisual color={duck.color} size={duck.size} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pp-fabric">
        <div className="pp-fabric-media" aria-hidden="true">
          <DuckVisual color={duck.color} size={duck.size} />
        </div>
        <div className="pp-fabric-copy">
          <p className="home-best-kicker">Our vinyl</p>
          <h2 className="pp-heading">Hand finished color in every duck</h2>
          <p className="pp-body">
            Made with a durable outer shell and a buoyant core, it is built to float and squeak.
          </p>
          <a href="#buy" className="home-story-link">
            <span>Buy yours now</span>
            <ArrowIcon />
          </a>
        </div>
      </section>

      <section className="pp-more">
        <div className="pp-inner pp-more-inner">
          <header className="pp-more-intro">
            <p className="home-best-kicker">More images</p>
            <h2 className="pp-heading">For ducks who mean business</h2>
          </header>
          <div className="pp-more-grid">
            {LIFESTYLE.slice(0, 3).map((src) => (
              <div
                key={src}
                className="pp-more-image"
                style={{ backgroundImage: `url(${src})` }}
              />
            ))}
          </div>
          <a href="#buy" className="pp-btn">
            <span className="text-slide">
              <span data-label="Buy now">Buy now</span>
            </span>
          </a>
        </div>
      </section>

      {related.length > 0 && (
        <section className="pp-related">
          <div className="pp-inner pp-related-inner">
            <header className="pp-related-intro">
              <div>
                <p className="home-best-kicker">Related</p>
                <h2 className="pp-heading">People also bought</h2>
              </div>
              <Link to="/shop" className="home-story-link">
                <span>Shop all</span>
                <ArrowIcon />
              </Link>
            </header>
            <div className="pp-related-grid">
              {related.map((item) => (
                <ProductCard key={item.id} duck={item} variant="related" />
              ))}
            </div>
          </div>
        </section>
      )}

      <TestimonialsSection />
      <SocialFollowSection />
    </main>
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

function TruckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M3 7h11v8H3zM14 10h4l3 3v2h-7zM7 18a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm10 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="m9 12 2 2 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function BoxIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4 8 12 4l8 4-8 4-8-4Zm0 0v8l8 4 8-4V8M12 12v8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
