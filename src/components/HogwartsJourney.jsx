import { useState, useRef, useEffect, useCallback } from "react";
import { journeyItems } from "../data/content";

/*
- React hooks:
  useState -> store cahnging values (like scroll, active stop)
  useRef -> store values that don't trigger re-render (like DOM refs)
  useEffect -> run code when smth changse
  useCallback -> memoize fcns (avoid unnecessary re-render)
*/

// layout consts controlling spacing and sizing of the train + track
const STOP_SPACING  = 500; // dist b/w stations on track
const TRAIN_W = 520; // train width (px)
const TRAIN_H = 120; // train height (px)
const TRACK_PADDING = 367; // hehe six seven (padding b4 first adn after last station)
const ACTIVE_HALF = TRAIN_W * 0.5; // threshold to decide "active" station

// reusable SVG wheel compomnet
// draws a wheel w/ spokes and applies rotation animation via css
function Wheel({ cx, cy, r, spokes = 8, period = "0.42s", delay = "0s" }){

  // generate evenly spaced angles for spokes (0 -> 360 degrees)
  const spokeAngles = Array.from({ length: spokes }, (_, i) => (i * 360) / spokes);

  return (
    <g
      className="wheel-group"
      // control animation timing dynamically
      style={{ animationDuration: period, animationDelay: delay }}
    >
      {/* outer wheel */}
      <circle cx={cx} cy={cy} r={r} fill="#1a1a1a" stroke="#111" strokeWidth="2.5" />

      {/* inner ring */}
      <circle cx={cx} cy={cy} r={r - 4} fill="none" stroke="#333" strokeWidth="1.5" />

      {/* spokes */}
      {spokeAngles.map((a) => (
        <line
          key = {a}
          x1={cx} y1={cy}
          // convert angle to radians for trig positooning
          x2 = {cx + (r - 5) * Math.cos((a * Math.PI) / 180)}
          y2= {cy + (r - 5) * Math.sin((a * Math.PI) / 180)}
          stroke="#444" strokeWidth="2"
        />
      ))}

      {/* center */}
      <circle cx={cx} cy={cy} r={r * 0.18} fill="#c0392b" />
      <circle cx={cx} cy={cy} r={r * 0.08} fill="#f6c90e" />
    </g>
  );
}

