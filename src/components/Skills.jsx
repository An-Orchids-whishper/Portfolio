import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, animate, useInView } from "framer-motion";

// ─── Spring presets (same as Hero) ───────────────────────────────────────────
const BOUNCY = { type: "spring", stiffness: 300, damping: 18, mass: 0.8 };
const SLOW   = { type: "spring", stiffness: 120, damping: 20, mass: 1.2 };
const SNAPPY = { type: "spring", stiffness: 400, damping: 22 };

// ─── Animated counter ─────────────────────────────────────────────────────────
function Counter({ to, delay = 0, suffix = "" }) {
  const val = useMotionValue(0);
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => {
      const unsub = val.on("change", v => setDisplay(Math.round(v)));
      animate(val, to, { duration: 1.6, ease: [0.22, 1, 0.36, 1] });
      return unsub;
    }, delay);
    return () => clearTimeout(t);
  }, [inView, to, delay, val]);
  return <span ref={ref}>{display}{suffix}</span>;
}

// ─── Skill data ───────────────────────────────────────────────────────────────
const skills = [
  {
    name: "JavaScript",
    abbr: "JS",
    level: 92,
    category: "Language",
    years: 3,
    color: "#f0db4f",
    desc: "ES2024, async patterns, closures",
  },
  {
    name: "React.js",
    abbr: "Re",
    level: 88,
    category: "Frontend",
    years: 3,
    color: "#61dafb",
    desc: "Hooks, context, performance",
  },
  {
    name: "Node.js",
    abbr: "No",
    level: 82,
    category: "Backend",
    years: 2,
    color: "#68a063",
    desc: "REST, streams, cluster",
  },
  {
    name: "Express.js",
    abbr: "Ex",
    level: 80,
    category: "Backend",
    years: 2,
    color: "#c84b2f",
    desc: "Middleware, routing, auth",
  },
  {
    name: "MongoDB",
    abbr: "Mg",
    level: 75,
    category: "Database",
    years: 2,
    color: "#4db33d",
    desc: "Aggregation, indexes, Atlas",
  },
  {
    name: "Tailwind",
    abbr: "Tw",
    level: 90,
    category: "Styling",
    years: 2,
    color: "#38bdf8",
    desc: "Utility-first, custom themes",
  },
  {
    name: "Python",
    abbr: "Py",
    level: 72,
    category: "Language",
    years: 2,
    color: "#ffd343",
    desc: "Scripting, data, automation",
  },
  {
    name: "OpenAI",
    abbr: "AI",
    level: 68,
    category: "ML / AI",
    years: 1,
    color: "#a78bfa",
    desc: "GPT-4, embeddings, function calls",
  },
  {
    name: "Git",
    abbr: "Gt",
    level: 85,
    category: "DevOps",
    years: 3,
    color: "#f05033",
    desc: "Branching, CI/CD, rebase",
  },
];

const categories = ["All", "Language", "Frontend", "Backend", "Database", "Styling", "ML / AI", "DevOps"];

