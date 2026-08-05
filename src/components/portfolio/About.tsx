import { motion, useInView } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { stats } from "@/constants/portfolio";
import { SectionHeader } from "./SectionHeader";
import about1 from "@/assets/about/about1.webp";
import about2 from "@/assets/about/about2.webp";
import about3 from "@/assets/about/about3.webp";
import about4 from "@/assets/about/about4.webp";
import about5 from "@/assets/about/about5.webp";
import about6 from "@/assets/about/about6.webp";
import about7 from "@/assets/about/about7.webp";
import about8 from "@/assets/about/about8.webp";
import about9 from "@/assets/about/about9.webp";
import about10 from "@/assets/about/about10.webp";
import about11 from "@/assets/about/about11.webp";
import about12 from "@/assets/about/about12.webp";


function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1400;
    const step = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * value));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

function Slideshow({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="group relative aspect-video overflow-hidden rounded-2xl border border-white/10">
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      {images.length > 1 && (
        <div className="absolute bottom-3 right-3 flex gap-1">
          {images.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 w-1.5 rounded-full transition-colors ${
                idx === currentIndex ? "bg-brand" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function About() {
  const subsections = [
    {
      title: "Publication",
      description: (
        <div className="space-y-3">
          <p>Presented my project <b>S.H.I.L.P.A. (Smart Helper Intelligent Learning Personal Assistant)</b> at the <b>International Conference on Recent Trends in Computing and Communication Engineering (ICRTCCE-2024)</b>, held at <b>SIMATS School of Engineering, Chennai, Tamil Nadu</b>, and published the research in <b>TIJER (Technix International Journal of Engineering Research).</b></p>
        </div>
      ),
      images: [about1, about2, about3],
      linkText: "View Publication",
      linkHref: "https://www.tijer.org/tijer/viewpaperforall.php?paper=TIJER2404248",
    },
    {
      title: "Honors & Awards",
      description: (
        <div className="space-y-3">
          <p>Secured <b>1st Prize</b> in both the <b>Poster Design</b> and <b>Code Debugging</b> competitions at <b>ASOCS TECHEVE' 2K22</b>, a technical event organized by the <b>Department of CSE and AI & DS, Paavai College of Engineering, Namakkal.</b></p>
          <p>These achievements demonstrate creativity, technical problem-solving, and strong analytical skills in competitive environments.</p>
        </div>
      ),
      images: [about4, about5],
    },
    {
      title: "Academic Activities",
      description:
       <div className="space-y-3">
          <p>Actively participated in academic initiatives, including presenting my <b>Image Steganography</b> project at a <b>Project Expo</b>. Served as the <b>Code Debugging Event Coordinator</b> for the inter-collegiate technical symposium <b>TECHFEST</b> for <b>three consecutive years</b>, organizing and managing coding competitions.</p>
          <p>Additionally, completed a <b>final-year training program</b>, strengthening practical knowledge and industry-relevant technical skills.</p>
        </div>,
      images: [about6, about7, about8],
    },
    {
      title: "Extra Curricular Activities & Volunteering",
      description:
        <div className="space-y-3">
          <p>Served as a <b>Band Team member</b> for <b>three years</b>, performing at key college events including <b>Independence Day, Republic Day, and Annual Day</b>. Won the <b>Checklist (Treasure Hunt)</b> competition at the annual cultural fest <b>ASTRA</b>, later coordinating the <b>Logo Redesign</b> event in the final year.</p>
          <p>Additionally, volunteered as an <b>NSS member</b>, contributing to community service and campus initiatives.</p>
        </div>,
      images: [about9, about10, about11, about12],
    },
  ];

  return (
    <section id="about" className="relative py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="About Me"
          title="Driven by Curiosity, Powered by Technology."
          description="Discover the passion, creativity, and technology that drive every project I build."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-strong relative overflow-hidden rounded-3xl p-8 lg:p-10"
          >
            <div className="absolute -top-24 -right-16 h-72 w-72 rounded-full bg-brand/25 blur-3xl" />
            <p className="relative text-lg leading-relaxed text-muted-foreground">
              <span className="text-foreground">Technology isn't just my profession—it's my passion.</span> I transform ideas into modern digital experiences. By blending technical expertise with creativity, I create solutions that are functional, intuitive, and visually engaging.
            </p>

            <div className="relative mt-8 grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="rounded-2xl bg-white/5 p-5">
                  <div className="font-display text-3xl font-semibold text-gradient">
                    <Counter value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="space-y-4"
          >
            {[
              { year: "2025-2026", title: "Digital Marketing Specialist", org: "RS Caterers" },
              { year: "2023", title: "Data Analyst Intern", org: "Saint Louis University (Powered by Excelerate)" },
              { year: "2020-2024", title: "Graphic Designer", org: "My College" },
            ].map((e, idx) => (
              <motion.div
                key={idx}
                whileHover={{ x: 6 }}
                className="glass flex items-center justify-between rounded-2xl p-5"
              >
                <div>
                  <div className="text-xs uppercase tracking-widest text-brand-secondary">
                    {e.year}
                  </div>
                  <div className="mt-1 font-display text-lg font-medium">{e.title}</div>
                  <div className="text-sm text-muted-foreground">{e.org}</div>
                </div>
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-brand to-brand-accent opacity-70" />
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="mt-16 space-y-6">
          {subsections.map((item, index) => {
            const imageBox = (
              <div className={`order-1 ${index % 2 === 0 ? "lg:order-1" : "lg:order-2"}`}>
                <Slideshow images={item.images ?? []} />
              </div>
            );

            const textBox = (
              <div className={`order-2 ${index % 2 === 0 ? "lg:order-2" : "lg:order-1"}`}>
                <div className="font-display text-2xl font-semibold text-foreground">
                  {item.title}
                </div>
                <div className="mt-3 text-base leading-7 text-muted-foreground">
                  {item.description}
                </div>
                {"linkText" in item && "linkHref" in item && item.linkText && item.linkHref && (
                  <a
                    href={item.linkHref}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-4 py-2 text-sm font-medium text-brand transition-colors hover:bg-brand/20"
                  >
                    <span>{item.linkText}</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            );

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.05 }}
                className="glass-strong rounded-3xl p-6 lg:p-8"
              >
                <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                  {imageBox}
                  {textBox}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}