import { useRef } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Github } from "lucide-react";
import { MagneticButton } from "./ui/Button";

interface ProjectCardProps {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  isReversed: boolean;
  isWorking?: boolean;
  customVisual: React.ReactNode;
}

function ProjectCard({
  number,
  title,
  subtitle,
  description,
  tags,
  githubUrl,
  liveUrl,
  isReversed,
  isWorking,
  customVisual
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  


  return (
    <motion.div 
      ref={cardRef} 
      className={`w-full max-w-[90rem] mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24 mb-32 lg:mb-48 ${isReversed ? 'lg:flex-row-reverse' : ''}`}
    >
      {/* Content Side */}
      <motion.div 
        className="w-full lg:w-[45%] flex flex-col items-start z-20"
        
      >
        <div className="flex items-center gap-6 mb-8">
          <span className="text-[10px] md:text-[11px] font-sans tracking-[0.4em] text-[var(--text-secondary)] uppercase font-medium">
            {number}
          </span>
          <div className="w-12 h-[1px] bg-[var(--border-color)]"></div>
          <span className="h-[50px] w-[401px] text-[26px] text-left font-sans tracking-[0.3em] text-[var(--text-primary)] uppercase font-bold">
            {subtitle}
          </span>
        </div>
        
        <h3 className="font-['Times_New_Roman'] text-[35px] font-bold tracking-[-0.03em] text-[var(--text-primary)] leading-[1.05] mb-8">
          {title}
        </h3>
        
        <p className="font-sans text-[13px] md:text-[15px] text-[var(--text-secondary)] tracking-[0.02em] leading-[1.8] max-w-xl mb-12">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-3 mb-12">
          {tags.map((tag, idx) => (
            <span key={idx} className="px-5 py-2.5 glass-effect rounded-full text-[9px] md:text-[10px] font-sans tracking-[0.2em] text-[var(--text-primary)] uppercase font-medium shadow-ambient hover:bg-[var(--text-primary)] hover:text-[var(--bg-color)] transition-colors duration-500 cursor-default">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 items-center w-full sm:w-auto">
          {isWorking ? (
            <>
              <div className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[var(--text-secondary)]/10 text-[var(--text-secondary)] border border-[var(--border-color)] px-10 py-5 rounded-full text-[10px] tracking-[0.25em] uppercase font-medium cursor-not-allowed">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Currently Working
              </div>
              {githubUrl && (
                <MagneticButton 
                  href={githubUrl}
                  className="w-full sm:w-auto group/btn2 flex items-center justify-center gap-4 bg-transparent text-[var(--text-primary)] glass-effect px-10 py-5 rounded-full text-[10px] tracking-[0.25em] uppercase font-medium hover:bg-[var(--glass-bg)] hover:border-[var(--text-primary)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-lg active:scale-[0.98]"
                >
                  Repository
                  <Github className="w-4 h-4 transform group-hover/btn2:-translate-y-1 transition-transform duration-500" />
                </MagneticButton>
              )}
            </>
          ) : (
            <>
              {(liveUrl || githubUrl) && (
                <MagneticButton href={liveUrl || githubUrl} className="w-full sm:w-auto group/btn flex items-center justify-center gap-4 bg-[var(--text-primary)] text-[var(--bg-color)] px-10 py-5 rounded-full text-[10px] tracking-[0.25em] uppercase font-medium transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:opacity-90 hover:-translate-y-1 hover:shadow-[0_15px_40px_-10px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_15px_40px_-10px_rgba(255,255,255,0.15)] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.15)] active:scale-[0.98]">
                  View Project
                  <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-500" />
                </MagneticButton>
              )}
              {githubUrl && (
                <MagneticButton 
                  href={githubUrl}
                  className="w-full sm:w-auto group/btn2 flex items-center justify-center gap-4 bg-transparent text-[var(--text-primary)] glass-effect px-10 py-5 rounded-full text-[10px] tracking-[0.25em] uppercase font-medium hover:bg-[var(--glass-bg)] hover:border-[var(--text-primary)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-lg active:scale-[0.98]"
                >
                  Repository
                  <Github className="w-4 h-4 transform group-hover/btn2:-translate-y-1 transition-transform duration-500" />
                </MagneticButton>
              )}
            </>
          )}
        </div>
      </motion.div>

      {/* Image Side */}
      <motion.div 
        className="w-full lg:w-[50%] relative h-[50vh] lg:h-[80vh] flex items-center justify-center perspective-[2000px]"
        
      >
        <div className="project-image relative w-full h-full rounded-[2.5rem] overflow-hidden group transition-all duration-[1.5s] ease-[cubic-bezier(0.22,1,0.36,1)] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)] dark:hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.7)] transform-gpu hover:-translate-y-2">
          <motion.div 
            className="absolute inset-0 w-full h-full transform-gpu"
            
          >
            {customVisual}
          </motion.div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-color)] via-transparent to-transparent opacity-40 group-hover:opacity-10 transition-opacity duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-none" />
          <div className="absolute inset-0 bg-black/5 dark:bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] mix-blend-overlay pointer-events-none" />
        </div>
      </motion.div>
    </motion.div>
  );
}

const BlueShiftVisual = () => (
  <div className="w-full h-full bg-[#0a0b10] relative flex items-center justify-center p-4 md:p-8 overflow-hidden group">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#1e3a8a,transparent_60%)] opacity-30 transition-opacity duration-1000 group-hover:opacity-50" />
    <div className="w-full max-w-[80%] aspect-[16/10] bg-[#111116]/80 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl relative flex flex-col p-4 md:p-6 z-10 transition-transform duration-1000 transform-gpu preserve-3d group-hover:scale-105 group-hover:rotate-x-2 group-hover:-rotate-y-2 group-hover:-translate-y-2">
      <div className="w-full h-4 flex items-center gap-2 mb-6">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
      </div>
      <div className="flex-1 flex gap-4 md:gap-6">
        <div className="w-1/3 flex flex-col gap-4">
           <div className="h-10 bg-white/5 rounded-lg w-full flex items-center px-4">
             <div className="w-4 h-4 rounded-full bg-blue-500/50" />
             <div className="h-2 bg-white/20 w-1/2 ml-3 rounded-sm" />
           </div>
           <div className="flex-1 bg-gradient-to-t from-blue-500/10 to-transparent border border-blue-500/20 rounded-xl flex flex-col p-3 justify-end relative overflow-hidden">
             <div className="absolute bottom-0 left-0 w-full h-1/2 bg-blue-500/20 blur-xl" />
             <div className="h-12 bg-blue-500/30 backdrop-blur-md rounded-lg w-full mt-auto border border-blue-400/30 relative z-10" />
           </div>
        </div>
        <div className="w-2/3 flex flex-col gap-4">
          <div className="flex-1 bg-white/5 border border-white/5 rounded-xl p-5 relative overflow-hidden flex flex-col justify-between">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-500/20 blur-2xl rounded-full" />
             <div>
               <div className="h-5 bg-white/10 w-1/3 rounded-md mb-6" />
               <div className="h-2 bg-white/5 w-full rounded-sm mb-3" />
               <div className="h-2 bg-white/5 w-5/6 rounded-sm mb-3" />
               <div className="h-2 bg-white/5 w-4/5 rounded-sm" />
             </div>
             <div className="w-full h-1 bg-white/10 rounded-full mt-6 overflow-hidden">
               <div className="w-2/3 h-full bg-blue-500" />
             </div>
          </div>
        </div>
      </div>
    </div>
    <div className="absolute right-[-5%] top-[15%] w-48 h-32 bg-[#1a1b26]/60 backdrop-blur-3xl border border-white/10 rounded-xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] z-20 transition-transform duration-[1.5s] transform-gpu group-hover:-translate-y-8 group-hover:-translate-x-4 flex flex-col p-4">
       <div className="flex items-center gap-3 mb-4">
         <div className="w-8 h-8 rounded-full bg-blue-500/30 flex items-center justify-center">
            <div className="w-4 h-4 bg-blue-400 rounded-full blur-sm" />
         </div>
         <div className="h-3 bg-white/20 w-1/2 rounded-sm" />
       </div>
       <div className="h-2 bg-white/10 w-full rounded-sm mb-2" />
       <div className="h-2 bg-white/10 w-3/4 rounded-sm" />
    </div>
    <div className="absolute left-[5%] bottom-[15%] w-56 h-20 bg-blue-600/10 backdrop-blur-2xl border border-blue-500/20 rounded-xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] z-20 transition-transform duration-[1.5s] transform-gpu group-hover:translate-y-6 group-hover:translate-x-4 flex items-center px-4">
       <div className="w-10 h-10 rounded-lg bg-blue-500/20 border border-blue-400/30 mr-4" />
       <div className="flex flex-col gap-2 flex-1">
         <div className="h-2.5 bg-white/20 w-2/3 rounded-sm" />
         <div className="h-2 bg-blue-400/50 w-1/2 rounded-sm" />
       </div>
    </div>
  </div>
);

const PustakSetuVisual = () => (
  <div className="w-full h-full bg-[#fafaf9] dark:bg-[#0c0a09] relative flex items-center justify-center p-4 md:p-8 overflow-hidden group">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,#f59e0b,transparent_60%)] opacity-20 dark:opacity-10 transition-opacity duration-1000 group-hover:opacity-40 dark:group-hover:opacity-20" />
    
    <div className="relative z-10 w-full max-w-sm aspect-square flex items-center justify-center transition-transform duration-1000 transform-gpu preserve-3d group-hover:scale-110">
      {/* Isometric Books */}
      <div className="absolute w-48 h-12 bg-amber-600 dark:bg-amber-700 rounded-sm -rotate-[30deg] skew-x-[30deg] translate-y-16 transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] shadow-[20px_20px_40px_rgba(0,0,0,0.1)] dark:shadow-[20px_20px_40px_rgba(0,0,0,0.5)] border-l-[12px] border-amber-800 dark:border-amber-900 group-hover:-translate-y-4 group-hover:-translate-x-4" />
      
      <div className="absolute w-48 h-10 bg-orange-400 dark:bg-orange-500 rounded-sm -rotate-[30deg] skew-x-[30deg] translate-y-4 transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] shadow-[20px_20px_40px_rgba(0,0,0,0.1)] dark:shadow-[20px_20px_40px_rgba(0,0,0,0.5)] border-l-[12px] border-orange-600 dark:border-orange-700 group-hover:-translate-y-16 group-hover:-translate-x-4" />
      
      <div className="absolute w-48 h-10 bg-yellow-300 dark:bg-yellow-400 rounded-sm -rotate-[30deg] skew-x-[30deg] -translate-y-8 transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] shadow-[20px_20px_40px_rgba(0,0,0,0.15)] dark:shadow-[20px_20px_40px_rgba(0,0,0,0.5)] border-l-[12px] border-yellow-500 dark:border-yellow-600 flex items-center justify-center group-hover:-translate-y-28 group-hover:-translate-x-4">
         <div className="w-16 h-1.5 bg-yellow-600/30 rounded-full" />
      </div>
      
      {/* Connection Lines & AI Nodes */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-300" viewBox="0 0 400 400">
        <path d="M200 150 Q 300 100 320 80" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="text-orange-400/50" />
        <path d="M150 250 Q 80 300 60 320" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="text-orange-400/50" />
      </svg>
      
      <div className="absolute right-0 top-12 w-20 h-20 bg-white/80 dark:bg-black/80 border border-orange-200 dark:border-orange-900/50 rounded-2xl shadow-xl flex items-center justify-center backdrop-blur-xl transition-transform duration-[1.5s] transform-gpu group-hover:translate-x-12 group-hover:-translate-y-8">
        <div className="relative flex h-8 w-8">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-20"></span>
          <div className="relative inline-flex rounded-full h-8 w-8 bg-gradient-to-tr from-orange-500 to-yellow-300 items-center justify-center">
             <div className="w-3 h-3 bg-white rounded-full" />
          </div>
        </div>
      </div>
      
      <div className="absolute left-8 bottom-16 w-16 h-16 bg-white/80 dark:bg-black/80 border border-orange-200 dark:border-orange-900/50 rounded-xl shadow-xl flex items-center justify-center backdrop-blur-xl transition-transform duration-[1.5s] transform-gpu group-hover:-translate-x-10 group-hover:translate-y-10">
        <div className="w-6 h-6 border-2 border-orange-400 rounded-lg rotate-45" />
      </div>
    </div>
  </div>
);

const ContactManagerVisual = () => (
  <div className="w-full h-full bg-[#141517] relative flex items-center justify-center p-4 md:p-8 overflow-hidden group">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#2a2b30,transparent_80%)] opacity-40 transition-opacity duration-1000 group-hover:opacity-60" />
    <div className="w-full max-w-[80%] aspect-[16/10] bg-[#1a1b1e] border border-white/5 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.4)] flex flex-col p-4 md:p-5 z-10 transition-transform duration-1000 transform-gpu group-hover:scale-105 group-hover:-rotate-y-4 group-hover:rotate-x-2">
       <div className="flex gap-4 md:gap-5 w-full h-full">
         <div className="w-[28%] bg-[#25262b] rounded-xl flex flex-col gap-3 p-4">
            <div className="h-5 bg-white/10 rounded-md w-3/4 mb-4" />
            <div className="h-8 bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 rounded-md w-full flex items-center px-3" />
            <div className="h-8 bg-white/5 rounded-md w-full" />
            <div className="h-8 bg-white/5 rounded-md w-full" />
            <div className="mt-auto h-10 bg-white/5 rounded-md w-full flex items-center px-3 gap-2">
               <div className="w-6 h-6 rounded-full bg-white/10" />
               <div className="h-2 bg-white/20 w-1/2 rounded-sm" />
            </div>
         </div>
         <div className="flex-1 bg-[#25262b]/50 rounded-xl border border-white/5 p-5 flex flex-col gap-4">
            <div className="flex justify-between items-center mb-2">
               <div className="h-6 bg-white/10 rounded-md w-1/3" />
               <div className="h-8 bg-indigo-500 rounded-lg w-28 flex items-center justify-center">
                 <div className="h-2 bg-white/50 w-1/2 rounded-sm" />
               </div>
            </div>
            {/* List items */}
            {[1,2,3].map(i => (
              <div key={i} className="flex items-center justify-between bg-[#2c2d32] border border-white/5 p-3 rounded-lg group-hover:bg-[#323338] transition-colors duration-500">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-xs">
                     {String.fromCharCode(64 + i)}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="h-2.5 bg-white/30 w-24 rounded-sm" />
                    <div className="h-2 bg-white/10 w-32 rounded-sm" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-md bg-white/5" />
                  <div className="w-6 h-6 rounded-md bg-white/5" />
                </div>
              </div>
            ))}
         </div>
       </div>
    </div>
  </div>
);

const FutureCVVisual = () => (
  <div className="w-full h-full bg-[#050505] relative flex items-center justify-center p-4 md:p-8 overflow-hidden group">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,#4f46e5,transparent_60%)] opacity-20 transition-opacity duration-1000 group-hover:opacity-40" />
    
    <div className="relative w-full max-w-sm aspect-[3/4] flex items-center justify-center z-10">
       {/* Document paper */}
       <div className="absolute w-[75%] h-[85%] bg-white/[0.03] border border-white/10 rounded-lg shadow-2xl backdrop-blur-2xl p-6 flex flex-col gap-5 transition-transform duration-1000 transform-gpu preserve-3d group-hover:-rotate-6 group-hover:scale-105 group-hover:-translate-y-4">
          <div className="flex items-center justify-between mb-2">
            <div className="w-12 h-12 bg-white/10 rounded-full" />
            <div className="flex flex-col gap-2 items-end">
               <div className="w-24 h-2 bg-white/20 rounded-full" />
               <div className="w-16 h-1.5 bg-white/10 rounded-full" />
            </div>
          </div>
          
          <div className="w-full h-[1px] bg-white/10 mb-2" />
          
          <div className="w-1/3 h-2 bg-indigo-400/80 rounded-full mb-1" />
          <div className="w-full h-1.5 bg-white/10 rounded-full" />
          <div className="w-5/6 h-1.5 bg-white/10 rounded-full" />
          <div className="w-4/5 h-1.5 bg-white/10 rounded-full mb-4" />
          
          <div className="flex gap-4">
             <div className="w-1/4 h-2 bg-indigo-400/80 rounded-full" />
             <div className="flex-1 flex flex-col gap-2">
                <div className="w-full h-1.5 bg-white/10 rounded-full" />
                <div className="w-3/4 h-1.5 bg-white/10 rounded-full" />
             </div>
          </div>
       </div>
       
       {/* AI Suggestions floating card */}
       <div className="absolute right-[-10%] top-[20%] w-48 p-4 bg-[#111118]/80 backdrop-blur-2xl border border-indigo-500/30 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-transform duration-1000 transform-gpu group-hover:translate-x-8 group-hover:-translate-y-8 flex flex-col gap-3">
          <div className="flex items-center gap-2 mb-1">
             <div className="w-5 h-5 rounded-md bg-indigo-500/20 flex items-center justify-center">
               <div className="w-2 h-2 rounded-full bg-indigo-400" />
             </div>
             <span className="text-[9px] text-indigo-300 uppercase tracking-widest font-semibold">AI Optimized</span>
          </div>
          <div className="w-full h-1.5 bg-white/20 rounded-full" />
          <div className="w-4/5 h-1.5 bg-white/10 rounded-full" />
       </div>

       {/* Career Analytics chart */}
       <div className="absolute left-[-5%] bottom-[15%] w-40 p-4 bg-[#111118]/80 backdrop-blur-2xl border border-white/10 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-transform duration-1000 transform-gpu group-hover:-translate-x-6 group-hover:translate-y-6">
          <div className="w-1/2 h-2 bg-white/20 rounded-full mb-3" />
          <div className="flex items-end gap-2 h-12">
            <div className="flex-1 bg-white/5 rounded-t-sm h-[40%]" />
            <div className="flex-1 bg-indigo-500/30 rounded-t-sm h-[70%]" />
            <div className="flex-1 bg-indigo-500/60 rounded-t-sm h-[90%]" />
            <div className="flex-1 bg-indigo-500 rounded-t-sm h-[100%]" />
          </div>
       </div>
    </div>
  </div>
);

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <section ref={containerRef} className="relative w-full py-32 overflow-hidden z-40 bg-[var(--bg-color)]" id="projects">
      <div className="max-w-[90rem] mx-auto px-6 md:px-12 mb-32 relative z-10 flex flex-col items-center text-center pt-24">
        <span className="text-xl md:text-2xl lg:text-3xl font-sans tracking-[0.2em] text-[var(--text-primary)] uppercase font-bold mb-8 block">
          Work
        </span>
        <h2 className="font-serif text-5xl md:text-7xl lg:text-[6.5rem] font-normal tracking-[-0.03em] text-[var(--text-primary)] leading-[1.05] max-w-5xl">
          Turning concepts into reality through <span className="italic text-gray-400 dark:text-gray-500 pr-4">design, engineering and AI.</span>
        </h2>
      </div>

      <div className="flex flex-col gap-0 pb-32">
        <ProjectCard 
          number="01"
          title="Roadmap AI"
          subtitle="Flagship Project"
          description="An ambitious AI-driven software initiative focused on building intelligent products that solve real-world problems. By bridging the gap between artificial intelligence and modern cloud technologies, it creates elegant, scalable solutions designed for real impact."
          tags={["AI", "React", "TypeScript", "Node.js", "Cloud"]}
          githubUrl="https://github.com/meet2tanishqpal-sudo/BlueShift-AI"
          liveUrl="https://blueshift-ai-786175523672.us-west1.run.app"
          isWorking={true}
          customVisual={<BlueShiftVisual />}
          isReversed={false}
        />
        
        <ProjectCard 
          number="02"
          title="PustakSetu"
          subtitle="Tech for Social Good"
          description="Developed during the GDG Hackathon to connect book donors with NGOs and students. By leveraging AI-powered book recognition, it breaks down barriers to education, improving accessibility and helping communities share knowledge more effectively."
          tags={["Firebase", "Gemini AI", "Web Tech"]}
          githubUrl="https://github.com/KCAH27dnd/TeamVortex_PustakSetu"
          liveUrl="https://vortex-8d4ee.web.app/"
          customVisual={<PustakSetuVisual />}
          isReversed={true}
        />
        
        <ProjectCard 
          number="03"
          title="Contact Manager"
          subtitle="Reliable Software"
          description="A clean software engineering application demonstrating structured architecture, CRUD operations and efficient data organization. It focuses heavily on core software engineering principles to deliver a robust and reliable user experience."
          tags={["Programming", "Data Management", "Architecture"]}
          githubUrl="https://github.com/tanmay4tyagi/Contact_System"
          customVisual={<ContactManagerVisual />}
          isReversed={false}
        />
        
        <ProjectCard 
          number="04"
          title="FutureCV AI"
          subtitle="Smart Careers"
          description="An AI-powered application that assists users in creating smarter and more professional resumes. Through intelligent automation and advanced LLMs, it distills complex careers into clear, impactful narratives."
          tags={["AI", "React", "LLM", "UI/UX"]}
          githubUrl="https://github.com/meet2tanishqpal-sudo/Ai-resume"
          isWorking={true}
          customVisual={<FutureCVVisual />}
          isReversed={true}
        />
      </div>
    </section>
  );
}
