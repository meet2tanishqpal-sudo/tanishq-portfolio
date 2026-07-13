const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

content = content.replace('import Lenis from "lenis";', 'import { ReactLenis } from "lenis/react";');

const hookRegex = /  useEffect\(\(\) => \{[\s\S]*?\}, \[\]\);\n/g;
content = content.replace(hookRegex, '');

const returnRegex = /  return \(\n    <div className="relative/g;
const newReturn = `  return (
    <ReactLenis root options={{
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      wheelMultiplier: 1,
      touchMultiplier: 2,
    }}>
    <div className="relative`;

content = content.replace(returnRegex, newReturn);
content = content.replace('    </div>\n  );\n}', '    </div>\n    </ReactLenis>\n  );\n}');

fs.writeFileSync('src/App.tsx', content);
