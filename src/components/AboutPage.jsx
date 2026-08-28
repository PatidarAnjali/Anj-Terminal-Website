import React from "react";
import { useInView } from "../utils/hooks";
import BackButton from "./shared/BackButton";
import PageHeader from "./shared/PageHeader";
import HogwartsJourney from "./train/HogwartsJourney";
import BookShelf from "./BookShelf";


export default function AboutPage({ darkMode, navigateTo, colors }) {
  const [bioRef, bioInView] = useInView(0.1);


  return (
    <div className="flex-1 py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <BackButton navigateTo={navigateTo} accentColor={colors.accentColor} />
        <PageHeader title="About Me" darkMode={darkMode} textColor={colors.textColor} />


        <div ref={bioRef} className="space-y-10">

          {/* bookshelf section */}
          <div
            className={`transition-all duration-700 ${
              bioInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "0.2s" }}
          >
            <h2 className={`text-2xl font-bold mb-3 ${colors.textColor}`}>The shelf</h2>
            <p className={`text-sm mb-6 ${colors.secondaryText}`}>
              Tap a book to read more!
            </p>
            <BookShelf darkMode={darkMode} colors={colors} />
          </div>


          {/* journey section */}
          <div
            className={`pt-8 transition-all duration-700 ${
              bioInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "0.3s" }}
          >
            <h2 className={`text-2xl font-bold mb-3 ${colors.textColor}`}>My journey</h2>
            <p className={`text-sm mb-6 ${colors.secondaryText}`}>
              Scroll the track :)
            </p>


            <HogwartsJourney darkMode={darkMode} />
          </div>

        </div>

      </div>
    </div>
  );
}

