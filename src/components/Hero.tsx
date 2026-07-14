import React, { useRef } from "react";
import { motion, useSpring, useMotionValue } from "motion/react";
import { ArrowDown, Github, Linkedin, Instagram, ArrowUpRight } from "lucide-react";
import { Typewriter } from "./ui/Typewriter";
import { MagneticButton } from "./ui/Button";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax for portrait
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 15;
    const y = (clientY / innerHeight - 0.5) * 15;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  }

  const springX = useSpring(mouseX, { stiffness: 40, damping: 25, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 25, mass: 0.5 });



  return (
    <section 
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden px-6 pt-32 pb-24"
    >
      <div className="max-w-[90rem] mx-auto w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-16 lg:gap-24 relative z-10">
        
        {/* Left: Typography */}
        <motion.div 
           
          className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left mt-8 lg:mt-0"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="font-serif text-[12vw] sm:text-[10vw] lg:text-[7.5rem] font-normal tracking-[-0.04em] text-[var(--text-primary)] leading-[1] mb-8 relative z-20 whitespace-nowrap"
          >
            Tanishq Pal
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
            className="h-16 md:h-20"
          >
              <Typewriter
                phrases={[
                 "Turning ideas into digital experiences.",
                 "Building modern portfolio websites.",
                 "Creating responsive business websites.",
                 "Developing AI-powered web experiences.",
                 "Crafting clean, user-friendly interfaces.",
                 "Helping founders bring ideas online.",
                 "Always learning. Always building."
               ]}
              />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
            className="font-sans text-[14px] md:text-[16px] text-[var(--text-primary)] opacity-90 tracking-[0.02em] leading-[1.8] max-w-xl mb-12 mt-2"
          >
            I'm a B.Tech Computer Science & Engineering student at SRM Institute of Science & Technology, passionate about building AI-powered websites and modern digital experiences.<br/><br/>
            Currently interning at <a href="https://founderlabs.in" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-bold cursor-pointer group bg-[var(--text-primary)] text-[var(--bg-color)] px-2.5 py-0.5 rounded-md transition-all duration-300 hover:scale-[1.03] active:scale-95 shadow-sm mx-1">FounderLabs <ArrowUpRight className="w-3.5 h-3.5 opacity-80" /></a>, where I contribute to startup-focused projects and gain hands-on experience working in a fast-paced environment.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
            className="mt-6 flex flex-col sm:flex-row gap-4"
          >
            <MagneticButton
                onClick={(e) => { e.preventDefault(); document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }); }} 
              className="group flex items-center justify-center gap-4 bg-[var(--text-primary)] text-[var(--bg-color)] px-10 py-5 rounded-full text-[10px] tracking-[0.25em] uppercase font-medium transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:opacity-90 hover:-translate-y-1 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] dark:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.1)] hover:shadow-xl active:scale-[0.98]"
            >
              ABOUT ME
            </MagneticButton>
            <MagneticButton
                onClick={(e) => { e.preventDefault(); document.getElementById("timeline")?.scrollIntoView({ behavior: "smooth" }); }} 
              className="group flex items-center justify-center gap-4 bg-transparent text-[var(--text-primary)] border border-[var(--border-color)] px-10 py-5 rounded-full text-[10px] tracking-[0.25em] uppercase font-medium transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-color)] hover:-translate-y-1 active:scale-[0.98]"
            >
              EXPLORE MY JOURNEY
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-500" />
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
            className="mt-10 flex items-center gap-6 justify-center lg:justify-start"
          >
            <a href="https://github.com/Tanishq102004" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-[var(--text-primary)] opacity-60 hover:opacity-100 hover:text-[#333] dark:hover:text-[#ffffff] transition-all duration-300">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com/in/tanishq-pal-475a852a8/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-[var(--text-primary)] opacity-60 hover:opacity-100 hover:text-[#0A66C2] transition-all duration-300">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="https://www.instagram.com/tanishq.50236" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-[var(--text-primary)] opacity-60 hover:opacity-100 hover:text-[#E4405F] transition-all duration-300">
              <Instagram className="w-6 h-6" />
            </a>
          </motion.div>

        </motion.div>

        {/* Right: Portrait */}
        <motion.div 
          
          className="flex-1 w-full flex justify-center lg:justify-end relative"
        >
          {/* Ambient Glow Behind Portrait */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-[var(--text-primary)] opacity-[0.03] dark:opacity-[0.05] blur-[120px] rounded-full pointer-events-none" />
          
          {/* Floating and Parallax Container */}
          <motion.div 
            style={{ x: springX, y: springY }} 
            className="relative w-full max-w-[350px] md:max-w-[450px] lg:max-w-[550px] aspect-[4/5] md:aspect-square lg:aspect-[4/5]"
          >
             <motion.div
               animate={{ y: [-4, 4, -4] }}
               transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
               className="w-full h-full relative"
             >
                {/* Soft Edge Masked Portrait */}
                <div 
                  className="w-full h-full relative"
                  style={{
                    maskImage: "radial-gradient(circle at 50% 50%, black 40%, transparent 70%)",
                    WebkitMaskImage: "radial-gradient(circle at 50% 50%, black 40%, transparent 70%)"
                  }}
                >
                  <img 
                    src="/projects/portrait.png" 
                    alt="Tanishq Pal" 
                    className="w-full h-full object-cover object-top opacity-95 dark:opacity-90 transition-all duration-700 mix-blend-multiply dark:mix-blend-normal"
                    style={{ filter: "contrast(1.05) saturate(1.05)" }}
                  />
                </div>
             </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
