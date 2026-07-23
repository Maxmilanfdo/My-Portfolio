import { motion } from "framer-motion";
import { skillGroups } from "@/constants/portfolio";
import { SectionHeader } from "./SectionHeader";

export function Skills() {
  return (
    <section id="skills" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Skills"
          title="A carefully curated toolkit."
          description="I lean on tools that let me move quickly without sacrificing craft. These are the ones I reach for daily."
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
                <ul className="mt-6 space-y-2">
                  {group.items.map((it) => {
                    const Icon = it.icon;
                    return (
                      <motion.li
                        key={it.name}
                        whileHover={{ x: 4 }}
                        className="flex items-center gap-3 rounded-xl bg-white/5 px-3 py-2 text-sm transition-colors hover:bg-white/10"
                      >
                        <Icon size={16} className="text-muted-foreground" />
                        <span>{it.name}</span>
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