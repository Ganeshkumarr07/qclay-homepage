import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import "./SolutionsSection.css";

gsap.registerPlugin(ScrollTrigger);

const SOLUTIONS_VIDEO = "/media/vid2.mp4";
const SOLUTIONS_POSTER = "/media/solutions-poster.jpg";

const HEADING_LINES = ["Tailored Solutions", "for Your Real Estate", "Needs"];

const SOLUTIONS = [
  { title: "Market Analysis", image: "/media/building3.jpg", alt: "Dubai tower from below" },
  { title: "Market Analysis", image: "/media/building4.jpg", alt: "Glass residential tower" },
  { title: "Market Analysis", image: "/media/building6.jpg", alt: "Modern residential facade" },
  { title: "Market Analysis", image: "/media/interior6.jpg", alt: "Apartment interior with greenery" },
];

const MARQUEE_ITEMS = ["Initial payment from $25,000", "0% commission", "Interest-free installments"];

export default function SolutionsSection() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // 1. Entrance: heading lines mask-reveal, pills slide in from right
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 65%",
            toggleActions: "play none none reverse",
          },
        });

        tl.from(".solutions-line-inner", {
          yPercent: 110,
          duration: 1,
          ease: "power4.out",
          stagger: 0.12,
        })
          .from(
            ".solutions-explore",
            { autoAlpha: 0, y: 12, duration: 0.6, ease: "power2.out" },
            "-=0.5"
          )
          .from(
            ".solutions-pill",
            {
              x: () => window.innerWidth * 0.8,
              autoAlpha: 0,
              duration: 1.3,
              ease: "power4.out",
              stagger: 0.15,
            },
            0.1
          )
          .from(
            ".solutions-marquee",
            { yPercent: 60, autoAlpha: 0, duration: 0.9, ease: "power3.out" },
            0.4
          );

        // 2. Video parallax
        gsap.fromTo(
          ".solutions-video-wrap",
          { yPercent: -8, scale: 1.12 },
          {
            yPercent: 8,
            scale: 1.12,
            ease: "none",
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );

        // 3. Infinite marquee, right to left (track = 2 identical halves, so -50% loops seamlessly)
        const marquee = gsap.to(".solutions-marquee-track", {
          xPercent: -50,
          duration: 28,
          ease: "none",
          repeat: -1,
        });

        // Scroll speed boost: faster when the user scrolls quickly
        ScrollTrigger.create({
          trigger: rootRef.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const boost = Math.min(Math.abs(self.getVelocity()) / 400, 4);
            gsap.to(marquee, { timeScale: 1 + boost, duration: 0.2, overwrite: true });
            gsap.to(marquee, { timeScale: 1, duration: 1, delay: 0.2, overwrite: false });
          },
        });

        // 4. Pill hover: arrow nudges down, thumbnail zooms
        const pills = gsap.utils.toArray(".solutions-pill");
        const cleanups = pills.map((pill) => {
          const arrow = pill.querySelector(".solutions-arrow svg");
          const thumb = pill.querySelector(".solutions-thumb img");
          const enter = () => {
            gsap.to(arrow, { y: 4, duration: 0.3, ease: "power2.out" });
            gsap.to(thumb, { scale: 1.15, duration: 0.5, ease: "power2.out" });
          };
          const leave = () => {
            gsap.to(arrow, { y: 0, duration: 0.3, ease: "power2.out" });
            gsap.to(thumb, { scale: 1, duration: 0.5, ease: "power2.out" });
          };
          pill.addEventListener("mouseenter", enter);
          pill.addEventListener("mouseleave", leave);
          return () => {
            pill.removeEventListener("mouseenter", enter);
            pill.removeEventListener("mouseleave", leave);
          };
        });

        return () => cleanups.forEach((fn) => fn());
      });

      return () => mm.revert();
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="solutions-section"
      id="solutions"
      ref={rootRef}
      aria-labelledby="solutions-heading"
    >
      <div className="solutions-video-wrap" aria-hidden="true">
        <video
          className="solutions-video"
          src={SOLUTIONS_VIDEO}
          poster={SOLUTIONS_POSTER}
          muted
          loop
          autoPlay
          playsInline
          preload="metadata"
        />
      </div>
      <div className="solutions-shade" />

      <div className="solutions-layout">
        <div className="solutions-copy">
          <h2 id="solutions-heading">
            {HEADING_LINES.map((line) => (
              <span className="solutions-line" key={line}>
                <span className="solutions-line-inner">{line}</span>
              </span>
            ))}
          </h2>

          <a className="solutions-explore" href="#properties">
            <span className="solutions-dot" aria-hidden="true" />
            Explore more
            <ArrowUpRight size={11} strokeWidth={1.6} aria-hidden="true" />
          </a>
        </div>

        <ul className="solutions-list">
          {SOLUTIONS.map((item, index) => (
            <li key={index}>
              <a className="solutions-pill" href="#contact" aria-label={`${item.title} ${index + 1}`}>
                <span className="solutions-thumb">
                  <img src={item.image} alt={item.alt} loading="lazy" />
                </span>
                <span className="solutions-title">
                  {item.title}
                  <sup>{String(index + 1).padStart(2, "0")}</sup>
                </span>
                <span className="solutions-arrow" aria-hidden="true">
                  <ArrowDown size={18} strokeWidth={1.4} />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="solutions-marquee" aria-label="Initial payment from 25,000 dollars, 0% commission">
        <div className="solutions-marquee-track" aria-hidden="true">
          {[0, 1].map((half) => (
            <div className="solutions-marquee-half" key={half}>
              {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((text, i) => (
                <span className="solutions-marquee-pill" key={i}>
                  {text}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
