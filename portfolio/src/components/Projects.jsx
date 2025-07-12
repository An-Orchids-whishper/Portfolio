import React, { useState } from "react";
import Tilt from "react-parallax-tilt";
import { FaTh, FaStream, FaGripVertical } from "react-icons/fa";

const projects = [
  {
    title: "InterviewGPT",
    description: "AI mock interview platform with voice, resume parsing, feedback, and cheating detection using MediaPipe.",
    year: "2025",
    github: "https://github.com/kartikpal/interviewgpt",
  },
  {
    title: "Portfolio Website",
    description: "This interactive portfolio built with React, Tailwind, Framer Motion and cool effects like dark mode, parallax, and dynamic layouts.",
    year: "2025",
    github: "https://github.com/kartikpal/portfolio",
  },
  {
    title: "AI Resume Tools",
    description: "Includes Resume Reviewer, AI Resume Analyzer, and feedback generator using OpenRouter and pdf-parse.",
    year: "2024",
    github: "https://github.com/kartikpal/ai-resume-tools",
  },
  {
    title: "Placement Portal Clone",
    description: "Clone of student job portal with authentication, admin/user dashboards, and job listings.",
    year: "2023",
    github: "https://github.com/kartikpal/placement-portal-clone",
  },
];

const Projects = () => {
  const [layout, setLayout] = useState("card");

  return (
    <section
      id="projects"
      className="min-h-screen px-4 py-20 bg-white/10 dark:bg-white/10 backdrop-blur-md text-gray-900 dark:text-white"
    >
      <div className="max-w-6xl mx-auto text-center space-y-10">
        <h2 className="text-3xl font-bold">Projects</h2>

        {/* Layout Switch Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setLayout("card")}
            className={`p-3 rounded-full ${
              layout === "card"
                ? "bg-purple-600 text-white"
                : "bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
            }`}
            title="Card Layout"
          >
            <FaTh />
          </button>
          <button
            onClick={() => setLayout("timeline")}
            className={`p-3 rounded-full ${
              layout === "timeline"
                ? "bg-purple-600 text-white"
                : "bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
            }`}
            title="Timeline Layout"
          >
            <FaStream />
          </button>
          <button
            onClick={() => setLayout("masonry")}
            className={`p-3 rounded-full ${
              layout === "masonry"
                ? "bg-purple-600 text-white"
                : "bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
            }`}
            title="Masonry Layout"
          >
            <FaGripVertical />
          </button>
        </div>

        {/* CARD Layout */}
        {layout === "card" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <Tilt
                key={index}
                tiltMaxAngleX={8}
                tiltMaxAngleY={8}
                className="p-6 bg-gradient-to-br from-purple-600/20 to-indigo-600/20 rounded-xl border border-white/10 hover:scale-105 transition-transform duration-300"
              >
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{project.title}</h3>
                <p className="text-gray-800 dark:text-gray-300 mb-2">{project.description}</p>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-400 hover:underline"
                >
                  GitHub ↗
                </a>
              </Tilt>
            ))}
          </div>
        )}

        {/* TIMELINE Layout */}
        {layout === "timeline" && (
          <div className="relative border-l-4 border-purple-600 pl-6 space-y-8 text-left max-w-2xl mx-auto">
            {projects.map((project, index) => (
              <Tilt key={index} tiltMaxAngleX={6} tiltMaxAngleY={6}>
                <div className="relative">
                  <div className="absolute w-4 h-4 bg-purple-600 rounded-full -left-2 top-1.5" />
                  <div className="bg-white/10 dark:bg-gray-800 p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-purple-400">{project.year}</h3>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">{project.title}</h4>
                    <p className="text-gray-800 dark:text-gray-300">{project.description}</p>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 text-sm hover:underline mt-2 inline-block"
                    >
                      GitHub ↗
                    </a>
                  </div>
                </div>
              </Tilt>
            ))}
          </div>
        )}

        {/* MASONRY Layout */}
        {layout === "masonry" && (
          <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
            {projects.map((project, index) => (
              <Tilt
                key={index}
                tiltMaxAngleX={6}
                tiltMaxAngleY={6}
                className="break-inside-avoid p-4 bg-purple-600/10 rounded-xl border border-white/10 shadow-md hover:scale-[1.02] transition-transform duration-300"
              >
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{project.title}</h3>
                <p className="text-sm text-gray-800 dark:text-gray-300">{project.description}</p>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-400 hover:underline block mt-2"
                >
                  GitHub ↗
                </a>
              </Tilt>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
