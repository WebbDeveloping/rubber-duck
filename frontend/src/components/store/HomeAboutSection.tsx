import { Link } from 'react-router-dom';
import { StoryLeftScene, StoryRightScene } from './hero/HomeScenes';

export function HomeAboutSection() {
  return (
    <section className="home-story">
      <div className="home-story-grid">
        <div className="home-story-image home-story-image--left">
          <div className="home-story-photo" aria-hidden="true">
            <StoryLeftScene />
          </div>
        </div>

        <div className="home-story-copy">
          <h2 className="home-story-heading">
            A simple rubber duck store
          </h2>
          <p className="home-story-body">
            We sell rubber ducks. Colors, sizes, and a proper squeak. Learn more about the shop and
            how we started sending ducks out into the world.
          </p>
          <div className="home-story-actions">
            <Link to="/shop" className="hero-shop-btn hero-shop-btn--dark">
              <span className="text-slide">
                <span data-label="Shop All">Shop All</span>
              </span>
            </Link>
            <Link to="/about" className="home-story-link">
              <span>Our story</span>
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
        </div>

        <div className="home-story-image home-story-image--right">
          <div className="home-story-photo is-right" aria-hidden="true">
            <StoryRightScene />
          </div>
        </div>
      </div>
    </section>
  );
}
