// station card 
import { ExternalLink } from "lucide-react";
import { useState } from "react";

export default function StationCard({ item, visible, darkMode }) {

  const accent = darkMode ? "rgba(52,211,153,0.75)" : "rgba(5,150,105,0.85)";
  const accentLine = darkMode ? "rgba(52,211,153,0.35)" : "rgba(0,0,0,0.3)";
  const [hoveredRole, setHoveredRole] = useState(null);

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

      {/* role progression timeline */}
      {item.roles && (
        <div style={{ marginBottom: "12px", paddingLeft: "0.2em" }}>
          {item.roles.map((r, i) => (

            <div
              key={i}
              style={{ marginBottom: i < item.roles.length - 1 ? "8px" : 0 }}
              onMouseEnter={() => setHoveredRole(i)}
              onMouseLeave={() => setHoveredRole(null)}
            >
              <div
                style={{ display: "flex", alignItems: "flex-start", gap: "10px", cursor: "pointer" }}
              >

                {/* dot + line */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "4px" }}>
                  <div style={{
                    width: "7px", height: "7px", borderRadius: "50%",
                    background: i === 0 ? accent : accentLine,
                    flexShrink: 0,
                    transition: "transform 0.2s ease",
                    transform: hoveredRole === i ? "scale(1.5)" : "scale(1)",
                  }} />
                  {i < item.roles.length - 1 && (
                    <div style={{ 
                      width: "1px", 
                      height: "15px", 
                      background: accentLine, 
                      transition: "height 0.67s ease" }} />
                  )}
                </div>

                {/* role title + period */}
                <div>
                  <span style={{
                    color: hoveredRole === i ? accent : i === 0 ? accent : darkMode ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.55)",
                    fontSize: "1.0rem", fontWeight: i === 0 ? "600" : "normal",
                    fontFamily: "inherit", transition: "color 2s ease",
                  }}>
                    {r.title}
                  </span>
                  <span style={{
                    color: darkMode ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.3)",
                    fontSize: "0.9rem", fontFamily: "inherit", marginLeft: "8px",
                  }}>
                    {r.period}
                  </span>
                </div>
              </div>

              {/* inline description reveal */}
              <div style={{
                display: "grid",
                gridTemplateRows: hoveredRole === i ? "1fr" : "0fr",
                transition: "grid-template-rows 0.4s ease", // faster transition reduces jank
                overflow: "hidden",
                paddingLeft: "17px",
              }}>
                <ul style={{
                  minHeight: "0px",
                  margin: "6px 0 0 0", 
                  paddingLeft: "1.2em",
                  color: darkMode ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.5)",
                  fontSize: "0.95rem", 
                  lineHeight: 1.6, 
                  fontFamily: "inherit",
                  listStyleType: "disc",
                  // animation props.
                  opacity: hoveredRole === i ? 1 : 0,
                  transform: hoveredRole === i ? "translateY(0px)" : "translateY(-10px)",
                  transition: "opacity 0.3s ease, transform 0.3s ease",
                }}>
                  {r.description?.map((point, j) => (
                    <li key={j} style={{ marginBottom: "2px" }}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}


      {/* description bullets; only show if no roles timeline */}
      {!item.roles && (
        Array.isArray(item.description) ? (
          <ul style={{ color: darkMode ? "rgba(255,255,255,0.58)" : "rgba(0,0,0,0.6)", fontSize: "1rem", lineHeight: 1.72, margin: 0, paddingLeft: "1.4em", fontFamily: "inherit", listStyleType: "disc" }}>
            {item.description.map((point, i) => (
              <li key={i} style={{ marginBottom: "4px", paddingLeft: "0.2em" }}>{point}</li>
            ))}
          </ul>
        ) : (
          <ul style={{ color: darkMode ? "rgba(255,255,255,0.58)" : "rgba(0,0,0,0.6)", fontSize: "1rem", lineHeight: 1.72, margin: 0, paddingLeft: "1.4em", fontFamily: "inherit", listStyleType: "disc" }}>
            <li style={{ paddingLeft: "0.2em" }}>{item.description}</li>
          </ul>
        )
      )}


      {/* link */}
      {item.link && (
        <div style={{ paddingLeft: "1.6em", marginTop: "10px" }}>
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="station-link"
            style={{
              color: accent,
              fontSize: "0.85rem",
              fontFamily: "inherit",
              opacity: 0.9,
            }}
          >
            {item.linkLabel || "View"} <ExternalLink size={16} />          
          </a>
        </div>
      )}
    </div>
  );
}
