import { BLACK, Bubbles, GeometricDuck, GREEN, RED, YELLOW } from './duckArt';

export function StoryLeftScene() {
  return (
    <svg viewBox="0 0 400 560" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="400" height="560" fill="#2a6d78" />
      <rect y="390" width="400" height="170" fill="#215760" />
      <circle cx="310" cy="90" r="46" fill="#f7de86" opacity="0.85" />
      <GeometricDuck x={78} y={210} scale={2.05} fill={YELLOW} />
      <Bubbles items={[{ cx: 70, cy: 160, r: 10 }, { cx: 310, cy: 250, r: 8 }]} />
    </svg>
  );
}

export function StoryRightScene() {
  return (
    <svg viewBox="0 0 400 560" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="400" height="560" fill="#ead4c0" />
      <rect y="400" width="400" height="160" fill="#d9b896" />
      <ellipse cx="86" cy="430" rx="28" ry="46" fill={GREEN} />
      <ellipse cx="118" cy="410" rx="34" ry="58" fill="#247a54" />
      <rect x="88" y="430" width="36" height="52" rx="6" fill="#c45c3a" />
      <GeometricDuck x={92} y={220} scale={1.85} fill={RED} flip />
    </svg>
  );
}

export function FeatureColorScene() {
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="1600" height="900" fill="#3d5c7a" />
      <rect y="560" width="1600" height="340" fill="#2f4a64" />
      <circle cx="1280" cy="120" r="90" fill="#f7de86" opacity="0.7" />
      <GeometricDuck x={180} y={430} scale={2.1} fill={RED} />
      <GeometricDuck x={520} y={390} scale={2.45} fill={YELLOW} />
      <GeometricDuck x={890} y={420} scale={2.2} fill={GREEN} />
      <GeometricDuck x={1220} y={450} scale={1.95} fill={BLACK} flip />
    </svg>
  );
}

export function FeatureSizeScene() {
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="1600" height="900" fill="#c98958" />
      <rect y="620" width="1600" height="280" fill="#b47848" />
      <rect x="120" y="668" width="1360" height="22" fill="#6b3e24" />
      <GeometricDuck x={160} y={548} scale={0.85} fill={RED} />
      <GeometricDuck x={380} y={508} scale={1.25} fill={GREEN} />
      <GeometricDuck x={640} y={458} scale={1.75} fill={YELLOW} />
      <GeometricDuck x={980} y={398} scale={2.35} fill={BLACK} />
      <GeometricDuck x={1340} y={538} scale={0.95} fill={YELLOW} flip />
    </svg>
  );
}

export function FeatureTubScene() {
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="1600" height="900" fill="#1f5864" />
      <rect width="1600" height="520" fill="#276775" />
      <rect x="180" y="430" width="1240" height="390" rx="196" fill="#efe8dc" />
      <rect x="230" y="480" width="1140" height="310" rx="160" fill="#3f93a3" />
      <ellipse cx="800" cy="520" rx="430" ry="28" fill="#fff" opacity="0.14" />
      <GeometricDuck x={430} y={430} scale={2.15} fill={YELLOW} />
      <GeometricDuck x={860} y={470} scale={1.45} fill={GREEN} flip />
      <rect x="230" y="620" width="1140" height="170" fill="#2f7d8c" opacity="0.3" />
      <Bubbles
        items={[
          { cx: 360, cy: 400, r: 12 },
          { cx: 1100, cy: 360, r: 16 },
          { cx: 1240, cy: 480, r: 9 },
        ]}
      />
    </svg>
  );
}

export function FeatureClassicScene() {
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="1600" height="900" fill="#16324f" />
      <circle cx="1180" cy="180" r="160" fill="#1f4a6e" />
      <circle cx="240" cy="700" r="180" fill="#122a44" />
      <GeometricDuck x={560} y={250} scale={4.1} fill={YELLOW} />
    </svg>
  );
}

