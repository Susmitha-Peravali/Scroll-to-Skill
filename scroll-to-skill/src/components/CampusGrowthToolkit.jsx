/**
 * CampusGrowthToolkit.jsx
 * -----------------------
 * Campus Growth Toolkit for the NxtWave Growth Intern Challenge.
 *
 * Supports the campaign for:
 * "Build Your First AI Project in 60 Minutes"
 *
 * Modules included:
 *  1. Ambassador & College Source-Tagged Link Generator
 *  2. Share-Ready WhatsApp Invitation with Clipboard & Manual Fallback
 *  3. 500-Registration Campaign Target Tracker (with Evaluator Demo Simulator & Activity Log)
 *  4. Three Measurable Growth Experiments Panel
 */

import { useState, useId, useRef } from "react";
import { CAMPAIGN_TARGETS, WORKSHOP, analytics } from "../config";

// Channel definitions with proper UTM attributes
const CHANNELS = [
  {
    id: "referral",
    label: "Student Referral (Peer-to-Peer)",
    utmSource: "campus_ambassador",
    utmMedium: "peer_referral",
    codeSuffix: "REF",
  },
  {
    id: "club",
    label: "College Club Announcement",
    utmSource: "college_club",
    utmMedium: "club_channel",
    codeSuffix: "CLUB",
  },
  {
    id: "whatsapp",
    label: "WhatsApp / Discord Community",
    utmSource: "whatsapp_community",
    utmMedium: "community_chat",
    codeSuffix: "COMM",
  },
  {
    id: "placement",
    label: "Faculty / Placement Cell Circular",
    utmSource: "placement_cell",
    utmMedium: "official_circular",
    codeSuffix: "TPO",
  },
  {
    id: "linkedin",
    label: "LinkedIn / Social Post",
    utmSource: "linkedin",
    utmMedium: "ambassador_post",
    codeSuffix: "LINK",
  },
];

// Helper to generate a clean, readable referral code from user inputs
function generateReferralCode(ambassadorName, collegeName, channelId) {
  const sanitize = (str) =>
    (str || "")
      .trim()
      .replace(/[^a-zA-Z0-9]/g, "")
      .toUpperCase();

  const collegePart = sanitize(collegeName).slice(0, 5) || "CAMPUS";
  const ambPart = sanitize(ambassadorName).slice(0, 5) || "GROWTH";
  const channelObj = CHANNELS.find((c) => c.id === channelId);
  const suffix = channelObj ? channelObj.codeSuffix : "AMB";

  return `${collegePart}-${ambPart}-${suffix}`;
}

