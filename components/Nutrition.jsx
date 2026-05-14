import { useState, useRef } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import {
  getDailyLogsSorted, getDailyLog, saveDailyLog, deleteDailyLog,
  getPhoto, savePhoto, deletePhoto, compressImage,
} from "../utils/nutrition";
import { getAvailableWeeks, exportWeekCSV, exportAllJSON } from "../utils/export";

const today = () => new Date().toISOString().slice(0, 10);

function fmt(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", weekday: "short" });
}

// Calories from macros
function macroKcal(p, c, f) {
  return (parseFloat(p) || 0) * 4 + (parseFloat(c) || 0) * 4 + (parseFloat(f) || 0) * 9;
}

// Thin horizontal progress bar
function MacroBar({ label, grams, kcal, color, totalCal }) {
  const pct = totalCal > 0 ? Math.min(100, Math.round((kcal / totalCal) * 100)) : 0;
  return (
    <div className="macro-bar-row">
      <span className="macro-bar-label">{label}</span>
      <div className="macro-bar-track">
        <div className="macro-bar-fill" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="macro-bar-stat">{grams}g <span className="macro-pct">({pct}%)</span></span>
    </div>
  );
}

// ── Daily Entry Form ──────────────────────────────────────────────────────────
function DayForm({ date, onSaved }) {
  const existing = getDailyLog(date) || {};
  const photo    = getPhoto(date);

  const [cals,    setCals]    = useState(existing.calories || "");
  const [protein, setProtein] = useState(existing.protein  || "");
  const [carbs,   setCarbs]   = useState(existing.carbs    || "");
  const [fat,     setFat]     = useState(existing.fat      || "");
  const [water,   setWater]   = useState(existing.water    || "");
  const [weight,  setWeight]  = useState(existing.weight   || "");
  const [notes,   setNotes]   = useState(existing.notes    || "");
  const [imgSrc,  setImgSrc]  = useState(photo);
  const [saving,  setSaving]  = useState(false);
  const [photoErr,setPhotoErr]= useState("");
  const fileRef = useRef();

  const totalKcal  = parseFloat(cals) || 0;
  const macroKcals = macroKcal(protein, carbs, fat);

  async function handlePhoto(e) {
    const file = e.target.files[0];
    if (!file) return;
    setPhotoErr("");
    try {
      const compressed = await compressImage(file);
      const ok = savePhoto(date, compressed);
      if (!ok) { setPhotoErr("Storage full — clear old photos."); return; }
      setImgSrc(compressed);
    } catch { setPhotoErr("Could not process image."); }
    e.target.value = "";
  }

  function handleRemovePhoto() {
    deletePhoto(date);
    setImgSrc(null);
  }

  function handleSave() {
    setSaving(true);
    saveDailyLog({
      date,
      calories: cals    ? parseFloat(cals)    : null,
      protein:  protein ? parseFloat(protein) : null,
      carbs:    carbs   ? parseFloat(carbs)   : null,
      fat:      fat     ? parseFloat(fat)     : null,
      water:    water   ? parseFloat(water)   : null,
      weight:   weight  ? parseFloat(weight)  : null,
      notes:    notes   || null,
    });
    setTimeout(() => { setSaving(false); onSaved?.(); }, 400);
  }

  return (
    <div className="day-form">
      {/* ── Macros grid ── */}
      <div className="macro-inputs">
        <div className="macro-field">
          <label className="macro-field-label">CALORIES</label>
          <input className="macro-inp" type="number" inputMode="decimal" placeholder="0"
            value={cals} onChange={e => setCals(e.target.value)} />
          <span className="macro-unit">kcal</span>
        </div>
        <div className="macro-field">
          <label className="macro-field-label">WEIGHT</label>
          <input className="macro-inp" type="number" inputMode="decimal" placeholder="0"
            value={weight} onChange={e => setWeight(e.target.value)} />
          <span className="macro-unit">lbs</span>
        </div>
        <div className="macro-field">
          <label className="macro-field-label">PROTEIN</label>
          <input className="macro-inp" type="number" inputMode="decimal" placeholder="0"
            value={protein} onChange={e => setProtein(e.target.value)} />
          <span className="macro-unit">g</span>
        </div>
        <div className="macro-field">
          <label className="macro-field-label">CARBS</label>
          <input className="macro-inp" type="number" inputMode="decimal" placeholder="0"
            value={carbs} onChange={e => setCarbs(e.target.value)} />
          <span className="macro-unit">g</span>
        </div>
        <div className="macro-field">
          <label className="macro-field-label">FAT</label>
          <input className="macro-inp" type="number" inputMode="decimal" placeholder="0"
            value={fat} onChange={e => setFat(e.target.value)} />
          <span className="macro-unit">g</span>
        </div>
        <div className="macro-field">
          <label className="macro-field-label">WATER</label>
          <input className="macro-inp" type="number" inputMode="decimal" placeholder="0"
            value={water} onChange={e => setWater(e.target.value)} />
          <span className="macro-unit">oz</span>
        </div>
      </div>

      {/* ── Macro breakdown bars ── */}
      {macroKcals > 0 && (
        <div className="macro-breakdown">
          <MacroBar label="PRO" grams={protein || 0} kcal={(parseFloat(protein)||0)*4} color="#2eb87a" totalCal={macroKcals} />
          <MacroBar label="CHO" grams={carbs   || 0} kcal={(parseFloat(carbs  )||0)*4} color="#3b7dd8" totalCal={macroKcals} />
          <MacroBar label="FAT" grams={fat     || 0} kcal={(parseFloat(fat    )||0)*9} color="#e85d26" totalCal={macroKcals} />
          {totalKcal > 0 && macroKcals > 0 && (
            <div className="macro-delta">
              macro total: {macroKcals} kcal
              {Math.abs(totalKcal - macroKcals) > 5 && (
                <span style={{ color: "var(--text-muted)" }}> · logged: {totalKcal} kcal</span>
              )}
            </div>
          )}
        </div>
      )}

      {/* ── Progress photo ── */}
      <div className="photo-row">
        {imgSrc ? (
          <div className="photo-preview-wrap">
            <img src={imgSrc} alt="progress" className="photo-preview" />
            <button className="photo-remove-btn" onClick={handleRemovePhoto}>✕</button>
          </div>
        ) : (
          <button className="photo-upload-btn" onClick={() => fileRef.current?.click()}>
            + PROGRESS PHOTO
          </button>
        )}
        <input ref={fileRef} type="file" accept="image/*" capture="environment"
          onChange={handlePhoto} style={{ display: "none" }} />
        {photoErr && <span className="photo-err">{photoErr}</span>}
      </div>

      {/* ── Notes ── */}
      <textarea className="notes-input nutri-notes" placeholder="// notes — energy, sleep, PRs, feels..."
        value={notes} onChange={e => setNotes(e.target.value)} rows={2} />

      <button className="btn-primary nutri-save-btn" onClick={handleSave}>
        {saving ? "SAVED ✓" : `SAVE ${date === today() ? "TODAY" : fmt(date)}`}
      </button>
    </div>
  );
}

