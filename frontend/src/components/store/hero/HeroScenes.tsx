import { BLACK, Bubbles, GeometricDuck, GREEN, RED, YELLOW } from './duckArt';

export function HeroTubScene() {
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <pattern id="hero-tub-tiles" width="72" height="72" patternUnits="userSpaceOnUse">
          <rect width="72" height="72" fill="#1a4652" />
          <rect x="4" y="4" width="64" height="64" rx="8" fill="#215664" />
        </pattern>
        <linearGradient id="hero-tub-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#47a3b3" />
          <stop offset="100%" stopColor="#1e6776" />
        </linearGradient>
      </defs>

      <rect width="1600" height="900" fill="#12343e" />
      <rect width="1600" height="620" fill="url(#hero-tub-tiles)" />
      <rect y="760" width="1600" height="140" fill="#0e2a32" />

      <g>
        <rect x="1188" y="78" width="308" height="236" rx="10" fill="#e6d7bf" />
        <rect x="1208" y="96" width="268" height="200" fill="#8ecfe0" />
        <circle cx="1390" cy="148" r="38" fill={YELLOW} />
        <circle cx="1390" cy="148" r="28" fill="#f7de86" />
        <rect x="1336" y="96" width="12" height="200" fill="#e6d7bf" />
        <rect x="1208" y="190" width="268" height="12" fill="#e6d7bf" />
      </g>

      <ellipse cx="800" cy="868" rx="640" ry="30" fill="#07181d" opacity="0.45" />
      <rect x="110" y="468" width="1380" height="410" rx="205" fill="#f3eee6" />
      <rect x="162" y="512" width="1276" height="338" rx="172" fill="#d8d0c3" />
      <rect x="184" y="548" width="1232" height="286" rx="148" fill="url(#hero-tub-water)" />
      <ellipse cx="800" cy="584" rx="500" ry="26" fill="#fff" opacity="0.14" />

      <g fill="#8b9298">
        <rect x="228" y="448" width="26" height="54" rx="12" />
        <path
          d="M241 450c0-38 52-42 58-8"
          fill="none"
          stroke="#8b9298"
          strokeWidth="14"
          strokeLinecap="round"
        />
      </g>

      <GeometricDuck x={220} y={508} scale={1.35} fill={RED} />
      <GeometricDuck x={460} y={448} scale={2} fill={YELLOW} />
      <GeometricDuck x={790} y={498} scale={1.45} fill={GREEN} flip />
      <GeometricDuck x={1030} y={462} scale={1.75} fill={BLACK} />
      <GeometricDuck x={1288} y={538} scale={1.05} fill={YELLOW} />

      <rect x="184" y="668" width="1232" height="166" fill="#1e6776" opacity="0.28" />

      <Bubbles
        items={[
          { cx: 340, cy: 620, r: 10 },
          { cx: 390, cy: 560, r: 16 },
          { cx: 720, cy: 430, r: 12 },
          { cx: 880, cy: 390, r: 18 },
          { cx: 960, cy: 480, r: 9 },
          { cx: 1180, cy: 420, r: 14 },
          { cx: 1320, cy: 500, r: 11 },
          { cx: 250, cy: 700, r: 8 },
        ]}
      />
    </svg>
  );
}