export function ProductFloatScene() {
  return (
    <svg viewBox="0 0 900 1200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="900" height="1200" fill="#1d5b68" />
      <rect y="520" width="900" height="680" fill="#2f8492" />
      <ellipse cx="450" cy="540" rx="420" ry="40" fill="#fff" opacity="0.12" />
      <GeometricDuck x={90} y={430} scale={2.4} fill={YELLOW} />
      <GeometricDuck x={480} y={500} scale={1.6} fill={RED} flip />
      <GeometricDuck x={620} y={680} scale={1.2} fill={GREEN} />
      <rect y="720" width="900" height="480" fill="#1d6574" opacity="0.28" />
      <Bubbles
        items={[
          { cx: 160, cy: 360, r: 14 },
          { cx: 720, cy: 300, r: 18 },
          { cx: 800, cy: 480, r: 10 },
        ]}
      />
    </svg>
  );
}

export function ProductShelfScene() {
  return (
    <svg viewBox="0 0 900 1200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="900" height="1200" fill="#e4c8a4" />
      <rect y="980" width="900" height="220" fill="#c9a77c" />
      <rect x="80" y="430" width="740" height="18" fill="#7a4324" />
      <rect x="80" y="720" width="740" height="18" fill="#7a4324" />
      <GeometricDuck x={120} y={300} scale={1.2} fill={RED} />
      <GeometricDuck x={380} y={268} scale={1.55} fill={YELLOW} />
      <GeometricDuck x={640} y={320} scale={1.05} fill={GREEN} flip />
      <GeometricDuck x={160} y={590} scale={1.35} fill={BLACK} />
      <GeometricDuck x={500} y={560} scale={1.7} fill={YELLOW} />
    </svg>
  );
}

export function ProductTogetherScene() {
  return (
    <svg viewBox="0 0 900 1200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="900" height="1200" fill="#b56f7b" />
      <rect y="860" width="900" height="340" fill="#9d5d69" />
      <circle cx="160" cy="180" r="80" fill="#f4d7a0" opacity="0.7" />
      <GeometricDuck x={80} y={430} scale={2.6} fill={YELLOW} />
      <GeometricDuck x={430} y={470} scale={2.35} fill={RED} flip />
      <GeometricDuck x={620} y={720} scale={1.15} fill={GREEN} />
    </svg>
  );
}

export function BannerScene() {
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="banner-window" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f7e2b2" />
          <stop offset="55%" stopColor="#e8b45a" />
          <stop offset="100%" stopColor="#c9843a" />
        </linearGradient>
        <linearGradient id="banner-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3d8a9a" />
          <stop offset="100%" stopColor="#1a4f5c" />
        </linearGradient>
        <linearGradient id="banner-light" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f4d7a0" stopOpacity="0.42" />
          <stop offset="100%" stopColor="#f4d7a0" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="1600" height="900" fill="#10232b" />
      <rect y="720" width="1600" height="180" fill="#0c1b21" />

      <rect x="70" y="48" width="420" height="540" rx="8" fill="#d9c4a4" />
      <rect x="92" y="70" width="376" height="496" fill="url(#banner-window)" />
      <rect x="92" y="306" width="376" height="14" fill="#d9c4a4" />
      <rect x="270" y="70" width="14" height="496" fill="#d9c4a4" />
      <circle cx="430" cy="132" r="46" fill="#fff6d6" opacity="0.55" />
      <path d="M468 70 L1180 720 L860 720 L468 280 Z" fill="url(#banner-light)" />

      <ellipse cx="1280" cy="610" rx="42" ry="70" fill="#1f4a3a" />
      <ellipse cx="1330" cy="580" rx="50" ry="86" fill="#24604c" />
      <ellipse cx="1300" cy="520" rx="34" ry="58" fill="#1f4a3a" />
      <rect x="1278" y="620" width="44" height="92" rx="8" fill="#8a4630" />

      <ellipse cx="800" cy="860" rx="620" ry="28" fill="#071318" opacity="0.5" />
      <rect x="180" y="430" width="1240" height="390" rx="196" fill="#efe8dc" />
      <rect x="228" y="478" width="1144" height="314" rx="160" fill="#cfc6b8" />
      <rect x="248" y="508" width="1104" height="268" rx="140" fill="url(#banner-water)" />
      <ellipse cx="800" cy="540" rx="420" ry="24" fill="#fff" opacity="0.14" />

      <g fill="#7d868c">
        <rect x="268" y="412" width="24" height="50" rx="12" />
        <path
          d="M280 414c0-34 46-38 52-8"
          fill="none"
          stroke="#7d868c"
          strokeWidth="12"
          strokeLinecap="round"
        />
      </g>

      <GeometricDuck x={280} y={430} scale={1.45} fill={RED} />
      <GeometricDuck x={520} y={378} scale={2.05} fill={YELLOW} />
      <GeometricDuck x={860} y={428} scale={1.5} fill={GREEN} flip />
      <GeometricDuck x={1120} y={400} scale={1.7} fill={BLACK} />

      <rect x="248" y="628" width="1104" height="148" fill="#1a4f5c" opacity="0.32" />
      <Bubbles
        items={[
          { cx: 360, cy: 560, r: 11 },
          { cx: 420, cy: 490, r: 16 },
          { cx: 740, cy: 360, r: 12 },
          { cx: 980, cy: 330, r: 18 },
          { cx: 1080, cy: 430, r: 9 },
          { cx: 1240, cy: 470, r: 13 },
        ]}
      />
    </svg>
  );
}

