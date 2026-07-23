import { useEffect, useRef } from "react";

export function Background() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!glowRef.current) return;
      glowRef.current.style.transform = `translate3d(${e.clientX - 300}px, ${e.clientY - 300}px, 0)`;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden noise">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,60,80,0.2),transparent_55%),radial-gradient(ellipse_at_bottom,rgba(60,120,255,0.16),transparent_60%)]" />
      <div className="absolute -top-32 -left-32 h-[520px] w-[520px] rounded-full bg-[#FF3B4E]/20 blur-[140px] animate-pulse" />
      <div className="absolute top-1/3 -right-40 h-[480px] w-[480px] rounded-full bg-[#3C7BFF]/20 blur-[140px]" />
      <div className="absolute bottom-0 left-1/3 h-[420px] w-[420px] rounded-full bg-[#FF5577]/15 blur-[140px]" />
      <div
        ref={glowRef}
        className="absolute h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(255,80,100,0.18),transparent_60%)] transition-transform duration-300 ease-out will-change-transform"
      />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
    </div>
  );
}