import { motion } from "motion/react";
import { useEffect } from "react";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--bg-color)] overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Grid */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2 }}
        style={{
          backgroundImage: 'linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)',
          backgroundSize: '4rem 4rem'
        }}
      />

      {/* Blueprint Lines & Dots */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ opacity: 0.15 }}>
        <motion.line x1="20%" y1="0" x2="20%" y2="100%" stroke="var(--text-primary)" strokeWidth="1" 
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, ease: "easeInOut" }} />
        <motion.line x1="80%" y1="0" x2="80%" y2="100%" stroke="var(--text-primary)" strokeWidth="1" 
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, ease: "easeInOut", delay: 0.2 }} />
        <motion.line x1="0" y1="30%" x2="100%" y2="30%" stroke="var(--text-primary)" strokeWidth="1" 
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, ease: "easeInOut", delay: 0.4 }} />
        <motion.line x1="0" y1="70%" x2="100%" y2="70%" stroke="var(--text-primary)" strokeWidth="1" 
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, ease: "easeInOut", delay: 0.6 }} />

        {[
          { cx: "20%", cy: "30%" },
          { cx: "80%", cy: "30%" },
          { cx: "20%", cy: "70%" },
          { cx: "80%", cy: "70%" },
        ].map((pos, i) => (
          <motion.circle key={i} cx={pos.cx} cy={pos.cy} r="3" fill="var(--text-primary)" 
            initial={{ scale: 0, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            transition={{ delay: 1 + i * 0.2, duration: 0.5 }} 
          />
        ))}
      </svg>

      <div className="relative z-10 flex flex-col items-center justify-center w-full">
        <svg className="w-full max-w-3xl h-32 md:h-48 overflow-visible" viewBox="0 0 800 200">
          <motion.text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="font-serif text-6xl md:text-8xl tracking-tight"
            initial={{ strokeDasharray: 800, strokeDashoffset: 800, fill: "var(--text-primary)", fillOpacity: 0, stroke: "var(--text-primary)", strokeWidth: 1 }}
            animate={{ strokeDashoffset: 0, fillOpacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              strokeDashoffset: { duration: 2, ease: [0.22, 1, 0.36, 1] },
              fillOpacity: { duration: 1, delay: 1.5, ease: "easeOut" }
            }}
          >
            Tanishq Pal
          </motion.text>
        </svg>

        <motion.div
          className="h-[1px] bg-[var(--text-primary)] mb-6"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "200px", opacity: 0.3 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 1.5, delay: 1, ease: [0.22, 1, 0.36, 1] }}
        />

        <motion.div
          className="font-sans text-[11px] md:text-xs tracking-[0.4em] uppercase text-[var(--text-primary)] opacity-60"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.6, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 1, delay: 1.8, ease: "easeOut" }}
        >
          Software Engineer <span className="mx-2 md:mx-4 opacity-50">•</span> AI Builder
        </motion.div>
      </div>

      {/* Bottom Expanding Line */}
      <motion.div
        className="absolute bottom-0 left-0 h-[1px] bg-[var(--text-primary)] origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        exit={{ y: "-100vh", opacity: 0 }}
        transition={{ 
          scaleX: { duration: 3.2, ease: [0.22, 1, 0.36, 1] }
        }}
        style={{ width: "100%" }}
      />
    </motion.div>
  );
}
