const fs = require('fs');
let content = fs.readFileSync('src/components/Timeline.tsx', 'utf-8');

// replace useState, useEffect, useId with useInView as well
content = content.replace('import React, { useRef, useEffect, useState, useId } from "react";', 'import React, { useRef, useEffect, useState, useId } from "react";\nimport { useInView } from "motion/react";');

// update Gallery
content = content.replace(`const Gallery = ({ type, images }: { type?: string, images: string[] }) => {
  const galleryId = useId();
  const [heroIndex, setHeroIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered || images.length <= 1) return;
    
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % images.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [isHovered, images.length]);`, `const Gallery = ({ type, images }: { type?: string, images: string[] }) => {
  const galleryId = useId();
  const [heroIndex, setHeroIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "100px 0px" });

  useEffect(() => {
    if (isHovered || images.length <= 1 || !isInView) return;
    
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % images.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [isHovered, images.length, isInView]);`);

// Add ref to Gallery root div
content = content.replace(`<div 
      className="relative w-full h-[320px] md:h-[400px] lg:h-[480px] flex items-center justify-center"`, `<div ref={ref}
      className="relative w-full h-[320px] md:h-[400px] lg:h-[480px] flex items-center justify-center"`);


// Remove scrub and add intersection observer to DesktopTimeline and MobileTimeline
// DesktopTimeline
content = content.replace(`        gsap.fromTo(content, 
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, scrollTrigger: { trigger: row, start: "top 75%", end: "top 45%", scrub: 1 } }
        );

        gsap.fromTo(gallery,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, scrollTrigger: { trigger: row, start: "top 75%", end: "top 45%", scrub: 1 } }
        );

        gsap.to(node, {
          backgroundColor: "var(--text-primary)",
          scale: 1.5,
          scrollTrigger: { trigger: row, start: "top 60%", end: "top 40%", scrub: 1 }
        });`, `        gsap.fromTo(content, 
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: row, start: "top 80%" } }
        );

        gsap.fromTo(gallery,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: row, start: "top 80%" } }
        );

        gsap.to(node, {
          backgroundColor: "var(--text-primary)",
          scale: 1.5,
          duration: 0.4,
          scrollTrigger: { trigger: row, start: "top 60%" }
        });`);

// MobileTimeline
content = content.replace(`      gsap.fromTo(content, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, scrollTrigger: { trigger: row, start: "top 85%", end: "top 55%", scrub: 1 } }
      );

      gsap.to(node, {
        backgroundColor: "var(--text-primary)",
        scale: 1.3,
        scrollTrigger: { trigger: row, start: "top 75%", end: "top 50%", scrub: 1 }
      });

      if (line) {
        gsap.fromTo(line, { scaleY: 0 }, { scaleY: 1, scrollTrigger: { trigger: row, start: "top 70%", end: "bottom 70%", scrub: 1 }, ease: "none" });
      }`, `      gsap.fromTo(content, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: row, start: "top 85%" } }
      );

      gsap.to(node, {
        backgroundColor: "var(--text-primary)",
        scale: 1.3,
        duration: 0.4,
        scrollTrigger: { trigger: row, start: "top 75%" }
      });

      if (line) {
        gsap.fromTo(line, { scaleY: 0 }, { scaleY: 1, scrollTrigger: { trigger: row, start: "top 70%", end: "bottom 70%", scrub: 0.5 }, ease: "none" });
      }`);

fs.writeFileSync('src/components/Timeline.tsx', content);
