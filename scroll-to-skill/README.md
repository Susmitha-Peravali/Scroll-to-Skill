# From Scroll to Skill ⚡
### NxtWave Growth Hack Campaign Website

> An interactive growth website built for college students that turns passive phone scrolling into active project discovery, leading directly to registration for a **free 60-minute AI workshop**.

---

## 🚀 Quick start (run locally)

```bash
# 1. Enter the project folder
cd scroll-to-skill

# 2. Install dependencies (only required once)
npm install

# 3. Start development server
npm run dev
```

Open **http://localhost:5173** in your browser.

---

## ⚠️ Essential Step Before Launch: Configure Registration URL

Open [`src/config.js`](file:///c:/Users/tejap/OneDrive/Nxtwave_Assignment/scroll-to-skill/src/config.js) and update line 18 with your confirmed workshop registration URL:

```javascript
// src/config.js
export const REGISTRATION_URL =
  "https://your-confirmed-registration-link.com/workshop";
```

### Safety against broken links:
- If left as the placeholder (`your-registration-link.example.com`), the website **will not navigate to a broken domain**.
- Instead, it gracefully presents an on-screen configuration dialog explaining how to set the live URL in `src/config.js`.

---

## 🎯 Student Conversion Journey

The entire website is designed around a single psychological progression:

$$\text{Curiosity} \longrightarrow \text{Personal Relevance} \longrightarrow \text{Project Excitement} \longrightarrow \text{Workshop Registration}$$

1. **Opening Screen (`HeroScreen.jsx`):**
   - Headline: *"You have ideas. Let's build one."*
   - Typewriter animation cycling through relatable student thoughts with blinking cursor and reduced-motion support.
   - Primary CTA: *"Find My AI Project →"* (starts 45-second discovery).
   - Secondary CTA: *"Register for the Free Workshop"* (allows motivated students to skip discovery entirely).
   - Truthful benefit badges: Beginner-friendly, No prior AI project needed, Free 60-minute workshop.
2. **Step 1: Reflect (`Step1Reflect.jsx`):**
   - Question: *"What's stopping you from building something new?"*
   - 4 options:
     - I don't know where to start.
     - I have ideas, but keep postponing them.
     - AI feels too complicated.
     - I don't have much time.
   - Non-judgmental supportive encouragement tailored to their answer.
   - CTA: *"Find My Starting Point →"*.
3. **Step 2: Discover Category (`Step2Interest.jsx`):**
   - Question: *"What would you love to build?"*
   - 4 distinct categories with concrete examples:
     - Something for my placements (e.g. AI Interview Buddy, Resume Keyword Scanner)
     - Something to solve a college problem (e.g. Smart Study Planner, Attendance Risk Alert)
     - Something creative (e.g. Story Prompt Starter, Lyrical Assistant)
     - Something to explore AI (e.g. Sentiment Tone Analyzer, In-Browser Object Identifier)
   - CTA: *"Reveal My AI Project →"*.
4. **Step 3: Mission Reveal & Registration (`Step3Register.jsx`):**
   - Animated *"MISSION UNLOCKED"* banner.
   - High-impact Project Card showing:
     - Project name & tagline
     - Why it fits the selected interest
     - ⚡ One realistic first action the student can take today
     - What they'll learn by building it
   - Direct connection to workshop:
     - *"Your idea is just the beginning."*
     - *"Take the next step and learn how to turn your idea into a working AI project."*
     - Primary button: *"Register for the Free Workshop →"*.

---

## 📁 Project Architecture

```
scroll-to-skill/
├── index.html                   # Entry point with SEO and meta tags
├── vite.config.js               # Inlined PostCSS configuration to prevent parent leaks
├── src/
│   ├── main.jsx                 # React root renderer
│   ├── App.jsx                  # Campaign controller, routing, and UTM management
│   ├── App.css                  # Premium dark styling, luminous orb, & typewriter styles
│   ├── index.css                # Design tokens and accessibility resets
│   ├── config.js                # Centralized registration URL, UTM builder, and analytics
│   ├── data/
│   │   └── projectIdeas.js      # 8 curated AI project ideas with tailored matching
│   └── components/
│       ├── HeroScreen.jsx       # Opening screen with typewriter effect and skip CTA
│       ├── ProgressBar.jsx      # Unobtrusive step indicator with context subtitles
│       ├── Step1Reflect.jsx     # Blocker reflection and encouragement
│       ├── Step2Interest.jsx    # Category grid with real-world examples
│       └── Step3Register.jsx    # Mission reveal and primary workshop CTA
└── README.md
```

---

## 🧪 Growth Experiments Supported

### Test 1 — Interactive Experience vs. Standard Landing Page
* **Variant A:** This interactive experience (`/`)
* **Variant B:** Standard static landing page with event details
* **Metric:** Registration Conversion Rate $= \frac{\text{Confirmed Registrations}}{\text{Unique Visitors}} \times 100$

### Test 2 — Tailored vs. Generic AI Project Recommendations
* **Variant A:** Recommendation matched to both the student's interest and blocker (current behavior via `pickTailoredProject`)
* **Variant B:** Uniform generic project idea shown to all users
* **Metric:** Step 3 Registration CTA click-through rate

### Test 3 — Multi-Channel Attribution (Campus Ambassadors & Clubs)
* Pass `?utm_source=<channel>` in promotion links:
  * Campus Ambassadors: `?utm_source=campus-ambassador`
  * College Clubs: `?utm_source=college-club`
  * Student Communities: `?utm_source=student-community`
* The app automatically retains and appends `utm_source` and `utm_campaign` to the registration URL when the student clicks to register.

---

## 🌐 Deployment Instructions

### Deploy to Netlify
```bash
npm run build
# Drag and drop the generated 'dist/' folder onto netlify.com/drop
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

---

## 📋 Checklist for Organizer Before Going Live

1. [ ] Replace `REGISTRATION_URL` in `src/config.js` with your live Google Form, Zoom, or Luma workshop link.
2. [ ] (Optional) Connect `analytics.track*` stubs in `src/config.js` to Google Analytics 4, Mixpanel, or Plausible.
3. [ ] Generate channel tracking links using `?utm_source=` for distribution to college student groups.
