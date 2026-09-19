import Image from "next/image";
import type { ArtKind, Product } from "@/lib/catalog";

// Flat food illustrations used until real product photography is added.

export const artBackgrounds: Record<ArtKind, string> = {
  "jollof-chicken": "#ffd9c2",
  "jollof-beef": "#ffcfbf",
  tilapia: "#ffe6b3",
  plantain: "#fff0b8",
  "puff-puff": "#fde2c4",
  "meat-pie": "#fbe0c0",
  "chin-chin": "#ffe8c7",
  gizdodo: "#ffd3c4",
  parfait: "#fde7f0",
  kebab: "#f8d6c5",
  zobo: "#f5d0df",
  juice: "#ffe0b5",
  soda: "#dff0e3",
  water: "#dcecf6",
};

// Rounded so server and browser produce identical markup
const r1 = (n: number) => Math.round(n * 10) / 10;

function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function Plate({ children, bowl }: { children: React.ReactNode; bowl?: boolean }) {
  return (
    <>
      <ellipse cx="200" cy="352" rx="140" ry="16" fill="#2a1a14" opacity=".12" />
      {bowl ? (
        <>
          <path d="M60 205h280c0 80-62 140-140 140S60 285 60 205Z" fill="#fffaf3" />
          <path d="M60 205h280c0 80-62 140-140 140S60 285 60 205Z" fill="none" stroke="#2a1a14" strokeOpacity=".08" strokeWidth="3" />
          <path d="M78 250c30 50 214 50 244 0" fill="none" stroke="#d9480f" strokeWidth="6" strokeOpacity=".7" />
          <ellipse cx="200" cy="205" rx="140" ry="34" fill="#f3e6d7" />
          {children}
        </>
      ) : (
        <>
          <circle cx="200" cy="205" r="150" fill="#fffaf3" />
          <circle cx="200" cy="205" r="150" fill="none" stroke="#2a1a14" strokeOpacity=".07" strokeWidth="3" />
          <circle cx="200" cy="205" r="118" fill="none" stroke="#2a1a14" strokeOpacity=".06" strokeWidth="2" />
          {children}
        </>
      )}
    </>
  );
}

function Rice({ seed = 7 }: { seed?: number }) {
  const r = rng(seed);
  const grains = Array.from({ length: 150 }, () => {
    const a = r() * Math.PI * 2;
    const d = Math.sqrt(r()) * 92;
    return { x: r1(190 + Math.cos(a) * d * 1.1), y: r1(215 + Math.sin(a) * d * 0.9), rot: r1(r() * 180), c: r() };
  });
  return (
    <g>
      <path d="M92 222c-6-52 38-96 104-98 70-2 118 36 114 92-4 60-60 92-116 88-58-4-98-30-102-82Z" fill="#df5a24" />
      <path d="M92 222c-6-52 38-96 104-98 70-2 118 36 114 92-4 60-60 92-116 88-58-4-98-30-102-82Z" fill="url(#riceShade)" />
      {grains.map((g, i) => (
        <rect
          key={i}
          x={g.x - 5}
          y={g.y - 1.7}
          width="10"
          height="3.4"
          rx="1.7"
          transform={`rotate(${g.rot} ${g.x} ${g.y})`}
          fill={g.c > 0.66 ? "#f39a5c" : g.c > 0.2 ? "#ec7a3c" : "#b8360c"}
        />
      ))}
      {/* sliced onion + pepper flecks */}
      <circle cx="150" cy="190" r="9" fill="none" stroke="#fff3dc" strokeWidth="3" />
      <circle cx="238" cy="262" r="7" fill="none" stroke="#fff3dc" strokeWidth="3" />
      <path d="M170 262l10-4M224 170l8 6M120 238l9 3" stroke="#2f6b3f" strokeWidth="4" strokeLinecap="round" />
    </g>
  );
}

function Plantains({ x = 0, y = 0, n = 5, scale = 1 }: { x?: number; y?: number; n?: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      {Array.from({ length: n }, (_, i) => (
        <g key={i} transform={`translate(${i * 26} ${i % 2 ? 10 : -4}) rotate(${-24 + i * 6})`}>
          <ellipse cx="0" cy="0" rx="24" ry="14" fill="#c9701a" />
          <ellipse cx="-1" cy="-1" rx="20" ry="10.5" fill="#f4b13a" />
          <ellipse cx="-6" cy="-4" rx="7" ry="3" fill="#ffd978" opacity=".8" />
        </g>
      ))}
    </g>
  );
}

