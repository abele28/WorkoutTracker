// ============================================================
// SUMMER 2026 LIFTING PROGRAM — 16 Weeks
// Source: Summer2026LiftingProgram.xlsx
// Blocks: Foundation (1-4) · Hypertrophy (5-8) · Strength (9-12) · Peak (13-16)
// ============================================================

const COLORS = {
  "Upper A": "#e85d26",
  "Lower A": "#2eb87a",
  "Upper B": "#3b7dd8",
  "Lower B": "#9b45d4",
};

export const WORKOUT_ORDER = ["Upper A", "Lower A", "Upper B", "Lower B"];

const x = (w, t, n, name, sets, reps, note) => ({
  id: `w${w}_${t}_${n}`, name, sets, reps, note,
});

// ─── BLOCK 1 — FOUNDATION (Weeks 1–4) ───────────────────────────────────────

const W1 = {
  "Upper A": { label:"Upper A", focus:"Horizontal Push / Pull", color:COLORS["Upper A"], exercises:[
    x(1,"ua",1,"30° Incline DB Press",4,12,"25 lbs/hand · RIR 3"),
    x(1,"ua",2,"Chest Supported Row",4,12,"50 lbs/hand · RIR 3"),
    x(1,"ua",3,"Seated DB OH Press",3,12,"17.5 lbs/hand · RIR 3"),
    x(1,"ua",4,"Cable Lat Raises",3,15,"12 lbs/arm · RIR 3"),
    x(1,"ua",5,"Incline DB Curls",3,12,"12.5 lbs/hand · RIR 3"),
    x(1,"ua",6,"Cable OH Tricep Extension",3,12,"25 lbs · RIR 3"),
    x(1,"ua",7,"Plank",3,30,"sec · bodyweight"),
  ]},
  "Lower A": { label:"Lower A", focus:"Quad Dominant", color:COLORS["Lower A"], exercises:[
    x(1,"la",1,"Back Squat",4,12,"75 lbs · RIR 3"),
    x(1,"la",2,"Bulgarian Split Squat",3,12,"20 lbs/hand · per leg · RIR 3"),
    x(1,"la",3,"Leg Curl (machine)",3,12,"40 lbs · RIR 3"),
    x(1,"la",4,"Leg Extension",3,12,"60 lbs · RIR 3"),
    x(1,"la",5,"Standing Calf Raise",3,15,"BW + 45 lbs · RIR 3"),
    x(1,"la",6,"Suitcase Carry",3,20,"m/side · heavy KB/DB"),
  ]},
  "Upper B": { label:"Upper B", focus:"Vertical Push / Pull", color:COLORS["Upper B"], exercises:[
    x(1,"ub",1,"Pull-Up: Dead Hang",3,25,"sec · bodyweight · holds"),
    x(1,"ub",2,"Lat Pulldown",4,12,"75 lbs · RIR 3"),
    x(1,"ub",3,"Flat DB Press",3,12,"25 lbs/hand · RIR 3"),
    x(1,"ub",4,"Seated Cable Row",3,12,"95 lbs · RIR 3"),
    x(1,"ub",5,"Face Pulls",3,15,"25 lbs · RIR 3"),
    x(1,"ub",6,"Hammer Curls",3,12,"15 lbs/hand · RIR 3"),
    x(1,"ub",7,"Tricep Rope Pushdown",3,12,"35 lbs · RIR 3"),
    x(1,"ub",8,"Pallof Press",3,10,"light cable · per side"),
  ]},
  "Lower B": { label:"Lower B", focus:"Hinge Dominant", color:COLORS["Lower B"], exercises:[
    x(1,"lb",1,"Trap Bar Deadlift",4,10,"125 lbs · RIR 3"),
    x(1,"lb",2,"KB Single-Leg RDL",3,10,"35 lb KB · per leg · RIR 3"),
    x(1,"lb",3,"KB Swings",3,15,"35 lb KB"),
    x(1,"lb",4,"Barbell Hip Thrust",3,12,"135 lbs · RIR 3"),
    x(1,"lb",5,"Seated Calf Raise",3,15,"45 lbs · RIR 3"),
    x(1,"lb",6,"Cable Woodchop",3,12,"light cable · per side"),
  ]},
};

const W2 = {
  "Upper A": { label:"Upper A", focus:"Horizontal Push / Pull", color:COLORS["Upper A"], exercises:[
    x(2,"ua",1,"30° Incline DB Press",4,12,"25 lbs/hand · RIR 3"),
    x(2,"ua",2,"Chest Supported Row",4,12,"55 lbs/hand · RIR 3"),
    x(2,"ua",3,"Seated DB OH Press",3,12,"20 lbs/hand · RIR 3"),
    x(2,"ua",4,"Cable Lat Raises",3,15,"12 lbs/arm · RIR 3"),
    x(2,"ua",5,"Incline DB Curls",3,12,"12.5 lbs/hand · RIR 3"),
    x(2,"ua",6,"Cable OH Tricep Extension",3,12,"27.5 lbs · RIR 3"),
    x(2,"ua",7,"Plank",3,40,"sec · bodyweight"),
  ]},
  "Lower A": { label:"Lower A", focus:"Quad Dominant", color:COLORS["Lower A"], exercises:[
    x(2,"la",1,"Back Squat",4,12,"80 lbs · RIR 3"),
    x(2,"la",2,"Bulgarian Split Squat",3,12,"25 lbs/hand · per leg · RIR 3"),
    x(2,"la",3,"Leg Curl (machine)",3,12,"42.5 lbs · RIR 3"),
    x(2,"la",4,"Leg Extension",3,12,"65 lbs · RIR 3"),
    x(2,"la",5,"Standing Calf Raise",3,15,"BW + 50 lbs · RIR 3"),
    x(2,"la",6,"Suitcase Carry",3,25,"m/side · heavy KB/DB"),
  ]},
  "Upper B": { label:"Upper B", focus:"Vertical Push / Pull", color:COLORS["Upper B"], exercises:[
    x(2,"ub",1,"Pull-Up: Scapular Pull-Up",3,8,"bodyweight"),
    x(2,"ub",2,"Lat Pulldown",4,12,"80 lbs · RIR 3"),
    x(2,"ub",3,"Flat DB Press",3,12,"25 lbs/hand · RIR 3"),
    x(2,"ub",4,"Seated Cable Row",3,12,"100 lbs · RIR 3"),
    x(2,"ub",5,"Face Pulls",3,15,"27.5 lbs · RIR 3"),
    x(2,"ub",6,"Hammer Curls",3,12,"15 lbs/hand · RIR 3"),
    x(2,"ub",7,"Tricep Rope Pushdown",3,12,"37.5 lbs · RIR 3"),
    x(2,"ub",8,"Pallof Press",3,10,"light cable · per side"),
  ]},
  "Lower B": { label:"Lower B", focus:"Hinge Dominant", color:COLORS["Lower B"], exercises:[
    x(2,"lb",1,"Trap Bar Deadlift",4,10,"130 lbs · RIR 3"),
    x(2,"lb",2,"KB Single-Leg RDL",3,10,"35 lb KB · per leg · RIR 3"),
    x(2,"lb",3,"KB Swings",3,15,"35 lb KB"),
    x(2,"lb",4,"Barbell Hip Thrust",3,12,"145 lbs · RIR 3"),
    x(2,"lb",5,"Seated Calf Raise",3,15,"47.5 lbs · RIR 3"),
    x(2,"lb",6,"Cable Woodchop",3,12,"light cable · per side"),
  ]},
};

