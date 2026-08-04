import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Download } from "lucide-react";
import profileImg from "@/assets/profile.webp";
import { roles, socials, skillGroups } from "@/constants/portfolio";
import { MagneticButton } from "./MagneticButton";

function Typewriter() {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const full = roles[i % roles.length];
    const t = setTimeout(
      () => {
        if (!del) {
          const next = full.slice(0, text.length + 1);
          setText(next);
          if (next === full) setTimeout(() => setDel(true), 1400);
        } else {
          const next = full.slice(0, text.length - 1);
          setText(next);
          if (next === "") {
            setDel(false);
            setI((v) => v + 1);
          }
        }
      },
      del ? 40 : 70,
    );
    return () => clearTimeout(t);
  }, [text, del, i]);

  return (
    <span className="text-gradient">
      {text}
      <span className="ml-1 inline-block h-[1em] w-[2px] translate-y-[3px] bg-brand animate-pulse" />
    </span>
  );
}

function ProfileCard() {
  const cardRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1200px) rotateY(${px * 12}deg) rotateX(${-py * 12}deg)`;
  };
  const reset = () => {
    if (cardRef.current) cardRef.current.style.transform = "perspective(1200px) rotateY(0) rotateX(0)";
  };

  return (
    <div className="relative mx-auto aspect-square w-[min(90vw,520px)]">
      {/* Orbit rings */}
      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full animate-[spin_40s_linear_infinite]">
        <circle cx="200" cy="200" r="190" fill="none" stroke="url(#g1)" strokeWidth="1" opacity="0.4" />
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0%" stopColor="#00D4FF" />
            <stop offset="100%" stopColor="#9F7AEA" />
          </linearGradient>
        </defs>
      </svg>
      <svg viewBox="0 0 400 400" className="absolute inset-6 h-[calc(100%-3rem)] w-[calc(100%-3rem)] animate-[spin_28s_linear_infinite_reverse]">
        <circle cx="200" cy="200" r="180" fill="none" stroke="#6C63FF" strokeWidth="1" strokeDasharray="6 10" opacity="0.5" />
      </svg>
      <div className="absolute inset-12 rounded-full bg-brand/20 blur-3xl" />

      {/* Floating tech badges orbiting (use icons from Skills section) */}
      {(() => {
        const flat = skillGroups.flatMap((g) => g.items);
        return flat.map((t, idx) => {
          const angle = (idx / flat.length) * Math.PI * 2;
          const radius = 46;
          const left = 50 + Math.cos(angle) * radius;
          const top = 50 + Math.sin(angle) * radius;
          const Icon = t.icon as any;
          return (
            <motion.div
              key={`${t.name}-${idx}`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
              transition={{
                opacity: { delay: 0.3 + idx * 0.03 },
                scale: { delay: 0.3 + idx * 0.03 },
                y: { duration: 3 + idx * 0.12, repeat: Infinity, ease: "easeInOut" },
              }}
              style={{ left: `${left}%`, top: `${top}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
            >
              <div className="glass-strong grid h-11 w-11 place-items-center rounded-2xl shadow-lg">
                <Icon size={18} className="text-muted-foreground" />
              </div>
            </motion.div>
          );
        });
      })()}

      {/* Profile card */}
      <div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseLeave={reset}
        className="absolute left-1/2 top-1/2 h-[62%] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-[36%] transition-transform duration-300 ease-out will-change-transform"
      >
        <div className="glass-strong h-full w-full overflow-hidden rounded-[36%] p-2 shadow-[0_30px_80px_-30px_rgba(108,99,255,0.6)]">
          <img
            src={profileImg}
            alt="maxmilan portrait"
            width={768}
            height={768}
            className="h-full w-full rounded-[32%] object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center pt-28 pb-16">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs text-muted-foreground"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/70" />
              <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for full time opportunities and freelance work
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mt-6 font-mono text-sm text-muted-foreground"
          >
            Hello, I'm
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="mt-2 font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
          >
            Maxmilan Fernando
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="mt-4 font-display text-2xl font-medium sm:text-3xl"
          >
            I'm a <Typewriter />
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground"
          >
            I'm a passionate developer and creative professional,
            transforming ideas into functional
            visually appealing, and result-driven digital solutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <MagneticButton as="a" href="#projects">
              View projects <ArrowUpRight size={16} />
            </MagneticButton>
            <MagneticButton as="a" href="#resume" variant="ghost">
              <Download size={16} /> Resume
            </MagneticButton>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-10 flex items-center gap-3"
          >
            {socials.map((s) => {
              const Icon = s.icon;
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    target="_blank"
                    rel="noreferrer"
                    className="group grid h-11 w-11 place-items-center rounded-full glass transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:shadow-[0_10px_30px_-6px_rgba(108,99,255,0.6)]"
                  >
                    <Icon size={16} className="text-muted-foreground transition-colors group-hover:text-foreground" />
                  </a>
                </li>
              );
            })}
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <ProfileCard />
        </motion.div>
      </div>
    </section>
  );
}