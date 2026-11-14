import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Mail, Send } from "lucide-react";
import "./FooterSection.css";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { label: "Home", href: "#top" },
  { label: "Our Properties", href: "#properties" },
  { label: "Our Advantages", href: "#advantages" },
  { label: "Our Reviews", href: "#faq" },
];

const FOUNDER_IMAGE = "/media/founder.jpg";

function Avatar() {
  const [failed, setFailed] = useState(false);

  return failed ? (
    <span className="footer-avatar footer-avatar-fallback" aria-hidden="true">
      ET
    </span>
  ) : (
    <img
      className="footer-avatar"
      src={FOUNDER_IMAGE}
      alt="Ethan Thompson"
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

export default function FooterSection() {
  const rootRef = useRef(null);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          })
          .from(".footer-panel", { autoAlpha: 0, y: 60, duration: 1, ease: "power3.out" })
          // left column
          .from(
            ".footer-brand > *",
            { autoAlpha: 0, y: 16, duration: 0.7, ease: "power2.out", stagger: 0.1 },
            0.3
          )
          .from(
            ".footer-subscribe > *",
            { autoAlpha: 0, y: 16, duration: 0.7, ease: "power2.out", stagger: 0.08 },
            0.5
          )
          // middle column
          .from(
            ".footer-nav-title, .footer-nav a",
            { autoAlpha: 0, x: -14, duration: 0.6, ease: "power2.out", stagger: 0.08 },
            0.35
          )
          .from(
            ".footer-map",
            { clipPath: "inset(100% 0% 0% 0%)", duration: 1.1, ease: "power4.out" },
            0.55
          )
          .from(".footer-address", { autoAlpha: 0, y: 12, duration: 0.7, ease: "power2.out" }, 0.9)
          // right column
          .from(
            ".footer-founder, .footer-tagline, .footer-actions",
            { autoAlpha: 0, y: 16, duration: 0.7, ease: "power2.out", stagger: 0.1 },
            0.4
          )
          .from(".footer-legal > *", { autoAlpha: 0, y: 12, duration: 0.6, stagger: 0.08 }, 0.8);
      });

      return () => mm.revert();
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: send `email` to your newsletter service / API here
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="footer-section" id="footer" ref={rootRef}>
      <div className="footer-panel">
        <div className="footer-grid">
          {/* ---------- Column 1: brand + subscribe ---------- */}
          <div className="footer-col">
            <div className="footer-brand">
              <a className="footer-logo" href="#top" aria-label="Monte real estate, back to top">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M2 20 9 6l4 7 3-4 6 11z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="footer-logo-text">
                  <span className="footer-logo-name">MONTE</span>
                  <span className="footer-logo-caption">REAL ESTATE</span>
                </span>
              </a>
              <p className="footer-slogan">Building Your Dreams in Real Estate</p>
            </div>

            <div className="footer-subscribe">
              <h3>Subscribe to our news</h3>
              <p>
                Stay Informed and Never Miss a Beat. Subscribe to Our Exclusive News Updates.
              </p>

              <form className="footer-form" onSubmit={handleSubmit}>
                <label className="footer-sr" htmlFor="footer-email">
                  Email address
                </label>
                <input
                  id="footer-email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setSubscribed(false);
                  }}
                />
                <button className="footer-button" type="submit">
                  Subscribe
                </button>
              </form>

              <p className="footer-status" role="status">
                {subscribed ? "Thanks, you are subscribed." : ""}
              </p>
            </div>
          </div>

          {/* ---------- Column 2: navigation + map ---------- */}
          <div className="footer-col">
            <nav className="footer-nav" aria-label="Footer">
              <p className="footer-nav-title">Quick Navigation</p>
              {NAV_LINKS.map((link) => (
                <a href={link.href} key={link.label}>
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="footer-location">
              <a
                className="footer-map"
                href="https://maps.google.com/?q=Dubai+Marina,+Dubai"
                target="_blank"
                rel="noreferrer"
                aria-label="Open our location in maps"
              >
                <img src="/media/map.jpg" alt="Map of our office location in Dubai Marina" loading="lazy" />
                <span className="footer-pin" aria-hidden="true">
                  <MapPin size={12} strokeWidth={1.8} />
                </span>
              </a>

              <address className="footer-address">
                123 Zayed Road,
                <br />
                Dubai Marina,
                <br />
                Dubai, United Arab Emirates
              </address>
            </div>
          </div>

          {/* ---------- Column 3: founder + contact + legal ---------- */}
          <div className="footer-col">
            <div className="footer-contact">
              <div className="footer-founder">
                <Avatar />
                <span className="footer-founder-text">
                  <span className="footer-founder-role">Monte Founder</span>
                  <span className="footer-founder-name">Ethan Thompson</span>
                </span>
              </div>

              <p className="footer-tagline">We are here to change your future.</p>

              <div className="footer-actions">
                <a className="footer-button" href="#contact">
                  Contact Us
                </a>
                <a className="footer-icon-link" href="mailto:hello@monte.example" aria-label="Email us">
                  <Mail size={16} strokeWidth={1.6} />
                </a>
                <a
                  className="footer-icon-link"
                  href="https://t.me/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Message us on Telegram"
                >
                  <Send size={16} strokeWidth={1.6} />
                </a>
              </div>
            </div>

            <div className="footer-legal">
              <p>Copyright {new Date().getFullYear()} © Monte Real Estate</p>
              <p className="footer-legal-links">
                <a href="#terms">Terms Of Service</a>
                <a href="#privacy">Privacy Policy</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