export function HeroShelfScene() {
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <pattern id="hero-shelf-dots" width="36" height="36" patternUnits="userSpaceOnUse">
          <circle cx="6" cy="8" r="2.2" fill="#c9a57a" opacity="0.55" />
        </pattern>
        <radialGradient id="hero-shelf-glow" cx="50%" cy="58%" r="58%">
          <stop offset="0%" stopColor="#fff6e8" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#fff6e8" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1600" height="900" fill="#e7d3b4" />
      <rect width="1600" height="900" fill="url(#hero-shelf-dots)" />
      <rect y="760" width="1600" height="140" fill="#c4a47a" />
      <ellipse cx="800" cy="540" rx="760" ry="300" fill="url(#hero-shelf-glow)" />

      <g>
        <ellipse cx="210" cy="628" rx="34" ry="18" fill="#c45c3a" />
        <rect x="186" y="560" width="48" height="72" rx="8" fill="#c45c3a" />
        <ellipse cx="176" cy="500" rx="36" ry="58" fill={GREEN} />
        <ellipse cx="232" cy="478" rx="42" ry="70" fill="#247a54" />
        <ellipse cx="206" cy="430" rx="28" ry="46" fill={GREEN} />
      </g>

      <rect x="150" y="666" width="1300" height="20" rx="4" fill="#7a4324" />
      <rect x="150" y="686" width="1300" height="24" fill="#62341c" />
      <rect x="176" y="710" width="1250" height="12" fill="#000" opacity="0.12" />
      <path d="M250 686v70h28z" fill="#7a4324" />
      <path d="M1322 686v70h28z" fill="#7a4324" />

      <GeometricDuck x={250} y={524} scale={1.55} fill={RED} />
      <GeometricDuck x={540} y={468} scale={2.15} fill={YELLOW} />
      <GeometricDuck x={880} y={514} scale={1.65} fill={GREEN} />
      <GeometricDuck x={1180} y={538} scale={1.4} fill={BLACK} flip />
    </svg>
  );
}

export function HeroBathScene() {
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <pattern id="hero-bath-tiles" width="80" height="80" patternUnits="userSpaceOnUse">
          <rect width="80" height="80" fill="#c9848e" />
          <rect x="4" y="4" width="72" height="72" rx="10" fill="#d397a0" />
        </pattern>
        <linearGradient id="hero-bath-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7ec9d4" />
          <stop offset="100%" stopColor="#3f8fa0" />
        </linearGradient>
        <linearGradient id="hero-bath-light" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff3d2" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#fff3d2" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="1600" height="900" fill="#b56f7b" />
      <rect width="1600" height="640" fill="url(#hero-bath-tiles)" />
      <rect y="780" width="1600" height="120" fill="#9d5d69" />

      <g>
        <rect x="96" y="90" width="250" height="290" rx="10" fill="#f0e2cc" />
        <rect x="114" y="108" width="214" height="254" fill="#f4d7a0" />
        <rect x="212" y="108" width="12" height="254" fill="#f0e2cc" />
        <rect x="114" y="228" width="214" height="12" fill="#f0e2cc" />
      </g>
      <path d="M360 108 L980 780 L760 780 L360 360 Z" fill="url(#hero-bath-light)" />

      <rect x="1360" y="430" width="86" height="170" rx="12" fill="#efe6d8" />
      <rect x="1374" y="444" width="58" height="142" rx="8" fill="#e4d4be" />

      <ellipse cx="520" cy="812" rx="30" ry="16" fill="#2b2b2b" />
      <ellipse cx="1080" cy="812" rx="30" ry="16" fill="#2b2b2b" />
      <ellipse cx="580" cy="836" rx="26" ry="14" fill="#2b2b2b" />
      <ellipse cx="1020" cy="836" rx="26" ry="14" fill="#2b2b2b" />

      <ellipse cx="800" cy="708" rx="390" ry="168" fill="#f7f2ea" />
      <ellipse cx="800" cy="696" rx="332" ry="128" fill="#d5cdc0" />
      <ellipse cx="800" cy="700" rx="312" ry="110" fill="url(#hero-bath-water)" />
      <ellipse cx="800" cy="662" rx="210" ry="22" fill="#fff" opacity="0.16" />

      <GeometricDuck x={610} y={518} scale={2.35} fill={YELLOW} sleepy />
      <GeometricDuck x={1088} y={548} scale={0.95} fill={GREEN} />

      <ellipse cx="800" cy="742" rx="280" ry="58" fill="#3f8fa0" opacity="0.28" />

      <Bubbles
        items={[
          { cx: 560, cy: 620, r: 11 },
          { cx: 620, cy: 480, r: 16 },
          { cx: 740, cy: 400, r: 10 },
          { cx: 860, cy: 360, r: 20 },
          { cx: 940, cy: 430, r: 12 },
          { cx: 1020, cy: 500, r: 8 },
          { cx: 700, cy: 330, r: 7 },
          { cx: 1180, cy: 580, r: 13 },
        ]}
      />
    </svg>
  );
}
