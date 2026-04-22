// wheel, Steam, and HogwartsExpressSVG; purely visual, no state

// draws a wheel w/ spokes and applies rotation animation via css
function Wheel({ cx, cy, r, spokes = 8, period = "0.42s", delay = "0s" }) {

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
                    key={a}
                    x1={cx} y1={cy}
                    // convert angle to radians for trig positooning
                    x2={cx + (r - 5) * Math.cos((a * Math.PI) / 180)}
                    y2={cy + (r - 5) * Math.sin((a * Math.PI) / 180)}
                    stroke="#444" strokeWidth="2"
                />
            ))}

            {/* center */}
            <circle cx={cx} cy={cy} r={r * 0.18} fill="#c0392b" />
            <circle cx={cx} cy={cy} r={r * 0.08} fill="#f6c90e" />
        </g>
    );
}

// steam
function Steam({ active }) {

    // each puff has diff size, delay, adn horizontal offset
    const puffs = [
        { size: 28, delay: 0, dx: -4 },
        { size: 20, delay: 0.3, dx: 8 },
        { size: 36, delay: 0.6, dx: -12 },
        { size: 16, delay: 0.15, dx: 16 },
        { size: 24, delay: 0.45, dx: 0 },
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
                    width:`${p.size}px`, height: `${p.size}px`,
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

// train SVG
export default function HogwartsExpressSVG() {
    return (
        <svg
            viewBox="0 0 520 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: "100%", height: "100%", overflow: "visible" }}
        >

            {/* carriage 1 */}
            <rect x="0" y="50" width="88" height="36" rx="4" fill="#c0392b" />
            <rect x="0" y="50" width="88" height="6" rx="2" fill="#a93226" />
            <rect x="0" y="80" width="88" height="6" rx="2" fill="#8B0000" />

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
            <rect x="296" y="84" width="210" height="6" rx="1" fill="#a93226" />
            <rect x="292" y="32" width="38" height="55" rx="3" fill="#8B0000" />
            <rect x="292" y="32" width="38" height="6" rx="2" fill="#c0392b" />
            <rect x="288" y="28" width="46" height="8" rx="2" fill="#6b0000" />
            <rect x="298" y="37" width="16" height="14" rx="3" fill="#0d0d1a" stroke="#f6c90e" strokeWidth="1.2" opacity="0.9" />
            <rect x="300" y="39" width="5" height="10" rx="1" fill="white" opacity="0.06" />
            <rect x="316" y="37" width="10" height="26" rx="2" fill="#7a0000" />

            <circle cx="320" cy="52" r="1.5" fill="#f6c90e" opacity="0.7" />

            <rect x="328" y="32" width="148" height="42" rx="0" fill="#1e1e1e" />

            <ellipse cx="330" cy="53" rx="8" ry="21" fill="#1e1e1e" />
            <ellipse cx="476" cy="53" rx="14" ry="21" fill="#1e1e1e" />

            {[340, 356, 372, 388, 404, 420, 436, 452, 466].map((x, i) => (
                <rect key={i} x={x} y="32" width="3" height="42" rx="1" fill="#111" opacity="0.8" />
            ))}

            <rect x="332" y="33" width="140" height="6" rx="2" fill="rgba(255,255,255,0.04)" />

            <line x1="328" y1="36" x2="476" y2="36" stroke="#8B6914" strokeWidth="1.5" opacity="0.7" />
            <line x1="328" y1="70" x2="476" y2="70" stroke="#8B6914" strokeWidth="1.5" opacity="0.7" />

            <ellipse cx="344" cy="42" rx="10" ry="7" fill="#1a1a1a" />
            <ellipse cx="344" cy="40" rx="8" ry="5" fill="#242424" />
            <ellipse cx="388" cy="36" rx="16" ry="10" fill="#1a1a1a" />
            <ellipse cx="388" cy="34" rx="14" ry="7" fill="#242424" />
            <ellipse cx="388" cy="44" rx="16" ry="4" fill="#2a2a2a" />
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
            <Wheel cx={376} cy={97} r={22} spokes={8} period="0.5s" delay="0s" />
            <Wheel cx={432} cy={97} r={22} spokes={8} period="0.5s" delay="0s" />
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
