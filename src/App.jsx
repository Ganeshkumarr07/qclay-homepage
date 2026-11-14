import React, { useEffect, useRef, useState } from "react";
import {
  Map, Menu, Heart, House, Globe2, Download, ArrowUpRight
} from "lucide-react";
import SolutionsSection from "./SolutionsSection";
import OwnershipSection from "./OwnershipSection";
import AdvantagesSection from "./AdvantagesSection";
import PropertyTypesSection from "./PropertyTypesSection";
import PartnersFaqSection from "./PartnersFaqSection";
import CtaSection from "./CtaSection";
import FooterSection from "./FooterSection";
const HERO_IMAGE =
  "/media/building.jpg";
const SCREEN_TWO_POSTER = "/media/screen-2-poster.jpg";
const SCREEN_TWO_VIDEO = "/media/vid1.mp4";

/* ---------- Animation helpers ---------- */
const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const clamp01 = (n) => Math.min(1, Math.max(0, n));
const smoothstep = (t) => t * t * (3 - 2 * t);

// --enter: 0 -> 1 while the section's top travels up the screen
// --leave: 0 -> 1 while its bottom travels out through the top
function setSectionVars(el) {
  if (!el) return;
  if (prefersReducedMotion()) {
    el.style.setProperty("--enter", "1");
    el.style.setProperty("--leave", "0");
    return;
  }
  const vh = window.innerHeight;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--enter", smoothstep(clamp01((vh - r.top) / (vh * 0.9))).toFixed(4));
  el.style.setProperty("--leave", smoothstep(clamp01((vh - r.bottom) / vh)).toFixed(4));
}

// true once the element enters the viewport (fires only once)
function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === "undefined" || prefersReducedMotion()) {
      setInView(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, inView];
}

