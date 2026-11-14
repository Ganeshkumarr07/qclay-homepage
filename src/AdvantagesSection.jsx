import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Users,
  Shield,
  Coins,
  CreditCard,
  BadgePercent,
  Percent,
  House,
  Globe2,
} from "lucide-react";
import "./AdvantagesSection.css";

gsap.registerPlugin(ScrollTrigger);

const HEADING_LINES = ["Why Dubai Stands", "Unrivalled?"];

const ADVANTAGES = [
  {
    title: "Diversity",
    icon: Users,
    text: "Approximately 90% of Dubai's population consists of foreigners, reflecting its rich multicultural environment and tolerant atmosphere.",
  },
  {
    title: "Safety",
    icon: Shield,
    text: "Dubai consistently leads global rankings as one of the safest cities worldwide. The Emirates also secured the second position among the safest countries on the planet, according to World Finance.",
  },
  {
    title: "Stable Currency",
    icon: Coins,
    text: "The country's currency has been pegged to the dollar for over 20 years, ensuring stability and confidence in financial transactions.",
  },
  {
    title: "Resident Visa Opportunities",
    icon: CreditCard,
    text: "Investing in real estate (starting from AED 750,000 or USD 204,000) offers the possibility of obtaining a resident visa.",
  },
  {
    title: "Profit Tax Exemption for Residents",
    icon: BadgePercent,
    text: "This includes income from rental properties, offering attractive incomes for property owners and investors.",
  },
  {
    title: "Low Mortgage Rates",
    icon: Percent,
    text: "For non-residents, mortgage rates stand at an appealing 5-7%, providing accessible financing options for property purchases.",
  },
  {
    title: "Remote Property Acquisition",
    icon: House,
    text: "Reach out to us, and we'll assist you in selecting a worthy property while handling all legal formalities. Moreover, with 0% commission, our services are conveniently directed to developers.",
  },
];

export default function AdvantagesSection() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 65%",
            toggleActions: "play none none reverse",
          },
        });

        tl.from(".advantages-eyebrow", { autoAlpha: 0, x: -12, duration: 0.6, ease: "power2.out" })
          .from(
            ".advantages-line-inner",
            { yPercent: 110, duration: 1, ease: "power4.out", stagger: 0.12 },
            0.1
          )
          .from(
            ".advantages-cta",
            { autoAlpha: 0, scale: 0.8, duration: 0.7, ease: "back.out(1.7)" },
            0.5
          )
          .from(
            ".advantages-item",
            { autoAlpha: 0, y: 48, duration: 0.9, ease: "power3.out", stagger: 0.1 },
            0.5
          )
          .from(
            ".advantages-icon",
            { scale: 0, rotate: -45, duration: 0.6, ease: "back.out(2)", stagger: 0.1 },
            0.7
          );
      });

      return () => mm.revert();
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="advantages-section"
      id="advantages"
      ref={rootRef}
      aria-labelledby="advantages-heading"
    >
      <header className="advantages-header">
        <div className="advantages-headline">
          <p className="advantages-eyebrow">
            <span className="advantages-dot" aria-hidden="true" />
            Explore Our Advantages
          </p>
          <h2 id="advantages-heading">
            {HEADING_LINES.map((line) => (
              <span className="advantages-line" key={line}>
                <span className="advantages-line-inner">{line}</span>
              </span>
            ))}
          </h2>
        </div>

        <a className="advantages-cta" href="#contact">
          <span className="advantages-cta-icon" aria-hidden="true">
            <Globe2 size={12} strokeWidth={1.6} />
          </span>
          Contact Us Now
        </a>
      </header>

      <ul className="advantages-grid">
        {ADVANTAGES.map(({ title, text, icon: Icon }) => (
          <li className="advantages-item" key={title}>
            <span className="advantages-icon" aria-hidden="true">
              <Icon size={18} strokeWidth={1.4} />
            </span>
            <h3>{title}</h3>
            <p>{text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
