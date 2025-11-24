import React, { useState, useEffect } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import TerminalHeader from "./shared/TerminalHeader";

export default function HomePage({ darkMode, setDarkMode, navigateTo, colors, hasTypedOnce, setHasTypedOnce }) {
  const [typed, setTyped] = useState(hasTypedOnce ? "whoami" : "");
  const [currentPage, setCurrentPage] = useState("home");
  const text = "whoami";

  useEffect(() => {
    if (!hasTypedOnce && typed.length < text.length) {
      const timeout = setTimeout(() => {
        setTyped(text.slice(0, typed.length + 1));
        if (text.slice(0, typed.length + 1) === text) setHasTypedOnce(true);
      }, 150);
      return () => clearTimeout(timeout);
    }
  }, [typed, hasTypedOnce, setHasTypedOnce]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-3xl w-full animate-fadeIn">
        <div className={`${colors.cardBg} ${colors.borderColor} border rounded-lg shadow-xl overflow-hidden transform transition-all duration-500 hover:scale-[1.02]`}>
          <TerminalHeader 
            darkMode={darkMode} 
            setDarkMode={setDarkMode} 
            colors={colors}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            navigateTo={navigateTo}
          />
          
          <div className="p-8 font-mono text-sm space-y-4">
            <div>
              <span className={colors.accentColor}>$ </span>
              <span className={colors.textColor}>{typed}</span>
              {typed !== "whoami" && <span className="animate-pulse">▋</span>}
            </div>

            {typed === text && (
              <div className="animate-slideUp">
                <div className="space-y-2 ml-4">
                  <div className={colors.secondaryText}>
                    <span className={colors.accentColor}>name:</span> Anjali Patidar
                  </div>
                  <div className={colors.secondaryText}>
                    <span className={colors.accentColor}>role:</span> Software Engineering Student @ UofT
                  </div>
                  <div className={colors.secondaryText}>
                    <span className={colors.accentColor}>interests:</span> AI/ML, Full-Stack Dev, and coffee
                  </div>
                </div>

                <div className="pt-4 space-y-2 ml-4">
                  {[
                    { label: 'about me', page: 'about' },
                    { label: 'my projects', page: 'projects' },
                    { label: 'resume', page: 'resume' }
                  ].map(({ label, page }) => (
                    <button
                      key={page}
                      onClick={() => navigateTo(page)}
                      className={`${colors.accentColor} hover:underline flex items-center gap-2 hover:translate-x-2 transition-all`}
                    >
                      → {label}
                    </button>
                  ))}
                </div>

                <div className={`pt-4 border-t ${colors.borderColor} mt-4 flex gap-4 ml-4`}>
                  <a href="https://github.com/PatidarAnjali" target="_blank" className={`${colors.accentColor} hover:opacity-80`}>
                    <Github size={20} />
                  </a>
                  <a href="https://www.linkedin.com/in/anjalicpatidar/" target="_blank" className={`${colors.accentColor} hover:opacity-80`}>
                    <Linkedin size={20} />
                  </a>
                  <a href="mailto:anjali.patidar@mail.utoronto.ca" target="_blank" className={`${colors.accentColor} hover:opacity-80`}>
                    <Mail size={20} />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}