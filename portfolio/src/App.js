import React, { useEffect, useState } from "react";


import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Resume from "./components/Resume";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import MouseBlob from "./components/MouseBlob";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

 
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
   <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">

      <MouseBlob />

      {/* Pass theme state to Navbar so it can change it */}
      <Navbar setTheme={setTheme} />

      <section data-aos="fade-up">
        <Hero />
      </section>
      <section data-aos="fade-right">
        <About />
      </section>
      <section data-aos="zoom-in">
        <Skills />
      </section>
      <section data-aos="fade-left">
        <Projects />
      </section>
      <section data-aos="fade-up">
        <Resume />
      </section>
      <section data-aos="fade-up">
        <Contact />
      </section>

      <Footer />
    </div>
  );
}

export default App;
