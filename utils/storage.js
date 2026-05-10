// ============================================================
// STORAGE UTILITIES
// These are helper functions that save and load data from
// localStorage — the browser's built-in key/value store.
//
// Think of localStorage like a tiny database that lives in
// your browser. It survives page refreshes and browser restarts.
// ============================================================

const SESSIONS_KEY = "wt_sessions";
const METRICS_KEY  = "wt_metrics";

// --- SESSIONS (workout logs) ---

export function getSessions() {
  try {
    const raw = localStorage.getItem(SESSIONS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveSession(session) {
  const sessions = getSessions();
  // Check if we're updating an existing session or adding a new one
  const idx = sessions.findIndex(s => s.id === session.id);
  if (idx >= 0) {
    sessions[idx] = session;
  } else {
    sessions.unshift(session); // add to front (newest first)
  }
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
}

export function deleteSession(sessionId) {
  const sessions = getSessions().filter(s => s.id !== sessionId);
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
}

// --- WEEK TRACKING ---

export function getCurrentWeekIndex() {
  return parseInt(localStorage.getItem("wt_current_week") || "0", 10);
}

export function setCurrentWeekIndex(n) {
  localStorage.setItem("wt_current_week", String(n));
}

export function getSessionsForWeek(weekNum) {
  return getSessions().filter(s => s.weekNum === weekNum);
}

// --- BODY METRICS ---

export function getMetrics() {
  try {
    const raw = localStorage.getItem(METRICS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveMetric(entry) {
  // entry = { date: "2026-05-04", weight: 132 }
  const metrics = getMetrics();
  const idx = metrics.findIndex(m => m.date === entry.date);
  if (idx >= 0) {
    metrics[idx] = entry; // overwrite same-day entry
  } else {
    metrics.push(entry);
    metrics.sort((a, b) => a.date.localeCompare(b.date));
  }
  localStorage.setItem(METRICS_KEY, JSON.stringify(metrics));
}

// --- HELPERS ---

export function generateId() {
  // Simple unique ID: timestamp + random suffix
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function formatDate(isoString) {
  // "2026-05-04T14:23:00.000Z" → "May 4, 2026"
  return new Date(isoString).toLocaleDateString("en-US", {
    month: "long", day: "numeric", year: "numeric",
  });
}

export function formatDateShort(isoString) {
  return new Date(isoString).toLocaleDateString("en-US", {
    month: "short", day: "numeric",
  });
}
