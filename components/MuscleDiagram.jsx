import { getMuscles, FRONT_REGIONS, BACK_REGIONS } from '../data/muscleData';

// ─── Anatomical body outline shared by both views ────────────────────────────
// viewBox "0 0 80 202"
function BodyOutline() {
  return (
    <g className="body-outline-g">
      {/* Head */}
      <ellipse cx="40" cy="10" rx="9" ry="10" />
      {/* Neck */}
      <path d="M 37 19 C 37 23 38 27 40 27 C 42 27 43 23 43 19" />
      {/* Left shoulder + arm */}
      <path d="M 37 24 C 30 24 17 27 11 32 C 7 35 4 40 4 48 C 4 58 4 68 4 78 C 4 88 5 96 6 106 L 6 120 L 13 120 L 14 106 C 15 96 16 88 16 78 C 16 68 16 58 17 48 C 18 42 20 38 22 34" />
      {/* Right shoulder + arm */}
      <path d="M 43 24 C 50 24 63 27 69 32 C 73 35 76 40 76 48 C 76 58 76 68 76 78 C 76 88 75 96 74 106 L 74 120 L 67 120 L 66 106 C 64 96 64 88 64 78 C 64 68 64 58 63 48 C 62 42 60 38 58 34" />
      {/* Torso */}
      <path d="M 22 34 C 22 50 21 68 20 86 C 20 98 19 108 19 116 C 18 122 17 128 17 132 L 63 132 C 63 128 62 122 61 116 C 61 108 60 98 60 86 C 59 68 58 50 58 34" />
      {/* Hip/crotch bridge */}
      <path d="M 17 132 C 16 137 15 141 17 146 L 37 148 L 43 148 L 63 146 C 65 141 64 137 63 132" />
      {/* Left thigh + shin */}
      <path d="M 17 146 C 16 154 14 166 13 178 C 12 186 11 192 11 196 L 34 196 C 34 192 35 186 36 178 C 37 166 38 154 38 146" />
      {/* Right thigh + shin */}
      <path d="M 42 146 C 42 154 43 166 44 178 C 45 186 46 192 46 196 L 69 196 C 69 192 68 186 67 178 C 66 166 64 154 63 146" />
      {/* Feet */}
      <path d="M 11 196 L 9 202 L 35 202 L 34 196" />
      <path d="M 46 196 L 45 202 L 71 202 L 69 196" />
    </g>
  );
}

// ─── Render activated muscle ellipses ────────────────────────────────────────
function MuscleLayer({ muscles, regions }) {
  const { primary = [], secondary = [] } = muscles;
  return (
    <g>
      {Object.entries(regions).map(([group, shapes]) => {
        const isPrimary   = primary.includes(group);
        const isSecondary = secondary.includes(group);
        if (!isPrimary && !isSecondary) return null;
        return shapes.map((s, i) => (
          <ellipse
            key={`${group}-${i}`}
            cx={s.cx} cy={s.cy} rx={s.rx} ry={s.ry}
            className={isPrimary ? 'muscle-primary' : 'muscle-secondary'}
          />
        ));
      })}
    </g>
  );
}

function ViewLabel({ text }) {
  return (
    <text x="40" y="209" textAnchor="middle" className="body-view-label">{text}</text>
  );
}

export default function MuscleDiagram({ exerciseName }) {
  const muscles = getMuscles(exerciseName || '');

  const FRONT_GROUPS = ['chest','deltoids','biceps','core','obliques','quads','calves'];
  const BACK_GROUPS  = ['lats','traps','rhomboids','rear_delt','triceps','lower_back','glutes','hamstrings','calves'];

  const hasFront = [...muscles.primary, ...muscles.secondary].some(m => FRONT_GROUPS.includes(m));
  const hasBack  = [...muscles.primary, ...muscles.secondary].some(m => BACK_GROUPS.includes(m));

  return (
    <div className="muscle-diagram">
      <svg viewBox="0 0 80 212" className="body-svg">
        <BodyOutline />
        {hasFront && <MuscleLayer muscles={muscles} regions={FRONT_REGIONS} />}
        <ViewLabel text="FRONT" />
      </svg>
      <svg viewBox="0 0 80 212" className="body-svg">
        <BodyOutline />
        {hasBack && <MuscleLayer muscles={muscles} regions={BACK_REGIONS} />}
        <ViewLabel text="BACK" />
      </svg>
    </div>
  );
}