export function ShopHeroScene() {
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <pattern id="shop-hero-tiles" width="76" height="76" patternUnits="userSpaceOnUse">
          <rect width="76" height="76" fill="#1d3d48" />
          <rect x="5" y="5" width="66" height="66" rx="8" fill="#254a56" />
        </pattern>
        <radialGradient id="shop-hero-glow" cx="50%" cy="42%" r="62%">
          <stop offset="0%" stopColor="#f4d7a0" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#f4d7a0" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1600" height="900" fill="#16343d" />
      <rect width="1600" height="620" fill="url(#shop-hero-tiles)" />
      <rect y="760" width="1600" height="140" fill="#102830" />
      <ellipse cx="800" cy="430" rx="720" ry="280" fill="url(#shop-hero-glow)" />

      <rect x="110" y="90" width="220" height="260" rx="8" fill="#e8d5b5" />
      <rect x="126" y="106" width="188" height="228" fill="#8ecfe0" />
      <rect x="216" y="106" width="10" height="228" fill="#e8d5b5" />
      <rect x="126" y="214" width="188" height="10" fill="#e8d5b5" />

      <rect x="1280" y="90" width="220" height="260" rx="8" fill="#e8d5b5" />
      <rect x="1296" y="106" width="188" height="228" fill="#f4d7a0" />
      <rect x="1386" y="106" width="10" height="228" fill="#e8d5b5" />
      <rect x="1296" y="214" width="188" height="10" fill="#e8d5b5" />

      <rect x="120" y="668" width="1360" height="22" rx="4" fill="#6b3e24" />
      <rect x="120" y="690" width="1360" height="28" fill="#543018" />
      <path d="M210 690v78h30z" fill="#6b3e24" />
      <path d="M1360 690v78h30z" fill="#6b3e24" />

      <GeometricDuck x={150} y={560} scale={0.85} fill={RED} />
      <GeometricDuck x={360} y={520} scale={1.2} fill={GREEN} />
      <GeometricDuck x={620} y={448} scale={1.85} fill={YELLOW} />
      <GeometricDuck x={960} y={400} scale={2.35} fill={BLACK} />
      <GeometricDuck x={1320} y={548} scale={0.95} fill={YELLOW} flip />
    </svg>
  );
}

