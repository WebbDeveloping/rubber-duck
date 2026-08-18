import type { DuckColor, DuckSize } from '../../types/duck';

const COLOR_HEX: Record<DuckColor, string> = {
  Red: '#e04545',
  Green: '#2f9e6c',
  Yellow: '#f0c419',
  Black: '#2a2a2a',
};

const SIZE_SCALE: Record<DuckSize, number> = {
  XLarge: 1.2,
  Large: 1.05,
  Medium: 0.95,
  Small: 0.82,
  XSmall: 0.7,
};

type DuckVisualProps = {
  color: DuckColor;
  size?: DuckSize;
  className?: string;
};

export function DuckVisual({ color, size = 'Medium', className = '' }: DuckVisualProps) {
  const fill = COLOR_HEX[color];
  const beak = color === 'Yellow' ? '#e08912' : '#f4a261';
  const scale = SIZE_SCALE[size];

  return (
    <div className={`duck-visual ${className}`} style={{ ['--duck-scale' as string]: scale }}>
      <svg viewBox="0 0 120 100" aria-hidden="true">
        <ellipse cx="58" cy="68" rx="38" ry="24" fill={fill} />
        <circle cx="78" cy="38" r="22" fill={fill} />
        <path d="M96 38 L118 34 L96 46 Z" fill={beak} />
        <circle cx="84" cy="34" r="4" fill="#16324f" />
        <ellipse cx="48" cy="58" rx="10" ry="7" fill={beak} opacity="0.85" />
      </svg>
    </div>
  );
}
