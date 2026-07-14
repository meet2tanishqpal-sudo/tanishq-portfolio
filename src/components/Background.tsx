import { motion } from "motion/react";

export default function Background() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      <div className="hero-radial-bg absolute inset-0 transition-all duration-1000" />
      <div className="bg-grid opacity-30" />
      
      {/* Elegant Organic Ambient Orbs */}
      <motion.div 
        animate={{
          x: ["-2%", "5%", "-2%"],
          y: ["-5%", "3%", "-5%"],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[-10%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-[var(--orb-color)] blur-[100px] md:blur-[150px] opacity-70 mix-blend-normal dark:mix-blend-screen will-change-transform"
      />
      <motion.div 
        animate={{
          x: ["3%", "-4%", "3%"],
          y: ["5%", "-5%", "5%"],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute top-[20%] right-[-10%] w-[60vw] h-[80vw] rounded-full bg-[var(--orb-color-2)] blur-[120px] md:blur-[180px] opacity-50 mix-blend-normal dark:mix-blend-screen will-change-transform"
      />
      
      <motion.div 
        animate={{
          x: ["-5%", "2%", "-5%"],
          y: ["2%", "-6%", "2%"],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5
        }}
        className="absolute bottom-[-20%] left-[20%] w-[80vw] h-[60vw] rounded-full bg-[var(--orb-color-3)] blur-[120px] md:blur-[160px] opacity-40 mix-blend-normal dark:mix-blend-screen will-change-transform"
      />

      {/* A static glowing ring element for structural elegance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] rounded-full border border-[var(--border-color-light)] opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full border border-[var(--border-color-light)] opacity-10 pointer-events-none" />

      {/* Texture over everything to tie it together */}
      <div className="bg-noise opacity-[0.25]" />
      <div className="bg-vignette absolute inset-0" />
    </div>
  );
}