// train SVG
function HogwartsExpressSVG() {
  return (
    <svg
      viewBox="0 0 520 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%", overflow: "visible" }}
    >


      {/* carriage 1 */}
      <rect x="0" y="50" width="88" height="36" rx="4" fill="#c0392b" />
      <rect x="0" y="50" width="88" height="6"  rx="2" fill="#a93226" />
      <rect x="0" y="80" width="88" height="6"  rx="2" fill="#8B0000" />

      {[6, 22, 38, 54, 70].map((x) => (
        <rect key={x} x={x} y="55" width="12" height="10" rx="2" fill="#0d0d1a" stroke="#f6c90e" strokeWidth="0.8" opacity="0.85" />
      ))}

      <rect x="0" y="84" width="88" height="4" rx="1" fill="#c0392b" />
      <Wheel cx={20} cy={97} r={11} spokes={6} period="0.42s" delay="0.08s" />
      <Wheel cx={66} cy={97} r={11} spokes={6} period="0.42s" delay="0.06s" />


      {/* carriage 2 */}
      <rect x="94" y="50" width="88" height="36" rx="4" fill="#c0392b" />
      <rect x="94" y="50" width="88" height="6" rx="2" fill="#a93226" />
      <rect x="94" y="80" width="88" height="6" rx="2" fill="#8B0000" />

      {[100, 116, 132, 148, 164].map((x) => (
        <rect key={x} x={x} y="55" width="12" height="10" rx="2" fill="#0d0d1a" stroke="#f6c90e" strokeWidth="0.8" opacity="0.85" />
      ))}

      <rect x="94" y="84" width="88" height="4" rx="1" fill="#c0392b" />
      <Wheel cx={114} cy={97} r={11} spokes={6} period="0.42s" delay="0.05s" />
      <Wheel cx={160} cy={97} r={11} spokes={6} period="0.42s" delay="0.03s" />


      {/* couplings */}
      <rect x="88" y="85" width="8" height="4" rx="1" fill="#444" />
      <rect x="182" y="85" width="8" height="4" rx="1" fill="#444" />


      {/* tender */}
      <rect x="192" y="44" width="92" height="40" rx="3" fill="#8B0000" />
      <rect x="194" y="44" width="88" height="16" rx="2" fill="#1a1a1a" />

      {[200, 213, 226, 239, 252, 265].map((x) => (
        <ellipse key={x} cx={x} cy="50" rx="5" ry="3" fill="#111" />
      ))}

      <rect x="192" y="80" width="92" height="8" rx="1" fill="#c0392b" />
      <rect x="192" y="82" width="92" height="5" rx="1" fill="#a93226" />
      <Wheel cx={216} cy={97} r={14} spokes={6} period="0.45s" delay="0.04s" />
      <Wheel cx={260} cy={97} r={14} spokes={6} period="0.45s" delay="0.02s" />
      <rect x="284" y="85" width="8" height="4" rx="1" fill="#444" />


      {/* locomotive body */}
      <rect x="292" y="72" width="220" height="14" rx="2" fill="#c0392b" />
      <rect x="296" y="84" width="210" height="6"  rx="1" fill="#a93226" />
      <rect x="292" y="32" width="38" height="55" rx="3" fill="#8B0000" />
      <rect x="292" y="32" width="38" height="6"  rx="2" fill="#c0392b" />
      <rect x="288" y="28" width="46" height="8"  rx="2" fill="#6b0000" />
      <rect x="298" y="37" width="16" height="14" rx="3" fill="#0d0d1a" stroke="#f6c90e" strokeWidth="1.2" opacity="0.9" />
      <rect x="300" y="39" width="5"  height="10" rx="1" fill="white" opacity="0.06" />
      <rect x="316" y="37" width="10" height="26" rx="2" fill="#7a0000" />
      <circle cx="320" cy="52" r="1.5" fill="#f6c90e" opacity="0.7" />
      <rect x="328" y="32" width="148" height="42" rx="0" fill="#1e1e1e" />

      <ellipse cx="330" cy="53" rx="8"  ry="21" fill="#1e1e1e" />
      <ellipse cx="476" cy="53" rx="14" ry="21" fill="#1e1e1e" />

      {[340, 356, 372, 388, 404, 420, 436, 452, 466].map((x, i) => (
        <rect key={i} x={x} y="32" width="3" height="42" rx="1" fill="#111" opacity="0.8" />
      ))}

      <rect x="332" y="33" width="140" height="6" rx="2" fill="rgba(255,255,255,0.04)" />

      <line x1="328" y1="36" x2="476" y2="36" stroke="#8B6914" strokeWidth="1.5" opacity="0.7" />
      <line x1="328" y1="70" x2="476" y2="70" stroke="#8B6914" strokeWidth="1.5" opacity="0.7" />

      <ellipse cx="344" cy="42" rx="10" ry="7" fill="#1a1a1a" />
      <ellipse cx="344" cy="40" rx="8"  ry="5" fill="#242424" />
      <ellipse cx="388" cy="36" rx="16" ry="10" fill="#1a1a1a" />
      <ellipse cx="388" cy="34" rx="14" ry="7"  fill="#242424" />
      <ellipse cx="388" cy="44" rx="16" ry="4"  fill="#2a2a2a" />
      <ellipse cx="388" cy="44" rx="14" ry="2.5" fill="#8B6914" />

      <circle cx="485" cy="53" r="23" fill="#141414" />
      <circle cx="485" cy="53" r="20" fill="#1a1a1a" stroke="#111" strokeWidth="2" />
      <circle cx="485" cy="53" r="17" fill="#0f0f0f" stroke="#2a2a2a" strokeWidth="1" />
      <circle cx="485" cy="53" r="14" fill="none" stroke="#333" strokeWidth="1.5" />
      <circle cx="485" cy="53" r="4" fill="#444" />
      <circle cx="485" cy="53" r="2" fill="#666" />


      {/* name plate */}
      <rect x="465" y="37" width="38" height="14" rx="3" fill="#c0392b" />
      <rect x="466" y="38" width="36" height="12" rx="2.5" fill="#a93226" />

      <text x="484" y="42.5" textAnchor="middle" fontSize="3.8" fill="#f6c90e" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="0.3">HOGWARTS</text>
      <text x="484" y="47.5" textAnchor="middle" fontSize="3.8" fill="#f6c90e" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="0.3">EXPRESS</text>


      {/* chimney */}
      <rect x="464" y="10" width="16" height="28" rx="2" fill="#1a1a1a" />
      <rect x="459" y="7" width="26" height="8" rx="3" fill="#2a2a2a" />
      <rect x="461" y="5" width="22" height="5" rx="2" fill="#b8860b" />
      <rect x="458" y="10" width="28" height="3" rx="1" fill="#8B6914" />


      {/* front buffer */}
      <rect x="498" y="82" width="22" height="10" rx="1.5" fill="#c0392b" />

      {[501, 504, 507, 510, 513, 516].map((x) => (
        <circle key={x} cx={x} cy="85" r="1" fill="#f6c90e" opacity="0.6" />
      ))}

      <rect x="498" y="84" width="5" height="6" rx="1" fill="#8B0000" />
      <rect x="512" y="84" width="5" height="6" rx="1" fill="#8B0000" />
      <rect x="514" y="87" width="6" height="4" rx="1" fill="#333" />


      {/* locomotive wheels */}
      <Wheel cx={376} cy={97} r={22} spokes={8} period="0.5s"  delay="0s" />
      <Wheel cx={432} cy={97} r={22} spokes={8} period="0.5s"  delay="0s" />
      <Wheel cx={490} cy={97} r={14} spokes={6} period="0.45s" delay="0s" />
      <Wheel cx={310} cy={97} r={14} spokes={6} period="0.45s" delay="0.05s" />


      {/* connecting rod */}
      <rect x="354" y="90" width="100" height="5" rx="2.5" fill="#c0392b" />
      <rect x="354" y="94" width="100" height="2" rx="1" fill="#a93226" opacity="0.6" />
      <rect x="406" y="88" width="50" height="4" rx="2" fill="#8B0000" opacity="0.7" />


      {/* shadow */}
      <ellipse cx="260" cy="112" rx="240" ry="5" fill="black" opacity="0.18" />

    </svg>
  );
}

