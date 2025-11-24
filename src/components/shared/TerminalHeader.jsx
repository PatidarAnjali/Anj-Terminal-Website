import React from "react";
import { Sun, Moon } from "lucide-react";

export default function TerminalHeader({ darkMode, setDarkMode, colors, currentPage, navigateTo }) {
  return (
    <div className={`${colors.headerBg} px-4 py-2 flex items-center justify-between`}>
      <div className="flex items-center gap-2">
        <button
        onClick={() => navigateTo("closed")}
        className="w-3 h-3 rounded-full bg-red-500 hover:scale-110 transition-transform"
        title="Close"
        />

        <button
        onClick={() => navigateTo("minimized")}
        className="w-3 h-3 rounded-full bg-yellow-500 hover:scale-110 transition-transform"
        title="Minimize"
        />

        <button
        onClick={() => navigateTo(currentPage === "maximized" ? "home" : "maximized")}
        className="w-3 h-3 rounded-full bg-green-500 hover:scale-110 transition-transform"
        title="Maximize"
        />
      </div>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`${colors.secondaryText} hover:${colors.accentColor} transition-all duration-300 hover:rotate-180`}
      >
        {darkMode ? <Sun size={16} /> : <Moon size={16} />}
      </button>
    </div>
  );
}