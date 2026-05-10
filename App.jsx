import { useState, useEffect } from "react";
import WorkoutLogger  from "./components/WorkoutLogger";
import WorkoutHistory from "./components/WorkoutHistory";
import Progress       from "./components/Progress";
import { PROGRAM } from "./data/workoutTemplates";
import { getCurrentWeekIndex, setCurrentWeekIndex, getSessionsForWeek } from "./utils/storage";
import "./App.css";

const TABS = [
  { id: "log",      label: "Log",     icon: "＋" },
  { id: "history",  label: "History", icon: "≡" },
  { id: "progress", label: "Progress",icon: "↑" },
];

export default function App() {
  const [activeTab, setActiveTab]       = useState("log");
  const [refreshKey, setRefreshKey]     = useState(0);
  const [theme, setTheme]               = useState(() => localStorage.getItem("theme") || "dark");
  const [weekIdx, setWeekIdx]           = useState(() => {
    const saved = getCurrentWeekIndex();
    return Math.min(saved, PROGRAM.length - 1);
  });
  const [weekComplete, setWeekComplete] = useState(false);

  const currentWeek = PROGRAM[weekIdx];
  const isLastWeek  = weekIdx >= PROGRAM.length - 1;

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  function handleSessionSaved(savedWeekNum) {
    setRefreshKey(k => k + 1);
    setActiveTab("history");

    // Check if all workouts for this week are now done
    const sessions      = getSessionsForWeek(savedWeekNum);
    const completedTypes = new Set(sessions.map(s => s.workoutType));
    const required       = currentWeek.workoutOrder;
    if (required.every(r => completedTypes.has(r))) {
      setWeekComplete(true);
    }
  }

  function handleAdvanceWeek() {
    if (!isLastWeek) {
      const next = weekIdx + 1;
      setWeekIdx(next);
      setCurrentWeekIndex(next);
    }
    setWeekComplete(false);
    setActiveTab("log");
  }

  return (
    <div className="app">
      {/* ── Header ── */}
      <header className="app-header">
        <div className="header-inner">
          <span className="header-logo">LIFT</span>
          <span className="header-sub">{currentWeek.label}</span>
          <button
            className="theme-toggle"
            onClick={() => setTheme(t => t === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "☀" : "🌙"}
          </button>
        </div>
      </header>

      {/* ── Week Complete Banner ── */}
      {weekComplete && (
        <div className="week-complete-banner">
          <div className="week-complete-content">
            <div className="week-complete-icon">🎉</div>
            <div>
              <strong>{currentWeek.label} complete!</strong>
              {!isLastWeek && (
                <p>{PROGRAM[weekIdx + 1].label} is now unlocked.</p>
              )}
              {isLastWeek && <p>You've finished the summer program!</p>}
            </div>
            <button
              className="btn-primary"
              onClick={handleAdvanceWeek}
            >
              {isLastWeek ? "Done!" : `Start ${PROGRAM[weekIdx + 1].label} →`}
            </button>
          </div>
        </div>
      )}

      {/* ── Main Content ── */}
      <main className="app-main">
        {activeTab === "log" && (
          <WorkoutLogger
            currentWeek={currentWeek}
            onSessionSaved={handleSessionSaved}
          />
        )}
        {activeTab === "history" && (
          <WorkoutHistory refreshKey={refreshKey} />
        )}
        {activeTab === "progress" && (
          <Progress theme={theme} />
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