const W3 = {
  "Upper A": { label:"Upper A", focus:"Horizontal Push / Pull", color:COLORS["Upper A"], exercises:[
    x(3,"ua",1,"30° Incline DB Press",4,10,"30 lbs/hand · RIR 2"),
    x(3,"ua",2,"Chest Supported Row",4,10,"55 lbs/hand · RIR 2"),
    x(3,"ua",3,"Seated DB OH Press",3,10,"20 lbs/hand · RIR 2"),
    x(3,"ua",4,"Cable Lat Raises",3,12,"13 lbs/arm · RIR 2"),
    x(3,"ua",5,"Incline DB Curls",3,10,"15 lbs/hand · RIR 2"),
    x(3,"ua",6,"Cable OH Tricep Extension",3,10,"30 lbs · RIR 2"),
    x(3,"ua",7,"Ab Wheel Rollout",3,8,"bodyweight"),
  ]},
  "Lower A": { label:"Lower A", focus:"Quad Dominant", color:COLORS["Lower A"], exercises:[
    x(3,"la",1,"Back Squat",4,10,"85 lbs · RIR 2"),
    x(3,"la",2,"Bulgarian Split Squat",3,10,"25 lbs/hand · per leg · RIR 2"),
    x(3,"la",3,"Leg Curl (machine)",3,10,"45 lbs · RIR 2"),
    x(3,"la",4,"Leg Extension",3,10,"70 lbs · RIR 2"),
    x(3,"la",5,"Standing Calf Raise",3,12,"BW + 55 lbs · RIR 2"),
    x(3,"la",6,"Suitcase Carry",3,30,"m/side · heavy KB/DB"),
  ]},
  "Upper B": { label:"Upper B", focus:"Vertical Push / Pull", color:COLORS["Upper B"], exercises:[
    x(3,"ub",1,"Pull-Up: Band-Assisted",3,6,"heavy band · RIR 3"),
    x(3,"ub",2,"Lat Pulldown",4,10,"82.5 lbs · RIR 2"),
    x(3,"ub",3,"Flat DB Press",3,10,"30 lbs/hand · RIR 2"),
    x(3,"ub",4,"Seated Cable Row",3,10,"105 lbs · RIR 2"),
    x(3,"ub",5,"Face Pulls",3,12,"30 lbs · RIR 2"),
    x(3,"ub",6,"Hammer Curls",3,10,"17.5 lbs/hand · RIR 2"),
    x(3,"ub",7,"Tricep Rope Pushdown",3,10,"40 lbs · RIR 2"),
    x(3,"ub",8,"Pallof Press",3,12,"light cable · per side"),
  ]},
  "Lower B": { label:"Lower B", focus:"Hinge Dominant", color:COLORS["Lower B"], exercises:[
    x(3,"lb",1,"Trap Bar Deadlift",4,8,"140 lbs · RIR 2"),
    x(3,"lb",2,"KB Single-Leg RDL",3,10,"40 lb KB · per leg · RIR 2"),
    x(3,"lb",3,"KB Swings",3,15,"44 lb KB"),
    x(3,"lb",4,"Barbell Hip Thrust",3,10,"155 lbs · RIR 2"),
    x(3,"lb",5,"Seated Calf Raise",3,12,"50 lbs · RIR 2"),
    x(3,"lb",6,"Cable Woodchop",3,12,"moderate cable · per side"),
  ]},
};

const W4_DELOAD = {
  "Upper A": { label:"Upper A", focus:"DELOAD — Horizontal", color:COLORS["Upper A"], exercises:[
    x(4,"ua",1,"30° Incline DB Press",2,10,"20 lbs/hand · RIR 4+"),
    x(4,"ua",2,"Chest Supported Row",2,10,"40 lbs/hand · RIR 4+"),
    x(4,"ua",3,"Seated DB OH Press",2,10,"15 lbs/hand · RIR 4+"),
    x(4,"ua",4,"Cable Lat Raises",2,12,"10 lbs/arm · RIR 4+"),
    x(4,"ua",5,"Incline DB Curls",2,10,"10 lbs/hand · RIR 4+"),
    x(4,"ua",6,"Cable OH Tricep Extension",2,10,"20 lbs · RIR 4+"),
    x(4,"ua",7,"Plank",2,30,"sec · bodyweight"),
  ]},
  "Lower A": { label:"Lower A", focus:"DELOAD — Quad", color:COLORS["Lower A"], exercises:[
    x(4,"la",1,"Back Squat",2,10,"60 lbs · RIR 4+"),
    x(4,"la",2,"Bulgarian Split Squat",2,10,"17.5 lbs/hand · per leg · RIR 4+"),
    x(4,"la",3,"Leg Curl (machine)",2,10,"30 lbs · RIR 4+"),
    x(4,"la",4,"Leg Extension",2,10,"50 lbs · RIR 4+"),
    x(4,"la",5,"Standing Calf Raise",2,15,"BW + 35 lbs · RIR 4+"),
    x(4,"la",6,"Suitcase Carry",2,20,"m/side · light"),
  ]},
  "Upper B": { label:"Upper B", focus:"DELOAD — Vertical", color:COLORS["Upper B"], exercises:[
    x(4,"ub",1,"Pull-Up: Band-Assisted",2,5,"heavy band · RIR 4+"),
    x(4,"ub",2,"Lat Pulldown",2,10,"65 lbs · RIR 4+"),
    x(4,"ub",3,"Flat DB Press",2,10,"20 lbs/hand · RIR 4+"),
    x(4,"ub",4,"Seated Cable Row",2,10,"80 lbs · RIR 4+"),
    x(4,"ub",5,"Face Pulls",2,12,"20 lbs · RIR 4+"),
    x(4,"ub",6,"Hammer Curls",2,10,"12.5 lbs/hand · RIR 4+"),
    x(4,"ub",7,"Tricep Rope Pushdown",2,10,"27.5 lbs · RIR 4+"),
    x(4,"ub",8,"Pallof Press",2,8,"light cable · per side"),
  ]},
  "Lower B": { label:"Lower B", focus:"DELOAD — Hinge", color:COLORS["Lower B"], exercises:[
    x(4,"lb",1,"Trap Bar Deadlift",2,8,"100 lbs · RIR 4+"),
    x(4,"lb",2,"KB Single-Leg RDL",2,8,"26 lb KB · per leg · RIR 4+"),
    x(4,"lb",3,"KB Swings",2,12,"26 lb KB"),
    x(4,"lb",4,"Barbell Hip Thrust",2,10,"105 lbs · RIR 4+"),
    x(4,"lb",5,"Seated Calf Raise",2,12,"35 lbs · RIR 4+"),
    x(4,"lb",6,"Cable Woodchop",2,10,"light cable · per side"),
  ]},
};

// ─── BLOCK 2 — HYPERTROPHY (Weeks 5–8) ──────────────────────────────────────

