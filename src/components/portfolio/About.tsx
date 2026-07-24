import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { stats } from "@/constants/portfolio";
import { SectionHeader } from "./SectionHeader";

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

export function About() {
  return (
    <section id="about" className="relative py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="About"
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
              <span className="text-foreground">Technology isn't just my profession—it's my passion.</span> I transform ideas into modern digital experiences through web development, creative design, video editing, and digital marketing. By blending technical expertise with creativity, I create solutions that are functional, intuitive, and visually engaging.
            </p>
            <p className="relative mt-4 text-lg leading-relaxed text-muted-foreground">
              Every project is an opportunity to solve problems, learn, and innovate. Whether it's building responsive websites, designing compelling visuals, or helping brands grow online, my goal is to create meaningful experiences that deliver real value.
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
      </div>
    </section>
  );
}