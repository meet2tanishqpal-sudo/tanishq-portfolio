const fs = require('fs');
const content = fs.readFileSync('src/components/Timeline.tsx', 'utf-8');

const newGallery = `const Gallery = ({ type, images }: { type?: string, images: string[] }) => {
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
                layoutId={\`gallery-img-\${img}\`}
                src={img}
                alt="Gallery Hero"
                onClick={() => setHeroIndex(i)}
                className="max-w-full max-h-[96%] w-auto h-auto object-contain rounded-[12px] shadow-[0_4px_24px_rgba(0,0,0,0.06)] cursor-pointer mix-blend-multiply dark:mix-blend-normal relative z-30"
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
                    layoutId={\`gallery-img-\${img}\`}
                    src={img}
                    alt="Gallery Support 1"
                    onClick={() => setHeroIndex(i)}
                    className="max-w-[90%] max-h-[95%] w-auto h-auto object-contain rounded-[10px] shadow-[0_2px_16px_rgba(0,0,0,0.04)] cursor-pointer mix-blend-multiply dark:mix-blend-normal relative z-20"
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
                      layoutId={\`gallery-img-\${img}\`}
                      src={img}
                      alt="Gallery Support 2"
                      onClick={() => setHeroIndex(i)}
                      className="max-w-[85%] max-h-[95%] w-auto h-auto object-contain rounded-[10px] shadow-[0_2px_16px_rgba(0,0,0,0.04)] cursor-pointer mix-blend-multiply dark:mix-blend-normal relative z-10"
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
                <div key={\`hidden-wrap-\${img}\`} className="absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none -z-10">
                  <motion.img
                    layoutId={\`gallery-img-\${img}\`}
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
};`;

const regex = /const Gallery = \(\{ type, images \}: \{ type\?: string, images: string\[\] \}\) => \{[\s\S]*?(?=const DesktopTimeline = \(\) => \{)/;
let updatedContent = content.replace(regex, newGallery + '\n\n');

updatedContent = updatedContent.replace('className="content-block w-full lg:flex-[4.5] flex flex-col items-start text-left"', 'className="content-block w-full lg:w-[55%] flex flex-col items-start text-left shrink-0"');
updatedContent = updatedContent.replace('className="gallery-block w-full lg:flex-[5.5]"', 'className="gallery-block w-full lg:w-[45%] shrink-0"');

fs.writeFileSync('src/components/Timeline.tsx', updatedContent);
