import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, animate, AnimatePresence } from "framer-motion";

const BOUNCY = { type: "spring", stiffness: 300, damping: 18, mass: 0.8 };
const SLOW   = { type: "spring", stiffness: 120, damping: 20, mass: 1.2 };
const SNAPPY = { type: "spring", stiffness: 400, damping: 22 };

function useInView(ref) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

const LAYOUTS = [
  {
    id: "card",
    label: "Grid",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect x="1" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3"/>
        <rect x="8" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3"/>
        <rect x="1" y="8" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3"/>
        <rect x="8" y="8" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3"/>
      </svg>
    ),
  },
  {
    id: "timeline",
    label: "Timeline",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <line x1="3" y1="2" x2="3" y2="12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
        <circle cx="3" cy="4" r="1.5" fill="currentColor"/>
        <circle cx="3" cy="10" r="1.5" fill="currentColor"/>
        <line x1="6" y1="4" x2="13" y2="4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
        <line x1="6" y1="10" x2="13" y2="10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
];

const projects = [
  {
    index: "01",
    title: "Prep AI",
    emoji: "🎙️",
    tagline: "Architected an interactive, AI-driven evaluation matrix for real-time technical interview simulation.",
    description:
      "An AI-driven platform engineered to simulate high-pressure interview environments through dynamic, voice-based mock interviews and automated resume analysis. Built with seamless PDF processing for resume ingestion and real-time voice interactions — managing complex AI dialogue state and user feedback loops.",
    year: "2025",
    stack: ["React", "Node.js", "AI/ML", "Voice API", "PDF Parse"],
    live: "https://interview-gpt-tau.vercel.app/",
    github: null,
    accent: false,
  },
  {
    index: "02",
    title: "GamePrompt",
    emoji: "🎲",
    tagline: "Engineered an NLP-to-Math translation pipeline, mapping complex strategic scenarios to formal Game Theory equilibria.",
    description:
      "A full-stack application that bridges natural language processing and formal Game Theory mathematics. Ingests complex, real-world strategic scenarios and outputs calculated payoff matrices. The core engine leverages advanced LLM prompt engineering to extract players, strategies, and payoffs from unstructured text into a structured visual matrix.",
    year: "2025",
    stack: ["React", "Node.js", "LLM", "Game Theory", "NLP"],
    live: "https://game-prompt-gb33.vercel.app/",
    github: "https://github.com/An-Orchids-whishper/game-prompt",
    accent: true,
  },
];

