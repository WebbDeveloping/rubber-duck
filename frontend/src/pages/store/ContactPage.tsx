import { useEffect, useRef, useState } from 'react';
import { SocialFollowSection } from '../../components/store/SocialFollowSection';
import { ContactBannerScene, ContactDeskScene } from '../../components/store/hero/HomeScenes';

const FAQS_LEFT = [
  {
    question: 'When will you restock',
    answer:
      'As soon as the yellow one stops hiding behind the drain. Fresh ducks paddle in whenever the warehouse flock thins out, usually before your bathwater cools.',
  },
  {
    question: 'How to apply for the Ambassador Program',
    answer:
      'Send a photo of a duck in an unusual workplace. Desk, dashboard, or a very serious meeting. If we squeak with delight, you are in. Resume optional. Feathers encouraged.',
  },
  {
    question: 'Discount Codes & Promotions',
    answer:
      'The only code we honor is QUACK10, and even that one was invented by a duck in accounting. Watch the shop for bulk discounts that kick in once your flock gets large enough to need a bigger tub.',
  },
] as const;

const FAQS_RIGHT = [
  {
    question: 'What is your return policy',
    answer:
      'If your duck arrives looking less pleased with itself than advertised, send it home within 30 days. We ask that it is dry, unsqueaked-out, and not currently occupying a sink.',
  },
  {
    question: 'How do I return and/or exchange my order',
    answer:
      'Pack the duck in something softer than a cereal box, include a note about what went wrong (too yellow? not yellow enough?), and we will swap it for a duck with a better attitude.',
  },
  {
    question: 'When will my order ship',
    answer:
      'Most ducks leave the warehouse the next business day, unless they are in a meeting. International flocks take a little longer because customs has questions about the squeak.',
  },
] as const;

export function ContactPage() {
  const bannerRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [openFaqs, setOpenFaqs] = useState<string[]>([]);

  useEffect(() => {
    const el = bannerRef.current;
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

  function toggleFaq(question: string) {
    setOpenFaqs((current) =>
      current.includes(question)
        ? current.filter((item) => item !== question)
        : [...current, question],
    );
  }

  return (
    <main className="contact-page">
      <section className="contact-hero">
        <div className="contact-hero-grid">
          <div className="contact-hero-copy">
            <p className="home-best-kicker">Get in touch</p>
            <h1>Quack if you need us</h1>
          </div>
          <p className="contact-hero-body">
            We would love to hear from you! Whether you have a question about our ducks, a bulk
            bathtub order, or you just want to say hello to the founding duck, please do not
            hesitate to reach out.
          </p>
        </div>
      </section>

      <section ref={bannerRef} className="contact-banner" aria-hidden="true">
        <div
          className="contact-banner-bg"
          style={{
            transform: `translate3d(0, ${shift}%, 0) scale3d(${scale}, ${scale}, 1)`,
          }}
        >
          <ContactBannerScene />
        </div>
        <div className="contact-banner-overlay" />
      </section>

      <section className="contact-dual">
        <div className="contact-dual-inner">
          <div className="contact-form-card">
            <div className="contact-form-intro">
              <h2>
                Please fill out the
                <br />
                form below
              </h2>
              <p>
                Contact us today to learn more about wholesale ducks, bathtub diplomacy, or why the
                green one is staring.
              </p>
            </div>

            <form
              className="contact-form"
              onSubmit={(event) => event.preventDefault()}
              aria-label="Contact form"
            >
              <label className="contact-label" htmlFor="contact-name">
                Name
              </label>
              <input className="contact-field" id="contact-name" name="name" type="text" />

              <label className="contact-label" htmlFor="contact-email">
                Email Address
              </label>
              <input className="contact-field" id="contact-email" name="email" type="email" />

              <label className="contact-label" htmlFor="contact-message">
                Message
              </label>
              <textarea
                className="contact-field is-large"
                id="contact-message"
                name="message"
                placeholder="Tell us about your duck emergency"
                rows={6}
              />

              <button type="submit" className="hero-shop-btn hero-shop-btn--dark contact-submit">
                <span className="text-slide">
                  <span data-label="Submit">Submit</span>
                </span>
              </button>
            </form>
          </div>

          <div className="contact-form-media" aria-hidden="true">
            <ContactDeskScene />
          </div>
        </div>
      </section>

      <section className="contact-faq">
        <div className="contact-faq-intro">
          <p className="home-best-kicker">FAQ</p>
          <h2>Frequent questions</h2>
        </div>

        <div className="contact-faq-grid">
          <FaqColumn items={FAQS_LEFT} openFaqs={openFaqs} onToggle={toggleFaq} />
          <FaqColumn items={FAQS_RIGHT} openFaqs={openFaqs} onToggle={toggleFaq} />
        </div>
      </section>

      <SocialFollowSection />
    </main>
  );
}

function FaqColumn({
  items,
  openFaqs,
  onToggle,
}: {
  items: readonly { question: string; answer: string }[];
  openFaqs: string[];
  onToggle: (question: string) => void;
}) {
  return (
    <div className="contact-faq-list">
      {items.map((item) => {
        const open = openFaqs.includes(item.question);
        return (
          <div key={item.question} className={`contact-faq-item${open ? ' is-open' : ''}`}>
            <button
              type="button"
              className="contact-faq-top"
              aria-expanded={open}
              onClick={() => onToggle(item.question)}
            >
              <span>{item.question}</span>
              <span className="contact-faq-icon" aria-hidden="true" />
            </button>
            <div className="contact-faq-bottom">
              <div className="contact-faq-answer">
                <p>{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
