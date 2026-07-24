import { AnimatePresence, motion, useAnimationFrame } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Github, Youtube, Instagram } from "lucide-react";
import { projects, designGallery, videoShowcase, type ProjectCategory } from "@/constants/portfolio";
import { SectionHeader } from "./SectionHeader";

const tabs: { id: ProjectCategory; label: string }[] = [
  { id: "software", label: "Software" },
  { id: "design", label: "Graphic Design" },
  { id: "video", label: "Video" },
];

export function Projects() {
  const [active, setActive] = useState<(typeof tabs)[number]["id"]>("software");
  const [paused, setPaused] = useState(false);
  const [speed, setSpeed] = useState(80);
  const x = useRef(0);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const items = active === "software" ? projects : [];
  const duplicatedGallery = [...designGallery, ...designGallery];

  useAnimationFrame((_, delta) => {
    if (paused || !trackRef.current) return;

    x.current -= (speed * delta) / 1000;
    const trackWidth = trackRef.current.scrollWidth / 2;

    if (Math.abs(x.current) >= trackWidth) {
      x.current += trackWidth;
    }

    trackRef.current.style.transform = `translateX(${x.current}px)`;
  });

  const getStep = () => {
    const track = trackRef.current;
    if (!track || track.children.length < 1) return 360;
    const first = track.children[0] as HTMLElement;
    if (track.children.length === 1) return first.getBoundingClientRect().width;
    const second = track.children[1] as HTMLElement;
    const firstRect = first.getBoundingClientRect();
    const secondRect = second.getBoundingClientRect();
    const gap = secondRect.left - (firstRect.left + firstRect.width);
    return firstRect.width + gap;
  };
  const isAnimatingRef = useRef(false);

  const animateSlide = (delta: number, duration = 500) => {
    const track = trackRef.current;
    if (!track || isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    const prevPaused = paused;
    setPaused(true);

    // apply CSS transition
    track.style.transition = `transform ${duration}ms cubic-bezier(.22,.9,.31,1)`;

    x.current += delta;
    const trackWidth = track.scrollWidth / 2;
    if (Math.abs(x.current) >= trackWidth) {
      // wrap
      x.current += x.current < 0 ? trackWidth : -trackWidth;
    }
    track.style.transform = `translateX(${x.current}px)`;

    const cleanup = () => {
      track.style.transition = "";
      isAnimatingRef.current = false;
      setPaused(prevPaused);
    };

    const onEnd = () => {
      cleanup();
      track.removeEventListener("transitionend", onEnd);
    };

    track.addEventListener("transitionend", onEnd, { once: true });

    // fallback in case transitionend doesn't fire
    setTimeout(() => {
      if (isAnimatingRef.current) cleanup();
    }, duration + 50);
  };

  const slideNext = () => {
    const step = -getStep();
    animateSlide(step, 480);
  };

  const slidePrev = () => {
    const step = getStep();
    animateSlide(step, 480);
  };

  return (
    <section id="projects" className="relative py-20">
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

        {active === "software" && (
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
        )}

        {active === "design" && (
          <section
            className="mt-12 relative overflow-hidden rounded-3xl"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <button
              type="button"
              onClick={slidePrev}
              onMouseDown={() => setSpeed(40)}
              onMouseUp={() => setSpeed(80)}
              className="absolute left-5 top-1/2 z-30 -translate-y-1/2 h-11 w-11 rounded-full glass grid place-items-center text-foreground transition hover:bg-white/10"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={slideNext}
              onMouseDown={() => setSpeed(220)}
              onMouseUp={() => setSpeed(80)}
              className="absolute right-5 top-1/2 z-30 -translate-y-1/2 h-11 w-11 rounded-full glass grid place-items-center text-foreground transition hover:bg-white/10"
            >
              <ChevronRight size={18} />
            </button>

            <div className="overflow-hidden px-4 py-6 md:px-6">
              <motion.div
                ref={trackRef}
                className="flex gap-6 will-change-transform"
              >
                {duplicatedGallery.map((item, index) => (
                  <article
                    key={`${item.title}-${index}`}
                    className="glass-strong overflow-hidden rounded-3xl min-w-[320px] md:min-w-[360px]"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[900ms] hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-xl font-semibold">{item.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.caption}</p>
                    </div>
                  </article>
                ))}
              </motion.div>
            </div>
          </section>
        )}

        {active === "video" && (
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {videoShowcase.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="glass-strong group overflow-hidden rounded-3xl transition hover:-translate-y-1"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-black/60 px-3 py-2 text-white">
                    {item.platform === "youtube" ? <Youtube size={16} /> : <Instagram size={16} />}
                    <span className="text-xs uppercase tracking-[0.2em]">{item.platform}</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-display text-xl font-semibold">{item.title}</h3>
                    <div className="grid h-9 w-9 place-items-center rounded-full glass transition-transform group-hover:scale-110">
                      <ArrowUpRight size={15} />
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}