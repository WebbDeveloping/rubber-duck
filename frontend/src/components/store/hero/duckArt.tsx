export const YELLOW = '#f0c419';
export const RED = '#e04545';
export const GREEN = '#2f9e6c';
export const BLACK = '#2a2a2a';

function beakFor(fill: string) {
  return fill === YELLOW ? '#e08912' : '#f4a261';
}

export function GeometricDuck({
  x,
  y,
  scale = 1,
  fill,
  flip = false,
  sleepy = false,
}: {
  x: number;
  y: number;
  scale?: number;
  fill: string;
  flip?: boolean;
  sleepy?: boolean;
}) {
  const beak = beakFor(fill);
  const sx = flip ? -scale : scale;

  return (
    <g transform={`translate(${x + (flip ? 120 * scale : 0)} ${y}) scale(${sx} ${scale})`}>
      <ellipse cx="58" cy="68" rx="38" ry="24" fill={fill} />
      <circle cx="78" cy="38" r="22" fill={fill} />
      <path d="M96 38 L118 34 L96 46 Z" fill={beak} />
      {sleepy ? (
        <path
          d="M78 34c4 4 10 4 14 0"
          fill="none"
          stroke="#16324f"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
      ) : (
        <circle cx="84" cy="34" r="4" fill="#16324f" />
      )}
      <ellipse cx="48" cy="58" rx="10" ry="7" fill={beak} opacity="0.85" />
    </g>
  );
}

export function Bubbles({
  items,
  color = '#fff',
}: {
  items: { cx: number; cy: number; r: number }[];
  color?: string;
}) {
  return (
    <g fill="none" stroke={color} strokeOpacity="0.5" strokeWidth="3">
      {items.map((bubble) => (
        <circle key={`${bubble.cx}-${bubble.cy}-${bubble.r}`} cx={bubble.cx} cy={bubble.cy} r={bubble.r} />
      ))}
    </g>
  );
}
