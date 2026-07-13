import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from "motion/react";
import { ArrowUpRight, Github, Linkedin, Instagram, Download, Check, X } from "lucide-react";
import { MagneticButton } from "./ui/Button";

type ToastType = {
  title: string;
  description?: string;
  type: 'success' | 'error' | 'info';
};

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [150, -50]);
  
  // Subtle parallax for the contact card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth - 0.5) * 20);
    mouseY.set((clientY / innerHeight - 0.5) * 20);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<ToastType | null>(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formsubmit.co/ajax/meet2tanishqpal@gmail.com", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setToast({
          title: "Message Sent Successfully",
          description: "Thanks for reaching out. I'll get back to you soon.",
          type: 'success'
        });
        form.reset();
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      setToast({
        title: "Something went wrong",
        description: "Please try again later.",
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadResume = () => {
    setToast({
      title: "Resume Downloaded",
      type: 'info'
    });
  };

  return (
    <section 
      id="contact" 
      ref={containerRef} 
      className="relative w-full min-h-screen py-32 overflow-hidden flex items-center justify-center bg-[var(--bg-color)] z-50"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-8 right-8 z-[200] flex items-center gap-4 bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--glass-border)] shadow-2xl px-6 py-4 rounded-2xl"
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              toast.type === 'success' ? 'bg-green-500/20 text-green-500' : 
              toast.type === 'error' ? 'bg-red-500/20 text-red-500' : 
              'bg-blue-500/20 text-blue-500'
            }`}>
              {toast.type === 'success' ? <Check className="w-4 h-4" /> : 
               toast.type === 'error' ? <X className="w-4 h-4" /> : 
               <Download className="w-4 h-4" />}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-[var(--text-primary)]">{toast.title}</span>
              {toast.description && (
                <span className="text-xs text-gray-500 mt-0.5">{toast.description}</span>
              )}
            </div>
            <button onClick={() => setToast(null)} className="ml-4 text-gray-400 hover:text-[var(--text-primary)] transition-colors">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div style={{ y }} className="max-w-[90rem] mx-auto px-6 md:px-12 w-full flex flex-col relative z-10">
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-24">
          {/* LEFT: Typography & Info */}
          <div className="w-full lg:w-[45%] flex flex-col items-start text-left mt-8 lg:mt-0">
            <span className="text-xl md:text-2xl lg:text-3xl font-sans tracking-[0.2em] text-[var(--text-primary)] uppercase font-bold mb-8 block">
              Contact
            </span>
            
            <h2 className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] font-normal tracking-[-0.03em] text-[var(--text-primary)] leading-[1] mb-12">
              The Next Conversation <span className="italic text-gray-400 dark:text-gray-500 pr-2">Starts Here.</span>
            </h2>
            
            <p className="font-sans text-[13px] md:text-[15px] text-gray-500 dark:text-gray-400 tracking-[0.02em] leading-[1.8] max-w-md mb-16">
              Whether you want to discuss AI architecture, software engineering, startups, cloud computing, or just explore how we can build meaningful products together—my inbox is always open to curious minds.
            </p>

            <div className="inline-flex items-center gap-4 rounded-full px-6 py-3 mb-16 glass-effect shadow-ambient hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] transition-all">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </div>
              <span className="text-[10px] font-sans tracking-[0.2em] text-[var(--text-primary)] uppercase font-medium">
                Actively seeking opportunities
              </span>
            </div>

            <div className="mb-16 w-full">
              <h4 className="text-[10px] font-sans tracking-[0.3em] text-gray-400 dark:text-gray-500 uppercase font-medium mb-6">
                Available For
              </h4>
              <div className="flex flex-col gap-4">
                {["Internships & Roles", "Software Engineering", "AI Projects & Research", "Open Source"].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 group cursor-default">
                    <span className="w-1.5 h-1.5 bg-transparent border border-[var(--text-primary)] rounded-full group-hover:bg-[var(--text-primary)] transition-colors duration-300"></span>
                    <span className="text-[11px] md:text-[12px] font-sans tracking-[0.2em] text-gray-500 dark:text-gray-400 uppercase font-medium group-hover:text-[var(--text-primary)] transition-colors duration-300">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <MagneticButton 
              onClick={handleDownloadResume}
              href="/projects/Resume_Tanishq.pdf"
              download="Tanishq_Pal_Resume.pdf"
              className="group flex items-center justify-center gap-4 bg-[var(--text-primary)] text-[var(--bg-color)] px-10 py-5 rounded-full text-[10px] tracking-[0.25em] uppercase font-medium transition-all hover:opacity-90 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] dark:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.1)] hover:-translate-y-1 hover:shadow-xl active:scale-[0.98]"
            >
              Download Resume
              <Download className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
            </MagneticButton>
          </div>

          {/* RIGHT: Floating Contact Panel */}
          <motion.div 
            className="w-full lg:w-[45%] relative z-20"
            style={{ x: springX, y: springY }}
          >
            <div className="w-full rounded-[2rem] p-10 md:p-14 relative overflow-hidden group glass-effect shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)] dark:hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)] transition-all duration-[1.2s] border border-[var(--glass-border)] bg-[var(--card-bg)]">
              
              {/* Subtle Animated Glow inside Card */}
              <div className="absolute -top-[50%] -right-[50%] w-[100%] h-[100%] bg-[var(--text-primary)] opacity-[0.02] dark:opacity-[0.04] blur-[80px] rounded-full pointer-events-none group-hover:scale-150 transition-transform duration-[2s] ease-[cubic-bezier(0.22,1,0.36,1)]" />

              <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-10">
                <input type="hidden" name="_subject" value="New message from Tanishq Pal Portfolio!" />
                <input type="hidden" name="_captcha" value="false" />
                
                <div className="flex flex-col gap-2 group/field">
                  <label htmlFor="name" className="text-[10px] font-sans tracking-[0.2em] text-gray-400 uppercase font-medium">Name</label>
                  <div className="relative">
                    <input type="text" id="name" name="name" required placeholder="" className="w-full bg-transparent border-b border-[var(--border-color)] pb-3 text-base md:text-lg text-[var(--text-primary)] placeholder-gray-300 dark:placeholder-gray-700 focus:outline-none focus:border-transparent transition-colors duration-500 font-serif peer" />
                    <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[var(--text-primary)] transition-all duration-500 ease-out peer-focus:w-full group-hover/field:w-full opacity-50 peer-focus:opacity-100" />
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 group/field">
                  <label htmlFor="email" className="text-[10px] font-sans tracking-[0.2em] text-gray-400 uppercase font-medium">Email</label>
                  <div className="relative">
                    <input type="email" id="email" name="email" required placeholder="" className="w-full bg-transparent border-b border-[var(--border-color)] pb-3 text-base md:text-lg text-[var(--text-primary)] placeholder-gray-300 dark:placeholder-gray-700 focus:outline-none focus:border-transparent transition-colors duration-500 font-serif peer" />
                    <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[var(--text-primary)] transition-all duration-500 ease-out peer-focus:w-full group-hover/field:w-full opacity-50 peer-focus:opacity-100" />
                  </div>
                </div>

                <div className="flex flex-col gap-2 group/field">
                  <label htmlFor="message" className="text-[10px] font-sans tracking-[0.2em] text-gray-400 uppercase font-medium">Message</label>
                  <div className="relative">
                    <textarea 
                      id="message" 
                      name="message" 
                      required 
                      rows={4} 
                      placeholder="" 
                      className="w-full bg-transparent border-b border-[var(--border-color)] pb-3 text-base md:text-lg text-[var(--text-primary)] placeholder-gray-300 dark:placeholder-gray-700 focus:outline-none focus:border-transparent transition-colors duration-500 font-serif resize-none peer" 
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          e.currentTarget.form?.requestSubmit();
                        }
                      }}
                    />
                    <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[var(--text-primary)] transition-all duration-500 ease-out peer-focus:w-full group-hover/field:w-full opacity-50 peer-focus:opacity-100" />
                  </div>
                </div>

                <div className="mt-6">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className={`w-full group/btn flex items-center justify-between bg-transparent text-[var(--text-primary)] border border-[var(--border-color)] hover:border-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-color)] px-8 py-5 rounded-full text-[10px] tracking-[0.25em] uppercase font-medium transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-lg active:scale-[0.98] ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    <span className="flex items-center gap-3">
                      {isSubmitting ? (
                        <>
                          <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-current"></span>
                          </span>
                          Sending...
                        </>
                      ) : 'Send Message'}
                    </span>
                    {!isSubmitting && <ArrowUpRight className="w-4 h-4 transform transition-transform duration-500 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />}
                  </button>
                </div>
              </form>

              {/* Socials Embedded */}
              <div className="mt-16 pt-8 border-t border-[var(--border-color-light)] flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
                <a href="mailto:meet2tanishqpal@gmail.com" className="text-[10px] md:text-[11px] font-sans tracking-[0.15em] text-gray-500 dark:text-gray-400 uppercase font-medium hover:text-[var(--text-primary)] transition-colors duration-300 relative group/link focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-offset-[var(--card-bg)] rounded-sm">
                  meet2tanishqpal@gmail.com
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--text-primary)] transition-all duration-300 group-hover/link:w-full" />
                </a>
                <div className="flex items-center gap-8">
                  <a href="https://github.com/meet2tanishqpal-sudo" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="group/icon relative text-gray-400 hover:text-[var(--text-primary)] transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-offset-[var(--card-bg)] rounded-sm">
                    <Github className="w-5 h-5 transform group-hover/icon:-translate-y-1 transition-transform duration-300" />
                  </a>
                  <a href="https://www.linkedin.com/in/tanishq-pal-475a852a8" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="group/icon relative text-gray-400 hover:text-[var(--text-primary)] transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-offset-[var(--card-bg)] rounded-sm">
                    <Linkedin className="w-5 h-5 transform group-hover/icon:-translate-y-1 transition-transform duration-300" />
                  </a>
                  <a href="https://www.instagram.com/tanishq.50236" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="group/icon relative text-gray-400 hover:text-[var(--text-primary)] transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-offset-[var(--card-bg)] rounded-sm">
                    <Instagram className="w-5 h-5 transform group-hover/icon:-translate-y-1 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
          
        </div>

        {/* Bottom Statement */}
        <div className="w-full flex justify-center text-center mt-32 mb-16">
          <p className="font-serif text-3xl md:text-5xl lg:text-[4.5rem] font-normal tracking-[-0.03em] text-gray-400 dark:text-gray-500 leading-[1.1]">
            The next great technological leap <br />
            <span className="text-[var(--text-primary)] italic pr-4">begins with a single conversation.</span>
          </p>
        </div>

      </motion.div>
    </section>
  );
}
