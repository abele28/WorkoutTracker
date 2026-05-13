import { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, BarChart, Bar, Cell,
} from "recharts";
import {
  getSessions, getMetrics, saveMetric, formatDateShort,
  getMainLiftSets, saveMainLiftSet,
} from "../utils/storage";
import { PROGRAM } from "../data/workoutTemplates";

function calcVolume(session) {
  let total = 0;
  session.exercises.forEach(ex => {
    ex.sets.forEach(s => {
      total += (parseFloat(s.weight) || 0) * (parseFloat(s.reps) || 0);
    });
  });
  return Math.round(total);
}

function epley(w, r) {
  if (!w || !r || r < 1) return 0;
  return Math.round((w * (1 + r / 30)) / 2.5) * 2.5;
}

function getBestFromSessions(sessions, exerciseName) {
  let best = null;
  sessions.forEach(sess => {
    sess.exercises.forEach(ex => {
      if (ex.name !== exerciseName) return;
      ex.sets.forEach(s => {
        if (!s.weight || !s.reps) return;
        const w = parseFloat(s.weight), r = parseInt(s.reps);
        if (!w || !r || r > 20) return;
        const est = epley(w, r);
        if (!best || est > best.est) best = { weight: w, reps: r, date: sess.date, est };
      });
    });
  });
  return best;
}

// Progress bar using block chars
function AsciiBar({ value, max, width = 16, color = "var(--accent)" }) {
  const filled = Math.round((value / max) * width);
  const empty  = width - filled;
  return (
    <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color }}>
      {"█".repeat(filled)}{"░".repeat(empty)}
      <span style={{ color: "var(--text-muted)", marginLeft: 6 }}>
        {Math.round((value / max) * 100)}%
      </span>
    </span>
  );
}

const MAIN_LIFTS = [
  { key: "squat", label: "Back Squat",       autoExercise: "Back Squat",        color: "#2eb87a" },
  { key: "tbdl",  label: "Trap Bar DL",      autoExercise: "Trap Bar Deadlift", color: "#3b7dd8" },
  { key: "hip",   label: "BB Hip Thrust",    autoExercise: "Barbell Hip Thrust",color: "#9b45d4" },
];

function OnermCard({ lift, sessions, mainLiftSets, dark }) {
  const [w, setW] = useState("");
  const [r, setR] = useState("");
  const [saved, setSaved] = useState(false);

  const chart = {
    grid:          dark ? "#1a3a3a" : "#e0e0e0",
    axis:          dark ? "#5a8080" : "#777",
    tooltipBg:     dark ? "#0a1414" : "#ffffff",
    tooltipBorder: dark ? "#1a3a3a" : "#cccccc",
    tooltipLabel:  dark ? "#c0e0e0" : "#1a1a1a",
  };

  const manualSets = mainLiftSets[lift.key] || [];
  const historyMap = {};
  manualSets.forEach(s => {
    const est = epley(s.weight, s.reps);
    if (!historyMap[s.date] || est > historyMap[s.date]) historyMap[s.date] = est;
  });

  if (lift.autoExercise) {
    sessions.forEach(sess => {
      const d = sess.date.slice(0, 10);
      sess.exercises.forEach(ex => {
        if (ex.name !== lift.autoExercise) return;
        ex.sets.forEach(s => {
          if (!s.weight || !s.reps) return;
          const wv = parseFloat(s.weight), rv = parseInt(s.reps);
          if (!wv || !rv || rv > 20) return;
          const est = epley(wv, rv);
          if (!historyMap[d] || est > historyMap[d]) historyMap[d] = est;
        });
      });
    });
  }

  const chartData = Object.entries(historyMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, orm]) => ({ date: formatDateShort(date + "T12:00:00"), orm }));

  const current1RM = chartData.length > 0 ? chartData[chartData.length - 1].orm : null;
  const sessionBest = lift.autoExercise ? getBestFromSessions(sessions, lift.autoExercise) : null;
  const effectiveCurrent = Math.max(current1RM || 0, sessionBest?.est || 0);

  const delta = chartData.length >= 2
    ? effectiveCurrent - chartData[0].orm
    : null;

  function handleLog() {
    if (!w || !r) return;
    saveMainLiftSet(lift.key, w, r);
    setW(""); setR("");
    setSaved(true);
    setTimeout(() => { setSaved(false); window.location.reload(); }, 800);
  }

  return (
    <div className="orm-card" style={{ borderTop: `3px solid ${lift.color}` }}>
      <div className="orm-card-header">
        <div>
          <span className="orm-lift-name">{lift.label}</span>
          {delta !== null && (
            <span style={{ fontSize: 11, marginLeft: 8, color: delta >= 0 ? "var(--green)" : "#e05050" }}>
              {delta >= 0 ? "▲" : "▼"} {Math.abs(delta)} lbs since start
            </span>
          )}
        </div>
        <div className="orm-value-block">
          {effectiveCurrent > 0
            ? <><span className="orm-value" style={{ color: lift.color }}>{effectiveCurrent}</span><span className="orm-unit"> lbs</span></>
            : <span className="orm-empty">no_data</span>
          }
          <span className="orm-label">EST_1RM</span>
        </div>
      </div>

      {chartData.length > 1 && (
        <ResponsiveContainer width="100%" height={100}>
          <LineChart data={chartData} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={chart.grid} />
            <XAxis dataKey="date" tick={{ fill: chart.axis, fontSize: 10 }} />
            <YAxis tick={{ fill: chart.axis, fontSize: 10 }} domain={["auto", "auto"]} />
            <Tooltip
              contentStyle={{ background: chart.tooltipBg, border: `1px solid ${chart.tooltipBorder}`, borderRadius: 6 }}
              labelStyle={{ color: chart.tooltipLabel }}
              formatter={v => [`${v} lbs`, "Est. 1RM"]}
            />
            <Line type="monotone" dataKey="orm" stroke={lift.color} strokeWidth={2}
              dot={{ fill: lift.color, r: 3 }} activeDot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      )}

      <div className="orm-log-row">
        <input className="set-input orm-input" type="number" inputMode="decimal"
          placeholder="Weight (lbs)" value={w} onChange={e => setW(e.target.value)} />
        <input className="set-input orm-input" type="number" inputMode="numeric"
          placeholder="Reps" value={r} onChange={e => setR(e.target.value)} />
        <button className="btn-primary orm-btn" onClick={handleLog}>
          {saved ? "OK ✓" : "Log Set"}
        </button>
      </div>
      {w && r && <div className="orm-preview">EST_1RM → <strong>{epley(+w, +r)} lbs</strong></div>}
    </div>
  );
}

