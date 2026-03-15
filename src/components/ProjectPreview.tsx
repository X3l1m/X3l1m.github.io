"use client";

function PongPreview() {
  return (
    <svg
      viewBox="0 0 320 160"
      width="100%"
      height="100%"
      style={{ background: "#030308" }}
      aria-hidden
    >
      {/* Court border */}
      <rect
        x="4" y="4" width="312" height="152"
        fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1.5"
      />
      {/* Center dashed line */}
      <line
        x1="160" y1="10" x2="160" y2="150"
        stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" strokeDasharray="6 5"
      />
      {/* Left paddle */}
      <rect x="16" y="52" width="7" height="56" rx="2" fill="rgba(255,255,255,0.88)" />
      {/* Right paddle */}
      <rect x="297" y="68" width="7" height="56" rx="2" fill="rgba(255,255,255,0.88)" />
      {/* Ball glow */}
      <circle cx="143" cy="84" r="11" fill="rgba(255,255,255,0.05)" />
      {/* Ball */}
      <circle cx="143" cy="84" r="5" fill="white" />
      {/* Score */}
      <text
        x="122" y="33"
        fill="rgba(255,255,255,0.4)" fontSize="20"
        fontFamily="'Courier New',monospace" fontWeight="bold" textAnchor="middle"
      >3</text>
      <text
        x="198" y="33"
        fill="rgba(255,255,255,0.4)" fontSize="20"
        fontFamily="'Courier New',monospace" fontWeight="bold" textAnchor="middle"
      >2</text>
      {/* Ball trail */}
      <circle cx="132" cy="79" r="3" fill="rgba(255,255,255,0.15)" />
      <circle cx="122" cy="74" r="2" fill="rgba(255,255,255,0.07)" />
    </svg>
  );
}

function Cub3dPreview() {
  return (
    <svg
      viewBox="0 0 320 160"
      width="100%"
      height="100%"
      style={{ background: "#06020e" }}
      aria-hidden
    >
      <defs>
        <linearGradient id="cub-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#06020e" />
          <stop offset="100%" stopColor="#140630" />
        </linearGradient>
        <linearGradient id="cub-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0e0c0c" />
          <stop offset="100%" stopColor="#050404" />
        </linearGradient>
        <radialGradient id="cub-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(110,60,220,0.22)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
      </defs>
      {/* Sky */}
      <rect width="320" height="80" fill="url(#cub-sky)" />
      {/* Floor */}
      <rect y="80" width="320" height="80" fill="url(#cub-floor)" />
      {/* Left wall */}
      <polygon points="0,0 92,36 92,124 0,160" fill="#1e0d48" />
      {/* Right wall */}
      <polygon points="320,0 228,36 228,124 320,160" fill="#180a3c" />
      {/* Far wall */}
      <rect x="92" y="36" width="136" height="88" fill="#120830" />
      {/* Door opening */}
      <rect x="138" y="62" width="44" height="62" fill="#04020a" />
      {/* Ambient glow */}
      <ellipse cx="160" cy="80" rx="55" ry="38" fill="url(#cub-glow)" />
      {/* Floor depth lines */}
      <line x1="0" y1="108" x2="320" y2="108" stroke="rgba(255,255,255,0.025)" />
      <line x1="0" y1="132" x2="320" y2="132" stroke="rgba(255,255,255,0.025)" />
      {/* Crosshair */}
      <line x1="154" y1="80" x2="166" y2="80" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
      <line x1="160" y1="74" x2="160" y2="86" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
    </svg>
  );
}

function MinishellPreview() {
  const mono = "'Courier New', monospace";
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#0c1014",
        overflow: "hidden",
        fontFamily: mono,
        fontSize: "11px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Title bar */}
      <div
        style={{
          background: "#1c2128",
          padding: "6px 12px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          flexShrink: 0,
        }}
      >
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f56", display: "inline-block" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e", display: "inline-block" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#27c93f", display: "inline-block" }} />
        <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 10, marginLeft: 6 }}>minishell</span>
      </div>
      {/* Terminal body */}
      <div style={{ padding: "10px 14px", lineHeight: 1.75, flex: 1 }}>
        <div>
          <span style={{ color: "#00c484" }}>~/codam $ </span>
          <span style={{ color: "#e0e0e0" }}>ls -la</span>
        </div>
        <div style={{ color: "#6a8fff" }}>drwxr-xr-x &nbsp;src/</div>
        <div style={{ color: "#6a8fff" }}>-rw-r--r-- &nbsp;Makefile</div>
        <div>
          <span style={{ color: "#00c484" }}>~/codam $ </span>
          <span style={{ color: "#e0e0e0" }}>echo $USER</span>
        </div>
        <div style={{ color: "#e0e0e0" }}>selim</div>
        <div>
          <span style={{ color: "#00c484" }}>~/codam $ </span>
          <span style={{ color: "rgba(255,255,255,0.5)" }}>▋</span>
        </div>
      </div>
    </div>
  );
}

