import { useState, useEffect } from "react";
import WorkoutLogger from "./components/WorkoutLogger";
import LiftData      from "./components/LiftData";
import Nutrition     from "./components/Nutrition";
import Overview      from "./components/Overview";
import { PROGRAM } from "./data/workoutTemplates";
import { getCurrentWeekIndex, setCurrentWeekIndex, getSessionsForWeek, seedIfNeeded, seedNutritionIfNeeded } from "./utils/storage";
import "./App.css";

const TABS = [
  { id: "log",       label: "Train",     icon: "⚡" },
  { id: "liftdata",  label: "Lift Data", icon: "◈" },
  { id: "nutrition", label: "Nutrition", icon: "❋" },
  { id: "overview",  label: "Recomp",    icon: "⊛" },
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
  const [showWeekPicker, setShowWeekPicker] = useState(false);

  const currentWeek = PROGRAM[weekIdx];
  const isLastWeek  = weekIdx >= PROGRAM.length - 1;

  useEffect(() => { seedIfNeeded(); seedNutritionIfNeeded(); }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  function handleSessionSaved(savedWeekNum) {
    setRefreshKey(k => k + 1);
    setActiveTab("log");
    const sessions       = getSessionsForWeek(savedWeekNum);
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

  function handlePickWeek(idx) {
    setWeekIdx(idx);
    setCurrentWeekIndex(idx);
    setWeekComplete(false);
    setShowWeekPicker(false);
    setActiveTab("log");
  }

  return (
    <div className="app">
      {/* ── Header ── */}
      <header className="app-header">
        <div className="header-inner">
          <div className="header-logo-block">
            <span className="header-logo">RECOMP.EXE</span>
            <span className="header-motto">prove yourself wrong, ellie.</span>
          </div>
          <button
            className="week-label-btn"
            onClick={() => setShowWeekPicker(v => !v)}
            title="Change week"
          >
            {currentWeek.label} ▾
          </button>
          <button
            className="theme-toggle"
            onClick={() => setTheme(t => t === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "☀" : "🌙"}
          </button>
        </div>
      </header>

      {/* ── Week Picker ── */}
      {showWeekPicker && (
        <div className="week-picker-overlay" onClick={() => setShowWeekPicker(false)}>
          <div className="week-picker" onClick={e => e.stopPropagation()}>
            <div className="week-picker-header">
              <span>Jump to week</span>
              <button className="week-picker-close" onClick={() => setShowWeekPicker(false)}>✕</button>
            </div>
            <div className="week-picker-list">
              {PROGRAM.map((week, idx) => (
                <button
                  key={week.weekNum}
                  className={`week-picker-item ${idx === weekIdx ? "week-picker-item--active" : ""} week-picker-item--${week.type}`}
                  onClick={() => handlePickWeek(idx)}
                >
                  <span className="wpi-label">{week.label}</span>
                  <span className="wpi-block">{week.block}</span>
                  {idx === weekIdx && <span className="wpi-current">current</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Week Complete Banner ── */}
      {weekComplete && (
        <div className="week-complete-banner">
          <div className="week-complete-content">
            <div className="week-complete-icon">[✓]</div>
            <div>
              <strong>{currentWeek.label} complete!</strong>
              {!isLastWeek && <p>{PROGRAM[weekIdx + 1].label} unlocked.</p>}
              {isLastWeek  && <p>PROGRAM_COMPLETE — all 16 weeks done.</p>}
            </div>
            <button className="btn-primary" onClick={handleAdvanceWeek}>
              {isLastWeek ? "DONE" : `NEXT →`}
            </button>
          </div>
        </div>
      )}

      {/* ── Main Content ── */}
      <main className="app-main">
        {activeTab === "log"       && <WorkoutLogger currentWeek={currentWeek} onSessionSaved={handleSessionSaved} />}
        {activeTab === "liftdata"  && <LiftData  theme={theme} />}
        {activeTab === "nutrition" && <Nutrition theme={theme} />}
        {activeTab === "overview"  && <Overview  theme={theme} />}
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
