# Desktop Tarot · 桌面塔罗

*English · [简体中文](README.md)*

A comic-styled desktop tarot app. Pick a topic (or write your own question), draw three cards from the full 78-card deck by intuition, and get a reading laid out across the spread positions.

## Features

- **Bilingual (English / 简体中文)** — toggle in the top-right corner; your choice is remembered
- **Five spread types**:
  - Love (Self / Other / Relationship)
  - Career (Situation / Challenge / Advice)
  - Wealth (Current / Opportunity / Advice)
  - General Fortune (Past / Present / Future)
  - **Your Own Question** (Situation / Influence / Guidance) — ask anything
- **Full 78-card deck** (22 Major Arcana + 56 Minor Arcana) using the classic Rider-Waite-Smith artwork
- **Two ways to get a reading**:
  - **Local meaning database** (default) — fully offline, free, instant. Custom questions are keyword-matched to the closest thematic tone
  - **AI reading** (optional) — add an Anthropic API key and Claude will write an interpretation tailored to your actual question
- Comic-book UI: heavy ink outlines, halftone texture, a wooden tabletop, flip animations, and speech-bubble reading panels

## Running it

Requires Node.js (18+ recommended).

```bash
npm install
npm run dev
```

`npm run dev` launches the Electron app window with hot reload in the renderer.

Other scripts:

```bash
npm run build      # production build
npm run typecheck  # TypeScript type checking
```

## AI readings (optional)

The app works fully without this — every spread has a complete local interpretation.

To enable AI readings:

1. Get an API key from the [Anthropic Console](https://console.anthropic.com/)
2. Open ⚙ Settings in the top-right corner, paste the key, and save
3. After a reading, an "AI Reading" button appears on the results screen

On key safety: the key is encrypted with your OS keychain (Electron `safeStorage`) and stored locally. It is only ever used in the main process, is never exposed to the renderer, and is never sent anywhere except the Anthropic API.

Uses Claude Haiku 4.5 — a single reading costs a fraction of a cent (roughly 500 input + 300 output tokens).

## Tech stack

Electron + React + TypeScript, built with [electron-vite](https://electron-vite.org/).

## Data sources

Card scans and the name/suit metadata come from [equokka/tarot-json](https://github.com/equokka/tarot-json) (MIT License); the original Rider-Waite-Smith artwork is public domain in the US. All card interpretation text was written for this project.
