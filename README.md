# Twofold 💜

**One thoughtful question a day. Two honest answers. A little closer every time.**

Twofold is a responsive couples-connection app prototype built to explore product engineering fundamentals: a complete interaction flow, clear feedback states, accessibility basics, and a deliberate path toward a secure multi-user backend.

## Current status

**Phase 1 — interactive local demo.** The current version stores demo state in the browser's `localStorage`. It is useful for testing the UI and interaction flow, but it does **not** synchronize across devices or provide real account authentication. Do not use it for private or sensitive information.

### Implemented

- Responsive desktop and mobile dashboard
- Daily prompt selection from a small built-in question bank
- Answer drafting, validation, save state, and character counter
- Demo partner switch to test both sides of the answer flow
- Reveal gate that only unlocks after both demo answers are saved
- Editable demo names and room code
- Copy room code, reset demo, status notifications, and accessible dialog labels
- Persistent local demo state with a storage-failure fallback
- Reduced-motion support and keyboard focus indicators

### Planned next

- Supabase authentication and real room membership
- Database-backed prompts and answers
- Row Level Security policies that prevent a partner from reading the other answer before reveal
- Automated tests for validation and reveal rules
- Deployment and a short demo recording

## Run locally

Requirements: Node.js 20+ and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

Build the production bundle:

```bash
npm run build
npm run preview
```

## Demo walkthrough

1. Type an answer under **Your answer** and save it.
2. Switch to the partner tab and enter a second demo answer.
3. Save the partner answer; the reveal action becomes available.
4. Reveal both answers.
5. Open **Our little space** to edit demo names or copy the room code.
6. Use **Reset demo** in the footer to clear the demo state.

Both demo identities are simulated in one browser. This is not authentication and is not evidence of cross-device synchronization.

## Tech stack

- React + TypeScript
- Vite
- Lucide icons
- CSS with responsive breakpoints and reduced-motion support
- `localStorage` for the Phase 1 demo only
- Supabase client dependency reserved for the next backend phase

## Engineering notes

- Client-side gating is for the demo only. In the real version, answer visibility must be enforced by a trusted backend/database policy, not merely hidden in React.
- The Supabase service-role key must never be shipped to a browser. Only the public anon key may be used client-side, with strict Row Level Security policies enabled.
- The current streak is sample demo data, not calculated from verified daily activity.
- No real user data or production credentials are included.

## License

MIT — see `LICENSE`.
