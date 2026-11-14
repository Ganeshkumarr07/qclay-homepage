import React, { useState } from "react";
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

function HeroSection() {
  return (
    <section className="hero-shell" id="top" aria-label="MONTE introduction">
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
          <h1>Real Estate in Dubai:<br />Ideal for Living and<br />Investing</h1>
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

  return (
    <section className="video-section" id="dubai-video" aria-label="Dubai property investment video">
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
    </section>
  );
}


const PORTFOLIO_CARDS = [
  {
    title: "Azure Heights Luxury Residences",
    image: "/media/building3.jpg",
    alt: "Dubai residential skyscrapers",
    className: "portfolio-card-towers",
  },
  {
    title: "Azure Heights Luxury Residences",
    image: "/media/interior.jpg",
    alt: "Luxury apartment interior overlooking Dubai",
    className: "portfolio-card-interior",
  },
  {
    title: "Azure Heights Luxury Residences",
    image: "/media/building4.jpg",
    alt: "Modern Dubai residential towers",
    className: "portfolio-card-residence",
  },
  {
    title: "Azure Heights Luxury Residences",
    image: "/media/building6.jpg",
    alt: "Modern Dubai residential towers",
    className: "portfolio-card-residence",
  },
  {
    title: "Azure Heights Luxury Residences",
    image: "/media/interior6.jpg",
    alt: "Modern Dubai residential towers",
    className: "portfolio-card-residence",
  },
];

function PortfolioCard({ title, image, alt, className = "" }) {
  return (
    <a className={`portfolio-card ${className}`} href="#properties" aria-label={`Explore ${title}`}>
      <img src={image} alt={alt} loading="lazy" />
      <span className="portfolio-card-shade" />
      <span className="portfolio-card-title">{title}</span>
      <span className="portfolio-card-arrow" aria-hidden="true">
        <ArrowUpRight size={15} strokeWidth={1.6} />
      </span>
    </a>
  );
}

function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState("Apartments");

  return (
    <section className="portfolio-section" id="properties" aria-labelledby="portfolio-heading">
      <div className="portfolio-panel">
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
          <PortfolioCard {...PORTFOLIO_CARDS[0]} />
          <PortfolioCard {...PORTFOLIO_CARDS[1]} />
          <PortfolioCard {...PORTFOLIO_CARDS[2]} />
           <PortfolioCard {...PORTFOLIO_CARDS[3]} />
            <PortfolioCard {...PORTFOLIO_CARDS[4]} />
          <a className="portfolio-card portfolio-map-card" href="#contact" aria-label="Find properties on the map">
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

function AboutStatisticsSection() {
  return (
    <section className="about-statistics-section" id="about" aria-labelledby="about-heading">
      <div className="about-layout">
        <div className="about-information">
          <p className="about-description">
            At Monte, we offer more than just real estate services; we provide an unparalleled
            experience tailored to meet your needs and exceed your expectations.
          </p>

          <div className="team-preview">
            <img src={SCREEN_FIVE_TEAM} alt="Professional team portrait preview" loading="lazy" />
            <span>Meet Our<br />Professional Team</span>
          </div>

          <div className="statistics-list" aria-label="Company statistics">
            <div className="statistic-row">
              <strong>43+</strong>
              <span>Successful<br />Transactions Monthly</span>
            </div>
            <div className="statistic-row">
              <strong>42%</strong>
              <span>Customer<br />Satisfaction Rate</span>
            </div>
            <div className="statistic-row">
              <strong>500</strong>
              <span>Exclusive Properties<br />Available For Your Selection</span>
            </div>
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