// steam
function Steam({ active }) {

  // each puff has diff size, delay, adn horizontal offset
  const puffs = [
    { size: 28, delay: 0,    dx: -4  },
    { size: 20, delay: 0.3,  dx:  8  },
    { size: 36, delay: 0.6,  dx: -12 },
    { size: 16, delay: 0.15, dx:  16 },
    { size: 24, delay: 0.45, dx:   0 },
  ];

  return (
    <div style={{
      position: "absolute", 
      right: "26px",
      top: "-100px",
      width: "80px",
      height: "100px", 
      pointerEvents: "none", // allow clicks to pass thru
    }}>
      {puffs.map((p, i) => (
        <div key={i} style={{
          position: "absolute",
          left: `${36 + p.dx}px`, bottom: 0,
          width: `${p.size}px`, height: `${p.size}px`,
          borderRadius: "50%",
          background: "rgba(230,230,230,0.3)",
          filter: "blur(8px)",
          animation: active // only animate when train is moving
            ? `steamPuff 2s ease-out ${p.delay}s infinite`
            : "none",
          opacity: 0,
        }} />
      ))}
    </div>
  );
}

// station card 
function StationCard({ item, visible, darkMode }) {

  const accent = darkMode ? "rgba(52,211,153,0.75)" : "rgba(5,150,105,0.85)";
  const accentLine = darkMode ? "rgba(52,211,153,0.35)" : "rgba(0,0,0,0.3)";

  return (

    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0px)" : "translateY(4px)",
      transition: "opacity 0.4s ease, transform 0.4s ease",
      background: darkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
      border: `1px solid ${darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)"}`,
      borderRadius: "14px", padding: "28px 32px",
      position: "relative", overflow: "hidden",
      boxShadow: darkMode
        ? "0 0 40px rgba(52,211,153,0.05), inset 0 0 40px rgba(0,0,0,0.15)"
        : "0 2px 20px rgba(0,0,0,0.06)",
      fontFamily: "inherit",
    }}>

      <div style={{
        position: "absolute", top: 0, left: "8%", right: "8%", height: "1px",
        background: `linear-gradient(90deg, transparent, ${accentLine}, transparent)`,
      }} />

      <div style={{
        display: "flex", alignItems: "flex-start", justifyContent: "space-between",
        flexWrap: "wrap", gap: "8px", marginBottom: "14px",
      }}>

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

