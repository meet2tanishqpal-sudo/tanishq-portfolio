import React, { useRef, useEffect, useState, useId } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { motion, useScroll, useTransform } from "motion/react";
import { Award, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const chapters = [
  {
    id: "toastmasters",
    title: "Toastmasters Leadership Journey",
    theme: "COMMUNICATION & LEADERSHIP",
    description: "Improving communication, leadership, and public speaking through consistent participation, speeches, and leadership responsibilities.",
    badges: [
      "VP-PR Associate — Indirapuram Toastmasters Club",
      "4× Best Speaker Awards",
      "3× Best Role Player",
      "Star of the Month Award"
    ],
    images: [
      "/projects/WhatsApp Image 2026-07-05 at 1.33.49 PM.jpeg",
      "/projects/WhatsApp Image 2026-07-09 at 6.22.50 PM.jpeg",
      "/projects/WhatsApp Image 2026-07-09 at 6.35.14 PM.jpeg"
    ],
    galleryType: "stacked"
  },
  {
    id: "google",
    title: "Google Developer Events",
    theme: "NETWORKING & AI",
    description: "Attended multiple Google developer events, workshops, and networking sessions to learn about AI, cloud technologies, software engineering, and modern developer tools while connecting with industry professionals.",
    images: [
      "/projects/WhatsApp Image 2026-07-09 at 6.22.28 PM.jpeg",
      "/projects/WhatsApp Image 2026-07-09 at 6.23.55 PM.jpeg",
      "/projects/WhatsApp Image 2026-07-09 at 6.24.42 PM.jpeg",
      "/projects/WhatsApp Image 2026-07-09 at 6.27.04 PM.jpeg"
    ],
    galleryType: "hero-thumbnails"
  },
  {
    id: "iit-delhi",
    title: "IIT Delhi Tech Experience",
    theme: "TECH COMPETITIONS",
    description: "Participated in technical events and competitions, gaining exposure to innovation, engineering culture, and collaborative problem-solving.",
    badge: "🏆 1st Place — Tech Meme Competition",
    images: [
      "/projects/WhatsApp Image 2026-07-09 at 6.27.35 PM.jpeg",
      "/projects/WhatsApp Image 2026-07-09 at 6.39.51 PM.jpeg"
    ],
    galleryType: "editorial"
  },
  {
    id: "ai-summit",
    title: "India AI Summit",
    theme: "AI & INNOVATION",
    description: "Explored cutting-edge developments in Artificial Intelligence, cloud infrastructure, and emerging technologies while interacting with startups, researchers, and industry leaders.",
    images: [
      "/projects/WhatsApp Image 2026-07-09 at 6.27.57 PM.jpeg",
      "/projects/WhatsApp Image 2026-07-09 at 6.28.13 PM.jpeg",
      "/projects/WhatsApp Image 2026-07-09 at 6.39.21 PM.jpeg"
    ],
    galleryType: "overlapping"
  }
];

const getBadgeLink = (badge: string) => {
  if (badge.includes("Star of the Month Award")) return "https://www.linkedin.com/posts/tanishq-pal-475a852a8_when-i-first-joined-toastmasters-i-made-activity-7421247754175197184-Naj6";
  if (badge.includes("4× Best Speaker Awards")) return "https://www.linkedin.com/posts/tanishq-pal-475a852a8_today-i-delivered-my-l1p2-speech-desire-activity-7413560945039294464-drsT";
  if (badge.includes("3× Best Role Player")) return "https://www.linkedin.com/posts/tanishq-pal-475a852a8_toastmasters-communicationskills-leadership-activity-7473739702161022976-jMxl";
  if (badge.includes("1st Place — Tech Meme Competition")) return "https://www.linkedin.com/posts/tanishq-pal-475a852a8_iitdelhi-tryst26-techmeme-activity-7433557459031511040-IFch";
  return null;
}

const Gallery = ({ type, images }: { type?: string, images: string[] }) => {
  const galleryId = useId();
  const [heroIndex, setHeroIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered || images.length <= 1) return;
    
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % images.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [isHovered, images.length]);

  return (
    <div 
      className="relative w-full h-[320px] md:h-[400px] lg:h-[480px] flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setTimeout(() => setIsHovered(false), 1000)}
    >
      <div className="flex w-full h-full items-center justify-center">
        {/* Hero Column */}
        <div className="flex-[1.2] flex items-center justify-end h-full relative z-30">
          {images.map((img, i) => {
            const relIndex = (i - heroIndex + images.length) % images.length;
            if (relIndex !== 0) return null;
            return (
              <motion.img
                key={img}
                layoutId={`gallery-${galleryId}-${img}`}
                src={img}
                alt="Gallery Hero"
                onClick={() => setHeroIndex(i)}
                className="max-w-full max-h-[96%] w-auto h-auto object-contain rounded-[12px] shadow-[0_4px_24px_rgba(0,0,0,0.06)] cursor-pointer relative z-30"
                whileHover={{ scale: 1.03, y: -4, filter: "brightness(1.05)" }}
                transition={{ type: "spring", stiffness: 120, damping: 20, duration: 0.8 }}
              />
            );
          })}
        </div>

        {/* Secondary Column */}
        {images.length > 1 && (
          <div className="flex-1 flex flex-col items-start justify-center h-full -ml-4 md:-ml-6 relative z-20">
            {/* Top Secondary */}
            <div className="w-full h-[46%] flex items-end justify-start relative z-20 mb-[-8px] md:mb-[-12px]">
              {images.map((img, i) => {
                const relIndex = (i - heroIndex + images.length) % images.length;
                if (relIndex !== 1) return null;
                return (
                  <motion.img
                    key={img}
                    layoutId={`gallery-${galleryId}-${img}`}
                    src={img}
                    alt="Gallery Support 1"
                    onClick={() => setHeroIndex(i)}
                    className="max-w-[90%] max-h-[95%] w-auto h-auto object-contain rounded-[10px] shadow-[0_2px_16px_rgba(0,0,0,0.04)] cursor-pointer relative z-20"
                    whileHover={{ scale: 1.03, y: -4, filter: "brightness(1.05)", zIndex: 40 }}
                    transition={{ type: "spring", stiffness: 120, damping: 20, duration: 0.8 }}
                  />
                );
              })}
            </div>

            {/* Bottom Secondary */}
            {images.length > 2 && (
              <div className="w-full h-[46%] flex items-start justify-start relative z-10 mt-[-8px] md:mt-[-12px]">
                {images.map((img, i) => {
                  const relIndex = (i - heroIndex + images.length) % images.length;
                  if (relIndex !== 2) return null;
                  return (
                    <motion.img
                      key={img}
                      layoutId={`gallery-${galleryId}-${img}`}
                      src={img}
                      alt="Gallery Support 2"
                      onClick={() => setHeroIndex(i)}
                      className="max-w-[85%] max-h-[95%] w-auto h-auto object-contain rounded-[10px] shadow-[0_2px_16px_rgba(0,0,0,0.04)] cursor-pointer relative z-10"
                      whileHover={{ scale: 1.03, y: -4, filter: "brightness(1.05)", zIndex: 40 }}
                      transition={{ type: "spring", stiffness: 120, damping: 20, duration: 0.8 }}
                    />
                  );
                })}
              </div>
            )}
            
            {/* Hidden items (for smooth layout transition when they cycle in/out) */}
            {images.length > 3 && images.map((img, i) => {
              const relIndex = (i - heroIndex + images.length) % images.length;
              if (relIndex < 3) return null;
              return (
                <div key={`hidden-wrap-${img}`} className="absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none -z-10">
                  <motion.img
                    layoutId={`gallery-${galleryId}-${img}`}
                    src={img}
                    className="max-w-[50%] max-h-[50%] object-contain rounded-[10px]"
                    transition={{ type: "spring", stiffness: 120, damping: 20, duration: 0.8 }}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

const DesktopTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [svgPath, setSvgPath] = useState("");

  const updatePath = () => {
    if (!containerRef.current) return;
    const nodes = Array.from(containerRef.current.querySelectorAll('.desktop-node'));
    if (nodes.length < 2) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    
    let d = "";
    
    nodes.forEach((node, i) => {
      const rect = node.getBoundingClientRect();
      const x = rect.left - containerRect.left + rect.width / 2;
      const y = rect.top - containerRect.top + rect.height / 2;

      if (i === 0) {
        d += `M ${x} ${y} `;
      } else {
        const r = 40;
        const prevRect = nodes[i - 1].getBoundingClientRect();
        const prevX = prevRect.left - containerRect.left + prevRect.width / 2;
        
        const prevRowRect = nodes[i - 1].closest('.timeline-row')!.getBoundingClientRect();
        const prevRowBottom = prevRowRect.bottom - containerRect.top;
        
        const currRowRect = node.closest('.timeline-row')!.getBoundingClientRect();
        const currRowTop = currRowRect.top - containerRect.top;
        
        const crossY = (prevRowBottom + currRowTop) / 2;
        
        const isLtoR = prevX < x;

        if (isLtoR) {
          d += `L ${prevX} ${crossY - r} `;
          d += `Q ${prevX} ${crossY} ${prevX + r} ${crossY} `;
          d += `L ${x - r} ${crossY} `;
          d += `Q ${x} ${crossY} ${x} ${crossY + r} `;
          d += `L ${x} ${y} `;
        } else {
          d += `L ${prevX} ${crossY - r} `;
          d += `Q ${prevX} ${crossY} ${prevX - r} ${crossY} `;
          d += `L ${x + r} ${crossY} `;
          d += `Q ${x} ${crossY} ${x} ${crossY + r} `;
          d += `L ${x} ${y} `;
        }
      }
    });

    const lastNode = nodes[nodes.length - 1];
    const lastRowRect = lastNode.closest('.timeline-row')!.getBoundingClientRect();
    const lastX = lastNode.getBoundingClientRect().left - containerRect.left + lastNode.getBoundingClientRect().width / 2;
    const lastY = lastRowRect.bottom - containerRect.top;
    
    d += `L ${lastX} ${lastY}`;
    setSvgPath(d);
  };

  useEffect(() => {
    setTimeout(updatePath, 200);
    window.addEventListener('resize', updatePath);
    return () => window.removeEventListener('resize', updatePath);
  }, []);

  useEffect(() => {
    if (!pathRef.current || !svgPath || !containerRef.current) return;
    
    const length = pathRef.current.getTotalLength();
    gsap.set(pathRef.current, { strokeDasharray: length, strokeDashoffset: length });

    const anim = gsap.to(pathRef.current, { strokeDashoffset: 0, ease: "none" });
    
    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 60%",
      end: "bottom 80%",
      scrub: 1,
      animation: anim
    });

    const rows = gsap.utils.toArray('.timeline-row');
    rows.forEach((row: any) => {
      const content = row.querySelector('.content-block');
      const gallery = row.querySelector('.gallery-block');
      const node = row.querySelector('.desktop-node');

      gsap.fromTo(content, 
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, scrollTrigger: { trigger: row, start: "top 75%", end: "top 45%", scrub: 1 } }
      );
      
      gsap.fromTo(gallery, 
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, scrollTrigger: { trigger: row, start: "top 75%", end: "top 45%", scrub: 1 } }
      );

      gsap.to(node, {
        backgroundColor: "var(--text-primary)",
        boxShadow: "0 0 20px var(--text-primary)",
        scale: 1.5,
        scrollTrigger: { trigger: row, start: "top 60%", end: "top 40%", scrub: 1 }
      });
    });

    return () => {
      st.kill();
      anim.kill();
    };
  }, [svgPath]);

  return (
    <div className="hidden lg:block relative w-full max-w-[85rem] mx-auto px-12 pb-32" ref={containerRef}>      
      <svg className="will-change-transform absolute inset-0 w-full h-full pointer-events-none z-0">
        <path d={svgPath} fill="none" stroke="var(--border-color-light)" strokeWidth="2" />
        <path ref={pathRef} d={svgPath} fill="none" stroke="var(--text-primary)" strokeWidth="3" />
      </svg>

      <div className="flex flex-col gap-24 xl:gap-32 relative z-10 pt-16">
        {chapters.map((chapter, i) => {
          const isLeft = i % 2 === 0;
          return (
            <div key={chapter.id} className={`timeline-row relative flex w-full items-center gap-12 xl:gap-20 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
              
              <div className="desktop-node w-4 h-4 rounded-full border-[3px] border-[var(--text-primary)] bg-[var(--bg-color)] shrink-0 transition-colors duration-500 relative z-20" />
              
              <div className={`flex-1 flex items-center gap-12 xl:gap-20 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className="content-block w-full lg:w-[55%] flex flex-col items-start text-left shrink-0">
                  <span className="text-xs xl:text-sm font-sans tracking-[0.4em] text-[var(--text-primary)] opacity-60 uppercase font-bold mb-6 block">
                    {chapter.theme}
                  </span>
                  <h3 className="font-serif text-5xl xl:text-6xl font-medium tracking-tight text-[var(--text-primary)] leading-[1] mb-8">
                    {chapter.title}
                  </h3>
                  <p className="font-sans text-[14px] xl:text-[15px] text-[var(--text-secondary)] tracking-[0.02em] leading-[1.8] max-w-md">
                    {chapter.description}
                  </p>
                  {chapter.badges && (
                    <div className="flex flex-col gap-3 mt-8 w-full max-w-sm">
                      {chapter.badges.map((b, idx) => {
                        const link = getBadgeLink(b);
                        return (
                          <a 
                            key={idx} 
                            href={link || "#"}
                            target={link ? "_blank" : undefined}
                            rel={link ? "noopener noreferrer" : undefined}
                            className={`font-sans text-[15px] text-[var(--text-primary)] flex items-center justify-between p-3.5 rounded-lg border border-[var(--border-color-light)] bg-[var(--card-bg)] shadow-[0_4px_12px_rgba(0,0,0,0.02)] transition-all duration-300 ${link ? 'hover:-translate-y-1 hover:shadow-lg hover:border-[var(--border-color)] cursor-pointer group' : ''}`}
                          >
                            <div className="flex items-center gap-4">
                              <Award className="w-4 h-4 opacity-40 shrink-0 group-hover:opacity-100 transition-opacity" />
                              <span className="opacity-90 font-medium tracking-[0.01em]">{b}</span>
                            </div>
                            {link && <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />}
                          </a>
                        );
                      })}
                    </div>
                  )}
                  {chapter.badge && (
                     <a href={getBadgeLink(chapter.badge) || "#"} target={getBadgeLink(chapter.badge) ? "_blank" : undefined} rel={getBadgeLink(chapter.badge) ? "noopener noreferrer" : undefined} className={`mt-8 font-sans text-[15px] text-[var(--text-primary)] px-5 py-3.5 border border-[var(--border-color)] rounded-lg flex items-center justify-between gap-4 bg-[var(--card-bg)] shadow-[0_4px_12px_rgba(0,0,0,0.02)] transition-all duration-300 ${getBadgeLink(chapter.badge) ? 'hover:-translate-y-1 hover:shadow-lg hover:border-[var(--text-primary)] cursor-pointer group' : ''}`}>
                       <div className="flex items-center gap-4">
                         <Award className="w-4 h-4 opacity-40 shrink-0 group-hover:opacity-100 transition-opacity" />
                         <span className="opacity-90 font-medium tracking-[0.01em]">{chapter.badge.replace('🏆 ', '')}</span>
                       </div>
                       {getBadgeLink(chapter.badge) && <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />}
                     </a>
                  )}
                </div>
                
                <div className="gallery-block w-full lg:w-[45%] shrink-0">
                  <Gallery type={chapter.galleryType} images={chapter.images} />
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

const MobileTimeline = () => {
  useEffect(() => {
    const rows = gsap.utils.toArray('.mobile-row');
    rows.forEach((row: any) => {
      const node = row.querySelector('.mobile-node');
      const line = row.querySelector('.mobile-line-active');
      const content = row.querySelector('.mobile-content');

      gsap.fromTo(content, 
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
      }
    });
  }, []);

  return (
    <div className="block lg:hidden w-full px-6 py-20 relative">
      <div className="relative pl-6">
        {chapters.map((chapter, i) => (
          <div key={chapter.id} className="mobile-row relative pb-24">
            {i !== chapters.length - 1 && (
              <div className="will-change-transform absolute left-[3px] top-4 bottom-[-2rem] w-[2px] bg-[var(--border-color-light)]">
                <div className="mobile-line-active w-full h-full bg-[var(--text-primary)] origin-top" />
              </div>
            )}
            
            <div className="mobile-node absolute left-0 top-2 w-[8px] h-[8px] rounded-full border-[2px] border-[var(--text-primary)] bg-[var(--bg-color)] z-10 -translate-x-[3px]" />

            <div className="mobile-content pl-6 flex flex-col gap-10">
              <div className="flex flex-col">
                <span className="text-[11px] font-sans tracking-[0.4em] text-[var(--text-primary)] opacity-60 uppercase font-bold mb-5 block">
                  {chapter.theme}
                </span>
                <h3 className="font-serif text-4xl font-medium tracking-tight text-[var(--text-primary)] leading-[1] mb-6">
                  {chapter.title}
                </h3>
                <p className="font-sans text-[13px] text-[var(--text-secondary)] tracking-[0.02em] leading-[1.8]">
                  {chapter.description}
                </p>
                {chapter.badges && (
                    <div className="flex flex-col gap-3 mt-8">
                      {chapter.badges.map((b, idx) => {
                        const link = getBadgeLink(b);
                        return (
                          <a 
                            key={idx} 
                            href={link || "#"}
                            target={link ? "_blank" : undefined}
                            rel={link ? "noopener noreferrer" : undefined}
                            className={`font-sans text-[15px] text-[var(--text-primary)] flex items-center justify-between p-3 rounded-lg border border-[var(--border-color-light)] bg-[var(--card-bg)] shadow-[0_4px_12px_rgba(0,0,0,0.02)] dark:shadow-[0_4px_12px_rgba(255,255,255,0.02)] transition-all duration-300 ${link ? 'hover:-translate-y-1 hover:shadow-lg hover:border-[var(--border-color)] cursor-pointer group' : ''}`}
                          >
                            <div className="flex items-center gap-3">
                              <Award className="w-3.5 h-3.5 opacity-40 shrink-0 group-hover:opacity-100 transition-opacity" />
                              <span className="opacity-90 font-medium tracking-[0.01em]">{b}</span>
                            </div>
                            {link && <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />}
                          </a>
                        );
                      })}
                    </div>
                  )}
                  {chapter.badge && (
                     <a href={getBadgeLink(chapter.badge) || "#"} target={getBadgeLink(chapter.badge) ? "_blank" : undefined} rel={getBadgeLink(chapter.badge) ? "noopener noreferrer" : undefined} className={`mt-8 font-sans text-[15px] text-[var(--text-primary)] px-4 py-3 border border-[var(--border-color)] rounded-lg flex items-center justify-between gap-3 bg-[var(--card-bg)] shadow-[0_4px_12px_rgba(0,0,0,0.02)] w-max max-w-full transition-all duration-300 ${getBadgeLink(chapter.badge) ? 'hover:-translate-y-1 hover:shadow-lg hover:border-[var(--text-primary)] cursor-pointer group' : ''}`}>
                       <div className="flex items-center gap-3">
                         <Award className="w-3.5 h-3.5 opacity-40 shrink-0 group-hover:opacity-100 transition-opacity" />
                         <span className="opacity-90 font-medium tracking-[0.01em] truncate">{chapter.badge.replace('🏆 ', '')}</span>
                       </div>
                       {getBadgeLink(chapter.badge) && <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />}
                     </a>
                  )}
              </div>

              <div className="w-full">
                <Gallery type={chapter.galleryType} images={chapter.images} />
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default function Timeline() {
  return (
    <section id="timeline" className="relative w-full bg-[var(--bg-color)] z-40 overflow-hidden">
      <div className="max-w-[90rem] mx-auto pt-32 px-6 lg:px-12 mb-16 lg:mb-24 flex flex-col items-center text-center">
        <span className="text-xl md:text-2xl lg:text-3xl font-sans tracking-[0.2em] text-[var(--text-primary)] uppercase font-bold mb-8 block">
          Experience
        </span>
        <h2 className="font-serif text-5xl md:text-7xl lg:text-[6.5rem] font-normal tracking-[-0.03em] text-[var(--text-primary)] leading-[1.05] max-w-5xl">
          The chapters that shaped my <span className="italic text-gray-400 dark:text-gray-500 pr-4">growth.</span>
        </h2>
      </div>

      <DesktopTimeline />
      <MobileTimeline />
      
    </section>
  );
}
