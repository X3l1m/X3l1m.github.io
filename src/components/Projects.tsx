"use client";

import { motion } from "framer-motion";
import { projects } from "@/lib/data";
import { useT } from "@/contexts/LanguageContext";
import type { Strings } from "@/lib/strings";
import SectionHeading from "./SectionHeading";
import Section from "./Section";
import ProjectPreview from "./ProjectPreview";

function GitHubIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

// Map project title → strings.ts key
const PROJ_DESC_KEY: Record<string, keyof Strings> = {
  ft_transcendence: "proj_ft_transcendence",
  cub3d: "proj_cub3d",
  minishell: "proj_minishell",
  webserv: "proj_webserv",
  so_long: "proj_so_long",
};

// Bento layout: col-span and row-span per project (order matches data.ts)
const BENTO: Record<string, { col: string; row: string; featured: boolean }> = {
  ft_transcendence: { col: "lg:col-span-4", row: "lg:row-span-2", featured: true },
  cub3d:            { col: "lg:col-span-2", row: "lg:row-span-2", featured: false },
  minishell:        { col: "lg:col-span-2", row: "",              featured: false },
  webserv:          { col: "lg:col-span-2", row: "",              featured: false },
  so_long:          { col: "lg:col-span-2", row: "",              featured: false },
};

export default function Projects() {
  const { t } = useT();

  return (
    <Section id="projects">
      <SectionHeading>{t.section_projects}</SectionHeading>

      <div className="grid auto-rows-[200px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {projects.map((project, i) => {
          const bento = BENTO[project.title] ?? { col: "lg:col-span-2", row: "", featured: false };
          const isFeatured = bento.featured;

          return (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              viewport={{ once: false, amount: 0.1 }}
              className={`group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition-all duration-500 hover:border-accent-from/30 hover:-translate-y-0.5 hover:shadow-[0_0_40px_-12px_rgba(34,211,238,0.2)] ${bento.col} ${bento.row} ${isFeatured ? "sm:col-span-2" : ""}`}
            >
              {isFeatured ? (
                /* Featured card: preview fills, body overlays at bottom */
                <>
                  <div className="absolute inset-0 overflow-hidden">
                    <ProjectPreview title={project.title} />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-card via-card/90 to-transparent p-5 pt-12">
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-semibold leading-tight">{project.title}</h3>
                        <span className="rounded-md border border-accent-amber/30 bg-accent-amber/10 px-2 py-0.5 text-[10px] font-semibold text-accent-amber uppercase tracking-wider">
                          featured
                        </span>
                      </div>
                      <div className="flex shrink-0 items-center gap-1.5">
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-border/60 bg-background/50 text-muted transition-all hover:border-accent-from/40 hover:text-accent-from"
                            aria-label={`Live demo of ${project.title}`}
                          >
                            <ExternalIcon />
                          </a>
                        )}
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-border/60 bg-background/50 text-muted transition-all hover:border-accent-from/40 hover:text-accent-from"
                          aria-label={`GitHub repository for ${project.title}`}
                        >
                          <GitHubIcon />
                        </a>
                      </div>
                    </div>
                    <p className="mb-3 text-xs leading-relaxed text-muted line-clamp-2">
                      {t[PROJ_DESC_KEY[project.title]] ?? ""}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-border/60 bg-background/40 px-2 py-0.5 font-mono text-[10px] text-muted transition-colors hover:border-accent-from/30 hover:text-accent-from"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                /* Regular card */
                <>
                  <div className="h-36 w-full shrink-0 overflow-hidden">
                    <ProjectPreview title={project.title} />
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <h3 className="text-sm font-semibold leading-tight">{project.title}</h3>
                      <div className="flex shrink-0 items-center gap-1">
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-border/60 bg-background/50 text-muted transition-all hover:border-accent-from/40 hover:text-accent-from"
                            aria-label={`Live demo of ${project.title}`}
                          >
                            <ExternalIcon />
                          </a>
                        )}
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-border/60 bg-background/50 text-muted transition-all hover:border-accent-from/40 hover:text-accent-from"
                          aria-label={`GitHub repository for ${project.title}`}
                        >
                          <GitHubIcon />
                        </a>
                      </div>
                    </div>
                    <p className="mb-3 flex-1 text-xs leading-relaxed text-muted line-clamp-2">
                      {t[PROJ_DESC_KEY[project.title]] ?? ""}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {project.tech.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-border/60 px-2 py-0.5 font-mono text-[10px] text-muted transition-colors hover:border-accent-from/30 hover:text-accent-from"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
