export const getThemeColors = (darkMode) => ({
  bgColor: darkMode ? "bg-slate-950" : "bg-neutral-50",
  textColor: darkMode ? "text-white" : "text-neutral-900",
  accentColor: darkMode ? "text-emerald-400" : "text-emerald-600",
  secondaryText: darkMode ? "text-neutral-400" : "text-neutral-600",
  borderColor: darkMode ? "border-neutral-800" : "border-neutral-200",
  cardBg: darkMode ? "bg-neutral-900" : "bg-white",
  headerBg: darkMode ? "bg-neutral-800" : "bg-neutral-100",
});
