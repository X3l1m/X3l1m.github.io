"use client";

/*
 * Theme-aware SVG/HTML previews for each project. Each preview owns a
 * `<style>` block exposing CSS variables for both themes; the parent page's
 * data-theme attribute controls which set is active.
 */

// ─── Pong ───────────────────────────────────────────────────────────────────
function PongPreview() {
  return (
    <>
      <style>{`
        .pp-pong {
          --bg:#06060c; --paddle:rgba(255,255,255,0.92); --line:rgba(255,255,255,0.08);
          --score:rgba(255,255,255,0.35); --trail:rgba(255,255,255,0.1);
        }
        [data-theme="light"] .pp-pong {
          --bg:#ebe9e1; --paddle:#1a1825; --line:rgba(20,20,40,0.1);
          --score:rgba(20,20,40,0.4); --trail:rgba(20,20,40,0.1);
        }
      `}</style>
      <svg className="pp-pong" viewBox="0 0 320 160" width="100%" height="100%" style={{ background: "var(--bg)", display: "block" }} aria-hidden>
        <rect x="4" y="4" width="312" height="152" fill="none" stroke="var(--line)" strokeWidth="1.5" />
        <line x1="160" y1="10" x2="160" y2="150" stroke="var(--line)" strokeWidth="1.5" strokeDasharray="6 5" />
        <rect x="16" y="52" width="7" height="56" rx="2" fill="var(--paddle)" />
        <rect x="297" y="68" width="7" height="56" rx="2" fill="var(--paddle)" />
        <circle cx="143" cy="84" r="11" fill="var(--trail)" />
        <circle cx="143" cy="84" r="5" fill="var(--acc-1)" />
        <text x="122" y="33" fill="var(--score)" fontSize="20" fontFamily="'Geist Mono', monospace" fontWeight="bold" textAnchor="middle">3</text>
        <text x="198" y="33" fill="var(--score)" fontSize="20" fontFamily="'Geist Mono', monospace" fontWeight="bold" textAnchor="middle">2</text>
        <circle cx="132" cy="79" r="3" fill="var(--trail)" />
        <circle cx="122" cy="74" r="2" fill="var(--trail)" />
      </svg>
    </>
  );
}

// ─── cub3d ──────────────────────────────────────────────────────────────────
function Cub3dPreview() {
  return (
    <>
      <style>{`
        .pp-cub3d {
          --bg:#06020e; --w1:#1e0d48; --w2:#180a3c; --w3:#120830; --door:#04020a;
          --line:rgba(255,255,255,0.04); --cross:rgba(255,255,255,0.4); --glow:rgba(167,139,250,0.3);
        }
        [data-theme="light"] .pp-cub3d {
          --bg:#e9e3f5; --w1:#7c5cbf; --w2:#6a4daa; --w3:#5a3e96; --door:#c8c0e8;
          --line:rgba(60,30,100,0.06); --cross:rgba(30,15,60,0.5); --glow:rgba(124,58,237,0.18);
        }
      `}</style>
      <svg className="pp-cub3d" viewBox="0 0 320 160" width="100%" height="100%" style={{ background: "var(--bg)", display: "block" }} aria-hidden>
        <defs>
          <radialGradient id="cub-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--glow)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <polygon points="0,0 92,36 92,124 0,160" fill="var(--w1)" />
        <polygon points="320,0 228,36 228,124 320,160" fill="var(--w2)" />
        <rect x="92" y="36" width="136" height="88" fill="var(--w3)" />
        <rect x="138" y="62" width="44" height="62" fill="var(--door)" />
        <ellipse cx="160" cy="80" rx="55" ry="38" fill="url(#cub-glow)" />
        <line x1="0" y1="108" x2="320" y2="108" stroke="var(--line)" />
        <line x1="0" y1="132" x2="320" y2="132" stroke="var(--line)" />
        <line x1="154" y1="80" x2="166" y2="80" stroke="var(--cross)" strokeWidth="1" />
        <line x1="160" y1="74" x2="160" y2="86" stroke="var(--cross)" strokeWidth="1" />
      </svg>
    </>
  );
}

