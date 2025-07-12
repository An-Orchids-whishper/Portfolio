import React from "react";
import { FaCode, FaRobot, FaLaptopCode } from "react-icons/fa";

const About = () => {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center px-4 py-20 bg-white/10 dark:bg-white/10 backdrop-blur-md text-gray-900 dark:text-white"
    >
      <div className="max-w-5xl w-full text-center space-y-8 p-10 bg-white/5 dark:bg-white/5 rounded-2xl shadow-xl">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold mb-4">About Me</h2>

        {/* Quote */}
        <p className="italic text-purple-400 dark:text-purple-300 text-lg animate-pulse">
          "Code is not just logic; it's a language of ideas."
        </p>

        {/* Intro Part 1 */}
        <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-200">
          I’m <strong>Kartik Pal</strong>, a passionate Full Stack Developer with a flair for creating intuitive and intelligent web applications. With experience in <span className="text-blue-500 font-semibold">React, Node, MongoDB, and AI integrations</span>, I love combining functionality with clean design.
        </p>

        {/* Intro Part 2 */}
        <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-300">
          I enjoy solving real-world problems, exploring new technologies, and building tools that empower others. Whether it's automating interviews or crafting immersive portfolios, I always aim for impact.
        </p>

        {/* Skills / Traits Icons */}
        <div className="flex justify-center gap-10 text-4xl mt-8 text-purple-400 dark:text-purple-300">
          <FaCode title="Developer" />
          <FaLaptopCode title="Builder" />
          <FaRobot title="AI Enthusiast" />
        </div>

        {/* Call to Action */}
        <div className="mt-8">
          <a
            href="#projects"
            className="inline-block px-6 py-3 bg-purple-600 text-white rounded-full shadow-md hover:bg-purple-700 transition"
          >
            View My Projects
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
