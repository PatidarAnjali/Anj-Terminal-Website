// Imports
import React, { useState, useEffect } from "react";
import {
  Moon, // dark mode
  Sun, // light mode
  ArrowLeft, // navigation icon
  ExternalLink,
  Download,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";

export default function Portfolio() {

  // global states
  const [darkMode, setDarkMode] = useState(true);
  const [currentPage, setCurrentPage] = useState("home");
  const [hasTypedOnce, setHasTypedOnce] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [randomImage, setRandomImage] = useState(null);

  // random images for when minimized (yellow)
  const randomImages = [
    { src: "/Genai.png", caption: "Part of the team that ran this massive AI Hackathon - unforgettable experience!" },
    { src: "/Calculus.png", caption: "The time when Calculus II humbled me" },
    { src: "/Ada.png", caption: "Did you know? Ada Lovelace wrote the first algorithm" },
    { src: "/Grace.png", caption: "Grace Hopper popularized the term 'debugging'" },
    { src: "/Hedy.png", caption: "Hedy Lamarr co-invented frequency hopping for secure commss" },
    { src: "/Annie.png", caption: "Annie Easley: Rocket scientist & coding pioneer" },
    { src: "/Hackathon.png", caption: "My first ever hackathon was HTV 9" },
    {
      src: "/CMStrivia.png",
      caption: "Winning the CMS-Faculty Student Trivia at UTSC",
      link: "https://www.instagram.com/p/DImAht5xzjO/?hl=en&img_index=10"
    },
    { src: "/Painting.png", caption: "I love painting to de-stress" },
    {
      src: "/SummerSchool.png",
      caption: "Volunteering for the Computer Science summer school at UTSC",
      link: "https://www.instagram.com/reel/DN35y5sCeyv/?hl=en"
    },
  ];

  // page navigation handler
  const navigateTo = (page) => {

    // when minimized, pick a rando image
    if (page === "minimized") {
      const newImage = randomImages[Math.floor(Math.random() * randomImages.length)];
      setRandomImage(newImage);
      setCurrentPage(page);
      return;
    }

    // transition for page changes
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => setIsTransitioning(false), 100);
    }, 200);

  };

  // theme based colors
  const bgColor = darkMode ? "bg-slate-950" : "bg-neutral-50";
  const textColor = darkMode ? "text-white" : "text-neutral-900";
  const accentColor = darkMode ? "text-emerald-400" : "text-emerald-600";
  const secondaryText = darkMode ? "text-neutral-400" : "text-neutral-600";

  // custom hook: detects when elements scroll into view
  const useInView = (threshold = 0.1) => {
    const [ref, setRef] = useState(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
      if (!ref) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          }
        },
        { threshold }
      );
      observer.observe(ref);
      return () => observer.disconnect();
    }, [ref, threshold]);

    return [setRef, isInView];
  };

  // HomePage
  const HomePage = () => {

    const [typed, setTyped] = useState(hasTypedOnce ? "whoami" : "");
    const text = "whoami"; // terminal prompt text

    // typing animation for "whoami"
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

          {/* Terminal whindow */}
          <div
            className={`${darkMode ? "bg-neutral-900 border-neutral-800" : "bg-white border-neutral-200"
              } border rounded-lg shadow-xl overflow-hidden transform transition-all duration-500 hover:scale-[1.02]`}
          >

            {/* Terminal header (buttons + mode toggle) */}
            <div
              className={`${darkMode ? "bg-neutral-800" : "bg-neutral-100"
                } px-4 py-2 flex items-center justify-between`}
            >
              <div className="flex items-center gap-2">

                {/* Close button */}
                <button
                  onClick={() => setCurrentPage("closed")}
                  className="w-3 h-3 rounded-full bg-red-500 hover:scale-110 transition-transform"
                  title="Close"
                ></button>

                {/* Minimize button */}
                <button
                  onClick={() => navigateTo("minimized")}
                  className="w-3 h-3 rounded-full bg-yellow-500 hover:scale-110 transition-transform"
                  title="Minimize"
                ></button>

                {/* Maximize button */}
                <button
                  onClick={() =>
                    setCurrentPage(currentPage === "maximized" ? "home" : "maximized")
                  }
                  className="w-3 h-3 rounded-full bg-green-500 hover:scale-110 transition-transform"
                  title="Maximize"
                ></button>

              </div>

              {/* Light/dark toggle button */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`${secondaryText} hover:${darkMode ? "text-emerald-400" : "text-emerald-600"
                  } transition-all duration-300 hover:rotate-180`}
              >
                {darkMode ? <Sun size={16} /> : <Moon size={16} />}
              </button>

            </div>

            {/* Terminal body */}
            <div className="p-8 font-mono text-sm space-y-4">

              {/* Typing prompt */}
              <div>
                <span className={accentColor}>$ </span>
                <span className={textColor}>{typed}</span>
                {typed !== "whoami" && <span className="animate-pulse">▋</span>}
              </div>

              {/* Once typing finishes, show the info */}

              {typed === text && (
                <div className="animate-slideUp">

                  {/* Personal info */}

                  <div className="space-y-2 ml-4">
                    <div className={secondaryText}>
                      <span className={accentColor}>name:</span> Anjali Patidar
                    </div>
                    <div className={secondaryText}>
                      <span className={accentColor}>role:</span> Software Engineering Student @ UofT
                    </div>
                    <div className={secondaryText}>
                      <span className={accentColor}>interests:</span> AI/ML, Full-Stack Dev, and coffee
                    </div>

                  </div>

                  {/* Navigation links */}
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

                  {/* Socials links */}
                  <div
                    className={`pt-4 border-t ${darkMode ? "border-neutral-800" : "border-neutral-200"
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

  // Journey Item Component
  const JourneyItem = ({ item, index }) => {
    const [ref, isInView] = useInView(0.2);

    return (
      <div
        ref={ref}
        className={`flex gap-6 transition-all duration-700 ${isInView
          ? 'opacity-100 translate-x-0'
          : 'opacity-0 -translate-x-10'
          }`}
        style={{ transitionDelay: `${index * 100}ms` }}
      >
        <div className={`text-sm font-bold min-w-[60px] ${accentColor} relative`}>
          <div className="absolute -left-8 top-1 w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></div>
          {item.year}
        </div>
        <div className="flex-1">
          <h3 className={`font-bold mb-1 ${textColor}`}>{item.title}</h3>
          <p className={secondaryText}>{item.desc}</p>
        </div>
      </div>
    );
  };

  // About Page
  const AboutPage = () => {
    const [headerRef, headerInView] = useInView(0.1);
    const [bioRef, bioInView] = useInView(0.1);

    // things I have done
    const journeyItems = [
      { year: '2024', title: 'Technology Director @ GDSC', desc: 'Led website development for GENAI Genesis hackathon' },
      { year: '2024', title: 'Web Developer @ UTSC', desc: 'Built the Lovejob Lab website with focus on accessibility' },
      { year: '2023', title: 'Started at UofT', desc: 'Began my Computer Science journey' },
      { year: '2022', title: 'The Dino Game', desc: 'My first project - where it all began' }
    ];

    return (

      <div className="min-h-screen py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => navigateTo('home')}
            className={`${accentColor} hover:underline flex items-center gap-2 mb-12 font-mono text-sm transition-all hover:-translate-x-2 animate-fadeIn`}
          >
            <ArrowLeft size={16} />
            cd ~
          </button>

          <div ref={headerRef}>
            <h1 className={`text-5xl font-bold mb-6 ${textColor} transition-all duration-700 ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}>
              About Me
            </h1>
            <div className={`h-1 w-16 ${darkMode ? 'bg-emerald-400' : 'bg-emerald-600'} mb-12 transition-all duration-700 ${headerInView ? 'opacity-100 w-16' : 'opacity-0 w-0'
              }`}></div>
          </div>

          <div ref={bioRef} className="space-y-8">
            <p className={`text-xl leading-relaxed ${textColor} transition-all duration-700 ${bioInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`} style={{ transitionDelay: '0.1s' }}>
              Hi! I'm Anjali, a second-year Software Engineering student at UofT. 
              I love building things, solving problems through code, and making amazing, unfunny jokes.
            </p>

            <p className={`text-lg leading-relaxed ${secondaryText} transition-all duration-700 ${bioInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`} style={{ transitionDelay: '0.2s' }}>
              My journey in computer science all started with a Java game I built (The Dino Game) in my grade 12 computer class. 
              That project sparked my interest in coding, eventually leading to me to pursue a career in it.
            </p>

            <p className={`text-lg leading-relaxed ${secondaryText} transition-all duration-700 ${bioInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`} style={{ transitionDelay: '0.3s' }}>
              When I'm not coding, you'll find me either reading, playing guitar, or baking.
              If I had to leave you with a quote, it would be: "Stay curious, keep building".
            </p>

            <div className="pt-8">
              <h2 className={`text-2xl font-bold mb-8 ${textColor} transition-all duration-700 ${bioInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`} style={{ transitionDelay: '0.4s' }}>Journey</h2>
              <div className="space-y-6 relative pl-8">
                {journeyItems.map((item, i) => (
                  <JourneyItem key={i} item={item} index={i} />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  };

  // Project Item Component
  const ProjectItem = ({ project, index }) => {
    const [ref, isInView] = useInView(0.2);

    return (
      <div
        ref={ref}
        className={`pb-8 border-b ${darkMode ? 'border-neutral-800' : 'border-neutral-200'} last:border-0 transition-all duration-700 ${isInView
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-10'
          }`}
        style={{ transitionDelay: `${index * 150}ms` }}
      >
        <div className="flex justify-between items-start mb-3">
          <h2 className={`text-2xl font-bold ${textColor} transition-colors hover:${accentColor}`}>{project.title}</h2>
          <span className={`text-sm ${secondaryText}`}>{project.year}</span>
        </div>
        <p className={`text-sm mb-4 ${accentColor} font-medium`}>{project.tech}</p>
        <p className={`text-lg leading-relaxed mb-4 ${secondaryText}`}>{project.desc}</p>
        <button className={`${accentColor} hover:underline flex items-center gap-2 transition-all hover:gap-3`}>
          View Project <ExternalLink size={16} />
        </button>
      </div>
    );

  };

  // Projects Page
  const ProjectsPage = () => {
    const [headerRef, headerInView] = useInView(0.1);

    const projects = [
      {
        title: 'The Dino Game',
        tech: 'Java • Swing • AWT',
        desc: 'A 2D game with collision detection and smooth animations. My first real project that sparked my passion for coding.',
        year: '2022'
      },
      {
        title: 'Nuvou',
        tech: 'MEAN Stack • MongoDB',
        desc: 'Full-stack journaling app for artists. Features authentication, CRUD operations, and portfolio sharing.',
        year: '2024'
      },
      {
        title: 'Animal Paintings Gallery',
        tech: 'Angular • TypeScript',
        desc: 'Interactive art gallery with dynamic rendering and smooth transitions.',
        year: '2023'
      }
    ];

    return (
      <div className="min-h-screen py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigateTo('home')}
            className={`${accentColor} hover:underline flex items-center gap-2 mb-12 font-mono text-sm transition-all hover:-translate-x-2 animate-fadeIn`}
          >
            <ArrowLeft size={16} />
            cd ~
          </button>

          <div ref={headerRef}>
            <h1 className={`text-5xl font-bold mb-6 ${textColor} transition-all duration-700 ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}>
              Projects
            </h1>
            <div className={`h-1 w-16 ${darkMode ? 'bg-emerald-400' : 'bg-emerald-600'} mb-12 transition-all duration-700 ${headerInView ? 'opacity-100 w-16' : 'opacity-0 w-0'
              }`}></div>
          </div>

          <div className="space-y-10">
            {projects.map((project, i) => (
              <ProjectItem key={i} project={project} index={i} />
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Resume Section Component
  const ResumeSection = ({ children, index }) => {
    const [ref, isInView] = useInView(0.1);

    return (
      <div
        ref={ref}
        className={`transition-all duration-700 ${isInView
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-10'
          }`}
        style={{ transitionDelay: `${index * 100}ms` }}
      >
        {children}
      </div>
    );
  };

  // Resume Page
  const ResumePage = () => {
    const [headerRef, headerInView] = useInView(0.1);

    return (
      <div className="min-h-screen py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => navigateTo('home')}
            className={`${accentColor} hover:underline flex items-center gap-2 mb-12 font-mono text-sm transition-all hover:-translate-x-2 animate-fadeIn`}
          >
            <ArrowLeft size={16} />
            cd ~
          </button>

          <div ref={headerRef} className="flex justify-between items-start mb-12">
            <div>
              <h1 className={`text-5xl font-bold mb-6 ${textColor} transition-all duration-700 ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>Resume</h1>
              <div className={`h-1 w-16 ${darkMode ? 'bg-emerald-400' : 'bg-emerald-600'} transition-all duration-700 ${headerInView ? 'opacity-100 w-16' : 'opacity-0 w-0'
                }`}></div>
            </div>
            <a
              href="https://drive.google.com/file/d/1a3Bim0XYJuto8y-UkIK8a8Z2qamnPrBv/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button
                className={`px-6 py-3 ${darkMode
                    ? 'bg-emerald-500 hover:bg-emerald-600'
                    : 'bg-emerald-600 hover:bg-emerald-700'
                  } text-white rounded-lg transition-all flex items-center gap-2 hover:scale-105 ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                style={{ transitionDelay: '0.2s' }}
              >
                View Resume
              </button>
            </a>

          </div>

          <div className="space-y-12">
            {/* Skills */}
            <ResumeSection title="Skills" index={0}>
              <h2 className={`text-2xl font-bold mb-6 ${textColor}`}>Skills</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h3 className={`text-sm font-bold mb-3 ${accentColor} uppercase`}>Languages</h3>
                  <div className={`space-y-1 ${secondaryText}`}>
                    {['Java', 'TypeScript', 'JavaScript', 'Python', 'C', 'C++'].map((s, i) => (
                      <div key={i} className="hover:translate-x-2 transition-transform">{s}</div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className={`text-sm font-bold mb-3 ${accentColor} uppercase`}>Frontend</h3>
                  <div className={`space-y-1 ${secondaryText}`}>
                    {['React', 'Angular', 'HTML/CSS', 'Bootstrap'].map((s, i) => (
                      <div key={i} className="hover:translate-x-2 transition-transform">{s}</div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className={`text-sm font-bold mb-3 ${accentColor} uppercase`}>Backend</h3>
                  <div className={`space-y-1 ${secondaryText}`}>
                    {['Node.js', 'MongoDB', 'REST APIs', 'Git'].map((s, i) => (
                      <div key={i} className="hover:translate-x-2 transition-transform">{s}</div>
                    ))}
                  </div>
                </div>
              </div>
            </ResumeSection>

            {/* Experience */}
            <ResumeSection title="Experience" index={1}>
              <h2 className={`text-2xl font-bold mb-6 ${textColor}`}>Experience</h2>
              <div className="space-y-6">
                {[
                  {
                    role: 'Technology Director',
                    org: 'Google Developer Student Club',
                    date: '2024',
                    desc: 'Led website development for GENAI Genesis hackathon. Coordinated with team and provided technical support.'
                  },
                  {
                    role: 'Web Developer',
                    org: 'UTSC Lovejob Lab',
                    date: '2024',
                    desc: 'Designed and developed lab website with focus on accessibility and user experience.'
                  },
                  {
                    role: 'Technology Representative',
                    org: 'Computer Science Enrichment Club',
                    date: '2023',
                    desc: 'Mentored first-year students and organized programming workshops.'
                  }
                ].map((exp, i) => (
                  <div key={i} className={`pb-6 border-b ${darkMode ? 'border-neutral-800' : 'border-neutral-200'} last:border-0 hover:translate-x-2 transition-transform`}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className={`text-lg font-bold ${textColor}`}>{exp.role}</h3>
                        <p className={accentColor}>{exp.org}</p>
                      </div>
                      <span className={`text-sm ${secondaryText}`}>{exp.date}</span>
                    </div>
                    <p className={secondaryText}>{exp.desc}</p>
                  </div>
                ))}
              </div>
            </ResumeSection>

            {/* Education */}
            <ResumeSection title="Education" index={2}>
              <h2 className={`text-2xl font-bold mb-6 ${textColor}`}>Education</h2>
              <div className="hover:translate-x-2 transition-transform">
                <h3 className={`text-lg font-bold ${textColor}`}>University of Toronto</h3>
                <p className={accentColor}>Software Engineering Specialist</p>
                <p className={secondaryText}>2023 - Present</p>
              </div>
            </ResumeSection>
          </div>

        </div>
      </div>
    );
  };

  return (

    <div className={`${bgColor} ${textColor} transition-colors duration-300 min-h-screen`}>
      <div className={`transition-opacity duration-300 ${isTransitioning ? "opacity-0" : "opacity-100"}`}>
        {currentPage === "home" && <HomePage />}
        {currentPage === "about" && <AboutPage />}
        {currentPage === "projects" && <ProjectsPage />}
        {currentPage === "resume" && <ResumePage />}

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

        {currentPage === "minimized" && (
          <div className="fixed inset-0 flex flex-col items-center justify-center bg-neutral-950 text-white font-mono">
            <p className="text-neutral-400 mb-3">Quick fact while I'm minimized…</p>
            {randomImage.link ? (
              <div className="flex flex-col items-center">
                <a
                  href={randomImage.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-90 transition"
                >
                  <img
                    src={randomImage.src}
                    alt={randomImage.caption}
                    className="rounded-lg shadow-lg w-72 h-72 object-cover mb-4"
                  />
                </a>
                <p className="text-neutral-400 italic text-xs animate-pulse mb-1">
                  psst... click the image 👀
                </p>
                <p className="text-neutral-300 italic mb-2 text-sm">
                  {randomImage.caption}
                </p>
              </div>
            ) : (
              <>
                <img
                  src={randomImage.src}
                  alt={randomImage.caption}
                  className="rounded-lg shadow-lg w-72 h-72 object-cover mb-4"
                />
                <p className="text-neutral-300 italic mb-2 text-sm">
                  {randomImage.caption}
                </p>
              </>
            )}

            <br />
            <button
              onClick={() => navigateTo("home")}
              className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition"
            >
              Restore Terminal
            </button>
          </div>
        )}

        {currentPage === "maximized" && (
          <div className="fixed inset-0 bg-neutral-900 flex flex-col items-center justify-center text-white font-mono">
            <p>Fullscreen Mode</p><br />
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
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { 
          animation: fadeIn 0.6s ease-out forwards; 
          opacity: 0; 
        }
        .animate-slideUp { 
          animation: slideUp 0.6s ease-out forwards; 
        }
      `}</style>
    </div>
  );
}
