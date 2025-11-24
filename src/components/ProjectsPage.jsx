import React from "react";
import { ExternalLink } from "lucide-react";
import { useInView } from "../utils/hooks";
import { projects } from "../data/content";
import BackButton from "./shared/BackButton";
import PageHeader from "./shared/PageHeader";

function ProjectItem({ project, index, colors }) {
  const [ref, isInView] = useInView(0.2);

  return (
    <div
      ref={ref}
      className={`pb-8 border-b ${colors.borderColor} last:border-0 transition-all duration-700 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="flex justify-between items-start mb-3">
        <h2 className={`text-2xl font-bold ${colors.textColor} transition-colors hover:${colors.accentColor}`}>
          {project.title}
        </h2>
        <span className={`text-sm ${colors.secondaryText}`}>{project.year}</span>
      </div>
      <p className={`text-sm mb-4 ${colors.accentColor} font-medium`}>{project.tech}</p>
      <p className={`text-lg leading-relaxed mb-4 ${colors.secondaryText}`}>{project.desc}</p>
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className={`${colors.accentColor} hover:underline flex items-center gap-2 transition-all hover:gap-3`}
      >
        View Project <ExternalLink size={16} />
      </a>
    </div>
  );
}

export default function ProjectsPage({ darkMode, navigateTo, colors }) {
  return (
    <div className="min-h-screen py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <BackButton navigateTo={navigateTo} accentColor={colors.accentColor} />
        <PageHeader title="Projects" darkMode={darkMode} textColor={colors.textColor} />

        <div className="space-y-10">
          {projects.map((project, i) => (
            <ProjectItem key={i} project={project} index={i} colors={colors} />
          ))}
        </div>
      </div>
    </div>
  );
}