// runs onFrame() on scroll/resize, throttled with requestAnimationFrame
function useScrollFrame(onFrame) {
  useEffect(() => {
    let raf = 0;
    const run = () => {
      raf = 0;
      onFrame();
    };
    const request = () => {
      if (!raf) raf = requestAnimationFrame(run);
    };
    run();
    window.addEventListener("scroll", request, { passive: true, capture: true });
    window.addEventListener("resize", request);
    return () => {
      window.removeEventListener("scroll", request, { capture: true });
      window.removeEventListener("resize", request);
      if (raf) cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

function CountUp({ to, suffix = "", start, duration = 3800, delay = 0 }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return undefined;
    if (prefersReducedMotion()) {
      setValue(to);
      return undefined;
    }
    let raf;
    let t0;
    const tick = (t) => {
      if (t0 === undefined) t0 = t;
      const p = Math.min((t - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic: steady climb, soft landing
      setValue(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    const timer = setTimeout(() => {
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [start, to, duration, delay]);

  return (
    <>
      {value}
      {suffix}
    </>
  );
}

function Brand() {
  return (
    <a className="brand" href="#top" aria-label="Monte home">
      <span className="brand-name">MONTE</span>
      <span className="brand-caption">REAL ESTATE</span>
    </a>
  );
}

function IconButton({ label, children, className = "" }) {
  return (
    <button className={`icon-button ${className}`} aria-label={label} type="button">
      {children}
    </button>
  );
}

const HERO_LINES = ["Real Estate in Dubai:", "Ideal for Living and", "Investing"];

function HeroSection() {
  const shellRef = useRef(null);

  // as you scroll away, hero eases back (scale + fade) -> feeds the next section's entrance
  useScrollFrame(() => {
    const el = shellRef.current;
    if (!el || prefersReducedMotion()) return;
    const h = clamp01(-el.getBoundingClientRect().top / window.innerHeight);
    el.style.setProperty("--h", h.toFixed(4));
  });

  return (
    <section className="hero-shell" id="top" ref={shellRef} aria-label="MONTE introduction">
      <section className="left-panel" aria-label="MONTE introduction">
        <header className="left-header">
          <Brand />
          <div className="left-tools">
            <IconButton label="Open map"><Map size={15} strokeWidth={1.5} /></IconButton>
            <IconButton label="Open menu"><Menu size={17} strokeWidth={1.5} /></IconButton>
          </div>
        </header>

        <div className="hero-copy">
          <p className="eyebrow">Building Your Dreams</p>
          <h1 aria-label={HERO_LINES.join(" ")}>
            {HERO_LINES.map((line, i) => (
              <span className="h1-line" aria-hidden="true" key={line}>
                <span style={{ "--i": i }}>{line}</span>
              </span>
            ))}
          </h1>
        </div>

        <footer className="left-footer">
          <button className="dark-pill" type="button" aria-label="Explore Monte">
            <span className="globe-wrap"><Globe2 size={13} strokeWidth={1.6} /></span>
            Contact us now
          </button>

          <a className="explore-link" href="#properties">
            <span>Explore All<br />Our Properties</span>
            <span className="explore-thumb">
              <img src={HERO_IMAGE} alt="" />
              <ArrowUpRight size={11} />
            </span>
          </a>
        </footer>
      </section>

      <section className="visual-panel" aria-label="Dubai property image">
        <img className="hero-image" src={HERO_IMAGE} alt="Burj Al Arab beside the beach in Dubai" />
        <div className="image-shade" />

        <div className="image-topline">
          <p>More than 1500 real<br />estate properties</p>
          <p>From $145,000 with a<br />yield of 10% per annum</p>
          <div className="image-actions">
            <IconButton label="Add to favourites" className="glass-button">
              <Heart size={16} strokeWidth={1.6} />
            </IconButton>
            <IconButton label="Home" className="home-button">
              <House size={15} strokeWidth={1.7} />
            </IconButton>
          </div>
        </div>

        <button className="catalog-button" type="button">
          <span>catalog<br />download</span>
          <span className="download-icon"><Download size={14} strokeWidth={1.6} /></span>
        </button>
      </section>
    </section>
  );
}

function VideoSection() {
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const sectionRef = useRef(null);

  // scroll-linked grow: small card -> full-screen video while the section is pinned
  useScrollFrame(() => {
    const el = sectionRef.current;
    if (!el) return;
    setSectionVars(el);
    if (prefersReducedMotion()) {
      el.style.setProperty("--p", "1");
      return;
    }
    const vh = window.innerHeight;
    const rect = el.getBoundingClientRect();
    const pinRange = Math.max(rect.height - vh, 1);
    const lead = vh * 0.35; // start growing a little before it pins
    const p = clamp01((lead - rect.top) / (lead + pinRange * 0.75));
    el.style.setProperty("--p", smoothstep(p).toFixed(4));
  });

  return (
    <section
      className="video-section"
      id="dubai-video"
      ref={sectionRef}
      aria-label="Dubai property investment video"
    >
      <div className="video-sticky">
        <div className="video-stage">
          <img
            className={`video-poster ${videoReady ? "is-hidden" : ""}`}
            src={SCREEN_TWO_POSTER}
            alt="Dubai skyline waterfront — temporary poster from the supplied Screen 2 screenshot"
          />
          <video
            className={`dubai-video ${videoReady ? "is-ready" : ""}`}
            src={SCREEN_TWO_VIDEO}
            poster={SCREEN_TWO_POSTER}
            muted
            loop
            autoPlay
            playsInline
            preload="metadata"
            controls={videoReady}
            aria-label="Dubai skyline promotional video"
            onCanPlay={() => {
              setVideoReady(true);
              setVideoFailed(false);
            }}
            onError={() => {
              setVideoReady(false);
              setVideoFailed(true);
            }}
          />
          <div className="video-tint" />

          <div className="finance-marquee" aria-label="Initial payment from 25,000 dollars, interest-free">
            <div className="marquee-track" aria-hidden="true">
              {Array.from({ length: 4 }, (_, index) => (
                <span className="marquee-copy" key={index}>
                  With an initial payment from $25,000 <i /> interest-free <i />
                </span>
              ))}
            </div>
            <span className="sr-only">With an initial payment from $25,000, interest-free.</span>
          </div>

          {!videoReady && (
            <div className="video-placeholder-note" role="status">
              {videoFailed ? "Video placeholder · add the original video to public/media" : "Video preview placeholder"}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}


const PORTFOLIO_CARDS = [
  {
    title: "Azure Heights Luxury Residences",
    image: "/media/building3.jpg",
    tags: ["Sea View", "2–4 Bedrooms", "From $320K", "Ready 2027"],
    alt: "Dubai residential skyscrapers",
    className: "portfolio-card-towers",
  },
  {
    title: "Azure Heights Luxury Residences",
    image: "/media/interior.jpg",
    tags: ["Fully Furnished", "1–3 Bedrooms", "From $180K", "Ready Now"],
    alt: "Luxury apartment interior overlooking Dubai",
    className: "portfolio-card-interior",
  },
  {
    title: "Azure Heights Luxury Residences",
    image: "/media/building4.jpg",
    tags: ["Downtown", "2–5 Bedrooms", "From $410K", "Off-Plan"],
    alt: "Modern Dubai residential towers",
    className: "portfolio-card-residence",
  },
  {
    title: "Azure Heights Luxury Residences",
    image: "/media/building6.jpg",
    tags: ["Marina", "1–2 Bedrooms", "From $210K", "Ready 2026"],
    alt: "Modern Dubai residential towers",
    className: "portfolio-card-residence",
  },
  {
    title: "Azure Heights Luxury Residences",
    image: "/media/interior6.jpg",
    tags: ["Penthouse", "3–5 Bedrooms", "From $890K", "Limited"],
    alt: "Modern Dubai residential towers",
    className: "portfolio-card-residence",
  },
];

function PortfolioCard({ title, image, alt, tags = [], index = 0, className = "" }) {
  return (
    <a
      className={`portfolio-card ${className}`}
      style={{ "--i": index }}
      href="#properties"
      aria-label={`Explore ${title}`}
    >
      <img src={image} alt={alt} loading="lazy" />
      <span className="portfolio-card-shade" />
      <span className="portfolio-card-title">{title}</span>
      {tags.length > 0 && (
        <span className="portfolio-card-tags" aria-hidden="true">
          {tags.map((tag, i) => (
            <span className="portfolio-tag" style={{ "--t": i }} key={tag}>
              {tag}
            </span>
          ))}
        </span>
      )}
      <span className="portfolio-card-arrow" aria-hidden="true">
        <ArrowUpRight size={15} strokeWidth={1.6} />
      </span>
    </a>
  );
}

function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState("Apartments");
  const [panelRef, panelIn] = useInView(0.12);
  const sectionRef = useRef(null);
  useScrollFrame(() => setSectionVars(sectionRef.current));

  return (
    <section className="portfolio-section" id="properties" ref={sectionRef} aria-labelledby="portfolio-heading">
      <div className={`portfolio-panel ${panelIn ? "is-in" : ""}`} ref={panelRef}>
        <header className="portfolio-header">
          <h2 id="portfolio-heading">Explore Our Property Portfolio</h2>
          <div className="portfolio-tabs" role="group" aria-label="Property category">
            {["Apartments", "Villas", "For Rent"].map((category) => (
              <button
                type="button"
                key={category}
                className={`portfolio-tab ${activeCategory === category ? "is-active" : ""}`}
                aria-pressed={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </header>

        <div className="portfolio-grid">
          <PortfolioCard {...PORTFOLIO_CARDS[0]} index={0} />
          <PortfolioCard {...PORTFOLIO_CARDS[1]} index={1} />
          <PortfolioCard {...PORTFOLIO_CARDS[2]} index={2} />
           <PortfolioCard {...PORTFOLIO_CARDS[3]} index={3} />
            <PortfolioCard {...PORTFOLIO_CARDS[4]} index={4} />
          <a className="portfolio-card portfolio-map-card" style={{ "--i": 5 }} href="#contact" aria-label="Find properties on the map">
            <img src="/media/map.jpg" alt="Map showing Dubai property locations" loading="lazy" />
            <span className="map-label">Find On The Map</span>
            <span className="portfolio-card-arrow" aria-hidden="true">
              <ArrowUpRight size={15} strokeWidth={1.6} />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}


const SCREEN_FIVE_ARCHITECTURE = "/media/screen-5-architecture-reference.jpg";
const SCREEN_FIVE_TEAM = "/media/screen-5-team-reference.jpg";

const STATS = [
  { to: 43, suffix: "+", label: ["Successful", "Transactions Monthly"] },
  { to: 42, suffix: "%", label: ["Customer", "Satisfaction Rate"] },
  { to: 500, suffix: "", label: ["Exclusive Properties", "Available For Your Selection"] },
];

function AboutStatisticsSection() {
  const [layoutRef, inView] = useInView(0.25);   // reveal text / image
  const [statsRef, statsInView] = useInView(0.6);  // count only when numbers are clearly on screen
  const sectionRef = useRef(null);
  useScrollFrame(() => setSectionVars(sectionRef.current));

  return (
    <section className="about-statistics-section" id="about" ref={sectionRef} aria-labelledby="about-heading">
      <div className={`about-layout ${inView ? "is-in" : ""}`} ref={layoutRef}>
        <div className="about-information">
          <p className="about-description">
            At Monte, we offer more than just real estate services; we provide an unparalleled
            experience tailored to meet your needs and exceed your expectations.
          </p>

          <div className="team-preview">
            <img src={SCREEN_FIVE_TEAM} alt="Professional team portrait preview" loading="lazy" />
            <span>Meet Our<br />Professional Team</span>
          </div>

          <div className="statistics-list" ref={statsRef} aria-label="Company statistics">
            {STATS.map((stat, i) => (
              <div className="statistic-row" style={{ "--i": i }} key={stat.label[0]}>
                <strong aria-label={`${stat.to}${stat.suffix}`}>
                  <CountUp
                    to={stat.to}
                    suffix={stat.suffix}
                    start={statsInView}
                    delay={500 + i * 250}
                    duration={3600 + i * 700}
                  />
                </strong>
                <span>
                  {stat.label[0]}
                  <br />
                  {stat.label[1]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="about-visual">
          <img
            src={SCREEN_FIVE_ARCHITECTURE}
            alt="Architectural arch framing the Dubai skyline and waterfront"
            loading="lazy"
          />
          <a className="about-contact-button" href="#contact">
            <span className="contact-globe"><Globe2 size={12} /></span>
            Contact Us Now
          </a>
          <a className="consultation-card" href="#contact">
            <span className="consultation-avatar" aria-hidden="true">
              <House size={15} />
            </span>
            <span>Get The Consultation<br />With Our Expert</span>
            <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <>
    <main className="site-flow">
      <HeroSection />
      <VideoSection />
      <PortfolioSection />
      <AboutStatisticsSection />
       <SolutionsSection />
           <OwnershipSection />
           <AdvantagesSection />
            <PropertyTypesSection />
            <PartnersFaqSection  />
            <CtaSection  />
    </main>
    <FooterSection  />
    </>
  );
}