function Drumstick() {
  const meat = "M-78 0C-78-50-24-58 18-28c14 10 26 18 34 28-8 10-20 18-34 28-42 30-96 22-96-28Z";
  return (
    <g transform="translate(236 172) rotate(-32)">
      <ellipse cx="-14" cy="34" rx="70" ry="14" fill="#5a1f06" opacity=".25" />
      <rect x="40" y="-9" width="62" height="18" rx="9" fill="#f6e6cc" />
      <circle cx="104" cy="-11" r="12" fill="#fbeed9" />
      <circle cx="104" cy="11" r="12" fill="#f6e6cc" />
      <path d={meat} fill="#9a3c12" />
      <path d={meat} fill="url(#chickenGlaze)" />
      <path d="M-58-14l22 30M-34-28l30 42M-8-30l24 34" stroke="#4a1a06" strokeWidth="6" strokeLinecap="round" opacity=".55" />
      <path d="M-60-20c14-18 40-22 60-12" stroke="#f2a35a" strokeWidth="6" strokeLinecap="round" fill="none" opacity=".75" />
      <circle cx="-30" cy="16" r="2.5" fill="#2f6b3f" />
      <circle cx="-10" cy="-8" r="2.5" fill="#2f6b3f" />
    </g>
  );
}

function BeefChunks({ x = 232, y = 150 }: { x?: number; y?: number }) {
  const pieces = [
    [0, 0, 12],
    [42, 14, -18],
    [8, 44, 30],
    [50, 56, -6],
    [-30, 30, 20],
  ];
  return (
    <g transform={`translate(${x} ${y})`}>
      {pieces.map(([px, py, rot], i) => (
        <g key={i} transform={`translate(${px} ${py}) rotate(${rot})`}>
          <rect x="-20" y="-16" width="40" height="32" rx="10" fill="#5e1e0b" />
          <rect x="-17" y="-14" width="34" height="24" rx="8" fill="#a3290d" />
          <path d="M-10 -6c6-3 14-3 18 0" stroke="#e9573a" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        </g>
      ))}
      <path d="M-26 60c20 10 60 10 86-2" stroke="#c81e0a" strokeWidth="10" strokeLinecap="round" fill="none" opacity=".55" />
    </g>
  );
}

function Tilapia() {
  return (
    <g>
      {/* fries */}
      {Array.from({ length: 9 }, (_, i) => (
        <rect
          key={i}
          x={100 + i * 13}
          y={95 + (i % 3) * 8}
          width="16"
          height="92"
          rx="5"
          transform={`rotate(${-18 + i * 4} ${108 + i * 13} 150)`}
          fill={i % 2 ? "#f6c453" : "#e9ae3b"}
        />
      ))}
      <g transform="translate(212 245) rotate(-14)">
        <path d="M-120 0c30-46 110-60 170-30 20 10 32 20 40 30-8 10-20 20-40 30-60 30-140 16-170-30Z" fill="#8f6440" />
        <path d="M-120 0c30-46 110-60 170-30 20 10 32 20 40 30-8 10-20 20-40 30-60 30-140 16-170-30Z" fill="url(#fishSkin)" />
        <path d="M90 0l44-34c6 22 6 46 0 68Z" fill="#7a4f2c" />
        <path d="M-60-28l-10 56M-30-34l-10 68M0-34l-10 68M30-30l-10 60M58-22l-8 44" stroke="#3a220f" strokeWidth="5" strokeLinecap="round" opacity=".55" />
        <circle cx="-86" cy="-8" r="9" fill="#fffaf3" />
        <circle cx="-86" cy="-8" r="4.5" fill="#2a1a14" />
        <path d="M-60 16c10 10 40 14 60 10" stroke="#d24a14" strokeWidth="6" strokeLinecap="round" fill="none" />
      </g>
      <path d="M110 300l14-8M292 300l-10-10M280 180l12-6" stroke="#2f6b3f" strokeWidth="5" strokeLinecap="round" />
      <circle cx="120" cy="286" r="12" fill="#f3d26b" />
      <circle cx="120" cy="286" r="7" fill="none" stroke="#fff5cc" strokeWidth="2" />
    </g>
  );
}

