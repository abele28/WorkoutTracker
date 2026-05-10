// ============================================================
// FULL SUMMER 2026 LIFTING PROGRAM — All 17 Weeks
// Source: 2026SummerLifting PDFs
// ============================================================

const COLORS = {
  "Lower A": "#2eb87a",
  "Upper A": "#e85d26",
  "Lower B": "#9b45d4",
  "Upper B": "#3b7dd8",
};

export const WORKOUT_ORDER = ["Lower A", "Upper A", "Lower B", "Upper B"];

// Helper to build exercise IDs
const id = (prefix, n) => `${prefix}_${n}`;

// ─── BLOCK 1 (Weeks 1–5) ─────────────────────────────────────────────────────

const B1_LA = (w, squat, rdl, lunges, legcurl, legext, calf, crunch) => ({
  label: "Lower A", focus: "Quad Dominant", color: COLORS["Lower A"],
  exercises: [
    { id: id(`w${w}_la`,1), name: "Back Squat",                    sets:4, reps:w<=3?10:(w===4?8:10), note:`${squat} · RIR ${w<=2?"2-3":w===3?"2":w===4?"1-2":"1"}` },
    { id: id(`w${w}_la`,2), name: "Romanian Deadlift",             sets:4, reps:w<=3?10:(w===4?8:10), note:`${rdl} · RIR ${w<=2?"2-3":w===3?"2":w===4?"1-2":"1"}` },
    { id: id(`w${w}_la`,3), name: "Walking Lunges",                sets:3, reps:10, note:`${lunges} · per leg` },
    { id: id(`w${w}_la`,4), name: "Seated Leg Curl",               sets:3, reps:12, note:`${legcurl}` },
    { id: id(`w${w}_la`,5), name: "Leg Extension (reclined ~40°)", sets:3, reps:12, note:`${legext}` },
    { id: id(`w${w}_la`,6), name: "Standing Calf Raise",           sets:3, reps:15, note:`${calf}` },
    { id: id(`w${w}_la`,7), name: "Cable Crunch",                  sets:3, reps:w>=3?15:15, note:`${crunch}` },
    { id: id(`w${w}_la`,8), name: "Hanging Leg Raise",             sets:3, reps:w<=2?10:12, note:"bodyweight" },
  ],
});

const B1_UA = (w, press, row, ohp, pulldown, lat, curl, tricep) => ({
  label: "Upper A", focus: "Horizontal Push / Pull", color: COLORS["Upper A"],
  exercises: [
    { id: id(`w${w}_ua`,1), name: "Low-Incline DB Press (15–30°)", sets:4, reps:w<=2||w===5?10:w===4?8:8, note:`${press}` },
    { id: id(`w${w}_ua`,2), name: "Chest-Supported Row",           sets:4, reps:10, note:`${row}` },
    { id: id(`w${w}_ua`,3), name: "Seated DB OHP",                 sets:3, reps:w<=2||w===5?10:8, note:`${ohp}` },
    { id: id(`w${w}_ua`,4), name: "Lat Pulldown",                  sets:3, reps:12, note:`${pulldown}` },
    { id: id(`w${w}_ua`,5), name: "Cable Lateral Raise",           sets:3, reps:15, note:`${lat}` },
    { id: id(`w${w}_ua`,6), name: "Incline DB Curl",               sets:3, reps:w<=2||w===5?12:10, note:`${curl}` },
    { id: id(`w${w}_ua`,7), name: "Overhead Cable Tricep Ext.",    sets:3, reps:12, note:`${tricep}` },
  ],
});

const B1_LB = (w, thrust, press, legext, legcurl, abduct, calf, crunch) => ({
  label: "Lower B", focus: "Hip Dominant", color: COLORS["Lower B"],
  exercises: [
    { id: id(`w${w}_lb`,1), name: "Barbell Hip Thrust",            sets:4, reps:12, note:`${thrust}` },
    { id: id(`w${w}_lb`,2), name: "Leg Press (deep ROM)",          sets:4, reps:12, note:`${press}` },
    { id: id(`w${w}_lb`,3), name: "Leg Extension (reclined ~40°)", sets:3, reps:12, note:`${legext}` },
    { id: id(`w${w}_lb`,4), name: "Lying Leg Curl",                sets:3, reps:12, note:`${legcurl}` },
    { id: id(`w${w}_lb`,5), name: "Hip Abduction Machine",         sets:3, reps:15, note:`${abduct}` },
    { id: id(`w${w}_lb`,6), name: "Seated Calf Raise",             sets:3, reps:15, note:`${calf}` },
    { id: id(`w${w}_lb`,7), name: "Cable Crunch",                  sets:3, reps:15, note:`${crunch}` },
    { id: id(`w${w}_lb`,8), name: "Hanging Leg Raise",             sets:3, reps:10, note:"bodyweight" },
  ],
});

