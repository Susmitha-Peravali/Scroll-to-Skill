/**
 * Step1Reflect.jsx
 * ----------------
 * Step 1: Pause and Reflect
 *
 * Question: "What's stopping you from building something new?"
 * 4 selectable options with non-judgmental, encouraging responses.
 *
 * CTA: "Find My Starting Point →"
 */

const BLOCKERS = [
  {
    id: "start",
    icon: "🧭",
    label: "I don't know where to start.",
    response:
      "Totally normal. The easiest way to start is picking a mini-project that directly solves a real problem for you.",
  },
  {
    id: "postpone",
    icon: "⏳",
    label: "I have ideas, but keep postponing them.",
    response:
      "Happens to everyone. Taking this 45-second step today already breaks the cycle.",
  },
  {
    id: "complicated",
    icon: "🧩",
    label: "AI feels too complicated.",
    response:
      "You don't need a machine learning degree. Modern beginner AI lets you build functional apps with simple logic.",
  },
  {
    id: "time",
    icon: "⏰",
    label: "I don't have much time.",
    response:
      "You don't need weeks of free time. A single 60-minute session is all it takes to get your first project off the ground.",
  },
];

export default function Step1Reflect({
  selectedBlocker,
  onSelect,
  onNext,
  onBack,
}) {
  const activeBlocker = BLOCKERS.find((b) => b.id === selectedBlocker);

  return (
    <div className="step-card" aria-labelledby="step1-heading">
      {/* ── Subtitle Context Transition ── */}
      <div className="step-eyebrow">
        <span className="step-eyebrow-dot" aria-hidden="true" />
        Step 1 &middot; Let's find your starting point
      </div>

      {/* ── Question ── */}
      <h2 id="step1-heading" className="step-heading">
        What's stopping you from building something new?
      </h2>
      <p className="step-subtitle">
        Pick the one that feels most true. No guilt, no test — just honesty.
      </p>

      {/* ── Option Cards ── */}
      <div
        className="options-grid"
        role="radiogroup"
        aria-label="What is stopping you from building something new"
      >
        {BLOCKERS.map((b) => {
          const isSelected = selectedBlocker === b.id;
          return (
            <button
              key={b.id}
              className={`option-card ${isSelected ? "selected" : ""}`}
              onClick={() => onSelect(b.id)}
              role="radio"
              aria-checked={isSelected}
              aria-label={b.label}
            >
              <span className="option-icon" aria-hidden="true">
                {b.icon}
              </span>
              <span className="option-text">{b.label}</span>
              <span className="option-check-ring" aria-hidden="true">
                {isSelected ? "✓" : ""}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Brief Supportive Response ── */}
      {activeBlocker && (
        <div className="encouragement-box" role="status" aria-live="polite">
          <span className="encouragement-icon" aria-hidden="true">
            ✨
          </span>
          <p className="encouragement-text">{activeBlocker.response}</p>
        </div>
      )}

      {/* ── Navigation ── */}
      <div className="btn-row">
        {onBack && (
          <button
            className="btn btn-ghost"
            onClick={onBack}
            aria-label="Back to opening screen"
          >
            ← Back
          </button>
        )}
        <button
          className="btn btn-primary"
          style={{ flex: 1 }}
          onClick={onNext}
          disabled={!selectedBlocker}
          aria-disabled={!selectedBlocker}
        >
          Find My Starting Point →
        </button>
      </div>
    </div>
  );
}