// ─── Skill Card ───────────────────────────────────────────────────────────────
function SkillCard({ skill, index, active, onClick }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isActive = active?.name === skill.name;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48, rotate: index % 2 === 0 ? -4 : 4 }}
      animate={inView ? { opacity: 1, y: 0, rotate: 0 } : {}}
      transition={{ ...BOUNCY, delay: 0.06 * index }}
      onClick={() => onClick(isActive ? null : skill)}
      style={{ cursor: "none" }}
    >
      <motion.div
        className={`s-card${isActive ? " s-card--active" : ""}`}
        whileHover={{ y: -6, scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={BOUNCY}
        layout
      >
        {/* Top row */}
        <div className="s-card-top">
          <motion.div
            className="s-abbr"
            style={{ color: skill.color }}
            animate={isActive ? { scale: [1, 1.15, 1] } : {}}
            transition={{ duration: 0.4 }}
          >
            {skill.abbr}
          </motion.div>
          <div className="s-cat-pill">{skill.category}</div>
        </div>

        {/* Name */}
        <div className="s-name">{skill.name}</div>
        <div className="s-desc">{skill.desc}</div>

        {/* Bar */}
        <div className="s-bar-wrap">
          <div className="s-bar-track">
            <motion.div
              className="s-bar-fill"
              initial={{ width: 0 }}
              animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
              transition={{ ...SLOW, delay: 0.12 * index + 0.3 }}
              style={{ background: `linear-gradient(90deg, ${skill.color}55, ${skill.color}cc)` }}
            />
          </div>
          <span className="s-pct">{skill.level}%</span>
        </div>

        {/* Bottom meta */}
        <div className="s-meta">
          <span className="s-years">{skill.years}yr{skill.years > 1 ? "s" : ""}</span>
          <motion.div
            className="s-dot"
            style={{ background: skill.color }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2 + index * 0.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Active glow border */}
        {isActive && (
          <motion.div
            className="s-active-ring"
            style={{ borderColor: skill.color + "66" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            layoutId="activeRing"
          />
        )}
      </motion.div>
    </motion.div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────
export default function Skills() {
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState(null);
  const sectionRef = useRef(null);
  const headingInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const cursorX = useMotionValue(-300);
  const cursorY = useMotionValue(-300);
  const blobX   = useSpring(cursorX, { stiffness: 80, damping: 20 });
  const blobY   = useSpring(cursorY, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const fn = e => { cursorX.set(e.clientX); cursorY.set(e.clientY); };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, [cursorX, cursorY]);

  const filtered = filter === "All" ? skills : skills.filter(s => s.category === filter);

  const titleChars = "SKILLS".split("");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,900;1,400;1,900&family=JetBrains+Mono:wght@200;300;400&family=Barlow:wght@300;400;500&display=swap');

        :root {
          --cream:  #f7f3ed;
          --ink:    #0d0d0d;
          --accent: #c84b2f;
          --muted:  rgba(13,13,13,0.58);
          --glass:  rgba(255,255,255,0.52);
        }

        .s-root, .s-root * { cursor: none !important; box-sizing: border-box; }

        .s-root {
          min-height: 100vh;
          background: var(--cream);
          position: relative;
          overflow: hidden;
          font-family: 'Barlow', sans-serif;
          color: var(--ink);
          padding: 0 0 80px;
        }

        /* ── grid ── */
        .s-grid {
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(rgba(13,13,13,.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(13,13,13,.04) 1px, transparent 1px);
          background-size: 56px 56px;
        }

        /* ── blobs ── */
        @keyframes b1 {
          0%,100%{ border-radius:62% 38% 55% 45%/50% 62% 38% 50%; }
          50%    { border-radius:40% 60% 44% 56%/60% 38% 62% 40%; }
        }
        @keyframes b2 {
          0%,100%{ border-radius:45% 55% 40% 60%/55% 44% 56% 45%; }
          50%    { border-radius:60% 40% 54% 46%/44% 60% 40% 60%; }
        }
        .s-blob {
          position: absolute; pointer-events: none; z-index: 0;
        }
        .s-blob-1 {
          width: 600px; height: 600px; top: -12%; right: -14%;
          background: radial-gradient(circle at 60% 40%, rgba(200,75,47,.1) 0%, transparent 68%);
          animation: b1 16s ease-in-out infinite;
        }
        .s-blob-2 {
          width: 480px; height: 480px; bottom: 0; left: -10%;
          background: radial-gradient(circle at 40% 55%, rgba(13,13,13,.06) 0%, transparent 68%);
          animation: b2 20s ease-in-out infinite;
        }

        /* ── top bar ── */
        .s-topbar {
          display: flex; justify-content: space-between; align-items: center;
          padding: 24px 48px;
          border-bottom: 1px solid rgba(13,13,13,.08);
          position: relative; z-index: 10;
        }
        .s-section-id {
          font-family: 'JetBrains Mono', monospace;
          font-size: .62rem; font-weight: 300; letter-spacing: .22em;
          text-transform: uppercase; color: rgba(13,13,13,.62);
          display: flex; align-items: center; gap: 10px;
        }
        .s-section-id-dot {
          width: 6px; height: 6px; border-radius: 50%; background: var(--accent);
        }
        .s-section-num {
          font-family: 'Playfair Display', serif;
          font-size: .75rem; font-style: italic; color: rgba(13,13,13,.2);
        }

        /* ── heading ── */
        .s-heading-wrap {
          position: relative; z-index: 10;
          padding: 56px 48px 0;
          display: flex; justify-content: space-between; align-items: flex-end;
        }
        .s-title-row { display: flex; line-height: .88; }
        .s-title-char {
          font-family: 'Playfair Display', serif;
          font-size: clamp(4rem, 8vw, 7.5rem);
          font-weight: 900; letter-spacing: -.03em;
          color: var(--ink); display: inline-block;
        }
        .s-title-char.italic { font-style: italic; color: var(--accent); }
        .s-heading-right {
          text-align: right; padding-bottom: 8px;
        }
        .s-heading-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: .62rem; font-weight: 300;
          letter-spacing: .18em; text-transform: uppercase;
          color: rgba(13,13,13,.62); margin-bottom: 8px;
        }
        .s-heading-stat {
          font-family: 'Playfair Display', serif;
          font-size: 2.4rem; font-weight: 900; color: var(--ink); line-height: 1;
        }
        .s-heading-stat em { font-style: normal; color: var(--accent); }

        /* ── divider ── */
        .s-divider-row {
          position: relative; z-index: 10;
          padding: 18px 48px 32px;
          display: flex; align-items: center; gap: 18px;
        }
        .s-divider-line { flex: 1; height: 1px; background: rgba(13,13,13,.1); }
        .s-divider-text {
          font-family: 'JetBrains Mono', monospace;
          font-size: .58rem; letter-spacing: .2em; text-transform: uppercase;
          color: rgba(13,13,13,.52);
        }

        /* ── filter tabs ── */
        .s-filters {
          position: relative; z-index: 10;
          padding: 0 48px 36px;
          display: flex; gap: 6px; flex-wrap: wrap;
        }
        .s-filter-btn {
          font-family: 'JetBrains Mono', monospace;
          font-size: .58rem; font-weight: 300;
          letter-spacing: .14em; text-transform: uppercase;
          padding: 7px 14px; border-radius: 5px;
          border: 1px solid rgba(13,13,13,.12);
          background: transparent; color: rgba(13,13,13,.62);
          cursor: none; transition: color .2s, border-color .2s;
        }
        .s-filter-btn.active {
          background: var(--ink); color: var(--cream);
          border-color: var(--ink);
        }

        /* ── grid ── */
        .s-cards-grid {
          position: relative; z-index: 10;
          padding: 0 48px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        /* ── card ── */
        .s-card {
          background: rgba(255,255,255,.52);
          backdrop-filter: blur(32px) saturate(180%);
          -webkit-backdrop-filter: blur(32px) saturate(180%);
          border: 1px solid rgba(255,255,255,.82);
          border-radius: 18px;
          padding: 22px 22px 18px;
          box-shadow:
            0 2px 4px rgba(0,0,0,.03),
            0 8px 28px rgba(0,0,0,.08),
            inset 0 1.5px 0 rgba(255,255,255,.95),
            inset 0 -1px 0 rgba(0,0,0,.03);
          position: relative; overflow: hidden;
          transition: box-shadow .3s;
        }
        .s-card--active {
          box-shadow:
            0 2px 4px rgba(0,0,0,.04),
            0 16px 48px rgba(0,0,0,.14),
            inset 0 1.5px 0 rgba(255,255,255,.95);
        }
        .s-card::after {
          content: '';
          position: absolute; top: 0; left: 12%; right: 12%; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.9), transparent);
          pointer-events: none;
        }
        .s-active-ring {
          position: absolute; inset: 0; border-radius: 18px;
          border: 1.5px solid;
          pointer-events: none;
        }

        .s-card-top {
          display: flex; justify-content: space-between;
          align-items: flex-start; margin-bottom: 10px;
        }
        .s-abbr {
          font-family: 'Playfair Display', serif;
          font-size: 2rem; font-weight: 900; font-style: italic;
          line-height: 1;
        }
        .s-cat-pill {
          font-family: 'JetBrains Mono', monospace;
          font-size: .5rem; font-weight: 300; letter-spacing: .14em;
          text-transform: uppercase; color: var(--muted);
          border: 1px solid rgba(13,13,13,.1);
          padding: 3px 8px; border-radius: 4px;
          margin-top: 4px;
        }
        .s-name {
          font-family: 'Barlow', sans-serif;
          font-size: .92rem; font-weight: 500;
          color: var(--ink); margin-bottom: 4px;
        }
        .s-desc {
          font-family: 'JetBrains Mono', monospace;
          font-size: .54rem; font-weight: 200;
          color: rgba(13,13,13,.58); letter-spacing: .04em;
          margin-bottom: 14px; line-height: 1.5;
        }

        .s-bar-wrap {
          display: flex; align-items: center; gap: 8px; margin-bottom: 12px;
        }
        .s-bar-track {
          flex: 1; height: 3px; border-radius: 2px;
          background: rgba(13,13,13,.08); overflow: hidden;
        }
        .s-pct {
          font-family: 'JetBrains Mono', monospace;
          font-size: .52rem; font-weight: 300;
          color: rgba(13,13,13,.52); width: 30px; text-align: right;
          flex-shrink: 0;
        }

        .s-meta {
          display: flex; justify-content: space-between; align-items: center;
        }
        .s-years {
          font-family: 'JetBrains Mono', monospace;
          font-size: .52rem; font-weight: 200;
          color: rgba(13,13,13,.52); letter-spacing: .1em;
        }
        .s-dot { width: 7px; height: 7px; border-radius: 50%; }

        /* ── detail panel (active skill) ── */
        .s-detail {
          position: relative; z-index: 10;
          margin: 28px 48px 0;
          background: rgba(255,255,255,.48);
          backdrop-filter: blur(32px) saturate(180%);
          -webkit-backdrop-filter: blur(32px) saturate(180%);
          border: 1px solid rgba(255,255,255,.82);
          border-radius: 18px;
          padding: 28px 32px;
          display: flex; align-items: center; gap: 40px;
          box-shadow: 0 8px 40px rgba(0,0,0,.08),
            inset 0 1.5px 0 rgba(255,255,255,.95);
        }
        .s-detail-abbr {
          font-family: 'Playfair Display', serif;
          font-size: 5rem; font-weight: 900; font-style: italic;
          line-height: 1; flex-shrink: 0;
        }
        .s-detail-divider { width: 1px; height: 60px; background: rgba(13,13,13,.1); flex-shrink: 0; }
        .s-detail-body { flex: 1; }
        .s-detail-name {
          font-family: 'Playfair Display', serif;
          font-size: 1.6rem; font-weight: 900;
          color: var(--ink); margin-bottom: 4px;
        }
        .s-detail-cat {
          font-family: 'JetBrains Mono', monospace;
          font-size: .6rem; font-weight: 300; letter-spacing: .18em;
          text-transform: uppercase; color: var(--muted); margin-bottom: 10px;
        }
        .s-detail-desc {
          font-size: .86rem; font-weight: 300;
          color: rgba(13,13,13,.72); line-height: 1.7;
        }
        .s-detail-stats { display: flex; gap: 32px; flex-shrink: 0; }
        .s-detail-stat { text-align: center; }
        .s-detail-stat-n {
          font-family: 'Playfair Display', serif;
          font-size: 2rem; font-weight: 900;
          color: var(--ink); line-height: 1;
        }
        .s-detail-stat-n em { font-style: normal; color: var(--accent); }
        .s-detail-stat-l {
          font-family: 'JetBrains Mono', monospace;
          font-size: .52rem; letter-spacing: .14em;
          text-transform: uppercase; color: var(--muted); margin-top: 3px;
        }

        /* ── bottom strip ── */
        .s-bottom {
          position: relative; z-index: 10;
          padding: 20px 48px 0;
          border-top: 1px solid rgba(13,13,13,.08);
          margin-top: 40px;
          display: flex; justify-content: space-between; align-items: center;
        }
        .s-bottom-hint {
          font-family: 'JetBrains Mono', monospace;
          font-size: .58rem; letter-spacing: .18em;
          text-transform: uppercase; color: rgba(13,13,13,.48);
          display: flex; align-items: center; gap: 10px;
        }
        .s-pagenum {
          font-family: 'Playfair Display', serif;
          font-size: .75rem; font-style: italic;
          color: rgba(13,13,13,.4);
        }

        @media (max-width: 760px) {
          .s-cards-grid { grid-template-columns: repeat(2, 1fr); padding: 0 24px; }
          .s-heading-wrap, .s-divider-row, .s-filters, .s-bottom { padding-left: 24px; padding-right: 24px; }
          .s-topbar { padding: 18px 24px; }
          .s-detail { margin: 24px 24px 0; flex-direction: column; gap: 20px; }
          .s-detail-divider { display: none; }
          .s-title-char { font-size: clamp(3rem, 12vw, 5rem); }
        }
        @media (max-width: 500px) {
          .s-cards-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* ── custom cursor ── */}
      <motion.div style={{
        position: "fixed", left: blobX, top: blobY,
        width: 38, height: 38, borderRadius: "50%",
        background: "rgba(200,75,47,.18)",
        backdropFilter: "blur(4px)",
        border: "1px solid rgba(200,75,47,.25)",
        transform: "translate(-50%,-50%)",
        pointerEvents: "none", zIndex: 9999,
      }}/>
      <motion.div style={{
        position: "fixed", left: cursorX, top: cursorY,
        width: 5, height: 5, borderRadius: "50%",
        background: "#c84b2f",
        transform: "translate(-50%,-50%)",
        pointerEvents: "none", zIndex: 10000,
      }}/>

      <section id="skills" className="s-root" ref={sectionRef}>
        <div className="s-grid"/>
        <div className="s-blob s-blob-1"/>
        <div className="s-blob s-blob-2"/>

        {/* ── top bar ── */}
        <motion.div className="s-topbar"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ...SNAPPY, delay: 0.05 }}
        >
          <div className="s-section-id">
            <span className="s-section-id-dot"/>
            Skills & Tools
          </div>
          <div className="s-section-num">02</div>
        </motion.div>

        {/* ── heading ── */}
        <div className="s-heading-wrap">
          <div className="s-title-row">
            {titleChars.map((ch, i) => (
              <motion.span
                key={i}
                className={`s-title-char${i === 2 || i === 3 ? " italic" : ""}`}
                initial={{ y: 70, opacity: 0, rotate: i % 2 === 0 ? -8 : 8 }}
                animate={headingInView ? { y: 0, opacity: 1, rotate: 0 } : {}}
                transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.08 + i * 0.055 }}
              >
                <motion.span
                  style={{ display: "inline-block" }}
                  animate={{ y: [0, -(3 + i * 1.2), 0] }}
                  transition={{ duration: 2.8 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                >{ch}</motion.span>
              </motion.span>
            ))}
          </div>

          <motion.div className="s-heading-right"
            initial={{ opacity: 0, x: 30 }}
            animate={headingInView ? { opacity: 1, x: 0 } : {}}
            transition={{ ...SLOW, delay: 0.5 }}
          >
            <div className="s-heading-label">Proficiencies</div>
            <div className="s-heading-stat">
              <Counter to={9} delay={700}/>
              <em>+</em>
            </div>
          </motion.div>
        </div>

        {/* ── divider ── */}
        <motion.div className="s-divider-row"
          initial={{ opacity: 0 }} animate={headingInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.55 }}
        >
          <motion.div
            className="s-divider-line"
            initial={{ scaleX: 0 }}
            animate={headingInView ? { scaleX: 1 } : {}}
            style={{ transformOrigin: "left" }}
            transition={{ ...SLOW, delay: 0.6 }}
          />
          <span className="s-divider-text">Tap a card to inspect</span>
          <motion.div
            className="s-divider-line"
            initial={{ scaleX: 0 }}
            animate={headingInView ? { scaleX: 1 } : {}}
            style={{ transformOrigin: "right" }}
            transition={{ ...SLOW, delay: 0.65 }}
          />
        </motion.div>

        {/* ── filters ── */}
        <motion.div className="s-filters"
          initial={{ opacity: 0, y: 16 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ ...BOUNCY, delay: 0.7 }}
        >
          {categories.map((cat, i) => (
            <motion.button
              key={cat}
              className={`s-filter-btn${filter === cat ? " active" : ""}`}
              onClick={() => { setFilter(cat); setActive(null); }}
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={SNAPPY}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* ── cards ── */}
        <motion.div className="s-cards-grid" layout>
          {filtered.map((skill, i) => (
            <SkillCard
              key={skill.name}
              skill={skill}
              index={i}
              active={active}
              onClick={setActive}
            />
          ))}
        </motion.div>

        {/* ── active detail panel ── */}
        {active && (
          <motion.div
            className="s-detail"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ ...BOUNCY }}
            layoutId="detail"
          >
            <motion.div
              className="s-detail-abbr"
              style={{ color: active.color }}
              animate={{ rotate: [-2, 2, -2] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              {active.abbr}
            </motion.div>

            <div className="s-detail-divider"/>

            <div className="s-detail-body">
              <div className="s-detail-name">{active.name}</div>
              <div className="s-detail-cat">{active.category}</div>
              <div className="s-detail-desc">{active.desc}</div>
            </div>

            <div className="s-detail-divider"/>

            <div className="s-detail-stats">
              <div className="s-detail-stat">
                <div className="s-detail-stat-n">
                  {active.level}<em>%</em>
                </div>
                <div className="s-detail-stat-l">Proficiency</div>
              </div>
              <div className="s-detail-stat">
                <div className="s-detail-stat-n">
                  {active.years}<em>yr{active.years > 1 ? "s" : ""}</em>
                </div>
                <div className="s-detail-stat-l">Experience</div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── bottom ── */}
        <motion.div className="s-bottom"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <div className="s-bottom-hint">
            <motion.div
              style={{ height: 1, background: "rgba(13,13,13,.18)" }}
              animate={{ width: ["28px", "44px", "28px"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
            {filtered.length} skill{filtered.length !== 1 ? "s" : ""} · {filter}
          </div>
          <div className="s-pagenum">02</div>
        </motion.div>
      </section>
    </>
  );
}