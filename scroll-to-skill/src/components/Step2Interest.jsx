/**
 * Step2Interest.jsx
 * -----------------
 * Step 2: Discover Interest Category
 *
 * Question: "What would you love to build?"
 * 4 categories with clear descriptions and real-world examples:
 *  - Something for my placements
 *  - Something to solve a college problem
 *  - Something creative
 *  - Something to explore AI
 *
 * CTA: "Reveal My AI Project →"
 */

const CATEGORIES = [
  {
    id: "placement",
    emoji: "💼",
    title: "Something for my placements",
    description: "Build job-ready projects that impress recruiters.",
    example: "e.g. AI Interview Buddy or Resume Keyword Scanner",
  },
  {
    id: "college",
    emoji: "🏫",
    title: "Something to solve a college problem",
    description: "Automate everyday campus headaches and deadlines.",
    example: "e.g. Smart Study Planner or Attendance Risk Alert",
  },
  {
    id: "creativity",
    emoji: "🎨",
    title: "Something creative",
    description: "Turn ideas into lyrics, stories, or creative tools.",
    example: "e.g. Story Prompt Starter or Lyrical Assistant",
  },
  {
    id: "explore",
    emoji: "🚀",
    title: "Something to explore AI",
    description: "Try hands-on AI experiments with instant visual results.",
    example: "e.g. Sentiment Tone Analyzer or In-Browser Object Identifier",
  },
];

export default function Step2Interest({
  selectedInterest,
  onSelect,
  onNext,
  onBack,
}) {
  return (
    <div className="step-card" aria-labelledby="step2-heading">
      {/* ── Subtitle Context Transition ── */}
      <div className="step-eyebrow">
        <span className="step-eyebrow-dot" aria-hidden="true" />
        Step 2 &middot; Let's make it yours
      </div>

      {/* ── Question ── */}
      <h2 id="step2-heading" className="step-heading">
        What would you love to build?
      </h2>
      <p className="step-subtitle">
        Pick the category that excites you most. We'll match a beginner-friendly
        project tailored to you.
      </p>

      {/* ── Category Cards Grid ── */}
      <div
        className="category-grid"
        role="radiogroup"
        aria-label="What would you love to build"
      >
        {CATEGORIES.map((cat) => {
          const isSelected = selectedInterest === cat.id;
          return (
            <button
              key={cat.id}
              className={`category-card ${isSelected ? "selected" : ""}`}
              onClick={() => onSelect(cat.id)}
              role="radio"
              aria-checked={isSelected}
              aria-label={`${cat.title}: ${cat.description} ${cat.example}`}
            >
              <div className="category-header">
                <span className="category-emoji" aria-hidden="true">
                  {cat.emoji}
                </span>
                <span className="category-check-ring" aria-hidden="true">
                  {isSelected ? "✓" : ""}
                </span>
              </div>

              <h3 className="category-title">{cat.title}</h3>
              <p className="category-desc">{cat.description}</p>
              <span className="category-example">{cat.example}</span>
            </button>
          );
        })}
      </div>

      {/* ── Navigation ── */}
      <div className="btn-row">
        <button
          className="btn btn-ghost"
          onClick={onBack}
          aria-label="Back to step 1"
        >
          ← Back
        </button>
        <button
          className="btn btn-primary"
          style={{ flex: 1 }}
          onClick={onNext}
          disabled={!selectedInterest}
          aria-disabled={!selectedInterest}
        >
          Reveal My AI Project →
        </button>
      </div>
    </div>
  );
}
