/**
 * Single source of truth for all user-visible English strings.
 * These get automatically translated via the Lingva API when a
 * different language is selected — no manual translations needed.
 */
export const SOURCE_STRINGS = {
  // Navigation tooltips / aria-labels
  nav_home: "Home",
  nav_projects: "Projects",
  nav_skills: "Skills",
  nav_about: "About",
  nav_contact: "Contact",

  // Hero
  hero_role: "Software Engineer",
  hero_tagline:
    "Building robust, scalable applications from frontend to backend.",
  hero_cta_projects: "View Projects",
  hero_cta_contact: "Get in Touch",

  // Section headings
  section_projects: "Projects",
  section_skills: "Skills & Tech Stack",
  section_about: "About Me",

  // Skill categories
  skillcat_Frontend: "Frontend",
  skillcat_Backend: "Backend",
  skillcat_Systems: "Systems",
  "skillcat_DevOps & Tools": "DevOps & Tools",

  // About — bio & labels
  about_bio:
    "I build things that work and last. As a Full Stack Developer at Basic-Fit I own features end-to-end — from architecture to deployment to monitoring. Three years at Codam (42 Network) taught me to go deep: reimplementing C stdlib, building game engines, writing HTTP servers from scratch. I believe low-level understanding makes high-level code better.",
  about_exp_label: "Experience",
  about_edu_label: "Education",
  // About — experience entry
  about_exp_role: "Full Stack Developer",
  about_exp_company: "Basic-Fit",
  about_exp_period: "May 2025 — Present",
  about_exp_desc:
    "Delivering production-ready features across multiple projects. Full lifecycle ownership — design, implementation, testing, deployment (Docker, Azure DevOps) and monitoring (New Relic). Backend integrations with Redis and PostgreSQL.",

  // About — education entry
  about_edu_degree: "Computer Science",
  about_edu_institution: "Codam Coding College · 42 Network",
  about_edu_period: "Oct 2022 — Apr 2025",
  about_edu_desc:
    "Self-directed, project-based programming school. Strong CS foundation: data structures, algorithms, multi-threading, networking, and low-level C — reimplementing core stdlib functions from scratch.",

  // Project descriptions (keyed by project title)
  proj_ft_transcendence:
    "Full-stack multiplayer Pong game with real-time gameplay, chat system, OAuth authentication, and user matchmaking.",
  proj_cub3d:
    "3D raycasting game engine inspired by Wolfenstein 3D. Renders a first-person perspective from a 2D map using ray casting algorithms.",
  proj_minishell:
    "A Unix shell built from scratch with support for pipes, redirections, environment variables, and signal handling.",
  proj_webserv:
    "HTTP/1.1 web server built from scratch, handling GET, POST, and DELETE requests with CGI support and non-blocking I/O.",
  proj_so_long:
    "2D tile-based game with sprite rendering, map parsing, and player movement using a minimal graphics library.",

  // Contact
  contact_headline: "Let's Work Together",
  contact_subtext:
    "Open to new opportunities, freelance projects, and interesting collaborations. Let's build something great.",
  contact_email_cta: "Send an Email",
  contact_github: "GitHub",
  contact_linkedin: "LinkedIn",
  contact_location: "Amsterdam, Netherlands",

  // Footer
  footer_built: "Built with Next.js",
} as const;

export type Strings = Record<keyof typeof SOURCE_STRINGS, string>;
