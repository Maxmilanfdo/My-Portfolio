import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight, Github } from "lucide-react";
import { projects, type ProjectCategory } from "@/constants/portfolio";
import { SectionHeader } from "./SectionHeader";

const tabs: { id: ProjectCategory | "all"; label: string }[] = [
  { id: "all", label: "All Work" },
  { id: "software", label: "Software" },
  { id: "design", label: "Graphic Design" },
  { id: "video", label: "Video" },
];

export function Projects() {
  const [active, setActive] = useState<(typeof tabs)[number]["id"]>("all");
  const items = active === "all" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Selected Work"
          title="Projects I'm proud of."
          description="A slice of recent product, brand, and motion work. Every project is a collaboration — credits available on request."
        />

        <div className="mt-10 flex justify-center">
          <div className="glass-strong inline-flex flex-wrap justify-center gap-1 rounded-full p-1">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={`relative rounded-full px-4 py-2 text-xs font-medium transition-colors ${
                  active === t.id ? "text-white" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {active === t.id && (
                  <motion.span
                    layoutId="projectpill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-brand to-brand-accent"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative">{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="mt-12 grid gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {items.map((p) => (
              <motion.article
                key={p.title}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="glass-strong group relative overflow-hidden rounded-3xl"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                </div>
                <div className="relative p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-xl font-semibold">{p.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {p.description}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <a href={p.demo} className="grid h-9 w-9 place-items-center rounded-full glass transition-transform hover:scale-110">
                        <ArrowUpRight size={15} />
                      </a>
                      <a href={p.repo} className="grid h-9 w-9 place-items-center rounded-full glass transition-transform hover:scale-110">
                        <Github size={14} />
                      </a>
                    </div>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span key={t} className="rounded-full bg-white/5 px-3 py-1 text-[11px] text-muted-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}