// ============================================================
// OVERVIEW — the whole recomp picture in one place
// ============================================================

import {
  LineChart, Line, ComposedChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { getSessions, formatDateShort, getCurrentWeekIndex } from "../utils/storage";
import { getDailyLogsSorted } from "../utils/nutrition";
import { getCardioSessions, ACTIVITY_TYPES } from "../utils/cardio";
import { PROGRAM } from "../data/workoutTemplates";

function calcVolume(session) {
  let t = 0;
  session.exercises.forEach(ex => ex.sets.forEach(s => {
    t += (parseFloat(s.weight) || 0) * (parseFloat(s.reps) || 0);
  }));
  return Math.round(t);
}

// ASCII-style block progress bar
function BlockBar({ value, max, color = "var(--accent)" }) {
  const pct     = Math.min(100, Math.round((value / max) * 100));
  const filled  = Math.round((value / max) * 20);
  const empty   = 20 - filled;
  return (
    <div style={{ fontFamily: "var(--font-mono)", fontSize: 13 }}>
      <span style={{ color }}>{"█".repeat(filled)}</span>
      <span style={{ color: "var(--border-2)" }}>{"░".repeat(empty)}</span>
      <span style={{ color: "var(--text-muted)", marginLeft: 8 }}>{pct}%</span>
    </div>
  );
}

export default function Overview({ theme }) {
  const sessions = getSessions();
  const logs     = getDailyLogsSorted();
  const cardio   = getCardioSessions();
  const dark     = theme === "dark";

  // ── Program progress ──
  const weekIdx = Math.min(getCurrentWeekIndex(), PROGRAM.length - 1);
  const currentWeek = PROGRAM[weekIdx];
  const completedWeeks = new Set(sessions.map(s => s.weekNum)).size;

  // ── Aggregate stats ──
  const totalSessions = sessions.length;
  const totalCardio   = cardio.length;
  const totalTonnage  = sessions.reduce((s, sess) => s + calcVolume(sess), 0);

  const weights    = logs.filter(l => l.weight).map(l => l.weight);
  const latestW    = weights.length > 0 ? weights[0] : null;
  const calEntries = logs.filter(l => l.calories);
  const avgCals    = calEntries.length > 0
    ? Math.round(calEntries.reduce((s, l) => s + l.calories, 0) / calEntries.length)
    : null;

  // ── Build last 30-day combined timeline ──
  const dayMap = {};

  // Seed with last 30 days
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    dayMap[key] = { date: formatDateShort(key + "T12:00:00"), weight: null, cal: null, lifts: 0, cardiMin: 0, vol: 0 };
  }

  logs.forEach(l => {
    if (dayMap[l.date]) {
      dayMap[l.date].weight = l.weight || null;
      dayMap[l.date].cal    = l.calories || null;
    }
  });
  sessions.forEach(s => {
    const d = s.date.slice(0, 10);
    if (dayMap[d]) { dayMap[d].lifts++; dayMap[d].vol += calcVolume(s); }
  });
  cardio.forEach(s => {
    if (dayMap[s.date]) dayMap[s.date].cardiMin += (s.duration || 0);
  });

  const timelineData = Object.values(dayMap);

  // ── Last 7 days summary rows ──
  const last7 = Object.entries(dayMap).slice(-7).reverse();

  // ── Cardio type breakdown ──
  const cardioBreakdown = {};
  cardio.forEach(s => { cardioBreakdown[s.type] = (cardioBreakdown[s.type] || 0) + 1; });

  const chart = {
    grid: dark ? "#1a3a3a" : "#e0e0e0",
    axis: dark ? "#5a8080" : "#777",
    tipBg: dark ? "#0a1414" : "#fff",
    tipBd: dark ? "#1a3a3a" : "#ccc",
    tipLb: dark ? "#c0e0e0" : "#1a1a1a",
  };
  const tip = { contentStyle: { background: chart.tipBg, border: `1px solid ${chart.tipBd}`, borderRadius: 6, fontSize: 11 }, labelStyle: { color: chart.tipLb } };

  return (
    <div className="overview-container">
      <h2 className="section-title">&gt;_ RECOMP_OVERVIEW</h2>

      {/* ── Program progress ── */}
      <div className="progress-section ov-section">
        <div className="terminal-grid">
          <div className="terminal-row">
            <span className="terminal-key">PROGRAM</span>
            <span className="terminal-val" style={{ color: "var(--accent)" }}>{currentWeek?.block || "—"}</span>
          </div>
          <div className="terminal-row">
            <span className="terminal-key">WEEK</span>
            <span className="terminal-val">{currentWeek?.label || "—"}</span>
          </div>
          <div className="terminal-row">
            <span className="terminal-key">COMPLETION</span>
            <span className="terminal-val">
              <BlockBar value={completedWeeks} max={PROGRAM.length} />
            </span>
          </div>
        </div>
      </div>

      {/* ── Key stats ── */}
      <div className="ov-stats-grid ov-section">
        {[
          { label: "LIFT SESSIONS", value: totalSessions, color: "#e85d26" },
          { label: "CARDIO SESSIONS", value: totalCardio, color: "#3b7dd8" },
          { label: latestW ? "CURRENT WEIGHT" : "WEIGHT", value: latestW ? `${latestW} lbs` : "—", color: "var(--accent)" },
          { label: "AVG CALORIES", value: avgCals ? `${avgCals} kcal` : "—", color: "#2eb87a" },
          { label: "TOTAL TONNAGE", value: totalTonnage >= 1000 ? `${(totalTonnage/1000).toFixed(1)}k lbs` : `${totalTonnage} lbs`, color: "#9b45d4" },
          { label: "WEEKS LOGGED", value: completedWeeks, color: "#c4881e" },
        ].map(c => (
          <div key={c.label} className="ov-stat-card">
            <div className="ov-stat-val" style={{ color: c.color }}>{c.value}</div>
            <div className="ov-stat-label">{c.label}</div>
          </div>
        ))}
      </div>

      {/* ── Last 7 days at a glance ── */}
      <div className="progress-section ov-section">
        <h3 className="chart-title">LAST_7_DAYS</h3>
        <div className="ov-week-table">
          <div className="ov-week-head">
            <span>DATE</span><span>WEIGHT</span><span>CALS</span><span>LIFTS</span><span>CARDIO</span>
          </div>
          {last7.map(([date, d]) => (
            <div key={date} className="ov-week-row">
              <span className="ov-week-date">{d.date}</span>
              <span>{d.weight ? `${d.weight}` : "—"}</span>
              <span>{d.cal    ? `${d.cal}`    : "—"}</span>
              <span style={{ color: d.lifts > 0 ? "#e85d26" : "var(--text-muted)" }}>{d.lifts > 0 ? d.lifts : "—"}</span>
              <span style={{ color: d.cardiMin > 0 ? "#3b7dd8" : "var(--text-muted)" }}>{d.cardiMin > 0 ? `${d.cardiMin}m` : "—"}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Body weight + calories combined chart ── */}
      {timelineData.some(d => d.weight || d.cal) && (
        <div className="progress-section ov-section">
          <h3 className="chart-title">WEIGHT + CALORIES // 30 DAYS</h3>
          <ResponsiveContainer width="100%" height={200}>
            <ComposedChart data={timelineData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={chart.grid} />
              <XAxis dataKey="date" tick={{ fill: chart.axis, fontSize: 9 }} interval={6} />
              <YAxis yAxisId="w" orientation="left"  tick={{ fill: chart.axis, fontSize: 10 }} domain={["auto","auto"]} />
              <YAxis yAxisId="c" orientation="right" tick={{ fill: chart.axis, fontSize: 10 }} />
              <Tooltip {...tip} />
              <Line yAxisId="w" type="monotone" dataKey="weight" stroke="var(--accent)"  strokeWidth={2} dot={false} connectNulls name="Weight (lbs)" />
              <Bar  yAxisId="c" dataKey="cal"    fill="#2eb87a" fillOpacity={0.4} radius={[2,2,0,0]} name="Calories (kcal)" />
            </ComposedChart>
          </ResponsiveContainer>
          <div style={{ display:"flex", gap:16, padding:"6px 4px", fontSize:11, color:"var(--text-muted)" }}>
            <span style={{ color:"var(--accent)" }}>— Weight</span>
            <span style={{ color:"#2eb87a" }}>■ Calories</span>
          </div>
        </div>
      )}

      {/* ── Lifting + cardio activity ── */}
      {timelineData.some(d => d.vol > 0 || d.cardiMin > 0) && (
        <div className="progress-section ov-section">
          <h3 className="chart-title">TRAINING_ACTIVITY // 30 DAYS</h3>
          <ResponsiveContainer width="100%" height={160}>
            <ComposedChart data={timelineData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={chart.grid} />
              <XAxis dataKey="date" tick={{ fill: chart.axis, fontSize: 9 }} interval={6} />
              <YAxis yAxisId="v" orientation="left"  tick={{ fill: chart.axis, fontSize: 10 }} />
              <YAxis yAxisId="m" orientation="right" tick={{ fill: chart.axis, fontSize: 10 }} />
              <Tooltip {...tip} />
              <Bar  yAxisId="v" dataKey="vol"      fill="#e85d26" fillOpacity={0.7} radius={[2,2,0,0]} name="Lift volume (lbs)" />
              <Bar  yAxisId="m" dataKey="cardiMin" fill="#3b7dd8" fillOpacity={0.7} radius={[2,2,0,0]} name="Cardio (min)" />
            </ComposedChart>
          </ResponsiveContainer>
          <div style={{ display:"flex", gap:16, padding:"6px 4px", fontSize:11, color:"var(--text-muted)" }}>
            <span style={{ color:"#e85d26" }}>■ Lift volume</span>
            <span style={{ color:"#3b7dd8" }}>■ Cardio min</span>
          </div>
        </div>
      )}

      {/* ── Cardio breakdown ── */}
      {Object.keys(cardioBreakdown).length > 0 && (
        <div className="progress-section ov-section">
          <h3 className="chart-title">ACTIVITY_BREAKDOWN</h3>
          <div className="ov-cardio-breakdown">
            {Object.entries(cardioBreakdown).map(([type, count]) => {
              const act = ACTIVITY_TYPES.find(a => a.id === type);
              return (
                <div key={type} className="ov-cardio-item">
                  <span className="cardio-type-badge" style={{ background: act?.color || "var(--accent)", color: "#000" }}>
                    {act?.icon} {act?.label || type}
                  </span>
                  <span className="ov-cardio-count">{count}×</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {(totalSessions === 0 && logs.length === 0 && cardio.length === 0) && (
        <div className="chart-empty">// start logging to see your recomp story here</div>
      )}
    </div>
  );
}
