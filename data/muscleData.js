// ============================================================
// MUSCLE DATA — anatomically accurate regions for 80×202 body viewBox
// ============================================================

// ─── FRONT VIEW REGIONS ──────────────────────────────────────────────────────
export const FRONT_REGIONS = {
  // Pectorals — two fan-shaped lobes meeting near sternum
  chest:    [
    { cx:28, cy:50, rx:13, ry:10 },
    { cx:52, cy:50, rx:13, ry:10 },
  ],
  // Anterior + lateral deltoid — rounded shoulder cap
  deltoids: [
    { cx:9,  cy:36, rx:10, ry:10 },
    { cx:71, cy:36, rx:10, ry:10 },
  ],
  // Biceps brachii — front of upper arm
  biceps:   [
    { cx:5,  cy:62, rx:4.5, ry:13 },
    { cx:75, cy:62, rx:4.5, ry:13 },
  ],
  // Rectus abdominis
  core:     [
    { cx:40, cy:80, rx:11, ry:17 },
  ],
  // External obliques — flanking abs
  obliques: [
    { cx:23, cy:80, rx:8,  ry:15 },
    { cx:57, cy:80, rx:8,  ry:15 },
  ],
  // Quadriceps — full front of thigh
  quads:    [
    { cx:24, cy:162, rx:12, ry:26 },
    { cx:56, cy:162, rx:12, ry:26 },
  ],
  // Tibialis anterior / calves visible from front
  calves:   [
    { cx:22, cy:182, rx:6,  ry:11 },
    { cx:58, cy:182, rx:6,  ry:11 },
  ],
};

// ─── BACK VIEW REGIONS ───────────────────────────────────────────────────────
export const BACK_REGIONS = {
  // Trapezius — wide diamond from neck base to mid-back, across both shoulders
  traps:      [
    { cx:40, cy:34, rx:26, ry:11 },
  ],
  // Rhomboids — between shoulder blades
  rhomboids:  [
    { cx:40, cy:58, rx:15, ry:11 },
  ],
  // Latissimus dorsi — wings, wide at armpit narrowing to waist
  lats:       [
    { cx:17, cy:74, rx:13, ry:26 },
    { cx:63, cy:74, rx:13, ry:26 },
  ],
  // Posterior deltoid — back of shoulder cap
  rear_delt:  [
    { cx:9,  cy:36, rx:10, ry:10 },
    { cx:71, cy:36, rx:10, ry:10 },
  ],
  // Triceps brachii — back of upper arm (horseshoe shape)
  triceps:    [
    { cx:5,  cy:64, rx:5,  ry:14 },
    { cx:75, cy:64, rx:5,  ry:14 },
  ],
  // Erector spinae / lower back — two columns flanking spine
  lower_back: [
    { cx:32, cy:98, rx:10, ry:12 },
    { cx:48, cy:98, rx:10, ry:12 },
  ],
  // Gluteus maximus — large, positioned low on posterior hip
  glutes:     [
    { cx:24, cy:120, rx:20, ry:16 },
    { cx:56, cy:120, rx:20, ry:16 },
  ],
  // Hamstrings — biceps femoris + semimembranosus, full back of thigh
  hamstrings: [
    { cx:24, cy:162, rx:13, ry:27 },
    { cx:56, cy:162, rx:13, ry:27 },
  ],
  // Gastrocnemius — diamond-shaped calf belly
  calves:     [
    { cx:22, cy:182, rx:9,  ry:14 },
    { cx:58, cy:182, rx:9,  ry:14 },
  ],
};

// ─── Exercise → muscle mapping ────────────────────────────────────────────────
const MUSCLE_MAP = [
  { match: "30° Incline DB Press",       primary: ["chest","deltoids"],                  secondary: ["triceps"] },
  { match: "Chest Supported Row",        primary: ["lats","rhomboids"],                  secondary: ["rear_delt","biceps"] },
  { match: "Seated DB OH Press",         primary: ["deltoids"],                          secondary: ["triceps"] },
  { match: "Cable Lat Raises",           primary: ["deltoids"],                          secondary: [] },
  { match: "Incline DB Curls",           primary: ["biceps"],                            secondary: [] },
  { match: "Cable OH Tricep Extension",  primary: ["triceps"],                           secondary: [] },
  { match: "Plank",                      primary: ["core"],                              secondary: ["obliques"] },
  { match: "Ab Wheel Rollout",           primary: ["core"],                              secondary: ["lats"] },
  { match: "Back Squat",                 primary: ["quads","glutes"],                    secondary: ["hamstrings","lower_back"] },
  { match: "Bulgarian Split Squat",      primary: ["quads","glutes"],                    secondary: ["hamstrings"] },
  { match: "Leg Curl",                   primary: ["hamstrings"],                        secondary: [] },
  { match: "Leg Extension",              primary: ["quads"],                             secondary: [] },
  { match: "Standing Calf Raise",        primary: ["calves"],                            secondary: [] },
  { match: "Seated Calf Raise",          primary: ["calves"],                            secondary: [] },
  { match: "Suitcase Carry",             primary: ["obliques","core"],                   secondary: ["traps"] },
  { match: "Pull-Up",                    primary: ["lats","biceps"],                     secondary: ["rhomboids","rear_delt"] },
  { match: "Lat Pulldown",               primary: ["lats"],                              secondary: ["biceps","rhomboids"] },
  { match: "Flat DB Press",              primary: ["chest"],                             secondary: ["deltoids","triceps"] },
  { match: "Seated Cable Row",           primary: ["lats","rhomboids"],                  secondary: ["biceps","rear_delt"] },
  { match: "Face Pulls",                 primary: ["rear_delt","traps"],                 secondary: ["rhomboids"] },
  { match: "Hammer Curls",               primary: ["biceps"],                            secondary: [] },
  { match: "Tricep Rope Pushdown",       primary: ["triceps"],                           secondary: [] },
  { match: "Pallof Press",               primary: ["core","obliques"],                   secondary: [] },
  { match: "Trap Bar Deadlift",          primary: ["hamstrings","glutes","lower_back"],  secondary: ["quads","traps"] },
  { match: "KB Single-Leg RDL",          primary: ["hamstrings","glutes"],               secondary: ["lower_back"] },
  { match: "KB Swings",                  primary: ["glutes","hamstrings"],               secondary: ["lower_back","core"] },
  { match: "Barbell Hip Thrust",         primary: ["glutes","hamstrings"],               secondary: [] },
  { match: "Cable Woodchop",             primary: ["obliques","core"],                   secondary: [] },
];

export function getMuscles(exerciseName) {
  const name = exerciseName.replace("Pull-Up: ", "Pull-Up ");
  const entry = MUSCLE_MAP.find(e =>
    name.toLowerCase().includes(e.match.toLowerCase()) ||
    e.match.toLowerCase().includes(name.toLowerCase().split(" ").slice(0, 3).join(" "))
  );
  return entry
    ? { primary: entry.primary, secondary: entry.secondary }
    : { primary: [], secondary: [] };
}
