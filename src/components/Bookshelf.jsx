import React, { useState, useEffect } from "react";
import { GraduationCap, Music, Code2, Users, Rss, Film, Compass, Utensils, Disc3, X } from "lucide-react";
import { useInView } from "../utils/hooks";

const CREAM = "#f6efe3";

const BOOKS = [
  {
    id: "uni",
    spine: "UNI",
    icon: GraduationCap,
    orientation: "upright",
    file: "uni.md",
    color: "#c1583a", // terracotta
    body: [
      { type: "kv", key: "school", value: "University of Toronto" },
      { type: "kv", key: "year", value: "3rd year" },
      { type: "kv", key: "program", value: "Software Engineering (& Stats)" },
      { type: "kv", key: "doing", value: "Building things, solving problems through code, and making amazing, really funny jokes" },
    ],
  },
  {
    id: "origin",
    spine: "ORIGIN",
    icon: Code2,
    orientation: "upright",
    file: "origin.md",
    color: "#2f6690", // deep blue
    body: [
      {
        type: "prose",
        text: "Built a tiny Java game in high school. It worked… most of the time. That project hooked me; now I spend way too many hours debugging things I created myself.",
      },
    ],
  },
  {
    id: "hobbies",
    spine: "HOBBIES",
    icon: Music,
    orientation: "upright",
    file: "hobbies.md",
    color: "#7a8b4f", // sage green
    body: [
      { type: "kv", key: "instruments", value: "Guitar, Piano" },
      { type: "kv", key: "reading", value: "Harry Potter, Percy Jackson, Thriller + Mystery" },
      { type: "kv", key: "food", value: "Baking, Eating" },
      { type: "kv", key: "other", value: "Scrolling pinterest, Travelling, Skateboarding (new!)" },
    ],
  },
  {
    id: "blog",
    spine: "BLOG",
    icon: Rss,
    orientation: "lean",
    angle: -12,
    file: "blog.md",
    color: "#7d4f8a", // plum
    body: [
      { type: "prose", text: "I blog sometimes :))" },
      { type: "link", label: "read", text: "my Medium page ↗", href: "https://medium.com/@anjali.ckpatidar" },
    ],
  },
  {
    id: "sidequests",
    spine: "SIDEQUESTS",
    icon: Users,
    orientation: "flat",
    file: "clubs.md",
    color: "#c79a2e", // mustard gold
    placeholder: true,
    body: [
      { type: "kv", key: "clubs", value: "CSEC, GDG" },
      { type: "kv", key: "uni", value: "CMS Ambassador, Undergraduate Teaching Assistant, Research Assistant" },
      { type: "kv", key: "community", value: "Basketball team, Making websites (freelancer)" },
    ],
  },
  {
    id: "movies",
    spine: "MOVIES",
    icon: Film,
    orientation: "flat",
    file: "movies.md",
    color: "#3f6b63", // deep teal
    placeholder: true,
    body: [
      { type: "kv", key: "funny", value: "..." },
      { type: "kv", key: "wholesome", value: "..." },
      { type: "kv", key: "favourite", value: "..." },
    ],
  },
// color: "#4f6d7a", // steel blue
// color: "#b0703a", // amber brown
  {
    id: "playlist",
    spine: "PLAYLIST",
    icon: Disc3,
    angle: -4,
    orientation: "lean",
    file: "playlist.md",
    color: "#4a4a8f", // indigo
    placeholder: true,
    body: [{ type: "todo", text: "// coming soon" }],
  },
];

// tracks whether the viewport is below `breakpoint`, matching the `sm:`
// tailwind prefix used elsewhere in this component (640px)
function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpoint]);

  return isMobile;
}

