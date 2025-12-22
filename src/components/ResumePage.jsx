import React from "react";
import { useInView } from "../utils/hooks";
import { skills, skillLogos } from "../data/content";
import BackButton from "./shared/BackButton";


function ResumeSection({ children, index }) {


 const [ref, isInView] = useInView(0.1);


 return (
   <div
     ref={ref}
     className={`transition-all duration-700 ${
       isInView ? 'opacity-100 translate-y-4' : 'opacity-0 translate-y-10'
     }`}
     style={{ transitionDelay: `${index * 100}ms`  }}
   >
     {children}
   </div>
 );


}


export default function ResumePage({ darkMode, navigateTo, colors }) {


 const [headerRef, headerInView] = useInView(0.1);
 const [activeCategory, setActiveCategory] = React.useState('Languages');


 return (
   <div className="min-h-screen py-24 px-5">
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


           {/* skill categories */}
           <div
             className={`rounded-md p-6 ${
               darkMode ? 'bg-gray-900 border border-gray-800' : 'bg-gray-50 border border-gray-200'
             }`}
           >
          
             {/* category toggle btns */}
             <div className="inline-flex gap-2 mb-6 rounded-md bg-gradient-to-r from-emerald-500/10 to-teal-500/10 backdrop-blur-sm">
               {Object.keys(skills).map((category) => (
                 <button
                   key={category}
                   onClick={() => setActiveCategory(category)}
                   className={`relative px-5 py-2 rounded-md font-medium transition-all duration-467 ${
                     activeCategory === category
                       ? darkMode
                         ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                         : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                       : darkMode
                       ? 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                       : 'text-gray-500 hover:text-gray-700 hover:bg-black/5'
                   }`}
                 >
                   {category}
                 </button>
               ))}
             </div>


             <div className="flex flex-wrap gap-3">
               {Object.entries(skills)
                 .filter(([category]) => activeCategory === category)
                 .flatMap(([, items]) => (
                   items.map((skill, i) => (
                     <div
                       key={i}
                       className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all hover:scale-105 ${
                         darkMode
                           ? 'bg-gray-800 hover:bg-gray-700'
                           : 'bg-gray-100 hover:bg-gray-200'
                       }`}
                     >
                       {skillLogos[skill] && (
                         <img
                           src={skillLogos[skill]}
                           alt={skill}
                           className="w-5 h-5"
                         />
                       )}
                       <span className={colors.textColor}>{skill}</span>
                     </div>
                   ))
                 ))}
             </div>
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