// main component
export default function HogwartsJourney({ darkMode = true }) {

  // refs: persist values w/o re-rendering
  const scrollSentinelRef = useRef(null);
  const stopTimerRef = useRef(null);
  const lastScrollX = useRef(0);

  // state
  const [scrollPct, setScrollPct] = useState(0); // % scroll process
  const [activeIndex, setActiveIndex] = useState(0); // curr station index
  const [rolling, setRolling] = useState(false); // is train moving
  const [facingRight, setFacingRight] = useState(true); // direction of train
  const [cardVisible, setCardVisible] = useState(true); // fade animation for card

  // totla width of scrollable track

  // X positions of each station
  const totalWidth = TRACK_PADDING + STOP_SPACING * (journeyItems.length - 1) + TRACK_PADDING;

  // X positons of each station
  const stopPositions = journeyItems.map((_, i) => TRACK_PADDING + i * STOP_SPACING);

  const firstStop = stopPositions[0];
  const lastStop = stopPositions[stopPositions.length - 1];

  // train positon interpolated from scroll %
  const trainX = firstStop + scrollPct * (lastStop - firstStop);

  // adjust trains left position depending on direction
  const trainLeft = facingRight
    ? trainX - TRAIN_W * 0.94
    : trainX - TRAIN_W * 0.67;

   // center oft train (detect nearest station)
  const trainCenter = trainLeft + TRAIN_W / 2;

  // find station closest to the train center
  const nearestIndex = stopPositions.reduce(
    (best, x, i) =>
      Math.abs(x - trainCenter) < Math.abs(stopPositions[best] - trainCenter) ? i : best,
    0
  );

  // handles horizontal scroll updates
  const handleScroll = useCallback(() => {
    const el = scrollSentinelRef.current;
    if (!el) return;

    const max = el.scrollWidth - el.clientWidth; // max scrollable length
    const pct = max > 0 ? el.scrollLeft / max : 0; // convert scroll position -> percentage

    // determine direction
    setFacingRight(el.scrollLeft >= lastScrollX.current);
    lastScrollX.current = el.scrollLeft;

    setScrollPct(pct);
    setRolling(true); // trigger rolling animation

    // stop rolling after user stops scrolling (debounce)
    if (stopTimerRef.current) clearTimeout(stopTimerRef.current);
    stopTimerRef.current = setTimeout(() => setRolling(false), 350);
  }, []);

  // attach scroll event listener on mount
  useEffect(() => {
    const el = scrollSentinelRef.current;
    if (!el) return;

    el.addEventListener("scroll", handleScroll, { passive: true });
    
    // cleanup on unmount
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // card swap
  // update active sttion card when train is close enough
  useEffect(() => {
    const dist = Math.abs(stopPositions[nearestIndex] - trainCenter);

    if (dist >= ACTIVE_HALF) return; // only switch if train is close enough
    if (nearestIndex === activeIndex) return; // avoid unnecessary updates

    setCardVisible(false); // fade out -> swap -> fade in

    const t = setTimeout(() => {
      setActiveIndex(nearestIndex);
      setCardVisible(true);
    }, 150);

    return () => clearTimeout(t);
  }, [scrollPct]);

  const item = journeyItems[activeIndex];
  const accent = darkMode ? "rgba(52,211,153,0.8)" : "rgba(5,150,105,0.9)";
  const accentDim = darkMode ? "rgba(52,211,153,0.3)" : "rgba(5,150,105,0.35)";
  const accentFnt = darkMode ? "rgba(52,211,153,0.18)" : "rgba(5,150,105,0.15)";

  const clientW = scrollSentinelRef.current?.clientWidth ?? 60000;

  return (
    <div style={{ width: "100%", fontFamily: "inherit" }}>
      <style>{`
        @keyframes wheelSpin { to { transform: rotate(360deg); } }
        @keyframes steamPuff {
          0%   { transform: translateY(0)     scale(0.5); opacity: 0.75; }
          100% { transform: translateY(-90px) scale(2.6); opacity: 0;    }
        }
        .wheel-group {
          transform-box: fill-box;
          transform-origin: center;
          animation: wheelSpin 0.42s linear infinite;
          animation-play-state: paused;
        }
        .train-rolling .wheel-group {
          animation-play-state: running;
        }
        .hj-sentinel {
          position: absolute; inset: 0;
          overflow-x: scroll; overflow-y: hidden;
          opacity: 0; z-index: 20;
          cursor: default !important;
        }
        .hj-sentinel::-webkit-scrollbar { display: none; }
        .hj-sentinel { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* outer frame */}
      <div style={{
        position: "relative", width: "100%", borderRadius: "18px",
        border: `1px solid ${darkMode ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`,
        background: darkMode
          ? "linear-gradient(155deg, #0d0d1a 0%, #140808 55%, #0d0d1a 100%)"
          : "#fafafa",
        overflow: "hidden", cursor: "default", height: "330px",
      }}>
        {/* scroll sentinel */}
        <div ref={scrollSentinelRef} className="hj-sentinel">
          <div style={{ width: `${totalWidth}px`, height: "1px" }} />
        </div>

        {/* visual canvas */}
        <div style={{
          position: "absolute", top: 10, left: 0,
          width: `${totalWidth}px`, height: "187px",
          transform: `translateX(${-scrollPct * Math.max(0, totalWidth - clientW)}px)`,
          willChange: "transform",
        }}>

          {/* stars */}
          {darkMode && Array.from({ length: 32 }).map((_, i) => (
            <div key={i} style={{
              position: "absolute",
              left: `${(i * 37.3) % 100}%`, top: `${(i * 23.7) % 50}%`,
              width: `${1 + (i % 2)}px`, height: `${1 + (i % 2)}px`,
              borderRadius: "50%", background: "white",
              opacity: 0.12 + (i % 5) * 0.06, pointerEvents: "none",
            }} />
          ))}

          {/* hills */}
          <svg
            viewBox={`0 0 ${totalWidth} 100`}
            preserveAspectRatio="none"
            style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "100px", pointerEvents: "none", opacity: darkMode ? 0.09 : 0.06 }}
          >
            <path
              d={`M0,100 C${totalWidth*.06},50 ${totalWidth*.15},72 ${totalWidth*.28},38 C${totalWidth*.41},5 ${totalWidth*.54},62 ${totalWidth*.67},28 C${totalWidth*.8},0 ${totalWidth*.91},52 ${totalWidth},22 L${totalWidth},100Z`}
              fill={darkMode ? "#1a0808" : "#8B5E3C"}
            />
          </svg>

          {/* rails */}
          {[170, 188].map((top) => (
            <div key={top} style={{
              position: "absolute", left: 0, right: 0, top: `${top}px`, height: "5px",
              background: darkMode
                ? "linear-gradient(90deg, transparent, rgba(139,90,43,0.9) 2%, rgba(139,90,43,0.9) 98%, transparent)"
                : "linear-gradient(90deg, transparent, rgba(80,50,20,0.65) 2%, rgba(80,50,20,0.65) 98%, transparent)",
              boxShadow: "0 1px 5px rgba(0,0,0,0.4)",
            }} />
          ))}

          {/* sleepers */}
          {Array.from({ length: Math.ceil(totalWidth / 34) }).map((_, i) => (
            <div key={i} style={{
              position: "absolute", left: `${i * 34 + 8}px`, top: "165px",
              width: "5px", height: "34px",
              background: darkMode ? "rgba(101,67,33,0.55)" : "rgba(80,50,20,0.35)",
              borderRadius: "2px",
            }} />
          ))}

          {/* station markers */}
          {journeyItems.map((stop, idx) => {
            const x = stopPositions[idx];
            const dist = Math.abs(x - trainCenter);
            const isActive = idx === nearestIndex && dist < ACTIVE_HALF;
            const isPast = x < trainCenter && !isActive;

            return (

              <div key={idx} style={{
                position: "absolute", left: `${x}px`, top: "155px",
                transform: "translateX(-50%)", display: "flex",
                flexDirection: "column", alignItems: "center",
                zIndex: 5, pointerEvents: "none",
              }}>

                <div style={{
                  width: "2px",
                  height: isActive ? "30px" : "22px",
                  background: isActive ? accent : isPast ? accentDim : darkMode ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.18)",
                  transition: "all 0.35s ease",
                }} />

                <div style={{
                  width: isActive ? "18px" : "10px",
                  height: isActive ? "18px" : "10px",
                  borderRadius: "50%",
                  background: isActive ? (darkMode ? "#34d399" : "#059669") : isPast ? accentDim : darkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)",
                  border: isActive ? `2.5px solid ${accentFnt}` : "2px solid rgba(255,255,255,0.08)",
                  boxShadow: isActive ? `0 0 18px ${accentDim}, 0 0 36px ${accentFnt}` : "none",
                  transition: "all 0.35s ease",
                }} />

                <p style={{
                  marginTop: "40px", fontSize: "0.75rem",
                  color: isActive ? accent : darkMode ? "rgba(255,255,255,0.27)" : "rgba(0,0,0,0.3)",
                  fontFamily: "inherit", whiteSpace: "nowrap",
                  fontWeight: isActive ? "bold" : "normal",
                  transition: "color 0.35s", letterSpacing: "0.04em",
                }}>{stop.year}</p>

                <p style={{
                  marginTop:"3px", fontSize: "0.72rem",
                  color: isActive
                    ? (darkMode ? "rgba(52,211,153,0.75)" : "rgba(5,150,105,0.75)")
                    : darkMode ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.28)",
                  fontFamily: "inherit", fontStyle: "italic",
                  whiteSpace: "nowrap", transition: "color 0.35s",
                }}>{stop.org}</p>

              </div>

            );
          })}

          {/* train — CSS class drives wheel animation, not prop */}
          <div
            className={rolling ? "train-rolling" : ""}
            style={{
              position: "absolute",
              left: `${trainLeft}px`,
              top: "67px",
              width: `${TRAIN_W}px`,
              height: `${TRAIN_H}px`,
              zIndex: 10,
              transform: facingRight ? "scaleX(1)" : "scaleX(-1)",
              transformOrigin: "50% 50%",
              transition: "transform 0.15s ease",
              filter: "drop-shadow(0 6px 18px rgba(192,57,43,0.5))",
            }}
          >
            <Steam active={rolling} />
            <HogwartsExpressSVG />
          </div>

          {/* edge fades */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: darkMode
              ? "linear-gradient(90deg, rgba(13,13,26,0.85) 0%, transparent 7%, transparent 93%, rgba(13,13,26,0.85) 100%)"
              : "linear-gradient(90deg, rgba(250,250,250,0.9) 0%, transparent 7%, transparent 93%, rgba(250,250,250,0.9) 100%)",
          }} />
        </div>
      </div>

      {/* station card */}
      <div style={{ marginTop: "26px" }}>
        <StationCard item={item} visible={cardVisible} darkMode={darkMode} />
      </div>
    </div>
  );
}
