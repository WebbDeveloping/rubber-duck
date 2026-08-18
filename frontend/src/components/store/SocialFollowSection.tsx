import { Link } from 'react-router-dom';
import { BLACK, Bubbles, GeometricDuck, GREEN, RED, YELLOW } from './hero/duckArt';

export function SocialFollowSection() {
  return (
    <section className="pp-social" aria-label="Follow">
      <div className="pp-social-image" aria-hidden="true">
        <SocialBathScene />
      </div>
      <div className="pp-social-image" aria-hidden="true">
        <SocialShelfScene />
      </div>
      <Link to="/shop" className="pp-social-handle">
        @RUBBERDUCKSTORE
      </Link>
      <div className="pp-social-image" aria-hidden="true">
        <SocialDeskScene />
      </div>
      <div className="pp-social-image" aria-hidden="true">
        <SocialFloatScene />
      </div>
    </section>
  );
}

function SocialBathScene() {
  return (
    <svg viewBox="0 0 800 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="social-bath-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#47a3b3" />
          <stop offset="100%" stopColor="#1e6776" />
        </linearGradient>
      </defs>
      <rect width="800" height="800" fill="#215664" />
      <rect y="430" width="800" height="370" fill="#174650" />
      <rect x="70" y="280" width="660" height="430" rx="210" fill="#efe8dc" />
      <rect x="108" y="328" width="584" height="350" rx="180" fill="url(#social-bath-water)" />
      <ellipse cx="400" cy="360" rx="210" ry="22" fill="#fff" opacity="0.16" />
      <GeometricDuck x={210} y={250} scale={2.15} fill={YELLOW} />
      <rect x="108" y="500" width="584" height="178" fill="#1e6776" opacity="0.28" />
      <Bubbles
        items={[
          { cx: 150, cy: 240, r: 12 },
          { cx: 620, cy: 210, r: 16 },
          { cx: 680, cy: 320, r: 9 },
        ]}
      />
    </svg>
  );
}

function SocialShelfScene() {
  return (
    <svg viewBox="0 0 800 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="800" height="800" fill="#ead4c0" />
      <rect y="620" width="800" height="180" fill="#d9b896" />
      <ellipse cx="118" cy="430" rx="28" ry="48" fill={GREEN} />
      <ellipse cx="156" cy="404" rx="34" ry="60" fill="#247a54" />
      <rect x="128" y="430" width="36" height="52" rx="6" fill="#c45c3a" />
      <rect x="80" y="500" width="640" height="18" fill="#7a4324" />
      <rect x="80" y="518" width="640" height="16" fill="#543018" />
      <GeometricDuck x={220} y={348} scale={1.55} fill={RED} />
      <GeometricDuck x={460} y={318} scale={1.85} fill={YELLOW} flip />
    </svg>
  );
}

function SocialDeskScene() {
  return (
    <svg viewBox="0 0 800 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="social-desk-window" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f7e2b2" />
          <stop offset="100%" stopColor="#c9843a" />
        </linearGradient>
      </defs>
      <rect width="800" height="800" fill="#3a2418" />
      <rect y="520" width="800" height="280" fill="#26160f" />
      <rect x="48" y="48" width="240" height="280" rx="8" fill="#d9c4a4" />
      <rect x="64" y="64" width="208" height="248" fill="url(#social-desk-window)" />
      <rect x="64" y="180" width="208" height="10" fill="#d9c4a4" />
      <rect x="162" y="64" width="10" height="248" fill="#d9c4a4" />
      <rect x="32" y="520" width="736" height="24" rx="4" fill="#7a4324" />
      <rect x="48" y="560" width="140" height="96" rx="6" fill="#efe8dc" />
      <rect x="62" y="576" width="112" height="6" fill="#d9c4a4" />
      <rect x="62" y="592" width="86" height="6" fill="#d9c4a4" />
      <rect x="580" y="548" width="90" height="62" rx="8" fill="#c45c3a" />
      <GeometricDuck x={220} y={360} scale={2.05} fill={YELLOW} />
      <GeometricDuck x={560} y={430} scale={0.85} fill={BLACK} flip />
    </svg>
  );
}

function SocialFloatScene() {
  return (
    <svg viewBox="0 0 800 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="800" height="800" fill="#1d5b68" />
      <rect y="340" width="800" height="460" fill="#2f8492" />
      <ellipse cx="400" cy="360" rx="380" ry="28" fill="#fff" opacity="0.14" />
      <circle cx="620" cy="110" r="54" fill="#f7de86" opacity="0.7" />
      <GeometricDuck x={180} y={250} scale={2.25} fill={GREEN} />
      <GeometricDuck x={430} y={310} scale={1.35} fill={RED} flip />
      <rect y="480" width="800" height="320" fill="#1d6574" opacity="0.28" />
      <Bubbles
        items={[
          { cx: 120, cy: 220, r: 12 },
          { cx: 680, cy: 180, r: 16 },
          { cx: 720, cy: 300, r: 9 },
        ]}
      />
    </svg>
  );
}
