# First commit
# Cursor Pro — Online 1v1 Sports Heads Soccer Game

## Overview

**Cursor Pro** is a fast-paced, browser-based 1v1 soccer game inspired by the classic Sports Heads style. Players compete in quick matches with big-headed characters, aiming to score goals before time runs out.

This project focuses on instant play with simple matchmaking, smooth multiplayer, and optional user accounts to track stats and receive updates.

---

## User Experience Flow

- Visit the game URL and start playing instantly — no waiting screens.
- The game loads immediately in fullscreen or a centered canvas.
- Minimal topbar includes:
  - Game logo/name
  - Optional “How to Play” tooltip/modal
- Matchmaking starts automatically or when the player clicks “Play Now.”
- Matchmaking pairs players immediately on a first-come, first-served basis.
- If no opponent is found within a short timeout, players can:
  - Wait for a human opponent, **or**
  - Play against a simple AI bot.
- Matches are 1v1 soccer games with side-view big-headed characters.
- After each match:
  - Show win/lose screen
  - Provide “Play Again” button
  - Optionally prompt signup to save stats and receive updates

---

## Core Features

### Gameplay

- Side-view 1v1 soccer with big-headed characters
- Controls: arrow keys for movement + jump + kick
- Match timer similar to soccer game duration
- Visible scoreboard during matches
- Simple sound effects and animations for feedback

### Matchmaking

- FIFO queue system (first-come, first-served)
- No skill matching or ranking for MVP
- Optionally fallback to AI opponent if no players available

### User Accounts (Future-ready)

- Guest mode: play instantly without signing up
- Optional signup popup collecting email + username
- Accounts save match stats (wins, losses)
- Email list integration for newsletters and updates

---

## UI Elements

- Minimal header with logo and signup button
- Popup signup form modal
- Post-match results screen with replay and signup options

---

## Tech Stack

### Frontend

- Phaser.js or PixiJS for lightweight, browser-friendly 2D rendering
- Vanilla JS or React for UI components (header, signup popup)
- WebSocket client (Socket.IO or Colyseus client) for real-time multiplayer

### Backend

- Node.js server with WebSocket support (Socket.IO or Colyseus)
- Simple matchmaking queue stored in memory or Redis
- Server-authoritative game loop for cheat prevention and state sync
- Temporary player sessions stored during matches

### Database

- PostgreSQL or MongoDB for user accounts, stats, and email list
- Redis for matchmaking queues and session caching

---

## Milestones & Phases

### Phase 1 — Instant Play Prototype

- Build basic 1v1 gameplay (local multiplayer or simple bot)
- Simple UI with “Play Now” button to start matches

### Phase 2 — Online Multiplayer MVP

- Implement matchmaking queue and real-time multiplayer via WebSocket
- Server authoritative logic to sync player states
- Display match score and timer in-game

### Phase 3 — User Accounts & Email Signup

- Add optional signup popup modal
- Develop smarter AI bot for fallback matches
- Save user stats and build email list
- Setup email campaign infrastructure (e.g., Mailchimp)

### Phase 4 — Polish & Optimization

- Responsive mobile UI improvements
- Add sounds, animations, and cosmetic options
- Anti-cheat system improvements

---

## Additional Notes

- Keep the experience simple: no account creation required to start playing
- Matchmaking is purely FIFO, no skill tiers or rankings initially
- Email signup is strictly opt-in and appears only after gameplay
- Aim for under 10 seconds from URL load to gameplay start
- Prioritize smooth, low-latency multiplayer over fancy graphics

---

## Future Plans

- Enhance AI bot with reinforcement learning
- Add cosmetic customization and skins
- Introduce competitive leaderboards and tournaments

---

## License

[MIT License](LICENSE)

---

*Enjoy playing Cursor Pro! Feel free to contribute or open issues for bugs and feature requests.*
