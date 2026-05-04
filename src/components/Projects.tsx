"use client";

import { motion } from "framer-motion";
import { projects } from "@/lib/data";
import { useT } from "@/contexts/LanguageContext";
import type { Strings } from "@/lib/strings";
import { useSpotlight } from "@/lib/hooks";
import Section from "./Section";
import SectionHeading from "./SectionHeading";
import ProjectPreview from "./ProjectPreview";
import GlassPanel from "./GlassPanel";

const PROJ_DESC_KEY: Record<string, keyof Strings> = {
  ft_transcendence: "proj_ft_transcendence",
  cub3d:            "proj_cub3d",
  minishell:        "proj_minishell",
  webserv:          "proj_webserv",
  so_long:          "proj_so_long",
};

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

type CardProps = {
  project: (typeof projects)[number];
  description: string;
  large?: boolean;
};

function ProjectCard({ project, description, large }: CardProps) {
  const ref = useSpotlight<HTMLDivElement>();

  return (
    <GlassPanel
      as={motion.div}
      radius="3xl"
      opaque
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`group spotlight lift flex flex-col ${large ? "md:col-span-2" : ""}`}
      data-cursor="view"
    >
      {/* Preview */}
      <div className={`relative overflow-hidden ${large ? "h-64 md:h-80" : "h-48"}`}>
        <ProjectPreview title={project.title} />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: "linear-gradient(180deg, transparent 50%, var(--bg-elev) 100%)",
          }}
        />
        {project.featured && (
          <span
            className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em]"
            style={{
              background: "var(--bg-elev)",
              border: "1px solid var(--line-2)",
              color: "var(--acc-1)",
            }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--acc-1)" }} />
            Featured
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6 md:p-7">
        <div className="mb-3 flex items-center justify-between">
          <h3 className={`font-bold tracking-tight ${large ? "text-2xl" : "text-xl"}`} style={{ color: "var(--fg)" }}>
            {project.title}
          </h3>
          <div className="flex items-center gap-2">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full transition-all"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--line)",
                color: "var(--fg-2)",
              }}
              aria-label={`GitHub for ${project.title}`}
            >
              <GitHubIcon />
            </a>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full transition-all"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--line)",
                  color: "var(--fg-2)",
                }}
                aria-label={`Live demo of ${project.title}`}
              >
                <ArrowIcon />
              </a>
            )}
          </div>
        </div>

        <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: "var(--fg-3)" }}>
          {description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="rounded-md px-2.5 py-1 text-[11px] font-medium font-mono"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--line)",
                color: "var(--fg-3)",
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </GlassPanel>
  );
}

export default function Projects() {
  const { t } = useT();
  return (
    <Section id="projects">
      <SectionHeading index="01" kicker="Selected Work">
        Featured <span className="text-gradient">Projects</span>
      </SectionHeading>

      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard
            key={p.title}
            project={p}
            description={t[PROJ_DESC_KEY[p.title]] ?? ""}
            large={p.featured}
          />
        ))}
      </div>
    </Section>
  );
}
