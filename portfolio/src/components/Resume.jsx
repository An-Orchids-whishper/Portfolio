import React from "react";
import { FaDownload } from "react-icons/fa";

const Resume = () => {
  return (
    <section
      id="resume"
      className="min-h-screen flex items-center justify-center px-4 py-20 bg-white/10 dark:bg-white/10 backdrop-blur-md text-gray-900 dark:text-white"
    >
      <div className="relative max-w-2xl w-full p-10 rounded-3xl shadow-2xl bg-white/5 dark:bg-white/5 overflow-hidden border border-purple-500/20">
        {/* Glowing Border Ring Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 rounded-3xl blur opacity-30 animate-pulse"></div>

        <div className="relative z-10 text-center space-y-6">
          <h2 className="text-4xl font-bold">My Resume</h2>

          <p className="text-gray-800 dark:text-gray-300 text-lg">
            Dive into my experience, skills, and accomplishments. Download it below!
          </p>

          <a
            href="/Kartik_Resume.pdf"
            download
            className="inline-flex items-center gap-3 px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 hover:scale-105 transition-transform"
          >
            <FaDownload className="animate-bounce" />
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
};

export default Resume;
