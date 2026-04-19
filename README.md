# CoDentist — Interactive Prototype

Clickable, frontend-only prototype for the CoDentist dental-practice OS. Covers three pages and the full Cody AI flow.

## Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS 3
- React Router v7

All data is mocked in TypeScript modules under `src/data/` — no backend, no real AI, no speech recognition.

## Pages

- **Dashboard** (`/`) — KPIs, Cody's suggestions, hygiene & treatment-plan analysis.
- **Calendar** (`/calendar`) — Day view with 4 provider columns, appointments, filters, Today/Week/Month + Provider/Operatory toggles, hover states.
- **AI Schedule** (`/ai-schedule`) — Same calendar with Cody panel on the left. Three interactive states:
  - **Idle** → click _Schedule appointment_ → **Listening**
  - **Listening** → click _Generate_ → ~1.5s processing → **Review** (popover appears on calendar)
  - **Review** → _Accept_ adds the slot and returns to Idle
  - **Review** → _Skip_ / _Skip all_ returns to Idle without changes
  - **Listening** → _End task_ returns to Idle

## Running

```bash
npm install
npm run dev
```

App is designed for desktop width of 1440px.

## Project structure

```
src/
  components/         Shared UI (TopNav, Sidebar, Layout, Icons)
    Calendar/         Calendar grid, toolbar, appointment card
    Cody/             Cody panel + review popover
  data/               Mock data (TS modules)
  pages/              Dashboard, Calendar, AiSchedule
  App.tsx             Routes
  main.tsx            Entry
  index.css           Tailwind + base styles
```