const B1_UB = (w, flat, row, pulldown, pec, lat, revpec, hammer, push) => ({
  label: "Upper B", focus: "Vertical Push / Pull", color: COLORS["Upper B"],
  exercises: [
    { id: id(`w${w}_ub`,1), name: "Flat DB Press",           sets:3, reps:10, note:`${flat}` },
    { id: id(`w${w}_ub`,2), name: "Cable Row",               sets:3, reps:12, note:`${row}` },
    { id: id(`w${w}_ub`,3), name: "Lat Pulldown",            sets:3, reps:12, note:`${pulldown}` },
    { id: id(`w${w}_ub`,4), name: "Pec Deck",               sets:3, reps:12, note:`${pec}` },
    { id: id(`w${w}_ub`,5), name: "Leaning Lateral Raise",  sets:4, reps:12, note:`${lat}` },
    { id: id(`w${w}_ub`,6), name: "Reverse Pec Deck",       sets:3, reps:15, note:`${revpec}` },
    { id: id(`w${w}_ub`,7), name: "Hammer Curls",           sets:3, reps:12, note:`${hammer}` },
    { id: id(`w${w}_ub`,8), name: "Rope Pushdown",          sets:3, reps:12, note:`${push}` },
  ],
});

// ─── BLOCK 2 (Weeks 7–11) ────────────────────────────────────────────────────

const B2_LA = (w, hack, slrdl, bss, legcurl, legext, calf, ab, pallof) => ({
  label: "Lower A", focus: "Quad & Unilateral", color: COLORS["Lower A"],
  exercises: [
    { id: id(`w${w}_la`,1), name: "Hack Squat",                    sets:4, reps:w===11?6:w===10?8:10, note:`${hack}` },
    { id: id(`w${w}_la`,2), name: "Single-Leg RDL",                sets:3, reps:10, note:`${slrdl} · per leg` },
    { id: id(`w${w}_la`,3), name: "Bulgarian Split Squat",         sets:3, reps:8,  note:`${bss} · per leg` },
    { id: id(`w${w}_la`,4), name: "Lying Leg Curl",                sets:3, reps:12, note:`${legcurl}` },
    { id: id(`w${w}_la`,5), name: "Leg Extension (reclined ~40°)", sets:3, reps:10, note:`${legext}` },
    { id: id(`w${w}_la`,6), name: "Standing Calf Raise",           sets:4, reps:12, note:`${calf}` },
    { id: id(`w${w}_la`,7), name: "Ab Wheel Rollout",              sets:3, reps:10, note:"bodyweight" },
    { id: id(`w${w}_la`,8), name: "Pallof Press",                  sets:3, reps:12, note:`${pallof}` },
  ],
});

const B2_UA = (w, press, row, arnold, pullup, lat, curl, cgbench) => ({
  label: "Upper A", focus: "Horizontal Push / Pull", color: COLORS["Upper A"],
  exercises: [
    { id: id(`w${w}_ua`,1), name: "Low-Incline DB Press (15–30°)", sets:4, reps:w>=9?6:8, note:`${press}` },
    { id: id(`w${w}_ua`,2), name: "Barbell Bent-Over Row",         sets:w===11?5:4, reps:w>=9?6:8, note:`${row}` },
    { id: id(`w${w}_ua`,3), name: "Arnold Press",                  sets:4, reps:w>=9?6:8, note:`${arnold}` },
    { id: id(`w${w}_ua`,4), name: "Pull-Up (assisted)",            sets:3, reps:w>=9?6:8, note:`${pullup}` },
    { id: id(`w${w}_ua`,5), name: "Cable Lateral Raise",           sets:3, reps:12, note:`${lat}` },
    { id: id(`w${w}_ua`,6), name: "Preacher Curl",                 sets:3, reps:10, note:`${curl}` },
    { id: id(`w${w}_ua`,7), name: "Close-Grip Bench Press",        sets:3, reps:w>=9?6:8, note:`${cgbench}` },
  ],
});

const B2_LB = (w, thrust, bss, legpress, legcurl, abduct, calf, ab, deadbug) => ({
  label: "Lower B", focus: "Glute & Hinge", color: COLORS["Lower B"],
  exercises: [
    { id: id(`w${w}_lb`,1), name: "Barbell Hip Thrust",           sets:4, reps:w===11?6:w===10?8:10, note:`${thrust}` },
    { id: id(`w${w}_lb`,2), name: "Bulgarian Split Squat",        sets:3, reps:8,  note:`${bss} · per leg` },
    { id: id(`w${w}_lb`,3), name: "Leg Press (deep ROM)",         sets:3, reps:12, note:`${legpress}` },
    { id: id(`w${w}_lb`,4), name: "Seated Leg Curl",              sets:3, reps:12, note:`${legcurl}` },
    { id: id(`w${w}_lb`,5), name: "Hip Abduction Machine",        sets:3, reps:12, note:`${abduct}` },
    { id: id(`w${w}_lb`,6), name: "Seated Calf Raise",            sets:4, reps:12, note:`${calf}` },
    { id: id(`w${w}_lb`,7), name: "Ab Wheel Rollout",             sets:3, reps:10, note:"bodyweight" },
    { id: id(`w${w}_lb`,8), name: "Dead Bug",                     sets:3, reps:8,  note:"per side · bodyweight" },
  ],
});

