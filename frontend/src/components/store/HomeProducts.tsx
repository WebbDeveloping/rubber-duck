import { useEffect, useMemo, useState, type ComponentType } from 'react';
import { Link } from 'react-router-dom';
import { useDucks } from '../../hooks/useDucks';
import { ProductCard } from './ProductCard';
import { ProductFloatScene, ProductShelfScene, ProductTogetherScene } from './hero/HomeScenes';

const SLIDES: { heading: string; Scene: ComponentType }[] = [
  { heading: 'Rubber ducks, ready to float', Scene: ProductFloatScene },
  { heading: 'Colors and sizes for every shelf', Scene: ProductShelfScene },
  { heading: 'Where duck lovers belong', Scene: ProductTogetherScene },
];

const MAX_PRODUCTS = 4;

export function HomeProducts() {
  const { ducks, status, error } = useDucks();
  const products = useMemo(() => ducks.slice(0, MAX_PRODUCTS), [ducks]);
  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <section className="home-products" aria-label="Featured products">
      <div className="home-products-grid">
        <div className="home-products-media">
          <div className="home-products-slider" aria-label="Featured looks">
            {SLIDES.map((slide, i) => {
              const active = i === index && ready;
              return (
                <article
                  key={slide.heading}
                  className={`home-products-slide${active ? ' is-active' : ''}`}
                  aria-hidden={!active}
                >
                  <div className="home-products-bg-wrap">
                    <div className="home-products-bg">
                      <slide.Scene />
                      <div className="home-products-overlay" />
                    </div>
                  </div>
                  <div className="home-products-copy">
                    <h2>{slide.heading}</h2>
                    <Link
                      to="/shop"
                      className="home-story-link is-light"
                      tabIndex={active ? 0 : -1}
                    >
                      <span>Shop all</span>
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
                    </Link>
                  </div>
                </article>
              );
            })}

            <div className="home-products-dots" role="tablist" aria-label="Slides">
              {SLIDES.map((slide, i) => (
                <button
                  key={slide.heading}
                  type="button"
                  role="tab"
                  aria-label={`Show slide ${i + 1} of ${SLIDES.length}`}
                  aria-selected={i === index}
                  className={`home-products-dot${i === index ? ' is-active' : ''}`}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="home-products-list">
          {status === 'loading' && <p className="home-best-status">Loading ducks…</p>}

          {status === 'error' && (
            <p className="home-best-status">{error ?? 'Could not load products.'}</p>
          )}

          {status === 'ready' && products.length === 0 && (
            <p className="home-best-status">
              No ducks in stock yet. <Link to="/shop">Visit the shop</Link>
            </p>
          )}

          {status === 'ready' &&
            products.map((duck) => (
              <ProductCard key={duck.id} duck={duck} imageClassName="home-products-thumb" />
            ))}
        </div>
      </div>
    </section>
  );
}
