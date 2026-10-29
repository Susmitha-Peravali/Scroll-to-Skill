/**
 * projectIdeas.js
 * ---------------
 * Predefined, beginner-friendly AI project ideas mapped to student interests and blockers.
 * No live AI API is required – these are static, curated suggestions.
 *
 * Each project contains:
 *   - id           : unique key
 *   - name         : project title
 *   - tagline      : what it can do in one simple sentence
 *   - whyFits      : why it fits the selected interest
 *   - whyUseful    : why this project matters for the student
 *   - firstStep    : one realistic first action the student can take today
 *   - whatYouLearn : what they could learn by building it
 *   - bestForBlocker: blocker id it pairs most naturally with
 *   - emoji        : visual icon
 */

const PROJECT_IDEAS = {
  // ── Interest: Something for my placements ───────────────────────────────────
  placement: [
    {
      id: "interview-buddy",
      name: "AI Interview Practice Buddy",
      tagline:
        "An interactive assistant that poses common technical or HR interview questions and evaluates your responses.",
      whyFits:
        "Designed specifically for placement preparation, giving you private, pressure-free interview practice whenever you need it.",
      whyUseful:
        "Practising answers out loud removes anxiety and helps you articulate your project experience clearly to recruiters.",
      firstStep:
        "Create a simple webpage displaying 5 common interview questions with an input field to write your answer.",
      whatYouLearn:
        "How language models evaluate text, basic prompt engineering for feedback, and structuring conversational AI workflows.",
      bestForBlocker: ["start", "postpone", "time"],
      emoji: "🎯",
    },
    {
      id: "resume-reviewer",
      name: "Resume Keyword Checker",
      tagline:
        "A tool that compares your resume text against a job description to highlight missing keywords and skills.",
      whyFits:
        "Directly boosts your job application success by aligning your resume with automated screening systems used by companies.",
      whyUseful:
        "Many companies use automated ATS filters. Knowing exactly which keywords you missed gives you a distinct advantage.",
      firstStep:
        "Write a small JavaScript function that takes two text boxes (resume and job description) and lists common matching terms.",
      whatYouLearn:
        "Text preprocessing, token matching, and how natural language processing scores relevance between two documents.",
      bestForBlocker: ["complicated"],
      emoji: "📄",
    },
  ],

  // ── Interest: Something to solve a college problem ──────────────────────────
  college: [
    {
      id: "study-planner",
      name: "Smart Study Planner",
      tagline:
        "An intelligent timetable tool that balances your revision schedule around exam dates, subject difficulty, and free hours.",
      whyFits:
        "Tackles the daily chaos of college exams and assignments by turning a messy syllabus into an actionable daily plan.",
      whyUseful:
        "Removes decision fatigue every morning so you sit down and study immediately rather than wondering where to start.",
      firstStep:
        "Build a simple input form where you type 3 subjects and their exam dates, then print a day-by-day checklist.",
      whatYouLearn:
        "Constraint-based scheduling logic, algorithmic prioritization, and handling date-time data in interactive web apps.",
      bestForBlocker: ["postpone", "time"],
      emoji: "📅",
    },
    {
      id: "attendance-tracker",
      name: "Attendance Risk Alert",
      tagline:
        "A predictive calculator that tracks your current attendance and alerts you exactly how many classes you can miss safely.",
      whyFits:
        "Solves the high-stress college dilemma of staying safely above 75% attendance without constant mental math.",
      whyUseful:
        "Prevents surprise detentions and hall-ticket bans before final semester exams.",
      firstStep:
        "Create a small calculator: enter total conducted classes and attended classes, then output the safe-bunk buffer.",
      whatYouLearn:
        "State management in user interfaces, edge-case validation, and building predictive rule-based logic.",
      bestForBlocker: ["start", "complicated"],
      emoji: "✅",
    },
  ],

  // ── Interest: Something creative ───────────────────────────────────────────
  creativity: [
    {
      id: "story-prompt",
      name: "AI Story Starter",
      tagline:
        "A creative generator that crafts an unexpected opening sentence and three plot twists to kickstart your writing.",
      whyFits:
        "Perfect for creative students who love storytelling, world-building, or game design but get stuck staring at a blank page.",
      whyUseful:
        "Having an intriguing starting premise breaks creative blocks instantly and gets you writing in under 2 minutes.",
      firstStep:
        "Make a list of 10 unexpected protagonists and 10 unusual dilemmas. Show a randomized combination when a button is clicked.",
      whatYouLearn:
        "How generative AI samples probabilities, temperature settings for creativity, and building playful web interactions.",
      bestForBlocker: ["start", "time"],
      emoji: "✍️",
    },
    {
      id: "lyrics-generator",
      name: "Song Lyrics & Rhyme Generator",
      tagline:
        "A music assistant that suggests mood-based metaphors, rhyme pairs, and rhythm structures for songs or poems.",
      whyFits:
        "Tailored for creative expression, turning personal thoughts into structured lyrical ideas.",
      whyUseful:
        "Helps you find fresh rhymes and perspectives instead of repeating the same familiar lines.",
      firstStep:
        "Build an interface with a mood dropdown (e.g. upbeat, melancholic) and a keyword box that generates rhyming word sets.",
      whatYouLearn:
        "Working with phonetic rhyme APIs or local dictionaries, text transformations, and reactive UI feedback.",
      bestForBlocker: ["postpone", "complicated"],
      emoji: "🎵",
    },
  ],

  // ── Interest: Something to explore AI ───────────────────────────────────────
  explore: [
    {
      id: "sentiment-checker",
      name: "Positive vs. Negative Sentiment Checker",
      tagline:
        "A beginner AI tool that analyzes typed sentences to determine whether the tone is positive, negative, or neutral.",
      whyFits:
        "The ideal beginner milestone: gives you a clear, hands-on understanding of how modern AI understands human sentiment.",
      whyUseful:
        "Demystifies AI completely. You see that AI is not magic, but understandable logic you can build yourself.",
      firstStep:
        "Create a dictionary of 15 positive words and 15 negative words. Score a user's typed sentence by counting the matches.",
      whatYouLearn:
        "Foundational natural language processing (NLP), text scoring algorithms, and how AI classifies sentiment.",
      bestForBlocker: ["complicated", "time"],
      emoji: "😊",
    },
    {
      id: "image-classifier",
      name: "In-Browser Object Identifier",
      tagline:
        "A visual demo using a lightweight pre-trained AI model that identifies everyday objects directly in the browser.",
      whyFits:
        "An exciting first project that delivers instant visual results without needing heavy machine learning setups.",
      whyUseful:
        "Proves that you can run real machine learning models locally on any device without expensive servers or private keys.",
      firstStep:
        "Include a pre-trained browser model via a single script tag and load a sample image to see the top predicted label.",
      whatYouLearn:
        "Computer vision basics, classification confidence scores, and deploying pre-trained models on the client side.",
      bestForBlocker: ["start", "postpone"],
      emoji: "🖼️",
    },
  ],
};

/**
 * Intelligent project picker:
 * Matches the selected interest, and prioritizes the project that best
 * addresses the student's specific blocker if available.
 */
export function pickTailoredProject(interestId, blockerId) {
  const categoryProjects = PROJECT_IDEAS[interestId];
  if (!categoryProjects || categoryProjects.length === 0) return null;

  if (blockerId) {
    const matched = categoryProjects.find(
      (p) => p.bestForBlocker && p.bestForBlocker.includes(blockerId)
    );
    if (matched) return matched;
  }

  // Fallback to first project in the category
  return categoryProjects[0];
}

export default PROJECT_IDEAS;
