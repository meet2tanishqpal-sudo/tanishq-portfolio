import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "motion/react";
import { Moon, Sun, Menu, X } from "lucide-react";

export default function Navigation() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [theme, setTheme] = useState("light");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let localTheme = "light";
    try {
      localTheme = localStorage.getItem("theme") || "light";
    } catch (e) {
      console.warn("localStorage not available");
    }
    setTheme(localTheme);
    if (localTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    
    // Prevent scrolling when mobile menu is open
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileMenuOpen]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    try {
      localStorage.setItem("theme", newTheme);
    } catch (e) {
      console.warn("localStorage not available");
    }
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
    
    const sections = ['about', 'timeline', 'projects', 'craftsmanship', 'contact'];
    let current = "";
    
    // Check backwards to highlight the deepest scrolled section
    for (const section of [...sections].reverse()) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2.5) {
          current = section;
          break;
        }
      }
    }
    if (current !== activeSection) setActiveSection(current);
  });

  const navItems = ['About', 'Timeline', 'Projects', 'Craftsmanship', 'Contact'];

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-[0.8s] ease-[cubic-bezier(0.22,1,0.36,1)] ${isScrolled ? 'py-4 md:py-6 pointer-events-none' : 'py-6 md:py-8 pointer-events-none'}`}
      >
        <div className={`mx-auto flex items-center justify-between transition-all duration-[0.8s] ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-auto ${isScrolled ? 'w-[90%] md:max-w-[48rem] px-5 py-3 rounded-full glass-effect shadow-[0_8px_30px_-10px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_30px_-10px_rgba(255,255,255,0.05)] bg-[var(--nav-bg)]' : 'w-full max-w-[90rem] px-6 md:px-12 bg-transparent'}`}>
          
          <div 
            className={`font-serif tracking-tight font-normal text-[var(--text-primary)] cursor-pointer transition-all duration-500 hover:opacity-70 origin-left ${isScrolled ? 'text-xl' : 'text-xl md:text-2xl'}`}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Home
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            <div className="hidden md:flex relative items-center gap-1">
              {navItems.map((item) => {
                const id = item.toLowerCase();
                const isActive = activeSection === id;
                
                return (
                  <a 
                    key={item} 
                    href={`#${id}`} 
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`relative px-4 py-2 text-[10px] tracking-[0.2em] uppercase font-medium transition-colors duration-500 z-10 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-offset-[var(--nav-bg)] rounded-sm ${isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`}
                  >
                    {item}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute inset-0 bg-[var(--border-color)] dark:bg-[var(--border-color-light)] rounded-full -z-10"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
            </div>
            
            <div className="w-[1px] h-4 bg-[var(--border-color-light)] hidden md:block"></div>
            
            <button 
              onClick={toggleTheme}
              className="w-10 h-10 md:w-10 md:h-10 rounded-full flex items-center justify-center text-[var(--text-primary)] transition-all duration-300 hover:scale-110 active:scale-95 hover:bg-[var(--border-color-light)] border border-transparent focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-offset-[var(--nav-bg)]"
              aria-label="Toggle Theme"
            >
              <AnimatePresence mode="wait">
                {theme === "light" ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Sun size={18} strokeWidth={1.5} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Moon size={18} strokeWidth={1.5} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
            
            {/* Mobile Menu Toggle Button */}
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-[var(--text-primary)] transition-all duration-300 hover:scale-110 active:scale-95 hover:bg-[var(--border-color-light)] border border-transparent focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-offset-[var(--nav-bg)]"
              aria-label="Open Menu"
            >
              <Menu size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Full-Screen Overlay Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[200] bg-[var(--bg-primary)]/95 backdrop-blur-lg flex flex-col justify-center items-center pointer-events-auto"
          >
            {/* Close Button */}
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-6 right-6 md:top-8 md:right-12 w-12 h-12 rounded-full flex items-center justify-center text-[var(--text-primary)] transition-all duration-300 active:scale-95 hover:bg-[var(--border-color-light)]"
              aria-label="Close Menu"
            >
              <X size={24} strokeWidth={1.5} />
            </button>

            {/* Menu Items */}
            <div className="flex flex-col items-center gap-6 w-full max-w-sm px-6">
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 300);
                }}
                className="font-serif text-4xl text-[var(--text-primary)] hover:opacity-70 transition-opacity"
              >
                Home
              </motion.a>
              
              <div className="w-12 h-[1px] bg-[var(--border-color)] my-2"></div>

              {navItems.map((item, index) => {
                const id = item.toLowerCase();
                return (
                  <motion.a
                    key={item}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, delay: 0.15 + index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    href={`#${id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setMobileMenuOpen(false);
                      setTimeout(() => {
                        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                      }, 300);
                    }}
                    className="text-xl tracking-[0.15em] uppercase font-medium text-[var(--text-primary)] hover:opacity-70 transition-opacity"
                  >
                    {item}
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
