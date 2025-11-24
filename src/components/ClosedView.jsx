import React from "react";

export default function ClosedView({ navigateTo }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center font-mono text-lg text-neutral-500 animate-fadeIn">
      <p>💻 Terminal closed — click to reopen</p>
      <button
        onClick={() => navigateTo("home")}
        className="mt-4 text-emerald-500 underline hover:opacity-80"
      >
        Reopen
      </button>
    </div>
  );
}