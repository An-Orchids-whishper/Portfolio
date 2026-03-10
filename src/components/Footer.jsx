import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, animate } from "framer-motion";

const BOUNCY = { type: "spring", stiffness: 300, damping: 18, mass: 0.8 };
const SNAPPY = { type: "spring", stiffness: 400, damping: 22 };

const links = [
  {
    label: "GitHub",
    sub: "An-Orchids-whisper",
    href: "https://github.com/An-Orchids-whishper",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    sub: "kartik-pal",
    href: "https://www.linkedin.com/in/kartik-pal-76b8a31ab",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: "Email",
    sub: "imt_2023039@iiitm.ac.in",
    href: "mailto:imt_2023039@iiitm.ac.in",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="3"/>
        <path d="m2 7 10 7 10-7"/>
      </svg>
    ),
  },
];

export default function Footer() {
  // Blob ink animations
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

        .ft-root {
          position: relative;
          overflow: hidden;
          background: #f7f3ed;
          border-top: 1px solid rgba(13,13,13,.08);
          font-family: 'Barlow', sans-serif;
          color: #0d0d0d;
          padding: 52px 48px 36px;
        }

        /* ink blobs */
        .ft-blob {
          position: absolute; pointer-events: none; z-index: 0; border-radius: 50%;
        }
        .ft-blob-1 {
          width: 380px; height: 380px; bottom: -30%; left: -8%;
          background: radial-gradient(circle at 40% 40%, rgba(200,75,47,.1) 0%, rgba(200,75,47,.03) 55%, transparent 70%);
          animation: ftBlob1 16s ease-in-out infinite;
        }
        .ft-blob-2 {
          width: 300px; height: 300px; top: -20%; right: -5%;
          background: radial-gradient(circle at 60% 55%, rgba(13,13,13,.05) 0%, transparent 65%);
          animation: ftBlob2 20s ease-in-out infinite;
        }
        @keyframes ftBlob1 {
          0%,100%{ border-radius:60% 40% 55% 45%/50% 60% 40% 50%; transform:scale(1) rotate(0deg); }
          50%    { border-radius:40% 60% 45% 55%/60% 40% 60% 40%; transform:scale(1.07) rotate(5deg); }
        }
        @keyframes ftBlob2 {
          0%,100%{ border-radius:45% 55% 40% 60%/55% 45% 55% 45%; transform:scale(1) rotate(0deg); }
          50%    { border-radius:60% 40% 55% 45%/45% 60% 40% 55%; transform:scale(1.05) rotate(-4deg); }
        }

        /* subtle grid */
        .ft-grid {
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(rgba(13,13,13,.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(13,13,13,.04) 1px, transparent 1px);
          background-size: 56px 56px;
        }

        .ft-inner {
          position: relative; z-index: 10;
          max-width: 1100px; margin: 0 auto;
        }

        /* top row */
        .ft-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 40px;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }

        /* left: big name */
        .ft-name {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.8rem, 6vw, 5rem);
          font-weight: 900;
          line-height: .9;
          letter-spacing: -.03em;
          color: #0d0d0d;
        }
        .ft-name em {
          font-style: italic;
          color: #c84b2f;
        }
        .ft-tagline {
          font-family: 'JetBrains Mono', monospace;
          font-size: .62rem;
          font-weight: 300;
          letter-spacing: .2em;
          text-transform: uppercase;
          color: rgba(13,13,13,.35);
          margin-top: 10px;
        }

        /* right: link cards */
        .ft-links {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          align-items: flex-start;
        }
        .ft-link-card {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          background: rgba(255,255,255,.5);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(255,255,255,.8);
          border-radius: 14px;
          text-decoration: none;
          color: #0d0d0d;
          box-shadow: 0 2px 12px rgba(0,0,0,.06), inset 0 1px 0 rgba(255,255,255,.9);
          cursor: pointer;
          transition: color .2s;
          min-width: 140px;
          position: relative;
          overflow: hidden;
        }
        /* card shine sweep */
        .ft-link-card::before {
          content: '';
          position: absolute; top: 0; left: -60%; height: 100%; width: 30%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.35), transparent);
          transform: skewX(-12deg);
          opacity: 0;
          transition: opacity .3s;
        }
        .ft-link-card:hover::before { opacity: 1; animation: ftCardShine .5s ease forwards; }
        @keyframes ftCardShine {
          from { left: -60%; } to { left: 140%; }
        }
        .ft-link-icon {
          width: 34px; height: 34px; border-radius: 9px;
          background: #0d0d0d;
          display: flex; align-items: center; justify-content: center;
          color: #f7f3ed;
          flex-shrink: 0;
        }
        .ft-link-text { display: flex; flex-direction: column; gap: 1px; }
        .ft-link-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: .7rem; font-weight: 400; letter-spacing: .08em;
          color: #0d0d0d;
        }
        .ft-link-sub {
          font-family: 'JetBrains Mono', monospace;
          font-size: .55rem; font-weight: 200; letter-spacing: .06em;
          color: rgba(13,13,13,.35);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          max-width: 120px;
        }

        /* divider */
        .ft-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(13,13,13,.12) 20%, rgba(13,13,13,.12) 80%, transparent);
          margin-bottom: 24px;
        }

        /* bottom row */
        .ft-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }
        .ft-copy {
          font-family: 'JetBrains Mono', monospace;
          font-size: .6rem; font-weight: 200; letter-spacing: .14em;
          color: rgba(13,13,13,.28);
          text-transform: uppercase;
        }
        .ft-copy em { font-style: normal; color: #c84b2f; }
        .ft-made {
          font-family: 'JetBrains Mono', monospace;
          font-size: .6rem; font-weight: 200; letter-spacing: .1em;
          color: rgba(13,13,13,.22);
          display: flex; align-items: center; gap: 6px;
        }
        .ft-heart {
          color: #c84b2f;
          display: inline-block;
        }

        @media (max-width: 640px) {
          .ft-root   { padding: 40px 24px 28px; }
          .ft-top    { flex-direction: column; gap: 24px; }
          .ft-bottom { flex-direction: column; align-items: flex-start; }
          .ft-links  { flex-direction: column; }
        }

        @keyframes dotPulse { 0%,100%{box-shadow:0 0 0 0 rgba(200,75,47,.4)} 50%{box-shadow:0 0 0 6px rgba(200,75,47,0)} }
        .ft-status-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 0 0 rgba(34,197,94,.4);
          animation: dotPulse 2.5s ease-in-out infinite;
          display: inline-block;
        }
      `}</style>

      <footer className="ft-root">
        <div className="ft-blob ft-blob-1"/>
        <div className="ft-blob ft-blob-2"/>
        <div className="ft-grid"/>

        <div className="ft-inner">
          {/* TOP ROW */}
          <div className="ft-top">

            {/* Left — name + tagline */}
            <motion.div
              initial={{ x:-40, opacity:0 }}
              whileInView={{ x:0, opacity:1 }}
              viewport={{ once:true, margin:"-60px" }}
              transition={{ ...BOUNCY, delay:0.1 }}
            >
              <div className="ft-name">Kar<em>tik</em></div>
              <div className="ft-tagline">
                <span className="ft-status-dot" style={{ marginRight:8 }}/>
                Full Stack Dev · Open to work
              </div>
            </motion.div>

            {/* Right — link cards */}
            <div className="ft-links">
              {links.map((l, i) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  target={l.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="ft-link-card"
                  initial={{ y:30, opacity:0 }}
                  whileInView={{ y:0, opacity:1 }}
                  viewport={{ once:true, margin:"-60px" }}
                  transition={{ ...BOUNCY, delay:0.15+i*0.08 }}
                  style={{ y: i===0 ? floatA : i===1 ? floatB : floatA }}
                  whileHover={{ y:-5, scale:1.03, boxShadow:"0 8px 28px rgba(0,0,0,.12)", transition:BOUNCY }}
                  whileTap={{ scale:.96 }}
                >
                  <div className="ft-link-icon">{l.icon}</div>
                  <div className="ft-link-text">
                    <span className="ft-link-label">{l.label}</span>
                    <span className="ft-link-sub">{l.sub}</span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* DIVIDER — animated draw */}
          <motion.div className="ft-divider"
            initial={{ scaleX:0 }} whileInView={{ scaleX:1 }}
            viewport={{ once:true }} style={{ transformOrigin:"left" }}
            transition={{ duration:.9, ease:[.22,1,.36,1], delay:0.3 }}
          />

          {/* BOTTOM ROW */}
          <motion.div className="ft-bottom"
            initial={{ opacity:0, y:12 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            transition={{ ...BOUNCY, delay:0.4 }}
          >
            <div className="ft-copy">
              © 2025 <em>Kartik Pal</em> · All rights reserved
            </div>
            <div className="ft-made">
              Built with
              <motion.span className="ft-heart"
                animate={{ scale:[1, 1.35, 1] }}
                transition={{ duration:1.2, repeat:Infinity, ease:"easeInOut" }}
              >♥</motion.span>
              in React
            </div>
          </motion.div>
        </div>
      </footer>
    </>
  );
}