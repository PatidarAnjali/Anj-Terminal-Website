
// station card 

export default function StationCard({ item, visible, darkMode }) {

  const accent = darkMode ? "rgba(52,211,153,0.75)" : "rgba(5,150,105,0.85)";
  const accentLine = darkMode ? "rgba(52,211,153,0.35)" : "rgba(0,0,0,0.3)";

  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0px)" : "translateY(4px)",
      transition: "opacity 0.4s ease, transform 0.4s ease",
      background: darkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
      border:`1px solid ${darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)"}`,
      borderRadius: "14px", padding: "28px 32px",
      position: "relative", overflow: "hidden",
      boxShadow: darkMode
        ? "0 0 40px rgba(52,211,153,0.05), inset 0 0 40px rgba(0,0,0,0.15)"
        : "0 2px 20px rgba(0,0,0,0.06)",
      fontFamily: "inherit",
    }}>

      {/* top accent line */}
      <div style={{
        position: "absolute", top: 0, left: "8%", right: "8%", height: "1px",
        background: `linear-gradient(90deg, transparent, ${accentLine}, transparent)`,
      }} />

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "8px", marginBottom: "14px" }}>

        <h3 style={{ color: darkMode ? "#e8e8e8" : "#1a1a1a", fontSize: "1.25rem", fontWeight: "bold", margin: 0, fontFamily: "inherit" }}>
          {item.org}
        </h3>

        <span style={{ color: darkMode ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.3)", fontSize: "0.8rem", fontFamily: "inherit", whiteSpace: "nowrap", marginTop: "4px" }}>
          {item.label}
        </span>
        
      </div>

      <p style={{ color: accent, fontSize: "0.95rem", fontStyle: "italic", marginBottom: "12px", fontFamily: "inherit" }}>
        {item.station}
      </p>

      <p style={{ color: darkMode ? "rgba(255,255,255,0.58)" : "rgba(0,0,0,0.6)", fontSize: "1rem", lineHeight: 1.72, margin: 0, fontFamily: "inherit" }}>
        {item.description}
      </p>

      {item.link && (
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "inline-block", marginTop: "14px", color: accent, fontSize: "0.82rem", fontFamily: "inherit" }}
        >
          {item.linkLabel || "View"}
        </a>
      )}
    </div>
  );
}




