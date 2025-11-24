import React, { useState } from "react";
import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage";
import ProjectsPage from "./components/ProjectsPage";
import ResumePage from "./components/ResumePage";
import ClosedView from "./components/ClosedView";
import MinimizedView from "./components/MinimizedView";
import MaximizedView from "./components/MaximizedView";
import { randomImages } from "./data/content";
import { getThemeColors } from "./utils/theme";

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(true);
  const [currentPage, setCurrentPage] = useState("home");
  const [hasTypedOnce, setHasTypedOnce] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [randomImage, setRandomImage] = useState(null);

const navigateTo = (page) => {
  // Don't navigate if already on that page
  if (page === currentPage) return;

  // Special pages (no transition)
  if (page === "closed" || page === "minimized" || page === "maximized") {
    if (page === "minimized") {
      const newImage = randomImages[Math.floor(Math.random() * randomImages.length)];
      setRandomImage(newImage);
    }
    setCurrentPage(page);
    return;
  }

  // All other pages (with fade transition)
  setIsTransitioning(true);
  setTimeout(() => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => setIsTransitioning(false), 100);
  }, 200);
};


  const colors = getThemeColors(darkMode);
  const pageProps = { darkMode, navigateTo, colors, hasTypedOnce, setHasTypedOnce, setDarkMode };

  return (
    <div className={`${colors.bgColor} ${colors.textColor} transition-colors duration-300 min-h-screen`}>
      <div className={`transition-opacity duration-300 ${isTransitioning ? "opacity-0" : "opacity-100"}`}>
        {currentPage === "home" && <HomePage {...pageProps} />}
        {currentPage === "about" && <AboutPage {...pageProps} />}
        {currentPage === "projects" && <ProjectsPage {...pageProps} />}
        {currentPage === "resume" && <ResumePage {...pageProps} />}
        {currentPage === "closed" && <ClosedView navigateTo={navigateTo} />}
        {currentPage === "minimized" && <MinimizedView darkMode={darkMode} navigateTo={navigateTo} randomImage={randomImage} />}
        {currentPage === "maximized" && <MaximizedView navigateTo={navigateTo} />}
      </div>

      <footer className={`py-8 text-center ${colors.secondaryText} text-sm`}>
        © 2025 Anjali Patidar
      </footer>
    </div>
  );
}