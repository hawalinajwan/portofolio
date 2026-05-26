export interface Project {
  title: string;
  year: number;
  description: string;
  url: string;
}

export const projects: Project[] = [
  {
    title: "Intern Link",
    year: 2026,
    description: "A modern internship recruitment platform built with Next.js, PHP, Node.js, MySQL, MongoDB, and Socket.IO",
    url: "https://github.com/hawalinajwan/intern-link",
  },
  {
    title: "Expressive Camera",
    year: 2025,
    description: "This web app detects facial expressions in real time, captures each one, and creates a downloadable collage",
    url: "https://github.com/hawalinajwan/Expressive-Camera",
  },
];
