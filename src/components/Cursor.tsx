import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function Cursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [hoverType, setHoverType] = useState<"default" | "view" | "magnetic">("default");

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth interpolation without feeling laggy
  const ringX = useSpring(mouseX, { stiffness: 400, damping: 28, mass: 0.5 });
  const ringY = useSpring(mouseY, { stiffness: 400, damping: 28, mass: 0.5 });
  
  // Very slight smoothing on dot
  const dotX = useSpring(mouseX, { stiffness: 1000, damping: 40 });
  const dotY = useSpring(mouseY, { stiffness: 1000, damping: 40 });

  useEffect(() => {
    // Check if device supports hover
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const isClickable = target.closest("a, button, [role='button'], input, select, textarea");
      const isImage = target.closest("img") || target.closest("video") || target.closest(".project-image");

      if (isImage) {
        setIsHovering(true);
        setHoverType("view");
      } else if (isClickable) {
        setIsHovering(true);
        setHoverType("magnetic");
      } else {
        setIsHovering(false);
        setHoverType("default");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="hidden lg:block pointer-events-none">
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 w-[6px] h-[6px] bg-[var(--text-primary)] rounded-full pointer-events-none z-[9999] "
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          scale: isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 1
        }}
      />

      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] flex items-center justify-center overflow-hidden text-[9px] font-sans font-medium tracking-[0.2em] text-[var(--bg-color)]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          width: hoverType === "view" ? 72 : (hoverType === "magnetic" ? 48 : 32),
          height: hoverType === "view" ? 72 : (hoverType === "magnetic" ? 48 : 32),
          border: hoverType === "view" ? "none" : "1px solid var(--border-color)",
          backgroundColor: hoverType === "view" ? "var(--text-primary)" : (hoverType === "magnetic" ? "var(--glass-border)" : "transparent"),
          borderRadius: "9999px",
        }}
        animate={{
          scale: isHovering ? 1.1 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      >
        {hoverType === "view" && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className=" text-white"
          >
            VIEW
          </motion.span>
        )}
      </motion.div>
    </div>
  );
}
