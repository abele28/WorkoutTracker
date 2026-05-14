// ============================================================
// STORAGE UTILITIES
// These are helper functions that save and load data from
// localStorage — the browser's built-in key/value store.
//
// Think of localStorage like a tiny database that lives in
// your browser. It survives page refreshes and browser restarts.
// ============================================================

const SESSIONS_KEY       = "wt_sessions";
const METRICS_KEY        = "wt_metrics";
const SEED_DONE_KEY      = "wt_seeded_v1";
const NUTRI_SEED_DONE_KEY = "wt_nutri_seed_v1";

// --- SEED INITIAL SESSIONS ---

export function seedIfNeeded() {
  if (localStorage.getItem(SEED_DONE_KEY)) return;

  function s(count, weight, reps) {
    return Array.from({ length: count }, () => ({ weight: String(weight), reps: String(reps) }));
  }

  const sessions = [
    {
      id:"seed-w1-ua", date:"2026-05-03T14:00:00.000Z",
      weekNum:1, weekLabel:"Foundation · Wk 1", workoutType:"Upper A", notes:"",
      exercises:[
        {id:"w1_ua_1",name:"30° Incline DB Press",       sets:s(4,25,   12)},
        {id:"w1_ua_2",name:"Chest Supported Row",         sets:s(4,50,   12)},
        {id:"w1_ua_3",name:"Seated DB OH Press",          sets:s(3,17.5, 12)},
        {id:"w1_ua_4",name:"Cable Lat Raises",            sets:s(3,12,   15)},
        {id:"w1_ua_5",name:"Incline DB Curls",            sets:s(3,12.5, 12)},
        {id:"w1_ua_6",name:"Cable OH Tricep Extension",   sets:s(3,25,   12)},
        {id:"w1_ua_7",name:"Plank",                       sets:s(3,0,    30)},
      ],
    },
    {
      id:"seed-w1-la", date:"2026-05-04T14:00:00.000Z",
      weekNum:1, weekLabel:"Foundation · Wk 1", workoutType:"Lower A", notes:"",
      exercises:[
        {id:"w1_la_1",name:"Back Squat",          sets:s(4,75,  12)},
        {id:"w1_la_2",name:"Bulgarian Split Squat",sets:s(3,20,  12)},
        {id:"w1_la_3",name:"Leg Curl (machine)",   sets:s(3,40,  12)},
        {id:"w1_la_4",name:"Leg Extension",        sets:s(3,60,  12)},
        {id:"w1_la_5",name:"Standing Calf Raise",  sets:s(3,45,  15)},
        {id:"w1_la_6",name:"Suitcase Carry",       sets:s(3,0,   20)},
      ],
    },
    {
      id:"seed-w1-ub", date:"2026-05-06T14:00:00.000Z",
      weekNum:1, weekLabel:"Foundation · Wk 1", workoutType:"Upper B", notes:"",
      exercises:[
        {id:"w1_ub_1",name:"Pull-Up: Dead Hang",        sets:s(3,0,  25)},
        {id:"w1_ub_2",name:"Lat Pulldown",               sets:s(4,75, 12)},
        {id:"w1_ub_3",name:"Flat DB Press",              sets:s(3,25, 12)},
        {id:"w1_ub_4",name:"Seated Cable Row",           sets:s(3,95, 12)},
        {id:"w1_ub_5",name:"Face Pulls",                 sets:s(3,25, 15)},
        {id:"w1_ub_6",name:"Hammer Curls",               sets:s(3,15, 12)},
        {id:"w1_ub_7",name:"Tricep Rope Pushdown",       sets:s(3,35, 12)},
        {id:"w1_ub_8",name:"Pallof Press",               sets:s(3,0,  10)},
      ],
    },
    {
      id:"seed-w1-lb", date:"2026-05-08T14:00:00.000Z",
      weekNum:1, weekLabel:"Foundation · Wk 1", workoutType:"Lower B", notes:"",
      exercises:[
        {id:"w1_lb_1",name:"Trap Bar Deadlift",  sets:s(4,125,10)},
        {id:"w1_lb_2",name:"KB Single-Leg RDL",  sets:s(3,35, 10)},
        {id:"w1_lb_3",name:"KB Swings",          sets:s(3,35, 15)},
        {id:"w1_lb_4",name:"Barbell Hip Thrust", sets:s(3,135,12)},
        {id:"w1_lb_5",name:"Seated Calf Raise",  sets:s(3,45, 15)},
        {id:"w1_lb_6",name:"Cable Woodchop",     sets:s(3,0,  12)},
      ],
    },
    {
      id:"seed-w2-ua", date:"2026-05-10T14:00:00.000Z",
      weekNum:2, weekLabel:"Foundation · Wk 2", workoutType:"Upper A", notes:"",
      exercises:[
        {id:"w2_ua_1",name:"30° Incline DB Press",       sets:s(4,25,   12)},
        {id:"w2_ua_2",name:"Chest Supported Row",         sets:s(4,55,   12)},
        {id:"w2_ua_3",name:"Seated DB OH Press",          sets:s(3,20,   12)},
        {id:"w2_ua_4",name:"Cable Lat Raises",            sets:s(3,12,   15)},
        {id:"w2_ua_5",name:"Incline DB Curls",            sets:s(3,12.5, 12)},
        {id:"w2_ua_6",name:"Cable OH Tricep Extension",   sets:s(3,27.5, 12)},
        {id:"w2_ua_7",name:"Plank",                       sets:s(3,0,    40)},
      ],
    },
    {
      id:"seed-w2-la", date:"2026-05-11T14:00:00.000Z",
      weekNum:2, weekLabel:"Foundation · Wk 2", workoutType:"Lower A", notes:"",
      exercises:[
        {id:"w2_la_1",name:"Back Squat",          sets:s(4,80,   12)},
        {id:"w2_la_2",name:"Bulgarian Split Squat",sets:s(3,25,   12)},
        {id:"w2_la_3",name:"Leg Curl (machine)",   sets:s(3,42.5, 12)},
        {id:"w2_la_4",name:"Leg Extension",        sets:s(3,65,   12)},
        {id:"w2_la_5",name:"Standing Calf Raise",  sets:s(3,50,   15)},
        {id:"w2_la_6",name:"Suitcase Carry",       sets:s(3,0,    25)},
      ],
    },
    {
      id:"seed-w2-ub", date:"2026-05-13T14:00:00.000Z",
      weekNum:2, weekLabel:"Foundation · Wk 2", workoutType:"Upper B", notes:"",
      exercises:[
        {id:"w2_ub_1",name:"Pull-Up: Scapular Pull-Up", sets:s(3,0,    8)},
        {id:"w2_ub_2",name:"Lat Pulldown",               sets:s(4,80,  12)},
        {id:"w2_ub_3",name:"Flat DB Press",              sets:s(3,25,  12)},
        {id:"w2_ub_4",name:"Seated Cable Row",           sets:s(3,100, 12)},
        {id:"w2_ub_5",name:"Face Pulls",                 sets:s(3,27.5,15)},
        {id:"w2_ub_6",name:"Hammer Curls",               sets:s(3,15,  12)},
        {id:"w2_ub_7",name:"Tricep Rope Pushdown",       sets:s(3,37.5,12)},
        {id:"w2_ub_8",name:"Pallof Press",               sets:s(3,0,   10)},
      ],
    },
  ];

  // Prepend to any existing sessions (newest-first), skip duplicates
  let existing = [];
  try { existing = JSON.parse(localStorage.getItem(SESSIONS_KEY) || "[]"); } catch {}
  const existingIds = new Set(existing.map(s => s.id));
  const toAdd = sessions.filter(s => !existingIds.has(s.id)).reverse();
  localStorage.setItem(SESSIONS_KEY, JSON.stringify([...toAdd, ...existing]));
  localStorage.setItem(SEED_DONE_KEY, "1");
}

