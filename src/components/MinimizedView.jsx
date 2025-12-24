import React from "react";

export default function MinimizedView({ darkMode, navigateTo, randomImage }) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-neutral-950 text-white font-mono animate-fadeInSlow">
      <div className="flex flex-col items-center animate-fadeInUp space-y-4">
        <p className="text-neutral-400 mb-2 text-sm tracking-wide">Quick fact while I'm minimized…</p>

        <div className="relative group">
          {randomImage.link ? (
            <a href={randomImage.link} target="_blank" rel="noopener noreferrer" className="hover:opacity-95 transition duration-500 ease-in-out">
              <img
                src={randomImage.src}
                alt={randomImage.caption}
                className="rounded-xl shadow-2xl w-72 h-72 object-cover transform transition-all duration-700 group-hover:scale-105 group-hover:rotate-1"
              />
            </a>
          ) : (
            <img
              src={randomImage.src}
              alt={randomImage.caption}
              className="rounded-xl shadow-6xl w-72 h-72 object-cover transform transition-all duration-700 group-hover:scale-105 group-hover:rotate-1"
            />
          )}

          {randomImage.link && (
            <p className="absolute bottom-3 left-0 right-0 text-center text-400 text-xs italic animate-pulse">
              psst... click the image 👀
            </p>
          )}
        </div>

        <p className="text-neutral-200 italic text-center text-sm" style={{ textShadow: "0 0 8px rgba(0,0,0,0.8)" }}>
          {randomImage.caption}
        </p>

        <button
          onClick={() => navigateTo("home")}
          className={`mt-4 px-5 py-2 ${
            darkMode ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-emerald-600 hover:bg-emerald-700'
          } text-white rounded-lg transition-all flex items-center gap-2 hover:scale-105 shadow-lg hover:shadow-emerald-500/30`}
        >
          Restore Terminal
        </button>
      </div>
      
      <style>{`
        @keyframes fadeInSlow {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInSlow { animation: fadeInSlow 0.8s ease-out forwards; }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out forwards; }
      `}</style>
    </div>
  );
}
