import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Download } from "lucide-react";
import "./OwnershipSection.css";

gsap.registerPlugin(ScrollTrigger);

const CIRCLES = [
  { id: "left", label: "10% Initial Payment" },
  { id: "center", label: "5 years installment, 0% overpayment" },
  { id: "right", label: "Rental income ~15%" },
];

export default function OwnershipSection() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const size = () => document.querySelector(".ownership-circle").offsetWidth;

        // 1. Entrance (plays once when the section comes into view)
        gsap.fromTo(
          ".ownership-inner",
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top 70%",
              once: true,
            },
          }
        );

        // 2. Pinned, scrubbed timeline: 3 circles -> overlap -> one circle
        const tl = gsap.timeline({
          defaults: { ease: "power1.inOut" },
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "+=260%",
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl
          // hold: the three circles stay as they are while the section is pinned
          .to({}, { duration: 0.4 }, 0)

          // small texts inside the circles fade out
          .to(".ownership-circle-label", { autoAlpha: 0, duration: 0.35, ease: "none" }, 0.4)

          // stage 1: circles drift towards each other and overlap
          .to(".ownership-circle-left", { x: () => size() * 0.8, y: () => -size() * 0.12, duration: 0.7 }, 0.55)
          .to(".ownership-circle-right", { x: () => -size() * 0.8, y: () => size() * 0.05, duration: 0.7 }, 0.55)
          .to(".ownership-circle-center", { y: () => size() * 0.1, scale: 1.04, duration: 0.7 }, 0.55)

          // download pill shows up (icon only)
          .fromTo(".ownership-pill", { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.4 }, 1.2)

          // stage 2: circles merge into a single ring
          .to(".ownership-circle-left", { x: () => size() * 0.98, y: 0, duration: 0.7 }, 1.5)
          .to(".ownership-circle-right", { x: () => -size() * 0.98, y: 0, duration: 0.7 }, 1.5)
          .to(".ownership-circle-center", { y: 0, scale: 1, duration: 0.7 }, 1.5)

          // title leaves, centre text arrives
          .to(".ownership-title", { y: -70, autoAlpha: 0, duration: 0.6 }, 1.6)
          .fromTo(".ownership-core", { autoAlpha: 0, scale: 0.9 }, { autoAlpha: 1, scale: 1, duration: 0.5 }, 1.95)

          // pill expands into "Catalog Download"
          .fromTo(
            ".ownership-pill-text",
            { maxWidth: 0, paddingLeft: 0, paddingRight: 0, autoAlpha: 0 },
            { maxWidth: 160, paddingLeft: 8, paddingRight: 12, autoAlpha: 1, duration: 0.5 },
            2.05
          )

          // hold the final frame for a moment before the page scrolls on
          .to({}, { duration: 0.35 });
      });

      return () => mm.revert();
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="ownership-section"
      id="ownership"
      ref={rootRef}
      aria-labelledby="ownership-heading"
    >
      <div className="ownership-inner">
        <h2 className="ownership-title" id="ownership-heading">
          Path to Smart Ownership
        </h2>

        <div className="ownership-stage">
          <div className="ownership-circles">
            {CIRCLES.map((circle) => (
              <div className={`ownership-circle ownership-circle-${circle.id}`} key={circle.id}>
                <span className="ownership-circle-label">{circle.label}</span>
              </div>
            ))}
          </div>

          <p className="ownership-core">
            Smart
            <br />
            Ownership
          </p>

          <a className="ownership-pill" href="#contact" aria-label="Catalog download">
            <span className="ownership-pill-icon" aria-hidden="true">
              <Download size={11} strokeWidth={1.8} />
            </span>
            <span className="ownership-pill-text">Catalog Download</span>
          </a>
        </div>
      </div>
    </section>
  );
}
