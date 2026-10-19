"use client";

/*
 * All previews use CSS custom properties so they automatically adapt
 * when the user switches between dark and light themes.
 *
 * Colour roles per preview:
 *   --preview-bg        main background
 *   --preview-surface   secondary surface (title bar, walls, floor…)
 *   --preview-border    subtle dividers
 *   --preview-text      primary text / foreground elements
 *   --preview-muted     de-emphasised text / lines
 *   --preview-accent    project accent (inherited from global accent vars)
 *
 * Dark  → near-black backgrounds, bright accents
 * Light → pale backgrounds, same accent hue but darker
 */

const vars = {
  /* Backgrounds */
  bg:       "var(--preview-bg)",
  surface:  "var(--preview-surface)",
  surface2: "var(--preview-surface2)",
  /* Text */
  text:     "var(--preview-text)",
  muted:    "var(--preview-muted)",
  /* Accent colours (reuse global tokens) */
  accent:   "var(--accent-from)",
  accentTo: "var(--accent-to)",
};

// ---------------------------------------------------------------------------
// Pong
// ---------------------------------------------------------------------------
function PongPreview() {
  return (
    <>
      <style>{`
        .preview-pong {
          --preview-bg:       #030308;
          --preview-surface:  rgba(255,255,255,0.88);
          --preview-surface2: rgba(255,255,255,0.05);
          --preview-text:     rgba(255,255,255,0.4);
          --preview-muted:    rgba(255,255,255,0.07);
        }
        [data-theme="light"] .preview-pong {
          --preview-bg:       #e8e8f2;
          --preview-surface:  rgba(30,30,60,0.85);
          --preview-surface2: rgba(30,30,60,0.05);
          --preview-text:     rgba(30,30,60,0.45);
          --preview-muted:    rgba(30,30,60,0.1);
        }
      `}</style>
      <svg
        className="preview-pong"
        viewBox="0 0 320 160"
        width="100%"
        height="100%"
        style={{ background: vars.bg, display: "block" }}
        aria-hidden
      >
        {/* Court border */}
        <rect x="4" y="4" width="312" height="152" fill="none" stroke={vars.muted} strokeWidth="1.5" />
        {/* Centre dashed line */}
        <line x1="160" y1="10" x2="160" y2="150" stroke={vars.muted} strokeWidth="1.5" strokeDasharray="6 5" />
        {/* Paddles */}
        <rect x="16"  y="52" width="7" height="56" rx="2" fill={vars.surface} />
        <rect x="297" y="68" width="7" height="56" rx="2" fill={vars.surface} />
        {/* Ball glow */}
        <circle cx="143" cy="84" r="11" fill={vars.surface2} />
        {/* Ball */}
        <circle cx="143" cy="84" r="5" fill={vars.accent} />
        {/* Scores */}
        <text x="122" y="33" fill={vars.text} fontSize="20" fontFamily="'Courier New',monospace" fontWeight="bold" textAnchor="middle">3</text>
        <text x="198" y="33" fill={vars.text} fontSize="20" fontFamily="'Courier New',monospace" fontWeight="bold" textAnchor="middle">2</text>
        {/* Trail */}
        <circle cx="132" cy="79" r="3" fill={vars.muted} />
        <circle cx="122" cy="74" r="2" fill={vars.muted} />
      </svg>
    </>
  );
}

