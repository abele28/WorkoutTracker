// ============================================================
// APP.JSX — The Root Component
//
// Every React app has one "root" component that holds everything.
// This one manages:
//   - Which page ("tab") is currently visible
//   - The navigation bar at the bottom
//
// Notice: we never use <a href="..."> for navigation in React.
// Instead, we use state to swap out which component is shown.
// ============================================================

import { useState } from "react";
import WorkoutLogger  from "./components/WorkoutLogger";
import WorkoutHistory from "./components/WorkoutHistory";
import Progress       from "./components/Progress";
import "./App.css";

// These are the pages of our app
const TABS = [
  { id: "log",      label: "Log",     icon: "＋" },
  { id: "history",  label: "History", icon: "≡" },
  { id: "progress", label: "Progress",icon: "↑" },
];

export default function App() {
  const [activeTab, setActiveTab]     = useState("log");
  // refreshKey lets us tell History to re-render when a new session is saved
  const [refreshKey, setRefreshKey]   = useState(0);

  function handleSessionSaved() {
    setRefreshKey(k => k + 1);
    setActiveTab("history"); // jump to history after logging
  }

  return (
    <div className="app">
      {/* ── Header ── */}
      <header className="app-header">
        <div className="header-inner">
          <span className="header-logo">LIFT</span>
          <span className="header-sub">Block 1 · Week 1</span>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main className="app-main">
        {activeTab === "log" && (
          <WorkoutLogger onSessionSaved={handleSessionSaved} />
        )}
        {activeTab === "history" && (
          <WorkoutHistory refreshKey={refreshKey} />
        )}
        {activeTab === "progress" && (
          <Progress />
        )}
      </main>

      {/* ── Bottom Navigation ── */}
      <nav className="bottom-nav">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`nav-tab ${activeTab === tab.id ? "nav-tab--active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="nav-icon">{tab.icon}</span>
            <span className="nav-label">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
