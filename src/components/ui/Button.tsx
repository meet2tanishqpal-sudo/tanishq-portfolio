import React, { useRef } from "react";
import { motion, useSpring, useMotionValue } from "motion/react";

export function MagneticButton({ children, href, onClick, className, download, disabled, type }: { children: React.ReactNode, href?: string, onClick?: (e: any) => void, className?: string, download?: string | boolean, disabled?: boolean, type?: "button" | "submit" | "reset" }) {
  const ref = useRef<any>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouse = (e: React.MouseEvent) => {
    if (disabled) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.2);
    y.set(middleY * 0.2);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const Component = href ? motion.a : motion.button;

  return (
    // @ts-ignore
    <Component
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onClick={disabled ? (e: any) => e.preventDefault() : onClick}
      href={href}
      download={download}
      disabled={disabled}
      type={type}
      target={href && href.startsWith('http') ? "_blank" : undefined}
      rel={href && href.startsWith('http') ? "noopener noreferrer" : undefined}
      style={{ x: springX, y: springY }}
      className={`focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-offset-[var(--bg-color)] ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </Component>
  );
}