// ---------------------------------------------------------------------------
// cub3d
// ---------------------------------------------------------------------------
function Cub3dPreview() {
  return (
    <>
      <style>{`
        .preview-cub3d {
          --preview-bg:       #06020e;
          --preview-surface:  #1e0d48;
          --preview-surface2: #180a3c;
          --preview-surface3: #120830;
          --preview-door:     #04020a;
          --preview-muted:    rgba(255,255,255,0.025);
          --preview-cross:    rgba(255,255,255,0.35);
          --preview-glow:     rgba(110,60,220,0.22);
        }
        [data-theme="light"] .preview-cub3d {
          --preview-bg:       #dcd8f0;
          --preview-surface:  #7c5cbf;
          --preview-surface2: #6a4daa;
          --preview-surface3: #5a3e96;
          --preview-door:     #c8c0e8;
          --preview-muted:    rgba(60,30,100,0.07);
          --preview-cross:    rgba(60,30,100,0.4);
          --preview-glow:     rgba(110,60,220,0.12);
        }
      `}</style>
      <svg
        className="preview-cub3d"
        viewBox="0 0 320 160"
        width="100%"
        height="100%"
        style={{ background: "var(--preview-bg)", display: "block" }}
        aria-hidden
      >
        <defs>
          <linearGradient id="cub-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="var(--preview-bg)" />
            <stop offset="100%" stopColor="var(--preview-surface3)" />
          </linearGradient>
          <linearGradient id="cub-floor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="var(--preview-surface3)" />
            <stop offset="100%" stopColor="var(--preview-bg)" />
          </linearGradient>
          <radialGradient id="cub-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="var(--preview-glow)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <rect width="320" height="80"  fill="url(#cub-sky)" />
        <rect y="80"  width="320" height="80"  fill="url(#cub-floor)" />
        <polygon points="0,0 92,36 92,124 0,160"     fill="var(--preview-surface)" />
        <polygon points="320,0 228,36 228,124 320,160" fill="var(--preview-surface2)" />
        <rect x="92" y="36" width="136" height="88"  fill="var(--preview-surface3)" />
        <rect x="138" y="62" width="44" height="62"  fill="var(--preview-door)" />
        <ellipse cx="160" cy="80" rx="55" ry="38" fill="url(#cub-glow)" />
        <line x1="0" y1="108" x2="320" y2="108" stroke="var(--preview-muted)" />
        <line x1="0" y1="132" x2="320" y2="132" stroke="var(--preview-muted)" />
        <line x1="154" y1="80" x2="166" y2="80" stroke="var(--preview-cross)" strokeWidth="1" />
        <line x1="160" y1="74" x2="160" y2="86" stroke="var(--preview-cross)" strokeWidth="1" />
      </svg>
    </>
  );
}

// ---------------------------------------------------------------------------
// minishell
// ---------------------------------------------------------------------------
function MinishellPreview() {
  const mono = "'Courier New', monospace";
  return (
    <>
      <style>{`
        .preview-minishell {
          --preview-bg:       #0c1014;
          --preview-surface:  #1c2128;
          --preview-prompt:   #00c484;
          --preview-dir:      #6a8fff;
          --preview-text:     #e0e0e0;
          --preview-muted:    rgba(255,255,255,0.3);
          --preview-label:    rgba(255,255,255,0.35);
        }
        [data-theme="light"] .preview-minishell {
          --preview-bg:       #f0f4f8;
          --preview-surface:  #dde4ed;
          --preview-prompt:   #00885a;
          --preview-dir:      #2d5fd4;
          --preview-text:     #1a1a2e;
          --preview-muted:    rgba(30,30,60,0.35);
          --preview-label:    rgba(30,30,60,0.4);
        }
      `}</style>
      <div
        className="preview-minishell"
        style={{
          width: "100%", height: "100%",
          background: "var(--preview-bg)",
          overflow: "hidden",
          fontFamily: mono, fontSize: "11px",
          display: "flex", flexDirection: "column",
        }}
      >
        {/* Title bar */}
        <div style={{
          background: "var(--preview-surface)",
          padding: "6px 12px",
          display: "flex", alignItems: "center", gap: "6px", flexShrink: 0,
        }}>
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f56", display: "inline-block" }} />
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e", display: "inline-block" }} />
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#27c93f", display: "inline-block" }} />
          <span style={{ color: "var(--preview-label)", fontSize: 10, marginLeft: 6 }}>minishell</span>
        </div>
        {/* Terminal body */}
        <div style={{ padding: "10px 14px", lineHeight: 1.75, flex: 1 }}>
          <div>
            <span style={{ color: "var(--preview-prompt)" }}>~/codam $ </span>
            <span style={{ color: "var(--preview-text)" }}>ls -la</span>
          </div>
          <div style={{ color: "var(--preview-dir)" }}>drwxr-xr-x &nbsp;src/</div>
          <div style={{ color: "var(--preview-dir)" }}>-rw-r--r-- &nbsp;Makefile</div>
          <div>
            <span style={{ color: "var(--preview-prompt)" }}>~/codam $ </span>
            <span style={{ color: "var(--preview-text)" }}>echo $USER</span>
          </div>
          <div style={{ color: "var(--preview-text)" }}>selim</div>
          <div>
            <span style={{ color: "var(--preview-prompt)" }}>~/codam $ </span>
            <span style={{ color: "var(--preview-muted)" }}>▋</span>
          </div>
        </div>
      </div>
    </>
  );
}

