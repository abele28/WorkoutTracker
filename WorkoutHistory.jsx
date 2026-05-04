// ============================================================
// WORKOUT HISTORY COMPONENT
// Shows all past sessions, newest first.
// You can expand a session to see all the sets you logged.
// ============================================================

import { useState } from "react";
import { getSessions, deleteSession, formatDate } from "../utils/storage";
import { WORKOUT_TEMPLATES } from "../data/workoutTemplates";

export default function WorkoutHistory({ refreshKey }) {
  // refreshKey is a prop that changes when a new session is saved,
  // which causes this component to re-read from localStorage.
  const sessions = getSessions();
  const [expanded, setExpanded] = useState(null);

  function handleDelete(id) {
    if (confirm("Delete this session?")) {
      deleteSession(id);
      window.location.reload(); // simple refresh for now
    }
  }

  if (sessions.length === 0) {
    return (
      <div className="history-container">
        <h2 className="section-title">Workout History</h2>
        <div className="empty-state">
          <p>No sessions logged yet.</p>
          <p>Head to Log Workout to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="history-container">
      <h2 className="section-title">Workout History</h2>
      <p className="section-sub">{sessions.length} session{sessions.length !== 1 ? "s" : ""} logged</p>

      {sessions.map(session => {
        const template = WORKOUT_TEMPLATES[session.workoutType];
        const accent = template?.color || "#888";
        const isOpen = expanded === session.id;

        return (
          <div className="history-card" key={session.id} style={{ "--accent": accent }}>
            <div
              className="history-card-header"
              onClick={() => setExpanded(isOpen ? null : session.id)}
            >
              <div className="history-card-left">
                <span className="history-day-badge" style={{ background: accent }}>
                  {session.workoutType}
                </span>
                <span className="history-date">{formatDate(session.date)}</span>
              </div>
              <span className="history-chevron">{isOpen ? "▲" : "▼"}</span>
            </div>

            {isOpen && (
              <div className="history-card-body">
                {session.exercises.map(ex => {
                  const completedSets = ex.sets.filter(s => s.weight || s.reps);
                  if (completedSets.length === 0) return null;
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
                  <div className="history-notes">
                    <span className="history-notes-label">Notes: </span>
                    {session.notes}
                  </div>
                )}
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(session.id)}
                >
                  Delete Session
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