function PuffPuff() {
  const balls = [
    [150, 180, 40],
    [232, 170, 44],
    [190, 240, 46],
    [118, 256, 36],
    [272, 250, 40],
    [205, 300, 30],
    [150, 312, 26],
  ];
  return (
    <g>
      <path d="M78 140h244l-18 190H96Z" fill="#f4e6d3" opacity=".001" />
      {balls.map(([x, y, r], i) => (
        <g key={i}>
          <circle cx={x} cy={y + 4} r={r} fill="#8e4a12" opacity=".25" />
          <circle cx={x} cy={y} r={r} fill="url(#puff)" />
          <ellipse cx={x - r * 0.3} cy={y - r * 0.35} rx={r * 0.32} ry={r * 0.2} fill="#ffe3a3" opacity=".7" />
          <path d={`M${x - r * 0.5} ${y + r * 0.3}q${r * 0.2} ${r * 0.15} ${r * 0.4} 0`} stroke="#9c5214" strokeWidth="2.5" fill="none" opacity=".5" />
        </g>
      ))}
      {Array.from({ length: 30 }, (_, i) => (
        <circle key={i} cx={110 + ((i * 37) % 190)} cy={150 + ((i * 53) % 170)} r="2" fill="#fffaf3" opacity=".85" />
      ))}
    </g>
  );
}

