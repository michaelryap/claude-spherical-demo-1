# My Kid's Milestone Tracker

A clean, simple web app for parents to log and celebrate their baby's developmental milestones.

Built with **Vue 3**, **Vite**, **Tailwind CSS**, and **TypeScript**.

---

## Features

- **Baby profile** — enter your child's name and date of birth once; age is calculated automatically
- **Milestone logging** — record moments across six categories: Growth, Motor Skills, Language, Social, Cognitive, and Other
- **Growth tracking** — log weight (kg) and height (cm) with any entry; latest values appear on the dashboard
- **Photo uploads** — attach a photo to any milestone; stored as base64 in memory (no server needed)
- **Summary dashboard** — four at-a-glance cards showing age, total milestones, latest weight, and latest height
- **Responsive design** — works on phones, tablets, and desktops

---

## Setup & Running Locally

### Prerequisites

- **Node.js 18+** — [download here](https://nodejs.org)

### Steps

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

Then open **http://localhost:5173** in your browser.

### Build for production

```bash
npm run build       # outputs to dist/
npm run preview     # preview the production build locally
```

---

## Project Structure

```
src/
├── types/
│   └── milestone.ts          # TypeScript types + category colour metadata
├── utils/
│   └── helpers.ts            # Age calculation and date formatting utilities
├── components/
│   ├── BabySetup.vue         # First-launch profile form (name + birth date)
│   ├── AppHeader.vue         # Sticky top bar with app name and baby info
│   ├── SummaryDashboard.vue  # Four stat cards (age, milestones, weight, height)
│   ├── MilestoneForm.vue     # Modal form for adding a new milestone
│   ├── MilestoneCard.vue     # Displays a single milestone entry
│   └── MilestoneList.vue     # Grid of cards with a friendly empty state
├── App.vue                   # Root component — owns all state, orchestrates views
├── main.ts                   # App entry point
└── style.css                 # Tailwind CSS imports
```

---

## Suggested Future Improvements

1. **Local persistence** — save milestones to `localStorage` so data survives page refreshes and browser restarts. A single `watch` on the milestones array writing to `localStorage` is all it takes.

2. **Growth charts** — plot weight and height over time using a lightweight library like [Chart.js](https://www.chartjs.org/) or [unovis](https://unovis.dev/). Visual trend lines make growth tracking much more meaningful.

3. **Per-milestone journal notes** — add a richer long-form notes field (or a separate journal tab) so parents can write full stories about each moment, not just a title and short description.
