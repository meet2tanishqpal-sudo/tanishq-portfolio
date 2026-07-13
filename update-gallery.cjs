const fs = require('fs');
const content = fs.readFileSync('src/components/Timeline.tsx', 'utf-8');

const newGallery = `const Gallery = ({ type, images }: { type?: string, images: string[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [frontIndex, setFrontIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    if (isInteracting || !type || type === "default") return;
    
    const interval = setInterval(() => {
      setFrontIndex((prev) => (prev + 1) % images.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [isInteracting, images.length, type]);

  const handleInteractionStart = () => setIsInteracting(true);
  const handleInteractionEnd = () => {
    setTimeout(() => setIsInteracting(false), 1000);
  };

  if (!type || type === "default") {
    return (
      <div className="flex flex-col gap-6">
        {images.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="w-full rounded-xl overflow-hidden"
          >
            <img src={img} alt="Gallery image" className="max-w-full h-auto object-contain pointer-events-none rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] mix-blend-multiply dark:mix-blend-normal" />
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[300px] md:h-[420px] flex items-center justify-center perspective-[1000px]"
      onMouseEnter={handleInteractionStart}
      onMouseLeave={handleInteractionEnd}
      onTouchStart={handleInteractionStart}
      onTouchEnd={handleInteractionEnd}
    >
      {images.map((img, i) => {
        let relPos = 2; // hidden by default
        if (i === frontIndex) relPos = 0;
        else if (i === (frontIndex + 1) % images.length) relPos = 1;
        else if (i === (frontIndex - 1 + images.length) % images.length) relPos = -1;
        
        if (images.length === 2 && i !== frontIndex) relPos = 1;
        
        const isFront = relPos === 0;
        const isHidden = Math.abs(relPos) > 1;

        let scale = 1;
        let rotate = 0;
        let x = 0;
        let y = 0;
        let opacity = 1;
        let zIndex = 30;

        if (isFront) {
          scale = 1;
          rotate = 0;
          x = 0;
          y = 0;
          opacity = 1;
          zIndex = 50;
        } else if (relPos === 1) { // Next (Right)
          scale = 0.9;
          opacity = 0.95;
          zIndex = 40;
          if (type === "stacked") {
            rotate = 4;
            x = 40;
            y = 15;
          } else if (type === "hero-thumbnails") {
            rotate = 2;
            x = 70;
            y = -10;
          } else if (type === "editorial") {
            rotate = 0;
            x = 90;
            y = 20;
          } else { // overlapping
            rotate = 3;
            x = 100;
            y = 10;
          }
        } else if (relPos === -1) { // Prev (Left)
          scale = 0.9;
          opacity = 0.95;
          zIndex = 40;
          if (type === "stacked") {
            rotate = -4;
            x = -40;
            y = 15;
          } else if (type === "hero-thumbnails") {
            rotate = -2;
            x = -70;
            y = -10;
          } else if (type === "editorial") {
            rotate = 0;
            x = -90;
            y = -20;
          } else { // overlapping
            rotate = -3;
            x = -100;
            y = 10;
          }
        } else {
          scale = 0.8;
          opacity = 0;
          zIndex = 20;
        }

        return (
          <motion.div 
            key={i} 
            onClick={() => {
              if (isFront) return;
              setFrontIndex(i);
              handleInteractionStart();
              setTimeout(handleInteractionEnd, 500);
            }}
            drag={isFront ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragStart={isFront ? handleInteractionStart : undefined}
            onDragEnd={isFront ? (e, { offset }) => {
              if (offset.x > 50) {
                setFrontIndex((prev) => (prev - 1 + images.length) % images.length);
              } else if (offset.x < -50) {
                setFrontIndex((prev) => (prev + 1) % images.length);
              }
              handleInteractionEnd();
            } : undefined}
            initial={false}
            animate={{
              scale,
              rotate,
              x,
              y,
              opacity,
              zIndex
            }}
            whileHover={isFront ? {
              scale: 1.02,
              y: -5,
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)"
            } : {}}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className={\`will-change-transform absolute cursor-pointer flex items-center justify-center \${isHidden ? 'pointer-events-none' : ''}\`}
            style={{
              pointerEvents: isHidden ? 'none' : 'auto'
            }}
          >
            <img 
              src={img} 
              alt="Gallery image" 
              className="max-w-full max-h-[250px] md:max-h-[360px] w-auto h-auto rounded-xl shadow-[0_10px_30px_rgb(0,0,0,0.1)] mix-blend-multiply dark:mix-blend-normal object-contain pointer-events-none"
            />
          </motion.div>
        );
      })}
    </div>
  );
};`;

const regex = /const Gallery = \(\{ type, images \}: \{ type\?: string, images: string\[\] \}\) => \{[\s\S]*?(?=const DesktopTimeline = \(\) => \{)/;
const updatedContent = content.replace(regex, newGallery + '\n\n');

fs.writeFileSync('src/components/Timeline.tsx', updatedContent);
