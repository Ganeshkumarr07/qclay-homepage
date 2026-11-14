import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./CtaSection.css";

gsap.registerPlugin(ScrollTrigger);

const CTA_IMAGE = "/media/cta.jpg";
const HEADING_LINES = ["Built Your Future", "With Us"];

// card shape at the start / end of the grow animation (same start value is set in the CSS)
const CARD_START = "inset(7svh 4vw 7svh 4vw round 22px)";
const CARD_END = "inset(0svh 0vw 0svh 0vw round 0px)";

export default function CtaSection() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // 1. Entrance: card rises in, heading lines reveal, button pops
        gsap
          .timeline({
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          })
          .from(".cta-card", { autoAlpha: 0, y: 80, duration: 1.1, ease: "power3.out" })
          .from(
            ".cta-line-inner",
            { yPercent: 110, duration: 1, ease: "power4.out", stagger: 0.12 },
            0.4
          )
          .from(
            ".cta-pill",
            { autoAlpha: 0, y: 14, scale: 0.9, duration: 0.7, ease: "back.out(1.6)" },
            0.9
          );

        // 2. Scrubbed: the card grows until it fills the whole screen
        //    (section is held on screen by CSS position: sticky)
        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.7,
              invalidateOnRefresh: true,
            },
          })
          .fromTo(
            ".cta-card",
            { clipPath: CARD_START },
            { clipPath: CARD_END, duration: 1, ease: "power2.inOut" },
            0
          )
          .fromTo(".cta-image", { scale: 1.25 }, { scale: 1, duration: 1 }, 0)
          .fromTo(".cta-content", { scale: 1 }, { scale: 1.12, duration: 1 }, 0)
          // hold the full-screen frame before the page ends
          .to({}, { duration: 0.4 });
      });

      return () => mm.revert();
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="cta-section" id="contact" ref={rootRef} aria-labelledby="cta-heading">
      <div className="cta-sticky">
        <div className="cta-card">
          <img
            className="cta-image"
            src={CTA_IMAGE}
            alt="Real estate consultant helping a client at a table"
          />
          <div className="cta-shade" />

          <div className="cta-content">
            <h2 id="cta-heading">
              {HEADING_LINES.map((line) => (
                <span className="cta-line" key={line}>
                  <span className="cta-line-inner">{line}</span>
                </span>
              ))}
            </h2>

            <button className="cta-pill" type="button">
              Start Your Journey
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
