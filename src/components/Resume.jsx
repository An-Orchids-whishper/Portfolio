import { useState, useEffect } from "react";
import { motion, useSpring, useMotionValue, animate } from "framer-motion";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const CREAM  = "#f7f3ed";
const INK    = "#0d0d0d";
const ACCENT = "#c84b2f";
const MUTED  = "rgba(13,13,13,0.35)";
const FONT_SERIF = "'Playfair Display', Georgia, serif";
const FONT_MONO  = "'JetBrains Mono', 'Courier New', monospace";
const FONT_BODY  = "'Barlow', sans-serif";

const BOUNCY = { type: "spring", stiffness: 300, damping: 18, mass: 0.8 };
const SLOW   = { type: "spring", stiffness: 120, damping: 20, mass: 1.2 };
const SNAPPY = { type: "spring", stiffness: 400, damping: 22 };

// ─── ANIMATED COUNTER ─────────────────────────────────────────────────────────
function Counter({ to, suffix = "", delay = 0 }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => {
      let start = null;
      const dur = 1400;
      const step = (ts) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / dur, 1);
        setDisplay(Math.round((1 - Math.pow(1 - p, 3)) * to));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delay);
    return () => clearTimeout(t);
  }, [to, delay]);
  return <>{display}{suffix}</>;
}

// ─── STAT CARD ────────────────────────────────────────────────────────────────
function StatCard({ n, suffix, label, delay, floatY }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, ...BOUNCY }}
      style={{ y: floatY, cursor: "none", padding: "24px 20px", textAlign: "center", borderRight: "1px solid rgba(13,13,13,0.08)" }}
      whileHover={{ y: -4, transition: SNAPPY }}
    >
      <div style={{ fontFamily: FONT_SERIF, fontSize: "clamp(1.8rem,3.5vw,2.6rem)", fontWeight: 900, lineHeight: 1, color: INK }}>
        <Counter to={n} delay={delay * 1000} />
        <span style={{ color: ACCENT }}>{suffix}</span>
      </div>
      <div style={{ fontFamily: FONT_MONO, fontSize: "0.52rem", letterSpacing: "0.18em", textTransform: "uppercase", color: MUTED, marginTop: 5 }}>
        {label}
      </div>
    </motion.div>
  );
}