const W5 = {
  "Upper A": { label:"Upper A", focus:"Horizontal Push / Pull", color:COLORS["Upper A"], exercises:[
    x(5,"ua",1,"30° Incline DB Press",4,10,"30 lbs/hand · RIR 2"),
    x(5,"ua",2,"Chest Supported Row",4,10,"55 lbs/hand · RIR 2"),
    x(5,"ua",3,"Seated DB OH Press",3,10,"20 lbs/hand · RIR 2"),
    x(5,"ua",4,"Cable Lat Raises",3,12,"13 lbs/arm · RIR 2"),
    x(5,"ua",5,"Incline DB Curls",3,10,"15 lbs/hand · RIR 2"),
    x(5,"ua",6,"Cable OH Tricep Extension",3,10,"30 lbs · RIR 2"),
    x(5,"ua",7,"Ab Wheel Rollout",3,8,"bodyweight"),
  ]},
  "Lower A": { label:"Lower A", focus:"Quad Dominant", color:COLORS["Lower A"], exercises:[
    x(5,"la",1,"Back Squat",4,10,"90 lbs · RIR 2"),
    x(5,"la",2,"Bulgarian Split Squat",4,10,"25 lbs/hand · per leg · RIR 2"),
    x(5,"la",3,"Leg Curl (machine)",3,10,"47.5 lbs · RIR 2"),
    x(5,"la",4,"Leg Extension",3,10,"72.5 lbs · RIR 2"),
    x(5,"la",5,"Standing Calf Raise",3,12,"BW + 60 lbs · RIR 2"),
    x(5,"la",6,"Suitcase Carry",3,30,"m/side · heavy KB/DB"),
  ]},
  "Upper B": { label:"Upper B", focus:"Vertical Push / Pull", color:COLORS["Upper B"], exercises:[
    x(5,"ub",1,"Pull-Up: Band-Assisted",3,6,"heavy band · RIR 2"),
    x(5,"ub",2,"Lat Pulldown",4,10,"85 lbs · RIR 2"),
    x(5,"ub",3,"Flat DB Press",3,10,"30 lbs/hand · RIR 2"),
    x(5,"ub",4,"Seated Cable Row",3,10,"110 lbs · RIR 2"),
    x(5,"ub",5,"Face Pulls",3,15,"30 lbs · RIR 2"),
    x(5,"ub",6,"Hammer Curls",3,10,"17.5 lbs/hand · RIR 2"),
    x(5,"ub",7,"Tricep Rope Pushdown",3,10,"40 lbs · RIR 2"),
    x(5,"ub",8,"Pallof Press",3,12,"moderate cable · per side"),
  ]},
  "Lower B": { label:"Lower B", focus:"Hinge Dominant", color:COLORS["Lower B"], exercises:[
    x(5,"lb",1,"Trap Bar Deadlift",4,8,"145 lbs · RIR 2"),
    x(5,"lb",2,"KB Single-Leg RDL",4,10,"40 lb KB · per leg · RIR 2"),
    x(5,"lb",3,"KB Swings",3,15,"44 lb KB"),
    x(5,"lb",4,"Barbell Hip Thrust",4,10,"155 lbs · RIR 2"),
    x(5,"lb",5,"Seated Calf Raise",3,12,"52.5 lbs · RIR 2"),
    x(5,"lb",6,"Cable Woodchop",3,12,"moderate cable · per side"),
  ]},
};

const W6 = {
  "Upper A": { label:"Upper A", focus:"Horizontal Push / Pull", color:COLORS["Upper A"], exercises:[
    x(6,"ua",1,"30° Incline DB Press",4,8,"35 lbs/hand · RIR 2"),
    x(6,"ua",2,"Chest Supported Row",4,8,"60 lbs/hand · RIR 2"),
    x(6,"ua",3,"Seated DB OH Press",3,8,"25 lbs/hand · RIR 2"),
    x(6,"ua",4,"Cable Lat Raises",3,12,"13 lbs/arm · RIR 2"),
    x(6,"ua",5,"Incline DB Curls",3,10,"15 lbs/hand · RIR 2"),
    x(6,"ua",6,"Cable OH Tricep Extension",3,10,"32.5 lbs · RIR 2"),
    x(6,"ua",7,"Ab Wheel Rollout",3,10,"bodyweight"),
  ]},
  "Lower A": { label:"Lower A", focus:"Quad Dominant", color:COLORS["Lower A"], exercises:[
    x(6,"la",1,"Back Squat",4,8,"95 lbs · RIR 2"),
    x(6,"la",2,"Bulgarian Split Squat",4,8,"40 lbs/hand · per leg · RIR 2"),
    x(6,"la",3,"Leg Curl (machine)",3,10,"50 lbs · RIR 2"),
    x(6,"la",4,"Leg Extension",3,10,"75 lbs · RIR 2"),
    x(6,"la",5,"Standing Calf Raise",3,12,"BW + 65 lbs · RIR 2"),
    x(6,"la",6,"Suitcase Carry",3,35,"m/side · heavy KB/DB"),
  ]},
  "Upper B": { label:"Upper B", focus:"Vertical Push / Pull", color:COLORS["Upper B"], exercises:[
    x(6,"ub",1,"Pull-Up: Band-Assisted",3,5,"medium band · RIR 2"),
    x(6,"ub",2,"Lat Pulldown",4,8,"90 lbs · RIR 2"),
    x(6,"ub",3,"Flat DB Press",3,8,"35 lbs/hand · RIR 2"),
    x(6,"ub",4,"Seated Cable Row",3,10,"115 lbs · RIR 2"),
    x(6,"ub",5,"Face Pulls",3,15,"32.5 lbs · RIR 2"),
    x(6,"ub",6,"Hammer Curls",3,10,"17.5 lbs/hand · RIR 2"),
    x(6,"ub",7,"Tricep Rope Pushdown",3,10,"42.5 lbs · RIR 2"),
    x(6,"ub",8,"Pallof Press",3,12,"moderate cable · per side"),
  ]},
  "Lower B": { label:"Lower B", focus:"Hinge Dominant", color:COLORS["Lower B"], exercises:[
    x(6,"lb",1,"Trap Bar Deadlift",4,6,"135 lbs · RIR 2"),
    x(6,"lb",2,"KB Single-Leg RDL",4,10,"44 lb KB · per leg · RIR 2"),
    x(6,"lb",3,"KB Swings",3,15,"44 lb KB"),
    x(6,"lb",4,"Barbell Hip Thrust",4,10,"165 lbs · RIR 2"),
    x(6,"lb",5,"Seated Calf Raise",3,12,"55 lbs · RIR 2"),
    x(6,"lb",6,"Cable Woodchop",3,12,"moderate cable · per side"),
  ]},
};