export function AboutWorkshopScene() {
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="about-workshop-window" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f7e2b2" />
          <stop offset="55%" stopColor="#e8b45a" />
          <stop offset="100%" stopColor="#c9843a" />
        </linearGradient>
        <linearGradient id="about-workshop-light" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f4d7a0" stopOpacity="0.42" />
          <stop offset="100%" stopColor="#f4d7a0" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="1600" height="900" fill="#3a2418" />
      <rect y="640" width="1600" height="260" fill="#26160f" />
      <rect y="640" width="1600" height="18" fill="#4a2e1e" />

      <rect x="72" y="64" width="380" height="460" rx="8" fill="#d9c4a4" />
      <rect x="92" y="84" width="340" height="420" fill="url(#about-workshop-window)" />
      <rect x="92" y="286" width="340" height="14" fill="#d9c4a4" />
      <rect x="254" y="84" width="14" height="420" fill="#d9c4a4" />
      <circle cx="380" cy="150" r="42" fill="#fff6d6" opacity="0.5" />
      <path d="M432 84 L1180 640 L860 640 L432 280 Z" fill="url(#about-workshop-light)" />

      <rect x="1180" y="90" width="340" height="18" fill="#6b3e24" />
      <rect x="1180" y="108" width="340" height="16" fill="#543018" />
      <GeometricDuck x={1208} y={18} scale={0.85} fill={RED} />
      <GeometricDuck x={1358} y={8} scale={0.95} fill={GREEN} flip />

      <rect x="1180" y="280" width="340" height="18" fill="#6b3e24" />
      <rect x="1180" y="298" width="340" height="16" fill="#543018" />
      <GeometricDuck x={1220} y={206} scale={0.8} fill={BLACK} />
      <GeometricDuck x={1370} y={198} scale={0.88} fill={YELLOW} />

      <ellipse cx="1380" cy="520" rx="36" ry="62" fill="#1f4a3a" />
      <ellipse cx="1428" cy="492" rx="44" ry="74" fill="#24604c" />
      <rect x="1370" y="530" width="40" height="80" rx="8" fill="#8a4630" />

      <rect x="160" y="620" width="1280" height="28" rx="4" fill="#7a4324" />
      <rect x="180" y="648" width="36" height="150" fill="#543018" />
      <rect x="1380" y="648" width="36" height="150" fill="#543018" />
      <rect x="200" y="648" width="1200" height="14" fill="#000" opacity="0.16" />

      <GeometricDuck x={280} y={478} scale={1.35} fill={RED} />
      <GeometricDuck x={560} y={430} scale={1.85} fill={YELLOW} />
      <GeometricDuck x={900} y={468} scale={1.45} fill={GREEN} flip />
      <GeometricDuck x={1160} y={500} scale={1.15} fill={BLACK} />
    </svg>
  );
}

export function AboutFounderScene() {
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <radialGradient id="about-founder-glow" cx="48%" cy="42%" r="58%">
          <stop offset="0%" stopColor="#f4d7a0" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#f4d7a0" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="about-founder-window" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8ecfe0" />
          <stop offset="100%" stopColor="#3d6f86" />
        </linearGradient>
      </defs>

      <rect width="1600" height="900" fill="#16324f" />
      <rect y="760" width="1600" height="140" fill="#10283e" />
      <ellipse cx="760" cy="420" rx="620" ry="280" fill="url(#about-founder-glow)" />

      <rect x="1180" y="70" width="320" height="420" rx="8" fill="#e8d5b5" />
      <rect x="1198" y="88" width="284" height="384" fill="url(#about-founder-window)" />
      <rect x="1332" y="88" width="12" height="384" fill="#e8d5b5" />
      <rect x="1198" y="272" width="284" height="12" fill="#e8d5b5" />

      <ellipse cx="180" cy="620" rx="38" ry="64" fill="#1f4a3a" />
      <ellipse cx="230" cy="588" rx="48" ry="80" fill="#24604c" />
      <ellipse cx="204" cy="530" rx="30" ry="50" fill="#1f4a3a" />
      <rect x="186" y="630" width="42" height="90" rx="8" fill="#8a4630" />

      <rect x="420" y="700" width="760" height="22" rx="4" fill="#6b3e24" />
      <rect x="440" y="722" width="28" height="80" fill="#543018" />
      <rect x="1132" y="722" width="28" height="80" fill="#543018" />

      <circle cx="1180" cy="210" r="36" fill="#f7de86" opacity="0.55" />
      <GeometricDuck x={520} y={250} scale={3.6} fill={YELLOW} />
      <GeometricDuck x={1080} y={560} scale={0.9} fill={RED} flip />
    </svg>
  );
}