export default function CampusGrowthToolkit({ onBackToExperience }) {
  // ── Module 1 & 2: Ambassador Inputs State ──────────────────────────────────
  const [ambassadorName, setAmbassadorName] = useState("Rohit Verma");
  const [collegeName, setCollegeName] = useState("Chaitanya Bharathi Institute of Technology");
  const [selectedChannel, setSelectedChannel] = useState("referral");
  const [copyFeedback, setCopyFeedback] = useState("");
  const [linkCopyFeedback, setLinkCopyFeedback] = useState("");

  const messageTextareaRef = useRef(null);

  // Derive active channel metadata
  const activeChannel =
    CHANNELS.find((c) => c.id === selectedChannel) || CHANNELS[0];

  // Generate safe referral code
  const referralCode = generateReferralCode(
    ambassadorName,
    collegeName,
    selectedChannel
  );

  // Build the REAL current website URL with query parameters (no fake domains!)
  const baseUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${window.location.pathname}`
      : "http://localhost:5173/";

  const campaignUrl = `${baseUrl}?utm_source=${encodeURIComponent(
    activeChannel.utmSource
  )}&utm_medium=${encodeURIComponent(
    activeChannel.utmMedium
  )}&utm_campaign=scroll_to_skill&ref=${encodeURIComponent(referralCode)}`;

  // Share-Ready WhatsApp Message for final-year engineering students
  const shareMessage = `Hey! 👋 If you're looking to build a real AI project for your resume or placement interviews, check this out:

NxtWave is conducting a free, live session:
🚀 "${WORKSHOP.name}"

Key highlights:
✅ 100% Free & Beginner-Friendly
✅ Takes only 60 minutes
✅ No prior Machine Learning/AI background required
✅ Walk away with a working project idea you can showcase

Take 45 seconds to find an AI project idea that matches your interests and register here:
👉 ${campaignUrl}

Let's build something real before placement season begins!`;

  // Clipboard copy handler with manual fallback
  async function handleCopyMessage() {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareMessage);
        setCopyFeedback("Copied WhatsApp message to clipboard! ✓");
      } else {
        throw new Error("Clipboard API unavailable");
      }
    } catch {
      // Fallback: select and execCommand
      if (messageTextareaRef.current) {
        messageTextareaRef.current.select();
        document.execCommand("copy");
        setCopyFeedback("Message selected & copied to clipboard! ✓");
      } else {
        setCopyFeedback("Please manually select and copy the text below.");
      }
    }

    analytics.trackInvitationCopied();
    setTimeout(() => setCopyFeedback(""), 3500);
  }

  async function handleCopyLink() {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(campaignUrl);
        setLinkCopyFeedback("Link copied! ✓");
      } else {
        throw new Error("Clipboard API unavailable");
      }
    } catch {
      setLinkCopyFeedback("Copied URL to clipboard!");
    }
    setTimeout(() => setLinkCopyFeedback(""), 3000);
  }

  // ── Module 3: Campaign Target Tracker State (500 Goal) ────────────────────
  // Initial demo baseline (clearly marked as simulated evaluator data)
  const [simulatedCounts, setSimulatedCounts] = useState({
    ambassadors: 45,
    clubs: 32,
    whatsapp: 18,
    faculty: 8,
    linkedin: 4,
  });

  const [incrementAmount, setIncrementAmount] = useState(5);
  const [selectedChannelToAdd, setSelectedChannelToAdd] = useState("ambassadors");
  const [activityLog, setActivityLog] = useState([
    {
      id: 1,
      time: "Initial demo state",
      text: "Baseline simulated registration counts loaded for testing.",
    },
  ]);
  const [trackerMessage, setTrackerMessage] = useState("");

  // Calculate total simulated count
  const totalSimulated = Object.values(simulatedCounts).reduce(
    (acc, val) => acc + val,
    0
  );
  const totalTarget = CAMPAIGN_TARGETS.totalTarget; // 500
  const remainingTarget = Math.max(0, totalTarget - totalSimulated);
  const progressPercent = Math.min(
    100,
    Math.round((totalSimulated / totalTarget) * 100)
  );

  // Evaluator Simulation Handlers
  function handleAddSimulatedCount(e) {
    e.preventDefault();
    const countToAdd = parseInt(incrementAmount, 10);

    if (isNaN(countToAdd) || countToAdd <= 0) {
      setTrackerMessage("⚠️ Please enter a positive integer greater than 0.");
      return;
    }

    if (countToAdd > 100) {
      setTrackerMessage("⚠️ Maximum simulation increment is 100 at a time.");
      return;
    }

    const channelObj = CAMPAIGN_TARGETS.channels.find(
      (c) => c.id === selectedChannelToAdd
    );
    const channelName = channelObj ? channelObj.name : selectedChannelToAdd;

    setSimulatedCounts((prev) => {
      const current = prev[selectedChannelToAdd] || 0;
      return {
        ...prev,
        [selectedChannelToAdd]: current + countToAdd,
      };
    });

    const timestamp = new Date().toLocaleTimeString();
    setActivityLog((prev) => [
      {
        id: Date.now(),
        time: timestamp,
        text: `Added +${countToAdd} simulated registrations to ${channelName}.`,
      },
      ...prev.slice(0, 9), // Keep latest 10
    ]);

    setTrackerMessage(
      `✓ Added +${countToAdd} simulated count to ${channelName}!`
    );
    setTimeout(() => setTrackerMessage(""), 3500);
  }

  function handleResetDemoData() {
    setSimulatedCounts({
      ambassadors: 0,
      clubs: 0,
      whatsapp: 0,
      faculty: 0,
      linkedin: 0,
    });
    setActivityLog((prev) => [
      {
        id: Date.now(),
        time: new Date().toLocaleTimeString(),
        text: "Simulated counts reset to 0 by evaluator.",
      },
      ...prev.slice(0, 9),
    ]);
    setTrackerMessage("✓ Demo simulated data reset to 0.");
    setTimeout(() => setTrackerMessage(""), 3500);
  }

  return (
    <div className="toolkit-container" aria-label="Campus Growth Toolkit">
      {/* ── Top Bar with Back Button ── */}
      <div className="toolkit-nav">
        <button
          className="btn btn-ghost toolkit-back-btn"
          onClick={onBackToExperience}
          aria-label="Return to student discovery journey"
        >
          ← Return to Student Journey
        </button>
        <span className="toolkit-badge">CAMPUS PROMOTER DASHBOARD</span>
      </div>

      {/* ── Header ── */}
      <div className="toolkit-header">
        <h1 className="toolkit-title">Campus Growth Toolkit</h1>
        <p className="toolkit-subtitle">
          Promoter tools, share-ready student invitations, target tracker, and
          growth experiment panel for the workshop:{" "}
          <strong style={{ color: "var(--violet-300)" }}>
            “{WORKSHOP.name}”
          </strong>
          .
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
         SECTION 1: AMBASSADOR INPUTS & LINK GENERATOR
         ══════════════════════════════════════════════════════════════════════ */}
      <section className="toolkit-card" aria-labelledby="link-gen-heading">
        <div className="toolkit-card-header">
          <span className="toolkit-card-icon" aria-hidden="true">
            🔗
          </span>
          <div>
            <h2 id="link-gen-heading" className="toolkit-card-title">
              1. Campaign Referral Link Generator
            </h2>
            <p className="toolkit-card-desc">
              Generate tracked campaign links with UTM parameters for specific
              colleges, clubs, and channels.
            </p>
          </div>
        </div>

        <div className="toolkit-form-grid">
          {/* Ambassador / Club Name */}
          <div className="form-group">
            <label htmlFor="amb-name-input" className="form-label">
              Ambassador or Club Name
            </label>
            <input
              id="amb-name-input"
              type="text"
              className="form-input"
              value={ambassadorName}
              onChange={(e) => setAmbassadorName(e.target.value)}
              placeholder="e.g. Rohit Verma or Turing Club"
              maxLength={40}
            />
          </div>

          {/* College Name */}
          <div className="form-group">
            <label htmlFor="college-input" className="form-label">
              College / Institution
            </label>
            <input
              id="college-input"
              type="text"
              className="form-input"
              value={collegeName}
              onChange={(e) => setCollegeName(e.target.value)}
              placeholder="e.g. CBIT, BITS, IIT Madras"
              maxLength={60}
            />
          </div>

          {/* Campaign Channel */}
          <div className="form-group form-group-full">
            <label htmlFor="channel-select" className="form-label">
              Promotion Channel
            </label>
            <select
              id="channel-select"
              className="form-select"
              value={selectedChannel}
              onChange={(e) => setSelectedChannel(e.target.value)}
            >
              {CHANNELS.map((ch) => (
                <option key={ch.id} value={ch.id}>
                  {ch.label} (utm_source={ch.utmSource})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Generated Referral Code & Output URL */}
        <div className="toolkit-output-box">
          <div className="output-row">
            <span className="output-label">GENERATED REFERRAL CODE:</span>
            <code className="referral-code-badge">{referralCode}</code>
          </div>

          <div className="output-row" style={{ marginTop: 12 }}>
            <span className="output-label">SOURCE-TAGGED CAMPAIGN URL:</span>
            <div className="url-copy-row">
              <input
                type="text"
                readOnly
                className="url-display-input"
                value={campaignUrl}
                aria-label="Generated Campaign URL"
              />
              <button
                className="btn btn-primary btn-sm"
                onClick={handleCopyLink}
                aria-label="Copy Campaign URL"
              >
                {linkCopyFeedback || "Copy Link"}
              </button>
            </div>
          </div>
          <p className="url-disclaimer">
            ✓ Uses real website origin (<code>{baseUrl}</code>) with parameters{" "}
            <code>utm_source</code>, <code>utm_medium</code>, and <code>ref</code>
            .
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
         SECTION 2: SHARE-READY WHATSAPP INVITATION
         ══════════════════════════════════════════════════════════════════════ */}
      <section className="toolkit-card" aria-labelledby="invite-heading">
        <div className="toolkit-card-header">
          <span className="toolkit-card-icon" aria-hidden="true">
            💬
          </span>
          <div>
            <h2 id="invite-heading" className="toolkit-card-title">
              2. Share-Ready Invitation (WhatsApp & Student Groups)
            </h2>
            <p className="toolkit-card-desc">
              Tailored for final-year engineering students focusing on placement
              outcomes and beginner-friendly AI project building.
            </p>
          </div>
        </div>

        <div className="invite-box">
          <label htmlFor="invite-textarea" className="sr-only">
            WhatsApp Invitation Message
          </label>
          <textarea
            id="invite-textarea"
            ref={messageTextareaRef}
            readOnly
            className="invite-textarea"
            rows={10}
            value={shareMessage}
          />

          <div className="invite-action-row">
            <button
              className="btn btn-primary"
              onClick={handleCopyMessage}
              aria-label="Copy invitation message to clipboard"
            >
              📋 {copyFeedback || "Copy WhatsApp Message"}
            </button>

            <a
              className="btn btn-ghost"
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                shareMessage
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open in WhatsApp"
            >
              Open in WhatsApp ↗
            </a>
          </div>

          {copyFeedback && (
            <div className="copy-feedback-banner" role="status">
              {copyFeedback}
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
         SECTION 3: CAMPAIGN TARGET TRACKER (500 REGISTRATIONS)
         ══════════════════════════════════════════════════════════════════════ */}
      <section className="toolkit-card" aria-labelledby="tracker-heading">
        <div className="toolkit-card-header">
          <span className="toolkit-card-icon" aria-hidden="true">
            🎯
          </span>
          <div>
            <h2 id="tracker-heading" className="toolkit-card-title">
              3. Campaign Target Tracker (500 Registrations Target)
            </h2>
            <p className="toolkit-card-desc">
              Channel breakdown for the workshop campaign. Includes evaluator
              simulator for scenario modeling.
            </p>
          </div>
        </div>

        {/* Truthful Disclaimer Badge */}
        <div className="data-honest-badge" role="note">
          <span className="honest-badge-icon" aria-hidden="true">
            ℹ️
          </span>
          <span className="honest-badge-text">
            <strong>EVALUATOR SIMULATION & TARGET DATA:</strong> The registration
            counts shown below represent planning targets and evaluator demo
            data. Confirmed registration data requires connecting an official
            workshop registration form or database.
          </span>
        </div>

        {/* Overall Progress Banner */}
        <div className="target-summary-grid">
          <div className="summary-stat-box">
            <span className="stat-label">TOTAL CAMPAIGN TARGET</span>
            <span className="stat-number">{totalTarget}</span>
            <span className="stat-sub">Confirmed Goal</span>
          </div>

          <div className="summary-stat-box">
            <span className="stat-label">SIMULATED REGISTRATIONS</span>
            <span className="stat-number stat-simulated">{totalSimulated}</span>
            <span className="stat-sub">Demo counts</span>
          </div>

          <div className="summary-stat-box">
            <span className="stat-label">REMAINING TARGET</span>
            <span className="stat-number">{remainingTarget}</span>
            <span className="stat-sub">To reach 500</span>
          </div>

          <div className="summary-stat-box">
            <span className="stat-label">GOAL PROGRESS</span>
            <span className="stat-number stat-pct">{progressPercent}%</span>
            <span className="stat-sub">Capped at 100%</span>
          </div>
        </div>

        {/* Global Progress Track */}
        <div className="progress-block" style={{ margin: "20px 0 28px" }}>
          <div className="progress-label">
            <span style={{ fontWeight: 700, color: "var(--violet-300)" }}>
              Overall Campaign Completion
            </span>
            <span>
              {totalSimulated} / {totalTarget} ({progressPercent}%)
            </span>
          </div>
          <div className="progress-track" style={{ height: 8 }}>
            <div
              className="progress-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Channel Breakdown Table */}
        <div className="channel-breakdown-list">
          <h3 className="sub-heading">Channel Targets & Simulated Breakdown</h3>

          {CAMPAIGN_TARGETS.channels.map((channel) => {
            const currentSim = simulatedCounts[channel.id] || 0;
            const channelPct = Math.min(
              100,
              Math.round((currentSim / channel.target) * 100)
            );
            return (
              <div key={channel.id} className="channel-item-card">
                <div className="channel-item-header">
                  <div>
                    <span className="channel-name">{channel.name}</span>
                    <p className="channel-sub">{channel.description}</p>
                  </div>
                  <div className="channel-numbers">
                    <span className="channel-current">{currentSim}</span>
                    <span className="channel-target">/ {channel.target} target</span>
                    <span className="channel-pct">({channelPct}%)</span>
                  </div>
                </div>

                <div className="progress-track" style={{ height: 6 }}>
                  <div
                    className="progress-fill"
                    style={{
                      width: `${channelPct}%`,
                      background:
                        channelPct >= 100
                          ? "linear-gradient(90deg, #10b981, #34d399)"
                          : "linear-gradient(90deg, var(--violet-600), var(--violet-400))",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Evaluator Simulation Controls ── */}
        <div className="evaluator-simulator-box">
          <div className="simulator-title-row">
            <h3 className="sub-heading" style={{ margin: 0 }}>
              🛠️ Evaluator Demo Simulation Controls
            </h3>
            <span className="simulator-badge">TESTING TOOL</span>
          </div>
          <p className="toolkit-card-desc" style={{ marginBottom: 14 }}>
            Test adding simulated student registrations by channel to inspect
            target tracking calculations and the activity log.
          </p>

          <form
            onSubmit={handleAddSimulatedCount}
            className="simulator-form-row"
          >
            <div className="form-group" style={{ flex: 1, minWidth: 160 }}>
              <label htmlFor="sim-channel-select" className="form-label">
                Select Channel
              </label>
              <select
                id="sim-channel-select"
                className="form-select"
                value={selectedChannelToAdd}
                onChange={(e) => setSelectedChannelToAdd(e.target.value)}
              >
                {CAMPAIGN_TARGETS.channels.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} (Goal: {c.target})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group" style={{ width: 120 }}>
              <label htmlFor="sim-count-input" className="form-label">
                Simulated Count
              </label>
              <input
                id="sim-count-input"
                type="number"
                min="1"
                max="100"
                className="form-input"
                value={incrementAmount}
                onChange={(e) => setIncrementAmount(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ alignSelf: "flex-end" }}
            >
              + Add Simulated Count
            </button>

            <button
              type="button"
              className="btn btn-ghost"
              onClick={handleResetDemoData}
              style={{ alignSelf: "flex-end" }}
              aria-label="Reset all simulated demo data to 0"
            >
              Reset Demo Data
            </button>
          </form>

          {trackerMessage && (
            <div
              className="copy-feedback-banner"
              style={{ marginTop: 12 }}
              role="status"
            >
              {trackerMessage}
            </div>
          )}

          {/* Simple Activity Log */}
          <div className="activity-log-box">
            <span className="activity-log-title">RECENT SIMULATION LOG:</span>
            <ul className="activity-log-list">
              {activityLog.map((item) => (
                <li key={item.id} className="activity-log-item">
                  <span className="log-time">[{item.time}]</span>{" "}
                  <span className="log-text">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
         SECTION 4: THREE MEASURABLE GROWTH EXPERIMENTS
         ══════════════════════════════════════════════════════════════════════ */}
      <section className="toolkit-card" aria-labelledby="exp-heading">
        <div className="toolkit-card-header">
          <span className="toolkit-card-icon" aria-hidden="true">
            🧪
          </span>
          <div>
            <h2 id="exp-heading" className="toolkit-card-title">
              4. Proposed Growth Experiments (Measurable Plan)
            </h2>
            <p className="toolkit-card-desc">
              Three structured A/B tests to optimize student registration
              conversion. Clearly marked as proposed experiments.
            </p>
          </div>
        </div>

        <div className="experiments-grid">
          {/* Experiment 1 */}
          <div className="experiment-card">
            <div className="exp-badge">EXPERIMENT 1 &middot; CONTENT & HOOK</div>
            <h3 className="exp-title">Personalized Project Discovery vs. Generic Workshop Pitch</h3>
            <div className="exp-row">
              <span className="exp-label">Hypothesis:</span>
              <p className="exp-val">
                Personalized AI project recommendations matching the student's
                stated interest and blocker will yield higher registration CTA
                clicks than a generic workshop landing page.
              </p>
            </div>
            <div className="exp-row">
              <span className="exp-label">Comparison:</span>
              <p className="exp-val">
                <strong>Variant A:</strong> Interactive 4-step experience with 8
                tailored project ideas.<br />
                <strong>Variant B:</strong> Static single-screen workshop invitation.
              </p>
            </div>
            <div className="exp-row">
              <span className="exp-label">Metric to Measure:</span>
              <p className="exp-val exp-metric">
                Registration CTA Click-Through Rate = (CTA Clicks ÷ Unique Visitors) × 100
              </p>
            </div>
          </div>

          {/* Experiment 2 */}
          <div className="experiment-card">
            <div className="exp-badge">EXPERIMENT 2 &middot; CHANNEL QUALITY</div>
            <h3 className="exp-title">Ambassador Peer Referrals vs. General Social Posts</h3>
            <div className="exp-row">
              <span className="exp-label">Hypothesis:</span>
              <p className="exp-val">
                Campus ambassador peer referrals will produce a higher
                conversion to verified workshop registrations than broadcast
                social posts on LinkedIn.
              </p>
            </div>
            <div className="exp-row">
              <span className="exp-label">Comparison:</span>
              <p className="exp-val">
                <strong>Variant A:</strong> Referral links tagged with{" "}
                <code>utm_source=campus_ambassador</code>.<br />
                <strong>Variant B:</strong> Open social links tagged with{" "}
                <code>utm_source=linkedin</code>.
              </p>
            </div>
            <div className="exp-row">
              <span className="exp-label">Metric to Measure:</span>
              <p className="exp-val exp-metric">
                Verified Registration Conversion Rate by Channel = (Confirmed
                Registrations by Source ÷ Total Channel Visits) × 100
              </p>
            </div>
          </div>

          {/* Experiment 3 */}
          <div className="experiment-card">
            <div className="exp-badge">EXPERIMENT 3 &middot; INVITATION COPY</div>
            <h3 className="exp-title">Outcome-Focused Invitation vs. Generic Webinar Invite</h3>
            <div className="exp-row">
              <span className="exp-label">Hypothesis:</span>
              <p className="exp-val">
                A WhatsApp invitation highlighting placement and resume value
                will produce higher click-through and registration rates than a
                generic "Learn AI" webinar announcement.
              </p>
            </div>
            <div className="exp-row">
              <span className="exp-label">Comparison:</span>
              <p className="exp-val">
                <strong>Variant A:</strong> Placement-centric message: *"Build an
                AI project for your resume in 60 minutes."*<br />
                <strong>Variant B:</strong> Generic message: *"Join our free AI
                webinar this weekend."*
              </p>
            </div>
            <div className="exp-row">
              <span className="exp-label">Metric to Measure:</span>
              <p className="exp-val exp-metric">
                Referral Link Click Rate and Completed Workshop Sign-Ups per
                shared invitation.
              </p>
            </div>
          </div>
        </div>

        <div className="experiment-footer-note">
          ⚠️ <strong>Experiment Attribution Note:</strong> While CTA clicks and
          traffic parameters can be captured client-side via UTM tags, confirmed
          registrations require cross-referencing with the official registration
          platform's submission webhook or database.
        </div>
      </section>

      {/* ── Footer Navigation ── */}
      <div style={{ textAlign: "center", marginTop: 32 }}>
        <button
          className="btn btn-hero-primary"
          onClick={onBackToExperience}
          aria-label="Back to student experience"
        >
          ← Return to Student Journey
        </button>
      </div>
    </div>
  );
}

