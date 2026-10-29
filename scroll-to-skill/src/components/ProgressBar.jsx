/**
 * ProgressBar.jsx
 * ---------------
 * Minimal, unobtrusive progress indicator for discovery steps.
 *
 * Transitions:
 *  - Step 1: "Let's find your starting point."
 *  - Step 2: "Let's make it yours."
 *  - Step 3: "Your mission is unlocked."
 */

const STEP_TRANSITIONS = [
  "Let's find your starting point.",
  "Let's make it yours.",
  "Your mission is unlocked.",
];

export default function ProgressBar({ currentStep, totalSteps = 3 }) {
  const pct = Math.round((currentStep / totalSteps) * 100);
  const subtitle = STEP_TRANSITIONS[currentStep - 1] || "";

  return (
    <div
      className="progress-bar-wrapper"
      role="progressbar"
      aria-valuenow={currentStep}
      aria-valuemin={1}
      aria-valuemax={totalSteps}
      aria-label={`Step ${currentStep} of ${totalSteps}: ${subtitle}`}
    >
      <div className="progress-label">
        <span className="progress-step-text">
          STEP {currentStep} OF {totalSteps}
        </span>
        <span className="progress-subtitle-text">{subtitle}</span>
        <span className="progress-pct">{pct}%</span>
      </div>

      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
