import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDucks } from '../../hooks/useDucks';
import type { Duck } from '../../types/duck';
import { ProductCard } from './ProductCard';

const MAX_PRODUCTS = 5;

export function HomeBestSelling() {
  const { ducks, status, error } = useDucks();
  const products = useMemo(() => ducks.slice(0, MAX_PRODUCTS), [ducks]);
  const last = products.length;
  const track = last > 0 ? [products[last - 1], ...products, products[0]] : [];

  const [index, setIndex] = useState(1);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    setIndex(1);
    setAnimate(true);
  }, [last]);

  function go(next: number) {
    setIndex((current) => {
      if (current === 0 || current === last + 1) return current;
      return next;
    });
  }

  function snapIfClone() {
    if (index === 0) {
      setAnimate(false);
      setIndex(last);
    } else if (index === last + 1) {
      setAnimate(false);
      setIndex(1);
    }
  }

  useEffect(() => {
    if (animate) return undefined;
    const frame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setAnimate(true));
    });
    return () => window.cancelAnimationFrame(frame);
  }, [animate]);

  useEffect(() => {
    if (paused || last < 2) return undefined;
    const timer = window.setInterval(() => {
      setIndex((current) => {
        if (current >= last + 1) return current;
        return current + 1;
      });
    }, 5000);
    return () => window.clearInterval(timer);
  }, [paused, last]);

  useEffect(() => {
    if (index !== 0 && index !== last + 1) return undefined;
    const timer = window.setTimeout(() => {
      setAnimate(false);
      setIndex(index === 0 ? last : 1);
    }, 650);
    return () => window.clearTimeout(timer);
  }, [index, last]);

  return (
    <section className="home-best" aria-label="Best selling">
      <div className="home-best-inner">
        <header className="home-best-intro">
          <p className="home-best-kicker">Popular</p>
          <h2 className="home-best-heading">Best selling</h2>
          <p className="home-best-body">A few of our most-loved ducks, ready to take home.</p>
        </header>

        {status === 'loading' && <p className="home-best-status">Loading ducks…</p>}

        {status === 'error' && (
          <p className="home-best-status">{error ?? 'Could not load products.'}</p>
        )}

        {status === 'ready' && last === 0 && (
          <p className="home-best-status">
            No ducks in stock yet.{' '}
            <Link to="/shop">Visit the shop</Link>
          </p>
        )}

        {status === 'ready' && last > 0 && (
          <div
            className="home-best-slider"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div
              className={`home-best-track${animate ? '' : ' is-instant'}`}
              style={{
                transform: `translateX(calc((var(--best-row) / 2) - (var(--best-card) / 2) - ${index} * var(--best-card)))`,
              }}
              onTransitionEnd={(event) => {
                if (event.target !== event.currentTarget) return;
                if (event.propertyName !== 'transform') return;
                snapIfClone();
              }}
            >
              {track.map((duck, i) => (
                <ProductSlide
                  key={`${duck.id}-${i}`}
                  duck={duck}
                  hidden={i !== index}
                />
              ))}
            </div>

            {last > 1 && (
              <div className="home-best-controls">
                <button
                  type="button"
                  className="home-best-arrow"
                  aria-label="Previous product"
                  onClick={() => go(index - 1)}
                >
                  <Arrow direction="left" />
                </button>
                <button
                  type="button"
                  className="home-best-arrow is-right"
                  aria-label="Next product"
                  onClick={() => go(index + 1)}
                >
                  <Arrow direction="right" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function ProductSlide({ duck, hidden }: { duck: Duck; hidden: boolean }) {
  return (
    <article className="home-best-slide" aria-hidden={hidden}>
      <ProductCard duck={duck} tabIndex={hidden ? -1 : 0} />
    </article>
  );
}

function Arrow({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {direction === 'left' ? (
        <path
          d="M15.5 5.5 8.5 12l7 6.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M8.5 5.5 15.5 12l-7 6.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}
