import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const Highlight = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.span
      initial={{ backgroundSize: "0% 100%", color: "var(--text-primary)" }}
      whileInView={{ backgroundSize: "100% 100%", color: "#000000" }}
      viewport={{ margin: "-10% 0px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="inline font-medium px-1 rounded-[6px]"
      style={{
        backgroundImage: "linear-gradient(to right, #F6E8C3, #F6E8C3)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left center",
        boxDecorationBreak: "clone",
        WebkitBoxDecorationBreak: "clone",
      }}
    >
      {children}
    </motion.span>
  );
};

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress: sectionProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax effects
  const yParallax = useTransform(sectionProgress, [0, 1], [100, -100]);
  const yParallaxSlow = useTransform(sectionProgress, [0, 1], [50, -50]);

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[var(--bg-color)] border-t border-[var(--border-color)]"
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
        
        {/* Geometric Decorations (Hidden on mobile for cleaner look) */}
        <div className="hidden md:block absolute top-40 left-10 w-24 h-24 border border-[var(--text-primary)] opacity-10 rounded-full" />
        <div className="hidden md:block absolute bottom-40 right-20 w-32 h-32 border border-[var(--text-primary)] opacity-10 rotate-45" />
        
        {/* Floating dots */}
        <motion.div style={{ y: yParallax }} className="hidden md:block absolute top-1/4 right-1/4 w-1 h-1 bg-[var(--text-primary)] opacity-30 rounded-full" />
        <motion.div style={{ y: yParallaxSlow }} className="hidden md:block absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-[var(--text-primary)] opacity-20 rounded-full" />
      </div>

      {/* MOBILE LAYOUT (< 1024px) */}
      <div className="lg:hidden w-[92%] max-w-[38ch] md:max-w-2xl mx-auto py-24 relative z-10 flex flex-col items-center text-center">
        
        {/* Mobile Heading */}
        <div className="relative mb-8 md:mb-12 w-full flex justify-center">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-10% 0px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-[13.5vw] md:text-[5.5rem] leading-[1] tracking-[-0.03em] text-[var(--text-primary)] whitespace-nowrap relative z-10"
          >
            Who I Am
            {/* Decorative Circle behind heading */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[18vw] h-[18vw] md:w-24 md:h-24 bg-[var(--text-primary)] opacity-[0.04] rounded-full -z-10" />
          </motion.h2>
        </div>

        {/* Mobile Content */}
        <div className="font-sans text-[17px] md:text-[22px] leading-[1.75] text-[var(--text-primary)] opacity-[0.92] font-light flex flex-col gap-7 md:gap-10">
          <p>
            I'm Tanishq Pal, a <Highlight>B.Tech Computer Science & Engineering</Highlight> student at <Highlight>SRM Institute of Science & Technology</Highlight> with a passion for building meaningful digital experiences using <Highlight>AI</Highlight> and modern <Highlight>Web Development</Highlight> technologies.
          </p>
          
          <p>
            I enjoy transforming ideas into functional websites, interactive portfolios, and intelligent web applications that are clean, responsive, and thoughtfully designed. Every project I build helps me practice <Highlight>Learning by Building</Highlight> and become a better engineer.
          </p>
          
          <p>
            Beyond coding, I'm actively involved in <Highlight>Google Developer Communities</Highlight>, <Highlight>Toastmasters International</Highlight>, <Highlight>Hackathons</Highlight>, and technical events where I continuously learn, collaborate with others, and challenge myself to grow both technically and personally.
          </p>
          
          <p>
            I believe technology should solve real problems, create meaningful experiences, and continue evolving through curiosity and consistent learning.
          </p>
        </div>
      </div>

      {/* DESKTOP LAYOUT (>= 1024px) */}
      <div className="hidden lg:block max-w-[90rem] mx-auto px-6 py-32 w-full relative z-10">
        <div className="flex flex-row gap-16 lg:gap-24">
          
          {/* Left Column: Title & Architecture */}
          <div className="w-[35%] xl:w-[35%] flex flex-col justify-start relative">
            <div className="sticky top-40">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ margin: "-10% 0px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="text-xl lg:text-3xl tracking-[0.2em] uppercase font-bold text-[var(--text-primary)] block mb-6">
                  ABOUT
                </span>
                
                <h2 className="font-serif lg:text-[5rem] xl:text-[6.5rem] leading-[0.9] tracking-[-0.03em] text-[var(--text-primary)] whitespace-nowrap">
                  Who I Am
                </h2>
              </motion.div>

              {/* Architectural Divider */}
              <motion.div 
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ margin: "-10% 0px" }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="w-[1px] h-48 bg-[var(--text-primary)] opacity-15 mt-12 origin-top"
              />
              
              {/* Small geometric details */}
              <div className="flex items-center gap-3 mt-8 opacity-40">
                <div className="w-1.5 h-1.5 bg-[var(--text-primary)] rounded-full" />
                <div className="w-12 h-[1px] bg-[var(--text-primary)]" />
                <div className="text-[9px] uppercase tracking-[0.2em] font-sans font-semibold">01</div>
              </div>
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="w-[65%] xl:w-[65%] flex flex-col justify-center pt-32">
            <div className="font-sans lg:text-[2.25rem] leading-[1.7] text-[var(--text-primary)] opacity-90 max-w-4xl font-light">
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
          </div>
          
        </div>
      </div>
    </section>
  );
}
