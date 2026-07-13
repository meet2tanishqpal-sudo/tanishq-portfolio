import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "motion/react";

const Highlight = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLSpanElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "start 45%"]
  });

  const [hasCompleted, setHasCompleted] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 1 && !hasCompleted) {
      setHasCompleted(true);
    }
  });

  // If completed, stick to 1, else use the scroll progress
  const activeProgress = useTransform(scrollYProgress, (v) => hasCompleted ? 1 : v);
  
  const scaleX = useSpring(activeProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const color = useTransform(activeProgress, [0, 1], ["var(--text-primary)", "#000000"]);
  const textShadow = useTransform(activeProgress, [0, 1], ["0px 0px 0px rgba(246,232,195,0)", "0px 0px 12px rgba(246,232,195,0.6)"]);
  
  return (
    <span ref={ref} className="relative inline-block px-1.5 mx-0.5 group whitespace-nowrap z-10">
      <motion.span
        style={{ scaleX }}
        className="absolute inset-0 bg-[#F6E8C3] rounded-[4px] -z-10 origin-left"
      />
      <motion.span
        style={{ color, textShadow }}
        className="relative z-10 font-medium transition-colors duration-300"
      >
        {children}
      </motion.span>
    </span>
  );
};

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: sectionProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const { scrollYProgress: contentProgress } = useScroll({
    target: textRef,
    offset: ["start 80%", "end 20%"]
  });

  // Parallax effects
  const yParallax = useTransform(sectionProgress, [0, 1], [100, -100]);
  const yParallaxSlow = useTransform(sectionProgress, [0, 1], [50, -50]);
  
  // Smoothly fade away when leaving the About section
  const contentOpacity = useTransform(contentProgress, [0, 0.1, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="relative w-full min-h-screen py-32 overflow-hidden bg-[var(--bg-color)] border-t border-[var(--border-color)]"
    >
      {/* Background Architectural Elements */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {/* Blueprint Grid */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
             style={{ backgroundImage: "linear-gradient(to right, var(--text-primary) 1px, transparent 1px), linear-gradient(to bottom, var(--text-primary) 1px, transparent 1px)", backgroundSize: "4rem 4rem" }} 
        />
        
        {/* Soft Radial Gradients */}
        <motion.div 
          style={{ y: yParallaxSlow }}
          className="absolute top-0 right-0 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-[#F6E8C3] dark:bg-[#4A4232] rounded-full opacity-[0.05] dark:opacity-[0.03] blur-[100px] translate-x-1/3 -translate-y-1/3" 
        />
        <motion.div 
          style={{ y: yParallax }}
          className="absolute bottom-0 left-0 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-[var(--text-primary)] rounded-full opacity-[0.02] blur-[120px] -translate-x-1/3 translate-y-1/3" 
        />
        
        {/* Geometric Decorations */}
        <div className="absolute top-40 left-10 w-24 h-24 border border-[var(--text-primary)] opacity-10 rounded-full" />
        <div className="absolute bottom-40 right-20 w-32 h-32 border border-[var(--text-primary)] opacity-10 rotate-45" />
        
        {/* Floating dots */}
        <motion.div style={{ y: yParallax }} className="absolute top-1/4 right-1/4 w-1 h-1 bg-[var(--text-primary)] opacity-30 rounded-full" />
        <motion.div style={{ y: yParallaxSlow }} className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-[var(--text-primary)] opacity-20 rounded-full" />
      </div>

      <div className="max-w-[90rem] mx-auto px-6 w-full relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left Column: Title & Architecture */}
          <div className="lg:w-[40%] xl:w-[35%] flex flex-col justify-start relative">
            <div className="lg:sticky lg:top-40">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="text-xl md:text-2xl lg:text-3xl tracking-[0.2em] uppercase font-bold text-[var(--text-primary)] block mb-6">
                  ABOUT
                </span>
                
                <h2 className="font-serif text-[12vw] sm:text-[10vw] md:text-[6rem] lg:text-[5rem] xl:text-[6.5rem] leading-[0.9] tracking-[-0.03em] text-[var(--text-primary)] whitespace-nowrap">
                  Who I Am
                </h2>
              </motion.div>

              {/* Architectural Divider */}
              <motion.div 
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="hidden lg:block w-[1px] h-48 bg-[var(--text-primary)] opacity-15 mt-12 origin-top"
              />
              
              {/* Small geometric details */}
              <div className="hidden lg:flex items-center gap-3 mt-8 opacity-40">
                <div className="w-1.5 h-1.5 bg-[var(--text-primary)] rounded-full" />
                <div className="w-12 h-[1px] bg-[var(--text-primary)]" />
                <div className="text-[9px] uppercase tracking-[0.2em] font-sans font-semibold">01</div>
              </div>
            </div>
          </div>

          {/* Right Column: Content */}
          <motion.div 
            ref={textRef}
            style={{ opacity: contentOpacity }}
            className="lg:w-[60%] xl:w-[65%] flex flex-col justify-center pt-8 lg:pt-32"
          >
            <div className="font-sans text-[1.25rem] sm:text-[1.5rem] md:text-[2rem] lg:text-[2.25rem] leading-[1.6] md:leading-[1.7] text-[var(--text-primary)] opacity-90 max-w-4xl font-light">
              <p className="mb-12">
                I'm Tanishq Pal, a <Highlight>B.Tech Computer Science & Engineering</Highlight> student at <Highlight>SRM Institute of Science & Technology</Highlight> with a passion for building meaningful digital experiences using <Highlight>AI</Highlight> and modern <Highlight>Web Development</Highlight> technologies.
              </p>
              
              <div className="w-16 h-[1px] bg-[var(--text-primary)] opacity-20 mb-12" />
              
              <p className="mb-12">
                I enjoy transforming ideas into functional websites, interactive portfolios, and intelligent web applications that are clean, responsive, and thoughtfully designed. Every project I build helps me practice <Highlight>Learning by Building</Highlight> and become a better engineer.
              </p>
              
              <div className="w-16 h-[1px] bg-[var(--text-primary)] opacity-20 mb-12" />

              <p className="mb-12">
                Beyond coding, I'm actively involved in <Highlight>Google Developer Communities</Highlight>, <Highlight>Toastmasters International</Highlight>, <Highlight>Hackathons</Highlight>, and technical events where I continuously learn, collaborate with others, and challenge myself to grow both technically and personally.
              </p>

              <div className="w-16 h-[1px] bg-[var(--text-primary)] opacity-20 mb-12" />

              <p>
                I believe technology should solve real problems, create meaningful experiences, and continue evolving through curiosity and consistent learning.
              </p>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
