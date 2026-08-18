import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { BannerScene } from './hero/HomeScenes';

const HEADING = 'Stock the Tub with Classic Rubber Ducks';
const COPIES = 3;

export function HomeBanner() {
  const ref = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;

    function update() {
      frame = 0;
      if (motion.matches) {
        setProgress(0);
        return;
      }
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const span = window.innerHeight + rect.height;
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

  const scale = 1.08 + progress * 0.04;
  const shift = -progress * 8;

  return (
    <section ref={ref} className="home-banner" aria-label="Shop the collection">
      <div className="home-banner-stack">
        <div className="home-banner-marquee" aria-hidden="true">
          <div className="home-banner-track">
            {Array.from({ length: COPIES }, (_, index) => (
              <p key={index} className="home-banner-heading">
                {HEADING}
              </p>
            ))}
          </div>
        </div>

        <div className="home-banner-intro">
          <p>
            Our ducks are made for the tub, the desk, or the shelf — colors, sizes, and a proper
            squeak.
          </p>
          <Link to="/shop" className="hero-shop-btn">
            <span className="text-slide">
              <span data-label="Shop all ducks">Shop all ducks</span>
            </span>
          </Link>
        </div>
      </div>

      <div className="home-banner-media" aria-hidden="true">
        <div
          className="home-banner-bg"
          style={{
            transform: `translate3d(0, ${shift}%, 0) scale3d(${scale}, ${scale}, 1)`,
          }}
        >
          <BannerScene />
        </div>
        <div className="home-banner-overlay" />
      </div>
    </section>
  );
}