function CardLayout({ projects, inView }) {
  const floatA = useMotionValue(0);
  const floatB = useMotionValue(0);
  useEffect(() => {
    const a = animate(floatA, [0, -10, 0], { duration: 5,   repeat: Infinity, ease: "easeInOut" });
    const b = animate(floatB, [0,  -7, 0], { duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 });
    return () => { a.stop(); b.stop(); };
  }, [floatA, floatB]);

  return (
    <div className="pj-card-grid">
      {projects.map((p, i) => (
        <motion.div
          key={p.index}
          className={`pj-card${p.accent ? " accent" : ""}`}
          style={{ y: i === 0 ? floatA : floatB }}
          initial={{ y: 80, opacity: 0, rotate: i === 0 ? -2 : 2 }}
          animate={inView ? { y: 0, opacity: 1, rotate: i === 0 ? -0.5 : 0.5 } : {}}
          transition={{ ...BOUNCY, delay: 0.2 + i * 0.15 }}
          whileHover={{ scale: 1.018, y: -6, rotate: 0, transition: SNAPPY }}
        >
          {/* card top bar */}
          <div className="pj-card-topbar">
            <span className="pj-card-index">{p.index}</span>
            <span className="pj-card-year">{p.year}</span>
          </div>

          {/* title */}
          <div className="pj-card-title-row">
            <span className="pj-card-emoji">{p.emoji}</span>
            <h3 className="pj-card-title">{p.title}</h3>
          </div>

          {/* tagline */}
          <p className="pj-card-tagline">"{p.tagline}"</p>

          <div className="pj-card-divider"/>

          {/* description */}
          <p className="pj-card-desc">{p.description}</p>

          {/* stack tags */}
          <div className="pj-tag-row">
            {p.stack.map(t => (
              <span key={t} className="pj-tag">{t}</span>
            ))}
          </div>

          {/* links */}
          <div className="pj-card-links">
            <motion.a
              href={p.live}
              target="_blank"
              rel="noopener noreferrer"
              className="pj-btn-main"
              whileHover={{ scale: 1.05 }} whileTap={{ scale: .93 }}
            >
              Live Demo
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                <path d="M2 10L10 2M10 2H5M10 2v5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.a>
            {p.github && (
              <motion.a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="pj-btn-outline"
                whileHover={{ scale: 1.04 }} whileTap={{ scale: .93 }}
              >
                GitHub
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
              </motion.a>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function TimelineLayout({ projects, inView }) {
  return (
    <div className="pj-timeline">
      <div className="pj-timeline-line"/>
      {projects.map((p, i) => (
        <motion.div
          key={p.index}
          className="pj-timeline-item"
          initial={{ x: i % 2 === 0 ? -80 : 80, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : {}}
          transition={{ ...BOUNCY, delay: 0.2 + i * 0.18 }}
        >
          {/* connector dot */}
          <div className="pj-tl-dot">
            <motion.div className="pj-tl-dot-inner"
              animate={inView ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
            />
          </div>

          <motion.div
            className={`pj-tl-card${p.accent ? " accent" : ""}`}
            whileHover={{ scale: 1.02, y: -4, transition: SNAPPY }}
          >
            <div className="pj-card-topbar">
              <span className="pj-card-index">{p.index}</span>
              <span className="pj-card-year">{p.year}</span>
            </div>
            <div className="pj-card-title-row">
              <span className="pj-card-emoji">{p.emoji}</span>
              <h3 className="pj-card-title" style={{ fontSize: "clamp(1.4rem,3vw,2rem)" }}>{p.title}</h3>
            </div>
            <p className="pj-card-tagline">"{p.tagline}"</p>
            <div className="pj-card-divider"/>
            <p className="pj-card-desc">{p.description}</p>
            <div className="pj-tag-row">
              {p.stack.map(t => <span key={t} className="pj-tag">{t}</span>)}
            </div>
            <div className="pj-card-links">
              <motion.a href={p.live} target="_blank" rel="noopener noreferrer" className="pj-btn-main"
                whileHover={{ scale: 1.05 }} whileTap={{ scale: .93 }}
              >
                Live Demo
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <path d="M2 10L10 2M10 2H5M10 2v5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.a>
              {p.github && (
                <motion.a href={p.github} target="_blank" rel="noopener noreferrer" className="pj-btn-outline"
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: .93 }}
                >
                  GitHub
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                  </svg>
                </motion.a>
              )}
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

export default function Projects() {
  const ref    = useRef(null);
  const inView = useInView(ref);
  const [layout, setLayout] = useState("card");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,900;1,400;1,900&family=JetBrains+Mono:wght@200;300;400&family=Barlow:wght@300;400;500&display=swap');

        .pj-root {
          min-height: 100vh;
          background: var(--cream, #f7f3ed);
          font-family: 'Barlow', sans-serif;
          color: var(--ink, #0d0d0d);
          position: relative;
          overflow: hidden;
        }
        .pj-grid {
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(var(--grid, rgba(13,13,13,.04)) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid, rgba(13,13,13,.04)) 1px, transparent 1px);
          background-size: 56px 56px;
        }
        .pj-blob {
          position: absolute; pointer-events: none; z-index: 0; border-radius: 50%;
        }
        .pj-blob-1 {
          width: 520px; height: 520px; top: 5%; left: -10%;
          background: radial-gradient(circle at 45% 45%, rgba(200,75,47,.09) 0%, transparent 68%);
        }
        .pj-blob-2 {
          width: 400px; height: 400px; bottom: 0; right: -8%;
          background: radial-gradient(circle at 55% 55%, rgba(13,13,13,.05) 0%, transparent 65%);
        }

        .pj-layout {
          position: relative; z-index: 10;
          display: grid;
          grid-template-rows: auto 1fr auto;
          min-height: 100vh;
        }

        /* top bar */
        .pj-topbar {
          display: flex; justify-content: space-between; align-items: center;
          padding: 24px 48px;
          border-bottom: 1px solid var(--border, rgba(13,13,13,.08));
        }
        .pj-section-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: .62rem; font-weight: 300;
          letter-spacing: .22em; text-transform: uppercase;
          color: var(--muted, rgba(13,13,13,.38));
          display: flex; align-items: center; gap: 10px;
        }
        .pj-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--accent, #c84b2f);
          animation: pjDotPulse 2.5s ease-in-out infinite;
        }
        @keyframes pjDotPulse {
          0%,100%{ box-shadow: 0 0 0 0 rgba(200,75,47,.4) }
          50%    { box-shadow: 0 0 0 7px rgba(200,75,47,0) }
        }
        .pj-pagenum {
          font-family: 'Playfair Display', serif;
          font-size: .75rem; font-style: italic;
          color: var(--muted, rgba(13,13,13,.2));
        }

        /* body */
        .pj-body {
          padding: 52px 48px;
          display: flex; flex-direction: column; gap: 40px;
        }

        /* heading row */
        .pj-heading-row {
          display: flex; justify-content: space-between; align-items: flex-end;
          flex-wrap: wrap; gap: 20px;
        }
        .pj-heading-eyebrow {
          font-family: 'JetBrains Mono', monospace;
          font-size: .62rem; font-weight: 300;
          letter-spacing: .22em; text-transform: uppercase;
          color: var(--muted, rgba(13,13,13,.38));
          margin-bottom: 10px;
        }
        .pj-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.8rem, 6vw, 5rem);
          font-weight: 900; line-height: .88;
          letter-spacing: -.03em;
          color: var(--ink, #0d0d0d);
        }
        .pj-heading em { font-style: italic; color: var(--accent, #c84b2f); }

        /* layout switcher */
        .pj-switcher {
          display: flex; gap: 6px;
          background: var(--glass, rgba(255,255,255,.55));
          backdrop-filter: blur(16px);
          border: 1px solid var(--border, rgba(13,13,13,.09));
          border-radius: 10px;
          padding: 4px;
        }
        .pj-switch-btn {
          font-family: 'JetBrains Mono', monospace;
          font-size: .6rem; font-weight: 300;
          letter-spacing: .12em; text-transform: uppercase;
          color: var(--muted, rgba(13,13,13,.38));
          background: transparent; border: none;
          border-radius: 7px;
          padding: 7px 14px;
          cursor: pointer;
          display: flex; align-items: center; gap: 7px;
          transition: color .2s;
          position: relative;
        }
        .pj-switch-btn.active { color: var(--ink, #0d0d0d); }
        .pj-switch-pill {
          position: absolute; inset: 0; border-radius: 7px;
          background: var(--cream, #f7f3ed);
          box-shadow: 0 1px 6px rgba(0,0,0,.08);
          z-index: -1;
        }

        /* card grid */
        .pj-card-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        /* shared card styles */
        .pj-card, .pj-tl-card {
          background: var(--glass, rgba(255,255,255,.55));
          backdrop-filter: blur(44px) saturate(200%);
          -webkit-backdrop-filter: blur(44px) saturate(200%);
          border: 1px solid rgba(255,255,255,.82);
          border-radius: 20px;
          padding: 28px 28px 22px;
          box-shadow:
            0 2px 4px rgba(0,0,0,.03),
            0 10px 36px rgba(0,0,0,.09),
            inset 0 1.5px 0 rgba(255,255,255,.9);
          position: relative; overflow: hidden;
          display: flex; flex-direction: column; gap: 14px;
        }
        .pj-card::after, .pj-tl-card::after {
          content: ''; position: absolute;
          top: 0; left: 12%; right: 12%; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.9), transparent);
        }
        .pj-card.accent { border-color: rgba(200,75,47,.18); }
        .pj-tl-card.accent { border-color: rgba(200,75,47,.18); }

        .pj-card-topbar {
          display: flex; justify-content: space-between; align-items: center;
        }
        .pj-card-index {
          font-family: 'Playfair Display', serif;
          font-size: 3rem; font-weight: 900; font-style: italic;
          line-height: 1;
          color: var(--accent, #c84b2f);
          opacity: .18;
        }
        .pj-card-year {
          font-family: 'JetBrains Mono', monospace;
          font-size: .6rem; font-weight: 300;
          letter-spacing: .18em; text-transform: uppercase;
          color: var(--muted, rgba(13,13,13,.38));
        }
        .pj-card-title-row {
          display: flex; align-items: center; gap: 12px;
        }
        .pj-card-emoji { font-size: 1.5rem; line-height: 1; }
        .pj-card-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.6rem, 3.5vw, 2.4rem);
          font-weight: 900; line-height: .9;
          letter-spacing: -.02em;
          color: var(--ink, #0d0d0d);
        }
        .pj-card-tagline {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-size: clamp(.82rem, 1.2vw, .95rem);
          color: var(--muted, rgba(13,13,13,.42));
          line-height: 1.55;
          padding-left: 14px;
          border-left: 2px solid var(--accent, #c84b2f);
        }
        .pj-card-divider {
          height: 1px;
          background: var(--border, rgba(13,13,13,.07));
        }
        .pj-card-desc {
          font-size: clamp(.8rem, 1.2vw, .88rem);
          font-weight: 300;
          line-height: 1.75;
          color: rgba(13,13,13,.5);
          flex: 1;
        }
        .pj-tag-row {
          display: flex; flex-wrap: wrap; gap: 5px;
        }
        .pj-tag {
          font-family: 'JetBrains Mono', monospace;
          font-size: .52rem; letter-spacing: .1em; text-transform: uppercase;
          color: var(--muted, rgba(13,13,13,.38));
          padding: 3px 9px;
          border: 1px solid var(--border, rgba(13,13,13,.1));
          border-radius: 4px;
        }
        .pj-card-links {
          display: flex; gap: 8px; flex-wrap: wrap;
          margin-top: 4px;
        }
        .pj-btn-main {
          font-family: 'JetBrains Mono', monospace;
          font-size: .68rem; font-weight: 400;
          letter-spacing: .12em; text-transform: uppercase;
          color: var(--cream, #f7f3ed);
          background: var(--ink, #0d0d0d);
          border: none; border-radius: 6px;
          padding: 10px 20px;
          text-decoration: none; display: inline-flex; align-items: center; gap: 7px;
          box-shadow: 0 3px 12px rgba(13,13,13,.18);
        }
        .pj-btn-outline {
          font-family: 'JetBrains Mono', monospace;
          font-size: .68rem; font-weight: 300;
          letter-spacing: .12em; text-transform: uppercase;
          color: var(--muted, rgba(13,13,13,.45));
          background: transparent;
          border: 1px solid var(--border, rgba(13,13,13,.18));
          border-radius: 6px;
          padding: 10px 18px;
          text-decoration: none; display: inline-flex; align-items: center; gap: 7px;
          transition: color .2s, border-color .2s;
        }
        .pj-btn-outline:hover { color: var(--ink, #0d0d0d); border-color: rgba(13,13,13,.4); }

        /* timeline */
        .pj-timeline {
          position: relative;
          display: flex; flex-direction: column; gap: 40px;
          padding-left: 40px;
          max-width: 780px; margin: 0 auto; width: 100%;
        }
        .pj-timeline-line {
          position: absolute; left: 10px; top: 8px; bottom: 8px; width: 1px;
          background: linear-gradient(to bottom, var(--accent, #c84b2f), var(--border, rgba(13,13,13,.12)));
        }
        .pj-timeline-item { position: relative; }
        .pj-tl-dot {
          position: absolute; left: -36px; top: 28px;
          width: 14px; height: 14px; border-radius: 50%;
          background: var(--cream, #f7f3ed);
          border: 2px solid var(--accent, #c84b2f);
          display: flex; align-items: center; justify-content: center;
        }
        .pj-tl-dot-inner {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--accent, #c84b2f);
        }

        /* bottom bar */
        .pj-bottom {
          display: flex; justify-content: space-between; align-items: center;
          padding: 14px 48px;
          border-top: 1px solid var(--border, rgba(13,13,13,.08));
        }
        .pj-scroll-hint {
          font-family: 'JetBrains Mono', monospace;
          font-size: .58rem; letter-spacing: .2em; text-transform: uppercase;
          color: var(--muted, rgba(13,13,13,.22));
          display: flex; align-items: center; gap: 10px;
        }
        .pj-count {
          font-family: 'JetBrains Mono', monospace;
          font-size: .6rem; letter-spacing: .14em;
          color: var(--muted, rgba(13,13,13,.25));
        }

        @media (max-width: 760px) {
          .pj-body { padding: 32px 24px; }
          .pj-topbar, .pj-bottom { padding: 14px 24px; }
          .pj-card-grid { grid-template-columns: 1fr; }
          .pj-heading-row { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <div className="pj-root" ref={ref} id="projects">
        <div className="pj-grid"/>
        <div className="pj-blob pj-blob-1"/>
        <div className="pj-blob pj-blob-2"/>

        <div className="pj-layout">

          {/* TOP BAR */}
          <motion.header className="pj-topbar"
            initial={{ y: -40, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ ...SNAPPY, delay: 0.05 }}
          >
            <div className="pj-section-label">
              <span className="pj-dot"/>
              Selected Work
            </div>
            <div className="pj-pagenum">03</div>
          </motion.header>

          {/* BODY */}
          <div className="pj-body">

            {/* Heading + switcher */}
            <motion.div className="pj-heading-row"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...BOUNCY, delay: 0.12 }}
            >
              <div>
                <div className="pj-heading-eyebrow">What I've Built</div>
                <div className="pj-heading">
                  Work that<br/><em>matters.</em>
                </div>
              </div>

              {/* Layout switcher */}
              <div className="pj-switcher">
                {LAYOUTS.map(l => (
                  <motion.button
                    key={l.id}
                    className={`pj-switch-btn${layout === l.id ? " active" : ""}`}
                    onClick={() => setLayout(l.id)}
                    whileTap={{ scale: .94 }}
                  >
                    {layout === l.id && (
                      <motion.span className="pj-switch-pill" layoutId="pj-switch-pill" transition={BOUNCY}/>
                    )}
                    {l.icon}
                    {l.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Layouts */}
            <AnimatePresence mode="wait">
              {layout === "card" && (
                <motion.div key="card"
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                  transition={{ ...SLOW }}
                >
                  <CardLayout projects={projects} inView={inView}/>
                </motion.div>
              )}
              {layout === "timeline" && (
                <motion.div key="timeline"
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                  transition={{ ...SLOW }}
                >
                  <TimelineLayout projects={projects} inView={inView}/>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* BOTTOM BAR */}
          <motion.footer className="pj-bottom"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...SLOW, delay: 0.9 }}
          >
            <div className="pj-scroll-hint">
              <motion.div
                style={{ height: 1, background: "var(--muted, rgba(13,13,13,.18))" }}
                animate={inView ? { width: ["28px", "44px", "28px"] } : {}}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
              Continue scrolling
            </div>
            <div className="pj-count">
              {projects.length} projects
            </div>
            <div className="pj-pagenum">03</div>
          </motion.footer>

        </div>
      </div>
    </>
  );
}