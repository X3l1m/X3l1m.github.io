export const personalInfo = {
  name: "Selim Yildirim",
  role: "Software Engineer",
  tagline: "Building robust, scalable applications from frontend to backend.",
  email: "edibselim1@gmail.com",
  github: "https://github.com/X3l1m",
  linkedin: "https://linkedin.com/in/selim-yildirim-software",
  location: "Amsterdam, Netherlands",
};

export const aboutText =
  "Full Stack Developer at Basic-Fit, working across the entire development lifecycle with TypeScript, React, and Node.js. Educated at Codam Coding College (42 Network), where I built a strong foundation in computer science through self-directed, project-based learning — from reimplementing C standard library functions to building full-stack web applications.";

export const projects = [
  {
    title: "ft_transcendence",
    description:
      "Full-stack multiplayer Pong game with real-time gameplay, chat system, OAuth authentication, and user matchmaking.",
    tech: ["TypeScript", "NestJS", "PostgreSQL", "Docker", "WebSockets"],
    github: "https://github.com/X3l1m/transcendence",
  },
  {
    title: "kiosk06",
    description:
      "Modern web application built with Next.js and Tailwind CSS, featuring a component-based architecture and responsive design.",
    tech: ["TypeScript", "Next.js", "React", "Tailwind CSS"],
    github: "https://github.com/X3l1m/kiosk06",
    demo: "https://kiosk06.vercel.app",
  },
  {
    title: "cub3d",
    description:
      "3D raycasting game engine inspired by Wolfenstein 3D. Renders a first-person perspective from a 2D map using ray casting algorithms.",
    tech: ["C", "Computer Graphics", "Math", "MiniLibX"],
    github: "https://github.com/X3l1m/cub3d",
  },
  {
    title: "minishell",
    description:
      "A Unix shell built from scratch with support for pipes, redirections, environment variables, and signal handling.",
    tech: ["C", "Unix", "Process Management", "Parsing"],
    github: "https://github.com/X3l1m/minishell",
  },
];

export const skillCategories = [
  {
    name: "Frontend",
    skills: ["TypeScript", "React", "Next.js", "HTML/CSS", "JavaScript"],
  },
  {
    name: "Backend",
    skills: ["Node.js", "NestJS", "Express.js", "PostgreSQL", "Redis"],
  },
  {
    name: "Systems",
    skills: ["C", "C++", "Python", "Linux/Unix"],
  },
  {
    name: "DevOps & Tools",
    skills: ["Docker", "Git", "CI/CD", "Azure DevOps", "New Relic"],
  },
];

export const navLinks = [
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];