const W7 = {
  "Upper A": { label:"Upper A", focus:"Horizontal Push / Pull", color:COLORS["Upper A"], exercises:[
    x(7,"ua",1,"30° Incline DB Press",4,8,"35 lbs/hand · RIR 1"),
    x(7,"ua",2,"Chest Supported Row",4,8,"65 lbs/hand · RIR 1"),
    x(7,"ua",3,"Seated DB OH Press",3,8,"25 lbs/hand · RIR 1"),
    x(7,"ua",4,"Cable Lat Raises",3,12,"14 lbs/arm · RIR 1"),
    x(7,"ua",5,"Incline DB Curls",3,8,"17.5 lbs/hand · RIR 1"),
    x(7,"ua",6,"Cable OH Tricep Extension",3,8,"35 lbs · RIR 1"),
    x(7,"ua",7,"Ab Wheel Rollout",3,10,"bodyweight"),
  ]},
  "Lower A": { label:"Lower A", focus:"Quad Dominant", color:COLORS["Lower A"], exercises:[
    x(7,"la",1,"Back Squat",4,8,"100 lbs · RIR 1"),
    x(7,"la",2,"Bulgarian Split Squat",4,8,"35 lbs/hand · per leg · RIR 1"),
    x(7,"la",3,"Leg Curl (machine)",3,8,"52.5 lbs · RIR 1"),
    x(7,"la",4,"Leg Extension",3,8,"77.5 lbs · RIR 1"),
    x(7,"la",5,"Standing Calf Raise",3,12,"BW + 70 lbs · RIR 1"),
    x(7,"la",6,"Suitcase Carry",3,35,"m/side · heavy KB/DB"),
  ]},
  "Upper B": { label:"Upper B", focus:"Vertical Push / Pull", color:COLORS["Upper B"], exercises:[
    x(7,"ub",1,"Pull-Up: Band-Assisted",3,5,"medium band · RIR 1"),
    x(7,"ub",2,"Lat Pulldown",4,8,"92.5 lbs · RIR 1"),
    x(7,"ub",3,"Flat DB Press",3,8,"35 lbs/hand · RIR 1"),
    x(7,"ub",4,"Seated Cable Row",3,8,"120 lbs · RIR 1"),
    x(7,"ub",5,"Face Pulls",3,15,"32.5 lbs · RIR 1"),
    x(7,"ub",6,"Hammer Curls",3,8,"20 lbs/hand · RIR 1"),
    x(7,"ub",7,"Tricep Rope Pushdown",3,8,"45 lbs · RIR 1"),
    x(7,"ub",8,"Pallof Press",3,12,"heavy cable · per side"),
  ]},
  "Lower B": { label:"Lower B", focus:"Hinge Dominant", color:COLORS["Lower B"], exercises:[
    x(7,"lb",1,"Trap Bar Deadlift",4,6,"190 lbs · RIR 1"),
    x(7,"lb",2,"KB Single-Leg RDL",4,8,"44 lb KB · per leg · RIR 1"),
    x(7,"lb",3,"KB Swings",3,15,"53 lb KB"),
    x(7,"lb",4,"Barbell Hip Thrust",4,8,"175 lbs · RIR 1"),
    x(7,"lb",5,"Seated Calf Raise",3,12,"57.5 lbs · RIR 1"),
    x(7,"lb",6,"Cable Woodchop",3,12,"heavy cable · per side"),
  ]},
};

const W8_DELOAD = {
  "Upper A": { label:"Upper A", focus:"DELOAD — Horizontal", color:COLORS["Upper A"], exercises:[
    x(8,"ua",1,"30° Incline DB Press",2,10,"25 lbs/hand · RIR 4+"),
    x(8,"ua",2,"Chest Supported Row",2,10,"50 lbs/hand · RIR 4+"),
    x(8,"ua",3,"Seated DB OH Press",2,10,"17.5 lbs/hand · RIR 4+"),
    x(8,"ua",4,"Cable Lat Raises",2,12,"10 lbs/arm · RIR 4+"),
    x(8,"ua",5,"Incline DB Curls",2,10,"12.5 lbs/hand · RIR 4+"),
    x(8,"ua",6,"Cable OH Tricep Extension",2,10,"22.5 lbs · RIR 4+"),
    x(8,"ua",7,"Plank",2,40,"sec · bodyweight"),
  ]},
  "Lower A": { label:"Lower A", focus:"DELOAD — Quad", color:COLORS["Lower A"], exercises:[
    x(8,"la",1,"Back Squat",2,8,"70 lbs · RIR 4+"),
    x(8,"la",2,"Bulgarian Split Squat",2,8,"20 lbs/hand · per leg · RIR 4+"),
    x(8,"la",3,"Leg Curl (machine)",2,10,"35 lbs · RIR 4+"),
    x(8,"la",4,"Leg Extension",2,10,"55 lbs · RIR 4+"),
    x(8,"la",5,"Standing Calf Raise",2,15,"BW + 40 lbs · RIR 4+"),
    x(8,"la",6,"Suitcase Carry",2,20,"m/side · light"),
  ]},
  "Upper B": { label:"Upper B", focus:"DELOAD — Vertical", color:COLORS["Upper B"], exercises:[
    x(8,"ub",1,"Pull-Up: Band-Assisted",2,5,"medium band · RIR 4+"),
    x(8,"ub",2,"Lat Pulldown",2,10,"70 lbs · RIR 4+"),
    x(8,"ub",3,"Flat DB Press",2,10,"25 lbs/hand · RIR 4+"),
    x(8,"ub",4,"Seated Cable Row",2,10,"90 lbs · RIR 4+"),
    x(8,"ub",5,"Face Pulls",2,12,"22.5 lbs · RIR 4+"),
    x(8,"ub",6,"Hammer Curls",2,10,"15 lbs/hand · RIR 4+"),
    x(8,"ub",7,"Tricep Rope Pushdown",2,10,"30 lbs · RIR 4+"),
    x(8,"ub",8,"Pallof Press",2,8,"light cable · per side"),
  ]},
  "Lower B": { label:"Lower B", focus:"DELOAD — Hinge", color:COLORS["Lower B"], exercises:[
    x(8,"lb",1,"Trap Bar Deadlift",2,6,"105 lbs · RIR 4+"),
    x(8,"lb",2,"KB Single-Leg RDL",2,8,"26 lb KB · per leg · RIR 4+"),
    x(8,"lb",3,"KB Swings",2,12,"35 lb KB"),
    x(8,"lb",4,"Barbell Hip Thrust",2,10,"115 lbs · RIR 4+"),
    x(8,"lb",5,"Seated Calf Raise",2,12,"40 lbs · RIR 4+"),
    x(8,"lb",6,"Cable Woodchop",2,10,"light cable · per side"),
  ]},
};

// ─── BLOCK 3 — STRENGTH (Weeks 9–12) ────────────────────────────────────────