const B2_UB = (w, fly, row, pulldown, machine, facepull, lat, drag, push) => ({
  label: "Upper B", focus: "Accessory Volume", color: COLORS["Upper B"],
  exercises: [
    { id: id(`w${w}_ub`,1), name: "Low Cable Fly (cross-body)",       sets:3, reps:12, note:`${fly}` },
    { id: id(`w${w}_ub`,2), name: "Chest-Supported DB Row",           sets:3, reps:10, note:`${row}` },
    { id: id(`w${w}_ub`,3), name: "Neutral-Grip Lat Pulldown",        sets:3, reps:10, note:`${pulldown}` },
    { id: id(`w${w}_ub`,4), name: "Machine Chest Press",              sets:3, reps:10, note:`${machine}` },
    { id: id(`w${w}_ub`,5), name: "Face Pull",                        sets:3, reps:15, note:`${facepull}` },
    { id: id(`w${w}_ub`,6), name: "Leaning Lateral Raise",            sets:4, reps:12, note:`${lat}` },
    { id: id(`w${w}_ub`,7), name: "Drag Curl",                        sets:3, reps:10, note:`${drag}` },
    { id: id(`w${w}_ub`,8), name: "Rope Pushdown",                    sets:3, reps:10, note:`${push}` },
  ],
});

// ─── BLOCK 3 (Weeks 13–16) ───────────────────────────────────────────────────

const B3_LA = (w, squat, rdl, legpress, legcurl, legext, calf, crunch, deadbug) => ({
  label: "Lower A", focus: "Strength — Quad", color: COLORS["Lower A"],
  exercises: [
    { id: id(`w${w}_la`,1), name: "Back Squat",                    sets:w===16?3:4, reps:w===13?5:w===14?4:w===15?3:3, note:`${squat}` },
    { id: id(`w${w}_la`,2), name: "Romanian Deadlift",             sets:w===16?3:4, reps:w===13?5:w===14?4:w===15?3:3, note:`${rdl}` },
    { id: id(`w${w}_la`,3), name: "Leg Press (deep ROM)",          sets:3, reps:8,  note:`${legpress}` },
    { id: id(`w${w}_la`,4), name: "Seated Leg Curl",               sets:3, reps:10, note:`${legcurl}` },
    { id: id(`w${w}_la`,5), name: "Leg Extension (reclined ~40°)", sets:3, reps:10, note:`${legext}` },
    { id: id(`w${w}_la`,6), name: "Standing Calf Raise",           sets:4, reps:w>=15?10:12, note:`${calf}` },
    { id: id(`w${w}_la`,7), name: "Decline Crunch",                sets:3, reps:15, note:`${crunch}` },
    { id: id(`w${w}_la`,8), name: "Dead Bug",                      sets:3, reps:8,  note:"per side · bodyweight" },
  ],
});

const B3_UA = (w, press, row, ohp, pulldown, lat, curl, tricep) => ({
  label: "Upper A", focus: "Strength — Horizontal", color: COLORS["Upper A"],
  exercises: [
    { id: id(`w${w}_ua`,1), name: "Low-Incline DB Press (15–30°)", sets:w===16?3:4, reps:w===13?5:w===14?4:w===15?3:3, note:`${press}` },
    { id: id(`w${w}_ua`,2), name: "Chest-Supported Row",           sets:w===16?3:4, reps:w===13?5:w===14?4:w===15?3:3, note:`${row}` },
    { id: id(`w${w}_ua`,3), name: "Barbell OHP",                   sets:3, reps:w===13?5:w===14?4:w===15?3:3, note:`${ohp}` },
    { id: id(`w${w}_ua`,4), name: "Lat Pulldown",                  sets:w===16?3:4, reps:w===13?5:w===14?4:w===15?3:3, note:`${pulldown}` },
    { id: id(`w${w}_ua`,5), name: "Cable Lateral Raise",           sets:4, reps:w===16?15:12, note:`${lat}` },
    { id: id(`w${w}_ua`,6), name: "Incline DB Curl",               sets:3, reps:8,  note:`${curl}` },
    { id: id(`w${w}_ua`,7), name: "Overhead Cable Tricep Ext.",    sets:3, reps:8,  note:`${tricep}` },
  ],
});

const B3_LB = (w, thrust, sumo, legext, legcurl, abduct, calf, crunch, pallof) => ({
  label: "Lower B", focus: "Strength — Hip", color: COLORS["Lower B"],
  exercises: [
    { id: id(`w${w}_lb`,1), name: "Barbell Hip Thrust",            sets:4, reps:w===13?6:w===14?5:w===15?4:3, note:`${thrust}` },
    { id: id(`w${w}_lb`,2), name: "Sumo Deadlift",                 sets:w===16?3:4, reps:w===13?5:w===14?4:w===15?3:3, note:`${sumo}` },
    { id: id(`w${w}_lb`,3), name: "Leg Extension (reclined ~40°)", sets:3, reps:10, note:`${legext}` },
    { id: id(`w${w}_lb`,4), name: "Lying Leg Curl",                sets:3, reps:10, note:`${legcurl}` },
    { id: id(`w${w}_lb`,5), name: "Hip Abduction Machine",         sets:3, reps:12, note:`${abduct}` },
    { id: id(`w${w}_lb`,6), name: "Seated Calf Raise",             sets:4, reps:w>=15?10:12, note:`${calf}` },
    { id: id(`w${w}_lb`,7), name: "Decline Crunch",                sets:3, reps:15, note:`${crunch}` },
    { id: id(`w${w}_lb`,8), name: "Pallof Press",                  sets:3, reps:12, note:`${pallof}` },
  ],
});

