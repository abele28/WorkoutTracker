// ============================================================
// WORKOUT TEMPLATES
// This file holds your actual workout plan.
// Each exercise has: name, sets, reps (target), and notes.
// When you log a workout, these become the "template" you fill in.
// ============================================================

export const WORKOUT_TEMPLATES = {
  "Upper A": {
    label: "Upper A",
    focus: "Push + Pull (Chest / Back focus)",
    color: "#e85d26",
    exercises: [
      { id: "ia_incline_press",   name: "30° Incline DB Press",         sets: 4, reps: 10, note: "Control the descent" },
      { id: "ia_cs_row",         name: "Chest Supported Row",           sets: 4, reps: 10, note: "Full ROM, retract scapula" },
      { id: "ia_oh_press",       name: "Seated DB Overhead Press",      sets: 3, reps: 10, note: "Don't flare elbows" },
      { id: "ia_incline_curl",   name: "Incline DB Curls",              sets: 3, reps: 10, note: "Full stretch at bottom" },
      { id: "ia_lat_pulldown",   name: "Machine Lat Pulldown",          sets: 3, reps: 10, note: "" },
      { id: "ia_lat_raise",      name: "Cable Lateral Raises",          sets: 3, reps: 10, note: "Light, strict form" },
      { id: "ia_tricep_ext",     name: "Cable OH Tricep Extension",     sets: 3, reps: 12, note: "Watch form set 2+" },
    ],
  },

  "Upper B": {
    label: "Upper B",
    focus: "Push + Pull (Shoulder / Back focus)",
    color: "#3b7dd8",
    exercises: [
      { id: "ib_db_row",         name: "Single Arm DB Row",             sets: 4, reps: 10, note: "Brace core, full stretch" },
      { id: "ib_db_press",       name: "Flat DB Press",                 sets: 4, reps: 10, note: "" },
      { id: "ib_face_pull",      name: "Face Pulls",                    sets: 3, reps: 15, note: "External rotation at end" },
      { id: "ib_hammer_curl",    name: "Hammer Curls",                  sets: 3, reps: 10, note: "" },
      { id: "ib_cable_row",      name: "Seated Cable Row",              sets: 3, reps: 10, note: "" },
      { id: "ib_front_raise",    name: "Cable Front Raises",            sets: 3, reps: 12, note: "" },
      { id: "ib_pushdown",       name: "Tricep Rope Pushdown",          sets: 3, reps: 12, note: "" },
    ],
  },

  "Lower A": {
    label: "Lower A",
    focus: "Quad focus",
    color: "#2eb87a",
    exercises: [
      { id: "la_bulgarian",      name: "Bulgarian Split Squat",         sets: 4, reps: 10, note: "Per leg" },
      { id: "la_rdl",            name: "KB Single Leg RDL",             sets: 3, reps: 10, note: "Per leg, hinge at hip" },
      { id: "la_leg_press",      name: "Leg Press",                     sets: 3, reps: 12, note: "" },
      { id: "la_leg_curl",       name: "Lying Leg Curl",                sets: 3, reps: 12, note: "" },
      { id: "la_calf_raise",     name: "Standing Calf Raise",           sets: 4, reps: 15, note: "Full ROM" },
      { id: "la_ab_wheel",       name: "Ab Wheel Rollout",              sets: 3, reps: 10, note: "" },
    ],
  },

  "Lower B": {
    label: "Lower B",
    focus: "Hip / Glute focus",
    color: "#9b45d4",
    exercises: [
      { id: "lb_safety_squat",   name: "Safety Bar Split Squat",        sets: 4, reps: 8,  note: "Per leg" },
      { id: "lb_kb_swing",       name: "KB Swings",                     sets: 4, reps: 15, note: "Hip drive, not arms" },
      { id: "lb_hip_thrust",     name: "Hip Thrust",                    sets: 3, reps: 12, note: "" },
      { id: "lb_leg_extension",  name: "Leg Extension",                 sets: 3, reps: 15, note: "" },
      { id: "lb_seated_curl",    name: "Seated Leg Curl",               sets: 3, reps: 12, note: "" },
      { id: "lb_calf_raise",     name: "Seated Calf Raise",             sets: 4, reps: 15, note: "" },
      { id: "lb_plank",          name: "Plank",                         sets: 3, reps: 1,  note: "60s hold" },
    ],
  },
};

export const WORKOUT_ORDER = ["Upper A", "Upper B", "Lower A", "Lower B"];
