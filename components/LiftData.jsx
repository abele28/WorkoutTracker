// ============================================================
// LIFT DATA — workout history + lift analytics in one tab
// ============================================================

import { useState } from "react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import { getSessions, getMainLiftSets, saveMainLiftSet, formatDateShort, deleteSession } from "../utils/storage";
import { WORKOUT_TEMPLATES } from "../data/workoutTemplates";

// ─── helpers ──────────────────────────────────────────────────────────────────

function calcVolume(session) {
  let t = 0;
  session.exercises.forEach(ex => ex.sets.forEach(s => {
    t += (parseFloat(s.weight) || 0) * (parseFloat(s.reps) || 0);
  }));
  return Math.round(t);
}

function epley(w, r) {
  if (!w || !r || r < 1) return 0;
  return Math.round((w * (1 + r / 30)) / 2.5) * 2.5;
}

function getBest(sessions, name) {
  let best = null;
  sessions.forEach(sess => {
    sess.exercises.forEach(ex => {
      if (ex.name !== name) return;
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

const TYPE_COLORS = {
  "Upper A": "#e85d26", "Lower A": "#2eb87a",
  "Upper B": "#3b7dd8", "Lower B": "#9b45d4",
};

// ─── 1RM card ─────────────────────────────────────────────────────────────────

const LIFTS = [
  { key: "squat", label: "Back Squat",    auto: "Back Squat",        color: "#2eb87a" },
  { key: "tbdl",  label: "Trap Bar DL",   auto: "Trap Bar Deadlift", color: "#3b7dd8" },
  { key: "hip",   label: "Hip Thrust",    auto: "Barbell Hip Thrust",color: "#9b45d4" },
];

function OnermCard({ lift, sessions, sets, dark }) {
  const [w, setW] = useState("");
  const [r, setR] = useState("");
  const [ok, setOk] = useState(false);

  const chart = {
    grid: dark ? "#1a3a3a" : "#e0e0e0",
    axis: dark ? "#5a8080" : "#777",
    tipBg: dark ? "#0a1414" : "#fff",
    tipBd: dark ? "#1a3a3a" : "#ccc",
    tipLb: dark ? "#c0e0e0" : "#1a1a1a",
  };

  const manuals = sets[lift.key] || [];
  const hist = {};
  manuals.forEach(s => {
    const e = epley(s.weight, s.reps);
    if (!hist[s.date] || e > hist[s.date]) hist[s.date] = e;
  });
  sessions.forEach(sess => {
    const d = sess.date.slice(0, 10);
    sess.exercises.forEach(ex => {
      if (ex.name !== lift.auto) return;
      ex.sets.forEach(s => {
        if (!s.weight || !s.reps) return;
        const wv = parseFloat(s.weight), rv = parseInt(s.reps);
        if (!wv || !rv || rv > 20) return;
        const e = epley(wv, rv);
        if (!hist[d] || e > hist[d]) hist[d] = e;
      });
    });
  });

  const data = Object.entries(hist)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, orm]) => ({ date: formatDateShort(date + "T12:00:00"), orm }));

  const current = data.length > 0 ? data[data.length - 1].orm : 0;
  const best    = getBest(sessions, lift.auto);
  const display = Math.max(current, best?.est || 0);
  const delta   = data.length >= 2 ? display - data[0].orm : null;

  function log() {
    if (!w || !r) return;
    saveMainLiftSet(lift.key, w, r);
    setW(""); setR(""); setOk(true);
    setTimeout(() => { setOk(false); window.location.reload(); }, 700);
  }

  const tip = { contentStyle: { background: chart.tipBg, border: `1px solid ${chart.tipBd}`, borderRadius: 6 }, labelStyle: { color: chart.tipLb } };

  return (
    <div className="orm-card" style={{ borderTop: `3px solid ${lift.color}` }}>
      <div className="orm-card-header">
        <div>
          <span className="orm-lift-name">{lift.label}</span>
          {delta !== null && (
            <span style={{ fontSize: 11, marginLeft: 8, color: delta >= 0 ? "var(--green)" : "var(--red)" }}>
              {delta >= 0 ? "▲" : "▼"} {Math.abs(delta)} lbs
            </span>
          )}
        </div>
        <div className="orm-value-block">
          {display > 0
            ? <><span className="orm-value" style={{ color: lift.color }}>{display}</span><span className="orm-unit"> lbs</span></>
            : <span className="orm-empty">no_data</span>}
          <span className="orm-label">EST_1RM</span>
        </div>
      </div>
      {data.length > 1 && (
        <ResponsiveContainer width="100%" height={90}>
          <LineChart data={data} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={chart.grid} />
            <XAxis dataKey="date" tick={{ fill: chart.axis, fontSize: 10 }} />
            <YAxis tick={{ fill: chart.axis, fontSize: 10 }} domain={["auto","auto"]} />
            <Tooltip {...tip} formatter={v => [`${v} lbs`,"Est. 1RM"]} />
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
        <button className="btn-primary orm-btn" onClick={log}>{ok ? "OK ✓" : "Log"}</button>
      </div>
      {w && r && <div className="orm-preview">→ <strong>{epley(+w, +r)} lbs</strong></div>}
    </div>
  );
}

// ─── History view ──────────────────────────────────────────────────────────────

function HistoryView({ sessions, onRefresh }) {
  const [expanded, setExpanded] = useState(null);

  if (sessions.length === 0) return (
    <div className="chart-empty">// no sessions logged yet</div>
  );

  return (
    <div style={{ padding: "0 0 12px" }}>
      <p className="section-sub" style={{ padding: "0 20px" }}>// {sessions.length} session{sessions.length !== 1 ? "s" : ""} on file</p>
      {sessions.map(session => {
        const accent = TYPE_COLORS[session.workoutType] || "#888";
        const isOpen = expanded === session.id;
        return (
          <div className="history-card" key={session.id} style={{ "--accent": accent, margin: "0 20px 10px" }}>
            <div className="history-card-header" onClick={() => setExpanded(isOpen ? null : session.id)}>
              <div className="history-card-left">
                <span className="history-day-badge" style={{ background: accent }}>{session.workoutType}</span>
                <span className="history-date">{new Date(session.date).toLocaleDateString("en-US", { month:"short", day:"numeric", year:"numeric" })}</span>
                <span style={{ fontSize:11, color:"var(--text-muted)", fontFamily:"var(--font-mono)" }}>
                  {calcVolume(session).toLocaleString()} lbs
                </span>
              </div>
              <span className="history-chevron">{isOpen ? "▲" : "▼"}</span>
            </div>
            {isOpen && (
              <div className="history-card-body">
                {session.exercises.map(ex => {
                  const done = ex.sets.filter(s => s.weight || s.reps);
                  if (!done.length) return null;
                  return (
                    <div className="history-exercise" key={ex.id}>
                      <div className="history-exercise-name">{ex.name}</div>
                      <div className="history-sets">
                        {ex.sets.map((s, i) => (
                          <span className="history-set-pill" key={i}>
                            {s.weight ? `${s.weight}×${s.reps || "?"}` : `—×${s.reps || "?"}`}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
                {session.notes && (
                  <div className="history-notes"><span className="history-notes-label">Notes: </span>{session.notes}</div>
                )}
                <button className="btn-delete" onClick={() => {
                  if (confirm("Delete this session?")) { deleteSession(session.id); onRefresh(); }
                }}>Delete Session</button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Analytics view ────────────────────────────────────────────────────────────

function AnalyticsView({ sessions, theme }) {
  const sets = getMainLiftSets();
  const dark = theme === "dark";

  const chart = {
    grid: dark ? "#1a3a3a" : "#e0e0e0",
    axis: dark ? "#5a8080" : "#777",
    tipBg: dark ? "#0a1414" : "#fff",
    tipBd: dark ? "#1a3a3a" : "#ccc",
    tipLb: dark ? "#c0e0e0" : "#1a1a1a",
  };
  const tip = { contentStyle: { background: chart.tipBg, border: `1px solid ${chart.tipBd}`, borderRadius: 6 }, labelStyle: { color: chart.tipLb } };

  const volData = [...sessions].reverse().slice(-16).map(s => ({
    date:   formatDateShort(s.date),
    volume: calcVolume(s),
    type:   s.workoutType,
  }));

  // weekly volume
  const weekVol = {};
  sessions.forEach(s => {
    const d = new Date(s.date), yr = d.getFullYear();
    const wk = Math.ceil(((d - new Date(yr,0,1))/86400000 + new Date(yr,0,1).getDay()+1)/7);
    const k = `W${wk}`;
    weekVol[k] = (weekVol[k] || 0) + calcVolume(s);
  });
  const weekData = Object.entries(weekVol).sort(([a],[b])=>a.localeCompare(b)).slice(-8).map(([w,v])=>({week:w,vol:v}));

  const upper = sessions.filter(s => s.workoutType.startsWith("Upper")).length;
  const lower = sessions.filter(s => s.workoutType.startsWith("Lower")).length;
  const bestVol = sessions.length > 0 ? Math.max(...sessions.map(calcVolume)) : 0;
  const totalTon = sessions.reduce((s,sess)=>s+calcVolume(sess),0);

  return (
    <div style={{ padding: "0 0 12px" }}>
      {/* 1RM */}
      <div className="progress-section" style={{ margin: "0 20px 14px" }}>
        <h3 className="chart-title">EST_1RM // MAIN_LIFTS</h3>
        <div className="orm-grid">
          {LIFTS.map(l => <OnermCard key={l.key} lift={l} sessions={sessions} sets={sets} dark={dark} />)}
        </div>
      </div>

      {/* Stats */}
      <div className="progress-section" style={{ margin: "0 20px 14px" }}>
        <h3 className="chart-title">LIFT_STATS</h3>
        <div className="stats-grid">
          <div className="stat-card"><div className="stat-value">{sessions.length}</div><div className="stat-label">Sessions</div></div>
          <div className="stat-card"><div className="stat-value">{upper}</div><div className="stat-label">Upper Days</div></div>
          <div className="stat-card"><div className="stat-value">{lower}</div><div className="stat-label">Lower Days</div></div>
          <div className="stat-card">
            <div className="stat-value" style={{ fontSize:22 }}>{totalTon>=1000?`${(totalTon/1000).toFixed(1)}k`:totalTon.toLocaleString()}</div>
            <div className="stat-label">Total Tonnage</div>
          </div>
        </div>
      </div>

      {/* Session volume */}
      {volData.length > 0 && (
        <div className="progress-section" style={{ margin: "0 20px 14px" }}>
          <h3 className="chart-title">SESSION_VOLUME</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={volData}>
              <CartesianGrid strokeDasharray="3 3" stroke={chart.grid} />
              <XAxis dataKey="date" tick={{ fill: chart.axis, fontSize: 11 }} />
              <YAxis tick={{ fill: chart.axis, fontSize: 11 }} />
              <Tooltip {...tip} formatter={(v, _, p) => [`${v.toLocaleString()} lbs`, p.payload.type]} />
              <Bar dataKey="volume" radius={[3,3,0,0]}>
                {volData.map((e,i) => <Cell key={i} fill={TYPE_COLORS[e.type]||"#3b7dd8"} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Weekly volume */}
      {weekData.length > 1 && (
        <div className="progress-section" style={{ margin: "0 20px 14px" }}>
          <h3 className="chart-title">WEEKLY_VOLUME</h3>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={weekData}>
              <CartesianGrid strokeDasharray="3 3" stroke={chart.grid} />
              <XAxis dataKey="week" tick={{ fill: chart.axis, fontSize: 11 }} />
              <YAxis tick={{ fill: chart.axis, fontSize: 11 }} />
              <Tooltip {...tip} formatter={v => [`${v.toLocaleString()} lbs`,"Volume"]} />
              <Bar dataKey="vol" fill="var(--accent)" radius={[3,3,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function LiftData({ theme }) {
  const [view,    setView]    = useState("analytics");
  const [refresh, setRefresh] = useState(0);
  const sessions = getSessions();

  return (
    <div>
      <div className="nutri-subnav">
        {[["analytics","ANALYTICS"],["history","HISTORY"]].map(([id, label]) => (
          <button key={id} className={`nutri-subnav-btn ${view===id?"nutri-subnav-btn--active":""}`}
            onClick={() => setView(id)}>{label}</button>
        ))}
      </div>
      {view === "analytics" && <AnalyticsView sessions={sessions} theme={theme} />}
      {view === "history"   && <HistoryView   sessions={sessions} onRefresh={() => { setRefresh(r=>r+1); window.location.reload(); }} />}
    </div>
  );
}