function MeatPie() {
  return (
    <g>
      {[
        [-1, 150, 170, -12],
        [1, 222, 250, 8],
      ].map(([flip, x, y, rot], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${rot})`}>
          <path d="M-90 20c0-70 180-70 180 0Z" fill="#b8691f" transform="translate(0 6)" opacity=".35" />
          <path d="M-90 20c0-70 180-70 180 0Z" fill="#e7a852" />
          <path d="M-90 20c0-70 180-70 180 0Z" fill="url(#pastry)" />
          <path d="M-84 20h168" stroke="#c07a2b" strokeWidth="8" strokeLinecap="round" />
          {Array.from({ length: 10 }, (_, j) => (
            <path key={j} d={`M${-78 + j * 17} 14v12`} stroke="#9d5b1c" strokeWidth="3" strokeLinecap="round" />
          ))}
          <path d={`M${-20 * (flip as number)} -18l6 6M4 -24l6 6M26 -16l6 6`} stroke="#9d5b1c" strokeWidth="3.5" strokeLinecap="round" />
        </g>
      ))}
    </g>
  );
}

function ChinChin() {
  const r = rng(11);
  const bits = Array.from({ length: 70 }, () => ({
    x: r1(96 + r() * 208),
    y: r1(150 + r() * 70 - Math.abs(r() - 0.5) * 30),
    rot: r1(r() * 90),
    s: r1(10 + r() * 6),
    c: r(),
  }));
  return (
    <g>
      {bits.map((b, i) => (
        <rect
          key={i}
          x={b.x}
          y={b.y}
          width={b.s}
          height={b.s * 0.8}
          rx="3"
          transform={`rotate(${b.rot} ${b.x} ${b.y})`}
          fill={b.c > 0.6 ? "#f2c270" : b.c > 0.25 ? "#e1a24e" : "#c98434"}
        />
      ))}
    </g>
  );
}

function Gizdodo() {
  const r = rng(5);
  const bits = Array.from({ length: 26 }, () => ({ x: r1(100 + r() * 190), y: r1(150 + r() * 70), rot: r1(r() * 90), t: r() }));
  return (
    <g>
      <path d="M70 205c40-30 220-30 260 0-40 22-220 22-260 0Z" fill="#c9230d" opacity=".75" />
      {bits.map((b, i) =>
        b.t > 0.5 ? (
          <g key={i} transform={`translate(${b.x} ${b.y}) rotate(${b.rot})`}>
            <rect x="-11" y="-9" width="22" height="18" rx="5" fill="#f2a534" />
            <rect x="-7" y="-6" width="10" height="5" rx="2" fill="#ffd978" opacity=".8" />
          </g>
        ) : (
          <g key={i} transform={`translate(${b.x} ${b.y}) rotate(${b.rot})`}>
            <path d="M-12 0c0-10 24-10 24 0s-24 10-24 0Z" fill="#6b200c" />
            <path d="M-6-2c3-3 9-3 12 0" stroke="#b33a14" strokeWidth="3" strokeLinecap="round" fill="none" />
          </g>
        ),
      )}
      <path d="M140 170l14 6M250 186l10-8M190 150l6 10" stroke="#2f6b3f" strokeWidth="5" strokeLinecap="round" />
      <path d="M118 190l10-2M270 160l8 4" stroke="#2a8a3e" strokeWidth="6" strokeLinecap="round" />
    </g>
  );
}

function Kebab() {
  return (
    <g>
      {[0, 1].map((i) => (
        <g key={i} transform={`translate(${130 + i * 40} ${120 + i * 46}) rotate(35)`}>
          <rect x="-8" y="-4" width="250" height="7" rx="3.5" fill="#caa47a" />
          {[20, 70, 120, 170].map((x, j) => (
            <g key={j}>
              <rect x={x} y="-22" width="40" height="40" rx="11" fill={j % 2 ? "#6a220d" : "#7c2a0f"} />
              <path d={`M${x + 8} -10h24M${x + 8} 4h24`} stroke="#3a1206" strokeWidth="4" strokeLinecap="round" opacity=".6" />
              <circle cx={x + 12} cy="-12" r="2.5" fill="#e9b35a" />
              <circle cx={x + 28} cy="8" r="2.5" fill="#e9b35a" />
              {j < 3 && <rect x={x + 42} y="-15" width="6" height="26" rx="3" fill={j % 2 ? "#2f8a3e" : "#e23a1a"} />}
            </g>
          ))}
        </g>
      ))}
      <path d="M100 290c30 12 70 14 100 4" stroke="#c9230d" strokeWidth="8" strokeLinecap="round" opacity=".5" fill="none" />
    </g>
  );
}

function Parfait() {
  return (
    <g>
      <ellipse cx="200" cy="352" rx="96" ry="12" fill="#2a1a14" opacity=".12" />
      <path d="M120 110h160l-16 230c-1 8-8 14-16 14h-96c-8 0-15-6-16-14Z" fill="#ffffff" opacity=".6" />
      <clipPath id="cup">
        <path d="M124 116h152l-15 222c-1 7-7 12-14 12h-94c-7 0-13-5-14-12Z" />
      </clipPath>
      <g clipPath="url(#cup)">
        <rect x="100" y="116" width="200" height="240" fill="#fffaf3" />
        <path d="M100 300c30-10 70 8 100-2s70-8 100 2v60H100Z" fill="#c98434" />
        {Array.from({ length: 24 }, (_, i) => (
          <circle key={i} cx={130 + ((i * 29) % 150)} cy={312 + ((i * 17) % 34)} r="4.5" fill="#8e5520" />
        ))}
        <path d="M100 240c30 10 60-10 100 0s70 8 100-2v34c-30-8-70 8-100 0s-70-10-100 0Z" fill="#f28ab2" />
        <path d="M100 196c30-10 70 8 100-2s70-8 100 2v26c-30-8-70 8-100 0s-70-10-100 0Z" fill="#e0a653" />
        {Array.from({ length: 16 }, (_, i) => (
          <circle key={i} cx={128 + ((i * 41) % 150)} cy={206 + ((i * 7) % 14)} r="4" fill="#8e5520" />
        ))}
      </g>
      <path d="M120 110h160l-16 230c-1 8-8 14-16 14h-96c-8 0-15-6-16-14Z" fill="none" stroke="#2a1a14" strokeOpacity=".15" strokeWidth="4" />
      <path d="M140 130l-10 190" stroke="#fff" strokeWidth="8" strokeLinecap="round" opacity=".7" />
      {/* toppings */}
      <path d="M150 116c-6-30 30-36 38-14 10-24 44-16 36 10" fill="#fffaf3" />
      <path d="M174 88c-14 0-22 12-18 24 6 14 30 14 36 0 4-12-4-24-18-24Z" fill="#e02d45" />
      <path d="M166 84l8 6 8-6" stroke="#2f8a3e" strokeWidth="5" strokeLinecap="round" fill="none" />
      <circle cx="226" cy="104" r="14" fill="#3b3f8f" />
      <circle cx="222" cy="100" r="4" fill="#7c80d6" />
      <circle cx="250" cy="112" r="12" fill="#3b3f8f" />
      <path d="M196 116c10-12 26-12 32 0" fill="#e02d45" />
    </g>
  );
}

function Bottle({ liquid, label, cap = "#2a1a14" }: { liquid: string; label: string; cap?: string }) {
  return (
    <g>
      <ellipse cx="200" cy="356" rx="80" ry="12" fill="#2a1a14" opacity=".12" />
      <rect x="176" y="46" width="48" height="30" rx="6" fill={cap} />
      <path d="M180 76h40v30c0 16 44 30 44 70v160c0 12-10 20-22 20h-84c-12 0-22-8-22-20V176c0-40 44-54 44-70Z" fill={liquid} />
      <path d="M180 76h40v30c0 16 44 30 44 70v160c0 12-10 20-22 20h-84c-12 0-22-8-22-20V176c0-40 44-54 44-70Z" fill="url(#glass)" />
      <rect x="136" y="210" width="128" height="90" rx="10" fill="#fde7f0" />
      <circle cx="200" cy="255" r="32" fill="none" stroke="#f28ab2" strokeWidth="8" />
      <text x="200" y="260" textAnchor="middle" fontSize="15" fontWeight="800" fill="#2a1a14" fontFamily="Georgia, serif">
        {label}
      </text>
      <path d="M156 150c-6 30-6 150 0 170" stroke="#fff" strokeWidth="9" strokeLinecap="round" opacity=".45" fill="none" />
    </g>
  );
}

function Can() {
  return (
    <g>
      <ellipse cx="200" cy="354" rx="84" ry="12" fill="#2a1a14" opacity=".12" />
      <path d="M134 96h132l6 16v216l-6 16H134l-6-16V112Z" fill="#2f6b3f" />
      <path d="M128 150h144v130H128Z" fill="#f4a62a" />
      <path d="M128 150c40 30 104-30 144 0v30c-40-30-104 30-144 0Z" fill="#d9480f" />
      <ellipse cx="200" cy="96" rx="66" ry="12" fill="#cfd6d2" />
      <ellipse cx="200" cy="96" rx="52" ry="8" fill="#aab3ae" />
      <rect x="190" y="88" width="28" height="9" rx="4.5" fill="#dfe5e1" />
      <path d="M146 116v214" stroke="#fff" strokeWidth="10" strokeLinecap="round" opacity=".35" />
      {Array.from({ length: 8 }, (_, i) => (
        <circle key={i} cx={100 + i * 30} cy={70 + (i % 3) * 22} r={3 + (i % 3)} fill="none" stroke="#2f6b3f" strokeWidth="2.5" opacity=".4" />
      ))}
    </g>
  );
}

function Water() {
  return (
    <g>
      <ellipse cx="200" cy="356" rx="70" ry="11" fill="#2a1a14" opacity=".12" />
      <rect x="180" y="48" width="40" height="26" rx="6" fill="#2b7bb9" />
      <path d="M182 74h36v20c0 12 34 22 34 52v18c-8 6-8 14 0 20v30c-8 6-8 14 0 20v30c-8 6-8 14 0 20v54c0 10-8 18-18 18h-68c-10 0-18-8-18-18v-54c8-6 8-14 0-20v-30c8-6 8-14 0-20v-30c8-6 8-14 0-20v-18c0-30 34-40 34-52Z" fill="#cfe6f5" />
      <path d="M148 150h104v200H148Z" fill="#9fcdee" opacity=".5" />
      <rect x="148" y="220" width="104" height="54" fill="#2b7bb9" />
      <text x="200" y="253" textAnchor="middle" fontSize="16" fontWeight="800" fill="#fff" fontFamily="Georgia, serif">
        WATER
      </text>
      <path d="M162 130c-6 20-6 190 0 210" stroke="#fff" strokeWidth="8" strokeLinecap="round" opacity=".7" fill="none" />
    </g>
  );
}

const Defs = () => (
  <defs>
    <radialGradient id="riceShade" cx="40%" cy="30%" r="80%">
      <stop offset="0" stopColor="#ffb07a" stopOpacity=".5" />
      <stop offset="1" stopColor="#a8300a" stopOpacity=".45" />
    </radialGradient>
    <radialGradient id="chickenGlaze" cx="35%" cy="30%" r="80%">
      <stop offset="0" stopColor="#e2782f" stopOpacity=".9" />
      <stop offset="1" stopColor="#5a1f06" stopOpacity=".6" />
    </radialGradient>
    <radialGradient id="puff" cx="35%" cy="30%" r="75%">
      <stop offset="0" stopColor="#f2b35a" />
      <stop offset=".6" stopColor="#cf7a1f" />
      <stop offset="1" stopColor="#8e4a12" />
    </radialGradient>
    <linearGradient id="pastry" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#f7cf86" stopOpacity=".9" />
      <stop offset="1" stopColor="#c07a2b" stopOpacity=".3" />
    </linearGradient>
    <linearGradient id="fishSkin" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#c28a57" stopOpacity=".7" />
      <stop offset="1" stopColor="#4b2c14" stopOpacity=".5" />
    </linearGradient>
    <linearGradient id="glass" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stopColor="#fff" stopOpacity=".25" />
      <stop offset=".5" stopColor="#fff" stopOpacity="0" />
      <stop offset="1" stopColor="#000" stopOpacity=".18" />
    </linearGradient>
  </defs>
);

export function FoodIllustration({ art, className }: { art: ArtKind; className?: string }) {
  let scene: React.ReactNode;
  switch (art) {
    case "jollof-chicken":
      scene = (
        <Plate>
          <Rice />
          <Drumstick />
          <Plantains x={112} y={292} n={3} scale={0.8} />
        </Plate>
      );
      break;
    case "jollof-beef":
      scene = (
        <Plate>
          <Rice seed={21} />
          <BeefChunks />
        </Plate>
      );
      break;
    case "tilapia":
      scene = (
        <Plate>
          <Tilapia />
        </Plate>
      );
      break;
    case "plantain":
      scene = (
        <Plate>
          <Plantains x={110} y={150} n={5} scale={1.25} />
          <Plantains x={120} y={235} n={5} scale={1.2} />
        </Plate>
      );
      break;
    case "puff-puff":
      scene = (
        <Plate>
          <PuffPuff />
        </Plate>
      );
      break;
    case "meat-pie":
      scene = (
        <Plate>
          <MeatPie />
        </Plate>
      );
      break;
    case "chin-chin":
      scene = (
        <Plate bowl>
          <ChinChin />
        </Plate>
      );
      break;
    case "gizdodo":
      scene = (
        <Plate bowl>
          <Gizdodo />
        </Plate>
      );
      break;
    case "kebab":
      scene = (
        <Plate>
          <Kebab />
        </Plate>
      );
      break;
    case "parfait":
      scene = <Parfait />;
      break;
    case "zobo":
      scene = <Bottle liquid="#7a1236" label="Zobo" cap="#d9588f" />;
      break;
    case "juice":
      scene = <Bottle liquid="#f08a24" label="Juice" cap="#2f6b3f" />;
      break;
    case "soda":
      scene = <Can />;
      break;
    case "water":
      scene = <Water />;
      break;
  }
  return (
    <svg viewBox="0 0 400 400" className={className} role="img" aria-hidden>
      <Defs />
      {scene}
    </svg>
  );
}

/** Product visual: the real photo when one is set, otherwise the illustration. */
export function ProductArt({
  product,
  className = "",
  sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw",
  priority,
}: {
  product: Product;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ backgroundColor: artBackgrounds[product.art] }}>
      {product.image ? (
        <Image src={product.image} alt={product.name} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        <>
          <div className="pattern-dots absolute inset-0 opacity-60" />
          <FoodIllustration art={product.art} className="absolute inset-[8%] h-[84%] w-[84%] drop-shadow-[0_18px_22px_rgba(90,40,10,0.18)]" />
        </>
      )}
    </div>
  );
}
