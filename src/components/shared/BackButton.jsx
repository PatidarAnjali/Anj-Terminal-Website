import React from "react";
import { ArrowLeft } from "lucide-react";

export default function BackButton({ navigateTo, accentColor }) {
  return (
    <button
      onClick={() => navigateTo('home')}
      className={`${accentColor} hover:underline flex items-center gap-2 mb-12 font-mono text-sm transition-all hover:-translate-x-2 animate-fadeIn`}
    >
      <ArrowLeft size={16} />
      cd ~
    </button>
  );
}