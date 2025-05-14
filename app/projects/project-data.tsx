export interface Project {
  title: string;
  year: number;
  description: string;
  url: string;
}

export const projects: Project[] = [
  {
    title: "Expressive Camera",
    year: 2025,
    description: "This web app detects facial expressions in real time, captures each one, and creates a downloadable collage",
    url: "https://github.com/hawalinajwan/Expressive-Camera",
  },
];