function BookBody({ book, colors }) {
  return (
    <div className="space-y-2">
      {book.body.map((line, i) => {
        if (line.type === "kv") {
          return (
            <div key={i} className={`text-sm ${colors.secondaryText}`}>
              <span style={{ color: book.color, fontWeight: 600 }}>{line.key}:</span> {line.value}
            </div>
          );
        }
        if (line.type === "link") {
          return (
            <div key={i} className={`text-sm ${colors.secondaryText}`}>
              <span style={{ color: book.color, fontWeight: 600 }}>{line.label}:</span>{" "}
              
                href={line.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
                style={{ color: book.color }}
              <a>
                {line.text}
              </a>
            </div>
          );
        }
        if (line.type === "todo") {
          return (
            <div key={i} className={`text-sm italic ${colors.secondaryText}`} style={{ opacity: 0.7 }}>
              {line.text}
            </div>
          );
        }
        return (
          <p key={i} className={`text-sm leading-relaxed ${colors.secondaryText}`}>
            {line.text}
          </p>
        );
      })}
    </div>
  );
}

function Spine({ book, isOpen, isInView, index, onClick }) {
  const Icon = book.icon;
  const angle = book.orientation === "lean" ? book.angle : 0;
  const lift = isOpen ? -20 : 0;
  // leaning books tip their top edge sideways, which can eat into a
  // neighboring spine's space — add clearance on the side they lean toward
  const leanClearance = Math.abs(angle) > 0 ? Math.round(Math.abs(Math.sin((angle * Math.PI) / 180)) * 150) : 0;
  const marginLeft = angle < 0 ? leanClearance : 0;
  const marginRight = angle > 0 ? leanClearance : 0;

  return (
    <button
      onClick={onClick}
      aria-expanded={isOpen}
      aria-label={`${book.spine} book`}
      className="relative flex flex-col items-center justify-start pt-3 pb-2 rounded-t-md transition-all duration-300 hover:brightness-110 focus:outline-none"
      style={{
        width: 34,
        height: 150,
        marginLeft,
        marginRight,
        background: `linear-gradient(180deg, ${book.color} 0%, ${book.color} 85%, rgba(0,0,0,0.25) 100%)`,
        boxShadow: isOpen
          ? `0 12px 22px rgba(0,0,0,0.35), 0 0 0 2px ${CREAM}`
          : "0 2px 4px rgba(0,0,0,0.3), inset -3px 0 6px rgba(0,0,0,0.2), inset 3px 0 6px rgba(255,255,255,0.15)",
        transform: `translateY(${isInView ? lift : 40}px) rotate(${isInView ? (isOpen ? 0 : angle) : angle}deg)`,
        opacity: isInView ? 1 : 0,
        transitionDelay: `${index * 70}ms`,
        transitionProperty: "opacity, transform, filter",
        transitionDuration: "600ms",
        transformOrigin: "bottom center",
        zIndex: isOpen ? 30 : 5,
        cursor: "pointer",
      }}
    >
      <Icon size={12} color={CREAM} />
      <span
        className="font-mono text-xs font-bold tracking-wide mt-2"
        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", color: CREAM }}
      >
        {book.spine}
      </span>
    </button>
  );
}

function FlatBook({ book, isOpen, isInView, index, onClick }) {
  const Icon = book.icon;
  return (
    <button
      onClick={onClick}
      aria-expanded={isOpen}
      aria-label={`${book.spine} book`}
      className="relative flex items-center gap-2 px-3 rounded-sm transition-all duration-300 hover:brightness-110 focus:outline-none"
      style={{
        width: 150,
        height: 30,
        marginBottom: (index % 2) * 4,
        background: `linear-gradient(180deg, ${book.color} 0%, ${book.color} 80%, rgba(0,0,0,0.25) 100%)`,
        boxShadow: isOpen
          ? `0 10px 18px rgba(0,0,0,0.35), 0 0 0 2px ${CREAM}`
          : "0 2px 4px rgba(0,0,0,0.3), inset 0 -3px 6px rgba(0,0,0,0.2), inset 0 3px 6px rgba(255,255,255,0.15)",
        transform: `translateX(${isInView ? (isOpen ? 10 : 0) : 40}px)`,
        opacity: isInView ? 1 : 0,
        transitionDelay: `${300 + index * 90}ms`,
        transitionProperty: "opacity, transform, filter",
        transitionDuration: "600ms",
        zIndex: isOpen ? 30 : 6 + index,
        cursor: "pointer",
      }}
    >
      <Icon size={12} color={CREAM} />
      <span className="font-mono text-xs font-bold tracking-wide" style={{ color: CREAM }}>
        {book.spine}
      </span>
    </button>
  );
}

// one physical shelf: a row of upright/leaning spines plus flat stacks,
// sitting on its own wooden board. rendering more than one of these
// (each with its own board) is what makes the "second shelf" on mobile.
function ShelfRow({ books, flatStacks, isInView, startIndex, openId, setOpenId, woodBoard, minHeight }) {
  return (
    <div className="relative flex items-end gap-1 pb-3 flex-wrap" style={{ minHeight }}>
      {books.map((book, i) => (
        <Spine
          key={book.id}
          book={book}
          isOpen={openId === book.id}
          isInView={isInView}
          index={startIndex + i}
          onClick={() => setOpenId(openId === book.id ? null : book.id)}
        />
      ))}

      {flatStacks.map((stack, s) => (
        <div key={s} className="relative flex flex-col-reverse ml-1" style={{ minWidth: 150, height: 100 }}>
          {stack.map((book, i) => (
            <FlatBook
              key={book.id}
              book={book}
              isOpen={openId === book.id}
              isInView={isInView}
              index={startIndex + s * 2 + i}
              onClick={() => setOpenId(openId === book.id ? null : book.id)}
            />
          ))}
        </div>
      ))}

      {/* the wooden shelf board itself, with a cast shadow underneath for depth */}
      <div
        className="absolute left-0 right-0"
        style={{
          bottom: 0,
          height: 10,
          background: woodBoard,
          borderRadius: "6px",
          boxShadow: "0 2px 3px rgba(0,0,0,0.5)",
        }}
      />
      <div
        className="absolute left-0 right-0"
        style={{ bottom: -8, height: 8, background: "linear-gradient(to bottom, rgba(0,0,0,0.4), transparent)" }}
      />
    </div>
  );
}

function DetailPanel({ book, colors, onClose }) {
  if (!book) return null;
  const Icon = book.icon;
  return (
    <div className="absolute inset-0 flex items-center justify-center px-4" style={{ zIndex: 50 }}>
      <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.5)" }} onClick={onClose} />
      <div
        className={`relative w-full ${colors.cardBg} border ${colors.borderColor} rounded-lg shadow-2xl overflow-hidden`}
        style={{ maxWidth: "420px" }}
      >
        {/* the book's own cover color, down the left edge */}
        <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ backgroundColor: book.color }} />

        <div className="flex items-start justify-between px-6 pt-5 pb-3">
          <div className="flex items-center gap-2">
            <Icon size={18} style={{ color: book.color }} />
            <h3 className={`font-mono text-lg font-bold tracking-wide ${colors.textColor}`}>{book.spine}</h3>
          </div>
          <button onClick={onClose} className={`${colors.secondaryText} hover:${colors.accentColor}`} aria-label="Close">
            <X size={16} />
          </button>
        </div>
        <div className="px-6 pb-6">
          <BookBody book={book} colors={colors} />
        </div>
      </div>
    </div>
  );
}

