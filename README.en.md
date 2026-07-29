<div align="center">

# 🔮 Desktop Tarot · 桌面塔罗

**Read your own cards.** A comic-styled desktop tarot app — all 78 cards, fully offline, no account, no subscription.

*English · [简体中文](README.md)*

![Electron](https://img.shields.io/badge/Electron-33-47848F?logo=electron&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

<img src="docs/images/02-deck.jpg" width="820" alt="All 78 tarot cards spread across a wooden tabletop">

</div>

---

## What it is

Pick a topic (or write your own question), draw three cards by intuition from the full deck spread across the table, then flip them for a complete reading.

**Entirely offline, free, no sign-up.** The interpretations ship inside the app — it works with the network off.

<table>
<tr>
<td width="50%"><img src="docs/images/06-categories-en.png" alt="Five spread types"></td>
<td width="50%"><img src="docs/images/05-reading.png" alt="Reading panel"></td>
</tr>
<tr>
<td align="center"><sub>Five spreads, including your own question</sub></td>
<td align="center"><sub>Per-position readings plus a summary</sub></td>
</tr>
</table>

<div align="center">
<img src="docs/images/04-reveal.jpg" width="760" alt="The revealed spread with card name plates">
</div>

## Features

- 🎴 **Full 78-card deck** — 22 Major + 56 Minor Arcana, classic Rider-Waite-Smith artwork, upright and reversed
- 🗂️ **Five spreads** — Love, Career, Wealth, General Fortune, plus **your own question** (ask anything)
- 🌏 **Bilingual** — English and Simplified Chinese, with all 78 cards written in both
- 🔒 **Fully offline** — interpretations are bundled; nothing is uploaded, no account needed
- 🤖 **Optional AI reading** — add your own Anthropic API key and Claude will write an interpretation for your specific question (entirely optional)
- 🎨 **Comic-book UI** — heavy ink outlines, halftone texture, a wooden tabletop, flip animations

## Quick start

Requires Node.js 18+.

```bash
git clone https://github.com/sashaqi/desktop-tarot-cards.git
cd desktop-tarot-cards
npm install
npm run dev
```

Other scripts:

```bash
npm run build      # production build
npm run typecheck  # TypeScript type checking
```

## About AI readings (optional)

**The app is complete without this** — every spread has a full local interpretation, and custom questions are keyword-routed to the closest thematic tone.

To get a reading tailored to your specific question:

1. Get an API key from the [Anthropic Console](https://console.anthropic.com/)
2. ⚙ in the top-right corner → paste and save
3. After a reading, hit "AI Reading"

The key is encrypted with your OS keychain (Electron `safeStorage`) and stored locally. It is only ever read in the main process, is never exposed to the renderer, and never goes anywhere except the Anthropic API. The settings panel shows exactly where it lives on disk.

Uses Claude Haiku 4.5 — roughly 500 input + 300 output tokens per reading, so cost is negligible.

## How this was built

**The entire project was pair-built with [Claude](https://claude.ai/code), including this README.** It went through three versions, and the git history shows the whole thing:

| Version | What changed |
|---|---|
| **v1** | Core flow working: 22 Major Arcana, three spreads, flip animation |
| **v2** | Full 78-card deck, bilingual UI, Wealth spread, tightened layout throughout |
| **v3** | Custom questions with keyword routing, optional AI readings, uncropped card faces |

A few moments worth calling out:

- **All 78 card interpretations were written by the AI** — 312 passages in total (78 cards × upright/reversed × two languages). I didn't edit a single line.
- **The card-picking backdrop went from green felt to wood** because I said the green wasn't making the cards pop. It diagnosed the actual cause — the deep-blue card backs and the green felt sat too close in both value and saturation — and offered three alternatives to choose from.
- **The AI feature almost shipped differently.** I wanted to wire an LLM in directly; it argued for a local fallback first with AI as an optional upgrade, on the grounds that offline availability matters more for a tool like this.

## Tech stack

Electron + React + TypeScript, built with [electron-vite](https://electron-vite.org/). No external state library in the renderer — one `useReducer` plus Context covers it.

## Data sources & license

Card scans and the name/suit metadata come from [equokka/tarot-json](https://github.com/equokka/tarot-json) (MIT License); the original Rider-Waite-Smith artwork is public domain in the US.

**All interpretation text was written for this project** — nothing was copied from books or websites.

Released under the [MIT License](LICENSE).

---

<div align="center">
<sub>Tarot is a mirror, not a prophecy. What matters isn't the card — it's what the card made you think about.</sub>
</div>