const B3_UB = (w, flat, row, pulldown, pec, lat, rdelt, hammer, dips) => ({
  label: "Upper B", focus: "Strength — Vertical", color: COLORS["Upper B"],
  exercises: [
    { id: id(`w${w}_ub`,1), name: "Flat DB Press",           sets:3, reps:8,  note:`${flat}` },
    { id: id(`w${w}_ub`,2), name: "Cable Row",               sets:3, reps:10, note:`${row}` },
    { id: id(`w${w}_ub`,3), name: "Lat Pulldown",            sets:3, reps:8,  note:`${pulldown}` },
    { id: id(`w${w}_ub`,4), name: "Pec Deck",               sets:3, reps:10, note:`${pec}` },
    { id: id(`w${w}_ub`,5), name: "Leaning Lateral Raise",  sets:4, reps:12, note:`${lat}` },
    { id: id(`w${w}_ub`,6), name: "Rear Delt Cable Fly",    sets:3, reps:12, note:`${rdelt}` },
    { id: id(`w${w}_ub`,7), name: "Hammer Curls",           sets:3, reps:10, note:`${hammer}` },
    { id: id(`w${w}_ub`,8), name: "Dips",                   sets:3, reps:8,  note:`${dips}` },
  ],
});

// ─── DELOAD helpers ───────────────────────────────────────────────────────────

const DL1_LA = (w) => ({
  label: "Lower A", focus: "Deload — Quad", color: COLORS["Lower A"],
  exercises: [
    { id:`w${w}_la_1`, name:"Back Squat",                    sets:2, reps:8,  note:"90 lb · 2-3 RIR" },
    { id:`w${w}_la_2`, name:"Romanian Deadlift",             sets:2, reps:8,  note:"105 lb · 2-3 RIR" },
    { id:`w${w}_la_3`, name:"Walking Lunges",                sets:2, reps:10, note:"25 lb DBs · per leg" },
    { id:`w${w}_la_4`, name:"Seated Leg Curl",               sets:2, reps:10, note:"40 lb" },
    { id:`w${w}_la_5`, name:"Leg Extension (reclined ~40°)", sets:2, reps:10, note:"65 lb" },
    { id:`w${w}_la_6`, name:"Standing Calf Raise",           sets:2, reps:12, note:"55 lb" },
    { id:`w${w}_la_7`, name:"Cable Crunch",                  sets:2, reps:12, note:"45 lb" },
    { id:`w${w}_la_8`, name:"Hanging Leg Raise",             sets:2, reps:8,  note:"bodyweight" },
  ],
});
const DL1_UA = (w) => ({
  label: "Upper A", focus: "Deload — Horizontal", color: COLORS["Upper A"],
  exercises: [
    { id:`w${w}_ua_1`, name:"Low-Incline DB Press (15–30°)", sets:2, reps:8,  note:"60 lb DBs" },
    { id:`w${w}_ua_2`, name:"Chest-Supported Row",           sets:2, reps:8,  note:"30 lb/side" },
    { id:`w${w}_ua_3`, name:"Seated DB OHP",                 sets:2, reps:8,  note:"20 lb DBs" },
    { id:`w${w}_ua_4`, name:"Lat Pulldown",                  sets:2, reps:10, note:"70 lb" },
    { id:`w${w}_ua_5`, name:"Cable Lateral Raise",           sets:2, reps:12, note:"8 lb" },
    { id:`w${w}_ua_6`, name:"Incline DB Curl",               sets:2, reps:10, note:"12.5 lb DBs" },
    { id:`w${w}_ua_7`, name:"Overhead Cable Tricep Ext.",    sets:2, reps:10, note:"25 lb" },
  ],
});
const DL1_LB = (w) => ({
  label: "Lower B", focus: "Deload — Hip", color: COLORS["Lower B"],
  exercises: [
    { id:`w${w}_lb_1`, name:"Barbell Hip Thrust",            sets:2, reps:10, note:"95 lb" },
    { id:`w${w}_lb_2`, name:"Leg Press (deep ROM)",          sets:2, reps:10, note:"130 lb" },
    { id:`w${w}_lb_3`, name:"Leg Extension (reclined ~40°)", sets:2, reps:10, note:"60 lb" },
    { id:`w${w}_lb_4`, name:"Lying Leg Curl",                sets:2, reps:10, note:"35 lb" },
    { id:`w${w}_lb_5`, name:"Hip Abduction Machine",         sets:2, reps:12, note:"60 lb" },
    { id:`w${w}_lb_6`, name:"Seated Calf Raise",             sets:2, reps:12, note:"40 lb" },
    { id:`w${w}_lb_7`, name:"Cable Crunch",                  sets:2, reps:12, note:"45 lb" },
    { id:`w${w}_lb_8`, name:"Hanging Leg Raise",             sets:2, reps:8,  note:"bodyweight" },
  ],
});
const DL1_UB = (w) => ({
  label: "Upper B", focus: "Deload — Vertical", color: COLORS["Upper B"],
  exercises: [
    { id:`w${w}_ub_1`, name:"Flat DB Press",          sets:2, reps:8,  note:"60 lb DBs" },
    { id:`w${w}_ub_2`, name:"Cable Row",              sets:2, reps:10, note:"60 lb" },
    { id:`w${w}_ub_3`, name:"Lat Pulldown",           sets:2, reps:10, note:"70 lb" },
    { id:`w${w}_ub_4`, name:"Pec Deck",              sets:2, reps:10, note:"50 lb" },
    { id:`w${w}_ub_5`, name:"Leaning Lateral Raise", sets:2, reps:12, note:"8 lb DBs" },
    { id:`w${w}_ub_6`, name:"Reverse Pec Deck",      sets:2, reps:12, note:"45 lb" },
    { id:`w${w}_ub_7`, name:"Hammer Curls",          sets:2, reps:10, note:"17.5 lb DBs" },
    { id:`w${w}_ub_8`, name:"Rope Pushdown",         sets:2, reps:10, note:"30 lb" },
  ],
});

