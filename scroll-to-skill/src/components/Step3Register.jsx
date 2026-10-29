/**
 * Step3Register.jsx
 * -----------------
 * Step 3: Mission Reveal & Workshop Registration
 *
 * Visual highlight of the experience:
 *  - Animated "YOUR AI MISSION" heading & unlock badge
 *  - Project card:
 *      * Project Name
 *      * Why it fits the selected interest
 *      * What it can do
 *      * One realistic first action the student can take today
 *      * What they could learn by building it
 *  - Clear bridge to workshop:
 *      * "Your idea is just the beginning."
 *      * "Take the next step and learn how to turn your idea into a working AI project."
 *      * Prominent CTA: "Register for the Free Workshop →"
 *      * Compact layout visible without long scrolling
 *  - Honest Registration Handling:
 *      * If no official URL is configured, displays:
 *        "The official workshop registration link will be added here once it is available."
 *      * Does not navigate to broken placeholder domains.
 *      * Keeps discovery flow completely usable.
 */

import { useState } from "react";
import { isPlaceholderUrl, WORKSHOP } from "../config";

export default function Step3Register({ project, onBack, onRegister }) {
  const [showConfigNotice, setShowConfigNotice] = useState(false);
  const isPlaceholder = isPlaceholderUrl();

  if (!project) return null;

  function handleRegisterClick() {
    if (isPlaceholder) {
      setShowConfigNotice(true);
      return;
    }
    onRegister();
  }

  return (
    <div className="step-card step-card-reveal" aria-labelledby="step3-heading">
      {/* ── Subtitle Context Transition ── */}
      <div className="step-eyebrow">
        <span className="step-eyebrow-dot" aria-hidden="true" />
        Step 3 &middot; Your mission is unlocked
      </div>

      {/* ── Mission Unlock Banner ── */}
      <div className="mission-banner" role="status">
        <div className="mission-icon-wrap" aria-hidden="true">
          <span>⚡</span>
        </div>
        <div>
          <span className="mission-kicker">MISSION UNLOCKED</span>
          <h2 id="step3-heading" className="mission-heading">
            YOUR AI MISSION
          </h2>
          <p className="mission-sub">
            Matched to your interests and ready for you to build.
          </p>
        </div>
      </div>

      {/* ── Polished Project Card ── */}
      <div className="project-card" aria-label={`Project: ${project.name}`}>
        {/* Card Header */}
        <div className="project-card-header">
          <div className="project-emoji-wrap" aria-hidden="true">
            {project.emoji}
          </div>
          <div>
            <h3 className="project-name">{project.name}</h3>
            <p className="project-tagline">{project.tagline}</p>
          </div>
        </div>

        {/* Project Details */}
        <div className="project-body">
          {/* Why it fits */}
          <div className="project-detail-row">
            <span className="project-detail-key">Why it fits</span>
            <span className="project-detail-val">
              {project.whyFits || project.whyUseful}
            </span>
          </div>

          {/* First action today */}
          <div className="project-detail-row project-first-step">
            <span className="project-detail-key">⚡ First action today</span>
            <span className="project-detail-val">{project.firstStep}</span>
          </div>

          {/* What you'll learn */}
          {project.whatYouLearn && (
            <div className="project-detail-row">
              <span className="project-detail-key">What you'll learn</span>
              <span className="project-detail-val">{project.whatYouLearn}</span>
            </div>
          )}
        </div>
      </div>

      {/* ── Workshop Registration Bridge ── */}
      <div className="reg-section">
        <h3 className="reg-headline">Your idea is just the beginning.</h3>
        <p className="reg-sub">
          Take the next step and learn how to turn your idea into a working AI
          project in our free 60-minute workshop:{" "}
          <strong>{WORKSHOP.name}</strong>.
        </p>

        {/* Honest Registration URL Notice */}
        {isPlaceholder && (
          <div className="reg-honest-notice" role="status">
            <span className="reg-honest-icon" aria-hidden="true">
              ℹ️
            </span>
            <div className="reg-honest-text">
              The official workshop registration link will be added here once it
              is available.
              {showConfigNotice && (
                <span className="reg-honest-config-hint">
                  {" "}(To configure for your college event, set{" "}
                  <code>REGISTRATION_URL</code> in <code>src/config.js</code>).
                </span>
              )}
            </div>
          </div>
        )}

        {/* Prominent Registration CTA */}
        <button
          className="btn btn-register"
          onClick={handleRegisterClick}
          aria-label="Register for the Free Workshop"
        >
          Register for the Free Workshop →
        </button>

        <p className="reg-note">
          Free 60-minute workshop &middot; Beginner-friendly practical AI &middot; Open to all college students
        </p>
      </div>

      {/* ── Navigation ── */}
      <div className="btn-row" style={{ marginTop: 20 }}>
        <button
          className="btn btn-ghost"
          onClick={onBack}
          aria-label="Back and change category"
        >
          ← Change category
        </button>
      </div>
    </div>
  );
}
