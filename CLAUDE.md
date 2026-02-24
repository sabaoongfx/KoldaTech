# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server (port 3000)
npm run build      # Production build
npm run start      # Start production server
npm run lint       # Run ESLint

# E2E tests (Playwright + pytest)
pytest tests/                          # Run all tests
pytest tests/test_onboarding.py        # Run onboarding tests
pytest tests/test_onboarding.py::TestWelcomeScreen  # Run single test class
pytest tests/test_onboarding.py::TestWelcomeScreen::test_welcome_elements -v  # Single test
```

## Architecture

**KoldaTech** is a digital marketplace connecting talent with businesses, built with Next.js 16 (App Router), React 19, and Tailwind CSS v4.

### Onboarding State Machine

The core feature is a 7-step onboarding flow orchestrated by `components/onboarding/OnboardingFlow.tsx`:

- Step 0: WelcomeScreen → Step 1: UserTypeScreen (Talent/Business) → Step 2: ProfileStep1 (name, profession, skills) → Step 3: ProfileStep2 (experience, portfolio) → Step 4: ProfileComplete → Step 5: FirstActionScreen → Step 6: DashboardScreen

`OnboardingFlow` owns all state via useState hooks. Child screen components receive data and callbacks as props. On completion, the profile is persisted to localStorage as `"kolda-user-profile"` and the user navigates to `/dashboard`.

### Routes

- `/` — Onboarding flow (client component)
- `/dashboard` — Post-onboarding dashboard, reads profile from localStorage

### UI Stack

- **shadcn/ui** (new-york style, neutral base) — components live in `components/ui/`
- **Radix UI** primitives via shadcn
- **Lucide React** icons
- **CVA** for component variants
- Path alias: `@/*` maps to project root

### Styling

Tailwind CSS v4 via `@tailwindcss/postcss`. Theme uses oklch color space with CSS variables defined in `app/globals.css`. Custom animations: `fade-in`, `step-in`.

### Testing

E2E tests use **Playwright** (Python) with **pytest**. The `conftest.py` fixture auto-starts the Next.js dev server (configurable via `TEST_PORT` env var, default 3000) and provides a fresh page context per test. Tests are organized by screen as test classes.

### Current Limitations

- Business user path is stubbed ("coming soon")
- No backend/API — all data is localStorage only
- File upload UI exists but is non-functional
- Job listings are hardcoded
