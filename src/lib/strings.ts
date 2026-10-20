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
  nav_about: "Background",
  nav_contact: "Contact",

  // Hero
  hero_role: "Software Engineer",
  hero_tagline:
    "I learn fast, adapt to the task, and build what's needed.",
  hero_cta_projects: "View Projects",
  hero_cta_contact: "Get in Touch",

  // Section headings
  section_projects: "Projects",
  section_skills: "Skills & Tech Stack",
  section_about: "Background",

  // Skill categories
  skillcat_languages: "Languages",
  skillcat_frameworks: "Frameworks",
  skillcat_databases: "Databases & Caching",
  skillcat_tools: "Platforms & Tools",

  // Background — work and education, newest first
  history_developer_role: "Full Stack Developer",
  history_martin_period: "May 2026 — Present",
  history_martin_desc:
    "The company's sole software developer. Building a CRM, mobile apps and internal tools for customer service, quotations, order tracking and reporting.",
  history_basicfit_period: "May 2025 — May 2026",
  history_basicfit_desc:
    "Worked across different codebases, building features and taking them through testing, deployment and monitoring. Connected services and improved backend reliability.",
  history_codam_role: "Software Development · 42 Network",
  history_codam_period: "Oct 2022 — Apr 2025",
  history_codam_desc:
    "Learned C, algorithms, memory management and networking through hands-on projects. Built from scratch, reviewed code with peers and learned by solving problems.",

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
  contact_location: "Eindhoven, Netherlands",

  // Footer
  footer_built: "Built with Next.js",
} as const;

export type Strings = Record<keyof typeof SOURCE_STRINGS, string>;
