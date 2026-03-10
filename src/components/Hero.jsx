import { useState, useEffect } from "react";
import { motion, useSpring, useMotionValue, useTransform, animate } from "framer-motion";

// ─── Typewriter ───────────────────────────────────────────────────────────────
const ROLES = ["Full Stack Developer", "ML Enthusiast", "Tech Explorer"];

function useTypewriter(words) {
  const [display, setDisplay] = useState("");
  const [wi, setWi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const w = words[wi];
    let t;
    if (!del && ci < w.length)        t = setTimeout(() => setCi(c => c + 1), 72);
    else if (!del && ci === w.length)  t = setTimeout(() => setDel(true), 2600);
    else if (del && ci > 0)           t = setTimeout(() => setCi(c => c - 1), 30);
    else { setDel(false); setWi(i => (i + 1) % words.length); }
    setDisplay(w.slice(0, ci));
    return () => clearTimeout(t);
  }, [ci, del, wi, words]);
  return display;
}

// ─── Animated counter ─────────────────────────────────────────────────────────
function Counter({ to, delay = 0 }) {
  const val     = useMotionValue(0);
  const rounded = useTransform(val, v => Math.round(v));
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const unsub = rounded.on("change", v => setDisplay(v));
    const t = setTimeout(() => {
      animate(val, to, { duration: 1.4, ease: [0.22, 1, 0.36, 1] });
    }, delay);
    return () => { unsub(); clearTimeout(t); };
  }, [to, delay, val, rounded]);
  return <>{display}</>;
}

// ─── Spring presets ───────────────────────────────────────────────────────────
const BOUNCY = { type: "spring", stiffness: 300, damping: 18, mass: 0.8 };
const SLOW   = { type: "spring", stiffness: 120, damping: 20, mass: 1.2 };
const SNAPPY = { type: "spring", stiffness: 400, damping: 22 };

