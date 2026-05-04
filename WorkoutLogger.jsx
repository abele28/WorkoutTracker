// ============================================================
// WORKOUT LOGGER COMPONENT
//
// A "component" in React is just a function that returns UI.
// This one handles logging a single workout session:
//   1. You pick which day (Upper A, Upper B, etc.)
//   2. For each exercise, you fill in weight and reps per set
//   3. You hit "Finish" and it saves to localStorage
// ============================================================

import { useState } from "react";
import { WORKOUT_TEMPLATES, WORKOUT_ORDER } from "../data/workoutTemplates";
import { saveSession, generateId } from "../utils/storage";

export default function WorkoutLogger({ onSessionSaved }) {
  // useState lets us track values that change over time.
  // When state changes, React re-renders the component automatically.
  const [selectedDay, setSelectedDay] = useState(null);
  const [setData, setSetData]         = useState({});   // { exerciseId: [{ weight, reps }, ...] }
  const [notes, setNotes]             = useState("");
  const [saved, setSaved]             = useState(false);

  // Called when user picks a workout day
  function handleSelectDay(dayName) {
    setSelectedDay(dayName);
    setSetData({});
    setNotes("");
    setSaved(false);
    // Pre-populate empty set entries based on the template
    const template = WORKOUT_TEMPLATES[dayName];
    const initial = {};
    template.exercises.forEach(ex => {
      initial[ex.id] = Array.from({ length: ex.sets }, () => ({ weight: "", reps: "" }));
    });
    setSetData(initial);
  }

  // Update a single set's weight or reps
  function handleSetChange(exId, setIndex, field, value) {
    setSetData(prev => {
      const updated = { ...prev };
      updated[exId] = updated[exId].map((s, i) =>
        i === setIndex ? { ...s, [field]: value } : s
      );
      return updated;
    });
  }

  // Save the finished session
  function handleFinish() {
    const session = {
      id:          generateId(),
      date:        new Date().toISOString(),
      workoutType: selectedDay,
      exercises:   WORKOUT_TEMPLATES[selectedDay].exercises.map(ex => ({
        id:    ex.id,
        name:  ex.name,
        sets:  setData[ex.id] || [],
      })),
      notes,
    };
    saveSession(session);
    setSaved(true);
    onSessionSaved?.(); // tell parent a new session was saved
  }

  // ---- RENDER: Day Selector ----
  if (!selectedDay) {
    return (
      <div className="logger-container">
        <h2 className="section-title">Log Today's Workout</h2>
        <p className="section-sub">Pick your session for today:</p>
        <div className="day-grid">
          {WORKOUT_ORDER.map(day => {
            const t = WORKOUT_TEMPLATES[day];
            return (
              <button
                key={day}
                className="day-card"
                style={{ "--accent": t.color }}
                onClick={() => handleSelectDay(day)}
              >
                <span className="day-label">{t.label}</span>
                <span className="day-focus">{t.focus}</span>
                <span className="day-count">{t.exercises.length} exercises</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  const template = WORKOUT_TEMPLATES[selectedDay];

  // ---- RENDER: Saved confirmation ----
  if (saved) {
    return (
      <div className="logger-container">
        <div className="saved-card">
          <div className="saved-icon">✓</div>
          <h2>{selectedDay} logged!</h2>
          <p>Great work. Session saved.</p>
          <div className="saved-actions">
            <button className="btn-primary" onClick={() => setSelectedDay(null)}>
              Log Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---- RENDER: Logging form ----
  return (
    <div className="logger-container">
      <div className="logger-header" style={{ "--accent": template.color }}>
        <button className="back-btn" onClick={() => setSelectedDay(null)}>← Back</button>
        <div>
          <h2 className="session-title">{template.label}</h2>
          <p className="session-focus">{template.focus}</p>
        </div>
      </div>

      {template.exercises.map(ex => (
        <div className="exercise-card" key={ex.id}>
          <div className="exercise-header">
            <span className="exercise-name">{ex.name}</span>
            {ex.note && <span className="exercise-note">{ex.note}</span>}
          </div>
          <div className="set-header-row">
            <span className="set-col-label">SET</span>
            <span className="set-col-label">WEIGHT (lbs)</span>
            <span className="set-col-label">REPS</span>
          </div>
          {(setData[ex.id] || []).map((set, i) => (
            <div className="set-row" key={i}>
              <span className="set-number">{i + 1}</span>
              <input
                className="set-input"
                type="number"
                placeholder="0"
                value={set.weight}
                onChange={e => handleSetChange(ex.id, i, "weight", e.target.value)}
              />
              <input
                className="set-input"
                type="number"
                placeholder={ex.reps}
                value={set.reps}
                onChange={e => handleSetChange(ex.id, i, "reps", e.target.value)}
              />
            </div>
          ))}
        </div>
      ))}

      <div className="notes-section">
        <label className="notes-label">Session Notes</label>
        <textarea
          className="notes-input"
          placeholder="How'd it feel? Any PRs? Form cues to remember..."
          value={notes}
          onChange={e => setNotes(e.target.value)}
          rows={3}
        />
      </div>

      <button className="btn-finish" onClick={handleFinish}>
        Finish Session
      </button>
    </div>
  );
}
