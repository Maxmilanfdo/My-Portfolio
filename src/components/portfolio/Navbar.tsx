import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#resume", label: "Resume" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = links.map((l) => document.querySelector(l.href));
      const y = window.scrollY + window.innerHeight / 3;
      for (const s of sections) {
        if (s instanceof HTMLElement && s.offsetTop <= y && s.offsetTop + s.offsetHeight > y) {
          setActive(s.id);
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed left-1/2 top-4 z-50 -translate-x-1/2 transition-all duration-500 ${
          scrolled ? "w-[min(92%,720px)]" : "w-[min(96%,860px)]"
        }`}
      >
        <nav className="glass-strong flex items-center justify-between rounded-full px-3 py-2 shadow-[0_10px_40px_-10px_rgba(108,99,255,0.35)]">
          <a href="#home" className="pl-3">
            <span className="font-display text-sm font-semibold tracking-tight">
              alex.rivera
            </span>
          </a>
          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`relative rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                    active === l.href.slice(1)
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {active === l.href.slice(1) && (
                    <motion.span
                      layoutId="navpill"
                      className="absolute inset-0 rounded-full bg-white/10"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative">{l.label}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="hidden rounded-full bg-gradient-to-r from-brand to-brand-accent px-4 py-2 text-xs font-semibold text-white shadow-[0_8px_24px_-8px_rgba(108,99,255,0.7)] transition-transform hover:scale-105 md:inline-block"
            >
              Let's talk
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              className="grid h-9 w-9 place-items-center rounded-full glass md:hidden"
              aria-label="Menu"
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-4 top-20 z-40 md:hidden"
          >
            <div className="glass-strong rounded-3xl p-4">
              <ul className="flex flex-col gap-1">
                {links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-2xl px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-white/5 hover:text-foreground"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}