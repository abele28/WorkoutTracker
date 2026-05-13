// ============================================================
// MUSCLE DATA — Exercise → activation mapping + SVG regions
// ============================================================

// Muscle groups rendered in FRONT view
export const FRONT_REGIONS = {
  chest:    [{ cx:30, cy:52, rx:11, ry:10 }, { cx:50, cy:52, rx:11, ry:10 }],
  deltoids: [{ cx:12, cy:34, rx:8,  ry:9  }, { cx:68, cy:34, rx:8,  ry:9  }],
  biceps:   [{ cx:6,  cy:59, rx:4,  ry:13 }, { cx:74, cy:59, rx:4,  ry:13 }],
  core:     [{ cx:40, cy:74, rx:10, ry:16 }],
  obliques: [{ cx:24, cy:72, rx:7,  ry:13 }, { cx:56, cy:72, rx:7,  ry:13 }],
  quads:    [{ cx:26, cy:140, rx:10, ry:22 }, { cx:54, cy:140, rx:10, ry:22 }],
  calves:   [{ cx:25, cy:162, rx:6,  ry:10 }, { cx:55, cy:162, rx:6,  ry:10 }],
};

// Muscle groups rendered in BACK view
export const BACK_REGIONS = {
  traps:      [{ cx:40, cy:36, rx:20, ry:8  }],
  rhomboids:  [{ cx:40, cy:54, rx:13, ry:9  }],
  lats:       [{ cx:20, cy:68, rx:10, ry:20 }, { cx:60, cy:68, rx:10, ry:20 }],
  rear_delt:  [{ cx:12, cy:34, rx:8,  ry:9  }, { cx:68, cy:34, rx:8,  ry:9  }],
  triceps:    [{ cx:6,  cy:59, rx:4,  ry:13 }, { cx:74, cy:59, rx:4,  ry:13 }],
  lower_back: [{ cx:40, cy:86, rx:13, ry:8  }],
  glutes:     [{ cx:28, cy:108, rx:14, ry:12 }, { cx:52, cy:108, rx:14, ry:12 }],
  hamstrings: [{ cx:26, cy:142, rx:10, ry:22 }, { cx:54, cy:142, rx:10, ry:22 }],
  calves:     [{ cx:25, cy:163, rx:7,  ry:11 }, { cx:55, cy:163, rx:7,  ry:11 }],
};

// Exercise name → { primary: [], secondary: [] }
// Use partial string matching via getMuscles()
const MUSCLE_MAP = [
  { match: "30° Incline DB Press",              primary: ["chest","deltoids"],          secondary: ["triceps"] },
  { match: "Chest Supported Row",               primary: ["lats","rhomboids"],          secondary: ["rear_delt","biceps"] },
  { match: "Seated DB OH Press",                primary: ["deltoids"],                  secondary: ["triceps"] },
  { match: "Cable Lat Raises",                  primary: ["deltoids"],                  secondary: [] },
  { match: "Incline DB Curls",                  primary: ["biceps"],                    secondary: [] },
  { match: "Cable OH Tricep Extension",         primary: ["triceps"],                   secondary: [] },
  { match: "Plank",                             primary: ["core"],                      secondary: ["obliques"] },
  { match: "Ab Wheel Rollout",                  primary: ["core"],                      secondary: ["lats"] },
  { match: "Back Squat",                        primary: ["quads","glutes"],            secondary: ["hamstrings","lower_back"] },
  { match: "Bulgarian Split Squat",             primary: ["quads","glutes"],            secondary: ["hamstrings"] },
  { match: "Leg Curl",                          primary: ["hamstrings"],                secondary: [] },
  { match: "Leg Extension",                     primary: ["quads"],                     secondary: [] },
  { match: "Standing Calf Raise",               primary: ["calves"],                    secondary: [] },
  { match: "Seated Calf Raise",                 primary: ["calves"],                    secondary: [] },
  { match: "Suitcase Carry",                    primary: ["obliques","core"],           secondary: ["traps"] },
  { match: "Pull-Up",                           primary: ["lats","biceps"],             secondary: ["rhomboids","rear_delt"] },
  { match: "Lat Pulldown",                      primary: ["lats"],                      secondary: ["biceps"] },
  { match: "Flat DB Press",                     primary: ["chest"],                     secondary: ["deltoids","triceps"] },
  { match: "Seated Cable Row",                  primary: ["lats","rhomboids"],          secondary: ["biceps"] },
  { match: "Face Pulls",                        primary: ["rear_delt","traps"],         secondary: ["rhomboids"] },
  { match: "Hammer Curls",                      primary: ["biceps"],                    secondary: [] },
  { match: "Tricep Rope Pushdown",              primary: ["triceps"],                   secondary: [] },
  { match: "Pallof Press",                      primary: ["core","obliques"],           secondary: [] },
  { match: "Trap Bar Deadlift",                 primary: ["hamstrings","glutes","lower_back"], secondary: ["quads","traps"] },
  { match: "KB Single-Leg RDL",                 primary: ["hamstrings","glutes"],       secondary: ["lower_back"] },
  { match: "KB Swings",                         primary: ["glutes","hamstrings"],       secondary: ["lower_back","core"] },
  { match: "Barbell Hip Thrust",                primary: ["glutes","hamstrings"],       secondary: [] },
  { match: "Cable Woodchop",                    primary: ["obliques","core"],           secondary: [] },
];

export function getMuscles(exerciseName) {
  const entry = MUSCLE_MAP.find(e => exerciseName.includes(e.match) || e.match.includes(exerciseName.split(":")[0].trim()));
  return entry ? { primary: entry.primary, secondary: entry.secondary } : { primary: [], secondary: [] };
}
