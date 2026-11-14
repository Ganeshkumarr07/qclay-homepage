import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus } from "lucide-react";
import "./PartnersFaqSection.css";

gsap.registerPlugin(ScrollTrigger);

/* Put partner logos in public/media/partners/. Until a logo file exists, the name is shown as text. */
const PARTNERS = [
  { name: "DAMAC", logo: "/media/partners/damac.svg" },
  { name: "EMAAR", logo: "/media/partners/emaar.svg" },
  { name: "NAKHEEL", logo: "/media/partners/nakheel.svg" },
  { name: "SOBHA", logo: "/media/partners/sobha.svg" },
  { name: "MERAAS", logo: "/media/partners/meraas.svg" },
  { name: "DANUBE", logo: "/media/partners/danube.svg" },
];

const HEADLINE_LINES = ["Frequent Asked", "Questions"];

/* Questions are from the reference; the answers are placeholder copy, replace with your own. */
const FAQS = [
  {
    q: "What types of properties do we offer in Dubai?",
    a: "Apartments, villas, penthouses, townhouses, beachfront and golf course residences, holiday homes and commercial spaces, all in one catalog.",
  },
  {
    q: "What are the payment options available for purchasing a property?",
    a: "You can pay in full, or use a developer payment plan with an initial payment from $25,000 and interest-free installments.",
  },
  {
    q: "Can foreign nationals buy property in Dubai?",
    a: "Yes. Foreign nationals can buy freehold property in designated areas of Dubai, and we help you pick the right one.",
  },
  {
    q: "What is the process for obtaining a residency visa through property investment?",
    a: "Investing in real estate from AED 750,000 (about USD 204,000) can make you eligible for a resident visa. We guide you through each document and step.",
  },
  {
    q: "Are there any additional costs associated with property ownership in Dubai?",
    a: "Besides the purchase price, expect registration fees and yearly service charges. We list every cost before you commit, and our own commission is 0%.",
  },
  {
    q: "Do we offer property management services for rental properties?",
    a: "Yes. We can connect you with management for finding tenants, collecting rent and handling maintenance.",
  },
  {
    q: "Can we assist with property financing for non-resident buyers?",
    a: "Yes. Non-residents can access mortgage financing at around 5-7%, and we help you compare the options.",
  },
];

function PartnerLogo({ name, logo }) {
  const [failed, setFailed] = useState(false);

  return (
    <span className="partners-logo">
      {failed ? (
        <span className="partners-wordmark">{name}</span>
      ) : (
        <img src={logo} alt={name} loading="lazy" onError={() => setFailed(true)} />
      )}
    </span>
  );
}

export default function PartnersFaqSection() {
  const rootRef = useRef(null);
  const [open, setOpen] = useState(-1);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // 1. Entrance
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        });

        tl.from(".partners-title", { autoAlpha: 0, y: 16, duration: 0.7, ease: "power2.out" })
          .from(".partners-marquee", { autoAlpha: 0, duration: 0.9, ease: "power2.out" }, 0.15)
          .from(".faq-eyebrow", { autoAlpha: 0, x: -12, duration: 0.6, ease: "power2.out" }, 0.4)
          .from(
            ".faq-headline-inner",
            { yPercent: 110, duration: 1, ease: "power4.out", stagger: 0.12 },
            0.5
          )
          .from(".faq-intro", { autoAlpha: 0, y: 16, duration: 0.8, ease: "power2.out" }, 0.8)
          .from(".faq-panel", { autoAlpha: 0, y: 40, duration: 1, ease: "power3.out" }, 0.5)
          .from(
            ".faq-item",
            { autoAlpha: 0, y: 22, duration: 0.7, ease: "power3.out", stagger: 0.08 },
            0.8
          )
          .from(
            ".faq-rule",
            {
              scaleX: 0,
              transformOrigin: "left center",
              duration: 0.9,
              ease: "power3.inOut",
              stagger: 0.08,
            },
            0.9
          );

        // 2. Partner logos loop right to left, and slow down while hovered
        const loop = gsap.to(".partners-track", {
          xPercent: -50,
          duration: 32,
          ease: "none",
          repeat: -1,
        });

        const marquee = rootRef.current.querySelector(".partners-marquee");
        const slow = () => gsap.to(loop, { timeScale: 0.2, duration: 0.6 });
        const normal = () => gsap.to(loop, { timeScale: 1, duration: 0.6 });
        marquee.addEventListener("mouseenter", slow);
        marquee.addEventListener("mouseleave", normal);

        return () => {
          marquee.removeEventListener("mouseenter", slow);
          marquee.removeEventListener("mouseleave", normal);
        };
      });

      return () => mm.revert();
    }, rootRef);

    return () => ctx.revert();
  }, []);

  // opening/closing changes the page height, so ScrollTriggers below need re-measuring
  const toggle = (index) => {
    setOpen((current) => (current === index ? -1 : index));
    window.setTimeout(() => ScrollTrigger.refresh(), 500);
  };

  return (
    <section className="faq-section" id="faq" ref={rootRef} aria-labelledby="faq-heading">
      <div className="partners">
        <p className="partners-title">Our valued partners</p>

        <div
          className="partners-marquee"
          role="group"
          aria-label={`Our partners: ${PARTNERS.map((p) => p.name).join(", ")}`}
        >
          <div className="partners-track" aria-hidden="true">
            {[0, 1].map((half) => (
              <div className="partners-half" key={half}>
                {[...PARTNERS, ...PARTNERS].map((partner, i) => (
                  <PartnerLogo key={i} {...partner} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="faq-layout">
        <div className="faq-copy">
          <p className="faq-eyebrow">
            <span className="faq-dot" aria-hidden="true" />
            Explore Our Advantages
          </p>

          <h2 id="faq-heading">
            {HEADLINE_LINES.map((line) => (
              <span className="faq-headline-line" key={line}>
                <span className="faq-headline-inner">{line}</span>
              </span>
            ))}
          </h2>

          <p className="faq-intro">
            At Monte, we offer more than just real estate services; we provide an unparalleled
            experience tailored to meet your needs and exceed your expectations.
          </p>
        </div>

        <div className="faq-panel">
          <ul className="faq-list">
            {FAQS.map((item, index) => {
              const isOpen = open === index;
              return (
                <li className="faq-item" key={item.q}>
                  <h3>
                    <button
                      type="button"
                      className="faq-question"
                      id={`faq-question-${index}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${index}`}
                      onClick={() => toggle(index)}
                    >
                      <span>{item.q}</span>
                      <Plus className="faq-plus" size={14} strokeWidth={1.5} aria-hidden="true" />
                    </button>
                  </h3>

                  <div
                    className="faq-answer"
                    id={`faq-answer-${index}`}
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
                    data-open={isOpen}
                  >
                    <div className="faq-answer-inner">
                      <p>{item.a}</p>
                    </div>
                  </div>

                  <span className="faq-rule" aria-hidden="true" />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
