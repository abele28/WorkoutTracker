// ============================================================
// PROGRESS COMPONENT
// Shows two charts:
//   1. Weight over time (body weight tracking)
//   2. Volume per workout (total lbs lifted = sets × reps × weight)
//
// Recharts is a charting library for React. We install it via npm.
// ============================================================

import { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, BarChart, Bar, Legend,
} from "recharts";
import { getSessions, getMetrics, saveMetric, formatDateShort } from "../utils/storage";
import { WORKOUT_TEMPLATES } from "../data/workoutTemplates";

// Calculate total volume for a session (sets × reps × weight)
function calcVolume(session) {
  let total = 0;
  session.exercises.forEach(ex => {
    ex.sets.forEach(s => {
      const w = parseFloat(s.weight) || 0;
      const r = parseFloat(s.reps)   || 0;
      total += w * r;
    });
  });
  return Math.round(total);
}

export default function Progress({ theme = "dark" }) {
  const sessions = getSessions();
  const metrics  = getMetrics();

  const dark = theme === "dark";
  const chart = {
    grid:         dark ? "#2a2a2a" : "#e0e0e0",
    axis:         dark ? "#888"    : "#777",
    tooltipBg:    dark ? "#1a1a1a" : "#ffffff",
    tooltipBorder:dark ? "#333"    : "#cccccc",
    tooltipLabel: dark ? "#fff"    : "#1a1a1a",
  };

  const [weightInput, setWeightInput] = useState("");
  const [dateInput, setDateInput]     = useState(new Date().toISOString().slice(0, 10));
  const [saved, setSaved]             = useState(false);

  // Build chart data for body weight
  const weightData = metrics.map(m => ({
    date:   formatDateShort(m.date + "T12:00:00"),
    weight: m.weight,
  }));

  // Build chart data for workout volume (last 12 sessions)
  const volumeData = [...sessions].reverse().slice(-12).map(s => ({
    date:   formatDateShort(s.date),
    volume: calcVolume(s),
    type:   s.workoutType,
    color:  WORKOUT_TEMPLATES[s.workoutType]?.color || "#888",
  }));

  function handleLogWeight() {
    if (!weightInput || !dateInput) return;
    saveMetric({ date: dateInput, weight: parseFloat(weightInput) });
    setWeightInput("");
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    window.location.reload();
  }

  return (
    <div className="progress-container">
      <h2 className="section-title">Progress</h2>

      {/* --- Body Weight Section --- */}
      <div className="progress-section">
        <h3 className="chart-title">Body Weight</h3>
        <div className="log-weight-row">
          <input
            type="number"
            className="set-input"
            placeholder="Weight (lbs)"
            value={weightInput}
            onChange={e => setWeightInput(e.target.value)}
            style={{ width: "130px" }}
          />
          <input
            type="date"
            className="set-input"
            value={dateInput}
            onChange={e => setDateInput(e.target.value)}
            style={{ width: "150px" }}
          />
          <button className="btn-primary" onClick={handleLogWeight}>
            {saved ? "Saved ✓" : "Log Weight"}
          </button>
        </div>

        {weightData.length > 1 ? (
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={weightData}>
              <CartesianGrid strokeDasharray="3 3" stroke={chart.grid} />
              <XAxis dataKey="date" stroke={chart.axis} tick={{ fill: chart.axis, fontSize: 12 }} />
              <YAxis stroke={chart.axis} tick={{ fill: chart.axis, fontSize: 12 }} domain={["auto", "auto"]} />
              <Tooltip
                contentStyle={{ background: chart.tooltipBg, border: `1px solid ${chart.tooltipBorder}`, borderRadius: "6px" }}
                labelStyle={{ color: chart.tooltipLabel }}
              />
              <Line
                type="monotone"
                dataKey="weight"
                stroke="#e85d26"
                strokeWidth={2}
                dot={{ fill: "#e85d26", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="chart-empty">Log at least 2 weigh-ins to see your trend.</div>
        )}
      </div>

      {/* --- Volume Section --- */}
      <div className="progress-section">
        <h3 className="chart-title">Workout Volume (lbs)</h3>
        <p className="chart-sub">Total weight lifted per session (last 12)</p>
        {volumeData.length > 0 ? (
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={volumeData}>
              <CartesianGrid strokeDasharray="3 3" stroke={chart.grid} />
              <XAxis dataKey="date" stroke={chart.axis} tick={{ fill: chart.axis, fontSize: 11 }} />
              <YAxis stroke={chart.axis} tick={{ fill: chart.axis, fontSize: 11 }} />
              <Tooltip
                contentStyle={{ background: chart.tooltipBg, border: `1px solid ${chart.tooltipBorder}`, borderRadius: "6px" }}
                labelStyle={{ color: chart.tooltipLabel }}
                formatter={(val, name) => [`${val.toLocaleString()} lbs`, "Volume"]}
              />
              <Bar dataKey="volume" fill="#3b7dd8" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="chart-empty">Log some sessions to see volume over time.</div>
        )}
      </div>

      {/* --- PR Summary (simple) --- */}
      {sessions.length > 0 && (
        <div className="progress-section">
          <h3 className="chart-title">Quick Stats</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">{sessions.length}</div>
              <div className="stat-label">Sessions logged</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">
                {sessions.filter(s => s.workoutType.startsWith("Upper")).length}
              </div>
              <div className="stat-label">Upper days</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">
                {sessions.filter(s => s.workoutType.startsWith("Lower")).length}
              </div>
              <div className="stat-label">Lower days</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">
                {volumeData.length > 0
                  ? Math.max(...volumeData.map(d => d.volume)).toLocaleString()
                  : "—"}
              </div>
              <div className="stat-label">Best volume (lbs)</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