// ─── Component ────────────────────────────────────────────────────────────────
export default function Hero() {
  const typed = useTypewriter(ROLES);
  const [time, setTime] = useState("");

  // Framer cursor
  const cursorX = useMotionValue(-300);
  const cursorY = useMotionValue(-300);
  const blobX   = useSpring(cursorX, { stiffness: 80,  damping: 20 });
  const blobY   = useSpring(cursorY, { stiffness: 80,  damping: 20 });

  // Panel tilt
  const panelRotX = useSpring(0, { stiffness: 60, damping: 18 });
  const panelRotY = useSpring(0, { stiffness: 60, damping: 18 });

  // Shared ambient float values
  const floatA = useMotionValue(0);
  const floatB = useMotionValue(0);
  const floatC = useMotionValue(0);

  // Live clock
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setTime(d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Mouse tracking
  useEffect(() => {
    const fn = e => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      const nx = (e.clientX / window.innerWidth  - 0.5) * 6;
      const ny = (e.clientY / window.innerHeight - 0.5) * 4;
      panelRotY.set(nx);
      panelRotX.set(-ny);
    };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, [cursorX, cursorY, panelRotX, panelRotY]);

  // Ambient float loops
  useEffect(() => {
    const a1 = animate(floatA, [0, -12, 0], { duration: 4.0, repeat: Infinity, ease: "easeInOut" });
    const a2 = animate(floatB, [0,  -8, 0], { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.0 });
    const a3 = animate(floatC, [0,  -6, 0], { duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 2.0 });
    return () => { a1.stop(); a2.stop(); a3.stop(); };
  }, [floatA, floatB, floatC]);

  const nameChars  = ["K","A","R","T","I","K"];
  const accentIdx  = [2, 3]; // R, T
  const skills     = [{ label:"Frontend", w:88 }, { label:"Backend", w:82 }, { label:"ML / AI", w:68 }];
  const techs      = ["React","Next.js","Node","Python","TypeScript","MongoDB","Docker","Tailwind"];
  const statData   = [
    { n:3,  u:"+", l:"Yrs Exp.", flo:floatB },
    { n:20, u:"+", l:"Projects", flo:floatC },
    { n:5,  u:"×", l:"Stacks",   flo:floatA },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,900;1,400;1,900&family=JetBrains+Mono:wght@200;300;400&family=Barlow:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --cream:  #f7f3ed;
          --ink:    #0d0d0d;
          --accent: #c84b2f;
          --muted:  rgba(13,13,13,0.38);
        }

        .m-root, .m-root * { cursor: none !important; }

        /* ── blobs ── */
        @keyframes inkBlob1 {
          0%,100%{ border-radius:60% 40% 55% 45%/50% 60% 40% 50%; transform:scale(1) rotate(0deg); }
          33%    { border-radius:40% 60% 45% 55%/60% 40% 60% 40%; transform:scale(1.06) rotate(4deg); }
          66%    { border-radius:55% 45% 60% 40%/40% 55% 45% 60%; transform:scale(.97) rotate(-3deg); }
        }
        @keyframes inkBlob2 {
          0%,100%{ border-radius:45% 55% 40% 60%/55% 45% 55% 45%; transform:scale(1) rotate(0deg); }
          33%    { border-radius:60% 40% 55% 45%/45% 60% 40% 55%; transform:scale(1.05) rotate(-5deg); }
          66%    { border-radius:40% 60% 50% 50%/60% 40% 50% 50%; transform:scale(.96) rotate(3deg); }
        }
        @keyframes inkBlob3 {
          0%,100%{ border-radius:50% 50% 45% 55%/60% 40% 60% 40%; transform:scale(1) rotate(0deg); }
          50%    { border-radius:38% 62% 55% 45%/45% 55% 40% 60%; transform:scale(1.08) rotate(6deg); }
        }

        @keyframes blink       { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes dotPulse    { 0%,100%{box-shadow:0 0 0 0 rgba(200,75,47,.4)} 50%{box-shadow:0 0 0 7px rgba(200,75,47,0)} }
        @keyframes avatarRing  { 0%,100%{box-shadow:0 0 0 0 rgba(200,75,47,.3)} 50%{box-shadow:0 0 0 5px rgba(200,75,47,0)} }
        @keyframes scanTick    { 0%,100%{opacity:.25} 50%{opacity:.5} }
        @keyframes lineGrow    { from{transform:scaleX(0);transform-origin:left} to{transform:scaleX(1)} }
        @keyframes notifShine  { 0%{left:-70%;opacity:0} 35%{opacity:1} 65%{opacity:1} 100%{left:150%;opacity:0} }
        @keyframes charGlow    { 0%,100%{text-shadow:none} 50%{text-shadow:0 0 24px rgba(200,75,47,.35)} }

        /* ── root ── */
        .m-root {
          min-height:100vh; background:var(--cream);
          position:relative; overflow:hidden;
          font-family:'Barlow',sans-serif; color:var(--ink);
        }

        .m-blob { position:absolute; pointer-events:none; z-index:0; }
        .m-blob-1 { width:680px;height:680px;top:-18%;left:-14%;
          background:radial-gradient(circle at 40% 40%,rgba(200,75,47,.12) 0%,rgba(200,75,47,.04) 50%,transparent 70%);
          animation:inkBlob1 14s ease-in-out infinite; }
        .m-blob-2 { width:560px;height:560px;top:35%;right:-12%;
          background:radial-gradient(circle at 60% 55%,rgba(13,13,13,.07) 0%,rgba(13,13,13,.02) 55%,transparent 72%);
          animation:inkBlob2 18s ease-in-out infinite; }
        .m-blob-3 { width:400px;height:400px;bottom:-10%;left:30%;
          background:radial-gradient(circle at 50% 50%,rgba(200,75,47,.07) 0%,transparent 65%);
          animation:inkBlob3 22s ease-in-out infinite; }

        .m-grid {
          position:absolute;inset:0;pointer-events:none;z-index:0;
          background-image:
            linear-gradient(rgba(13,13,13,.04) 1px,transparent 1px),
            linear-gradient(90deg,rgba(13,13,13,.04) 1px,transparent 1px);
          background-size:56px 56px;
        }

        /* ── layout ── */
        .m-layout {
          position:relative;z-index:10;min-height:100vh;
          display:grid;
          grid-template-columns:1fr 1fr;
          grid-template-rows:auto 1fr auto;
        }

        /* top bar */
        .m-topbar {
          grid-column:1/-1;grid-row:1;
          display:flex;justify-content:space-between;align-items:center;
          padding:24px 48px;
          border-bottom:1px solid rgba(13,13,13,.08);
        }
        .m-logo { font-family:'JetBrains Mono',monospace;font-size:.7rem;font-weight:300;letter-spacing:.2em;text-transform:uppercase;color:var(--muted); }
        .m-topnav { display:flex;gap:32px;font-family:'JetBrains Mono',monospace;font-size:.65rem;font-weight:300;letter-spacing:.16em;text-transform:uppercase;color:rgba(13,13,13,.35); }
        .m-topnav a { color:inherit;text-decoration:none; }
        .m-time { font-family:'JetBrains Mono',monospace;font-size:.65rem;font-weight:200;letter-spacing:.1em;color:rgba(13,13,13,.25);animation:scanTick 3s ease-in-out infinite;font-variant-numeric:tabular-nums; }

        /* left */
        .m-left { grid-column:1;grid-row:2;display:flex;flex-direction:column;justify-content:center;padding:52px 48px;border-right:1px solid rgba(13,13,13,.08); }
        .m-issue { font-family:'JetBrains Mono',monospace;font-size:.62rem;font-weight:300;letter-spacing:.22em;text-transform:uppercase;color:var(--muted);margin-bottom:22px;display:flex;align-items:center;gap:10px; }
        .m-issue-dot { width:6px;height:6px;border-radius:50%;background:var(--accent);animation:dotPulse 2.5s ease-in-out infinite; }
        .m-name-hi { font-family:'Playfair Display',serif;font-size:clamp(1.1rem,2.5vw,1.5rem);font-weight:400;font-style:italic;color:var(--muted);line-height:1;margin-bottom:4px;display:block; }
        .m-name-row { display:flex;line-height:.88;margin-bottom:4px; }
        .m-name-char { font-family:'Playfair Display',serif;font-size:clamp(5rem,10vw,9rem);font-weight:900;letter-spacing:-.03em;color:var(--ink);display:inline-block; }
        .m-name-char.accent { font-style:italic;color:var(--accent);animation:charGlow 3s ease-in-out infinite; }
        .m-divider { width:64px;height:2px;background:var(--ink);margin-bottom:24px; }
        .m-desc { font-size:clamp(.82rem,1.4vw,.95rem);font-weight:300;line-height:1.75;color:rgba(13,13,13,.45);max-width:340px;margin-bottom:36px; }
        .m-desc strong { color:var(--ink);font-weight:500; }
        .m-btns { display:flex;align-items:center;gap:12px;flex-wrap:wrap; }
        .m-btn-main { font-family:'JetBrains Mono',monospace;font-size:.72rem;font-weight:400;letter-spacing:.12em;text-transform:uppercase;color:var(--cream);background:var(--ink);border:none;border-radius:6px;padding:13px 28px;cursor:none;text-decoration:none;display:inline-block;box-shadow:0 4px 16px rgba(13,13,13,.18);position:relative;overflow:hidden; }
        .m-btn-main::after { content:'';position:absolute;inset:0;border-radius:inherit;background:linear-gradient(135deg,rgba(255,255,255,.1),transparent);opacity:0;transition:opacity .2s; }
        .m-btn-main:hover::after { opacity:1; }
        .m-btn-outline { font-family:'JetBrains Mono',monospace;font-size:.72rem;font-weight:300;letter-spacing:.12em;text-transform:uppercase;color:rgba(13,13,13,.45);background:transparent;border:1px solid rgba(13,13,13,.18);border-radius:6px;padding:12px 24px;cursor:none;text-decoration:none;display:inline-flex;align-items:center;gap:7px;transition:color .2s,border-color .2s; }
        .m-btn-outline:hover { color:var(--ink);border-color:rgba(13,13,13,.45); }

        /* right */
        .m-right { grid-column:2;grid-row:2;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:48px;gap:24px;position:relative; }

        /* notification card */
        .m-notif { width:100%;max-width:310px;background:rgba(255,255,255,.55);backdrop-filter:blur(44px) saturate(200%);-webkit-backdrop-filter:blur(44px) saturate(200%);border:1px solid rgba(255,255,255,.82);border-radius:24px;padding:18px 18px 14px;box-shadow:0 2px 4px rgba(0,0,0,.03),0 12px 40px rgba(0,0,0,.10),0 40px 80px rgba(0,0,0,.07),inset 0 1.5px 0 rgba(255,255,255,.95),inset 0 -1px 0 rgba(0,0,0,.04);position:relative;overflow:hidden; }
        .m-notif::before { content:'';position:absolute;top:0;left:-70%;height:100%;width:35%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.38),transparent);transform:skewX(-12deg);pointer-events:none;animation:notifShine 7s ease-in-out infinite 2s; }
        .m-notif::after { content:'';position:absolute;top:0;left:12%;right:12%;height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.9),transparent);pointer-events:none; }
        .m-notif-header { display:flex;align-items:center;gap:10px;margin-bottom:12px; }
        .m-avatar { width:38px;height:38px;border-radius:12px;flex-shrink:0;background:linear-gradient(135deg,#1a1a1a 0%,#2d2d2d 100%);display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;animation:avatarRing 3s ease-in-out infinite;box-shadow:0 2px 8px rgba(0,0,0,.18),inset 0 1px 0 rgba(255,255,255,.1); }
        .m-avatar-initials { font-family:'Playfair Display',serif;font-size:.95rem;font-weight:900;font-style:italic;color:#f7f3ed;letter-spacing:-.02em;position:relative;z-index:1; }
        .m-avatar-accent { position:absolute;bottom:-4px;right:-4px;width:14px;height:14px;border-radius:50%;background:var(--accent);border:2px solid rgba(247,243,237,.85);box-shadow:0 0 8px rgba(200,75,47,.5); }
        .m-notif-meta { flex:1; }
        .m-notif-app { font-family:'JetBrains Mono',monospace;font-size:.58rem;font-weight:300;letter-spacing:.1em;text-transform:uppercase;color:rgba(13,13,13,.32);line-height:1;margin-bottom:1px; }
        .m-notif-when { font-family:'JetBrains Mono',monospace;font-size:.55rem;font-weight:200;color:rgba(13,13,13,.24); }
        .m-notif-dismiss { width:18px;height:18px;border-radius:50%;background:rgba(13,13,13,.07);display:flex;align-items:center;justify-content:center;color:rgba(13,13,13,.3);font-size:.55rem; }
        .m-notif-title { font-family:'Playfair Display',serif;font-size:1.1rem;font-weight:900;color:var(--ink);line-height:1.2;margin-bottom:5px; }
        .m-notif-body { font-size:.76rem;font-weight:300;line-height:1.55;color:rgba(13,13,13,.46);margin-bottom:14px; }
        .m-notif-body span { color:var(--ink);font-weight:500; }
        .m-notif-skills { margin-bottom:14px;display:flex;flex-direction:column;gap:7px; }
        .m-skill-row { display:flex;align-items:center;gap:8px; }
        .m-skill-label { font-family:'JetBrains Mono',monospace;font-size:.55rem;font-weight:300;letter-spacing:.08em;color:rgba(13,13,13,.38);width:62px;flex-shrink:0; }
        .m-skill-track { flex:1;height:3px;border-radius:2px;background:rgba(13,13,13,.08);overflow:hidden; }
        .m-skill-pct { font-family:'JetBrains Mono',monospace;font-size:.52rem;color:rgba(13,13,13,.3);width:28px;text-align:right; }
        .m-notif-sep { height:1px;background:rgba(13,13,13,.07);margin-bottom:12px; }
        .m-notif-actions { display:flex;gap:8px; }
        .m-notif-action { flex:1;padding:9px;text-align:center;border-radius:12px;font-size:.7rem;font-weight:500;cursor:none;text-decoration:none;display:block;font-family:'Barlow',sans-serif;letter-spacing:.01em; }
        .m-notif-action.primary { background:var(--ink);color:var(--cream); }
        .m-notif-action.secondary { background:rgba(13,13,13,.07);color:rgba(13,13,13,.6); }

        .m-role { font-family:'JetBrains Mono',monospace;font-size:.68rem;font-weight:200;letter-spacing:.12em;color:rgba(13,13,13,.3);display:flex;align-items:center;gap:8px;justify-content:center; }
        .m-role-typed { color:rgba(13,13,13,.62);font-weight:400; }
        .m-role-cursor { display:inline-block;width:7px;height:1.5px;background:var(--accent);vertical-align:middle;margin-left:1px;animation:blink 1s step-end infinite; }

        .m-stats { display:flex;gap:0;justify-content:center;border:1px solid rgba(13,13,13,.09);border-radius:14px;overflow:hidden;background:rgba(255,255,255,.35);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px); }
        .m-stat { text-align:center;padding:14px 22px;border-right:1px solid rgba(13,13,13,.09); }
        .m-stat:last-child { border-right:none; }
        .m-stat-n { font-family:'Playfair Display',serif;font-size:1.55rem;font-weight:900;color:var(--ink);line-height:1; }
        .m-stat-n em { font-style:normal;color:var(--accent); }
        .m-stat-l { font-family:'JetBrains Mono',monospace;font-size:.52rem;letter-spacing:.14em;text-transform:uppercase;color:rgba(13,13,13,.28);margin-top:3px; }

        .m-bottom { grid-column:1/-1;grid-row:3;display:flex;justify-content:space-between;align-items:center;padding:14px 48px;border-top:1px solid rgba(13,13,13,.08); }
        .m-scroll-hint { font-family:'JetBrains Mono',monospace;font-size:.58rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(13,13,13,.22);display:flex;align-items:center;gap:10px; }
        .m-tech-row { display:flex;gap:5px;flex-wrap:wrap;justify-content:center;max-width:420px; }
        .m-tech-tag { font-family:'JetBrains Mono',monospace;font-size:.54rem;letter-spacing:.1em;text-transform:uppercase;color:rgba(13,13,13,.28);padding:3px 9px;border:1px solid rgba(13,13,13,.1);border-radius:4px; }
        .m-pagenum { font-family:'Playfair Display',serif;font-size:.75rem;font-style:italic;color:rgba(13,13,13,.2); }

        @media (max-width:760px) {
          .m-layout { grid-template-columns:1fr; }
          .m-left { grid-column:1;padding:32px 24px 24px;border-right:none;border-bottom:1px solid rgba(13,13,13,.08); }
          .m-right { grid-column:1;padding:32px 24px; }
          .m-topbar { padding:18px 24px; }
          .m-topnav { display:none; }
          .m-bottom { padding:14px 24px; }
          .m-tech-row { display:none; }
        }
      `}</style>

      {/* ── Cursor ── */}
      <motion.div style={{
        position:"fixed", left:blobX, top:blobY,
        width:38, height:38, borderRadius:"50%",
        background:"rgba(200,75,47,.18)",
        backdropFilter:"blur(4px)",
        border:"1px solid rgba(200,75,47,.25)",
        transform:"translate(-50%,-50%)",
        pointerEvents:"none", zIndex:9999,
      }}/>
      <motion.div style={{
        position:"fixed", left:cursorX, top:cursorY,
        width:5, height:5, borderRadius:"50%",
        background:"#c84b2f",
        transform:"translate(-50%,-50%)",
        pointerEvents:"none", zIndex:10000,
      }}/>

      <div className="m-root">
        <div className="m-blob m-blob-1"/>
        <div className="m-blob m-blob-2"/>
        <div className="m-blob m-blob-3"/>
        <div className="m-grid"/>

        <div className="m-layout">

          {/* ── TOP BAR ── */}
          <motion.header className="m-topbar"
            initial={{ y:-60, opacity:0 }}
            animate={{ y:0,   opacity:1 }}
            transition={{ ...SNAPPY, delay:0.05 }}
          >
            <div className="m-logo">kartik.dev</div>
            <nav className="m-topnav">
              {["About","Work","Contact"].map((n,i) => (
                <motion.a key={n} href={`#${n.toLowerCase()}`}
                  initial={{ opacity:0, y:-10 }}
                  animate={{ opacity:1, y:0 }}
                  transition={{ ...BOUNCY, delay:0.15+i*0.06 }}
                >{n}</motion.a>
              ))}
            </nav>
            <motion.div className="m-time"
              initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.3 }}
            >{time}</motion.div>
          </motion.header>

          {/* ── LEFT ── */}
          <motion.div className="m-left"
            style={{ rotateX:panelRotX, rotateY:panelRotY, transformPerspective:1200 }}
          >
            <motion.div className="m-issue"
              initial={{ x:-60, opacity:0 }}
              animate={{ x:0,   opacity:1 }}
              transition={{ ...BOUNCY, delay:0.18 }}
            >
              <span className="m-issue-dot"/>
              Available · Open to Work
            </motion.div>

            {/* Name — chars fly in then breathe */}
            <div style={{ marginBottom:28 }}>
              <motion.span className="m-name-hi"
                initial={{ x:-40, opacity:0 }}
                animate={{ x:0,   opacity:1 }}
                transition={{ ...BOUNCY, delay:0.22 }}
              >hello, I'm</motion.span>

              <div className="m-name-row">
                {nameChars.map((ch, i) => (
                  <motion.span
                    key={i}
                    className={`m-name-char${accentIdx.includes(i) ? " accent" : ""}`}
                    initial={{ y:90, opacity:0, rotate: i%2===0 ? -10 : 10 }}
                    animate={{ y:0,  opacity:1, rotate:0 }}
                    transition={{ type:"spring", stiffness:280, damping:16, delay:0.28+i*0.055 }}
                  >
                    <motion.span
                      style={{ display:"inline-block" }}
                      animate={{ y:[0, -(4+i*1.5), 0] }}
                      transition={{ duration:2.8+i*0.3, repeat:Infinity, ease:"easeInOut", delay:i*0.18 }}
                    >{ch}</motion.span>
                  </motion.span>
                ))}
              </div>
            </div>

            <motion.div className="m-divider"
              initial={{ scaleX:0 }} animate={{ scaleX:1 }}
              style={{ transformOrigin:"left" }}
              transition={{ ...BOUNCY, delay:0.7 }}
            />

            <motion.p className="m-desc"
              initial={{ x:-40, opacity:0 }} animate={{ x:0, opacity:1 }}
              transition={{ ...SLOW, delay:0.72 }}
            >
              I build <strong>fast, thoughtful digital products</strong> — from
              scalable backends to interfaces people actually enjoy using.
            </motion.p>

            <motion.div className="m-btns"
              initial={{ y:30, opacity:0 }} animate={{ y:0, opacity:1 }}
              transition={{ ...BOUNCY, delay:0.88 }}
            >
              {/* Button bobs up/down on loop */}
              <motion.a href="#contact" className="m-btn-main"
                animate={{ y:[0,-3,0] }}
                transition={{ duration:3, repeat:Infinity, ease:"easeInOut", delay:1.5 }}
                whileHover={{ scale:1.05, y:-4 }}
                whileTap={{ scale:.95 }}
              >Let's Connect</motion.a>

              <motion.a href="#projects" className="m-btn-outline"
                whileHover={{ scale:1.04, y:-2 }} whileTap={{ scale:.95 }}
              >
                View Work
                {/* Arrow slides right on loop */}
                <motion.svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                  animate={{ x:[0,4,0] }}
                  transition={{ duration:2, repeat:Infinity, ease:"easeInOut", delay:2 }}
                >
                  <path d="M1 6h10M6 1l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </motion.svg>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* ── RIGHT ── */}
          <div className="m-right">

            {/* Notification card — floats + draggable */}
            <motion.div
              className="m-notif"
              initial={{ y:100, opacity:0, rotate:-6, scale:0.85 }}
              animate={{ y:0,   opacity:1, rotate:-1.5, scale:1 }}
              transition={{ type:"spring", stiffness:160, damping:14, mass:1.1, delay:0.5 }}
              style={{ y:floatA }}
              drag
              dragConstraints={{ left:-60, right:60, top:-40, bottom:40 }}
              dragElastic={0.35}
              dragTransition={{ bounceStiffness:280, bounceDamping:18 }}
              whileDrag={{ scale:1.04, rotate:0, boxShadow:"0 24px 60px rgba(0,0,0,.18)" }}
            >
              <div className="m-notif-header">
                {/* Avatar rocks side to side */}
                <motion.div className="m-avatar"
                  animate={{ rotate:[-1.5, 1.5, -1.5] }}
                  transition={{ duration:4, repeat:Infinity, ease:"easeInOut" }}
                >
                  <span className="m-avatar-initials">K</span>
                  <div className="m-avatar-accent"/>
                </motion.div>
                <div className="m-notif-meta">
                  <div className="m-notif-app">Portfolio · Live</div>
                  <div className="m-notif-when">just now</div>
                </div>
                <div className="m-notif-dismiss">✕</div>
              </div>

              <div className="m-notif-title">Kartik is Available</div>
              <div className="m-notif-body">
                Working as a <span>{typed || "developer"}</span>
                <span className="m-role-cursor"/> — open to full-time &amp; freelance.
              </div>

              <div className="m-notif-skills">
                {skills.map((s,i) => (
                  <div key={i} className="m-skill-row">
                    <div className="m-skill-label">{s.label}</div>
                    <div className="m-skill-track">
                      <motion.div
                        initial={{ width:0 }}
                        animate={{ width:`${s.w}%` }}
                        transition={{ ...SLOW, delay:0.9+i*0.14 }}
                        style={{ height:"100%", borderRadius:2, background:"linear-gradient(90deg,#0d0d0d,rgba(13,13,13,.5))" }}
                      />
                    </div>
                    <div className="m-skill-pct">{s.w}%</div>
                  </div>
                ))}
              </div>

              <div className="m-notif-sep"/>
              <div className="m-notif-actions">
                <motion.a href="#contact"  className="m-notif-action primary"   whileHover={{ scale:1.04 }} whileTap={{ scale:.94 }}>Reach Out</motion.a>
                <motion.a href="#projects" className="m-notif-action secondary" whileHover={{ scale:1.04 }} whileTap={{ scale:.94 }}>See Work</motion.a>
              </div>
            </motion.div>

            {/* Role line */}
            <motion.div className="m-role"
              initial={{ y:30, opacity:0 }} animate={{ y:0, opacity:1 }}
              transition={{ ...BOUNCY, delay:0.9 }}
            >
              {/* Chevron slides right on loop */}
              <motion.span style={{ color:"#c84b2f" }}
                animate={{ x:[0,4,0] }}
                transition={{ duration:1.8, repeat:Infinity, ease:"easeInOut" }}
              >›</motion.span>
              <span className="m-role-typed">{typed || "Developer"}</span>
              <span className="m-role-cursor"/>
            </motion.div>

            {/* Stats */}
            <motion.div className="m-stats"
              initial={{ y:40, opacity:0, scale:0.9 }}
              animate={{ y:0,  opacity:1, scale:1 }}
              transition={{ ...BOUNCY, delay:1.0 }}
            >
              {statData.map((s,i) => (
                <motion.div key={i} className="m-stat"
                  style={{ y:s.flo }}
                  whileHover={{ scale:1.06, transition:BOUNCY }}
                >
                  <div className="m-stat-n">
                    <Counter to={s.n} delay={(1.1+i*0.12)*1000}/>
                    <em>{s.u}</em>
                  </div>
                  <div className="m-stat-l">{s.l}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ── BOTTOM ── */}
          <motion.footer className="m-bottom"
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
            transition={{ ...SLOW, delay:1.3 }}
          >
            <div className="m-scroll-hint">
              {/* Scroll line breathes */}
              <motion.div
                style={{ height:1, background:"rgba(13,13,13,.18)" }}
                animate={{ width:["28px","44px","28px"] }}
                transition={{ duration:2.5, repeat:Infinity, ease:"easeInOut" }}
              />
              Scroll to explore
            </div>

            <div className="m-tech-row">
              {techs.map((t,i) => (
                <motion.span key={t} className="m-tech-tag"
                  initial={{ opacity:0, scale:.6, y:10 }}
                  animate={{ opacity:1, scale:1,  y:0  }}
                  transition={{ ...BOUNCY, delay:1.3+i*0.055 }}
                  whileHover={{ scale:1.12, y:-2, transition:SNAPPY }}
                >{t}</motion.span>
              ))}
            </div>

            <div className="m-pagenum">01</div>
          </motion.footer>
        </div>
      </div>
    </>
  );
}