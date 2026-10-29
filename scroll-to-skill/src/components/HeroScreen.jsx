/**
 * HeroScreen.jsx
 * --------------
 * Opening screen for "From Scroll to Skill".
 *
 * Designed to immediately answer "Why should I click this?":
 *  - Campaign label: FROM SCROLL TO SKILL
 *  - Headline: "You have ideas. Let's build one."
 *  - Relatable typewriter effect cycling student thoughts
 *  - Supporting copy: "You don't need to be an AI expert to start.
 *    Discover a project that fits your interests in 45 seconds."
 *  - Primary CTA: "Find My AI Project →"
 *  - Secondary CTA: "Register for the Free Workshop" (allows skipping discovery)
 *  - Truthful benefit badges (Beginner-friendly, No prior AI project needed)
 *  - Reduced-motion accessible
 */

import { useState, useEffect } from "react";
import { WORKSHOP } from "../config";

const STUDENT_THOUGHTS = [
  "“I want to build something for placements…”",
  "“I want to solve a problem on my campus…”",
  "“I want to try building with AI…”",
];

export default function HeroScreen({ onStart, onDirectRegister }) {
  const [thoughtIndex, setThoughtIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (prefersReducedMotion) {
      // If reduced motion is requested, display the full thought statically
      setDisplayText(STUDENT_THOUGHTS[thoughtIndex]);
      return;
    }

    const currentFullText = STUDENT_THOUGHTS[thoughtIndex];
    let timer;

    if (!isDeleting) {
      // Typing forward
      if (displayText.length < currentFullText.length) {
        timer = setTimeout(() => {
          setDisplayText(currentFullText.slice(0, displayText.length + 1));
        }, 55);
      } else {
        // Pause at end before deleting
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      // Deleting backward
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentFullText.slice(0, displayText.length - 1));
        }, 30);
      } else {
        // Move to next thought
        setIsDeleting(false);
        setThoughtIndex((prev) => (prev + 1) % STUDENT_THOUGHTS.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, thoughtIndex, prefersReducedMotion]);

  return (
    <div className="hero-wrapper">
      {/* ── Visual AI Orb ── */}
      <div className="hero-orb" aria-hidden="true">
        <div className="hero-orb-core" />
      </div>

      {/* ── Campaign Eyebrow ── */}
      <div className="hero-eyebrow-pill">
        <span className="hero-eyebrow-dot" aria-hidden="true" />
        <span className="hero-eyebrow-text">FROM SCROLL TO SKILL</span>
      </div>

      {/* ── Main Headline ── */}
      <h1 className="hero-headline">
        You have ideas. <br />
        <span className="hl-accent">Let's build one.</span>
      </h1>

      {/* ── Relatable Student Typewriter Box ── */}
      <div
        className="typewriter-container"
        aria-label="Student aspiration"
        role="status"
      >
        <span className="typewriter-label">SOUND FAMILIAR?</span>
        <div className="typewriter-bubble">
          <span className="typewriter-text">
            {displayText || STUDENT_THOUGHTS[0]}
          </span>
          {!prefersReducedMotion && (
            <span className="typewriter-cursor" aria-hidden="true">
              |
            </span>
          )}
        </div>
      </div>

      {/* ── Supporting Copy ── */}
      <p className="hero-sub">
        You don't need to be an AI expert to start. Discover a project that fits
        your interests in 45 seconds.
      </p>

      {/* ── Action Buttons ── */}
      <div className="hero-cta-area">
        <div className="hero-btn-row">
          <button
            className="btn btn-hero-primary"
            onClick={onStart}
            aria-label="Find My AI Project"
          >
            Find My AI Project →
          </button>

          <button
            className="btn btn-hero-secondary"
            onClick={onDirectRegister}
            aria-label="Register directly for the free workshop"
          >
            Register for the Free Workshop
          </button>
        </div>

        {/* ── Truthful Reassurance Details ── */}
        <div className="hero-meta-row" aria-label="Key highlights">
          <span className="hero-meta-item">
            <span className="hero-meta-icon" aria-hidden="true">✓</span>
            Beginner-friendly
          </span>
          <span className="hero-meta-divider" aria-hidden="true">·</span>
          <span className="hero-meta-item">
            <span className="hero-meta-icon" aria-hidden="true">✓</span>
            No prior AI project needed
          </span>
          <span className="hero-meta-divider" aria-hidden="true">·</span>
          <span className="hero-meta-item">
            <span className="hero-meta-icon" aria-hidden="true">✓</span>
            Free {WORKSHOP.duration} session
          </span>
        </div>
      </div>
    </div>
  );
}
