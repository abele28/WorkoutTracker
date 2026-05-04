# Lift — Workout Tracker

A personal workout logging app built with React + Vite.

## Stack
- **React 18** — UI component library
- **Vite** — build tool / dev server
- **Recharts** — charting library
- **localStorage** — data persistence (no backend required)

---

## Getting Started

### 1. Install Node.js (if you haven't)
Download from https://nodejs.org — get the LTS version.
Verify it worked: open Terminal and run:
```
node --version
```
You should see something like `v20.x.x`

---

### 2. Open this folder in Terminal
```
cd path/to/workout-tracker
```
(Or drag the folder into Terminal on Mac)

---

### 3. Install dependencies
```
npm install
```
This reads package.json and downloads React, Recharts, and Vite
into a `node_modules` folder. Takes ~30 seconds.

---

### 4. Start the dev server
```
npm run dev
```
You'll see something like:
```
  VITE ready in 300ms
  ➜  Local:   http://localhost:5173/
```
Open that URL in your browser. The app is live!

---

### 5. Open in VS Code
```
code .
```
(Install the `code` command first: VS Code → Cmd+Shift+P → "Shell Command: Install 'code' command")

---

## Deploying to Vercel (free)
1. Push this folder to a GitHub repo
2. Go to vercel.com, sign up with GitHub
3. Click "New Project" → import your repo
4. Click Deploy — that's it. You get a live URL.

---

## Project Structure
```
src/
  App.jsx                    ← root component + navigation
  App.css                    ← all styling
  main.jsx                   ← entry point (rarely edit this)
  components/
    WorkoutLogger.jsx         ← log a session
    WorkoutHistory.jsx        ← view past sessions
    Progress.jsx              ← charts + stats
  data/
    workoutTemplates.js       ← your workout plan lives here
  utils/
    storage.js                ← localStorage helpers
```

## Customizing
- **Add/change exercises**: edit `src/data/workoutTemplates.js`
- **Change colors**: edit CSS variables at top of `src/App.css`
- **Add a new page**: create a component in `src/components/`, add a tab in `App.jsx`