export function ContactBannerScene() {
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="contact-banner-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8ecfe0" />
          <stop offset="100%" stopColor="#3d6f86" />
        </linearGradient>
        <linearGradient id="contact-banner-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3d8a9a" />
          <stop offset="100%" stopColor="#1a4f5c" />
        </linearGradient>
      </defs>

      <rect width="1600" height="900" fill="url(#contact-banner-sky)" />
      <circle cx="1280" cy="120" r="70" fill="#fff6d6" opacity="0.7" />
      <rect y="520" width="1600" height="380" fill="url(#contact-banner-water)" />
      <ellipse cx="800" cy="540" rx="620" ry="22" fill="#fff" opacity="0.16" />

      <ellipse cx="180" cy="500" rx="42" ry="70" fill="#1f4a3a" />
      <ellipse cx="230" cy="468" rx="50" ry="86" fill="#24604c" />
      <rect x="186" y="510" width="44" height="92" rx="8" fill="#8a4630" />

      <rect x="1080" y="360" width="86" height="180" rx="10" fill="#6b3e24" />
      <rect x="1058" y="330" width="130" height="92" rx="12" fill="#c45c3a" />
      <circle cx="1168" cy="376" r="8" fill="#f7de86" />
      <rect x="1116" y="540" width="16" height="80" fill="#543018" />

      <rect x="1188" y="352" width="56" height="40" rx="4" fill="#efe8dc" transform="rotate(-12 1216 372)" />
      <rect x="1220" y="368" width="50" height="36" rx="4" fill="#f4d7a0" transform="rotate(8 1245 386)" />

      <GeometricDuck x={360} y={430} scale={1.85} fill={YELLOW} />
      <GeometricDuck x={640} y={470} scale={1.35} fill={GREEN} flip />
      <GeometricDuck x={880} y={448} scale={1.55} fill={RED} />
      <GeometricDuck x={1288} y={430} scale={1.15} fill={BLACK} />

      <Bubbles
        items={[
          { cx: 280, cy: 420, r: 12 },
          { cx: 520, cy: 390, r: 8 },
          { cx: 760, cy: 360, r: 14 },
          { cx: 980, cy: 400, r: 9 },
          { cx: 1420, cy: 310, r: 11 },
        ]}
      />
    </svg>
  );
}

export function ContactDeskScene() {
  return (
    <svg viewBox="0 0 900 1100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="contact-desk-window" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f7e2b2" />
          <stop offset="55%" stopColor="#e8b45a" />
          <stop offset="100%" stopColor="#c9843a" />
        </linearGradient>
        <linearGradient id="contact-desk-light" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f4d7a0" stopOpacity="0.38" />
          <stop offset="100%" stopColor="#f4d7a0" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="900" height="1100" fill="#3a2418" />
      <rect y="760" width="900" height="340" fill="#26160f" />

      <rect x="72" y="70" width="320" height="380" rx="8" fill="#d9c4a4" />
      <rect x="90" y="88" width="284" height="344" fill="url(#contact-desk-window)" />
      <rect x="90" y="252" width="284" height="12" fill="#d9c4a4" />
      <rect x="224" y="88" width="12" height="344" fill="#d9c4a4" />
      <circle cx="330" cy="150" r="36" fill="#fff6d6" opacity="0.5" />
      <path d="M372 88 L820 760 L520 760 L372 260 Z" fill="url(#contact-desk-light)" />

      <rect x="40" y="760" width="820" height="28" rx="4" fill="#7a4324" />
      <rect x="40" y="788" width="820" height="220" fill="#5c3218" />

      <rect x="90" y="812" width="160" height="110" rx="6" fill="#efe8dc" />
      <rect x="108" y="828" width="124" height="6" fill="#d9c4a4" />
      <rect x="108" y="846" width="98" height="6" fill="#d9c4a4" />
      <rect x="108" y="864" width="112" height="6" fill="#d9c4a4" />

      <rect x="620" y="806" width="120" height="82" rx="8" fill="#c45c3a" transform="rotate(-8 680 847)" />
      <rect x="648" y="822" width="86" height="58" rx="4" fill="#efe8dc" transform="rotate(-8 691 851)" />
      <path
        d="M670 848c16-18 42-18 58 0"
        fill="none"
        stroke="#c45c3a"
        strokeWidth="4"
        transform="rotate(-8 699 848)"
      />

      <ellipse cx="780" cy="620" rx="28" ry="48" fill="#1f4a3a" />
      <ellipse cx="816" cy="592" rx="34" ry="58" fill="#24604c" />
      <rect x="770" y="628" width="32" height="70" rx="6" fill="#8a4630" />

      <GeometricDuck x={250} y={560} scale={2.35} fill={YELLOW} />
      <GeometricDuck x={620} y={700} scale={0.85} fill={RED} flip />
    </svg>
  );
}
