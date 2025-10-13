import React, { useState, useEffect } from "react";
import {
  Moon,
  Sun,
  ArrowLeft,
  ExternalLink,
  Download,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(true);
  const [currentPage, setCurrentPage] = useState("home");
  const [hasTypedOnce, setHasTypedOnce] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [randomImage, setRandomImage] = useState(null);

  // 🖼️ List of random images (replace URLs with your own later if you want)
  const randomImages = [

    // my stuff
    { src: "/Genai.png", caption: "Part of the team that ran this massive AI Hackathon - unforgettable experience!" },
    { src: "/Calculus.png", caption: "The time when Calculus II humbled me" },

    // women in tech
    { src: "/Ada.png", caption: "Did you know? Ada Lovelace wrote the first algorithm" },
    { src: "/Grace.png", caption: "Grace Hopper popularized the term 'debugging'" },
    { src: "/Hedy.png", caption: "Hedy Lamarr co-invented frequency hopping for secure commss" },
    { src: "/Annie.png", caption: "Annie Easley: Rocket scientist & coding pioneer" },

    // my hobbies
  ];

const navigateTo = (page) => {
  // If minimizing, instantly change page and randomize image
  if (page === "minimized") {
    const newImage =
      randomImages[Math.floor(Math.random() * randomImages.length)];
    setRandomImage(newImage);
    setCurrentPage(page);
    return;
  }

  // For other transitions, keep the fade effect
  setIsTransitioning(true);
  setTimeout(() => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => setIsTransitioning(false), 100);
  }, 200);
};


  const bgColor = darkMode ? "bg-slate-950" : "bg-neutral-50";
  const textColor = darkMode ? "text-white" : "text-neutral-900";
  const accentColor = darkMode ? "text-emerald-400" : "text-emerald-600";
  const secondaryText = darkMode ? "text-neutral-400" : "text-neutral-600";

  // const useInView = (threshold = 0.1) => {
  //   const [ref, setRef] = useState(null);
  //   const [isInView, setIsInView] = useState(false);

  //   useEffect(() => {
  //     if (!ref) return;
  //     const observer = new IntersectionObserver(
  //       ([entry]) => entry.isIntersecting && setIsInView(true),
  //       { threshold }
  //     );
  //     observer.observe(ref);
  //     return () => observer.disconnect();
  //   }, [ref, threshold]);

  //   return [setRef, isInView];
  // };

  // 🏠 Home Page
  const HomePage = () => {
    const [typed, setTyped] = useState(hasTypedOnce ? "whoami" : "");
    const text = "whoami";

    useEffect(() => {
      if (!hasTypedOnce && typed.length < text.length) {
        const timeout = setTimeout(() => {
          setTyped(text.slice(0, typed.length + 1));
          if (text.slice(0, typed.length + 1) === text) setHasTypedOnce(true);
        }, 150);
        return () => clearTimeout(timeout);
      }
    }, [typed]);

    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-3xl w-full animate-fadeIn">
          <div
            className={`${
              darkMode ? "bg-neutral-900 border-neutral-800" : "bg-white border-neutral-200"
            } border rounded-lg shadow-xl overflow-hidden transform transition-all duration-500 hover:scale-[1.02]`}
          >
            {/* 🧠 Terminal Header */}
            <div
              className={`${
                darkMode ? "bg-neutral-800" : "bg-neutral-100"
              } px-4 py-2 flex items-center justify-between`}
            >
              <div className="flex items-center gap-2">
                {/* 🔴 Close */}
                <button
                  onClick={() => setCurrentPage("closed")}
                  className="w-3 h-3 rounded-full bg-red-500 hover:scale-110 transition-transform"
                  title="Close"
                ></button>

                {/* 🟡 Minimize */}
                <button
                  onClick={() => navigateTo("minimized")}
                  className="w-3 h-3 rounded-full bg-yellow-500 hover:scale-110 transition-transform"
                  title="Minimize"
                ></button>

                {/* 🟢 Maximize */}
                <button
                  onClick={() =>
                    setCurrentPage(currentPage === "maximized" ? "home" : "maximized")
                  }
                  className="w-3 h-3 rounded-full bg-green-500 hover:scale-110 transition-transform"
                  title="Maximize"
                ></button>
              </div>

              {/* 🌗 Dark mode toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`${secondaryText} hover:${
                  darkMode ? "text-emerald-400" : "text-emerald-600"
                } transition-all duration-300 hover:rotate-180`}
              >
                {darkMode ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            </div>

            {/* 🧑‍💻 Terminal Body */}
            <div className="p-8 font-mono text-sm space-y-4">
              <div>
                <span className={accentColor}>$ </span>
                <span className={textColor}>{typed}</span>
                {typed !== "whoami" && <span className="animate-pulse">▋</span>}
              </div>

              {typed === text && (
                <div className="animate-slideUp">
                  <div className="space-y-2 ml-4">
                    <div className={secondaryText}>
                      <span className={accentColor}>name:</span> Anjali Patidar
                    </div>
                    <div className={secondaryText}>
                      <span className={accentColor}>role:</span> Software Engineering Student @ UofT
                    </div>
                    <div className={secondaryText}>
                      <span className={accentColor}>interests:</span> AI/ML, Full-Stack Dev, and coffee ☕
                    </div>
                  </div>

                  <div className="pt-4 space-y-2 ml-4">
                    <button
                      onClick={() => navigateTo("about")}
                      className={`${accentColor} hover:underline flex items-center gap-2 hover:translate-x-2 transition-all`}
                    >
                      → about me
                    </button>
                    <button
                      onClick={() => navigateTo("projects")}
                      className={`${accentColor} hover:underline flex items-center gap-2 hover:translate-x-2 transition-all`}
                    >
                      → my projects
                    </button>
                    <button
                      onClick={() => navigateTo("resume")}
                      className={`${accentColor} hover:underline flex items-center gap-2 hover:translate-x-2 transition-all`}
                    >
                      → resume
                    </button>
                  </div>

                  <div
                    className={`pt-4 border-t ${
                      darkMode ? "border-neutral-800" : "border-neutral-200"
                    } mt-4 flex gap-4 ml-4`}
                  >
                    <a href="https://github.com/PatidarAnjali" target="_blank" className={`${accentColor} hover:opacity-80`}>
                      <Github size={20} />
                    </a>
                    <a href="https://www.linkedin.com/in/anjalicpatidar/" target="_blank" className={`${accentColor} hover:opacity-80`}>
                      <Linkedin size={20} />
                    </a>
                    <a href="mailto:anjali.patidar@mail.utoronto.ca" target="_blank" className={`${accentColor} hover:opacity-80`}>
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
  };

  // ✨ Placeholder Pages
  const Placeholder = ({ title }) => (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <button
        onClick={() => navigateTo("home")}
        className={`${accentColor} hover:underline flex items-center gap-2 font-mono text-sm hover:-translate-x-2 transition-all`}
      >
        <ArrowLeft size={16} />
        cd ~
      </button>
    </div>
  );

  return (
    <div className={`${bgColor} ${textColor} transition-colors duration-300 min-h-screen`}>
      <div className={`transition-opacity duration-300 ${isTransitioning ? "opacity-0" : "opacity-100"}`}>
        {currentPage === "home" && <HomePage />}
        {currentPage === "about" && <Placeholder title="About Me" />}
        {currentPage === "projects" && <Placeholder title="Projects" />}
        {currentPage === "resume" && <Placeholder title="Resume" />}

        {/* 💻 Closed State */}
        {currentPage === "closed" && (
          <div className="min-h-screen flex flex-col items-center justify-center font-mono text-lg text-neutral-500 animate-fadeIn">
            <p>💻 Terminal closed — click to reopen</p>
            <button
              onClick={() => navigateTo("home")}
              className="mt-4 text-emerald-500 underline hover:opacity-80"
            >
              Reopen
            </button>
          </div>
        )}

        {/* 🟡 Minimized State → Shows random image */}
        {currentPage === "minimized" && (
          <div className="fixed inset-0 flex flex-col items-center justify-center bg-neutral-950 text-white font-mono">
                      <p className="text-neutral-400 mb-3">Quick fact while I'm minimized…</p>

    {randomImage && (
      <>
        <img
          src={randomImage.src}
          alt={randomImage.caption}
          className="rounded-lg shadow-lg w-72 h-72 object-cover mb-4"
        />
        <p className="text-neutral-300 italic mb-2 text-sm">{randomImage.caption}</p>
      </>
    )}<br/>
            <button
              onClick={() => navigateTo("home")}
              className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition"
            >
              Restore Terminal
            </button>
          </div>
        )}

        {/* 🟢 Maximized State */}
        {currentPage === "maximized" && (
          <div className="fixed inset-0 bg-neutral-900 flex flex-col items-center justify-center text-white font-mono">
            <p>Fullscreen Mode</p><br/>
            <p className="text-neutral-300 italic mb-2 text-sm">Coming soon...</p>
            <button
              onClick={() => navigateTo("home")}
              className="mt-4 text-emerald-400 underline hover:opacity-80"
            >
              Exit Fullscreen
            </button>
          </div>
        )}
      </div>

      <footer className={`py-8 text-center ${secondaryText} text-sm`}>
        © 2025 Anjali Patidar
      </footer>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; opacity: 0; }
        .animate-slideUp { animation: slideUp 0.6s ease-out forwards; }
      `}</style>
    </div>
  );
}
