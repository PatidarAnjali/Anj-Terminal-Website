import React from "react";
import { useInView } from "../../utils/hooks";

export default function PageHeader({ title, darkMode, textColor }) {
  const [headerRef, headerInView] = useInView(0.1);
  
  return (
    <div ref={headerRef}>
      <h1 className={`text-5xl font-bold mb-6 ${textColor} transition-all duration-700 ${
        headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        {title}
      </h1>
      <div className={`h-1 w-16 ${darkMode ? 'bg-emerald-400' : 'bg-emerald-600'} mb-12 transition-all duration-700 ${
        headerInView ? 'opacity-100 w-16' : 'opacity-0 w-0'
      }`} />
    </div>
  );
}