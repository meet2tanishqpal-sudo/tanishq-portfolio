import { useState } from "react";
import { ReactLenis } from "lenis/react";
import { AnimatePresence, motion } from "motion/react";
import Loader from "./components/Loader";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import About from "./components/About";
import Timeline from "./components/Timeline";
import Projects from "./components/Projects";
import Craftsmanship from "./components/Craftsmanship";
import Contact from "./components/Contact";
import Cursor from "./components/Cursor";
import Background from "./components/Background";

export default function App() {
  const [loading, setLoading] = useState(true);


  return (
    <ReactLenis root options={{
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      wheelMultiplier: 1,
      touchMultiplier: 2,
    }}>
    <div className="relative bg-[var(--bg-color)] text-[var(--text-primary)] min-h-screen transition-colors duration-500">
      <Cursor />
      <Background />
      <AnimatePresence>
        {loading && <Loader key="loader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.div 
          initial={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)", opacity: 0 }} 
          animate={{ clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)", opacity: 1 }} 
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Navigation />
          <main>
            <Hero />
            <About />
            <Timeline />
            <Projects />
            <Craftsmanship />
            <Contact />
          </main>
        </motion.div>
      )}
    </div>
    </ReactLenis>
  );
}
