import { useState, useEffect } from "react";
import { motion } from "motion/react";

export function Typewriter({ phrases = [] }: { phrases?: string[] }) {
  const defaultRoles = [
    "Software Engineer",
    "Creative Developer",
    "AI Architect",
    "System Thinker"
  ];

  const roles = phrases && phrases.length > 0 ? phrases : defaultRoles;

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const role = roles[currentRoleIndex];
    let timeout: NodeJS.Timeout;

    if (isDeleting) {
      if (currentText.length > 0) {
        timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, 20);
      } else {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      }
    } else {
      if (currentText.length < role.length) {
        timeout = setTimeout(() => {
          setCurrentText(role.slice(0, currentText.length + 1));
        }, 50);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 3000);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentRoleIndex, roles]);

  return (
    <div className="flex items-center text-gray-500 dark:text-gray-400 font-sans tracking-[0.02em] text-[15px] md:text-[17px] font-medium h-[24px] relative">
      <div className="flex items-center">
        <span>{currentText}</span>
        <motion.span 
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-[1.1em] bg-[var(--text-primary)] ml-1"
        ></motion.span>
      </div>
    </div>
  );
}
