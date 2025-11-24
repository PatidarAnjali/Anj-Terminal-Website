import React from "react";
import { useInView } from "../utils/hooks";
import { journeyItems } from "../data/content";
import BackButton from "./shared/BackButton";
import PageHeader from "./shared/PageHeader";

export default function AboutPage({ darkMode, navigateTo, colors }) {
  const [bioRef, bioInView] = useInView(0.1);

  return (
    <div className="min-h-screen py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <BackButton navigateTo={navigateTo} accentColor={colors.accentColor} />
        <PageHeader title="About Me" darkMode={darkMode} textColor={colors.textColor} />

        <div ref={bioRef} className="space-y-8">
          <p className={`text-xl leading-relaxed ${colors.textColor} transition-all duration-700 ${
            bioInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`} style={{ transitionDelay: '0.1s' }}>
            Hi! I'm Anjali, a second-year Software Engineering student at UofT.
            I love building things, solving problems through code, and making amazing, really funny jokes.
          </p>

          <p className={`text-lg leading-relaxed ${colors.secondaryText} transition-all duration-700 ${
            bioInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`} style={{ transitionDelay: '0.2s' }}>
            I got into programming after building a tiny Java game in high school. It worked… most of the time. But that project hooked me, and now I spend way too many hours debugging things I created myself.
          </p>

          <p className={`text-lg leading-relaxed ${colors.secondaryText} transition-all duration-700 ${
            bioInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`} style={{ transitionDelay: '0.3s' }}>
            When I'm not coding, you'll find me reading, playing guitar, baking, or checking out one of the 6-7 new food spots I've been wanting to try.         
          </p>

          <div className="pt-8">
            <h2 className={`text-2xl font-bold mb-8 ${colors.textColor} transition-all duration-700 ${
              bioInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`} style={{ transitionDelay: '0.4s' }}>Journey</h2>

            <div className="relative pl-8">
              <div className={`absolute left-0 top-0 bottom-0 w-0.5 ${darkMode ? 'bg-neutral-800' : 'bg-neutral-200'}`} />

              <div className="space-y-8">
                {journeyItems.map((item, i) => (
                  <div key={i} className="relative">
                    <div className={`absolute -left-[36.5px] top-1 w-3 h-3 rounded-full ${
                      darkMode ? 'bg-emerald-400' : 'bg-emerald-600'
                    } ring-4 ${darkMode ? 'ring-slate-950' : 'ring-neutral-50'}`} />

                    <div>
                      <h3 className={`text-xl font-bold mb-3 ${colors.accentColor}`}>
                        {item.title}
                      </h3>

                      <div className="space-y-2">
                        {item.positions.map((pos, j) => (
                          <div key={j} className="flex items-baseline justify-between gap-4 group hover:translate-x-1 transition-transform">
                            <span className={colors.secondaryText}>{pos.role}</span>
                            <span className={`text-sm ${colors.secondaryText} whitespace-nowrap`}>{pos.year}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
