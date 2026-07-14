const fs = require('fs');
let content = fs.readFileSync('src/components/Projects.tsx', 'utf-8');

// replace useScroll, useTransform
content = content.replace('import { motion, useScroll, useTransform } from "motion/react";', 'import { motion } from "motion/react";');

const oldCardCode = `function ProjectCard({ 
  title, 
  subtitle, 
  description, 
  tech, 
  liveLink, 
  githubLink, 
  customVisual, 
  reverse 
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 85%", "end 30%"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.4], [100, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);

  return (
    <motion.div 
      ref={cardRef}
      style={{ opacity, y, scale }}
      className={\`flex flex-col gap-12 \${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center mb-40 last:mb-0\`}
    >
      <div className="w-full lg:w-1/2 h-[500px] lg:h-[700px] relative">
        {/* Background glow behind image */}
        <div className="absolute inset-0 bg-[#F6E8C3] dark:bg-[#4A4232] blur-[120px] opacity-10 rounded-full translate-y-10" />
        
        {/* Project Visual Container */}
        <div className="project-image relative w-full h-full rounded-[2.5rem] overflow-hidden group transition-all duration-[1.5s] ease-[cubic-bezier(0.22,1,0.36,1)] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)] dark:hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.7)] transform-gpu hover:-translate-y-2">
          <motion.div 
            className="absolute inset-0 w-full h-full transform-gpu"
            style={{ y: useTransform(scrollYProgress, [0, 1], [-20, 20]) }}
          >
            {customVisual}
          </motion.div>`;

const newCardCode = `function ProjectCard({ 
  title, 
  subtitle, 
  description, 
  tech, 
  liveLink, 
  githubLink, 
  customVisual, 
  reverse 
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div 
      ref={cardRef}
      initial={{ opacity: 0, y: 100, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={\`flex flex-col gap-12 \${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center mb-40 last:mb-0\`}
    >
      <div className="w-full lg:w-1/2 h-[500px] lg:h-[700px] relative">
        {/* Background glow behind image */}
        <div className="absolute inset-0 bg-[#F6E8C3] dark:bg-[#4A4232] blur-[80px] opacity-[0.05] rounded-full translate-y-10" />
        
        {/* Project Visual Container */}
        <div className="project-image relative w-full h-full rounded-[2.5rem] overflow-hidden group transition-all duration-[1.5s] ease-[cubic-bezier(0.22,1,0.36,1)] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2)] transform-gpu hover:-translate-y-2">
          <div className="absolute inset-0 w-full h-full transform-gpu">
            {customVisual}
          </div>`;

content = content.replace(oldCardCode, newCardCode);
fs.writeFileSync('src/components/Projects.tsx', content);