const DL2_LA = (w) => ({
  label: "Lower A", focus: "Deload — Quad", color: COLORS["Lower A"],
  exercises: [
    { id:`w${w}_la_1`, name:"Hack Squat",                    sets:2, reps:8,  note:"95 lb" },
    { id:`w${w}_la_2`, name:"Single-Leg RDL",                sets:2, reps:8,  note:"30 lb DBs · per leg" },
    { id:`w${w}_la_3`, name:"Bulgarian Split Squat",         sets:2, reps:8,  note:"25 lb DBs · per leg" },
    { id:`w${w}_la_4`, name:"Lying Leg Curl",                sets:2, reps:8,  note:"45 lb" },
    { id:`w${w}_la_5`, name:"Leg Extension (reclined ~40°)", sets:2, reps:8,  note:"70 lb" },
    { id:`w${w}_la_6`, name:"Standing Calf Raise",           sets:2, reps:10, note:"75 lb" },
    { id:`w${w}_la_7`, name:"Ab Wheel Rollout",              sets:2, reps:8,  note:"bodyweight" },
    { id:`w${w}_la_8`, name:"Pallof Press",                  sets:2, reps:10, note:"15 lb" },
  ],
});
const DL2_UA = (w) => ({
  label: "Upper A", focus: "Deload — Horizontal", color: COLORS["Upper A"],
  exercises: [
    { id:`w${w}_ua_1`, name:"Low-Incline DB Press (15–30°)", sets:2, reps:6, note:"65 lb DBs" },
    { id:`w${w}_ua_2`, name:"Barbell Bent-Over Row",         sets:2, reps:6, note:"65 lb" },
    { id:`w${w}_ua_3`, name:"Arnold Press",                  sets:2, reps:6, note:"17.5 lb DBs" },
    { id:`w${w}_ua_4`, name:"Pull-Up (assisted)",            sets:2, reps:6, note:"40 lb assist" },
    { id:`w${w}_ua_5`, name:"Cable Lateral Raise",           sets:2, reps:12,note:"10 lb" },
    { id:`w${w}_ua_6`, name:"Preacher Curl",                 sets:2, reps:8, note:"15 lb DBs" },
    { id:`w${w}_ua_7`, name:"Close-Grip Bench Press",        sets:2, reps:6, note:"55 lb" },
  ],
});
const DL2_LB = (w) => ({
  label: "Lower B", focus: "Deload — Hip", color: COLORS["Lower B"],
  exercises: [
    { id:`w${w}_lb_1`, name:"Barbell Hip Thrust",           sets:2, reps:8,  note:"115 lb" },
    { id:`w${w}_lb_2`, name:"Bulgarian Split Squat",        sets:2, reps:8,  note:"25 lb DBs · per leg" },
    { id:`w${w}_lb_3`, name:"Leg Press (deep ROM)",         sets:2, reps:8,  note:"150 lb" },
    { id:`w${w}_lb_4`, name:"Seated Leg Curl",              sets:2, reps:8,  note:"45 lb" },
    { id:`w${w}_lb_5`, name:"Hip Abduction Machine",        sets:2, reps:10, note:"70 lb" },
    { id:`w${w}_lb_6`, name:"Seated Calf Raise",            sets:2, reps:10, note:"50 lb" },
    { id:`w${w}_lb_7`, name:"Ab Wheel Rollout",             sets:2, reps:8,  note:"bodyweight" },
    { id:`w${w}_lb_8`, name:"Dead Bug",                     sets:2, reps:6,  note:"per side · bodyweight" },
  ],
});
const DL2_UB = (w) => ({
  label: "Upper B", focus: "Deload — Accessory", color: COLORS["Upper B"],
  exercises: [
    { id:`w${w}_ub_1`, name:"Low Cable Fly (cross-body)",    sets:2, reps:10, note:"12.5 lb/side" },
    { id:`w${w}_ub_2`, name:"Chest-Supported DB Row",        sets:2, reps:8,  note:"30 lb DBs" },
    { id:`w${w}_ub_3`, name:"Neutral-Grip Lat Pulldown",     sets:2, reps:8,  note:"75 lb" },
    { id:`w${w}_ub_4`, name:"Machine Chest Press",           sets:2, reps:8,  note:"55 lb" },
    { id:`w${w}_ub_5`, name:"Face Pull",                     sets:2, reps:12, note:"25 lb" },
    { id:`w${w}_ub_6`, name:"Leaning Lateral Raise",         sets:2, reps:12, note:"10 lb DBs" },
    { id:`w${w}_ub_7`, name:"Drag Curl",                     sets:2, reps:8,  note:"12.5 lb DBs" },
    { id:`w${w}_ub_8`, name:"Rope Pushdown",                 sets:2, reps:8,  note:"35 lb" },
  ],
});

