import React from "react";
import { useInView } from "../utils/hooks";
import BackButton from "./shared/BackButton";
import PageHeader from "./shared/PageHeader";
import HogwartsJourney from "./train/HogwartsJourney";

export default function AboutPage({ darkMode, navigateTo, colors }) {
  const [bioRef, bioInView] = useInView(0.1);

  return (
    <div className="min-h-screen py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <BackButton navigateTo={navigateTo} accentColor={colors.accentColor} />
        <PageHeader title="About Me" darkMode={darkMode} textColor={colors.textColor} />

        <div ref={bioRef} className="space-y-8">
          <p
            className={`text-xl leading-relaxed ${colors.textColor} transition-all duration-700 ${
              bioInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "0.1s" }}
          >
            Hi! I'm Anjali, a second-year Software Engineering student at UofT.
            I love building things, solving problems through code, and making amazing, really funny jokes.
          </p>

          <p
            className={`text-lg leading-relaxed ${colors.secondaryText} transition-all duration-700 ${
              bioInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "0.2s" }}
          >
            I got into programming after building a tiny Java game in high school. It worked… most of the time.
            But that project hooked me, and now I spend way too many hours debugging things I created myself.
          </p>

          <p
            className={`text-lg leading-relaxed ${colors.secondaryText} transition-all duration-700 ${
              bioInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "0.3s" }}
          >
            When I'm not coding, you'll find me reading, playing guitar, baking, scrolling pinterest,
            or checking out one of the 6-7 new food spots I've been wanting to try.
          </p>

          {/* journey section */}
          <div
            className={`pt-8 transition-all duration-700 ${
              bioInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "0.4s" }}
          >
           <h2 className={`text-2xl font-bold mb-6 ${colors.textColor}`}>My journey</h2>
            <p className={`text-sm mb-8 ${colors.secondaryText}`}>
              Scroll the track :)
            </p>

            <HogwartsJourney darkMode= {darkMode} />
          
          </div>
        </div>
      </div>
    </div>
  );
}
