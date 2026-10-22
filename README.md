# Twofold 💜

**One thoughtful question a day. Two honest answers. A little closer every time.**

Twofold is a responsive couples-connection web app prototype built to explore product engineering fundamentals through a simple, interactive user experience.

**Live Demo:** https://twofold-weld.vercel.app  
**Repository:** https://github.com/nainitiwari303/twofold

## Overview

Twofold gives two partners a shared space to respond to a daily relationship question. The experience focuses on thoughtful prompts, answer validation, clear feedback, and revealing responses only after both partners have saved their answers.

This project is an opportunity to explore frontend development, UI state management, accessibility basics, and user-centred product design.

## Features

- Responsive dashboard for desktop and mobile screens
- Daily prompts selected from a built-in question bank
- Answer drafting, validation, and character counting
- Demo partner switching to test both sides of the interaction
- Answer reveal gate that unlocks after both demo answers are saved
- Editable demo names and room code
- Copyable room code
- Reset functionality and status notifications
- Accessible dialog labels and feedback for key interactions
- Browser-based persistence using `localStorage`

## Technology Stack

- **Frontend:** React, TypeScript
- **Build tool:** Vite
- **Styling:** CSS
- **Persistence:** Browser `localStorage`
- **Deployment:** Vercel
- **Version control:** Git and GitHub

## Current Project Status

Twofold is currently a **Phase 1 interactive local demo**.

The app saves demo state in the browser's `localStorage`, allowing the same browser to retain state across refreshes. It does not currently provide real multi-device synchronization or production account authentication.

The partner-switching flow is intended to demonstrate the interaction between two participants; it should not be treated as a secure, real-world shared account system.

**Privacy note:** Do not enter private, sensitive, or confidential information into the demo.

## Run Locally

### Prerequisites

- Node.js and npm installed
- Git installed if you want to clone the repository

### Setup

```bash
git clone https://github.com/nainitiwari303/twofold.git
cd twofold
npm install
npm run dev
```

Open the local URL printed by Vite in your terminal, usually `http://localhost:5173`.

### Available Scripts

```bash
npm run dev
npm run build
npm run preview
```

- `npm run dev` starts the development server.
- `npm run build` creates a production build.
- `npm run preview` serves the production build locally.

## Future Improvements

Potential next steps include:

- Real shared sessions and synchronization across devices
- Secure user authentication and authorization
- Automated tests for key user flows
- Improved loading, empty, and error states
- More question categories and user preferences

These are planned improvements, not claims about existing functionality.

## What This Project Demonstrates

- Building an interactive React and TypeScript application
- Managing UI state and user input
- Designing a multi-step interaction flow
- Providing validation and user feedback
- Persisting demo state in the browser
- Deploying a frontend application with Vercel

---

Built as a portfolio project to learn and demonstrate practical product engineering.
