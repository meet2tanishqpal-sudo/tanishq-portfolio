import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const row1 = [
  "HTML5", "CSS3", "JavaScript", "TypeScript", "Python", "C++",
  "React", "Vite", "Tailwind CSS", "Framer Motion"
];

const row2 = [
  "Node.js", "REST APIs", "Firebase", "Firestore", "Gemini API",
  "Git", "GitHub", "VS Code", "Figma", "Vercel"
];

const marqueeRows = [row1, row2];

function TechPill({ text }: { text: string }) {
  return (
    <div className="flex-shrink-0 px-6 md:px-8 py-3 md:py-4 glass-effect rounded-full shadow-ambient hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_40px_-15px_rgba(255,255,255,0.05)] flex items-center justify-center cursor-default transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-[var(--text-primary)] group mx-3 md:mx-4">
      <span className="font-sans text-sm md:text-[15px] text-[var(--text-primary)] opacity-70 group-hover:opacity-100 font-medium tracking-wide whitespace-nowrap transition-all duration-500">
        {text}
      </span>
    </div>
  );
}

export default function TechStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="craftsmanship" ref={containerRef} className="relative w-full py-40 overflow-hidden transition-colors duration-500 bg-[var(--bg-color)]">
      <motion.div style={{ y }} className="w-full max-w-[90rem] mx-auto flex flex-col items-center justify-center px-6 md:px-12">
        
        <div className="text-center mb-24 z-10">
          <span className="text-xl md:text-2xl lg:text-3xl font-sans tracking-[0.2em] text-[var(--text-primary)] uppercase font-bold mb-6 block">
            Craftsmanship
          </span>
          <h2 className="font-serif text-5xl md:text-7xl lg:text-[6rem] font-normal tracking-[-0.03em] text-[var(--text-primary)] leading-[1] mb-8">
            Tech Stack
          </h2>
          <p className="font-sans text-[13px] md:text-[15px] text-gray-500 dark:text-gray-400 tracking-[0.02em] leading-[1.8] max-w-lg mx-auto">
            The foundational technologies I use to architect intelligent, scalable, and beautifully designed digital products.
          </p>
        </div>

        <div className="w-full flex flex-col gap-12 relative z-10 overflow-hidden" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
          {marqueeRows.map((row, idx) => {
            const isReverse = idx % 2 !== 0;
            return (
              <div key={idx} className="flex flex-col items-center">
                <div className="flex w-full overflow-hidden group/track">
                  <div className={`flex shrink-0 w-max ${isReverse ? 'animate-[marquee_50s_linear_infinite_reverse] flex-row-reverse' : 'animate-[marquee_50s_linear_infinite]'} group-hover/track:[animation-play-state:paused]`}>
                    {[...row, ...row, ...row, ...row, ...row, ...row].map((tech, i) => (
                      <TechPill key={`${idx}-${i}`} text={tech} />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </motion.div>
    </section>
  );
}
