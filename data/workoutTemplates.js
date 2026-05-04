// ============================================================
// WORKOUT TEMPLATES — Block 1, Week 1 (Foundation)
// Source: Summer 2026 Lifting Program
// Each exercise has: name, sets, reps (target), and notes
// (notes include the target load and any cues from the plan).
// ============================================================

export const WORKOUT_TEMPLATES = {
  "Upper A": {
    label: "Upper A",
    focus: "Horizontal Push / Pull",
    color: "#e85d26",
    exercises: [
      { id: "ua_incline_press",  name: "30° Incline DB Press",           sets: 4, reps: 12, note: "25 lbs/hand · RIR 3" },
      { id: "ua_cs_row",         name: "Chest Supported Row",            sets: 4, reps: 12, note: "50 lbs/hand · RIR 3" },
      { id: "ua_oh_press",       name: "Seated DB OH Press",             sets: 3, reps: 12, note: "17.5 lbs/hand · RIR 3" },
      { id: "ua_lat_raise",      name: "Cable Lat Raises",               sets: 3, reps: 15, note: "12 lbs/arm · RIR 3" },
      { id: "ua_incline_curl",   name: "Incline DB Curls",               sets: 3, reps: 12, note: "12.5 lbs/hand · RIR 3" },
      { id: "ua_tricep_ext",     name: "Cable OH Tricep Extension",      sets: 3, reps: 12, note: "25 lbs total · RIR 3" },
      { id: "ua_core_plank",     name: "CORE — Plank",                   sets: 3, reps: 1,  note: "30 sec hold · bodyweight" },
    ],
  },

  "Lower A": {
    label: "Lower A",
    focus: "Quad Dominant",
    color: "#2eb87a",
    exercises: [
      { id: "la_back_squat",     name: "Back Squat",                     sets: 4, reps: 12, note: "75 lbs · RIR 3" },
      { id: "la_bulgarian",      name: "Bulgarian Split Squat",          sets: 3, reps: 12, note: "20 lbs/hand · per leg · RIR 3" },
      { id: "la_leg_curl",       name: "Leg Curl (machine)",             sets: 3, reps: 12, note: "40 lbs · RIR 3" },
      { id: "la_leg_extension",  name: "Leg Extension",                  sets: 3, reps: 12, note: "60 lbs · RIR 3" },
      { id: "la_calf_raise",     name: "Standing Calf Raise",            sets: 3, reps: 15, note: "BW + 45 lbs · full ROM" },
      { id: "la_core_carry",     name: "CORE — Suitcase Carry",          sets: 3, reps: 1,  note: "20m/side · heavy KB/DB" },
    ],
  },

  "Upper B": {
    label: "Upper B",
    focus: "Vertical Push / Pull",
    color: "#3b7dd8",
    exercises: [
      { id: "ub_pullup",         name: "Pull-Up Progression — Dead Hang", sets: 3, reps: 1,  note: "20–30 sec · bodyweight" },
      { id: "ub_lat_pulldown",   name: "Lat Pulldown",                   sets: 4, reps: 12, note: "75 lbs · RIR 3" },
      { id: "ub_flat_press",     name: "Flat DB Press",                  sets: 3, reps: 12, note: "25 lbs/hand · RIR 3" },
      { id: "ub_cable_row",      name: "Seated Cable Row",               sets: 3, reps: 12, note: "95 lbs · RIR 3" },
      { id: "ub_face_pull",      name: "Face Pulls",                     sets: 3, reps: 15, note: "25 lbs · external rotation" },
      { id: "ub_hammer_curl",    name: "Hammer Curls",                   sets: 3, reps: 12, note: "15 lbs/hand · RIR 3" },
      { id: "ub_pushdown",       name: "Tricep Rope Pushdown",           sets: 3, reps: 12, note: "35 lbs · RIR 3" },
      { id: "ub_core_pallof",    name: "CORE — Pallof Press",            sets: 3, reps: 10, note: "10/side · light cable" },
    ],
  },

  "Lower B": {
    label: "Lower B",
    focus: "Hinge Dominant",
    color: "#9b45d4",
    exercises: [
      { id: "lb_trap_dead",      name: "Trap Bar Deadlift",              sets: 4, reps: 10, note: "125 lbs · RIR 3" },
      { id: "lb_kb_rdl",         name: "KB Single-Leg RDL",              sets: 3, reps: 10, note: "35 lb KB · per leg · RIR 3" },
      { id: "lb_kb_swing",       name: "KB Swings",                      sets: 3, reps: 15, note: "35 lb KB · hip drive" },
      { id: "lb_hip_thrust",     name: "Barbell Hip Thrust",             sets: 3, reps: 12, note: "135 lbs · RIR 3" },
      { id: "lb_calf_raise",     name: "Seated Calf Raise",              sets: 3, reps: 15, note: "45 lbs · full ROM" },
      { id: "lb_core_woodchop",  name: "CORE — Cable Woodchop",          sets: 3, reps: 12, note: "12/side · light cable" },
    ],
  },
};

export const WORKOUT_ORDER = ["Upper A", "Lower A", "Upper B", "Lower B"];
