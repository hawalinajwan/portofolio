export interface Project {
  title: string;
  year: number;
  category: string;
  description: string;
  url: string;
  technologies: string[];
  preview: "intern-link" | "expressive-camera";
  image?: string;
}

export const projects: Project[] = [
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
];
