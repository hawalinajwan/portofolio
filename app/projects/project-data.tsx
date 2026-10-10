export interface Project {
  title: string;
  year: number;
  category: string;
  description: string;
  url: string;
  technologies: string[];
  preview?: "intern-link" | "expressive-camera" | "notify" | "aline";
  image?: string;
  status?: "in-progress";
}

export const projects: Project[] = [
  {
    title: "ALINE",
    year: 2026,
    category: "AI verification platform",
    description:
      "AI-powered material verification platform for pharmaceutical incoming goods inspection.",
    url: "https://github.com/hawalinajwan/ALINE",
    technologies: ["Vue", "JavaScript", "Azure AI", "OCR", "Validation"],
    preview: "aline",
    status: "in-progress",
  },
  {
    title: "Gamespace",
    year: 2026,
    category: "Godot game series",
    description:
      "Eight Godot games built as weekly assignments for the UKM game development division: Timed Switch, Shooter, Sniper, Quest Log, Sliding Puzzle, Glass Floor, Particle Dust, and Berbelok dengan Efek Drift.",
    url: "https://github.com/hawalinajwan/Gamespace-godot",
    technologies: ["Godot", "GDScript", "Jolt Physics"],
    image: "/projects/gamespace.svg",
  },
  {
    title: "App Perpustakaan",
    year: 2026,
    category: "Library management system",
    description:
      "Laravel 12 application for managing a campus digital library: book records, members, and lending transactions.",
    url: "https://github.com/hawalinajwan/app-perpustakaan",
    technologies: ["Laravel 12", "PHP", "Blade", "MySQL", "Vite"],
    image: "/projects/app-perpustakaan.svg",
  },
  {
    title: "Intern Link",
    year: 2026,
    category: "Full-stack platform",
    description: "A modern internship recruitment platform",
    url: "https://github.com/hawalinajwan/intern-link",
    technologies: ["Next.js", "PHP", "Node.js", "MySQL", "MongoDB", "Socket.IO"],
    preview: "intern-link",
    image: "/projects/intern-link.svg",
  },
  {
    title: "Expressive Camera",
    year: 2025,
    category: "Computer vision app",
    description: "This web app detects facial expressions in real time, captures each one, and creates a downloadable collage",
    url: "https://github.com/hawalinajwan/Expressive-Camera",
    technologies: ["React", "JavaScript", "Face API", "Canvas"],
    preview: "expressive-camera",
    image: "/projects/expressive-camera.svg",
  },
  {
    title: "Notify",
    year: 2026,
    category: "Automation tool",
    description:
      "Automation tool that monitors ETHOL PENS notifications and sends filtered updates to Discord, with calendar export support.",
    url: "https://github.com/hawalinajwan/notify",
    technologies: [
      "Python",
      "Discord Webhook",
      "GitHub Gist",
      "iCalendar",
      "Automation",
    ],
    preview: "notify",
  },
];