// ── History row ───────────────────────────────────────────────────────────────
function HistoryRow({ log, onDelete }) {
  const [open, setOpen] = useState(false);
  const photo = getPhoto(log.date);
  const isToday = log.date === today();

  return (
    <div className="nutri-hist-card">
      <div className="nutri-hist-header" onClick={() => setOpen(v => !v)}>
        <div className="nutri-hist-left">
          <span className="nutri-hist-date">{isToday ? "TODAY" : fmt(log.date)}</span>
          {log.weight   && <span className="nutri-chip">{log.weight} lbs</span>}
          {log.calories && <span className="nutri-chip nutri-chip--kcal">{log.calories} kcal</span>}
          {log.water    && <span className="nutri-chip">{log.water} oz 💧</span>}
        </div>
        <span className="history-chevron">{open ? "▲" : "▼"}</span>
      </div>

      {open && (
        <div className="nutri-hist-body">
          <div className="nutri-hist-macros">
            {log.protein != null && <div className="nutri-macro-item"><span className="nutri-macro-val" style={{color:"#2eb87a"}}>{log.protein}g</span><span className="nutri-macro-key">protein</span></div>}
            {log.carbs   != null && <div className="nutri-macro-item"><span className="nutri-macro-val" style={{color:"#3b7dd8"}}>{log.carbs}g</span><span className="nutri-macro-key">carbs</span></div>}
            {log.fat     != null && <div className="nutri-macro-item"><span className="nutri-macro-val" style={{color:"#e85d26"}}>{log.fat}g</span><span className="nutri-macro-key">fat</span></div>}
          </div>
          {photo && <img src={photo} alt="progress" className="nutri-hist-photo" />}
          {log.notes && <p className="nutri-hist-notes">// {log.notes}</p>}
          <button className="btn-delete" onClick={() => onDelete(log.date)}>Delete Entry</button>
        </div>
      )}
    </div>
  );
}

// ── Export panel ──────────────────────────────────────────────────────────────
function ExportPanel() {
  const weeks = getAvailableWeeks();
  const [selectedWeek, setSelectedWeek] = useState(weeks[0] || "");

  if (weeks.length === 0) return (
    <div className="export-empty">// no data to export yet</div>
  );

  return (
    <div className="export-panel">
      <div className="export-row">
        <select className="set-input export-select" value={selectedWeek} onChange={e => setSelectedWeek(e.target.value)}>
          {weeks.map(w => (
            <option key={w} value={w}>Week of {fmt(w)}</option>
          ))}
        </select>
        <button className="btn-primary export-btn" onClick={() => exportWeekCSV(selectedWeek)}>
          ↓ CSV
        </button>
        <button className="btn-primary export-btn export-btn--json" onClick={exportAllJSON}>
          ↓ ALL
        </button>
      </div>
      <p className="chart-sub">// CSV includes weight, calories, macros, water, sessions, volume per day</p>
    </div>
  );
}

// ── Trend charts ──────────────────────────────────────────────────────────────
function TrendCharts({ theme }) {
  const logs = getDailyLogsSorted().slice(0, 30).reverse();
  if (logs.length < 2) return null;

  const dark = theme === "dark";
  const chartStyle = {
    grid:    dark ? "#1a3a3a" : "#e0e0e0",
    axis:    dark ? "#5a8080" : "#777",
    tipBg:   dark ? "#0a1414" : "#fff",
    tipBord: dark ? "#1a3a3a" : "#ccc",
    tipLab:  dark ? "#c0e0e0" : "#1a1a1a",
  };
  const fmt2 = (d) => new Date(d + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const tip  = { contentStyle: { background: chartStyle.tipBg, border: `1px solid ${chartStyle.tipBord}`, borderRadius: 6, fontSize: 11 }, labelStyle: { color: chartStyle.tipLab } };

  const hasWeight = logs.some(l => l.weight);
  const hasCals   = logs.some(l => l.calories);
  const hasMacros = logs.some(l => l.protein || l.carbs || l.fat);
  const hasWater  = logs.some(l => l.water);

  const data = logs.map(l => ({
    date:    fmt2(l.date),
    weight:  l.weight   || null,
    cal:     l.calories || null,
    protein: l.protein  || null,
    carbs:   l.carbs    || null,
    fat:     l.fat      || null,
    water:   l.water    || null,
  }));

  return (
    <>
      {hasWeight && (
        <div className="progress-section">
          <h3 className="chart-title">BODY_WEIGHT</h3>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartStyle.grid} />
              <XAxis dataKey="date" tick={{ fill: chartStyle.axis, fontSize: 10 }} />
              <YAxis tick={{ fill: chartStyle.axis, fontSize: 10 }} domain={["auto","auto"]} />
              <Tooltip {...tip} formatter={v => [`${v} lbs`,"Weight"]} />
              <Line type="monotone" dataKey="weight" stroke="var(--accent)" strokeWidth={2} dot={{ r:3, fill:"var(--accent)" }} connectNulls />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {hasCals && (
        <div className="progress-section">
          <h3 className="chart-title">CALORIES</h3>
          <ResponsiveContainer width="100%" height={140}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartStyle.grid} />
              <XAxis dataKey="date" tick={{ fill: chartStyle.axis, fontSize: 10 }} />
              <YAxis tick={{ fill: chartStyle.axis, fontSize: 10 }} />
              <Tooltip {...tip} formatter={v => [`${v} kcal`,"Calories"]} />
              <Bar dataKey="cal" fill="var(--accent)" radius={[3,3,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {hasMacros && (
        <div className="progress-section">
          <h3 className="chart-title">MACROS_TREND</h3>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartStyle.grid} />
              <XAxis dataKey="date" tick={{ fill: chartStyle.axis, fontSize: 10 }} />
              <YAxis tick={{ fill: chartStyle.axis, fontSize: 10 }} />
              <Tooltip {...tip} formatter={(v, name) => [`${v}g`, name]} />
              <Line type="monotone" dataKey="protein" stroke="#2eb87a" strokeWidth={2} dot={false} connectNulls />
              <Line type="monotone" dataKey="carbs"   stroke="#3b7dd8" strokeWidth={2} dot={false} connectNulls />
              <Line type="monotone" dataKey="fat"     stroke="#e85d26" strokeWidth={2} dot={false} connectNulls />
            </LineChart>
          </ResponsiveContainer>
          <div style={{ display:"flex", gap:14, padding:"6px 4px", fontSize:11, color:"var(--text-muted)" }}>
            <span style={{ color:"#2eb87a" }}>■ Protein</span>
            <span style={{ color:"#3b7dd8" }}>■ Carbs</span>
            <span style={{ color:"#e85d26" }}>■ Fat</span>
          </div>
        </div>
      )}

      {hasWater && (
        <div className="progress-section">
          <h3 className="chart-title">HYDRATION</h3>
          <ResponsiveContainer width="100%" height={130}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartStyle.grid} />
              <XAxis dataKey="date" tick={{ fill: chartStyle.axis, fontSize: 10 }} />
              <YAxis tick={{ fill: chartStyle.axis, fontSize: 10 }} />
              <Tooltip {...tip} formatter={v => [`${v} oz`,"Water"]} />
              <Bar dataKey="water" fill="#3b7dd8" radius={[3,3,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
}

// ── Main Nutrition component ──────────────────────────────────────────────────
export default function Nutrition({ theme }) {
  const [activeDate, setActiveDate] = useState(today());
  const [refresh,    setRefresh]    = useState(0);
  const [view,       setView]       = useState("log"); // log | history | trends | export

  const logs = getDailyLogsSorted();

  function handleDelete(date) {
    if (confirm(`Delete entry for ${fmt(date)}?`)) {
      deleteDailyLog(date);
      deletePhoto(date);
      setRefresh(r => r + 1);
    }
  }

  return (
    <div className="nutri-container">
      {/* ── Sub-nav ── */}
      <div className="nutri-subnav">
        {[["log","LOG"],["history","HISTORY"],["trends","TRENDS"],["export","EXPORT"]].map(([id, label]) => (
          <button key={id} className={`nutri-subnav-btn ${view === id ? "nutri-subnav-btn--active" : ""}`}
            onClick={() => setView(id)}>
            {label}
          </button>
        ))}
      </div>

      {view === "log" && (
        <>
          <div className="nutri-date-row">
            <h2 className="section-title" style={{ margin:0 }}>&gt;_ DAILY_LOG</h2>
            <input type="date" className="set-input nutri-date-input" value={activeDate}
              onChange={e => setActiveDate(e.target.value)} />
          </div>
          <DayForm key={activeDate + refresh} date={activeDate} onSaved={() => setRefresh(r => r+1)} />
        </>
      )}

      {view === "history" && (
        <>
          <h2 className="section-title">&gt;_ LOG_HISTORY</h2>
          {logs.length === 0
            ? <div className="chart-empty">// no entries yet — head to LOG to start</div>
            : logs.map(log => (
                <HistoryRow key={log.date + refresh} log={log} onDelete={handleDelete} />
              ))
          }
        </>
      )}

      {view === "trends" && (
        <>
          <h2 className="section-title">&gt;_ TRENDS</h2>
          {logs.length < 2
            ? <div className="chart-empty">// log at least 2 days to see trends</div>
            : <TrendCharts theme={theme} />
          }
        </>
      )}

      {view === "export" && (
        <>
          <h2 className="section-title">&gt;_ EXPORT_DATA</h2>
          <ExportPanel />
        </>
      )}
    </div>
  );
}