// ─── TIMELINE ITEM ────────────────────────────────────────────────────────────
function TimelineItem({ role, org, period, desc, tags, index, isLast }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: "flex", gap: 24, cursor: "none" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Spine */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
        <motion.div
          animate={{ background: hovered ? ACCENT : INK, scale: hovered ? 1.4 : 1 }}
          transition={SNAPPY}
          style={{ width: 9, height: 9, borderRadius: "50%", marginTop: 5, flexShrink: 0 }}
        />
        {!isLast && (
          <div style={{ width: 1, flex: 1, background: "rgba(13,13,13,0.1)", marginTop: 8 }} />
        )}
      </div>

      {/* Content */}
      <div style={{ paddingBottom: isLast ? 0 : 40, flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 6, marginBottom: 6 }}>
          <div>
            <motion.div
              animate={{ color: hovered ? ACCENT : INK }}
              transition={{ duration: 0.2 }}
              style={{ fontFamily: FONT_SERIF, fontSize: "clamp(1rem,2vw,1.2rem)", fontWeight: 900, lineHeight: 1.2 }}
            >
              {role}
            </motion.div>
            <div style={{ fontFamily: FONT_MONO, fontSize: "0.62rem", letterSpacing: "0.12em", color: MUTED, marginTop: 3, textTransform: "uppercase" }}>
              {org}
            </div>
          </div>
          <div style={{
            fontFamily: FONT_MONO, fontSize: "0.58rem", letterSpacing: "0.14em", color: ACCENT,
            background: "rgba(200,75,47,0.07)", padding: "3px 10px",
            border: "1px solid rgba(200,75,47,0.18)", whiteSpace: "nowrap", alignSelf: "flex-start",
          }}>
            {period}
          </div>
        </div>
        <p style={{ fontFamily: FONT_BODY, fontSize: "0.82rem", lineHeight: 1.8, color: "rgba(13,13,13,0.48)", marginBottom: 12, marginTop: 8 }}>
          {desc}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {tags.map(t => (
            <span key={t} style={{
              fontFamily: FONT_MONO, fontSize: "0.52rem", letterSpacing: "0.1em", textTransform: "uppercase",
              color: "rgba(13,13,13,0.38)", border: "1px solid rgba(13,13,13,0.12)", padding: "2px 8px",
            }}>{t}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function Resume() {
  const [time, setTime]             = useState("");
  const [downloaded, setDownloaded] = useState(false);

  const floatA = useMotionValue(0);
  const floatB = useMotionValue(0);
  const floatC = useMotionValue(0);
  const floatD = useMotionValue(0);

  const cursorX = useMotionValue(-300);
  const cursorY = useMotionValue(-300);
  const blobX   = useSpring(cursorX, { stiffness: 80, damping: 20 });
  const blobY   = useSpring(cursorY, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setTime(d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const fn = e => { cursorX.set(e.clientX); cursorY.set(e.clientY); };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  useEffect(() => {
    const a1 = animate(floatA, [0, -10, 0], { duration: 4.2, repeat: Infinity, ease: "easeInOut" });
    const a2 = animate(floatB, [0,  -7, 0], { duration: 5.8, repeat: Infinity, ease: "easeInOut", delay: 1.1 });
    const a3 = animate(floatC, [0,  -9, 0], { duration: 3.9, repeat: Infinity, ease: "easeInOut", delay: 2.2 });
    const a4 = animate(floatD, [0,  -6, 0], { duration: 6.1, repeat: Infinity, ease: "easeInOut", delay: 0.6 });
    return () => { a1.stop(); a2.stop(); a3.stop(); a4.stop(); };
  }, []);

  // ─── DATA ──────────────────────────────────────────────────────────────────
  const education = [
    {
      role: "B.Tech Information Technology",
      org: "Indian Institute of Information Technology Gwalior",
      period: "2020 — 2024",
      desc: "Specialisation in Artificial Intelligence & Algorithms. Thesis on multi-agent systems and Nash equilibrium in adversarial environments.",
      tags: ["AI", "Algorithms", "Web Dev", "CGPA 7.5"],
    },
  ];

  const stats = [
    { n: 1,  suffix: "+", label: "Yrs Exp",  flo: floatA },
    { n: 3, suffix: "+", label: "Projects", flo: floatB },
    { n: 9,  suffix: "×", label: "Stacks",   flo: floatC },
    { n: 94, suffix: "%", label: "Score",    flo: floatD },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,900&family=JetBrains+Mono:wght@200;300;400;500&family=Barlow:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        .cv-root, .cv-root * { cursor: none !important; }

        .cv-root {
          min-height: 100vh;
          background: ${CREAM};
          font-family: ${FONT_BODY};
          color: ${INK};
          position: relative;
          overflow: hidden;
        }
        .cv-grid {
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(rgba(13,13,13,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(13,13,13,0.035) 1px, transparent 1px);
          background-size: 56px 56px;
        }
        .cv-blob { position: absolute; pointer-events: none; z-index: 0; }
        @keyframes blob1 {
          0%,100%{ border-radius:60% 40% 55% 45%/50% 60% 40% 50%; transform:scale(1); }
          50%    { border-radius:40% 60% 45% 55%/60% 40% 60% 40%; transform:scale(1.06); }
        }
        @keyframes blob2 {
          0%,100%{ border-radius:45% 55% 40% 60%/55% 45% 55% 45%; }
          50%    { border-radius:60% 40% 55% 45%/45% 60% 40% 55%; transform:scale(1.04); }
        }
        .cv-blob-1 {
          width:700px; height:700px; top:-20%; right:-15%;
          background: radial-gradient(circle at 55% 45%, rgba(200,75,47,0.09) 0%, rgba(200,75,47,0.03) 50%, transparent 70%);
          animation: blob1 16s ease-in-out infinite;
        }
        .cv-blob-2 {
          width:500px; height:500px; bottom:-10%; left:-10%;
          background: radial-gradient(circle at 45% 55%, rgba(13,13,13,0.05) 0%, transparent 65%);
          animation: blob2 20s ease-in-out infinite;
        }
        @keyframes dotPulse {
          0%,100%{ box-shadow: 0 0 0 0 rgba(200,75,47,0.4); }
          50%    { box-shadow: 0 0 0 6px rgba(200,75,47,0); }
        }
        .dot-pulse { animation: dotPulse 2.5s ease-in-out infinite; }
        @keyframes scanTick { 0%,100%{opacity:0.25} 50%{opacity:0.55} }
        .scan-tick { animation: scanTick 3s ease-in-out infinite; }
        @keyframes shimmer {
          0%{left:-70%;opacity:0} 35%{opacity:0.7} 65%{opacity:0.7} 100%{left:150%;opacity:0}
        }
        .cv-dl-btn {
          position: relative; overflow: hidden;
          display: inline-flex; align-items: center; gap: 12px;
          padding: 15px 34px; background: ${INK}; color: ${CREAM};
          font-family: ${FONT_MONO}; font-size: 0.7rem; font-weight: 500;
          letter-spacing: 0.16em; text-transform: uppercase;
          text-decoration: none; cursor: none; border: none;
        }
        .cv-dl-btn::before {
          content:''; position:absolute; top:0; left:-70%; height:100%; width:35%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
          transform: skewX(-12deg);
          animation: shimmer 4s ease-in-out infinite 1s; pointer-events: none;
        }
        .cv-outline-btn {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 14px 30px; background: transparent; color: rgba(13,13,13,0.45);
          font-family: ${FONT_MONO}; font-size: 0.68rem; font-weight: 400;
          letter-spacing: 0.14em; text-transform: uppercase;
          text-decoration: none; cursor: none;
          border: 1px solid rgba(13,13,13,0.2);
          transition: color 0.2s, border-color 0.2s;
        }
        .cv-outline-btn:hover { color: ${INK}; border-color: rgba(13,13,13,0.5); }
        .cv-stats-row { display: grid; grid-template-columns: repeat(4, 1fr); }
        .cv-stats-row > div:last-child { border-right: none; }
        .cv-title-block { display: flex; justify-content: space-between; align-items: flex-end; gap: 40px; flex-wrap: wrap; }
        @media (max-width: 900px) {
          .cv-title-block { flex-direction: column; align-items: flex-start; }
          .cv-stats-row { grid-template-columns: repeat(2, 1fr); }
          .cv-stats-row > div:nth-child(2) { border-right: none; }
          .cv-stats-row > div { border-bottom: 1px solid rgba(13,13,13,0.08); }
          .cv-stats-row > div:last-child { border-bottom: none; }
        }
      `}</style>

      {/* ── Custom Cursor ── */}
      <motion.div style={{
        position: "fixed", left: blobX, top: blobY,
        width: 36, height: 36, borderRadius: "50%",
        background: "rgba(200,75,47,0.15)", border: "1px solid rgba(200,75,47,0.22)",
        backdropFilter: "blur(4px)", transform: "translate(-50%,-50%)",
        pointerEvents: "none", zIndex: 9999,
      }} />
      <motion.div style={{
        position: "fixed", left: cursorX, top: cursorY,
        width: 5, height: 5, borderRadius: "50%", background: ACCENT,
        transform: "translate(-50%,-50%)", pointerEvents: "none", zIndex: 10000,
      }} />

      <div className="cv-root">
        <div className="cv-grid" />
        <div className="cv-blob cv-blob-1" />
        <div className="cv-blob cv-blob-2" />

        <div style={{ position: "relative", zIndex: 10 }}>

          {/* ══ TOP BAR ══ */}
          <motion.header
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ...SNAPPY, delay: 0.05 }}
            style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "22px 48px", borderBottom: "1px solid rgba(13,13,13,0.08)",
              background: "rgba(247,243,237,0.88)", backdropFilter: "blur(20px)",
              position: "sticky", top: 0, zIndex: 50,
            }}
          >
            <div style={{ fontFamily: FONT_MONO, fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: MUTED }}>
              kartik.dev
            </div>
            <div style={{ display: "flex", gap: 4 }}>
              {["WORK", "RESUME", "CONTACT"].map((n, i) => (
                <motion.a key={n} href={`#${n.toLowerCase()}`}
                  initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ ...BOUNCY, delay: 0.1 + i * 0.05 }}
                  style={{ fontFamily: FONT_MONO, fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(13,13,13,0.32)", textDecoration: "none", padding: "5px 12px", cursor: "none" }}
                >{n}</motion.a>
              ))}
            </div>
            <div className="scan-tick" style={{ fontFamily: FONT_MONO, fontSize: "0.62rem", color: MUTED, letterSpacing: "0.1em", fontVariantNumeric: "tabular-nums" }}>
              {time}
            </div>
          </motion.header>

          {/* ══ HERO BAND ══ */}
          <section style={{ padding: "80px 48px 60px", borderBottom: "1px solid rgba(13,13,13,0.07)" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>

              <motion.div
                initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
                transition={{ ...BOUNCY, delay: 0.2 }}
                style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}
              >
                <div className="dot-pulse" style={{ width: 7, height: 7, borderRadius: "50%", background: ACCENT }} />
                <span style={{ fontFamily: FONT_MONO, fontSize: "0.62rem", letterSpacing: "0.24em", color: MUTED, textTransform: "uppercase" }}>
                  SECTION 03 · CURRICULUM VITAE
                </span>
              </motion.div>

              <div className="cv-title-block">
                <div>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ ...SLOW, delay: 0.28 }}
                    style={{ fontFamily: FONT_SERIF, fontSize: "clamp(3rem,8vw,5.5rem)", fontWeight: 900, lineHeight: 0.9, letterSpacing: "-0.02em" }}
                  >
                    My
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ ...SLOW, delay: 0.36 }}
                    style={{ fontFamily: FONT_SERIF, fontSize: "clamp(3rem,8vw,5.5rem)", fontWeight: 900, lineHeight: 0.9, letterSpacing: "-0.02em", fontStyle: "italic", color: ACCENT }}
                  >
                    Résumé.
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ ...SLOW, delay: 0.45 }}
                  style={{ maxWidth: 360 }}
                >
                  <p style={{ fontFamily: FONT_BODY, fontSize: "0.88rem", lineHeight: 1.8, color: "rgba(13,13,13,0.45)", marginBottom: 28 }}>
                    Final-year CS engineer. Game theorist. Builder of{" "}
                    <strong style={{ color: INK, fontWeight: 600 }}>AI-powered systems</strong>{" "}
                    at the intersection of language models and algorithmic strategy.
                  </p>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
                    <motion.a
                      href="/kartik_resume.pdf" download
                      className="cv-dl-btn"
                      onClick={() => setDownloaded(true)}
                      whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    >
                      <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                        <path d="M7 1v8M3 6l4 4 4-4M1 11h12v2H1z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Download CV
                    </motion.a>
                    <motion.a href="#contact" className="cv-outline-btn" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      Get in Touch
                      <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                        <path d="M1 6h10M6 1l5 5-5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </motion.a>
                  </div>
                  {downloaded && (
                    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                      style={{ fontFamily: FONT_MONO, fontSize: "0.58rem", letterSpacing: "0.14em", color: ACCENT, marginTop: 12, textTransform: "uppercase" }}>
                      ✓ Download started — good luck, recruiter.
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </div>
          </section>

          {/* ══ STATS BAND ══ */}
          <section style={{ borderBottom: "1px solid rgba(13,13,13,0.07)" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
              <div className="cv-stats-row">
                {stats.map((s, i) => (
                  <StatCard key={i} n={s.n} suffix={s.suffix} label={s.label} delay={0.5 + i * 0.08} floatY={s.flo} />
                ))}
              </div>
            </div>
          </section>

          {/* ══ EDUCATION TIMELINE ══ */}
          <section style={{ maxWidth: 1100, margin: "0 auto", padding: "64px 48px" }}>

            {/* Section label */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ ...BOUNCY, delay: 0.1 }}
              style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 48 }}
            >
              <div style={{ width: 28, height: 1, background: ACCENT }} />
              <span style={{ fontFamily: FONT_MONO, fontSize: "0.6rem", letterSpacing: "0.24em", color: MUTED, textTransform: "uppercase" }}>
                EDUCATION
              </span>
              <div style={{ flex: 1, height: 1, background: "rgba(13,13,13,0.07)" }} />
            </motion.div>

            <div style={{ maxWidth: 680 }}>
              {education.map((item, i) => (
                <TimelineItem key={i} {...item} index={i} isLast={i === education.length - 1} />
              ))}
            </div>
          </section>

          {/* ══ BOTTOM STRIP ══ */}
          <motion.footer
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...SLOW, delay: 0.2 }}
            style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "14px 48px", borderTop: "1px solid rgba(13,13,13,0.07)",
              flexWrap: "wrap", gap: 10,
            }}
          >
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {["React","Next.js","Node","Python","TypeScript","MongoDB","Docker"].map((t, i) => (
                <motion.span key={t}
                  initial={{ opacity: 0, scale: 0.7 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ ...BOUNCY, delay: i * 0.05 }}
                  whileHover={{ y: -2 }}
                  style={{
                    fontFamily: FONT_MONO, fontSize: "0.52rem", letterSpacing: "0.1em",
                    textTransform: "uppercase", color: MUTED,
                    padding: "3px 9px", border: "1px solid rgba(13,13,13,0.1)", cursor: "none",
                  }}
                >{t}</motion.span>
              ))}
            </div>
            <div style={{ fontFamily: FONT_SERIF, fontSize: "0.75rem", fontStyle: "italic", color: "rgba(13,13,13,0.2)" }}>03</div>
          </motion.footer>

        </div>
      </div>
    </>
  );
}