// ---------------------------------------------------------------------------
// webserv
// ---------------------------------------------------------------------------
function WebservPreview() {
  const mono = "'Courier New', monospace";
  return (
    <>
      <style>{`
        .preview-webserv {
          --preview-bg:       #0c1014;
          --preview-surface:  #1c2128;
          --preview-method:   #e06c75;
          --preview-key:      #98c379;
          --preview-status:   #98c379;
          --preview-text:     #e0e0e0;
          --preview-label:    #6a8fff;
          --preview-divider:  rgba(255,255,255,0.08);
          --preview-winlabel: rgba(255,255,255,0.35);
        }
        [data-theme="light"] .preview-webserv {
          --preview-bg:       #f0f4f8;
          --preview-surface:  #dde4ed;
          --preview-method:   #c0392b;
          --preview-key:      #27ae60;
          --preview-status:   #27ae60;
          --preview-text:     #1a1a2e;
          --preview-label:    #2d5fd4;
          --preview-divider:  rgba(30,30,60,0.1);
          --preview-winlabel: rgba(30,30,60,0.4);
        }
      `}</style>
      <div
        className="preview-webserv"
        style={{
          width: "100%", height: "100%",
          background: "var(--preview-bg)",
          overflow: "hidden",
          fontFamily: mono, fontSize: "10.5px",
          display: "flex", flexDirection: "column",
        }}
      >
        {/* Title bar */}
        <div style={{
          background: "var(--preview-surface)",
          padding: "6px 12px",
          display: "flex", alignItems: "center", gap: "6px", flexShrink: 0,
        }}>
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f56", display: "inline-block" }} />
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e", display: "inline-block" }} />
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#27c93f", display: "inline-block" }} />
          <span style={{ color: "var(--preview-winlabel)", fontSize: 10, marginLeft: 6 }}>HTTP/1.1</span>
        </div>
        {/* Content */}
        <div style={{ padding: "10px 14px", lineHeight: 1.85, flex: 1 }}>
          <div style={{ color: "var(--preview-label)", fontSize: 9, fontWeight: "bold", letterSpacing: "0.06em", marginBottom: 2 }}>REQUEST</div>
          <div>
            <span style={{ color: "var(--preview-method)" }}>GET </span>
            <span style={{ color: "var(--preview-text)" }}>/index.html HTTP/1.1</span>
          </div>
          <div>
            <span style={{ color: "var(--preview-key)" }}>Host: </span>
            <span style={{ color: "var(--preview-text)" }}>localhost:8080</span>
          </div>
          <div style={{ borderTop: "1px dashed var(--preview-divider)", margin: "7px 0" }} />
          <div style={{ color: "var(--preview-label)", fontSize: 9, fontWeight: "bold", letterSpacing: "0.06em", marginBottom: 2 }}>RESPONSE</div>
          <div>
            <span style={{ color: "var(--preview-text)" }}>HTTP/1.1 </span>
            <span style={{ color: "var(--preview-status)", fontWeight: "bold" }}>200 OK</span>
          </div>
          <div>
            <span style={{ color: "var(--preview-key)" }}>Content-Type: </span>
            <span style={{ color: "var(--preview-text)" }}>text/html</span>
          </div>
          <div>
            <span style={{ color: "var(--preview-key)" }}>Content-Length: </span>
            <span style={{ color: "var(--preview-text)" }}>1234</span>
          </div>
        </div>
      </div>
    </>
  );
}