// ─── minishell ──────────────────────────────────────────────────────────────
function MinishellPreview() {
  return (
    <>
      <style>{`
        .pp-shell {
          --bg:#0a0e14; --bar:#1c2128; --prompt:#10b981; --dir:#818cf8;
          --txt:#e0e0e0; --muted:rgba(255,255,255,0.3); --label:rgba(255,255,255,0.4);
        }
        [data-theme="light"] .pp-shell {
          --bg:#f0eee7; --bar:#dcd9d0; --prompt:#059669; --dir:#5b21b6;
          --txt:#1a1825; --muted:rgba(30,30,60,0.5); --label:rgba(30,30,60,0.5);
        }
      `}</style>
      <div className="pp-shell" style={{ width:"100%", height:"100%", background:"var(--bg)", overflow:"hidden", fontFamily:"var(--font-mono)", fontSize:"11px", display:"flex", flexDirection:"column" }}>
        <div style={{ background:"var(--bar)", padding:"6px 12px", display:"flex", alignItems:"center", gap:6, flexShrink:0 }}>
          <span style={{ width:10, height:10, borderRadius:"50%", background:"#ff5f56" }} />
          <span style={{ width:10, height:10, borderRadius:"50%", background:"#febc2e" }} />
          <span style={{ width:10, height:10, borderRadius:"50%", background:"#27c93f" }} />
          <span style={{ color:"var(--label)", fontSize:10, marginLeft:6 }}>minishell</span>
        </div>
        <div style={{ padding:"10px 14px", lineHeight:1.75, flex:1 }}>
          <div><span style={{ color:"var(--prompt)" }}>~/codam $ </span><span style={{ color:"var(--txt)" }}>ls -la</span></div>
          <div style={{ color:"var(--dir)" }}>drwxr-xr-x &nbsp;src/</div>
          <div style={{ color:"var(--dir)" }}>-rw-r--r-- &nbsp;Makefile</div>
          <div><span style={{ color:"var(--prompt)" }}>~/codam $ </span><span style={{ color:"var(--txt)" }}>echo $USER</span></div>
          <div style={{ color:"var(--txt)" }}>selim</div>
          <div><span style={{ color:"var(--prompt)" }}>~/codam $ </span><span style={{ color:"var(--muted)" }}>▋</span></div>
        </div>
      </div>
    </>
  );
}

