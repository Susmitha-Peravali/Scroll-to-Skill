/**
 * App.jsx
 * -------
 * Root controller for "From Scroll to Skill".
 *
 * Supports two seamlessly integrated views:
 *   1. Student Journey (4-screen flow: Hero -> Reflect -> Discover -> Mission Reveal & Register)
 *   2. Campus Growth Toolkit (Promoter Referral Generator, WhatsApp Invitation, 500-Target Tracker, & Growth Experiments)
 *
 * Features:
 *   - Intelligent matching via pickTailoredProject(interest, blocker)
 *   - Direct skip registration for motivated students
 *   - Honest registration handling with placeholder detection
 *   - Toggleable Campus Growth Toolkit in header and footer
 */

import { useState, useEffect } from "react";
import "./App.css";

import HeroScreen from "./components/HeroScreen";
import ProgressBar from "./components/ProgressBar";
import Step1Reflect from "./components/Step1Reflect";
import Step2Interest from "./components/Step2Interest";
import Step3Register from "./components/Step3Register";
import CampusGrowthToolkit from "./components/CampusGrowthToolkit";

import { pickTailoredProject } from "./data/projectIdeas";
import {
  REGISTRATION_URL,
  WORKSHOP,
  analytics,
  isPlaceholderUrl,
  buildRegistrationUrl,
} from "./config";

// Read ?utm_source=... safely from URL
function getQueryParam(key, fallback = "") {
  try {
    return new URLSearchParams(window.location.search).get(key) || fallback;
  } catch {
    return fallback;
  }
}

