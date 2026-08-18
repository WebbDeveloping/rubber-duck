import { useEffect, useState, type ComponentType } from 'react';
import { Link } from 'react-router-dom';
import { HeroBathScene, HeroShelfScene, HeroTubScene } from './hero/HeroScenes';

const SLIDES: { heading: string; Scene: ComponentType }[] = [
  { heading: 'Rubber ducks for every tub', Scene: HeroTubScene },
  { heading: 'High-quality rubber ducks, available now', Scene: HeroShelfScene },
  { heading: 'A classic for bath time', Scene: HeroBathScene },
];

function ArrowIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="hero-slider-arrow-icon">
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

export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState(false);

  function goTo(next: number) {
    setIndex((next + SLIDES.length) % SLIDES.length);
  }

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === 'ArrowLeft') {
        setIndex((current) => (current - 1 + SLIDES.length) % SLIDES.length);
      }
      if (event.key === 'ArrowRight') {
        setIndex((current) => (current + 1) % SLIDES.length);
      }
    }

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <section className="hero-slider" aria-label="Featured collections">
      <div className="hero-slider-track">
        {SLIDES.map((slide, i) => {
          const active = i === index;
          return (
            <article
              key={slide.heading}
              className={`hero-slide${active && ready ? ' is-active' : ''}`}
              aria-hidden={!active}
            >
              <div className="hero-slide-bg-wrap">
                <div className="hero-slide-bg">
                  <slide.Scene />
                  <div className="hero-slide-overlay" />
                </div>
              </div>
              <div className="hero-slide-intro">
                <h1 className="hero-slide-heading">{slide.heading}</h1>
                <Link to="/shop" className="hero-shop-btn" tabIndex={active ? 0 : -1}>
                  <span className="text-slide">
                    <span data-label="Shop All">Shop All</span>
                  </span>
                </Link>
              </div>
            </article>
          );
        })}
      </div>

      <button
        type="button"
        className="hero-slider-arrow"
        aria-label="Previous slide"
        onClick={() => goTo(index - 1)}
      >
        <ArrowIcon direction="left" />
      </button>
      <button
        type="button"
        className="hero-slider-arrow is-right"
        aria-label="Next slide"
        onClick={() => goTo(index + 1)}
      >
        <ArrowIcon direction="right" />
      </button>

      <div className="hero-slider-dots" role="tablist" aria-label="Slides">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.heading}
            type="button"
            role="tab"
            aria-label={`Show slide ${i + 1} of ${SLIDES.length}`}
            aria-selected={i === index}
            className={`hero-slider-dot${i === index ? ' is-active' : ''}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </section>
  );
}
