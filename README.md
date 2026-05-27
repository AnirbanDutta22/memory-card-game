# MEMORA — Memory Card Game

A memory card matching game built with **Next.js**, **TypeScript**, and **Tailwind CSS**.

---

## Features

- Three difficulty levels — Easy (4×4), Medium (6×6), Hard (8×8)
- Countdown timer per level (60s / 120s / 180s)
- Score system based on moves and time taken
- Hint system — reveals all cards briefly (3 hints per game)
- Freeze Time power-up — slows the timer for ~9 seconds
- Shuffle — rearranges unmatched cards mid-game
- Wrong pair flash and matched pair glow animations
- 3D card flip animation

---

## Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
├── app/
│   ├── page.tsx          # Main game component
│   ├── page.module.css   # Component styles (card flip, buttons, etc.)
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Tailwind directives + CSS variables
├── hooks/
│   ├── Timer.ts          # Countdown timer hook
│   └── Score.ts          # Score calculation hook
└── assets/               # Card images
```

---

## Scoring

| Level    | Base Score | Move Penalty         | Time Penalty          |
|----------|-----------|----------------------|-----------------------|
| Easy     | 1000      | −20 per move over 12 | −10 per second over 30s |
| Medium   | 1500      | −15 per move over 24 | −5 per second over 60s  |
| Hard     | 2000      | −10 per move over 40 | −5 per second over 90s  |

---

## Tech Stack

- [Next.js 14](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- CSS Modules (for animations and component styles)
