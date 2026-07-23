import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { timeline } from "@/constants/portfolio";
import { SectionHeader } from "./SectionHeader";
import { MagneticButton } from "./MagneticButton";

export function Resume() {
  return (
    <section id="resume" className="relative py-20">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeader
          eyebrow="Resume"
          title="A quick timeline."
          description="The places I've worked, the things I've learned, and the papers to prove it."
        />

        <div className="mt-14 flex justify-center">
          <MagneticButton as="a" href="#">
            <Download size={16} /> Download resume (PDF)
          </MagneticButton>
        </div>

        <div className="relative mt-16">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent md:left-1/2" />
          <ul className="space-y-10">
            {timeline.map((t, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className={`relative grid gap-4 md:grid-cols-2 ${idx % 2 === 0 ? "md:pr-10" : "md:pl-10"}`}
              >
                <div className={`hidden md:block ${idx % 2 === 0 ? "" : "md:order-2"}`} />
                <div className={`relative pl-12 md:pl-0 ${idx % 2 === 0 ? "md:text-right md:pr-10" : "md:pl-10"}`}>
                  <span
                    className={`absolute left-2 top-2 grid h-5 w-5 place-items-center rounded-full border border-brand/50 bg-background md:left-auto ${
                      idx % 2 === 0 ? "md:right-[-14px]" : "md:left-[-14px]"
                    }`}
                  >
                    <span className="h-2 w-2 rounded-full bg-gradient-to-br from-brand-secondary to-brand-accent" />
                  </span>
                  <div className="glass-strong rounded-2xl p-5">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-brand-secondary">
                      <span>{t.kind}</span>
                      <span className="text-muted-foreground">· {t.year}</span>
                    </div>
                    <h3 className="mt-2 font-display text-lg font-semibold">{t.title}</h3>
                    <div className="text-sm text-muted-foreground">{t.org}</div>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.body}</p>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}