const W9 = {
  "Upper A": { label:"Upper A", focus:"Strength — Horizontal", color:COLORS["Upper A"], exercises:[
    x(9,"ua",1,"30° Incline DB Press",5,6,"40 lbs/hand · RIR 2"),
    x(9,"ua",2,"Chest Supported Row",5,6,"65 lbs/hand · RIR 2"),
    x(9,"ua",3,"Seated DB OH Press",3,8,"25 lbs/hand · RIR 2"),
    x(9,"ua",4,"Cable Lat Raises",3,12,"15 lbs/arm · RIR 2"),
    x(9,"ua",5,"Incline DB Curls",3,8,"17.5 lbs/hand · RIR 2"),
    x(9,"ua",6,"Cable OH Tricep Extension",3,8,"37.5 lbs · RIR 2"),
    x(9,"ua",7,"Ab Wheel Rollout",3,12,"bodyweight"),
  ]},
  "Lower A": { label:"Lower A", focus:"Strength — Quad", color:COLORS["Lower A"], exercises:[
    x(9,"la",1,"Back Squat",5,5,"105 lbs · RIR 2"),
    x(9,"la",2,"Bulgarian Split Squat",4,8,"35 lbs/hand · per leg · RIR 2"),
    x(9,"la",3,"Leg Curl (machine)",3,8,"55 lbs · RIR 2"),
    x(9,"la",4,"Leg Extension",3,8,"80 lbs · RIR 2"),
    x(9,"la",5,"Standing Calf Raise",3,12,"BW + 75 lbs · RIR 2"),
    x(9,"la",6,"Suitcase Carry",3,40,"m/side · heavy KB/DB"),
  ]},
  "Upper B": { label:"Upper B", focus:"Strength — Vertical", color:COLORS["Upper B"], exercises:[
    x(9,"ub",1,"Pull-Up: Negative",3,5,"bodyweight · slow descent"),
    x(9,"ub",2,"Lat Pulldown",5,6,"97.5 lbs · RIR 2"),
    x(9,"ub",3,"Flat DB Press",3,8,"35 lbs/hand · RIR 2"),
    x(9,"ub",4,"Seated Cable Row",3,8,"125 lbs · RIR 2"),
    x(9,"ub",5,"Face Pulls",3,15,"35 lbs · RIR 2"),
    x(9,"ub",6,"Hammer Curls",3,8,"20 lbs/hand · RIR 2"),
    x(9,"ub",7,"Tricep Rope Pushdown",3,8,"47.5 lbs · RIR 2"),
    x(9,"ub",8,"Pallof Press",3,12,"heavy cable · per side"),
  ]},
  "Lower B": { label:"Lower B", focus:"Strength — Hinge", color:COLORS["Lower B"], exercises:[
    x(9,"lb",1,"Trap Bar Deadlift",5,5,"165 lbs · RIR 2"),
    x(9,"lb",2,"KB Single-Leg RDL",3,8,"44 lb KB · per leg · RIR 2"),
    x(9,"lb",3,"KB Swings",4,15,"53 lb KB"),
    x(9,"lb",4,"Barbell Hip Thrust",4,8,"180 lbs · RIR 2"),
    x(9,"lb",5,"Seated Calf Raise",3,12,"60 lbs · RIR 2"),
    x(9,"lb",6,"Cable Woodchop",3,12,"heavy cable · per side"),
  ]},
};

const W10 = {
  "Upper A": { label:"Upper A", focus:"Strength — Horizontal", color:COLORS["Upper A"], exercises:[
    x(10,"ua",1,"30° Incline DB Press",5,6,"40 lbs/hand · RIR 1"),
    x(10,"ua",2,"Chest Supported Row",5,6,"70 lbs/hand · RIR 1"),
    x(10,"ua",3,"Seated DB OH Press",3,6,"25 lbs/hand · RIR 1"),
    x(10,"ua",4,"Cable Lat Raises",3,12,"15 lbs/arm · RIR 1"),
    x(10,"ua",5,"Incline DB Curls",3,8,"17.5 lbs/hand · RIR 1"),
    x(10,"ua",6,"Cable OH Tricep Extension",3,8,"40 lbs · RIR 1"),
    x(10,"ua",7,"Ab Wheel Rollout",3,12,"bodyweight"),
  ]},
  "Lower A": { label:"Lower A", focus:"Strength — Quad", color:COLORS["Lower A"], exercises:[
    x(10,"la",1,"Back Squat",5,5,"110 lbs · RIR 1"),
    x(10,"la",2,"Bulgarian Split Squat",4,8,"40 lbs/hand · per leg · RIR 1"),
    x(10,"la",3,"Leg Curl (machine)",3,8,"57.5 lbs · RIR 1"),
    x(10,"la",4,"Leg Extension",3,8,"82.5 lbs · RIR 1"),
    x(10,"la",5,"Standing Calf Raise",3,12,"BW + 80 lbs · RIR 1"),
    x(10,"la",6,"Suitcase Carry",3,40,"m/side · heavy KB/DB"),
  ]},
  "Upper B": { label:"Upper B", focus:"Strength — Vertical", color:COLORS["Upper B"], exercises:[
    x(10,"ub",1,"Pull-Up: Negative",3,5,"bodyweight · slow descent"),
    x(10,"ub",2,"Lat Pulldown",5,6,"102.5 lbs · RIR 1"),
    x(10,"ub",3,"Flat DB Press",3,6,"40 lbs/hand · RIR 1"),
    x(10,"ub",4,"Seated Cable Row",3,8,"130 lbs · RIR 1"),
    x(10,"ub",5,"Face Pulls",3,15,"35 lbs · RIR 1"),
    x(10,"ub",6,"Hammer Curls",3,8,"25 lbs/hand · RIR 1"),
    x(10,"ub",7,"Tricep Rope Pushdown",3,8,"50 lbs · RIR 1"),
    x(10,"ub",8,"Pallof Press",3,12,"heavy cable · per side"),
  ]},
  "Lower B": { label:"Lower B", focus:"Strength — Hinge", color:COLORS["Lower B"], exercises:[
    x(10,"lb",1,"Trap Bar Deadlift",5,5,"180 lbs · RIR 1"),
    x(10,"lb",2,"KB Single-Leg RDL",3,8,"44 lb KB · per leg · RIR 1"),
    x(10,"lb",3,"KB Swings",4,15,"53 lb KB"),
    x(10,"lb",4,"Barbell Hip Thrust",4,8,"190 lbs · RIR 1"),
    x(10,"lb",5,"Seated Calf Raise",3,10,"62.5 lbs · RIR 1"),
    x(10,"lb",6,"Cable Woodchop",3,12,"heavy cable · per side"),
  ]},
};

const W11 = {
  "Upper A": { label:"Upper A", focus:"Strength — Horizontal", color:COLORS["Upper A"], exercises:[
    x(11,"ua",1,"30° Incline DB Press",5,5,"45 lbs/hand · RIR 1"),
    x(11,"ua",2,"Chest Supported Row",5,5,"70 lbs/hand · RIR 1"),
    x(11,"ua",3,"Seated DB OH Press",3,6,"30 lbs/hand · RIR 0-1"),
    x(11,"ua",4,"Cable Lat Raises",3,12,"15 lbs/arm · RIR 1"),
    x(11,"ua",5,"Incline DB Curls",3,8,"20 lbs/hand · RIR 1"),
    x(11,"ua",6,"Cable OH Tricep Extension",3,8,"42.5 lbs · RIR 1"),
    x(11,"ua",7,"Ab Wheel Rollout",3,12,"bodyweight"),
  ]},
  "Lower A": { label:"Lower A", focus:"Strength — Quad", color:COLORS["Lower A"], exercises:[
    x(11,"la",1,"Back Squat",5,5,"115 lbs · RIR 1"),
    x(11,"la",2,"Bulgarian Split Squat",4,6,"40 lbs/hand · per leg · RIR 1"),
    x(11,"la",3,"Leg Curl (machine)",3,8,"60 lbs · RIR 1"),
    x(11,"la",4,"Leg Extension",3,8,"85 lbs · RIR 1"),
    x(11,"la",5,"Standing Calf Raise",3,10,"BW + 85 lbs · RIR 1"),
    x(11,"la",6,"Suitcase Carry",3,40,"m/side · heaviest yet"),
  ]},
  "Upper B": { label:"Upper B", focus:"Strength — Vertical", color:COLORS["Upper B"], exercises:[
    x(11,"ub",1,"Pull-Up: Negatives + Unassisted",3,4,"bodyweight"),
    x(11,"ub",2,"Lat Pulldown",5,5,"107.5 lbs · RIR 1"),
    x(11,"ub",3,"Flat DB Press",3,6,"40 lbs/hand · RIR 1"),
    x(11,"ub",4,"Seated Cable Row",3,6,"135 lbs · RIR 1"),
    x(11,"ub",5,"Face Pulls",3,15,"37.5 lbs · RIR 1"),
    x(11,"ub",6,"Hammer Curls",3,8,"25 lbs/hand · RIR 1"),
    x(11,"ub",7,"Tricep Rope Pushdown",3,8,"52.5 lbs · RIR 1"),
    x(11,"ub",8,"Pallof Press",3,12,"heaviest cable · per side"),
  ]},
  "Lower B": { label:"Lower B", focus:"Strength — Hinge", color:COLORS["Lower B"], exercises:[
    x(11,"lb",1,"Trap Bar Deadlift",5,5,"190 lbs · RIR 1"),
    x(11,"lb",2,"KB Single-Leg RDL",3,6,"44 lb KB · per leg · RIR 1"),
    x(11,"lb",3,"KB Swings",4,15,"53 lb KB"),
    x(11,"lb",4,"Barbell Hip Thrust",4,6,"200 lbs · RIR 1"),
    x(11,"lb",5,"Seated Calf Raise",3,10,"65 lbs · RIR 1"),
    x(11,"lb",6,"Cable Woodchop",3,12,"heaviest cable · per side"),
  ]},
};