export default function App() {
  // View mode: "student" or "toolkit"
  const initialView = getQueryParam("view") === "toolkit" ? "toolkit" : "student";
  const [viewMode, setViewMode] = useState(initialView);

  // Student journey steps: 0 = Hero; 1 = Reflect; 2 = Category; 3 = Mission Reveal & Register
  const [step, setStep] = useState(0);
  const [selectedBlocker, setSelectedBlocker] = useState(null);
  const [selectedInterest, setSelectedInterest] = useState(null);
  const [project, setProject] = useState(null);
  const [showDirectPlaceholderNotice, setShowDirectPlaceholderNotice] = useState(false);

  const utmSource = getQueryParam("utm_source", "direct");
  const refCode = getQueryParam("ref", "");

  // Track initial page view
  useEffect(() => {
    analytics.trackPageView();
  }, []);

  // ── Step 0: Hero Handlers ──────────────────────────────────────────────────
  function handleStartJourney() {
    analytics.trackDiscoveryStarted();
    setStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Motivated students skip discovery directly to registration
  function handleDirectRegister() {
    analytics.trackDirectRegistrationClick(utmSource);

    if (isPlaceholderUrl()) {
      setShowDirectPlaceholderNotice(true);
      return;
    }

    const targetUrl = buildRegistrationUrl(
      REGISTRATION_URL,
      utmSource,
      "scroll_to_skill",
      refCode
    );
    window.open(targetUrl, "_blank", "noopener,noreferrer");
  }

  // ── Step 1: Reflect Handlers ───────────────────────────────────────────────
  function handleBlockerSelect(blockerId) {
    setSelectedBlocker(blockerId);
    analytics.trackBlockerSelected(blockerId);
  }

  function handleStep1Next() {
    if (!selectedBlocker) return;
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ── Step 2: Interest Handlers ──────────────────────────────────────────────
  function handleInterestSelect(interestId) {
    setSelectedInterest(interestId);
    analytics.trackInterestSelected(interestId);
  }

  function handleStep2Next() {
    if (!selectedInterest) return;

    // Tailored matching based on both interest AND reflection blocker
    const matched = pickTailoredProject(selectedInterest, selectedBlocker);
    setProject(matched);

    if (matched) {
      analytics.trackProjectUnlocked(
        matched.id,
        selectedInterest,
        selectedBlocker
      );
    }

    setStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ── Step 3: Registration Handler ───────────────────────────────────────────
  function handleStep3Register() {
    if (project) {
      analytics.trackRegistrationClick(project.id, utmSource);
    }

    if (isPlaceholderUrl()) {
      return;
    }

    const targetUrl = buildRegistrationUrl(
      REGISTRATION_URL,
      utmSource,
      "scroll_to_skill",
      refCode
    );
    window.open(targetUrl, "_blank", "noopener,noreferrer");
  }

  // ── Back Navigation ────────────────────────────────────────────────────────
  function handleBackToHero() {
    setStep(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleBackToStep1() {
    setStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleBackToStep2() {
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="app-wrapper">
      {/* ── Direct Register Placeholder Notice Modal ── */}
      {showDirectPlaceholderNotice && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="modal-card">
            <div className="modal-header">
              <span className="modal-icon" aria-hidden="true">
                ℹ️
              </span>
              <h3 id="modal-title" className="modal-title">
                Workshop Registration Link
              </h3>
            </div>
            <p className="modal-desc">
              The official workshop registration link will be added here once it
              is available.
            </p>
            <p className="modal-sub">
              Organizers and evaluators can configure <code>REGISTRATION_URL</code>{" "}
              in <code>src/config.js</code> with the live event form when ready.
            </p>
            <button
              className="btn btn-primary modal-btn"
              onClick={() => setShowDirectPlaceholderNotice(false)}
            >
              Close & Keep Exploring
            </button>
          </div>
        </div>
      )}

      {/* ── Sticky Top Header ── */}
      <header className="app-header">
        <button
          onClick={() => {
            setViewMode("student");
            handleBackToHero();
          }}
          className="app-logo"
          aria-label="From Scroll to Skill home"
        >
          <span className="logo-icon" aria-hidden="true">
            ⚡
          </span>
          <span className="logo-text">From Scroll to Skill</span>
        </button>

        <div className="app-header-right">
          {/* View Switcher Pill */}
          {viewMode === "student" ? (
            <button
              className="app-header-toolkit-btn"
              onClick={() => {
                setViewMode("toolkit");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              aria-label="Open Campus Growth Toolkit"
            >
              🛠️ Campus Growth Toolkit
            </button>
          ) : (
            <button
              className="app-header-toolkit-btn active"
              onClick={() => {
                setViewMode("student");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              aria-label="Return to student discovery journey"
            >
              ⚡ Student Journey
            </button>
          )}

          <span className="app-header-badge">
            {WORKSHOP.duration} Free Workshop
          </span>

          {viewMode === "student" && step > 0 && (
            <button
              className="app-header-skip-btn"
              onClick={handleDirectRegister}
              aria-label="Skip discovery and register directly"
            >
              Register directly
            </button>
          )}
        </div>
      </header>

      {/* ── Main Content Area ── */}
      <main className="app-main">
        {viewMode === "toolkit" ? (
          /* ── Campus Growth Toolkit View ── */
          <CampusGrowthToolkit
            onBackToExperience={() => {
              setViewMode("student");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        ) : (
          /* ── 4-Screen Student Journey Flow ── */
          <>
            {/* Subtle Progress Bar (Steps 1, 2, 3) */}
            {step > 0 && <ProgressBar currentStep={step} totalSteps={3} />}

            {/* Step 0: Opening Hero Screen */}
            {step === 0 && (
              <HeroScreen
                onStart={handleStartJourney}
                onDirectRegister={handleDirectRegister}
              />
            )}

            {/* Step 1: Reflect */}
            {step === 1 && (
              <Step1Reflect
                selectedBlocker={selectedBlocker}
                onSelect={handleBlockerSelect}
                onNext={handleStep1Next}
                onBack={handleBackToHero}
              />
            )}

            {/* Step 2: Discover */}
            {step === 2 && (
              <Step2Interest
                selectedInterest={selectedInterest}
                onSelect={handleInterestSelect}
                onNext={handleStep2Next}
                onBack={handleBackToStep1}
              />
            )}

            {/* Step 3: Mission Reveal & Registration */}
            {step === 3 && (
              <Step3Register
                project={project}
                onBack={handleBackToStep2}
                onRegister={handleStep3Register}
              />
            )}
          </>
        )}
      </main>

      {/* ── Footer ── */}
      <footer className="app-footer">
        <p className="footer-line">
          <strong>{WORKSHOP.name}</strong> &middot; {WORKSHOP.duration} &middot;{" "}
          {WORKSHOP.price}
        </p>

        <div className="footer-links-row" style={{ marginTop: 8 }}>
          <button
            className="footer-link-btn"
            onClick={() => {
              setViewMode(viewMode === "toolkit" ? "student" : "toolkit");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            {viewMode === "toolkit"
              ? "⚡ Switch to Student Journey"
              : "🛠️ Open Campus Growth Toolkit & Experiments"}
          </button>
          <span className="footer-sep" aria-hidden="true">
            &middot;
          </span>
          <span className="footer-sub">
            Campaign config: <code>src/config.js</code>
          </span>
        </div>
      </footer>
    </div>
  );
}
