// ============================================================
// NUTRITION STORAGE — daily recomp logs
// entry = { date, calories, protein, carbs, fat, water, weight, notes }
// photos stored separately to keep the main log fast
// ============================================================

const LOG_KEY   = "rc_daily_log";
const PHOTO_KEY = "rc_photos";

export function getDailyLogs() {
  try { return JSON.parse(localStorage.getItem(LOG_KEY) || "{}"); }
  catch { return {}; }
}

export function getDailyLog(date) {
  return getDailyLogs()[date] || null;
}

export function saveDailyLog(entry) {
  // entry must have a `date` field: "YYYY-MM-DD"
  const logs = getDailyLogs();
  logs[entry.date] = { ...logs[entry.date], ...entry };
  localStorage.setItem(LOG_KEY, JSON.stringify(logs));
}

export function deleteDailyLog(date) {
  const logs = getDailyLogs();
  delete logs[date];
  localStorage.setItem(LOG_KEY, JSON.stringify(logs));
}

// Returns sorted array of log entries, newest first
export function getDailyLogsSorted() {
  const logs = getDailyLogs();
  return Object.values(logs).sort((a, b) => b.date.localeCompare(a.date));
}

// ── Photos ────────────────────────────────────────────────────

export function getPhoto(date) {
  try { return JSON.parse(localStorage.getItem(PHOTO_KEY) || "{}")[date] || null; }
  catch { return null; }
}

export function savePhoto(date, dataUrl) {
  try {
    const photos = JSON.parse(localStorage.getItem(PHOTO_KEY) || "{}");
    photos[date] = dataUrl;
    localStorage.setItem(PHOTO_KEY, JSON.stringify(photos));
    return true;
  } catch (e) {
    // Storage quota exceeded
    return false;
  }
}

export function deletePhoto(date) {
  try {
    const photos = JSON.parse(localStorage.getItem(PHOTO_KEY) || "{}");
    delete photos[date];
    localStorage.setItem(PHOTO_KEY, JSON.stringify(photos));
  } catch {}
}

export function getPhotoCount() {
  try { return Object.keys(JSON.parse(localStorage.getItem(PHOTO_KEY) || "{}")).length; }
  catch { return 0; }
}

// ── Image compression ──────────────────────────────────────────

export function compressImage(file, maxWidth = 900, quality = 0.75) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const ratio  = Math.min(maxWidth / img.width, 1);
      const canvas = document.createElement("canvas");
      canvas.width  = Math.round(img.width  * ratio);
      canvas.height = Math.round(img.height * ratio);
      canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", quality));
    };
    img.onerror = reject;
    img.src = url;
  });
}
