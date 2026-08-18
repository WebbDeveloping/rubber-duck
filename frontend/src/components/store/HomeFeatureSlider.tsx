import { useEffect, useState, type ComponentType } from 'react';
import { Link } from 'react-router-dom';
import {
  FeatureClassicScene,
  FeatureColorScene,
  FeatureSizeScene,
  FeatureTubScene,
} from './hero/HomeScenes';

const SLIDES: { heading: string; Scene: ComponentType }[] = [
  { heading: 'Ducks in every color', Scene: FeatureColorScene },
  { heading: 'Pick a size, pick a color', Scene: FeatureSizeScene },
  { heading: 'Made for the tub', Scene: FeatureTubScene },
  { heading: 'Simple, squeaky, classic', Scene: FeatureClassicScene },
];

const TRACK = [SLIDES[SLIDES.length - 1], ...SLIDES, SLIDES[0]];

const LAST = SLIDES.length;

export function HomeFeatureSlider() {
  const [index, setIndex] = useState(1);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const realIndex = (index - 1 + SLIDES.length) % SLIDES.length;

  function go(next: number) {
    setIndex((current) => {
      if (current === 0 || current === LAST + 1) return current;
      return next;
    });
  }

  function snapIfClone() {
    if (index === 0) {
      setAnimate(false);
      setIndex(LAST);
    } else if (index === LAST + 1) {
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
    if (paused) return undefined;
    const timer = window.setInterval(() => {
      setIndex((current) => {
        if (current >= LAST + 1) return current;
        return current + 1;
      });
    }, 5000);
    return () => window.clearInterval(timer);
  }, [paused]);

  useEffect(() => {
    if (index !== 0 && index !== LAST + 1) return undefined;
    const timer = window.setTimeout(() => {
      setAnimate(false);
      setIndex(index === 0 ? LAST : 1);
    }, 750);
    return () => window.clearTimeout(timer);
  }, [index]);

  return (
    <section
      className="home-feature"
      aria-label="Featured looks"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className={`home-feature-track${animate ? '' : ' is-instant'}`}
        style={{
          transform: `translateX(calc(50vw - (var(--feature-slide) / 2) - ${index} * (var(--feature-slide) + var(--feature-gap))))`,
        }}
        onTransitionEnd={(event) => {
          if (event.target !== event.currentTarget) return;
          if (event.propertyName !== 'transform') return;
          snapIfClone();
        }}
      >
        {TRACK.map((slide, i) => (
          <article
            key={`${slide.heading}-${i}`}
            className="home-feature-slide"
            aria-hidden={i !== index}
          >
            <div className="home-feature-bg">
              <slide.Scene />
              <div className="home-feature-overlay" />
            </div>
            <div className="home-feature-copy">
              <h2>{slide.heading}</h2>
              <Link
                to="/shop"
                className="home-story-link is-light"
                tabIndex={i === index ? 0 : -1}
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
        ))}
      </div>

      <div className="home-feature-controls">
        <button
          type="button"
          className="home-feature-arrow"
          aria-label="Previous slide"
          onClick={() => go(index - 1)}
        >
          <Arrow direction="left" />
        </button>
        <button
          type="button"
          className="home-feature-arrow is-right"
          aria-label="Next slide"
          onClick={() => go(index + 1)}
        >
          <Arrow direction="right" />
        </button>
        <div className="home-feature-dots" role="tablist" aria-label="Slides">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.heading}
              type="button"
              role="tab"
              aria-label={`Show slide ${i + 1} of ${SLIDES.length}`}
              aria-selected={i === realIndex}
              className={`home-feature-dot${i === realIndex ? ' is-active' : ''}`}
              onClick={() => go(i + 1)}
            />
          ))}
        </div>
      </div>
    </section>
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
