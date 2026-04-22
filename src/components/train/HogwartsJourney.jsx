import { useState, useRef, useEffect, useCallback } from "react";
import { journeyItems } from "../../data/content";
import HogwartsExpressSVG, { Steam } from './HogwartsExpressSVG';
import StationCard from "./StationCard";
import "./train.css";

/*
- React hooks:
  useState -> store cahnging values (like scroll, active stop)
  useRef -> store values that don't trigger re-render (like DOM refs)
  useEffect -> run code when smth changse
  useCallback -> memoize fcns (avoid unnecessary re-render)
*/

// layout consts controlling spacing and sizing of the train + track
const STOP_SPACING = 500; // dist b/w stations on track
const TRAIN_W = 520; // train width (px)
const TRAIN_H = 120; // train height (px)
const TRACK_PADDING = 367; // hehe six seven (padding b4 first adn after last station)
const ACTIVE_HALF = TRAIN_W * 0.5; // threshold to decide "active" station

// main component
export default function HogwartsJourney({ darkMode = true }) {

  // refs: persist values w/o re-rendering
  const scrollSentinelRef = useRef(null);
  const stopTimerRef = useRef(null);
  const lastScrollX = useRef(0);

  // state
  const [scrollPct, setScrollPct] = useState(0); // % scroll process
  const [activeIndex,setActiveIndex] = useState(0); // curr station index
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

      {/* outer frame */}
      <div style={{
        position: "relative", width: "100%", borderRadius: "18px",
        border: `1px solid ${darkMode ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`,
        background: darkMode
          ? "linear-gradient(155deg, #0d0d1a 0%, #140808 55%, #0d0d1a 100%)"
          : "#fafafa",
        overflow: "hidden", cursor: "default", height: "330px",
      }}>

        {/* invisible scroll driver */}
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

          {/* stars (dark mode only) */}
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
              d={`M0,100 C${totalWidth * .06},50 ${totalWidth * .15},72 ${totalWidth * .28},38 C${totalWidth * .41},5 ${totalWidth * .54},62 ${totalWidth * .67},28 C${totalWidth * .8},0 ${totalWidth * .91},52 ${totalWidth},22 L${totalWidth},100Z`}
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
                  marginTop: "3px", fontSize: "0.72rem",
                  color: isActive
                    ? (darkMode ? "rgba(52,211,153,0.75)" : "rgba(5,150,105,0.75)")
                    : darkMode ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.28)",
                  fontFamily: "inherit", fontStyle: "italic",
                  whiteSpace: "nowrap", transition: "color 0.35s",
                }}>{stop.org}</p>
              </div>
            );
          })}

          {/* train */}
          <div
            className={rolling ? "train-rolling" : ""}
            style={{
              position: "absolute",
              left: `${trainLeft}px`, top: "67px",
              width: `${TRAIN_W}px`, height: `${TRAIN_H}px`,
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
