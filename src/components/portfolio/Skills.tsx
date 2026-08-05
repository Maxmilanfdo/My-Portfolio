import { motion } from "framer-motion";
import { skillGroups } from "@/constants/portfolio";
import { SectionHeader } from "./SectionHeader";

export function Skills() {
  return (
    <section id="skills" className="relative py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Skills"
          title="My Skill Set"
          description="The technologies, frameworks, and creative tools I use to build, design, and bring ideas to life."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: gi * 0.1 }}
              className="glass-strong group relative overflow-hidden rounded-3xl p-6"
            >
              <div className="absolute inset-x-0 -top-24 h-40 bg-gradient-to-b from-brand/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative">
                <div className="text-xs uppercase tracking-[0.25em] text-brand-secondary">
                  0{gi + 1}
                </div>
                <h3 className="mt-2 font-display text-xl font-semibold">{group.title}</h3>
                <ul className="mt-6 space-y-3">
                  {group.items.map((it) => {
                    const Icon = it.icon;
                    return (
                      <motion.li
                        key={it.name}
                        whileHover={{ x: 4 }}
                        className="relative overflow-hidden rounded-xl bg-white/5 px-3 py-2 text-sm transition-colors hover:bg-white/10"
                      >
                        <motion.div
                          className="absolute inset-0 origin-left rounded-xl bg-gradient-to-r from-brand/35 to-brand-secondary/50"
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: it.progress / 100 }}
                          viewport={{ once: true, amount: 0.6 }}
                          transition={{ duration: 0.9, ease: "easeOut" }}
                          style={{ transformOrigin: "left center" }}
                        />
                        <div className="relative z-10 flex items-center gap-3">
                          <Icon size={16} className="text-muted-foreground" />
                          <span>{it.name}</span>
                        </div>
                      </motion.li>
                    );
                  })}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}