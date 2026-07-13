const fs = require('fs');
let content = fs.readFileSync('src/components/Timeline.tsx', 'utf-8');

if (!content.includes('useId')) {
  content = content.replace('import { useState, useRef, useEffect', 'import { useState, useRef, useEffect, useId');
}

content = content.replace(/const Gallery = \(\{ type, images \}: \{ type\?: string, images: string\[\] \}\) => \{/, `const Gallery = ({ type, images }: { type?: string, images: string[] }) => {\n  const galleryId = useId();`);
content = content.replaceAll('layoutId={`gallery-img-${img}`}', 'layoutId={`gallery-${galleryId}-${img}`}');

fs.writeFileSync('src/components/Timeline.tsx', content);
