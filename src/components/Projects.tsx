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
      width="16"
      height="16"
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
      width="16"
      height="16"
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

export default function Projects() {
  const { t } = useT();

  return (
    <Section id="projects">
      <SectionHeading>{t.section_projects}</SectionHeading>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            viewport={{ once: false, amount: 0.15 }}
            className={`glass group flex flex-col rounded-xl overflow-hidden transition-all duration-300 hover:border-white/15${project.featured ? " lg:col-span-2" : ""}`}
          >
            {/* Visual preview */}
            <div className={`w-full shrink-0 overflow-hidden${project.featured ? " h-44 sm:h-52" : " h-36"}`}>
              <ProjectPreview title={project.title} />
            </div>

            {/* Card body */}
            <div className="flex flex-1 flex-col p-5">
              <div className="mb-3 flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-semibold leading-tight">{project.title}</h3>
                  {project.featured && (
                    <span className="rounded-full border border-accent-from/30 bg-accent-from/10 px-2 py-0.5 text-[10px] font-medium text-accent-from">
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
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted ring-1 ring-border/60 transition-all duration-300 hover:text-foreground hover:ring-foreground/40"
                      aria-label={`Live demo of ${project.title}`}
                    >
                      <ExternalIcon />
                    </a>
                  )}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted ring-1 ring-border/60 transition-all duration-300 hover:text-foreground hover:ring-foreground/40"
                    aria-label={`GitHub repository for ${project.title}`}
                  >
                    <GitHubIcon />
                  </a>
                </div>
              </div>

              <p className="mb-4 flex-1 text-sm leading-relaxed text-muted">
                {t[PROJ_DESC_KEY[project.title]] ?? ""}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="glass-subtle rounded-full px-2.5 py-0.5 text-xs text-muted"
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
