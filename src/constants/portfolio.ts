import {
  SiReact, SiTypescript, SiJavascript, SiNodedotjs, SiTailwindcss, SiNextdotjs,
  SiPostgresql, SiMongodb, SiPrisma, SiGraphql, SiFigma, SiFramer,
  SiThreedotjs, SiVite, SiGit, SiDocker, SiPython, SiRedis,
} from "react-icons/si";
import { FiGithub, FiLinkedin, FiInstagram, FiTwitter, FiMail } from "react-icons/fi";

import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";

export const roles = [
  "Full Stack Developer",
  "UI Designer",
  "Problem Solver",
  "Creative Developer",
  "Tech Enthusiast",
];

export const socials = [
  { icon: FiGithub, href: "https://github.com", label: "GitHub" },
  { icon: FiLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: FiInstagram, href: "https://instagram.com", label: "Instagram" },
  { icon: FiTwitter, href: "https://x.com", label: "X" },
  { icon: FiMail, href: "mailto:hello@alexrivera.dev", label: "Email" },
];

export const orbitTech = [
  { icon: SiReact, color: "#61DAFB" },
  { icon: SiNodedotjs, color: "#84CC16" },
  { icon: SiTypescript, color: "#3178C6" },
  { icon: SiTailwindcss, color: "#38BDF8" },
  { icon: SiThreedotjs, color: "#ffffff" },
  { icon: SiFramer, color: "#B591FF" },
  { icon: SiFigma, color: "#F24E1E" },
  { icon: SiGit, color: "#F05032" },
];

export const stats = [
  { value: 6, suffix: "+", label: "Years Experience" },
  { value: 84, suffix: "+", label: "Projects Shipped" },
  { value: 32, suffix: "", label: "Technologies" },
  { value: 47, suffix: "", label: "Happy Clients" },
];

export const skillGroups = [
  {
    title: "Frontend",
    items: [
      { name: "React", icon: SiReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Tailwind", icon: SiTailwindcss },
      { name: "Framer Motion", icon: SiFramer },
      { name: "Vite", icon: SiVite },
    ],
  },
  {
    title: "Backend",
    items: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Python", icon: SiPython },
      { name: "GraphQL", icon: SiGraphql },
      { name: "JavaScript", icon: SiJavascript },
    ],
  },
  {
    title: "Database",
    items: [
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "MongoDB", icon: SiMongodb },
      { name: "Prisma", icon: SiPrisma },
      { name: "Redis", icon: SiRedis },
    ],
  },
  {
    title: "Tools & Design",
    items: [
      { name: "Figma", icon: SiFigma },
      { name: "Git", icon: SiGit },
      { name: "Docker", icon: SiDocker },
      { name: "Three.js", icon: SiThreedotjs },
    ],
  },
];

export type ProjectCategory = "software" | "design" | "video";

export const projects = [
  {
    title: "Nebula Analytics",
    description: "Realtime analytics dashboard for distributed systems with anomaly detection.",
    category: "software" as ProjectCategory,
    image: project1,
    tech: ["React", "TypeScript", "GraphQL", "Postgres"],
    demo: "#",
    repo: "#",
  },
  {
    title: "Aria Commerce",
    description: "Headless commerce platform with a bespoke storefront and payment orchestration.",
    category: "software" as ProjectCategory,
    image: project2,
    tech: ["Next.js", "Stripe", "Prisma", "Tailwind"],
    demo: "#",
    repo: "#",
  },
  {
    title: "Pem9alh Brand System",
    description: "Complete visual identity — logo, motion, and guidelines for a fintech startup.",
    category: "design" as ProjectCategory,
    image: project3,
    tech: ["Figma", "Illustrator", "After Effects"],
    demo: "#",
    repo: "#",
  },
  {
    title: "Cinematic Reel 2025",
    description: "Short-form product film blending 3D renders and live footage.",
    category: "video" as ProjectCategory,
    image: project4,
    tech: ["Premiere", "DaVinci", "Blender"],
    demo: "#",
    repo: "#",
  },
  {
    title: "Orbit Design Kit",
    description: "Design system with 240+ components adopted across four product teams.",
    category: "design" as ProjectCategory,
    image: project3,
    tech: ["Figma", "Tokens", "Storybook"],
    demo: "#",
    repo: "#",
  },
  {
    title: "Warp CLI",
    description: "Developer tool for scaffolding and deploying edge functions in seconds.",
    category: "software" as ProjectCategory,
    image: project1,
    tech: ["Node", "TypeScript", "Cloudflare"],
    demo: "#",
    repo: "#",
  },
];

export const timeline = [
  {
    kind: "Experience",
    year: "2023 — Now",
    title: "Senior Product Engineer",
    org: "Lattice Studio",
    body: "Leading the design system and interaction layer for enterprise SaaS products used by 20k+ teams.",
  },
  {
    kind: "Experience",
    year: "2021 — 2023",
    title: "Full Stack Developer",
    org: "Northwind Labs",
    body: "Shipped realtime collaboration features, from CRDT foundations to polished UI micro-interactions.",
  },
  {
    kind: "Education",
    year: "2018 — 2021",
    title: "B.Sc. Computer Science",
    org: "University of Copenhagen",
    body: "Focused on distributed systems, human-computer interaction, and computational design.",
  },
  {
    kind: "Certification",
    year: "2022",
    title: "Advanced Motion for the Web",
    org: "Awwwards Academy",
    body: "Deep dive into GSAP, WebGL, and choreographed scroll experiences.",
  },
];