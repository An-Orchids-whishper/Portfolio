import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, animate } from "framer-motion";

const BOUNCY = { type: "spring", stiffness: 300, damping: 18, mass: 0.8 };
const SLOW   = { type: "spring", stiffness: 120, damping: 20, mass: 1.2 };
const SNAPPY = { type: "spring", stiffness: 400, damping: 22 };

function useInView(ref) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.18 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

function Counter({ to, delay = 0, triggered }) {
  const [display, setDisplay] = useState(0);
  const val = useMotionValue(0);
  useEffect(() => {
    if (!triggered) return;
    const t = setTimeout(() => {
      animate(val, to, { duration: 1.4, ease: [0.22, 1, 0.36, 1] });
    }, delay);
    const unsub = val.on("change", v => setDisplay(Math.round(v)));
    return () => { unsub(); clearTimeout(t); };
  }, [to, delay, val, triggered]);
  return <>{display}</>;
}

const traits = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    label: "Developer",
    desc: "Clean, scalable code across the full stack",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    label: "Builder",
    desc: "Interfaces people actually enjoy using",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4"/><path d="M6 20v-2a6 6 0 0 1 12 0v2"/><circle cx="12" cy="8" r="1.5" fill="currentColor"/>
      </svg>
    ),
    label: "AI Enthusiast",
    desc: "Embedding intelligence into real products",
  },
];

const stats = [
  { n: 1,  u: "+", l: "Yrs Exp." },
  { n: 3, u: "+", l: "Projects" },
  { n: 9,  u: "×", l: "Stacks"   },
];

