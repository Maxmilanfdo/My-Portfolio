import {
  SiReact, SiTypescript, SiJavascript, SiNodedotjs, SiTailwindcss, SiNextdotjs,
  SiMongodb, SiFigma, SiFramer,
  SiThreedotjs, SiVite, SiGit, SiDocker, SiPython, SiRedis,
  SiHtml5,
  SiCss,
  SiMysql,
  SiCplusplus,
} from "react-icons/si";

import { DiPhotoshop, DiIllustrator } from 'react-icons/di';

import { 
  SiWondersharefilmora 
} from 'react-icons/si';


import { FiGithub, FiLinkedin, FiInstagram, FiTwitter, FiMail } from "react-icons/fi";

import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import { AfterEffectsIcon } from "@/constants/AfterEffectsIcon";
import { PremiereProIcon } from "@/constants/PremiereProIcon";

export const roles = [
  "Frontend Developer",
  "Web Developer",
  "Digital Marketing Specialist",
  "Graphic Designer",
  "Video Editor",
  "Problem Solver",
  "Tech Enthusiast",
];

export const socials = [
  { icon: FiGithub, href: "https://github.com/MaxmilanFdo", label: "GitHub" },
  { icon: FiLinkedin, href: "https://linkedin.com/in/maxmilanfdo", label: "LinkedIn" },
  { icon: FiInstagram, href: "https://instagram.com/maxmilan.exe", label: "Instagram" },
  { icon: FiTwitter, href: "https://x.com/MaxmilanFdo", label: "X" },
  { icon: FiMail, href: "mailto:maxmilanfdo2003@gmail.com", label: "Email" },
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
  { value: 50, suffix: "+", label: "Videos Edited" },
  { value: 100, suffix: "+", label: "Designs Delivered" },
  { value: 20, suffix: "+", label: "Technologies" },
  
];

export const skillGroups = [
  {
    title: "Frontend",
    items: [
      { name: "HTML", icon: SiHtml5 },
      { name: "CSS", icon: SiCss },
      { name: "JavaScript", icon: SiJavascript },
      { name: "Tailwind", icon: SiTailwindcss },
      { name: "React", icon: SiReact },
    ],
  },
  {
    title: "Backend",
    items: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Python", icon: SiPython },
      { name: "C/C++", icon: SiCplusplus },
    ],
  },
  {
    title: "Database",
    items: [
      { name: "MySQL", icon: SiMysql },
      { name: "MongoDB", icon: SiMongodb },
    ],
  },
  {
    title: "Tools & Design",
    items: [
      { name: "Photoshop", icon: DiPhotoshop },
      { name: "Illustrator", icon: DiIllustrator },
      { name: "After Effects", icon: AfterEffectsIcon },
      { name: "Premiere Pro", icon: PremiereProIcon },
      { name: "Filmora", icon: SiWondersharefilmora },
    ],
  },
];

export type ProjectCategory = "software" | "design" | "video";

export const projects = [
  {
    title: "A Complete Integrated CRM Product {Currently In Development}",
    description: "A comprehensive CRM solution that streamlines customer relationship management, sales tracking, and marketing automation for businesses.",
    category: "software" as ProjectCategory,
    image: project4,
    tech: ["In Development"],
    demo: "#",
    repo: "#",
  },

  {
    title: "S.H.I.L.P.A (Smart Helper Intelligent Learning Personal Assistant)",
    description: "An AI-powered personal assistant that helps users manage tasks, schedule events, and answer questions using natural language processing.",
    category: "software" as ProjectCategory,
    image: project1,
    tech: ["Flask", "Python", "AI/ML", "NLP", "API"],
    demo: "#",
    repo: "#",
  },
  {
    title: "Air Canvas",
    description: "Built a real-time hand gesture drawing application using computer vision and machine learning techniques.",
    category: "software" as ProjectCategory,
    image: project2,
    tech: ["OpenCV", "AI/ML", "MediaPipe", "Computer Vision"],
    demo: "#",
    repo: "#",
  },
  {
    title: "Image Steganography",
    description: "Implemented a secure image steganography system that hides sensitive data within images using advanced encoding techniques.",
    category: "software" as ProjectCategory,
    image: project3,
    tech: ["Python", "Cryptography", "Image Processing", "Steganography", "Data Security"],
    demo: "#",
    repo: "#",
  },
];

export type GalleryItem = {
  image: string;
  title: string;
  caption: string;
};

export const designGallery: GalleryItem[] = [
  {
    image: project3,
    title: "Fintech Brand Campaign",
    caption: "Visual identity and promotional imagery for a brand launch.",
  },
  {
    image: project4,
    title: "Motion Marketing Visual",
    caption: "A polished hero shot for motion and social campaigns.",
  },
  {
    image: project1,
    title: "Product UI Exploration",
    caption: "High-fidelity screen designs for a modern SaaS dashboard.",
  },
  {
    image: project2,
    title: "Concept Photography Layout",
    caption: "Photo-led layout system for digital and print collateral.",
  },
];

export type VideoShowcaseItem = {
  title: string;
  href: string;
  platform: "youtube" | "instagram";
  description: string;
  thumbnail: string;
};

export const videoShowcase: VideoShowcaseItem[] = [
  {
    title: "Motion Reel 2025",
    href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    platform: "youtube",
    description: "A selection of recent motion edits and product video work.",
    thumbnail: project2,
  },
  {
    title: "Brand Edit for Instagram",
    href: "https://www.instagram.com/p/CxExample/",
    platform: "instagram",
    description: "A short-form Instagram edit showcasing storytelling and pacing.",
    thumbnail: project4,
  },
  {
    title: "Promo Cut",
    href: "https://www.youtube.com/watch?v=oHg5SJYRHA0",
    platform: "youtube",
    description: "A polished promotional cut for social distribution.",
    thumbnail: project1,
  },
];

export const timeline = [
  {
    kind: "Experience",
    year: "2025 — 2026",
    title: "Digital Marketing Specialist",
    org: "RS Caterers",
    body: "Developed and executed digital marketing strategies, including social media campaigns, SEO optimization, and content creation, resulting in increased brand visibility and customer engagement.",
  },
  {
    kind: "Experience",
    year: "2023",
    title: "Data Analyst Intern",
    org: "Saint Louis University (Powered by Excelerate)",
    body: "Assisted in data collection, cleaning, and analysis for various research projects, utilizing statistical tools and visualization techniques to provide actionable insights for decision-making.",
  },
  {
    kind: "Education",
    year: "2020 — 2024",
    title: "B.E Computer Science and Engineering",
    org: "Anna University, Chennai",
    body: "Completed a comprehensive undergraduate program in computer science, gaining expertise in programming, algorithms, data structures, and software development methodologies.",
  },
  {
    kind: "Certification",
    year: "2023",
    title: "3D Printing and Design",
    org: "Government of India",
    body: "Completed a certification program focused on 3D printing technologies, design principles, and practical applications in various industries.",
  },
  {
    kind: "Certification",
    year: "2022",
    title: "Angular, Node.js, and MongoDB",
    org: "Infosys",
    body: "Completed a certification program covering the fundamentals of Angular, Node.js, and MongoDB, gaining practical skills in full-stack web development and database management.",
  },
  {
    kind: "Certification",
    year: "2022",
    title: "Python and OpenCV Bootcamp",
    org: "Google",
    body: "Completed a certification program covering the fundamentals of Python, OpenCV, and computer vision, gaining practical skills in image processing and machine learning.",
  },
];