// ---------------------------------------------------------------------------
// so_long
// ---------------------------------------------------------------------------
function SolongPreview() {
  const map: number[][] = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 2, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 2, 0, 0, 1],
    [1, 0, 2, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 4, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];
  const W = 32, H = 26;

  return (
    <>
      <style>{`
        .preview-solong {
          --preview-bg:     #0c0c18;
          --preview-wall:   #2a1560;
          --preview-floor:  #111128;
          --preview-player: #00ff88;
          --preview-coin:   #ffcc00;
          --preview-exit:   #ff6b35;
        }
        [data-theme="light"] .preview-solong {
          --preview-bg:     #ebebf8;
          --preview-wall:   #6040b0;
          --preview-floor:  #d8d8f0;
          --preview-player: #009955;
          --preview-coin:   #e6a800;
          --preview-exit:   #d94f1a;
        }
      `}</style>
      <svg
        className="preview-solong"
        viewBox="0 0 320 156"
        width="100%"
        height="100%"
        style={{ background: "var(--preview-bg)", display: "block" }}
        aria-hidden
      >
        {/* Tiles */}
        {map.map((row, r) =>
          row.map((cell, c) => (
            <rect
              key={`${r}-${c}`}
              x={c * W} y={r * H}
              width={W - 1} height={H - 1}
              fill={cell === 1 ? "var(--preview-wall)" : "var(--preview-floor)"}
              rx={1}
            />
          ))
        )}
        {/* Player */}
        <rect
          x={1 * W + 3} y={1 * H + 3}
          width={W - 7} height={H - 7}
          rx="3"
          fill="color-mix(in srgb, var(--preview-player) 12%, transparent)"
          stroke="var(--preview-player)" strokeWidth="1"
        />
        <text
          x={1 * W + W / 2} y={1 * H + H / 2 + 4}
          textAnchor="middle" fill="var(--preview-player)"
          fontSize="11" fontFamily="monospace"
        >@</text>
        {/* Collectibles */}
        {([[1, 4], [2, 6], [3, 2]] as [number, number][]).map(([r, c], i) => (
          <circle key={i} cx={c * W + W / 2} cy={r * H + H / 2} r="4.5" fill="var(--preview-coin)" opacity="0.9" />
        ))}
        {/* Exit */}
        <rect
          x={8 * W + 3} y={4 * H + 3}
          width={W - 7} height={H - 7}
          rx="3"
          fill="color-mix(in srgb, var(--preview-exit) 18%, transparent)"
          stroke="var(--preview-exit)" strokeWidth="1"
        />
        <text
          x={8 * W + W / 2} y={4 * H + H / 2 + 4}
          textAnchor="middle" fill="var(--preview-exit)"
          fontSize="10" fontFamily="monospace" fontWeight="bold"
        >E</text>
      </svg>
    </>
  );
}

// ---------------------------------------------------------------------------
const previewMap: Record<string, () => React.ReactElement> = {
  ft_transcendence: PongPreview,
  cub3d:            Cub3dPreview,
  minishell:        MinishellPreview,
  webserv:          WebservPreview,
  so_long:          SolongPreview,
};

export default function ProjectPreview({ title }: { title: string }) {
  const Component = previewMap[title];
  if (!Component) return null;
  return <Component />;
}
