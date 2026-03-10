import { useState, useEffect } from "react";
import { motion, useMotionValue, animate } from "framer-motion";

const BOUNCY = { type: "spring", stiffness: 280, damping: 18, mass: 0.9 };
const SNAPPY = { type: "spring", stiffness: 400, damping: 22 };

const FIELDS = [
  { name:"name",    type:"text",     placeholder:"Your name",    label:"Name"    },
  { name:"email",   type:"email",    placeholder:"your@email.com",label:"Email"  },
  { name:"message", type:"textarea", placeholder:"What's on your mind?", label:"Message" },
];

export default function Contact() {
  const [form,    setForm]    = useState({ name:"", email:"", message:"" });
  const [focused, setFocused] = useState(null);
  const [sent,    setSent]    = useState(false);

  const floatA = useMotionValue(0);
  const floatB = useMotionValue(0);

  useEffect(() => {
    const a = animate(floatA, [0,-10,0], { duration:5,   repeat:Infinity, ease:"easeInOut" });
    const b = animate(floatB, [0, -7,0], { duration:6.5, repeat:Infinity, ease:"easeInOut", delay:1.5 });
    return () => { a.stop(); b.stop(); };
  }, [floatA, floatB]);

  const handleSubmit = e => {
    e.preventDefault();
    const { name, email, message } = form;
    window.location.href =
      `mailto:imt_2023039@iiitm.ac.in?subject=Message from ${encodeURIComponent(name)}&body=${encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${message}`)}`;
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,900;1,400;1,900&family=JetBrains+Mono:wght@200;300;400&family=Barlow:wght@300;400;500&display=swap');

        .ct-root {
          position: relative; overflow: hidden;
          background: #f7f3ed;
          min-height: 100vh;
          display: flex; align-items: center; justify-content: center;
          padding: 96px 24px 80px;
          font-family: 'Barlow', sans-serif;
          color: #0d0d0d;
        }

        /* blobs */
        .ct-blob { position:absolute; pointer-events:none; z-index:0; border-radius:50%; }
        .ct-blob-1 { width:600px;height:600px;top:-18%;right:-14%;
          background:radial-gradient(circle at 60% 40%,rgba(200,75,47,.11) 0%,rgba(200,75,47,.03) 55%,transparent 70%);
          animation:ctBlob1 15s ease-in-out infinite; }
        .ct-blob-2 { width:480px;height:480px;bottom:-14%;left:-10%;
          background:radial-gradient(circle at 40% 60%,rgba(13,13,13,.06) 0%,transparent 65%);
          animation:ctBlob2 19s ease-in-out infinite; }
        @keyframes ctBlob1{0%,100%{border-radius:60% 40% 55% 45%/50% 60% 40% 50%;transform:scale(1) rotate(0deg)}50%{border-radius:40% 60% 45% 55%/60% 40% 60% 40%;transform:scale(1.06) rotate(4deg)}}
        @keyframes ctBlob2{0%,100%{border-radius:45% 55% 40% 60%/55% 45% 55% 45%;transform:scale(1) rotate(0deg)}50%{border-radius:60% 40% 55% 45%/45% 60% 40% 55%;transform:scale(1.05) rotate(-5deg)}}

        .ct-grid {
          position:absolute;inset:0;pointer-events:none;z-index:0;
          background-image:linear-gradient(rgba(13,13,13,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(13,13,13,.04) 1px,transparent 1px);
          background-size:56px 56px;
        }

        .ct-inner {
          position:relative;z-index:10;
          width:100%;max-width:960px;
          display:grid;grid-template-columns:1fr 1fr;gap:60px;
          align-items:start;
        }

        /* ── LEFT ── */
        .ct-left { padding-top:8px; }

        .ct-eyebrow {
          font-family:'JetBrains Mono',monospace;
          font-size:.62rem;font-weight:300;letter-spacing:.22em;text-transform:uppercase;
          color:rgba(13,13,13,.35);margin-bottom:18px;
          display:flex;align-items:center;gap:10px;
        }
        .ct-eyebrow::before { content:'';display:inline-block;width:24px;height:1px;background:#c84b2f; }

        .ct-heading {
          font-family:'Playfair Display',serif;
          font-size:clamp(2.8rem,6vw,4.8rem);
          font-weight:900;line-height:.92;letter-spacing:-.03em;
          color:#0d0d0d;margin-bottom:24px;
        }
        .ct-heading em { font-style:italic;color:#c84b2f; }

        .ct-desc {
          font-size:.92rem;font-weight:300;line-height:1.75;
          color:rgba(13,13,13,.45);max-width:300px;margin-bottom:40px;
        }
        .ct-desc strong { color:#0d0d0d;font-weight:500; }

        /* contact info cards */
        .ct-info-list { display:flex;flex-direction:column;gap:10px; }
        .ct-info-card {
          display:flex;align-items:center;gap:12px;
          padding:13px 16px;
          background:rgba(255,255,255,.5);
          backdrop-filter:blur(20px) saturate(180%);
          -webkit-backdrop-filter:blur(20px) saturate(180%);
          border:1px solid rgba(255,255,255,.8);
          border-radius:14px;
          box-shadow:0 2px 12px rgba(0,0,0,.05),inset 0 1px 0 rgba(255,255,255,.9);
          text-decoration:none;color:#0d0d0d;
          position:relative;overflow:hidden;
          transition:color .2s;
        }
        .ct-info-card::before {
          content:'';position:absolute;top:0;left:-60%;height:100%;width:30%;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,.35),transparent);
          transform:skewX(-12deg);opacity:0;transition:opacity .25s;
        }
        .ct-info-card:hover::before { opacity:1;animation:ctShine .5s ease forwards; }
        @keyframes ctShine { from{left:-60%} to{left:140%} }
        .ct-info-icon {
          width:34px;height:34px;border-radius:9px;
          background:#0d0d0d;color:#f7f3ed;
          display:flex;align-items:center;justify-content:center;flex-shrink:0;
        }
        .ct-info-text { display:flex;flex-direction:column;gap:1px; }
        .ct-info-label { font-family:'JetBrains Mono',monospace;font-size:.58rem;font-weight:300;letter-spacing:.1em;text-transform:uppercase;color:rgba(13,13,13,.32); }
        .ct-info-value { font-family:'JetBrains Mono',monospace;font-size:.72rem;font-weight:400;letter-spacing:.04em;color:#0d0d0d; }

        /* ── RIGHT: form card ── */
        .ct-card {
          background:rgba(255,255,255,.52);
          backdrop-filter:blur(44px) saturate(200%);
          -webkit-backdrop-filter:blur(44px) saturate(200%);
          border:1px solid rgba(255,255,255,.82);
          border-radius:24px;
          padding:32px 28px;
          box-shadow:0 2px 4px rgba(0,0,0,.03),0 12px 40px rgba(0,0,0,.09),0 40px 80px rgba(0,0,0,.06),inset 0 1.5px 0 rgba(255,255,255,.95),inset 0 -1px 0 rgba(0,0,0,.03);
          position:relative;overflow:hidden;
        }
        .ct-card::before {
          content:'';position:absolute;top:0;left:12%;right:12%;height:1px;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,.9),transparent);pointer-events:none;
        }

        .ct-card-title {
          font-family:'Playfair Display',serif;
          font-size:1.4rem;font-weight:900;color:#0d0d0d;
          margin-bottom:22px;
        }
        .ct-card-title em { font-style:italic;color:#c84b2f; }

        /* form fields */
        .ct-field { display:flex;flex-direction:column;gap:6px;margin-bottom:14px; }
        .ct-label {
          font-family:'JetBrains Mono',monospace;
          font-size:.58rem;font-weight:300;letter-spacing:.16em;text-transform:uppercase;
          color:rgba(13,13,13,.38);
        }
        .ct-input, .ct-textarea {
          width:100%;padding:11px 14px;
          background:rgba(13,13,13,.04);
          border:1px solid rgba(13,13,13,.1);
          border-radius:10px;
          font-family:'Barlow',sans-serif;
          font-size:.88rem;font-weight:300;color:#0d0d0d;
          outline:none;
          transition:border-color .2s,background .2s,box-shadow .2s;
          resize:none;
        }
        .ct-input::placeholder, .ct-textarea::placeholder { color:rgba(13,13,13,.28); }
        .ct-input:focus, .ct-textarea:focus {
          border-color:rgba(200,75,47,.45);
          background:rgba(255,255,255,.7);
          box-shadow:0 0 0 3px rgba(200,75,47,.1);
        }
        .ct-textarea { min-height:110px; }

        /* submit */
        .ct-submit {
          width:100%;padding:13px;
          font-family:'JetBrains Mono',monospace;
          font-size:.72rem;font-weight:400;letter-spacing:.14em;text-transform:uppercase;
          color:#f7f3ed;background:#0d0d0d;
          border:none;border-radius:10px;
          cursor:pointer;position:relative;overflow:hidden;
          box-shadow:0 4px 16px rgba(13,13,13,.18);
          margin-top:4px;
        }
        .ct-submit::after {
          content:'';position:absolute;inset:0;border-radius:inherit;
          background:linear-gradient(135deg,rgba(255,255,255,.08),transparent);
          opacity:0;transition:opacity .2s;
        }
        .ct-submit:hover::after { opacity:1; }

        .ct-sent-msg {
          text-align:center;padding:13px;
          font-family:'JetBrains Mono',monospace;
          font-size:.68rem;font-weight:300;letter-spacing:.12em;
          color:#22c55e;
          border:1px solid rgba(34,197,94,.2);
          border-radius:10px;background:rgba(34,197,94,.05);
          margin-top:4px;
        }

        @media (max-width:760px) {
          .ct-inner { grid-template-columns:1fr;gap:36px; }
          .ct-root { padding:80px 20px 60px; }
          .ct-heading { font-size:clamp(2.2rem,12vw,3rem); }
        }
      `}</style>

      <section id="contact" className="ct-root">
        <div className="ct-blob ct-blob-1"/>
        <div className="ct-blob ct-blob-2"/>
        <div className="ct-grid"/>

        <div className="ct-inner">

          {/* LEFT */}
          <motion.div className="ct-left"
            initial={{ x:-50, opacity:0 }}
            whileInView={{ x:0, opacity:1 }}
            viewport={{ once:true, margin:"-80px" }}
            transition={{ ...BOUNCY, delay:0.1 }}
          >
            <div className="ct-eyebrow">Get in touch</div>

            <h2 className="ct-heading">
              Let's<br/>work <em>together</em>
            </h2>

            <p className="ct-desc">
              Have a project in mind or just want to chat?
              I'm always open to <strong>new ideas</strong> and interesting conversations.
            </p>

            <div className="ct-info-list">
              {[
                {
                  label:"Email", value:"imt_2023039@iiitm.ac.in",
                  href:"mailto:imt_2023039@iiitm.ac.in",
                  flo: floatA,
                  icon:(
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="3"/>
                      <path d="m2 7 10 7 10-7"/>
                    </svg>
                  )
                },
                {
                  label:"GitHub", value:"An-Orchids-whisper",
                  href:"https://github.com/An-Orchids-whishper",
                  flo: floatB,
                  icon:(
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                    </svg>
                  )
                },
                {
                  label:"LinkedIn", value:"kartik-pal",
                  href:"https://www.linkedin.com/in/kartik-pal-76b8a31ab",
                  flo: floatA,
                  icon:(
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  )
                },
              ].map((c,i) => (
                <motion.a key={i} href={c.href}
                  target={c.href.startsWith("mailto")? undefined:"_blank"}
                  rel="noopener noreferrer"
                  className="ct-info-card"
                  style={{ y: c.flo }}
                  initial={{ x:-30, opacity:0 }}
                  whileInView={{ x:0, opacity:1 }}
                  viewport={{ once:true }}
                  transition={{ ...BOUNCY, delay:0.2+i*0.08 }}
                  whileHover={{ y:-4, scale:1.02, transition:BOUNCY }}
                  whileTap={{ scale:.97 }}
                >
                  <div className="ct-info-icon">{c.icon}</div>
                  <div className="ct-info-text">
                    <span className="ct-info-label">{c.label}</span>
                    <span className="ct-info-value">{c.value}</span>
                  </div>
                  <motion.span style={{ marginLeft:"auto", color:"#c84b2f", fontSize:"1rem" }}
                    animate={{ x:[0,3,0] }}
                    transition={{ duration:2, repeat:Infinity, ease:"easeInOut", delay:i*0.4 }}
                  >›</motion.span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — glass form card */}
          <motion.div
            className="ct-card"
            initial={{ y:60, opacity:0, scale:.94 }}
            whileInView={{ y:0, opacity:1, scale:1 }}
            viewport={{ once:true, margin:"-80px" }}
            transition={{ type:"spring", stiffness:180, damping:16, delay:0.2 }}
            style={{ y: floatB }}
          >
            <div className="ct-card-title">Send a <em>message</em></div>

            <form onSubmit={handleSubmit}>
              {FIELDS.map((f,i) => (
                <motion.div key={f.name} className="ct-field"
                  initial={{ y:20, opacity:0 }}
                  whileInView={{ y:0, opacity:1 }}
                  viewport={{ once:true }}
                  transition={{ ...BOUNCY, delay:0.3+i*0.07 }}
                >
                  <label className="ct-label">{f.label}</label>
                  {f.type === "textarea" ? (
                    <textarea
                      className="ct-textarea"
                      placeholder={f.placeholder}
                      rows={5}
                      value={form[f.name]}
                      onChange={e => setForm(p => ({...p,[f.name]:e.target.value}))}
                      onFocus={() => setFocused(f.name)}
                      onBlur={() => setFocused(null)}
                      required
                    />
                  ) : (
                    <input
                      className="ct-input"
                      type={f.type}
                      placeholder={f.placeholder}
                      value={form[f.name]}
                      onChange={e => setForm(p => ({...p,[f.name]:e.target.value}))}
                      onFocus={() => setFocused(f.name)}
                      onBlur={() => setFocused(null)}
                      required
                    />
                  )}
                </motion.div>
              ))}

              {sent ? (
                <motion.div className="ct-sent-msg"
                  initial={{ scale:.9, opacity:0 }} animate={{ scale:1, opacity:1 }}
                  transition={BOUNCY}
                >
                  ✓ Opening your mail client…
                </motion.div>
              ) : (
                <motion.button type="submit" className="ct-submit"
                  initial={{ y:16, opacity:0 }}
                  whileInView={{ y:0, opacity:1 }}
                  viewport={{ once:true }}
                  transition={{ ...BOUNCY, delay:0.55 }}
                  whileHover={{ scale:1.03, y:-2, transition:BOUNCY }}
                  whileTap={{ scale:.97 }}
                >
                  Send Message →
                </motion.button>
              )}
            </form>
          </motion.div>
        </div>
      </section>
    </>
  );
}