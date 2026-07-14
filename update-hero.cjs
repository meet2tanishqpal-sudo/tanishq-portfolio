const fs = require('fs');
let content = fs.readFileSync('src/components/Hero.tsx', 'utf-8');

content = content.replace('import { motion, useScroll, useTransform, useSpring, useMotionValue } from "motion/react";', 'import { motion, useSpring, useMotionValue } from "motion/react";');

const oldHeroStart = `export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Custom cursor logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 25, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 25, mass: 0.5 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const yImage = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const opacityImage = useTransform(scrollYProgress, [0, 0.8], [1, 0]);`;

const newHeroStart = `export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Custom cursor logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 25, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 25, mass: 0.5 });`;

content = content.replace(oldHeroStart, newHeroStart);

content = content.replace(/style={{ y: yText, opacity: opacityText }}/g, '');
content = content.replace(/style={{ y: yImage, opacity: opacityImage }}/g, '');

fs.writeFileSync('src/components/Hero.tsx', content);
