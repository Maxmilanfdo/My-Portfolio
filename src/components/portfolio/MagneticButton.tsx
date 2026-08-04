import { motion } from "framer-motion";
import { useRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from "react";

type ButtonProps = {
  as?: "button";
  href?: never;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type AnchorProps = {
  as: "a";
  href: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

interface MagneticButtonBaseProps {
  children: ReactNode;
  variant?: "primary" | "ghost";
}

type Props = MagneticButtonBaseProps & (ButtonProps | AnchorProps);

export function MagneticButton(props: Props) {
  const { children, variant = "primary" } = props;
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };

  const cls =
    variant === "primary"
      ? "bg-gradient-to-r from-brand-secondary via-brand to-brand-accent text-white shadow-[0_16px_40px_-14px_rgba(108,99,255,0.7)]"
      : "glass text-foreground hover:bg-white/10";

  const inner = (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-transform duration-300 ease-out ${cls}`}
    >
      {children}
    </motion.div>
  );

  if (props.as === "a") {
    const { href, as, ...rest } = props as AnchorProps;
    return (
      <a href={href} className="inline-block" {...rest}>
        {inner}
      </a>
    );
  }
  const { as, ...rest } = props as ButtonProps;
  return (
    <button {...rest} className="inline-block">
      {inner}
    </button>
  );
}