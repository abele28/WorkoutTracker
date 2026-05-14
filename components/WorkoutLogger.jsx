import { useState } from "react";
import { saveSession, generateId, getSessions } from "../utils/storage";

const LOWER_EXERCISES = new Set([
  "Back Squat", "Trap Bar Deadlift", "Barbell Hip Thrust", "Bulgarian Split Squat",
  "Leg Curl (machine)", "Leg Extension", "Standing Calf Raise", "Seated Calf Raise",
  "KB Single-Leg RDL", "KB Swings",
]);

function calcNextWeights(exercises, setData) {
  return exercises.map(ex => {
    const sets = (setData[ex.id] || []).filter(s => s.weight && s.reps);
    if (sets.length === 0) return null;
    const weights  = sets.map(s => parseFloat(s.weight));
    const reps     = sets.map(s => parseInt(s.reps));
    const avgW     = weights.reduce((a, b) => a + b, 0) / weights.length;
    const allHit   = reps.every(r => r >= ex.reps);
    const missed2  = reps.filter(r => r < ex.reps).length >= 2;
    const isLower  = LOWER_EXERCISES.has(ex.name);
    const inc      = isLower ? 5 : 2.5;
    let nextWeight;
    if (allHit)       nextWeight = Math.round((avgW + inc) / 2.5) * 2.5;
    else if (missed2) nextWeight = Math.round((avgW * 0.95) / 2.5) * 2.5;
    else              nextWeight = Math.round(avgW / 2.5) * 2.5;
    return { name: ex.name, nextWeight, status: allHit ? "up" : missed2 ? "down" : "same" };
  }).filter(Boolean);
}

// ─── Day Selector ────────────────────────────────────────────────────────────