export default function Progress({ theme = "dark" }) {
  const sessions     = getSessions();
  const metrics      = getMetrics();
  const mainLiftSets = getMainLiftSets();

  const dark = theme === "dark";
  const chart = {
    grid:          dark ? "#1a3a3a" : "#e0e0e0",
    axis:          dark ? "#5a8080" : "#777",
    tooltipBg:     dark ? "#0a1414" : "#ffffff",
    tooltipBorder: dark ? "#1a3a3a" : "#cccccc",
    tooltipLabel:  dark ? "#c0e0e0" : "#1a1a1a",
  };

  const [weightInput, setWeightInput] = useState("");
  const [dateInput, setDateInput]     = useState(new Date().toISOString().slice(0, 10));
  const [saved, setSaved]             = useState(false);

  // ── Computed metrics ──────────────────────────────────────────

  const totalSessions  = sessions.length;
  const upperSessions  = sessions.filter(s => s.workoutType.startsWith("Upper")).length;
  const lowerSessions  = sessions.filter(s => s.workoutType.startsWith("Lower")).length;

  const totalTonnage   = sessions.reduce((sum, s) => sum + calcVolume(s), 0);

  const volumePerSession = [...sessions].reverse().slice(-16).map(s => ({
    date:   formatDateShort(s.date),
    volume: calcVolume(s),
    type:   s.workoutType,
  }));

  // Weekly volume: group sessions by ISO week
  const weeklyVol = {};
  sessions.forEach(s => {
    const d = new Date(s.date);
    const yr = d.getFullYear();
    const wk = Math.ceil(((d - new Date(yr, 0, 1)) / 86400000 + new Date(yr, 0, 1).getDay() + 1) / 7);
    const key = `W${wk}`;
    weeklyVol[key] = (weeklyVol[key] || 0) + calcVolume(s);
  });
  const weeklyData = Object.entries(weeklyVol)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-8)
    .map(([week, vol]) => ({ week, vol }));

  // Volume by session type
  const typeVol = { "Upper A": 0, "Lower A": 0, "Upper B": 0, "Lower B": 0 };
  sessions.forEach(s => { if (typeVol[s.workoutType] !== undefined) typeVol[s.workoutType] += calcVolume(s); });
  const typeData = Object.entries(typeVol).map(([type, vol]) => ({ type, vol }));
  const typeColors = { "Upper A": "#e85d26", "Lower A": "#2eb87a", "Upper B": "#3b7dd8", "Lower B": "#9b45d4" };

  // Program progress
  const TOTAL_WEEKS = PROGRAM.length;
  const completedWeeks = new Set(sessions.map(s => s.weekNum)).size;
  const currentWeekNum = sessions.length > 0 ? Math.max(...sessions.map(s => s.weekNum)) : 0;
  const progressPct    = Math.round((completedWeeks / TOTAL_WEEKS) * 100);

  // Training frequency: avg sessions / week (last 4 weeks)
  const recentSessions = sessions.filter(s => {
    const d = new Date(s.date);
    return (Date.now() - d.getTime()) < 28 * 86400000;
  });
  const avgPerWeek = recentSessions.length > 0
    ? (recentSessions.length / 4).toFixed(1)
    : "—";

  // Best single-session volume
  const bestVolume = sessions.length > 0
    ? Math.max(...sessions.map(s => calcVolume(s)))
    : 0;

  // Pull-up stage (from logged sessions, find latest Upper B pull-up exercise)
  const pullUpStage = (() => {
    for (let i = 0; i < sessions.length; i++) {
      const ex = sessions[i].exercises.find(e => e.name?.startsWith("Pull-Up"));
      if (ex) return ex.name.replace("Pull-Up: ", "");
    }
    return null;
  })();

  const weightData = metrics.map(m => ({
    date:   formatDateShort(m.date + "T12:00:00"),
    weight: m.weight,
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
      <h2 className="section-title">&gt;_ ANALYTICS</h2>

      {/* ── Program Progress ── */}
      <div className="progress-section">
        <h3 className="chart-title">PROGRAM_PROGRESS</h3>
        <div className="terminal-grid">
          <div className="terminal-row">
            <span className="terminal-key">STATUS</span>
            <span className="terminal-val" style={{ color: "var(--accent)" }}>
              {currentWeekNum > 0 ? PROGRAM.find(w => w.weekNum === currentWeekNum)?.block || "ACTIVE" : "NOT_STARTED"}
            </span>
          </div>
          <div className="terminal-row">
            <span className="terminal-key">CURRENT_WEEK</span>
            <span className="terminal-val">{currentWeekNum > 0 ? `Week ${currentWeekNum} / ${TOTAL_WEEKS}` : "—"}</span>
          </div>
          <div className="terminal-row">
            <span className="terminal-key">COMPLETION</span>
            <span className="terminal-val">
              <AsciiBar value={completedWeeks} max={TOTAL_WEEKS} />
            </span>
          </div>
          {pullUpStage && (
            <div className="terminal-row">
              <span className="terminal-key">PULLUP_STAGE</span>
              <span className="terminal-val" style={{ color: "#3b7dd8" }}>{pullUpStage}</span>
            </div>
          )}
        </div>
      </div>

      {/* ── Quick Stats ── */}
      <div className="progress-section">
        <h3 className="chart-title">SYS_METRICS</h3>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{totalSessions}</div>
            <div className="stat-label">Sessions</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{avgPerWeek}</div>
            <div className="stat-label">Per Week (4wk avg)</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{upperSessions}</div>
            <div className="stat-label">Upper Days</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{lowerSessions}</div>
            <div className="stat-label">Lower Days</div>
          </div>
          <div className="stat-card">
            <div className="stat-value" style={{ fontSize: 22 }}>
              {totalTonnage >= 1000 ? `${(totalTonnage / 1000).toFixed(1)}k` : totalTonnage.toLocaleString()}
            </div>
            <div className="stat-label">Total Tonnage (lbs)</div>
          </div>
          <div className="stat-card">
            <div className="stat-value" style={{ fontSize: 22 }}>
              {bestVolume > 0 ? `${(bestVolume / 1000).toFixed(1)}k` : "—"}
            </div>
            <div className="stat-label">Best Session Vol</div>
          </div>
        </div>
      </div>

      {/* ── 1RM Section ── */}
      <div className="progress-section">
        <h3 className="chart-title">EST_1RM // MAIN_LIFTS</h3>
        <p className="chart-sub">Auto-pulled from logged sessions. Manual entry also works.</p>
        <div className="orm-grid">
          {MAIN_LIFTS.map(lift => (
            <OnermCard key={lift.key} lift={lift} sessions={sessions}
              mainLiftSets={mainLiftSets} dark={dark} />
          ))}
        </div>
      </div>

      {/* ── Volume by Type ── */}
      {sessions.length > 0 && (
        <div className="progress-section">
          <h3 className="chart-title">VOLUME_BY_SESSION_TYPE</h3>
          <p className="chart-sub">Cumulative lbs lifted per workout category</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={typeData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={chart.grid} />
              <XAxis dataKey="type" tick={{ fill: chart.axis, fontSize: 11 }} />
              <YAxis tick={{ fill: chart.axis, fontSize: 11 }} />
              <Tooltip
                contentStyle={{ background: chart.tooltipBg, border: `1px solid ${chart.tooltipBorder}`, borderRadius: 6 }}
                labelStyle={{ color: chart.tooltipLabel }}
                formatter={v => [`${v.toLocaleString()} lbs`, "Volume"]}
              />
              <Bar dataKey="vol" radius={[3,3,0,0]}>
                {typeData.map(entry => (
                  <Cell key={entry.type} fill={typeColors[entry.type] || "#888"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* ── Weekly Volume ── */}
      {weeklyData.length > 1 && (
        <div className="progress-section">
          <h3 className="chart-title">WEEKLY_VOLUME</h3>
          <p className="chart-sub">Total tonnage per training week (last 8)</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={weeklyData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={chart.grid} />
              <XAxis dataKey="week" tick={{ fill: chart.axis, fontSize: 11 }} />
              <YAxis tick={{ fill: chart.axis, fontSize: 11 }} />
              <Tooltip
                contentStyle={{ background: chart.tooltipBg, border: `1px solid ${chart.tooltipBorder}`, borderRadius: 6 }}
                labelStyle={{ color: chart.tooltipLabel }}
                formatter={v => [`${v.toLocaleString()} lbs`, "Volume"]}
              />
              <Bar dataKey="vol" fill="var(--accent)" radius={[3,3,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* ── Session Volume ── */}
      <div className="progress-section">
        <h3 className="chart-title">SESSION_VOLUME</h3>
        <p className="chart-sub">Lbs moved per session — last 16</p>
        {volumePerSession.length > 0 ? (
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={volumePerSession}>
              <CartesianGrid strokeDasharray="3 3" stroke={chart.grid} />
              <XAxis dataKey="date" stroke={chart.axis} tick={{ fill: chart.axis, fontSize: 11 }} />
              <YAxis stroke={chart.axis} tick={{ fill: chart.axis, fontSize: 11 }} />
              <Tooltip
                contentStyle={{ background: chart.tooltipBg, border: `1px solid ${chart.tooltipBorder}`, borderRadius: "6px" }}
                labelStyle={{ color: chart.tooltipLabel }}
                formatter={(val, _, props) => [`${val.toLocaleString()} lbs`, props.payload.type]}
              />
              <Bar dataKey="volume" radius={[3,3,0,0]}>
                {volumePerSession.map((entry, i) => (
                  <Cell key={i} fill={typeColors[entry.type] || "#3b7dd8"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="chart-empty">// log sessions to populate</div>
        )}
      </div>

      {/* ── Body Weight ── */}
      <div className="progress-section">
        <h3 className="chart-title">BODY_WEIGHT_LOG</h3>
        <div className="log-weight-row">
          <input type="number" inputMode="decimal" className="set-input"
            placeholder="Weight (lbs)" value={weightInput}
            onChange={e => setWeightInput(e.target.value)} />
          <input type="date" className="set-input" value={dateInput}
            onChange={e => setDateInput(e.target.value)} />
          <button className="btn-primary" onClick={handleLogWeight}>
            {saved ? "OK ✓" : "Log"}
          </button>
        </div>
        {weightData.length > 1 ? (
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={weightData}>
              <CartesianGrid strokeDasharray="3 3" stroke={chart.grid} />
              <XAxis dataKey="date" stroke={chart.axis} tick={{ fill: chart.axis, fontSize: 12 }} />
              <YAxis stroke={chart.axis} tick={{ fill: chart.axis, fontSize: 12 }} domain={["auto", "auto"]} />
              <Tooltip
                contentStyle={{ background: chart.tooltipBg, border: `1px solid ${chart.tooltipBorder}`, borderRadius: "6px" }}
                labelStyle={{ color: chart.tooltipLabel }}
              />
              <Line type="monotone" dataKey="weight" stroke="var(--accent)" strokeWidth={2}
                dot={{ fill: "var(--accent)", r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="chart-empty">// log 2+ weigh-ins to see trend</div>
        )}
      </div>
    </div>
  );
}
