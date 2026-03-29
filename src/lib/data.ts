export const personalInfo = {
  name: "Selim Yildirim",
  role: "Software Engineer",
  tagline: "Building robust, scalable applications from frontend to backend.",
  email: "edibselim1@gmail.com",
  github: "https://github.com/X3l1m",
  linkedin: "https://linkedin.com/in/selim-yildirim-software",
};

// Experience tech tags (non-translatable, kept here for structure)
export const experienceTech = [
  "TypeScript",
  "React",
  "Next.js",
  "NestJS",
  "Express.js",
  "Docker",
  "Azure DevOps",
  "New Relic",
  "Redis",
  "PostgreSQL",
];

type Project = {
  title: string;
  tech: string[];
  github: string;
  demo?: string;
};

export const projects: Project[] = [
  {
    title: "ft_transcendence",
    tech: ["TypeScript", "NestJS", "PostgreSQL", "Docker", "WebSockets"],
    github: "https://github.com/X3l1m/transcendence",
  },
  {
    title: "cub3d",
    tech: ["C", "Computer Graphics", "Math", "MiniLibX"],
    github: "https://github.com/X3l1m/cub3d",
  },
  {
    title: "minishell",
    tech: ["C", "Unix", "Process Management", "Parsing"],
    github: "https://github.com/X3l1m/minishell",
  },
  {
    title: "webserv",
    tech: ["C++", "HTTP", "Sockets", "I/O Multiplexing"],
    github: "https://github.com/X3l1m/webserv",
  },
  {
    title: "so_long",
    tech: ["C", "MiniLibX", "Graphics", "Game Logic"],
    github: "https://github.com/X3l1m/so_long",
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
