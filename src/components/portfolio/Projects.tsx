import { AnimatePresence, motion, useAnimationFrame } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Github, Youtube, Instagram, X } from "lucide-react";
import { projects, designGallery, videoShowcase, getVideoThumbnail, type ProjectCategory } from "@/constants/portfolio";
import { SectionHeader } from "./SectionHeader";
import projectFallback from "@/assets/project-4.png";

const tabs: { id: ProjectCategory; label: string }[] = [
  { id: "software", label: "Software" },
  { id: "design", label: "Graphic Design" },
  { id: "video", label: "Video" },
];

export function Projects() {
  const [active, setActive] = useState<(typeof tabs)[number]["id"]>("software");
  const [paused, setPaused] = useState(false);
  const [speed, setSpeed] = useState(80);
  const [videoMetadata, setVideoMetadata] = useState<Record<string, { title: string; caption: string; thumbnail: string }>>({});
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen]);
  const x = useRef(0);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const trackWidthRef = useRef(0);
  const items = active === "software" ? projects : [];
  const duplicatedGallery = [...designGallery, ...designGallery, ...designGallery];

  const getTrackWidth = () => (trackRef.current ? trackRef.current.scrollWidth / 3 : 0);
  const normalizeX = (value: number) => {
    const trackWidth = trackWidthRef.current || getTrackWidth();
    if (!trackWidth) return value;
    if (value < -trackWidth) return value + trackWidth;
    if (value > 0) return value - trackWidth;
    return value;
  };

  useEffect(() => {
    if (active !== "design" || !trackRef.current) return;

    const trackWidth = getTrackWidth();
    trackWidthRef.current = trackWidth;
    x.current = -trackWidth;
    trackRef.current.style.transform = `translateX(${x.current}px)`;
  }, [active]);

  useEffect(() => {
    let isMounted = true;

    const loadVideoMetadata = async () => {
      const results = await Promise.all(
        videoShowcase.map(async (item) => {
          try {
            if (item.platform === "youtube") {
              const response = await fetch(`https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(item.href)}`);
              if (response.ok) {
                const data = await response.json();
                return {
                  key: item.href,
                  title: data.title || "YouTube video",
                  caption: data.title || "YouTube video",
                  thumbnail: getVideoThumbnail(item.href, item.platform),
                };
              }
            }

            const response = await fetch(`/__api/instagram-metadata?url=${encodeURIComponent(item.href)}`);
            if (response.ok) {
              const data = await response.json();
              return {
                key: item.href,
                title: data.title || "Instagram reel",
                caption: data.title || "Instagram reel",
                thumbnail: data.thumbnail || getVideoThumbnail(item.href, item.platform),
              };
            }
          } catch {
            // Ignore metadata lookup failures and fall back to defaults.
          }

          return {
            key: item.href,
            title: item.platform === "youtube" ? "YouTube video" : "Instagram reel",
            caption: item.platform === "youtube" ? "YouTube video" : "Instagram reel",
            thumbnail: getVideoThumbnail(item.href, item.platform),
          };
        })
      );

      if (!isMounted) return;

      setVideoMetadata(
        Object.fromEntries(results.map((result) => [result.key, { title: result.title, caption: result.caption, thumbnail: result.thumbnail }]))
      );
    };

    void loadVideoMetadata();

    return () => {
      isMounted = false;
    };
  }, []);

  useAnimationFrame((_, delta) => {
    if (paused || !trackRef.current) return;

    x.current -= (speed * delta) / 1000;
    const trackWidth = trackRef.current.scrollWidth / 3;

    if (x.current <= -trackWidth) {
      x.current += trackWidth;
    }
    if (x.current > 0) {
      x.current -= trackWidth;
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

    const trackWidth = track.scrollWidth / 3;
    const target = x.current + delta;
    const shouldWrapRight = target > 0;
    const shouldWrapLeft = target <= -trackWidth;

    track.style.transition = `transform ${duration}ms cubic-bezier(.22,.9,.31,1)`;
    track.style.transform = `translateX(${target}px)`;

    const cleanup = () => {
      track.style.transition = "";
      isAnimatingRef.current = false;
      setPaused(prevPaused);
    };

    const onEnd = () => {
      if (shouldWrapRight) {
        x.current = target - trackWidth;
        track.style.transform = `translateX(${x.current}px)`;
      } else if (shouldWrapLeft) {
        x.current = target + trackWidth;
        track.style.transform = `translateX(${x.current}px)`;
      } else {
        x.current = target;
      }
      cleanup();
      track.removeEventListener("transitionend", onEnd);
    };

    track.addEventListener("transitionend", onEnd, { once: true });

    setTimeout(() => {
      if (isAnimatingRef.current) {
        onEnd();
      }
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
                          {p.repo && (
                          <a href={p.repo} className="grid h-9 w-9 place-items-center rounded-full glass transition-transform hover:scale-110">
                            <Github size={14} />
                          </a>
                        )}
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

        {/* Lightbox modal for full-size image preview */}
        {lightboxOpen && selectedImage && (
          <div
            className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-6"
            onClick={() => setLightboxOpen(false)}
            role="dialog"
            aria-modal="true"
          >
            <div className="relative max-w-[90vw] max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
              <button
                aria-label="Close"
                onClick={() => setLightboxOpen(false)}
                className="absolute right-2 top-2 z-50 rounded-full bg-black/60 p-2 text-white hover:bg-black/70 cursor-pointer"
              >
                <X size={16} />
              </button>
              <img src={selectedImage} alt="Full size" className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-xl" />
            </div>
          </div>
        )}

        {active === "design" && (
          <section
            className="mt-12 relative overflow-hidden rounded-3xl"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="pointer-events-none hidden md:block absolute inset-y-0 left-0 w-48 z-20">
              <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-background/80 via-background/50 to-transparent" />
            </div>
            <div className="pointer-events-none hidden md:block absolute inset-y-0 right-0 w-48 z-20">
              <div className="absolute inset-y-0 right-0 w-full bg-gradient-to-l from-background/80 via-background/50 to-transparent" />
            </div>
            <button
              type="button"
              onClick={slidePrev}
              onMouseDown={() => setSpeed(40)}
              onMouseUp={() => setSpeed(80)}
              className="absolute left-5 top-1/2 z-30 -translate-y-1/2 h-11 w-11 rounded-full bg-slate-950 text-white shadow-none ring-0 md:glass grid place-items-center transition hover:bg-slate-900"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={slideNext}
              onMouseDown={() => setSpeed(220)}
              onMouseUp={() => setSpeed(80)}
              className="absolute right-5 top-1/2 z-30 -translate-y-1/2 h-11 w-11 rounded-full bg-slate-950 text-white shadow-none ring-0 md:glass grid place-items-center transition hover:bg-slate-900"
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
                    className="glass-strong overflow-hidden rounded-3xl min-w-[420px] md:min-w-[520px] cursor-pointer"
                  >
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => {
                          setSelectedImage(item.image);
                          setLightboxOpen(true);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            setSelectedImage(item.image);
                            setLightboxOpen(true);
                          }
                        }}
                        className="relative aspect-[16/10] overflow-hidden cursor-pointer"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-[900ms] hover:scale-105 cursor-pointer"
                        />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                    </div>
                    {/* Title and caption removed — image fills the card */}
                  </article>
                ))}
              </motion.div>
            </div>
          </section>
        )}

        {active === "video" && (
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {videoShowcase.map((item) => {
              const meta = videoMetadata[item.href] || {
                title: item.platform === "youtube" ? "YouTube video" : "Instagram reel",
                caption: item.platform === "youtube" ? "YouTube video" : "Instagram reel",
                thumbnail: getVideoThumbnail(item.href, item.platform),
              };
              const label = item.platform === "youtube" ? meta.title : meta.caption || meta.title;

              return (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="glass-strong group overflow-hidden rounded-3xl transition hover:-translate-y-1"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={meta.thumbnail}
                      alt={label}
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.src = projectFallback;
                      }}
                      className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-black/60 px-3 py-2 text-white">
                      {item.platform === "youtube" ? <Youtube size={16} /> : <Instagram size={16} />}
                      <span className="text-xs uppercase tracking-[0.2em]">{item.platform}</span>
                    </div>
                  </div>
                  <div className="flex items-start justify-between gap-4 p-6">
                    <div className="min-w-0">
                      <h3 className="font-display text-lg font-semibold leading-snug line-clamp-2">
                        {label}
                      </h3>
                    </div>
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full glass transition-transform group-hover:scale-110">
                      <ArrowUpRight size={15} />
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}