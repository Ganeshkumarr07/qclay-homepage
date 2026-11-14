import React, { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Download, House, Search } from "lucide-react";
import "./PropertyTypesSection.css";

gsap.registerPlugin(ScrollTrigger);

/*
  5 columns, each with its own start offset (top) and its own tiles.
  Put the images in public/media/types/ (or change the paths below).
  ratio = tile shape (width / height), copied from the reference.
*/
const COLUMNS = [
  {
    top: "52svh",
    tiles: [
      { name: "Luxury Villas", image: "/media/types/luxury-villas.jpg", ratio: "1 / 1" },
      { name: "Commercial Spaces", image: "/media/types/commercial-spaces.jpg", ratio: "2 / 3" },
    ],
  },
  {
    top: "28svh",
    tiles: [
      { name: "Penthouse Suites", image: "/media/types/penthouse-suites.jpg", ratio: "2 / 3" },
      { name: "Townhouses", image: "/media/types/townhouses.jpg", ratio: "2 / 3" },
      { name: "Investment", image: "/media/types/investment.jpg", ratio: "1 / 1" },
    ],
  },
  {
    top: "38svh",
    note: true,
    tiles: [
      { name: "Apartments", image: "/media/types/apartments.jpg", ratio: "3 / 2" },
      { name: "Waterfront Homes", image: "/media/types/waterfront-homes.jpg", ratio: "3 / 5" },
    ],
  },
  {
    top: "28svh",
    tiles: [
      { name: "Beachfront Properties", image: "/media/types/beachfront-properties.jpg", ratio: "2 / 3" },
      { name: "Holiday Homes", image: "/media/types/holiday-homes.jpg", ratio: "1 / 1" },
      { name: "Eco-friendly Properties", image: "/media/types/eco-friendly-properties.jpg", ratio: "2 / 3" },
    ],
  },
  {
    top: "52svh",
    tiles: [
      { name: "Golf Course Residences", image: "/media/types/golf-course-residences.jpg", ratio: "4 / 5" },
      { name: "Desert Retreats", image: "/media/types/desert-retreats.jpg", ratio: "10 / 9" },
    ],
  },
];

// numbering runs row by row: top row left to right first, then the next row, and so on
const NUMBERS = (() => {
  const map = {};
  const rows = Math.max(...COLUMNS.map((c) => c.tiles.length));
  let n = 0;
  for (let r = 0; r < rows; r += 1) {
    COLUMNS.forEach((col, c) => {
      if (col.tiles[r]) {
        n += 1;
        map[`${c}-${r}`] = String(n).padStart(2, "0");
      }
    });
  }
  return map;
})();

export default function PropertyTypesSection() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // 1. Entrance: tiles rise in one after another, sweeping left to right
        gsap.from(".discover-tile", {
          autoAlpha: 0,
          y: 90,
          scale: 0.92,
          duration: 1,
          ease: "power3.out",
          stagger: 0.07,
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });

        // 2. Scrubbed (the section is held on screen by CSS position: sticky, no JS pin):
        //    the whole wall scrolls up, every column at its own speed
        const cols = gsap.utils.toArray(".discover-col");
        const travel = (col) => Math.max(col.offsetHeight - window.innerHeight + 40, window.innerHeight * 0.5);

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.7,
            invalidateOnRefresh: true,
          },
        });

        // title steps aside first
        tl.to([".discover-title", ".discover-tools"], { y: -60, autoAlpha: 0, duration: 0.5, ease: "power1.in" }, 0.15);

        // columns travel different distances in the same time = natural parallax
        cols.forEach((col) => {
          tl.to(col, { y: () => -travel(col), duration: 2 }, 0.15);
        });

        // images drift inside their tiles for extra depth
        tl.fromTo(".discover-tile img", { yPercent: -7 }, { yPercent: 7, duration: 2 }, 0.15);

        // closing note + catalog button arrive at the end
        tl.fromTo(
          ".discover-note",
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" },
          1.7
        );

        // short hold on the final frame
        tl.to({}, { duration: 0.3 });
      });

      return () => mm.revert();
    }, rootRef);

    return () => ctx.revert();
  }, []);

  // Re-measure every ScrollTrigger when layout above this section changes
  // (images, fonts, videos loading later), otherwise start/end positions go stale.
  useEffect(() => {
    let timer;
    const refresh = () => {
      clearTimeout(timer);
      timer = setTimeout(() => ScrollTrigger.refresh(), 150);
    };
    const observer = new ResizeObserver(refresh);
    observer.observe(document.body);
    window.addEventListener("load", refresh);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
      window.removeEventListener("load", refresh);
    };
  }, []);

  return (
    <section
      className="discover-section"
      id="property-types"
      ref={rootRef}
      aria-labelledby="discover-heading"
    >
      <div className="discover-sticky">
      <div className="discover-tools">
        <button className="discover-mini" type="button" aria-label="Home">
          <House size={11} strokeWidth={1.6} />
        </button>
        <button className="discover-mini" type="button" aria-label="Search properties">
          <Search size={11} strokeWidth={1.6} />
        </button>
      </div>

      <h2 className="discover-title" id="discover-heading">
        Discover Your Ideal
        <br />
        Property Type
      </h2>

      <div className="discover-columns">
        {COLUMNS.map((col, c) => (
          <div className="discover-col" key={c} style={{ paddingTop: col.top }}>
            {col.tiles.map((tile, r) => (
              <a
                className="discover-tile"
                href="#contact"
                key={tile.name}
                style={{ aspectRatio: tile.ratio }}
                aria-label={`Explore ${tile.name}`}
              >
                <img src={tile.image} alt="" loading="lazy" />
                <span className="discover-tile-shade" />
                <span className="discover-tile-arrow" aria-hidden="true">
                  <ArrowUpRight size={12} strokeWidth={1.7} />
                </span>
                <span className="discover-tile-label">
                  <span className="discover-tile-num">{NUMBERS[`${c}-${r}`]}</span>
                  <span className="discover-tile-name">{tile.name}</span>
                </span>
              </a>
            ))}

            {col.note && (
              <div className="discover-note">
                <p>
                  Explore Our Diverse Range of Property Types and Find Your Perfect Match
                </p>
                <a className="discover-pill" href="#contact">
                  <span className="discover-pill-icon" aria-hidden="true">
                    <Download size={10} strokeWidth={1.8} />
                  </span>
                  Catalog Download
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}