function WebservPreview() {
  const mono = "'Courier New', monospace";
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#0c1014",
        overflow: "hidden",
        fontFamily: mono,
        fontSize: "10.5px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Title bar */}
      <div
        style={{
          background: "#1c2128",
          padding: "6px 12px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          flexShrink: 0,
        }}
      >
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f56", display: "inline-block" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e", display: "inline-block" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#27c93f", display: "inline-block" }} />
        <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 10, marginLeft: 6 }}>HTTP/1.1</span>
      </div>
      {/* Content */}
      <div style={{ padding: "10px 14px", lineHeight: 1.85, flex: 1 }}>
        <div style={{ color: "#6a8fff", fontSize: 9, fontWeight: "bold", letterSpacing: "0.06em", marginBottom: 2 }}>
          REQUEST
        </div>
        <div>
          <span style={{ color: "#e06c75" }}>GET </span>
          <span style={{ color: "#e0e0e0" }}>/index.html HTTP/1.1</span>
        </div>
        <div>
          <span style={{ color: "#98c379" }}>Host: </span>
          <span style={{ color: "#e0e0e0" }}>localhost:8080</span>
        </div>
        <div
          style={{
            borderTop: "1px dashed rgba(255,255,255,0.08)",
            margin: "7px 0",
          }}
        />
        <div style={{ color: "#6a8fff", fontSize: 9, fontWeight: "bold", letterSpacing: "0.06em", marginBottom: 2 }}>
          RESPONSE
        </div>
        <div>
          <span style={{ color: "#e0e0e0" }}>HTTP/1.1 </span>
          <span style={{ color: "#98c379", fontWeight: "bold" }}>200 OK</span>
        </div>
        <div>
          <span style={{ color: "#98c379" }}>Content-Type: </span>
          <span style={{ color: "#e0e0e0" }}>text/html</span>
        </div>
        <div>
          <span style={{ color: "#98c379" }}>Content-Length: </span>
          <span style={{ color: "#e0e0e0" }}>1234</span>
        </div>
      </div>
    </div>
  );
}

function SolongPreview() {
  const map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 2, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 2, 0, 0, 1],
    [1, 0, 2, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 4, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];
  // 0=floor 1=wall 2=collectible 3=player 4=exit
  const W = 32, H = 26;
  const wallColor = "#2a1560";
  const floorColor = "#111128";

  return (
    <svg
      viewBox="0 0 320 156"
      width="100%"
      height="100%"
      style={{ background: "#0c0c18" }}
      aria-hidden
    >
      {/* Base tiles */}
      {map.map((row, r) =>
        row.map((cell, c) => (
          <rect
            key={`${r}-${c}`}
            x={c * W} y={r * H}
            width={W - 1} height={H - 1}
            fill={cell === 1 ? wallColor : floorColor}
            rx={1}
          />
        ))
      )}
      {/* Player @ (row=1, col=1) */}
      <rect
        x={1 * W + 3} y={1 * H + 3}
        width={W - 7} height={H - 7}
        rx="3" fill="rgba(0,255,136,0.12)" stroke="#00ff88" strokeWidth="1"
      />
      <text
        x={1 * W + W / 2} y={1 * H + H / 2 + 4}
        textAnchor="middle" fill="#00ff88"
        fontSize="11" fontFamily="monospace"
      >@</text>
      {/* Collectibles */}
      {([[1, 4], [2, 6], [3, 2]] as [number, number][]).map(([r, c], i) => (
        <circle
          key={i}
          cx={c * W + W / 2} cy={r * H + H / 2}
          r="4.5" fill="#ffcc00" opacity="0.9"
        />
      ))}
      {/* Exit (row=4, col=8) */}
      <rect
        x={8 * W + 3} y={4 * H + 3}
        width={W - 7} height={H - 7}
        rx="3" fill="rgba(255,107,53,0.18)" stroke="#ff6b35" strokeWidth="1"
      />
      <text
        x={8 * W + W / 2} y={4 * H + H / 2 + 4}
        textAnchor="middle" fill="#ff6b35"
        fontSize="10" fontFamily="monospace" fontWeight="bold"
      >E</text>
    </svg>
  );
}

const previewMap: Record<string, () => React.ReactElement> = {
  ft_transcendence: PongPreview,
  cub3d: Cub3dPreview,
  minishell: MinishellPreview,
  webserv: WebservPreview,
  so_long: SolongPreview,
};

export default function ProjectPreview({ title }: { title: string }) {
  const Component = previewMap[title];
  if (!Component) return null;
  return <Component />;
}