// ─── webserv ────────────────────────────────────────────────────────────────
function WebservPreview() {
  return (
    <>
      <style>{`
        .pp-webserv {
          --bg:#0a0e14; --bar:#1c2128; --method:#f87171; --key:#34d399; --status:#34d399;
          --txt:#e0e0e0; --label:#818cf8; --divider:rgba(255,255,255,0.08); --winlabel:rgba(255,255,255,0.4);
        }
        [data-theme="light"] .pp-webserv {
          --bg:#f0eee7; --bar:#dcd9d0; --method:#dc2626; --key:#059669; --status:#059669;
          --txt:#1a1825; --label:#5b21b6; --divider:rgba(30,30,60,0.12); --winlabel:rgba(30,30,60,0.5);
        }
      `}</style>
      <div className="pp-webserv" style={{ width:"100%", height:"100%", background:"var(--bg)", overflow:"hidden", fontFamily:"var(--font-mono)", fontSize:"10.5px", display:"flex", flexDirection:"column" }}>
        <div style={{ background:"var(--bar)", padding:"6px 12px", display:"flex", alignItems:"center", gap:6, flexShrink:0 }}>
          <span style={{ width:10, height:10, borderRadius:"50%", background:"#ff5f56" }} />
          <span style={{ width:10, height:10, borderRadius:"50%", background:"#febc2e" }} />
          <span style={{ width:10, height:10, borderRadius:"50%", background:"#27c93f" }} />
          <span style={{ color:"var(--winlabel)", fontSize:10, marginLeft:6 }}>HTTP/1.1</span>
        </div>
        <div style={{ padding:"10px 14px", lineHeight:1.85, flex:1 }}>
          <div style={{ color:"var(--label)", fontSize:9, fontWeight:"bold", letterSpacing:"0.06em", marginBottom:2 }}>REQUEST</div>
          <div><span style={{ color:"var(--method)" }}>GET </span><span style={{ color:"var(--txt)" }}>/index.html HTTP/1.1</span></div>
          <div><span style={{ color:"var(--key)" }}>Host: </span><span style={{ color:"var(--txt)" }}>localhost:8080</span></div>
          <div style={{ borderTop:"1px dashed var(--divider)", margin:"7px 0" }} />
          <div style={{ color:"var(--label)", fontSize:9, fontWeight:"bold", letterSpacing:"0.06em", marginBottom:2 }}>RESPONSE</div>
          <div><span style={{ color:"var(--txt)" }}>HTTP/1.1 </span><span style={{ color:"var(--status)", fontWeight:"bold" }}>200 OK</span></div>
          <div><span style={{ color:"var(--key)" }}>Content-Type: </span><span style={{ color:"var(--txt)" }}>text/html</span></div>
          <div><span style={{ color:"var(--key)" }}>Content-Length: </span><span style={{ color:"var(--txt)" }}>1234</span></div>
        </div>
      </div>
    </>
  );
}

// ─── so_long ────────────────────────────────────────────────────────────────
function SolongPreview() {
  const map: number[][] = [
    [1,1,1,1,1,1,1,1,1,1],
    [1,3,0,0,2,0,0,0,0,1],
    [1,0,0,0,0,0,2,0,0,1],
    [1,0,2,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,4,1],
    [1,1,1,1,1,1,1,1,1,1],
  ];
  const W = 32, H = 26;
  return (
    <>
      <style>{`
        .pp-solong {
          --bg:#0c0c18; --wall:#2a1560; --floor:#111128;
          --player:#10b981; --coin:#fbbf24; --exit:#fb923c;
        }
        [data-theme="light"] .pp-solong {
          --bg:#e9e3f5; --wall:#6d28d9; --floor:#dcd5ee;
          --player:#059669; --coin:#d97706; --exit:#ea580c;
        }
      `}</style>
      <svg className="pp-solong" viewBox="0 0 320 156" width="100%" height="100%" style={{ background: "var(--bg)", display: "block" }} aria-hidden>
        {map.map((row, r) =>
          row.map((cell, c) => (
            <rect key={`${r}-${c}`} x={c*W} y={r*H} width={W-1} height={H-1}
                  fill={cell === 1 ? "var(--wall)" : "var(--floor)"} rx={1} />
          ))
        )}
        <rect x={1*W+3} y={1*H+3} width={W-7} height={H-7} rx="3"
              fill="color-mix(in srgb, var(--player) 12%, transparent)"
              stroke="var(--player)" strokeWidth="1" />
        <text x={1*W+W/2} y={1*H+H/2+4} textAnchor="middle" fill="var(--player)" fontSize="11" fontFamily="var(--font-mono)">@</text>
        {([[1,4],[2,6],[3,2]] as [number, number][]).map(([r,c],i) => (
          <circle key={i} cx={c*W+W/2} cy={r*H+H/2} r="4.5" fill="var(--coin)" opacity="0.95" />
        ))}
        <rect x={8*W+3} y={4*H+3} width={W-7} height={H-7} rx="3"
              fill="color-mix(in srgb, var(--exit) 18%, transparent)"
              stroke="var(--exit)" strokeWidth="1" />
        <text x={8*W+W/2} y={4*H+H/2+4} textAnchor="middle" fill="var(--exit)" fontSize="10" fontFamily="var(--font-mono)" fontWeight="bold">E</text>
      </svg>
    </>
  );
}

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