const W12_DELOAD = {
  "Upper A": { label:"Upper A", focus:"DELOAD — Horizontal", color:COLORS["Upper A"], exercises:[
    x(12,"ua",1,"30° Incline DB Press",2,8,"30 lbs/hand · RIR 4+"),
    x(12,"ua",2,"Chest Supported Row",2,8,"55 lbs/hand · RIR 4+"),
    x(12,"ua",3,"Seated DB OH Press",2,8,"20 lbs/hand · RIR 4+"),
    x(12,"ua",4,"Cable Lat Raises",2,12,"12 lbs/arm · RIR 4+"),
    x(12,"ua",5,"Incline DB Curls",2,8,"15 lbs/hand · RIR 4+"),
    x(12,"ua",6,"Cable OH Tricep Extension",2,8,"27.5 lbs · RIR 4+"),
    x(12,"ua",7,"Plank",2,45,"sec · bodyweight"),
  ]},
  "Lower A": { label:"Lower A", focus:"DELOAD — Quad", color:COLORS["Lower A"], exercises:[
    x(12,"la",1,"Back Squat",2,6,"80 lbs · RIR 4+"),
    x(12,"la",2,"Bulgarian Split Squat",2,8,"25 lbs/hand · per leg · RIR 4+"),
    x(12,"la",3,"Leg Curl (machine)",2,10,"40 lbs · RIR 4+"),
    x(12,"la",4,"Leg Extension",2,10,"60 lbs · RIR 4+"),
    x(12,"la",5,"Standing Calf Raise",2,15,"BW + 45 lbs · RIR 4+"),
    x(12,"la",6,"Suitcase Carry",2,20,"m/side · light"),
  ]},
  "Upper B": { label:"Upper B", focus:"DELOAD — Vertical", color:COLORS["Upper B"], exercises:[
    x(12,"ub",1,"Pull-Up: Negative",2,4,"bodyweight · slow descent"),
    x(12,"ub",2,"Lat Pulldown",2,8,"80 lbs · RIR 4+"),
    x(12,"ub",3,"Flat DB Press",2,8,"30 lbs/hand · RIR 4+"),
    x(12,"ub",4,"Seated Cable Row",2,8,"100 lbs · RIR 4+"),
    x(12,"ub",5,"Face Pulls",2,12,"25 lbs · RIR 4+"),
    x(12,"ub",6,"Hammer Curls",2,8,"17.5 lbs/hand · RIR 4+"),
    x(12,"ub",7,"Tricep Rope Pushdown",2,8,"35 lbs · RIR 4+"),
    x(12,"ub",8,"Pallof Press",2,8,"light cable · per side"),
  ]},
  "Lower B": { label:"Lower B", focus:"DELOAD — Hinge", color:COLORS["Lower B"], exercises:[
    x(12,"lb",1,"Trap Bar Deadlift",2,5,"135 lbs · RIR 4+"),
    x(12,"lb",2,"KB Single-Leg RDL",2,8,"35 lb KB · per leg · RIR 4+"),
    x(12,"lb",3,"KB Swings",2,12,"35 lb KB"),
    x(12,"lb",4,"Barbell Hip Thrust",2,10,"140 lbs · RIR 4+"),
    x(12,"lb",5,"Seated Calf Raise",2,12,"45 lbs · RIR 4+"),
    x(12,"lb",6,"Cable Woodchop",2,10,"light cable · per side"),
  ]},
};

// ─── BLOCK 4 — PEAK (Weeks 13–16) ───────────────────────────────────────────

const W13 = {
  "Upper A": { label:"Upper A", focus:"Peak — Horizontal", color:COLORS["Upper A"], exercises:[
    x(13,"ua",1,"30° Incline DB Press",4,8,"45 lbs/hand · RIR 2"),
    x(13,"ua",2,"Chest Supported Row",4,8,"70 lbs/hand · RIR 2"),
    x(13,"ua",3,"Seated DB OH Press",3,8,"30 lbs/hand · RIR 2"),
    x(13,"ua",4,"Cable Lat Raises",3,12,"15 lbs/arm · RIR 2"),
    x(13,"ua",5,"Incline DB Curls",3,8,"20 lbs/hand · RIR 2"),
    x(13,"ua",6,"Cable OH Tricep Extension",3,8,"45 lbs · RIR 2"),
    x(13,"ua",7,"Ab Wheel Rollout",3,12,"bodyweight"),
  ]},
  "Lower A": { label:"Lower A", focus:"Peak — Quad", color:COLORS["Lower A"], exercises:[
    x(13,"la",1,"Back Squat",4,6,"120 lbs · RIR 2"),
    x(13,"la",2,"Bulgarian Split Squat",4,8,"30 lbs/hand · per leg · RIR 2"),
    x(13,"la",3,"Leg Curl (machine)",3,10,"60 lbs · RIR 2"),
    x(13,"la",4,"Leg Extension",3,10,"85 lbs · RIR 2"),
    x(13,"la",5,"Standing Calf Raise",3,12,"BW + 85 lbs · RIR 2"),
    x(13,"la",6,"Suitcase Carry",3,40,"m/side · heavy KB/DB"),
  ]},
  "Upper B": { label:"Upper B", focus:"Peak — Vertical", color:COLORS["Upper B"], exercises:[
    x(13,"ub",1,"Pull-Up: Unassisted",3,2,"bodyweight · full ROM"),
    x(13,"ub",2,"Lat Pulldown",4,8,"110 lbs · RIR 2"),
    x(13,"ub",3,"Flat DB Press",3,8,"40 lbs/hand · RIR 2"),
    x(13,"ub",4,"Seated Cable Row",3,8,"135 lbs · RIR 2"),
    x(13,"ub",5,"Face Pulls",3,15,"37.5 lbs · RIR 2"),
    x(13,"ub",6,"Hammer Curls",3,8,"25 lbs/hand · RIR 2"),
    x(13,"ub",7,"Tricep Rope Pushdown",3,8,"55 lbs · RIR 2"),
    x(13,"ub",8,"Pallof Press",3,12,"heavy cable · per side"),
  ]},
  "Lower B": { label:"Lower B", focus:"Peak — Hinge", color:COLORS["Lower B"], exercises:[
    x(13,"lb",1,"Trap Bar Deadlift",4,6,"160 lbs · RIR 2"),
    x(13,"lb",2,"KB Single-Leg RDL",3,8,"44 lb KB · per leg · RIR 2"),
    x(13,"lb",3,"KB Swings",4,15,"53 lb KB"),
    x(13,"lb",4,"Barbell Hip Thrust",4,8,"195 lbs · RIR 2"),
    x(13,"lb",5,"Seated Calf Raise",3,12,"67.5 lbs · RIR 2"),
    x(13,"lb",6,"Cable Woodchop",3,12,"heavy cable · per side"),
  ]},
};

