// ============================================================
// EXPORT UTILITIES — weekly CSV / JSON download
// ============================================================

import { getSessions } from "./storage";
import { getDailyLogs } from "./nutrition";
import { getCardioSessions } from "./cardio";

function calcVolume(session) {
  let total = 0;
  session.exercises.forEach(ex => {
    ex.sets.forEach(s => {
      total += (parseFloat(s.weight) || 0) * (parseFloat(s.reps) || 0);
    });
  });
  return Math.round(total);
}

function weekStart(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = (day === 0 ? -6 : 1 - day);
  d.setDate(d.getDate() + diff);
  return d.toISOString().slice(0, 10);
}

export function getAvailableWeeks() {
  const sessions = getSessions();
  const logs     = getDailyLogs();
  const cardio   = getCardioSessions();
  const weeks    = new Set();
  sessions.forEach(s => weeks.add(weekStart(s.date)));
  Object.keys(logs).forEach(d => weeks.add(weekStart(d)));
  cardio.forEach(s => weeks.add(weekStart(s.date)));
  return [...weeks].sort((a, b) => b.localeCompare(a));
}

function weekDates(mondayISO) {
  const dates = [];
  const start = new Date(mondayISO + "T12:00:00");
  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    dates.push(d.toISOString().slice(0, 10));
  }
  return dates;
}

export function exportWeekCSV(mondayISO) {
  const dates      = weekDates(mondayISO);
  const sessions   = getSessions();
  const logs       = getDailyLogs();
  const cardio     = getCardioSessions();

  const headers = [
    "Date","Weight (lbs)","Calories","Protein (g)","Carbs (g)","Fat (g)","Water (oz)",
    "Lift Sessions","Total Volume (lbs)","Lift Types",
    "Cardio Activities","Cardio Duration (min)","Cardio Distance (mi)",
    "Notes",
  ];

  const rows = dates.map(date => {
    const log         = logs[date] || {};
    const daySessions = sessions.filter(s => s.date.slice(0, 10) === date);
    const dayCardio   = cardio.filter(s => s.date === date);
    const volume      = daySessions.reduce((sum, s) => sum + calcVolume(s), 0);
    const liftTypes   = daySessions.map(s => s.workoutType).join(" + ");
    const cardioTypes = dayCardio.map(s => s.type).join(" + ");
    const cardioDur   = dayCardio.reduce((sum, s) => sum + (s.duration || 0), 0);
    const cardioDist  = dayCardio.reduce((sum, s) => sum + (s.distance || 0), 0);

    return [
      date,
      log.weight   || "",
      log.calories || "",
      log.protein  || "",
      log.carbs    || "",
      log.fat      || "",
      log.water    || "",
      daySessions.length || "",
      volume       || "",
      liftTypes,
      cardioTypes,
      cardioDur    || "",
      cardioDist   ? cardioDist.toFixed(1) : "",
      (log.notes   || "").replace(/,/g, ";"),
    ].join(",");
  });

  const csv  = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href     = url;
  a.download = `recomp_week_${mondayISO}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportAllJSON() {
  const data = {
    exportedAt: new Date().toISOString(),
    sessions:   getSessions(),
    nutrition:  getDailyLogs(),
    cardio:     getCardioSessions(),
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href     = url;
  a.download = `recomp_all_data_${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}
