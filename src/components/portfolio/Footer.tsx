import { socials } from "@/constants/portfolio";

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <a href="#home" className="inline-block">
              <span className="font-display text-sm font-semibold">Maxmilan Fernando</span>
            </a>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              A passionate developer and creative professional who transforms ideas into functional, visually appealing, and result-driven digital solutions.
            </p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Navigate</div>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
              {["home", "about", "skills", "projects", "resume", "contact"].map((l) => (
                <li key={l}>
                  <a href={`#${l}`} className="capitalize text-muted-foreground transition-colors hover:text-foreground">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Elsewhere</div>
            <ul className="mt-4 flex gap-3">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <li key={s.label}>
                    <a
                      aria-label={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="grid h-10 w-10 place-items-center rounded-full glass transition-transform hover:-translate-y-1"
                    >
                      <Icon size={14} />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 text-xs text-muted-foreground sm:flex-row">
          <div>© {new Date().getFullYear()} Maxmilan Fernando.</div>
          <div>Crafted with care.</div>
        </div>
      </div>
    </footer>
  );
}