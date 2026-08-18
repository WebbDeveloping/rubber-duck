import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { HomeBanner } from '../../components/store/HomeBanner';
import { SocialFollowSection } from '../../components/store/SocialFollowSection';
import { TestimonialsSection } from '../../components/store/TestimonialsSection';
import { HeroBathScene, HeroShelfScene, HeroTubScene } from '../../components/store/hero/HeroScenes';
import {
  AboutFounderScene,
  AboutWorkshopScene,
  FeatureColorScene,
  ProductTogetherScene,
  StoryLeftScene,
  StoryRightScene,
} from '../../components/store/hero/HomeScenes';

const HERO_SCENES = [HeroTubScene, HeroShelfScene, HeroBathScene, FeatureColorScene] as const;

export function AboutPage() {
  const heroRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = heroRef.current;
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

  const shift = progress * 18;

  return (
    <main className="about-page">
      <section ref={heroRef} className="about-hero">
        <div className="about-hero-intro">
          <div className="about-hero-copy">
            <h1>Ducks for the tub, the desk, and the long soak</h1>
            <p>
              We are a small shop of people who believe a rubber duck can improve a Tuesday. Colors,
              sizes, and a squeak that is just loud enough to count.
            </p>
            <a href="#story" className="about-scroll" aria-label="Scroll to our story">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M6 9l6 6 6-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>

        <div
          className="about-hero-grid"
          style={{ transform: `translate3d(-${shift}%, 0, 0)` }}
          aria-hidden="true"
        >
          {HERO_SCENES.map((Scene, index) => (
            <div key={index} className="about-hero-shot">
              <div className="about-hero-shot-inner">
                <Scene />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="story" className="about-join">
        <div className="about-join-copy">
          <h2>Pull up a duck. Stay for the bubbles.</h2>
          <p>
            Our first duck arrived looking a little too pleased with itself. We made more. Then we
            made bigger ones, smaller ones, and a green one that stares. Now they live in tubs, on
            desks, and on shelves that used to hold books.
          </p>
          <Link to="/shop" className="hero-shop-btn hero-shop-btn--dark">
            <span className="text-slide">
              <span data-label="Shop now">Shop now</span>
            </span>
          </Link>
        </div>

        <div className="about-flying" aria-hidden="true">
          <div className="about-flying-item is-1">
            <StoryLeftScene />
          </div>
          <div className="about-flying-item is-2">
            <StoryRightScene />
          </div>
          <div className="about-flying-item is-3">
            <ProductTogetherScene />
          </div>
        </div>
      </section>

      <section className="about-split">
        <div className="about-split-media" aria-hidden="true">
          <AboutWorkshopScene />
        </div>
        <div className="about-split-copy">
          <p className="home-best-kicker">Our story</p>
          <div className="about-split-intro">
            <h2>
              Started from
              <br />
              the drain
            </h2>
            <p>
              We had one duck, a leaky tap, and an unreasonable amount of yellow. The squeaking got
              out of hand. Neighbors noticed. Then strangers noticed. We decided to keep going.
            </p>
          </div>
          <Link to="/shop" className="home-story-link">
            <span>Shop now</span>
            <ArrowIcon />
          </Link>
        </div>
      </section>

      <HomeBanner />

      <section className="about-split is-reverse">
        <div className="about-split-copy">
          <p className="home-best-kicker">Our founding duck</p>
          <div className="about-split-intro">
            <h2>Behind the beak</h2>
            <p>
              The first duck appointed itself manager. We let it. It has excellent posture, a reliable
              squeak, and no meetings. The rest of the catalog is just trying to keep up.
            </p>
          </div>
          <Link to="/shop" className="home-story-link">
            <span>Shop now</span>
            <ArrowIcon />
          </Link>
        </div>
        <div className="about-split-media" aria-hidden="true">
          <AboutFounderScene />
        </div>
      </section>

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
