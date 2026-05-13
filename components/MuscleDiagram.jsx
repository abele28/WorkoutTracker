import { getMuscles, FRONT_REGIONS, BACK_REGIONS } from '../data/muscleData';

// Shared body outline elements — same silhouette for front and back
function BodyOutline() {
  return (
    <g className="body-outline-g">
      {/* Head */}
      <circle cx="40" cy="10" r="9" />
      {/* Neck */}
      <rect x="37.5" y="19" width="5" height="6" rx="1" />
      {/* Torso */}
      <path d="M 14 25 L 18 92 L 62 92 L 66 25 Z" />
      {/* Left arm */}
      <path d="M 14 25 L 5 28 L 3 88 L 13 92" />
      {/* Right arm */}
      <path d="M 66 25 L 75 28 L 77 88 L 67 92" />
      {/* Hips */}
      <path d="M 18 92 L 14 110 L 66 110 L 62 92" />
      {/* Left thigh + shin */}
      <path d="M 14 110 L 10 172 L 34 172 L 36 110" />
      {/* Right thigh + shin */}
      <path d="M 44 110 L 46 172 L 70 172 L 66 110" />
      {/* Feet */}
      <path d="M 10 172 L 8 180 L 34 180 L 34 172" />
      <path d="M 46 172 L 46 180 L 72 180 L 70 172" />
    </g>
  );
}

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
    <text x="40" y="186" textAnchor="middle" className="body-view-label">
      {text}
    </text>
  );
}

export default function MuscleDiagram({ exerciseName }) {
  const muscles = getMuscles(exerciseName || '');
  const hasPrimary   = muscles.primary.length > 0;
  const hasBack  = muscles.primary.some(m =>
    ['lats','traps','rhomboids','rear_delt','triceps','lower_back','glutes','hamstrings'].includes(m)
  ) || muscles.secondary.some(m =>
    ['lats','traps','rhomboids','rear_delt','triceps','lower_back','glutes','hamstrings'].includes(m)
  );
  const hasFront = muscles.primary.some(m =>
    ['chest','deltoids','biceps','core','obliques','quads','calves'].includes(m)
  ) || muscles.secondary.some(m =>
    ['chest','deltoids','biceps','core','obliques','quads','calves'].includes(m)
  );

  if (!hasPrimary) {
    // Fallback: show both unlit
    return (
      <div className="muscle-diagram">
        <svg viewBox="0 0 80 192" className="body-svg">
          <BodyOutline />
          <ViewLabel text="FRONT" />
        </svg>
        <svg viewBox="0 0 80 192" className="body-svg">
          <BodyOutline />
          <ViewLabel text="BACK" />
        </svg>
      </div>
    );
  }

  return (
    <div className="muscle-diagram">
      {/* Front view */}
      <svg viewBox="0 0 80 192" className="body-svg">
        <BodyOutline />
        {hasFront && <MuscleLayer muscles={muscles} regions={FRONT_REGIONS} />}
        <ViewLabel text="FRONT" />
      </svg>
      {/* Back view */}
      <svg viewBox="0 0 80 192" className="body-svg">
        <BodyOutline />
        {hasBack && <MuscleLayer muscles={muscles} regions={BACK_REGIONS} />}
        <ViewLabel text="BACK" />
      </svg>
    </div>
  );
}