export default function BookShelf({ colors }) {
  const [openId, setOpenId] = useState(null);
  const [shelfRef, shelfInView] = useInView(0.1);
  const isMobile = useIsMobile();

  const upright = BOOKS.filter((b) => b.orientation === "upright" || b.orientation === "lean");
  const flat = BOOKS.filter((b) => b.orientation === "flat");
  const activeBook = BOOKS.find((b) => b.id === openId) || null;

  // never more than 2 flat books stacked on top of each other;
  // split into as many side-by-side stacks of 2 as needed
  const flatStacks = [];
  for (let i = 0; i < flat.length; i += 2) {
    flatStacks.push(flat.slice(i, i + 2));
  }

  // the shelf board itself stays a dark wood brown regardless of theme
  const woodBoard = "#3a2313";

  return (
    <div>
      <div
        ref={shelfRef}
        className={`relative w-full rounded-xl shadow-xl overflow-hidden px-6 sm:px-10 pt-8 pb-10 border ${colors.borderColor} ${colors.bgColor}`}
      >
        {isMobile ? (
          // mobile: give the wrapped rows their own shelves, stacked
          // vertically like an actual bookcase
          <div className="flex flex-col gap-12">
            <ShelfRow
              books={upright}
              flatStacks={[]}
              isInView={shelfInView}
              startIndex={0}
              openId={openId}
              setOpenId={setOpenId}
              woodBoard={woodBoard}
              minHeight={190}
            />
            <ShelfRow
              books={[]}
              flatStacks={flatStacks}
              isInView={shelfInView}
              startIndex={upright.length}
              openId={openId}
              setOpenId={setOpenId}
              woodBoard={woodBoard}
              minHeight={120}
            />
          </div>
        ) : (
          // desktop: everything fits on one shelf
          <ShelfRow
            books={upright}
            flatStacks={flatStacks}
            isInView={shelfInView}
            startIndex={0}
            openId={openId}
            setOpenId={setOpenId}
            woodBoard={woodBoard}
            minHeight={220}
          />
        )}

        <DetailPanel book={activeBook} colors={colors} onClose={() => setOpenId(null)} />
      </div>
    </div>
  );
}