const W14 = {
  "Upper A": { label:"Upper A", focus:"Peak — Horizontal", color:COLORS["Upper A"], exercises:[
    x(14,"ua",1,"30° Incline DB Press",4,6,"45 lbs/hand · RIR 1"),
    x(14,"ua",2,"Chest Supported Row",4,6,"75 lbs/hand · RIR 1"),
    x(14,"ua",3,"Seated DB OH Press",3,6,"30 lbs/hand · RIR 1"),
    x(14,"ua",4,"Cable Lat Raises",3,12,"15 lbs/arm · RIR 1"),
    x(14,"ua",5,"Incline DB Curls",3,8,"20 lbs/hand · RIR 1"),
    x(14,"ua",6,"Cable OH Tricep Extension",3,8,"47.5 lbs · RIR 1"),
    x(14,"ua",7,"Ab Wheel Rollout",3,12,"bodyweight"),
  ]},
  "Lower A": { label:"Lower A", focus:"Peak — Quad", color:COLORS["Lower A"], exercises:[
    x(14,"la",1,"Back Squat",4,6,"125 lbs · RIR 1"),
    x(14,"la",2,"Bulgarian Split Squat",4,6,"45 lbs/hand · per leg · RIR 1"),
    x(14,"la",3,"Leg Curl (machine)",3,8,"62.5 lbs · RIR 1"),
    x(14,"la",4,"Leg Extension",3,8,"87.5 lbs · RIR 1"),
    x(14,"la",5,"Standing Calf Raise",3,10,"BW + 90 lbs · RIR 1"),
    x(14,"la",6,"Suitcase Carry",3,40,"m/side · heavy KB/DB"),
  ]},
  "Upper B": { label:"Upper B", focus:"Peak — Vertical", color:COLORS["Upper B"], exercises:[
    x(14,"ub",1,"Pull-Up: Unassisted",3,2,"bodyweight · full ROM"),
    x(14,"ub",2,"Lat Pulldown",4,6,"115 lbs · RIR 1"),
    x(14,"ub",3,"Flat DB Press",3,6,"45 lbs/hand · RIR 1"),
    x(14,"ub",4,"Seated Cable Row",3,6,"140 lbs · RIR 1"),
    x(14,"ub",5,"Face Pulls",3,15,"37.5 lbs · RIR 1"),
    x(14,"ub",6,"Hammer Curls",3,8,"25 lbs/hand · RIR 1"),
    x(14,"ub",7,"Tricep Rope Pushdown",3,8,"57.5 lbs · RIR 1"),
    x(14,"ub",8,"Pallof Press",3,12,"heavy cable · per side"),
  ]},
  "Lower B": { label:"Lower B", focus:"Peak — Hinge", color:COLORS["Lower B"], exercises:[
    x(14,"lb",1,"Trap Bar Deadlift",4,5,"200 lbs · RIR 1"),
    x(14,"lb",2,"KB Single-Leg RDL",3,6,"44 lb KB · per leg · RIR 1"),
    x(14,"lb",3,"KB Swings",4,15,"53 lb KB"),
    x(14,"lb",4,"Barbell Hip Thrust",4,6,"205 lbs · RIR 1"),
    x(14,"lb",5,"Seated Calf Raise",3,10,"70 lbs · RIR 1"),
    x(14,"lb",6,"Cable Woodchop",3,12,"heavy cable · per side"),
  ]},
};

const W15 = {
  "Upper A": { label:"Upper A", focus:"Peak — Horizontal", color:COLORS["Upper A"], exercises:[
    x(15,"ua",1,"30° Incline DB Press",4,6,"50 lbs/hand · RIR 0-1"),
    x(15,"ua",2,"Chest Supported Row",4,6,"75 lbs/hand · RIR 0-1"),
    x(15,"ua",3,"Seated DB OH Press",3,6,"35 lbs/hand · RIR 0-1"),
    x(15,"ua",4,"Cable Lat Raises",3,12,"15 lbs/arm · RIR 1"),
    x(15,"ua",5,"Incline DB Curls",3,8,"20 lbs/hand · RIR 1"),
    x(15,"ua",6,"Cable OH Tricep Extension",3,8,"50 lbs · RIR 0-1"),
    x(15,"ua",7,"Ab Wheel Rollout",3,12,"bodyweight"),
  ]},
  "Lower A": { label:"Lower A", focus:"Peak — Quad", color:COLORS["Lower A"], exercises:[
    x(15,"la",1,"Back Squat",4,5,"130 lbs · RIR 0-1"),
    x(15,"la",2,"Bulgarian Split Squat",4,6,"45 lbs/hand · per leg · RIR 0-1"),
    x(15,"la",3,"Leg Curl (machine)",3,8,"65 lbs · RIR 1"),
    x(15,"la",4,"Leg Extension",3,8,"90 lbs · RIR 1"),
    x(15,"la",5,"Standing Calf Raise",3,10,"BW + 90 lbs · RIR 1"),
    x(15,"la",6,"Suitcase Carry",3,40,"m/side · heaviest"),
  ]},
  "Upper B": { label:"Upper B", focus:"Peak — Vertical", color:COLORS["Upper B"], exercises:[
    x(15,"ub",1,"Pull-Up: Unassisted",3,3,"bodyweight · full ROM"),
    x(15,"ub",2,"Lat Pulldown",4,6,"117.5 lbs · RIR 0-1"),
    x(15,"ub",3,"Flat DB Press",3,6,"45 lbs/hand · RIR 0-1"),
    x(15,"ub",4,"Seated Cable Row",3,6,"145 lbs · RIR 0-1"),
    x(15,"ub",5,"Face Pulls",3,15,"40 lbs · RIR 1"),
    x(15,"ub",6,"Hammer Curls",3,8,"30 lbs/hand · RIR 1"),
    x(15,"ub",7,"Tricep Rope Pushdown",3,8,"60 lbs · RIR 0-1"),
    x(15,"ub",8,"Pallof Press",3,12,"heaviest cable · per side"),
  ]},
  "Lower B": { label:"Lower B", focus:"Peak — Hinge", color:COLORS["Lower B"], exercises:[
    x(15,"lb",1,"Trap Bar Deadlift",4,5,"210 lbs · RIR 0-1"),
    x(15,"lb",2,"KB Single-Leg RDL",3,6,"44 lb KB · per leg · RIR 1"),
    x(15,"lb",3,"KB Swings",4,15,"53 lb KB"),
    x(15,"lb",4,"Barbell Hip Thrust",4,6,"215 lbs · RIR 0-1"),
    x(15,"lb",5,"Seated Calf Raise",3,10,"72.5 lbs · RIR 1"),
    x(15,"lb",6,"Cable Woodchop",3,12,"heaviest cable · per side"),
  ]},
};

