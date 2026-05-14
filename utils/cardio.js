const KEY = "rc_cardio";

export const ACTIVITY_TYPES = [
  { id: "swim",         label: "SWIM",         icon: "〜", color: "#3b8fd8" },
  { id: "run",          label: "RUN",          icon: "↗", color: "#e85d26" },
  { id: "walk",         label: "WALK",         icon: "→", color: "#2eb87a" },
  { id: "hike",         label: "HIKE",         icon: "△", color: "#c4881e" },
  { id: "indoor_ride",  label: "INDOOR RIDE",  icon: "◎", color: "#9b45d4" },
  { id: "outdoor_ride", label: "OUTDOOR RIDE", icon: "⊙", color: "#00c896" },
  { id: "hockey",       label: "HOCKEY",       icon: "⬡", color: "#00e5c8" },
];

export function getCardioSessions() {
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); }
  catch { return []; }
}

export function saveCardioSession(session) {
  const sessions = getCardioSessions();
  sessions.unshift(session); // newest first
  localStorage.setItem(KEY, JSON.stringify(sessions));
}

export function deleteCardioSession(id) {
  const sessions = getCardioSessions().filter(s => s.id !== id);
  localStorage.setItem(KEY, JSON.stringify(sessions));
}

export function generateCardioId() {
  return `c_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
}
