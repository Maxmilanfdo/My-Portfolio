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


import { FiGithub, FiLinkedin, FiInstagram, FiTwitter, FiMail, FiFacebook } from "react-icons/fi";

import project1 from "@/assets/project-1.webp";
import project2 from "@/assets/project-2.webp";
import project3 from "@/assets/project-3.webp";
import project4 from "@/assets/project-4.webp";
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
  { icon: FiFacebook, href: "https://www.facebook.com/maxmilan.fernando.11", label: "Facebook" },
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
  { value: 80, suffix: "+", label: "Videos Edited" },
  { value: 150, suffix: "+", label: "Designs Delivered" },
  { value: 20, suffix: "+", label: "Technologies" },
  
];

export const skillGroups = [
  {
    title: "Frontend",
    items: [
      { name: "HTML", icon: SiHtml5, progress: 93 },
      { name: "CSS", icon: SiCss, progress: 91 },
      { name: "JavaScript", icon: SiJavascript, progress: 89 },
      { name: "Tailwind", icon: SiTailwindcss, progress: 58},
      { name: "React", icon: SiReact, progress: 55 },
    ],
  },
  {
    title: "Backend",
    items: [ 
      { name: "Python", icon: SiPython, progress: 80 },
      { name: "C/C++", icon: SiCplusplus, progress: 75 },
      { name: "Node.js", icon: SiNodedotjs, progress: 48 },
    ],
  },
  {
    title: "Database",
    items: [
      { name: "MySQL", icon: SiMysql, progress: 65 },
      { name: "MongoDB", icon: SiMongodb, progress: 50 },
    ],
  },
  {
    title: "Tools & Design",
    items: [
      { name: "Photoshop", icon: DiPhotoshop, progress: 95 },
      { name: "Illustrator", icon: DiIllustrator, progress: 90 },
      { name: "After Effects", icon: AfterEffectsIcon, progress: 80 },
      { name: "Premiere Pro", icon: PremiereProIcon, progress: 88 },
      { name: "Filmora", icon: SiWondersharefilmora, progress: 88 },
    ],
  },
];

export type ProjectCategory = "software" | "design" | "video";

export const projects = [
  {
    title: "A Complete Integrated CRM Product {Currently In Development}",
    description: "A comprehensive CRM solution that streamlines customer relationship management, sales tracking, and marketing automation for businesses.",
    category: "software" as ProjectCategory,
    image: project1,
    tech: ["In Development"],
  },

  {
    title: "S.H.I.L.P.A (Smart Helper Intelligent Learning Personal Assistant)",
    description: "An AI-powered personal assistant that helps users manage tasks, schedule events, and answer questions using natural language processing.",
    category: "software" as ProjectCategory,
    image: project2,
    tech: ["Flask", "Python", "AI/ML", "NLP", "API"],
    repo: "https://github.com/Maxmilanfdo/My-Projects/tree/main/SHILPA%20-%20AI%20Assistant",
  },
  {
    title: "Air Canvas",
    description: "Built a real-time hand gesture drawing application using computer vision and machine learning techniques.",
    category: "software" as ProjectCategory,
    image: project3,
    tech: ["OpenCV", "AI/ML", "MediaPipe", "Computer Vision"],
    repo: "https://github.com/Maxmilanfdo/My-Projects/tree/main/Air%20Canvas",
  },
  {
    title: "Image Steganography",
    description: "Implemented a secure image steganography system that hides sensitive data within images using advanced encoding techniques.",
    category: "software" as ProjectCategory,
    image: project4,
    tech: ["Python", "Cryptography", "Image Processing", "Steganography", "Data Security"],
    repo: "https://github.com/Maxmilanfdo/My-Projects/tree/main/Image%20Steganography",
  },
];

export type GalleryItem = {
  image: string;
  title: string; // internal identifier (filename) — not shown in UI
  caption: string; // kept for compatibility but will be empty
};

// Auto-import all images from the assets/designs folder so authors can
// drop files there without updating code. Keep title/caption empty so
// the UI shows only images.
const designModules = import.meta.glob('@/assets/designs/*.{jpg,jpeg,png,webp}', { eager: true }) as Record<string, any>;

export const designGallery: GalleryItem[] = Object.entries(designModules)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
  .map(([path, mod]) => {
    const parts = path.split('/');
    const filename = parts[parts.length - 1];
    const src = (mod && (mod.default ?? mod)) as string;
    return { image: src, title: filename, caption: '' };
  });

export type VideoShowcaseItem = {
  href: string;
  platform: "youtube" | "instagram";
};

export function getVideoThumbnail(href: string, platform: VideoShowcaseItem["platform"]) {
  if (platform === "youtube") {
    const youtubeId = href.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([^&/?]+)/)?.[1];
    return youtubeId ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg` : "";
  }

  const instagramSlug = href.match(/instagram\.com\/(?:p|reel|tv)\/([^/?]+)/)?.[1];
  return instagramSlug ? `https://www.instagram.com/p/${instagramSlug}/media/?size=l` : "";
}

