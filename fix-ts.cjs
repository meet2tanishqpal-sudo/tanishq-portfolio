const fs = require('fs');

// Fix Hero.tsx
let heroContent = fs.readFileSync('src/components/Hero.tsx', 'utf-8');
heroContent = heroContent.replace(/  const yText = useTransform.*?;\n/g, '');
heroContent = heroContent.replace(/  const opacityText = useTransform.*?;\n/g, '');
heroContent = heroContent.replace(/  const yImage = useTransform.*?;\n/g, '');
heroContent = heroContent.replace(/  const opacityImage = useTransform.*?;\n/g, '');
heroContent = heroContent.replace(/  const { scrollYProgress } = useScroll.*?\n    offset: \["start start", "end start"\]\n  \}\);\n/gs, '');
fs.writeFileSync('src/components/Hero.tsx', heroContent);

// Fix Projects.tsx
let projContent = fs.readFileSync('src/components/Projects.tsx', 'utf-8');
projContent = projContent.replace(/  const opacity = useTransform.*?;\n/g, '');
projContent = projContent.replace(/  const y = useTransform.*?;\n/g, '');
projContent = projContent.replace(/  const scale = useTransform.*?;\n/g, '');
projContent = projContent.replace(/  const { scrollYProgress } = useScroll.*?\n    offset: \["start 85%", "end 30%"\]\n  \}\);\n/gs, '');
projContent = projContent.replace(/style=\{\{ y: useTransform\(scrollYProgress, \[0, 1\], \[-20, 20\]\) \}\}/g, '');
fs.writeFileSync('src/components/Projects.tsx', projContent);

