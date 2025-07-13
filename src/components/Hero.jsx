import React from "react";
import { Typewriter } from "react-simple-typewriter";

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center px-4 text-center 
      bg-white/10 dark:bg-white/10 backdrop-blur-md text-gray-900 dark:text-white transition-all duration-500"
    >
      <div className="max-w-4xl w-full text-center space-y-6 p-10 bg-white/5 dark:bg-white/5 rounded-2xl shadow-xl">
        <h1 className="text-4xl md:text-5xl font-bold">Hi, I'm Kartik </h1>

        <h2 className="text-xl md:text-2xl">
          I am a{" "}
          <span className="text-yellow-400 font-bold">
            <Typewriter
              words={["Full Stack Developer", "ML Enthusiast", "Tech Explorer"]}
              loop
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </span>
        </h2>

        <div className="mt-8">
          <a
            href="#contact"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:bg-blue-700 transition-transform hover:scale-105 duration-300"
          >
            Let’s Connect
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