const W16_DELOAD = {
  "Upper A": { label:"Upper A", focus:"DELOAD + REASSESS", color:COLORS["Upper A"], exercises:[
    x(16,"ua",1,"30° Incline DB Press",2,8,"30 lbs/hand · RIR 4+"),
    x(16,"ua",2,"Chest Supported Row",2,8,"55 lbs/hand · RIR 4+"),
    x(16,"ua",3,"Seated DB OH Press",2,8,"20 lbs/hand · RIR 4+"),
    x(16,"ua",4,"Cable Lat Raises",2,12,"12 lbs/arm · RIR 4+"),
    x(16,"ua",5,"Incline DB Curls",2,8,"15 lbs/hand · RIR 4+"),
    x(16,"ua",6,"Cable OH Tricep Extension",2,8,"27.5 lbs · RIR 4+"),
    x(16,"ua",7,"Plank",2,45,"sec · bodyweight"),
  ]},
  "Lower A": { label:"Lower A", focus:"DELOAD + REASSESS", color:COLORS["Lower A"], exercises:[
    x(16,"la",1,"Back Squat",2,6,"80 lbs · RIR 4+"),
    x(16,"la",2,"Bulgarian Split Squat",2,8,"25 lbs/hand · per leg · RIR 4+"),
    x(16,"la",3,"Leg Curl (machine)",2,10,"40 lbs · RIR 4+"),
    x(16,"la",4,"Leg Extension",2,10,"60 lbs · RIR 4+"),
    x(16,"la",5,"Standing Calf Raise",2,15,"BW + 45 lbs · RIR 4+"),
    x(16,"la",6,"Suitcase Carry",2,20,"m/side · light"),
  ]},
  "Upper B": { label:"Upper B", focus:"DELOAD + REASSESS", color:COLORS["Upper B"], exercises:[
    x(16,"ub",1,"Pull-Up: RETEST MAX",1,1,"bodyweight · log your max reps"),
    x(16,"ub",2,"Lat Pulldown",2,8,"80 lbs · RIR 4+"),
    x(16,"ub",3,"Flat DB Press",2,8,"30 lbs/hand · RIR 4+"),
    x(16,"ub",4,"Seated Cable Row",2,8,"100 lbs · RIR 4+"),
    x(16,"ub",5,"Face Pulls",2,12,"25 lbs · RIR 4+"),
    x(16,"ub",6,"Hammer Curls",2,8,"17.5 lbs/hand · RIR 4+"),
    x(16,"ub",7,"Tricep Rope Pushdown",2,8,"35 lbs · RIR 4+"),
    x(16,"ub",8,"Pallof Press",2,8,"light cable · per side"),
  ]},
  "Lower B": { label:"Lower B", focus:"DELOAD + REASSESS", color:COLORS["Lower B"], exercises:[
    x(16,"lb",1,"Trap Bar Deadlift",2,5,"115 lbs · RIR 4+"),
    x(16,"lb",2,"KB Single-Leg RDL",2,8,"35 lb KB · per leg · RIR 4+"),
    x(16,"lb",3,"KB Swings",2,12,"35 lb KB"),
    x(16,"lb",4,"Barbell Hip Thrust",2,10,"145 lbs · RIR 4+"),
    x(16,"lb",5,"Seated Calf Raise",2,12,"45 lbs · RIR 4+"),
    x(16,"lb",6,"Cable Woodchop",2,10,"light cable · per side"),
  ]},
};

// ─── PROGRAM ARRAY ────────────────────────────────────────────────────────────

export const PROGRAM = [
  { weekNum:1,  label:"Foundation · Wk 1",   block:"Block 1 — Foundation",   type:"training", workoutOrder:WORKOUT_ORDER, workouts:W1 },
  { weekNum:2,  label:"Foundation · Wk 2",   block:"Block 1 — Foundation",   type:"training", workoutOrder:WORKOUT_ORDER, workouts:W2 },
  { weekNum:3,  label:"Foundation · Wk 3",   block:"Block 1 — Foundation",   type:"training", workoutOrder:WORKOUT_ORDER, workouts:W3 },
  { weekNum:4,  label:"Foundation · Wk 4",   block:"Block 1 — DELOAD",       type:"deload",   workoutOrder:WORKOUT_ORDER, workouts:W4_DELOAD },
  { weekNum:5,  label:"Hypertrophy · Wk 5",  block:"Block 2 — Hypertrophy",  type:"training", workoutOrder:WORKOUT_ORDER, workouts:W5 },
  { weekNum:6,  label:"Hypertrophy · Wk 6",  block:"Block 2 — Hypertrophy",  type:"training", workoutOrder:WORKOUT_ORDER, workouts:W6 },
  { weekNum:7,  label:"Hypertrophy · Wk 7",  block:"Block 2 — Hypertrophy",  type:"training", workoutOrder:WORKOUT_ORDER, workouts:W7 },
  { weekNum:8,  label:"Hypertrophy · Wk 8",  block:"Block 2 — DELOAD",       type:"deload",   workoutOrder:WORKOUT_ORDER, workouts:W8_DELOAD },
  { weekNum:9,  label:"Strength · Wk 9",     block:"Block 3 — Strength",     type:"training", workoutOrder:WORKOUT_ORDER, workouts:W9 },
  { weekNum:10, label:"Strength · Wk 10",    block:"Block 3 — Strength",     type:"training", workoutOrder:WORKOUT_ORDER, workouts:W10 },
  { weekNum:11, label:"Strength · Wk 11",    block:"Block 3 — Strength",     type:"training", workoutOrder:WORKOUT_ORDER, workouts:W11 },
  { weekNum:12, label:"Strength · Wk 12",    block:"Block 3 — DELOAD",       type:"deload",   workoutOrder:WORKOUT_ORDER, workouts:W12_DELOAD },
  { weekNum:13, label:"Peak · Wk 13",        block:"Block 4 — Peak",         type:"training", workoutOrder:WORKOUT_ORDER, workouts:W13 },
  { weekNum:14, label:"Peak · Wk 14",        block:"Block 4 — Peak",         type:"training", workoutOrder:WORKOUT_ORDER, workouts:W14 },
  { weekNum:15, label:"Peak · Wk 15",        block:"Block 4 — Peak",         type:"training", workoutOrder:WORKOUT_ORDER, workouts:W15 },
  { weekNum:16, label:"Peak · Wk 16",        block:"Block 4 — DELOAD",       type:"deload",   workoutOrder:WORKOUT_ORDER, workouts:W16_DELOAD },
];

export const WORKOUT_TEMPLATES = PROGRAM[0].workouts;