export const videoShowcase: VideoShowcaseItem[] = [
  
  // RS Caterers Videos
  
  {
    href: "https://www.instagram.com/reel/DbDhUjsgaIZ/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    platform: "instagram", //33
  },
  {
    href: "https://www.instagram.com/reel/Da8kLG5lTEB/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA==",
    platform: "instagram", //32
  },
  {
    href: "https://www.instagram.com/reel/Da2pRwZFIg3/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA==",
    platform: "instagram", //31
  },
  {
    href: "https://www.instagram.com/reel/DaXiBmggHmM/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA==",
    platform: "instagram", //30
  },
  {
    href: "https://www.instagram.com/reel/DaITJeSirKL/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA==",
    platform: "instagram", //29
  },
  {
    href: "https://www.instagram.com/reel/DaAoFiQj5F3/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA==",
    platform: "instagram", //28
  },
  {
    href: "https://www.instagram.com/reel/DZ42TODlFfS/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA==",
    platform: "instagram", //27
  },
  {
    href: "https://www.instagram.com/reel/DZrOLOnD-84/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA==",
    platform: "instagram", //26
  },
  {
    href: "https://www.instagram.com/reel/DY3sltdvqRe/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    platform: "instagram", //25
  },
  
  {
    href: "https://youtu.be/rhXW4eMVm6g?si=b79dQRScvCScWYGG",
    platform: "youtube",
  },

  {
    href: "https://www.instagram.com/reel/DYtUMu4DO54/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA==",
    platform: "instagram", //24
  },
  {
    href: "https://www.instagram.com/reel/DYJRGViAiFM/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA==",
    platform: "instagram", //23
  },
  {
    href: "https://www.instagram.com/reel/DXwYKqTDdju/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA==",
    platform: "instagram", //22
  },
  {
    href: "https://www.instagram.com/reel/DW1Udf7D17E/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA==",
    platform: "instagram", //21
  },
  {
    href: "https://www.instagram.com/reel/DWl9Gm_E41M/",
    platform: "instagram", //20
  },
  {
    href: "https://www.instagram.com/reel/DWbkcSEAR-D/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA==",
    platform: "instagram", //19
  },
  {
    href: "https://www.instagram.com/reel/DWWakgCjevk/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA==",
    platform: "instagram", //18
  },

  {
    href: "https://youtube.com/shorts/gQZI_zkNuLQ?si=UcMC9DYsxLGRI7kU",
    platform: "youtube",
  },

  {
    href: "https://www.instagram.com/reel/DV0jrswj4Zm/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA==",
    platform: "instagram", //17
  },

  {
    href: "https://youtu.be/tYAE5cdQtDM?si=RriZpqHh8JbE7Jer",
    platform: "youtube",
  },

  {
    href: "https://www.instagram.com/reel/DVtN86lDKqW/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA==",
    platform: "instagram", //16
  },
  {
    href: "https://www.instagram.com/reel/DVjBl12Ds10/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA==",
    platform: "instagram", //15
  },
  {
    href: "https://www.instagram.com/reel/DVLvmOujdDC/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA==",
    platform: "instagram", //14
  },

  {
    href: "https://youtu.be/Lqgp35wga4k?si=C6xSBEOKDMnlcV7c",
    platform: "youtube",
  },

  {
    href: "https://www.instagram.com/reel/DU8KKh4jeGk/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA==",
    platform: "instagram", //13
  },
  {
    href: "https://www.instagram.com/reel/DUlHnUDjdHt/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA==",
    platform: "instagram", //12
  },
  {
    href: "https://www.instagram.com/reel/DUDiW4DDKDU/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA==",
    platform: "instagram", //11
  },
  {
    href: "https://www.instagram.com/reel/DT6vnw9FhRo/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA==",
    platform: "instagram", //10
  },
  {
    href: "https://www.instagram.com/reel/DTQJWCvlvho/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA==",
    platform: "instagram", //9
  },
  {
    href: "https://www.instagram.com/reel/DTK_vdKjQ2P/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA==",
    platform: "instagram", //8
  },

  {
    href: "https://youtu.be/Qx494RpS1fo?si=KMCff_wVZwdinAbJ",
    platform: "youtube",
  },
  
  {
    href: "https://www.instagram.com/reel/DShzBxEAca_/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA==",
    platform: "instagram", //7
  },
  {
    href: "https://www.instagram.com/reel/DSKn69fDbzg/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA==",
    platform: "instagram", //6
  },
  {
    href: "https://www.instagram.com/reel/DSFeUycDSvJ/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA==",
    platform: "instagram", //5
  },
  {
    href: "https://youtu.be/P-y4DFuYLdM?si=_rOXEfRmc_Z6dOJ0",
    platform: "youtube",
  },

  {
    href: "https://www.instagram.com/reel/DRSFUj4jTVz/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA==",
    platform: "instagram", //4
  },
  {
    href: "https://www.instagram.com/reel/DQ9fFGSk-US/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA==",
    platform: "instagram", //3
  },
  {
    href: "https://www.instagram.com/reel/DQOhc-6E88A/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA==",
    platform: "instagram", //2
  },
  {
    href: "https://www.instagram.com/reel/DQBdhcgiJz0/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA==",
    platform: "instagram", //1
  },

// Personal Projects Videos
  {
    href: "https://youtu.be/sGQAbpP4TTU?si=bIbA9qgt9Cam9iv0",
    platform: "youtube",
  },
  {
    href: "https://youtu.be/H0r-3wuJsmo?si=kRByytIJgMpq5H-o",
    platform: "youtube",
  },
  {
    href: "https://youtu.be/yc2exvUJYkg?si=64Mc6KDoCKB3T3QG",
    platform: "youtube",
  }, 
  {
    href: "https://youtu.be/zrfo6nLLucc?si=_sEFdcUehBFPeJVO",
    platform: "youtube",
  },
  {
    href: "https://youtu.be/Howc-ZqRRSU?si=gnCrIBSuR1Q4CmuB",
    platform: "youtube",
  },
  {
    href: "https://youtu.be/Wb_HRseCIh0?si=nykZ1ZVXlXkwqga-",
    platform: "youtube",
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