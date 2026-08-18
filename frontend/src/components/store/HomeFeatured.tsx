import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDucks } from '../../hooks/useDucks';
import { sizeLabel } from '../../lib/format';
import type { Duck } from '../../types/duck';
import { DuckVisual } from '../shared/DuckVisual';

const MAX_FEATURED = 2;

export function HomeFeatured() {
  const { ducks, status, error } = useDucks();
  const featured = useMemo(() => ducks.slice(0, MAX_FEATURED), [ducks]);

  return (
    <section className="home-featured" aria-label="Featured products">
      <div className="home-featured-inner">
        <header className="home-featured-intro">
          <p className="home-best-kicker">Featured</p>
          <h2 className="home-best-heading">Look inside our Most selected products</h2>
        </header>

        {status === 'loading' && <p className="home-best-status">Loading ducks…</p>}

        {status === 'error' && (
          <p className="home-best-status">{error ?? 'Could not load products.'}</p>
        )}

        {status === 'ready' && featured.length === 0 && (
          <p className="home-best-status">
            No ducks in stock yet. <Link to="/shop">Visit the shop</Link>
          </p>
        )}

        {status === 'ready' && featured.length > 0 && (
          <div className="home-featured-list">
            {featured.map((duck) => (
              <FeaturedRow key={duck.id} duck={duck} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function FeaturedRow({ duck }: { duck: Duck }) {
  const ref = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const compact = window.matchMedia('(max-width: 991px)');

    let frame = 0;

    function update() {
      frame = 0;
      if (motion.matches || compact.matches) {
        setProgress(0);
        return;
      }
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const span = window.innerHeight + rect.height * 0.35;
      const next = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / span));
      setProgress(next);
    }

    function onScroll() {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    }

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <article ref={ref} className="home-featured-row">
      <div className="home-featured-copy">
        <div className="home-featured-copy-text">
          <h3>{duck.color} rubber duck</h3>
          <p>
            The {duck.color.toLowerCase()} {sizeLabel(duck.size).toLowerCase()} rubber duck is a
            classic for the tub, the desk, or the shelf.
          </p>
        </div>
        <Link to={`/shop/${duck.id}`} className="home-story-link">
          <span>View full product</span>
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

      <div className="home-featured-photo">
        <DuckVisual color={duck.color} size={duck.size} />
      </div>
      <div
        className="home-featured-photo is-2"
        style={{ transform: `translate3d(0, ${-progress * 10}vw, 0)` }}
      >
        <DuckVisual color={duck.color} size={duck.size} />
      </div>
      <div
        className="home-featured-photo is-3"
        style={{ transform: `translate3d(0, ${-progress * 20}vw, 0)` }}
      >
        <DuckVisual color={duck.color} size={duck.size} />
      </div>
    </article>
  );
}
