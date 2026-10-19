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
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

const PROJ_DESC_KEY: Record<string, keyof Strings> = {
  ft_transcendence: "proj_ft_transcendence",
  cub3d: "proj_cub3d",
  minishell: "proj_minishell",
  webserv: "proj_webserv",
  so_long: "proj_so_long",
};

export default function Projects() {
  const { t } = useT();

  return (
    <Section id="projects">
      <SectionHeading>{t.section_projects}</SectionHeading>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: i * 0.07 }}
            viewport={{ once: false, amount: 0.12 }}
            whileHover={{ y: -4 }}
            className={`group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card${project.featured ? " lg:col-span-2" : ""}`}
            style={{
              boxShadow: "var(--shadow-sm)",
              transition: "box-shadow 0.3s ease, border-color 0.3s ease, transform 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "var(--shadow-md), 0 0 0 1px var(--accent-from)";
              e.currentTarget.style.borderColor = "var(--accent-from)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "var(--shadow-sm)";
              e.currentTarget.style.borderColor = "var(--border)";
            }}
          >
            {/* Preview */}
            <div
              className={`w-full shrink-0 overflow-hidden relative${project.featured ? " h-48 sm:h-56" : " h-36"}`}
              style={{ background: "var(--surface)" }}
            >
              <ProjectPreview title={project.title} />
              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to bottom, transparent 60%, var(--card) 100%)",
                  pointerEvents: "none",
                }}
              />
            </div>

            {/* Card body */}
            <div className="flex flex-1 flex-col p-5 pt-4">
              <div className="mb-3 flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-sm font-bold leading-tight text-foreground">{project.title}</h3>
                  {project.featured && (
                    <span
                      className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                      style={{
                        background: "linear-gradient(135deg, var(--accent-from), var(--accent-to))",
                        color: "#fff",
                        letterSpacing: "0.03em",
                      }}
                    >
                      featured
                    </span>
                  )}
                </div>

                <div className="flex shrink-0 items-center gap-1.5">
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-muted transition-all duration-200 hover:text-foreground"
                      style={{ background: "var(--surface)", border: "1px solid var(--border-2)" }}
                      aria-label={`Live demo of ${project.title}`}
                    >
                      <ExternalIcon />
                    </a>
                  )}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-muted transition-all duration-200 hover:text-foreground"
                    style={{ background: "var(--surface)", border: "1px solid var(--border-2)" }}
                    aria-label={`GitHub for ${project.title}`}
                  >
                    <GitHubIcon />
                  </a>
                </div>
              </div>

              <p className="mb-4 flex-1 text-xs leading-relaxed text-muted">
                {t[PROJ_DESC_KEY[project.title]] ?? ""}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md px-2 py-0.5 text-[11px] font-medium text-muted"
                    style={{
                      background: "var(--surface)",
                      border: "1px solid var(--border-2)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
