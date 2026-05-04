"use client";

const ITEMS = [
  "TypeScript", "React", "Next.js", "Node.js", "NestJS",
  "PostgreSQL", "Redis", "Docker", "Azure DevOps", "C", "C++",
  "Python", "Linux", "Git", "WebSockets", "REST APIs",
];

function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className="marquee overflow-hidden">
      <div
        className="marquee-track items-center gap-12 py-2"
        style={{
          animationDirection: reverse ? "reverse" : "normal",
          animationDuration: reverse ? "55s" : "45s",
        }}
      >
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span key={i} className="flex items-center gap-12 shrink-0">
            <span
              className="text-3xl md:text-5xl font-bold tracking-tight whitespace-nowrap"
              style={{ color: "var(--fg-3)" }}
            >
              {item}
            </span>
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 rounded-full shrink-0"
              style={{ background: "var(--acc-1)" }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Marquee() {
  return (
    <section
      id="marquee"
      aria-hidden
      className="relative py-12 border-y overflow-hidden"
      style={{ borderColor: "var(--line)" }}
    >
      {/* Edge fade masks */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-32 z-10"
        style={{
          background: "linear-gradient(90deg, var(--bg) 0%, transparent 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-32 z-10"
        style={{
          background: "linear-gradient(-90deg, var(--bg) 0%, transparent 100%)",
        }}
      />

      <MarqueeRow />
    </section>
  );
}
