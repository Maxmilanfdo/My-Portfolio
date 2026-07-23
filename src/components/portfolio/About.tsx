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
    <section id="about" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="About"
          title="Six years of shipping software that people actually want to use."
          description="I blend engineering rigor with a designer's eye — obsessing over the small moments that make a product feel considered."
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
              I'm a product engineer based between Copenhagen and remote. I've
              spent the last six years shipping web products — from tiny brand
              sites to enterprise platforms with millions of monthly sessions.
            </p>
            <p className="relative mt-4 text-lg leading-relaxed text-muted-foreground">
              My work sits at the intersection of typography, motion, and
              systems thinking. I care about performance, accessibility, and
              the details that separate <span className="text-foreground">fine</span> from <span className="text-foreground">unforgettable</span>.
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
              { year: "2023", title: "Senior Product Engineer", org: "Lattice Studio" },
              { year: "2021", title: "Full Stack Developer", org: "Northwind Labs" },
              { year: "2019", title: "Freelance Interface Designer", org: "Independent" },
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