export default function About() {
  const ref    = useRef(null);
  const inView = useInView(ref);

  // Float loops
  const floatA = useMotionValue(0);
  const floatB = useMotionValue(0);
  useEffect(() => {
    const a = animate(floatA, [0, -10, 0], { duration: 5,   repeat: Infinity, ease: "easeInOut" });
    const b = animate(floatB, [0,  -7, 0], { duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 });
    return () => { a.stop(); b.stop(); };
  }, [floatA, floatB]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,900;1,400;1,900&family=JetBrains+Mono:wght@200;300;400&family=Barlow:wght@300;400;500&display=swap');

        :root {
          --cream:  #f7f3ed;
          --ink:    #0d0d0d;
          --accent: #c84b2f;
          --muted:  rgba(13,13,13,0.38);
        }

        .ab-root {
          min-height: 100vh;
          background: var(--cream);
          font-family: 'Barlow', sans-serif;
          color: var(--ink);
          position: relative;
          overflow: hidden;
        }

        /* grid */
        .ab-grid {
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(rgba(13,13,13,.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(13,13,13,.04) 1px, transparent 1px);
          background-size: 56px 56px;
        }

        /* blobs */
        .ab-blob {
          position: absolute; pointer-events: none; z-index: 0;
          border-radius: 50%;
        }
        .ab-blob-1 {
          width: 500px; height: 500px; top: -10%; right: -8%;
          background: radial-gradient(circle at 55% 45%, rgba(200,75,47,.10) 0%, transparent 68%);
        }
        .ab-blob-2 {
          width: 420px; height: 420px; bottom: -8%; left: -6%;
          background: radial-gradient(circle at 45% 55%, rgba(13,13,13,.06) 0%, transparent 65%);
        }

        /* layout */
        .ab-layout {
          position: relative; z-index: 10;
          display: grid;
          grid-template-rows: auto 1fr auto;
          min-height: 100vh;
        }

        /* top bar */
        .ab-topbar {
          display: flex; justify-content: space-between; align-items: center;
          padding: 24px 48px;
          border-bottom: 1px solid rgba(13,13,13,.08);
        }
        .ab-section-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: .62rem; font-weight: 300;
          letter-spacing: .22em; text-transform: uppercase;
          color: var(--muted);
          display: flex; align-items: center; gap: 10px;
        }
        .ab-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--accent);
          animation: abDotPulse 2.5s ease-in-out infinite;
        }
        @keyframes abDotPulse {
          0%,100%{ box-shadow: 0 0 0 0 rgba(200,75,47,.4) }
          50%    { box-shadow: 0 0 0 7px rgba(200,75,47,0) }
        }
        .ab-pagenum {
          font-family: 'Playfair Display', serif;
          font-size: .75rem; font-style: italic;
          color: rgba(13,13,13,.2);
        }

        /* main body */
        .ab-body {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          align-items: center;
        }

        /* left col */
        .ab-left {
          padding: 52px 48px;
          border-right: 1px solid rgba(13,13,13,.08);
          display: flex; flex-direction: column; gap: 28px;
        }

        .ab-heading-eyebrow {
          font-family: 'JetBrains Mono', monospace;
          font-size: .62rem; font-weight: 300;
          letter-spacing: .22em; text-transform: uppercase;
          color: var(--muted);
        }
        .ab-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(3rem, 6vw, 5.5rem);
          font-weight: 900; line-height: .88;
          letter-spacing: -.03em;
          color: var(--ink);
        }
        .ab-heading em {
          font-style: italic;
          color: var(--accent);
        }
        .ab-divider {
          width: 64px; height: 2px;
          background: var(--ink);
        }
        .ab-quote {
          font-family: 'Playfair Display', serif;
          font-size: clamp(.95rem, 1.5vw, 1.1rem);
          font-style: italic;
          font-weight: 400;
          color: rgba(13,13,13,.42);
          line-height: 1.6;
          padding-left: 16px;
          border-left: 2px solid var(--accent);
        }
        .ab-para {
          font-size: clamp(.82rem, 1.3vw, .95rem);
          font-weight: 300;
          line-height: 1.8;
          color: rgba(13,13,13,.52);
          max-width: 400px;
        }
        .ab-para strong { color: var(--ink); font-weight: 500; }
        .ab-para span   { color: var(--accent); font-weight: 500; }

        .ab-btns { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
        .ab-btn-main {
          font-family: 'JetBrains Mono', monospace;
          font-size: .72rem; font-weight: 400;
          letter-spacing: .12em; text-transform: uppercase;
          color: var(--cream); background: var(--ink);
          border: none; border-radius: 6px;
          padding: 13px 28px;
          text-decoration: none; display: inline-block;
          box-shadow: 0 4px 16px rgba(13,13,13,.18);
          position: relative; overflow: hidden;
        }
        .ab-btn-main::after {
          content: ''; position: absolute; inset: 0;
          border-radius: inherit;
          background: linear-gradient(135deg, rgba(255,255,255,.1), transparent);
          opacity: 0; transition: opacity .2s;
        }
        .ab-btn-main:hover::after { opacity: 1; }

        /* right col */
        .ab-right {
          padding: 52px 48px;
          display: flex; flex-direction: column; gap: 24px;
          align-items: stretch;
        }

        /* trait cards */
        .ab-trait-card {
          background: rgba(255,255,255,.55);
          backdrop-filter: blur(44px) saturate(200%);
          -webkit-backdrop-filter: blur(44px) saturate(200%);
          border: 1px solid rgba(255,255,255,.82);
          border-radius: 16px;
          padding: 20px 22px;
          display: flex; align-items: flex-start; gap: 16px;
          box-shadow: 0 2px 4px rgba(0,0,0,.03), 0 8px 28px rgba(0,0,0,.08),
                      inset 0 1.5px 0 rgba(255,255,255,.9);
          position: relative; overflow: hidden;
        }
        .ab-trait-card::after {
          content: ''; position: absolute;
          top: 0; left: 12%; right: 12%; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.9), transparent);
          pointer-events: none;
        }
        .ab-trait-icon {
          width: 42px; height: 42px; border-radius: 10px;
          background: var(--ink);
          display: flex; align-items: center; justify-content: center;
          color: var(--cream); flex-shrink: 0;
          box-shadow: 0 3px 10px rgba(13,13,13,.2);
        }
        .ab-trait-icon.accent { background: var(--accent); }
        .ab-trait-text {}
        .ab-trait-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: .64rem; font-weight: 400;
          letter-spacing: .14em; text-transform: uppercase;
          color: var(--ink); margin-bottom: 4px;
        }
        .ab-trait-desc {
          font-size: .8rem; font-weight: 300;
          line-height: 1.55;
          color: rgba(13,13,13,.45);
        }

        /* stats row */
        .ab-stats {
          display: flex; gap: 0;
          border: 1px solid rgba(13,13,13,.09);
          border-radius: 14px; overflow: hidden;
          background: rgba(255,255,255,.35);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
        .ab-stat {
          flex: 1; text-align: center; padding: 16px 12px;
          border-right: 1px solid rgba(13,13,13,.09);
        }
        .ab-stat:last-child { border-right: none; }
        .ab-stat-n {
          font-family: 'Playfair Display', serif;
          font-size: 1.6rem; font-weight: 900; line-height: 1;
          color: var(--ink);
        }
        .ab-stat-n em { font-style: normal; color: var(--accent); }
        .ab-stat-l {
          font-family: 'JetBrains Mono', monospace;
          font-size: .52rem; letter-spacing: .14em;
          text-transform: uppercase; color: rgba(13,13,13,.28);
          margin-top: 4px;
        }

        /* bottom bar */
        .ab-bottom {
          display: flex; justify-content: space-between; align-items: center;
          padding: 14px 48px;
          border-top: 1px solid rgba(13,13,13,.08);
        }
        .ab-scroll-hint {
          font-family: 'JetBrains Mono', monospace;
          font-size: .58rem; letter-spacing: .2em; text-transform: uppercase;
          color: rgba(13,13,13,.22);
          display: flex; align-items: center; gap: 10px;
        }
        .ab-stack-tags { display: flex; gap: 5px; flex-wrap: wrap; }
        .ab-tag {
          font-family: 'JetBrains Mono', monospace;
          font-size: .54rem; letter-spacing: .1em; text-transform: uppercase;
          color: rgba(13,13,13,.28);
          padding: 3px 9px;
          border: 1px solid rgba(13,13,13,.1);
          border-radius: 4px;
        }

        @media (max-width: 760px) {
          .ab-body { grid-template-columns: 1fr; }
          .ab-left  { padding: 32px 24px; border-right: none; border-bottom: 1px solid rgba(13,13,13,.08); }
          .ab-right { padding: 32px 24px; }
          .ab-topbar, .ab-bottom { padding: 14px 24px; }
          .ab-stack-tags { display: none; }
        }
      `}</style>

      <div className="ab-root" ref={ref}>
        <div className="ab-grid"/>
        <div className="ab-blob ab-blob-1"/>
        <div className="ab-blob ab-blob-2"/>

        <div className="ab-layout">

          {/* TOP BAR */}
          <motion.header className="ab-topbar"
            initial={{ y: -40, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ ...SNAPPY, delay: 0.05 }}
          >
            <div className="ab-section-label">
              <span className="ab-dot"/>
              About Me
            </div>
            <div className="ab-pagenum">02</div>
          </motion.header>

          {/* MAIN */}
          <div className="ab-body">

            {/* LEFT */}
            <div className="ab-left">
              <motion.div className="ab-heading-eyebrow"
                initial={{ x: -40, opacity: 0 }}
                animate={inView ? { x: 0, opacity: 1 } : {}}
                transition={{ ...BOUNCY, delay: 0.12 }}
              >
                Who I Am
              </motion.div>

              <motion.div
                initial={{ x: -60, opacity: 0 }}
                animate={inView ? { x: 0, opacity: 1 } : {}}
                transition={{ ...BOUNCY, delay: 0.18 }}
              >
                <div className="ab-heading">
                  Making<br/><em>ideas</em><br/>real.
                </div>
              </motion.div>

              <motion.div className="ab-divider"
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                style={{ transformOrigin: "left" }}
                transition={{ ...BOUNCY, delay: 0.32 }}
              />

              <motion.blockquote className="ab-quote"
                initial={{ x: -30, opacity: 0 }}
                animate={inView ? { x: 0, opacity: 1 } : {}}
                transition={{ ...SLOW, delay: 0.4 }}
              >
                "Code is not just logic — it's a language of ideas."
              </motion.blockquote>

              <motion.p className="ab-para"
                initial={{ x: -30, opacity: 0 }}
                animate={inView ? { x: 0, opacity: 1 } : {}}
                transition={{ ...SLOW, delay: 0.5 }}
              >
                I'm <strong>Kartik Pal</strong>, a Full Stack Developer who loves building
                fast, thoughtful digital products. Experienced in{" "}
                <span>React, Node, MongoDB and AI integrations</span> — I combine
                functionality with clean design that actually works.
              </motion.p>

              <motion.p className="ab-para"
                initial={{ x: -30, opacity: 0 }}
                animate={inView ? { x: 0, opacity: 1 } : {}}
                transition={{ ...SLOW, delay: 0.58 }}
              >
                I enjoy solving real-world problems and building tools that
                empower others — from automating interviews to crafting
                immersive portfolios. I always aim for <strong>impact</strong>.
              </motion.p>

              <motion.div className="ab-btns"
                initial={{ y: 24, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ ...BOUNCY, delay: 0.7 }}
              >
                <motion.a href="#projects" className="ab-btn-main"
                  animate={inView ? { y: [0, -3, 0] } : {}}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: .95 }}
                >
                  View My Projects
                </motion.a>
              </motion.div>
            </div>

            {/* RIGHT */}
            <div className="ab-right">

              {/* Trait cards */}
              {traits.map((t, i) => (
                <motion.div
                  key={i}
                  className="ab-trait-card"
                  style={{ y: i % 2 === 0 ? floatA : floatB }}
                  initial={{ x: 80, opacity: 0, rotate: 3 }}
                  animate={inView ? { x: 0, opacity: 1, rotate: i === 1 ? -1 : 0 } : {}}
                  transition={{ ...BOUNCY, delay: 0.28 + i * 0.12 }}
                  whileHover={{ scale: 1.025, y: -4, transition: SNAPPY }}
                >
                  <div className={`ab-trait-icon${i === 2 ? " accent" : ""}`}>
                    {t.icon}
                  </div>
                  <div className="ab-trait-text">
                    <div className="ab-trait-label">{t.label}</div>
                    <div className="ab-trait-desc">{t.desc}</div>
                  </div>
                </motion.div>
              ))}

              {/* Stats */}
              <motion.div className="ab-stats"
                initial={{ y: 40, opacity: 0, scale: 0.9 }}
                animate={inView ? { y: 0, opacity: 1, scale: 1 } : {}}
                transition={{ ...BOUNCY, delay: 0.7 }}
              >
                {stats.map((s, i) => (
                  <motion.div key={i} className="ab-stat"
                    whileHover={{ scale: 1.06, transition: BOUNCY }}
                  >
                    <div className="ab-stat-n">
                      <Counter to={s.n} delay={(0.9 + i * 0.12) * 1000} triggered={inView}/>
                      <em>{s.u}</em>
                    </div>
                    <div className="ab-stat-l">{s.l}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* BOTTOM BAR */}
          <motion.footer className="ab-bottom"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...SLOW, delay: 1.0 }}
          >
            <div className="ab-scroll-hint">
              <motion.div
                style={{ height: 1, background: "rgba(13,13,13,.18)" }}
                animate={inView ? { width: ["28px", "44px", "28px"] } : {}}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
              Continue scrolling
            </div>

            <div className="ab-stack-tags">
              {["React", "Node.js", "MongoDB", "AI/ML"].map((t, i) => (
                <motion.span key={t} className="ab-tag"
                  initial={{ opacity: 0, scale: .6 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ ...BOUNCY, delay: 1.0 + i * 0.06 }}
                  whileHover={{ scale: 1.12, y: -2, transition: SNAPPY }}
                >{t}</motion.span>
              ))}
            </div>

            <div className="ab-pagenum" style={{ fontFamily: "'Playfair Display', serif" }}>02</div>
          </motion.footer>

        </div>
      </div>
    </>
  );
}