function DaySelector({ currentWeek, onSelect }) {
  const { workouts, workoutOrder, label } = currentWeek;
  return (
    <div className="logger-container">
      <h2 className="section-title">&gt;_ LOG_SESSION</h2>
      <p className="section-sub">{label} — select protocol:</p>
      <div className="day-grid">
        {workoutOrder.map(day => {
          const t = workouts[day];
          return (
            <button key={day} className="day-card" style={{ "--accent": t.color }}
              onClick={() => onSelect(day)}>
              <span className="day-tag">{t.label}</span>
              <span className="day-focus">{t.focus}</span>
              <span className="day-count">{t.exercises.length} exercises</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Saved Screen ─────────────────────────────────────────────────────────────

function SavedScreen({ selectedDay, nextTargets, onReset }) {
  return (
    <div className="logger-container">
      <div className="saved-card">
        <div className="saved-icon">✓</div>
        <h2>SESSION_SAVED</h2>
        <p className="saved-sub">// {selectedDay} · committed to storage</p>
        {nextTargets.length > 0 && (
          <div className="next-targets">
            <div className="next-targets-title">// NEXT_SESSION_TARGETS</div>
            <div className="next-targets-list">
              {nextTargets.map(t => (
                <div className="next-target-row" key={t.name}>
                  <span className="next-target-name">{t.name}</span>
                  <span className={`next-target-weight next-target--${t.status}`}>
                    {t.nextWeight} lbs
                    {t.status === "up"   && " ↑"}
                    {t.status === "down" && " ↓"}
                    {t.status === "same" && " →"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="saved-actions">
          <button className="btn-primary" onClick={onReset}>LOG ANOTHER</button>
        </div>
      </div>
    </div>
  );
}

// ─── Exercise View ────────────────────────────────────────────────────────────

function ExerciseView({ exercise, setIndex, totalSets, totalExercises, allExercises, setData, template, onSetChange, onPrev, onNext, onFinish, notes, onNotesChange, isFirst, isLast }) {
  const currentSets = setData[exercise.id] || [];
  const setsComplete = currentSets.filter(s => s.weight && s.reps).length;

  return (
    <div className="ex-view">
      {/* ── Sticky combined header: nav + exercise info + diagram ── */}
      <div className="ex-sticky-header" style={{ borderLeftColor: template.color }}>
        {/* Navigation row */}
        <div className="ex-nav">
          <button className="ex-nav-btn" onClick={onPrev} disabled={isFirst}>‹</button>
          <div className="ex-nav-center">
            <span className="ex-counter">{setIndex + 1} / {totalExercises}</span>
            <div className="ex-dots">
              {allExercises.map((ex, i) => {
                const done = (setData[ex.id] || []).some(s => s.weight || s.reps);
                return (
                  <span key={i} className={
                    `ex-dot ${i === setIndex ? 'ex-dot--active' : done ? 'ex-dot--done' : ''}`
                  } />
                );
              })}
            </div>
          </div>
          <button className="ex-nav-btn" onClick={onNext} disabled={isLast}>›</button>
        </div>

        {/* Exercise name + diagram — always fully visible, never scrolled under anything */}
        <div className="ex-header">
          <div className="ex-meta">
            <h2 className="ex-name">{exercise.name}</h2>
            <div className="ex-prescription">
              <span className="ex-vol">{exercise.sets} × {exercise.reps}</span>
              {exercise.note && <span className="ex-note-chip">{exercise.note}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* ── Set Table ── */}
      <div className="sets-table">
        <div className="sets-table-head">
          <span>SET</span>
          <span>WEIGHT (lbs)</span>
          <span>REPS</span>
          <span>STATUS</span>
        </div>
        {currentSets.map((set, i) => {
          const done    = !!(set.weight && set.reps);
          const hitReps = done && parseInt(set.reps) >= exercise.reps;
          return (
            <div key={i} className={`set-row-gym ${done ? 'set-row-gym--done' : ''}`}>
              <div className={`set-badge ${done ? 'set-badge--done' : ''}`}>{i + 1}</div>
              <input
                className="set-inp"
                type="number"
                inputMode="decimal"
                placeholder="0"
                value={set.weight}
                onChange={e => onSetChange(exercise.id, i, "weight", e.target.value)}
              />
              <input
                className="set-inp"
                type="number"
                inputMode="numeric"
                placeholder={String(exercise.reps)}
                value={set.reps}
                onChange={e => onSetChange(exercise.id, i, "reps", e.target.value)}
              />
              <span className={`set-status-icon ${done ? (hitReps ? 'icon--hit' : 'icon--miss') : 'icon--pending'}`}>
                {done ? (hitReps ? '✓' : '✗') : '○'}
              </span>
            </div>
          );
        })}
        {setsComplete > 0 && setsComplete < exercise.sets && (
          <div className="sets-progress-bar">
            <div className="sets-progress-fill" style={{ width: `${(setsComplete / exercise.sets) * 100}%` }} />
          </div>
        )}
      </div>

      {/* ── Notes (shown on last exercise) ── */}
      {isLast && (
        <div className="notes-section">
          <label className="notes-label">// session_notes</label>
          <textarea
            className="notes-input"
            placeholder="How'd it feel? PRs? Form cues..."
            value={notes}
            onChange={e => onNotesChange(e.target.value)}
            rows={2}
          />
        </div>
      )}

      {/* ── Action ── */}
      <div className="ex-action">
        {isLast ? (
          <button className="btn-finish" onClick={onFinish}>
            COMMIT SESSION ///
          </button>
        ) : (
          <button className="btn-next-ex" onClick={onNext}>
            <span className="btn-next-label">NEXT</span>
            <span className="btn-next-name">{allExercises[setIndex + 1]?.name} →</span>
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function WorkoutLogger({ currentWeek, onSessionSaved }) {
  const [selectedDay, setSelectedDay]     = useState(null);
  const [setData, setSetData]             = useState({});
  const [notes, setNotes]                 = useState("");
  const [saved, setSaved]                 = useState(false);
  const [nextTargets, setNextTargets]     = useState([]);
  const [exIdx, setExIdx]                 = useState(0);

  const { workouts, workoutOrder, weekNum, label } = currentWeek;

  function handleSelectDay(dayName) {
    setSelectedDay(dayName);
    setSetData({});
    setNotes("");
    setSaved(false);
    setNextTargets([]);
    setExIdx(0);

    const template = workouts[dayName];
    const initial  = {};
    template.exercises.forEach(ex => {
      initial[ex.id] = Array.from({ length: ex.sets }, () => ({ weight: "", reps: String(ex.reps) }));
    });

    const prev = getSessions().find(s => s.workoutType === dayName);
    if (prev) {
      prev.exercises.forEach(prevEx => {
        const match = template.exercises.find(e => e.name === prevEx.name);
        if (!match || !initial[match.id]) return;
        const lastSet = prevEx.sets.find(s => s.weight);
        if (lastSet) {
          initial[match.id] = initial[match.id].map(() => ({ weight: lastSet.weight, reps: String(match.reps) }));
        }
      });
    }
    setSetData(initial);
  }

  function handleSetChange(exId, setIndex, field, value) {
    setSetData(prev => {
      const updated = { ...prev };
      updated[exId] = updated[exId].map((s, i) =>
        i === setIndex ? { ...s, [field]: value } : s
      );
      return updated;
    });
  }

  function handleFinish() {
    const template = workouts[selectedDay];
    const next     = calcNextWeights(template.exercises, setData);
    const session  = {
      id:          generateId(),
      date:        new Date().toISOString(),
      weekNum,
      weekLabel:   label,
      workoutType: selectedDay,
      exercises:   template.exercises.map(ex => ({
        id:   ex.id,
        name: ex.name,
        sets: setData[ex.id] || [],
      })),
      notes,
    };
    saveSession(session);
    setNextTargets(next);
    setSaved(true);
    onSessionSaved?.(weekNum);
  }

  // ── Renders ──

  if (!selectedDay) {
    return <DaySelector currentWeek={currentWeek} onSelect={handleSelectDay} />;
  }

  if (saved) {
    return (
      <SavedScreen
        selectedDay={selectedDay}
        nextTargets={nextTargets}
        onReset={() => setSelectedDay(null)}
      />
    );
  }

  const template   = workouts[selectedDay];
  const exercises  = template.exercises;
  const ex         = exercises[exIdx];

  return (
    <ExerciseView
      exercise={ex}
      setIndex={exIdx}
      totalExercises={exercises.length}
      allExercises={exercises}
      setData={setData}
      template={template}
      onSetChange={handleSetChange}
      onPrev={() => setExIdx(i => i - 1)}
      onNext={() => setExIdx(i => i + 1)}
      onFinish={handleFinish}
      notes={notes}
      onNotesChange={setNotes}
      isFirst={exIdx === 0}
      isLast={exIdx === exercises.length - 1}
    />
  );
}