// ─── PROGRAM ARRAY ────────────────────────────────────────────────────────────

export const PROGRAM = [
  // ── Block 1 ──
  { weekNum:1,  label:"Block 1 · Week 1",  block:"Block 1",  type:"training", workoutOrder:WORKOUT_ORDER,
    workouts: {
      "Lower A": B1_LA(1,"95 lb","115 lb","25 lb DBs","45 lb","75 lb","65 lb","50 lb"),
      "Upper A": B1_UA(1,"65 lb DBs","35 lb/side","20 lb DBs","85 lb","10 lb","15 lb DBs","30 lb"),
      "Lower B": B1_LB(1,"115 lb","150 lb","70 lb","40 lb","70 lb","45 lb","50 lb"),
      "Upper B": B1_UB(1,"65 lb DBs","70 lb","80 lb","55 lb","10 lb DBs","50 lb","20 lb DBs","35 lb"),
    },
  },
  { weekNum:2,  label:"Block 1 · Week 2",  block:"Block 1",  type:"training", workoutOrder:WORKOUT_ORDER,
    workouts: {
      "Lower A": B1_LA(2,"100 lb","120 lb","25 lb DBs","45 lb","75 lb","65 lb","50 lb"),
      "Upper A": B1_UA(2,"65 lb DBs","35 lb/side","20 lb DBs","85 lb","10 lb","15 lb DBs","30 lb"),
      "Lower B": B1_LB(2,"120 lb","160 lb","70 lb","40 lb","70 lb","45 lb","55 lb"),
      "Upper B": B1_UB(2,"65 lb DBs","70 lb","80 lb","55 lb","10 lb DBs","50 lb","20 lb DBs","35 lb"),
    },
  },
  { weekNum:3,  label:"Block 1 · Week 3",  block:"Block 1",  type:"training", workoutOrder:WORKOUT_ORDER,
    workouts: {
      "Lower A": B1_LA(3,"100 lb","120 lb","30 lb DBs","50 lb","80 lb","75 lb","55 lb"),
      "Upper A": B1_UA(3,"70 lb DBs","40 lb/side","25 lb DBs","90 lb","10 lb","17.5 lb DBs","32.5 lb"),
      "Lower B": B1_LB(3,"120 lb","160 lb","75 lb","45 lb","80 lb","50 lb","55 lb"),
      "Upper B": B1_UB(3,"70 lb DBs","75 lb","85 lb","60 lb","12.5 lb DBs","55 lb","22.5 lb DBs","40 lb"),
    },
  },
  { weekNum:4,  label:"Block 1 · Week 4",  block:"Block 1",  type:"training", workoutOrder:WORKOUT_ORDER,
    workouts: {
      "Lower A": B1_LA(4,"105 lb","125 lb","30 lb DBs","50 lb","80 lb","75 lb","60 lb"),
      "Upper A": B1_UA(4,"70 lb DBs","40 lb/side","25 lb DBs","90 lb","10 lb","17.5 lb DBs","35 lb"),
      "Lower B": B1_LB(4,"125 lb","170 lb","75 lb","45 lb","80 lb","50 lb","60 lb"),
      "Upper B": B1_UB(4,"70 lb DBs","75 lb","85 lb","60 lb","10 lb DBs","55 lb","22.5 lb DBs","40 lb"),
    },
  },
  { weekNum:5,  label:"Block 1 · Week 5",  block:"Block 1",  type:"training", workoutOrder:WORKOUT_ORDER,
    workouts: {
      "Lower A": B1_LA(5,"100 lb","120 lb","30 lb DBs","50 lb","80 lb","75 lb","60 lb"),
      "Upper A": B1_UA(5,"65 lb DBs","40 lb/side","20 lb DBs","85 lb","10 lb","17.5 lb DBs","35 lb"),
      "Lower B": B1_LB(5,"125 lb","160 lb","75 lb","45 lb","80 lb","55 lb","60 lb"),
      "Upper B": B1_UB(5,"70 lb DBs","75 lb","85 lb","60 lb","12.5 lb DBs","55 lb","22.5 lb DBs","42.5 lb"),
    },
  },

  // ── Deload 1 ──
  { weekNum:6,  label:"Deload 1 · Week 6", block:"Deload 1", type:"deload",   workoutOrder:WORKOUT_ORDER,
    workouts: { "Lower A":DL1_LA(6), "Upper A":DL1_UA(6), "Lower B":DL1_LB(6), "Upper B":DL1_UB(6) },
  },

  // ── Block 2 ──
  { weekNum:7,  label:"Block 2 · Week 7",  block:"Block 2",  type:"training", workoutOrder:WORKOUT_ORDER,
    workouts: {
      "Lower A": B2_LA(7,"100 lb","35 lb DBs","30 lb DBs","45 lb","80 lb","75 lb","BW","20 lb"),
      "Upper A": B2_UA(7,"75 lb DBs","75 lb","20 lb DBs","40 lb assist","12.5 lb","17.5 lb DBs","65 lb"),
      "Lower B": B2_LB(7,"125 lb","30 lb DBs","170 lb","50 lb","85 lb","55 lb","BW","BW"),
      "Upper B": B2_UB(7,"15 lb/side","35 lb DBs","85 lb","65 lb","30 lb","12.5 lb DBs","15 lb DBs","40 lb"),
    },
  },
  { weekNum:8,  label:"Block 2 · Week 8",  block:"Block 2",  type:"training", workoutOrder:WORKOUT_ORDER,
    workouts: {
      "Lower A": B2_LA(8,"110 lb","37.5 lb DBs","32.5 lb DBs","50 lb","85 lb","85 lb","BW","22.5 lb"),
      "Upper A": B2_UA(8,"75 lb DBs","80 lb","20 lb DBs","35 lb assist","12.5 lb","17.5 lb DBs","70 lb"),
      "Lower B": B2_LB(8,"135 lb","32.5 lb DBs","180 lb","50 lb","90 lb","60 lb","BW","BW"),
      "Upper B": B2_UB(8,"17.5 lb/side","37.5 lb DBs","90 lb","70 lb","32.5 lb","12.5 lb DBs","17.5 lb DBs","42.5 lb"),
    },
  },
  { weekNum:9,  label:"Block 2 · Week 9",  block:"Block 2",  type:"training", workoutOrder:WORKOUT_ORDER,
    workouts: {
      "Lower A": B2_LA(9,"115 lb","40 lb DBs","35 lb DBs","50 lb","85 lb","85 lb","BW","25 lb"),
      "Upper A": B2_UA(9,"80 lb DBs","85 lb","22.5 lb DBs","35 lb assist","12.5 lb","20 lb DBs","75 lb"),
      "Lower B": B2_LB(9,"135 lb","35 lb DBs","180 lb","55 lb","90 lb","60 lb","BW","BW"),
      "Upper B": B2_UB(9,"17.5 lb/side","40 lb DBs","90 lb","70 lb","35 lb","15 lb DBs","17.5 lb DBs","45 lb"),
    },
  },
  { weekNum:10, label:"Block 2 · Week 10", block:"Block 2",  type:"training", workoutOrder:WORKOUT_ORDER,
    workouts: {
      "Lower A": B2_LA(10,"120 lb","40 lb DBs","37.5 lb DBs","55 lb","85 lb","90 lb","BW","25 lb"),
      "Upper A": B2_UA(10,"80 lb DBs","90 lb","22.5 lb DBs","30 lb assist","15 lb","20 lb DBs","75 lb"),
      "Lower B": B2_LB(10,"145 lb","37.5 lb DBs","190 lb","55 lb","95 lb","65 lb","BW","BW"),
      "Upper B": B2_UB(10,"20 lb/side","40 lb DBs","90 lb","75 lb","35 lb","15 lb DBs","20 lb DBs","45 lb"),
    },
  },
  { weekNum:11, label:"Block 2 · Week 11", block:"Block 2",  type:"training", workoutOrder:WORKOUT_ORDER,
    workouts: {
      "Lower A": B2_LA(11,"125 lb","42.5 lb DBs","40 lb DBs","55 lb","90 lb","95 lb","BW","25 lb"),
      "Upper A": B2_UA(11,"80 lb DBs","90 lb","25 lb DBs","30 lb assist","12.5 lb","20 lb DBs","80 lb"),
      "Lower B": B2_LB(11,"155 lb","40 lb DBs","200 lb","60 lb","90 lb","65 lb","BW","BW"),
      "Upper B": B2_UB(11,"20 lb/side","42.5 lb DBs","95 lb","75 lb","37.5 lb","15 lb DBs","20 lb DBs","47.5 lb"),
    },
  },

  // ── Deload 2 ──
  { weekNum:12, label:"Deload 2 · Week 12", block:"Deload 2", type:"deload",  workoutOrder:WORKOUT_ORDER,
    workouts: { "Lower A":DL2_LA(12), "Upper A":DL2_UA(12), "Lower B":DL2_LB(12), "Upper B":DL2_UB(12) },
  },

  // ── Block 3 ──
  { weekNum:13, label:"Block 3 · Week 13", block:"Block 3",  type:"training", workoutOrder:WORKOUT_ORDER,
    workouts: {
      "Lower A": B3_LA(13,"110 lb","130 lb","200 lb","60 lb","90 lb","90 lb","BW","BW"),
      "Upper A": B3_UA(13,"80 lb DBs","45 lb/side","55 lb","100 lb","15 lb","20 lb DBs","42.5 lb"),
      "Lower B": B3_LB(13,"155 lb","115 lb","85 lb","55 lb","95 lb","65 lb","BW","25 lb"),
      "Upper B": B3_UB(13,"75 lb DBs","85 lb","95 lb","75 lb","15 lb DBs","15 lb/side","27.5 lb DBs","BW"),
    },
  },
  { weekNum:14, label:"Block 3 · Week 14", block:"Block 3",  type:"training", workoutOrder:WORKOUT_ORDER,
    workouts: {
      "Lower A": B3_LA(14,"115 lb","135 lb","210 lb","60 lb","95 lb","100 lb","5 lb plate","BW"),
      "Upper A": B3_UA(14,"85 lb DBs","50 lb/side","60 lb","105 lb","15 lb","22.5 lb DBs","45 lb"),
      "Lower B": B3_LB(14,"160 lb","125 lb","90 lb","55 lb","100 lb","70 lb","5 lb plate","27.5 lb"),
      "Upper B": B3_UB(14,"80 lb DBs","85 lb","100 lb","75 lb","15 lb DBs","15 lb/side","27.5 lb DBs","BW"),
    },
  },
  { weekNum:15, label:"Block 3 · Week 15", block:"Block 3",  type:"training", workoutOrder:WORKOUT_ORDER,
    workouts: {
      "Lower A": B3_LA(15,"120 lb","140 lb","220 lb","65 lb","95 lb","100 lb","10 lb plate","BW"),
      "Upper A": B3_UA(15,"85 lb DBs","55 lb/side","65 lb","110 lb","15 lb","22.5 lb DBs","45 lb"),
      "Lower B": B3_LB(15,"165 lb","130 lb","90 lb","60 lb","100 lb","70 lb","10 lb plate","27.5 lb"),
      "Upper B": B3_UB(15,"80 lb DBs","90 lb","100 lb","75 lb","17.5 lb DBs","17.5 lb/side","30 lb DBs","BW +5 lb"),
    },
  },
  { weekNum:16, label:"Block 3 · Week 16", block:"Block 3",  type:"training", workoutOrder:WORKOUT_ORDER,
    workouts: {
      "Lower A": B3_LA(16,"125 lb","145 lb","220 lb","65 lb","100 lb","105 lb","10 lb plate","BW"),
      "Upper A": B3_UA(16,"85 lb DBs","55 lb/side","65 lb","110 lb","12.5 lb","22.5 lb DBs","47.5 lb"),
      "Lower B": B3_LB(16,"175 lb","135 lb","95 lb","60 lb","105 lb","75 lb","10 lb plate","30 lb"),
      "Upper B": B3_UB(16,"80 lb DBs","90 lb","105 lb","80 lb","17.5 lb DBs","17.5 lb/side","30 lb DBs","BW +5 lb"),
    },
  },

  // ── Final / Taper Week ──
  { weekNum:17, label:"Final Week · Week 17", block:"Final Week", type:"taper",
    workoutOrder:["Lower A","Upper A"],
    workouts: {
      "Lower A": {
        label:"Lower A", focus:"Taper — Quad", color:COLORS["Lower A"],
        exercises: [
          { id:"w17_la_1", name:"Back Squat",                    sets:3, reps:5,  note:"95 lb · 3 RIR" },
          { id:"w17_la_2", name:"Romanian Deadlift",             sets:3, reps:5,  note:"115 lb · 3 RIR" },
          { id:"w17_la_3", name:"Leg Press (deep ROM)",          sets:2, reps:8,  note:"180 lb" },
          { id:"w17_la_4", name:"Seated Leg Curl",               sets:2, reps:10, note:"50 lb" },
          { id:"w17_la_5", name:"Leg Extension (reclined ~40°)", sets:2, reps:10, note:"75 lb" },
          { id:"w17_la_6", name:"Standing Calf Raise",           sets:2, reps:12, note:"80 lb" },
          { id:"w17_la_7", name:"Decline Crunch",                sets:2, reps:12, note:"bodyweight" },
          { id:"w17_la_8", name:"Dead Bug",                      sets:2, reps:6,  note:"per side · bodyweight" },
        ],
      },
      "Upper A": {
        label:"Upper A", focus:"Taper — Horizontal", color:COLORS["Upper A"],
        exercises: [
          { id:"w17_ua_1", name:"Low-Incline DB Press (15–30°)", sets:3, reps:8,  note:"70 lb DBs · 3 RIR" },
          { id:"w17_ua_2", name:"Chest-Supported Row",           sets:3, reps:8,  note:"35 lb/side · 3 RIR" },
          { id:"w17_ua_3", name:"Barbell OHP",                   sets:2, reps:8,  note:"50 lb" },
          { id:"w17_ua_4", name:"Lat Pulldown",                  sets:2, reps:10, note:"85 lb" },
          { id:"w17_ua_5", name:"Cable Lateral Raise",           sets:2, reps:15, note:"10 lb" },
          { id:"w17_ua_6", name:"Incline DB Curl",               sets:2, reps:10, note:"15 lb DBs" },
          { id:"w17_ua_7", name:"Overhead Cable Tricep Ext.",    sets:2, reps:10, note:"30 lb" },
        ],
      },
    },
  },
];

// ─── Back-compat exports (WorkoutLogger uses these for week 1 if not passed a week) ──
export const WORKOUT_TEMPLATES = PROGRAM[0].workouts;
