import React from "react";
import { useInView } from "../utils/hooks";
import { skills } from "../data/content";
import BackButton from "./shared/BackButton";

function ResumeSection({ children, index }) {
  const [ref, isInView] = useInView(0.1);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {children}
    </div>
  );
}

export default function ResumePage({ darkMode, navigateTo, colors }) {
  const [headerRef, headerInView] = useInView(0.1);

  return (
    <div className="min-h-screen py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <BackButton navigateTo={navigateTo} accentColor={colors.accentColor} />

        <div ref={headerRef} className="flex justify-between items-start mb-12">
          <div>
            <h1 className={`text-5xl font-bold mb-6 ${colors.textColor} transition-all duration-700 ${
              headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>Resume</h1>
            <div className={`h-1 w-16 ${darkMode ? 'bg-emerald-400' : 'bg-emerald-600'} transition-all duration-700 ${
              headerInView ? 'opacity-100 w-16' : 'opacity-0 w-0'
            }`} />
          </div>
          <a href="https://drive.google.com/file/d/1a3Bim0XYJuto8y-UkIK8a8Z2qamnPrBv/view?usp=sharing" target="_blank" rel="noopener noreferrer">
            <button className={`px-6 py-3 ${
              darkMode ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-emerald-600 hover:bg-emerald-700'
            } text-white rounded-lg transition-all flex items-center gap-2 hover:scale-105 ${
              headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`} style={{ transitionDelay: '0.2s' }}>
              View Resume
            </button>
          </a>
        </div>

        <div className="space-y-12">
          <ResumeSection index={0}>
            <h2 className={`text-2xl font-bold mb-6 ${colors.textColor}`}>Skills</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {Object.entries(skills).map(([category, items]) => (
                <div key={category}>
                  <h3 className={`text-sm font-bold mb-3 ${colors.accentColor} uppercase`}>{category}</h3>
                  <div className={`space-y-1 ${colors.secondaryText}`}>
                    {items.map((skill, i) => (
                      <div key={i} className="hover:translate-x-2 transition-transform">{skill}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ResumeSection>

          <ResumeSection index={2}>
            <h2 className={`text-2xl font-bold mb-6 ${colors.textColor}`}>Education</h2>
            <div className="hover:translate-x-2 transition-transform">
              <h3 className={`text-lg font-bold ${colors.textColor}`}>University of Toronto</h3>
              <p className={colors.accentColor}>Software Engineering Specialist</p>
              <p className={colors.secondaryText}>2024 - Present</p>
            </div>
          </ResumeSection>
        </div>
      </div>
    </div>
  );
}