export function seedNutritionIfNeeded() {
  if (localStorage.getItem(NUTRI_SEED_DONE_KEY)) return;

  const LOG_KEY = "rc_daily_log";
  const entries = {
    "2026-05-03": { date:"2026-05-03", calories:1756, protein:131.9, carbs:169.6, fat:50.5, weight:149.4, notes:"" },
    "2026-05-04": { date:"2026-05-04", calories:1601, protein:124.1, carbs:126.0, fat:57.8, weight:149.4, notes:"" },
    "2026-05-05": { date:"2026-05-05", calories:1547, protein:131.0, carbs:124.0, fat:49.7, weight:148.8, notes:"" },
    "2026-05-06": { date:"2026-05-06", calories:1526, protein:138.4, carbs:136.5, fat:40.2, weight:147.8, notes:"" },
    "2026-05-07": { date:"2026-05-07", calories:1644, protein:132.0, carbs:149.1, fat:49.8, weight:147.8, notes:"" },
    "2026-05-08": { date:"2026-05-08", calories:1702, protein:118.1, carbs:183.6, fat:44.3, weight:147.8, notes:"" },
    "2026-05-09": { date:"2026-05-09", calories:1575, protein:140.9, carbs:128.9, fat:47.2, weight:147.8, notes:"" },
    "2026-05-10": { date:"2026-05-10", calories:1795, protein:135.8, carbs:170.7, fat:52.2, weight:147.8, notes:"" },
    "2026-05-11": { date:"2026-05-11", calories:1620, protein:126.6, carbs:153.5, fat:47.2, weight:147.8, notes:"" },
    "2026-05-12": { date:"2026-05-12", calories:1568, protein:128.4, carbs:143.9, fat:47.4, weight:146.8, notes:"" },
    "2026-05-13": { date:"2026-05-13", weight:147.6, notes:"" },
  };

  let existing = {};
  try { existing = JSON.parse(localStorage.getItem(LOG_KEY) || "{}"); } catch {}
  // Only write dates that aren't already logged
  const merged = { ...entries, ...existing };
  localStorage.setItem(LOG_KEY, JSON.stringify(merged));
  localStorage.setItem(NUTRI_SEED_DONE_KEY, "1");
}

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

// --- MAIN LIFT 1RM TRACKING (BB Back Squat, BB Bench, TBDL) ---

const MAIN_LIFTS_KEY = "wt_main_lifts";

export function getMainLiftSets() {
  try {
    return JSON.parse(localStorage.getItem(MAIN_LIFTS_KEY) || "{}");
  } catch { return {}; }
}

export function saveMainLiftSet(lift, weight, reps) {
  const data = getMainLiftSets();
  if (!data[lift]) data[lift] = [];
  data[lift].push({
    id: generateId(),
    date: new Date().toISOString().slice(0, 10),
    weight: +weight,
    reps: +reps,
  });
  data[lift].sort((a, b) => a.date.localeCompare(b.date));
  localStorage.setItem(MAIN_LIFTS_KEY, JSON.stringify(data));
}

export function deleteMainLiftSet(lift, id) {
  const data = getMainLiftSets();
  if (data[lift]) data[lift] = data[lift].filter(s => s.id !== id);
  localStorage.setItem(MAIN_LIFTS_KEY, JSON.stringify(data));
}
