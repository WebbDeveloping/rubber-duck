import { useEffect, useState } from 'react';
import { QUOTES } from '../../lib/storeContent';

export function TestimonialsSection() {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setQuoteIndex((current) => (current + 1) % QUOTES.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="pp-quotes" aria-label="Testimonials">
      <div className="pp-quotes-track">
        {QUOTES.map((item, index) => {
          const active = index === quoteIndex;
          return (
            <blockquote
              key={item.name}
              className={`pp-quote${active ? ' is-active' : ''}`}
              aria-hidden={!active}
            >
              <p>“{item.quote}”</p>
              <cite>{item.name}</cite>
            </blockquote>
          );
        })}
      </div>
      <div className="pp-quote-dots">
        {QUOTES.map((item, index) => (
          <button
            key={item.name}
            type="button"
            className={`pp-quote-dot${index === quoteIndex ? ' is-active' : ''}`}
            aria-label={`Show quote ${index + 1}`}
            onClick={() => setQuoteIndex(index)}
          />
        ))}
      </div>
    </section>
  );
}
